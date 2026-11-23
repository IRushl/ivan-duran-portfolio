import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const loadDependency=createRequire(import.meta.url);
const directory=path.dirname(fileURLToPath(import.meta.url));

function load(file, imports = {}) {
  const context = { exports: {}, require: name => imports[name] ?? loadDependency(name) };
  const source = readFileSync(path.join(directory, '..', file), 'utf8');
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, context);
  return context.exports;
}
const registry = load('src/data/projects.ts');
const home = load('src/data/home.ts', { './projects': registry });
const expected = ['redeban', 'aurora-seguros', 'arho', 'paragon', 'tripflowapp', 'de-lo-largo-a-lo-corto', 'ritual-amarte'];

test('Every case follows the approved sequence once, then closes without a loop', () => {
  assert.deepEqual(Array.from(registry.projects, project => project.slug), expected);
  for (let index = 0; index < expected.length; index++) {
    const next = registry.getNextProject(expected[index]);
    assert.equal(next?.slug, expected[index + 1]);
    if (next) assert.equal(next.name, registry.projects[index + 1].name);
  }
  assert.equal(registry.getNextProject('ritual-amarte'), undefined);
});

test('Home uses exactly the registry order and preserves the project records', () => {
  assert.deepEqual(Array.from(home.homeProjects, item => item.project.slug), expected);
  registry.projects.forEach((project, index) => assert.equal(home.homeProjects[index].project, project));
});
