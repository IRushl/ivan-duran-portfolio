export type Locale = 'es' | 'en';
export type Dictionary = Record<string,string>;
export const localeStorageKey = 'ivan-portfolio-language';
export const localeCookie = 'portfolio_locale';
export const normalizeText = (text: string) => text.replace(/\s+/g,' ').trim();
const brands = new Set(['Iván Durán','Iván Camilo Durán Alba','Redeban','Aurora Seguros','Salud Flex','Seguro Salud Flex','TripFlowApp','TripFlow','Paragón','ARHO','Interfaz de Producto','Ritual Amarte','Aura Cristina Pineda','UPTC']);
const formatCache=new WeakMap<Dictionary,Array<{pattern:RegExp;english:string}>>();
function formats(dictionary:Dictionary) {
  let cached=formatCache.get(dictionary);
  if(!cached) {
    cached=Object.entries(dictionary).filter(([key])=>key.includes('{0}')).map(([spanish,english])=>({english,pattern:new RegExp('^'+spanish.split(/(\{\d+\})/).map(part=>/^\{\d+\}$/.test(part)?'(.+?)':part.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('')+'$')}));
    formatCache.set(dictionary,cached);
  }
  return cached;
}
/** Source-key catalogue: only presentation copy is translated, never state IDs. */
export function translate(text:string,locale:Locale,dictionary:Dictionary):string {
  if(locale==='es'||!text.trim())return text;
  const source=normalizeText(text);
  if(brands.has(source))return text;
  let result=dictionary[source];
  if(result===undefined) {
    const parts=source.split(/( — | · | \| )/);
    if(parts.length>1)result=parts.map((part,index)=>index%2?part:translate(part,locale,dictionary)).join('');
  }
  if(result===undefined)for(const {pattern,english} of formats(dictionary)) {
    const matches=source.match(pattern);
    if(matches){result=english.replace(/\{(\d+)\}/g,(_,index)=>translate(matches[Number(index)+1],locale,dictionary));break;}
  }
  if(result===undefined)return text;
  return (/^\s/.test(text)?' ':'')+result+(/\s$/.test(text)?' ':'');
}
