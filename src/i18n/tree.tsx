import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode, type ReactPortal } from 'react';
const textAttributes=['alt','title','placeholder','aria-label','aria-description','aria-valuetext','aria-roledescription'];

/** Declarative React localization. No DOM rewriting, route duplication or translated state IDs. */
export function localizeTree(node: ReactNode, t: (text: string)=>string, language: string): ReactNode {
  if(typeof node==='string')return t(node);
  if(Array.isArray(node))return Children.map(node,child=>localizeTree(child,t,language));
  if(node&&typeof node==='object'&&'$$typeof' in node&&node.$$typeof===Symbol.for('react.portal')) {
    const portal=node as ReactPortal;
    return {...portal,children:localizeTree(portal.children,t,language)};
  }
  if(!isValidElement(node))return node;
  const element=node as ReactElement<Record<string,unknown>>;
  if(element.type==='script'||element.type==='style')return node;
  const props:Record<string,unknown>={};
  for(const key of textAttributes)if(typeof element.props[key]==='string')props[key]=t(element.props[key] as string);
  if(element.props.lang==='es')props.lang=language;
  if('children' in element.props)props.children=localizeTree(element.props.children as ReactNode,t,language);
  // Follow rich presentation slots before React serializes them across a client boundary.
  const rich=(value:unknown):unknown=>{
    if(isValidElement(value))return localizeTree(value,t,language);
    if(Array.isArray(value))return value.map(rich);
    if(value&&typeof value==='object'&&Object.getPrototypeOf(value)===Object.prototype)return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,typeof item==='string'&&['title','label','alt','caption','note','description','name','navLabel'].includes(key)?t(item):rich(item)]));
    return value;
  };
  for(const [key,value]of Object.entries(element.props))if(['hero','steps','states'].includes(key)&&value&&typeof value==='object')props[key]=rich(value);
  return cloneElement(element,props);
}
