import{_ as Bn}from"./AdminLayout-0e243c9a.js";import{d as Ne,a as T,u as c,b as dn,i as Se,w as K,e as fn,g as qe,t as ie,r as We,h as Ie,f as vn,j as Q,k as He,p as mn,n as be,l as Cn,m as Nn,o as me,q as _e,s as q,v as en,x as Rn,y as Be,c as Tn,z as nn}from"./index-782bdc68.js";/**
  * vee-validate v4.8.6
  * (c) 2023 Abdelrahman Awad
  * @license MIT
  */function ae(e){return typeof e=="function"}function Oe(e){return e==null}const ve=e=>e!==null&&!!e&&typeof e=="object"&&!Array.isArray(e);function yn(e){return Number(e)>=0}function $n(e){const n=parseFloat(e);return isNaN(n)?e:n}const Un={};function Pn(e){return Un[e]}const Fe=Symbol("vee-validate-form"),zn=Symbol("vee-validate-field-instance"),Ce=Symbol("Default empty value"),Dn=typeof window<"u";function ze(e){return ae(e)&&!!e.__locatorRef}function oe(e){return!!e&&ae(e.parse)&&e.__type==="VVTypedSchema"}function Ae(e){return!!e&&ae(e.validate)}function ye(e){return e==="checkbox"||e==="radio"}function Ln(e){return ve(e)||Array.isArray(e)}function hn(e){return Array.isArray(e)?e.length===0:ve(e)&&Object.keys(e).length===0}function Re(e){return/^\[.+\]$/i.test(e)}function Gn(e){return gn(e)&&e.multiple}function gn(e){return e.tagName==="SELECT"}function qn(e,n){const t=![!1,null,void 0,0].includes(n.multiple)&&!Number.isNaN(n.multiple);return e==="select"&&"multiple"in n&&t}function Wn(e,n){return!qn(e,n)&&n.type!=="file"&&!ye(n.type)}function Vn(e){return Ke(e)&&e.target&&"submit"in e.target}function Ke(e){return e?!!(typeof Event<"u"&&ae(Event)&&e instanceof Event||e&&e.srcElement):!1}function tn(e,n){return n in e&&e[n]!==Ce}function $(e,n){if(e===n)return!0;if(e&&n&&typeof e=="object"&&typeof n=="object"){if(e.constructor!==n.constructor)return!1;var t,r,a;if(Array.isArray(e)){if(t=e.length,t!=n.length)return!1;for(r=t;r--!==0;)if(!$(e[r],n[r]))return!1;return!0}if(e instanceof Map&&n instanceof Map){if(e.size!==n.size)return!1;for(r of e.entries())if(!n.has(r[0]))return!1;for(r of e.entries())if(!$(r[1],n.get(r[0])))return!1;return!0}if(rn(e)&&rn(n))return!(e.size!==n.size||e.name!==n.name||e.lastModified!==n.lastModified||e.type!==n.type);if(e instanceof Set&&n instanceof Set){if(e.size!==n.size)return!1;for(r of e.entries())if(!n.has(r[0]))return!1;return!0}if(ArrayBuffer.isView(e)&&ArrayBuffer.isView(n)){if(t=e.length,t!=n.length)return!1;for(r=t;r--!==0;)if(e[r]!==n[r])return!1;return!0}if(e.constructor===RegExp)return e.source===n.source&&e.flags===n.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===n.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===n.toString();if(a=Object.keys(e),t=a.length,t!==Object.keys(n).length)return!1;for(r=t;r--!==0;)if(!Object.prototype.hasOwnProperty.call(n,a[r]))return!1;for(r=t;r--!==0;){var i=a[r];if(!$(e[i],n[i]))return!1}return!0}return e!==e&&n!==n}function rn(e){return Dn?e instanceof File:!1}function an(e,n,t){typeof t.value=="object"&&(t.value=M(t.value)),!t.enumerable||t.get||t.set||!t.configurable||!t.writable||n==="__proto__"?Object.defineProperty(e,n,t):e[n]=t.value}function M(e){if(typeof e!="object")return e;var n=0,t,r,a,i=Object.prototype.toString.call(e);if(i==="[object Object]"?a=Object.create(e.__proto__||null):i==="[object Array]"?a=Array(e.length):i==="[object Set]"?(a=new Set,e.forEach(function(u){a.add(M(u))})):i==="[object Map]"?(a=new Map,e.forEach(function(u,f){a.set(M(f),M(u))})):i==="[object Date]"?a=new Date(+e):i==="[object RegExp]"?a=new RegExp(e.source,e.flags):i==="[object DataView]"?a=new e.constructor(M(e.buffer)):i==="[object ArrayBuffer]"?a=e.slice(0):i.slice(-6)==="Array]"&&(a=new e.constructor(e)),a){for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)an(a,r[n],Object.getOwnPropertyDescriptor(e,r[n]));for(n=0,r=Object.getOwnPropertyNames(e);n<r.length;n++)Object.hasOwnProperty.call(a,t=r[n])&&a[t]===e[t]||an(a,t,Object.getOwnPropertyDescriptor(e,t))}return a||e}function Ye(e){return Re(e)?e.replace(/\[|\]/gi,""):e}function R(e,n,t){return e?Re(n)?e[Ye(n)]:(n||"").split(/\.|\[(\d+)\]/).filter(Boolean).reduce((a,i)=>Ln(a)&&i in a?a[i]:t,e):t}function ue(e,n,t){if(Re(n)){e[Ye(n)]=t;return}const r=n.split(/\.|\[(\d+)\]/).filter(Boolean);let a=e;for(let i=0;i<r.length;i++){if(i===r.length-1){a[r[i]]=t;return}(!(r[i]in a)||Oe(a[r[i]]))&&(a[r[i]]=yn(r[i+1])?[]:{}),a=a[r[i]]}}function Ue(e,n){if(Array.isArray(e)&&yn(n)){e.splice(Number(n),1);return}ve(e)&&delete e[n]}function ke(e,n){if(Re(n)){delete e[Ye(n)];return}const t=n.split(/\.|\[(\d+)\]/).filter(Boolean);let r=e;for(let i=0;i<t.length;i++){if(i===t.length-1){Ue(r,t[i]);break}if(!(t[i]in r)||Oe(r[t[i]]))break;r=r[t[i]]}const a=t.map((i,u)=>R(e,t.slice(0,u).join(".")));for(let i=a.length-1;i>=0;i--)if(hn(a[i])){if(i===0){Ue(e,t[0]);continue}Ue(a[i-1],t[i-1])}}function D(e){return Object.keys(e)}function Xe(e,n=void 0){const t=qe();return(t==null?void 0:t.provides[e])||vn(e,n)}function De(e,n,t){if(Array.isArray(e)){const r=[...e],a=r.findIndex(i=>$(i,n));return a>=0?r.splice(a,1):r.push(n),r}return $(e,n)?t:n}function ln(e,n=0){let t=null,r=[];return function(...a){return t&&window.clearTimeout(t),t=window.setTimeout(()=>{const i=e(...a);r.forEach(u=>u(i)),r=[]},n),new Promise(i=>r.push(i))}}function Hn(e,n){return ve(n)&&n.number?$n(e):e}function Le(e,n){let t;return async function(...a){const i=e(...a);t=i;const u=await i;return i!==t||(t=void 0,n(u,a)),u}}function Kn({get:e,set:n}){const t=Q(M(e()));return K(e,r=>{$(r,t.value)||(t.value=M(r))},{deep:!0}),K(t,r=>{$(r,e())||n(M(r))},{deep:!0}),t}function Yn(e){return ae(e)?e():c(e)}function Xn(e){return T(()=>Yn(e))}const Te=(e,n,t)=>n.slots.default?typeof e=="string"||!e?n.slots.default(t()):{default:()=>{var r,a;return(a=(r=n.slots).default)===null||a===void 0?void 0:a.call(r,t())}}:n.slots.default;function Pe(e){if(pn(e))return e._value}function pn(e){return"_value"in e}function Je(e){if(!Ke(e))return e;const n=e.target;if(ye(n.type)&&pn(n))return Pe(n);if(n.type==="file"&&n.files){const t=Array.from(n.files);return n.multiple?t:t[0]}if(Gn(n))return Array.from(n.options).filter(t=>t.selected&&!t.disabled).map(Pe);if(gn(n)){const t=Array.from(n.options).find(r=>r.selected);return t?Pe(t):n.value}return n.value}function bn(e){const n={};return Object.defineProperty(n,"_$$isNormalized",{value:!0,writable:!1,enumerable:!1,configurable:!1}),e?ve(e)&&e._$$isNormalized?e:ve(e)?Object.keys(e).reduce((t,r)=>{const a=Jn(e[r]);return e[r]!==!1&&(t[r]=un(a)),t},n):typeof e!="string"?n:e.split("|").reduce((t,r)=>{const a=Qn(r);return a.name&&(t[a.name]=un(a.params)),t},n):n}function Jn(e){return e===!0?[]:Array.isArray(e)||ve(e)?e:[e]}function un(e){const n=t=>typeof t=="string"&&t[0]==="@"?Zn(t.slice(1)):t;return Array.isArray(e)?e.map(n):e instanceof RegExp?[e]:Object.keys(e).reduce((t,r)=>(t[r]=n(e[r]),t),{})}const Qn=e=>{let n=[];const t=e.split(":")[0];return e.includes(":")&&(n=e.split(":").slice(1).join(":").split(",")),{name:t,params:n}};function Zn(e){const n=t=>R(t,e)||t[e];return n.__locatorRef=e,n}function xn(e){return Array.isArray(e)?e.filter(ze):D(e).filter(n=>ze(e[n])).map(n=>e[n])}const et={generateMessage:({field:e})=>`${e} is not valid.`,bails:!0,validateOnBlur:!0,validateOnChange:!0,validateOnInput:!1,validateOnModelUpdate:!0};let nt=Object.assign({},et);const Qe=()=>nt;async function _n(e,n,t={}){const r=t==null?void 0:t.bails,a={name:(t==null?void 0:t.name)||"{field}",rules:n,label:t==null?void 0:t.label,bails:r??!0,formData:(t==null?void 0:t.values)||{}},u=(await tt(a,e)).errors;return{errors:u,valid:!u.length}}async function tt(e,n){if(oe(e.rules)||Ae(e.rules))return it(n,e.rules);if(ae(e.rules)||Array.isArray(e.rules)){const u={field:e.label||e.name,name:e.name,label:e.label,form:e.formData,value:n},f=Array.isArray(e.rules)?e.rules:[e.rules],m=f.length,s=[];for(let _=0;_<m;_++){const g=f[_],A=await g(n,u);if(typeof A!="string"&&A)continue;const N=typeof A=="string"?A:An(u);if(s.push(N),e.bails)return{errors:s}}return{errors:s}}const t=Object.assign(Object.assign({},e),{rules:bn(e.rules)}),r=[],a=Object.keys(t.rules),i=a.length;for(let u=0;u<i;u++){const f=a[u],m=await at(t,n,{name:f,params:t.rules[f]});if(m.error&&(r.push(m.error),e.bails))return{errors:r}}return{errors:r}}function rt(e){return!!e&&e.name==="ValidationError"}function On(e){return{__type:"VVTypedSchema",async parse(t){var r;try{return{output:await e.validate(t,{abortEarly:!1}),errors:[]}}catch(a){if(!rt(a))throw a;if(!(!((r=a.inner)===null||r===void 0)&&r.length)&&a.errors.length)return{errors:[{path:a.path,errors:a.errors}]};const i=a.inner.reduce((u,f)=>{const m=f.path||"";return u[m]||(u[m]={errors:[],path:m}),u[m].errors.push(...f.errors),u},{});return{errors:Object.values(i)}}}}}async function it(e,n){const r=await(oe(n)?n:On(n)).parse(e),a=[];for(const i of r.errors)i.errors.length&&a.push(...i.errors);return{errors:a}}async function at(e,n,t){const r=Pn(t.name);if(!r)throw new Error(`No such validator '${t.name}' exists.`);const a=lt(t.params,e.formData),i={field:e.label||e.name,name:e.name,label:e.label,value:n,form:e.formData,rule:Object.assign(Object.assign({},t),{params:a})},u=await r(n,a,i);return typeof u=="string"?{error:u}:{error:u?void 0:An(i)}}function An(e){const n=Qe().generateMessage;return n?n(e):"Field is invalid"}function lt(e,n){const t=r=>ze(r)?r(n):r;return Array.isArray(e)?e.map(t):Object.keys(e).reduce((r,a)=>(r[a]=t(e[a]),r),{})}async function ut(e,n){const r=await(oe(e)?e:On(e)).parse(n),a={},i={};for(const u of r.errors){const f=u.errors,m=(u.path||"").replace(/\["(\d+)"\]/g,(s,_)=>`[${_}]`);a[m]={valid:!f.length,errors:f},f.length&&(i[m]=f[0])}return{valid:!r.errors.length,results:a,errors:i,values:r.value}}async function ot(e,n,t){const a=D(e).map(async s=>{var _,g,A;const w=(_=t==null?void 0:t.names)===null||_===void 0?void 0:_[s],N=await _n(R(n,s),e[s],{name:(w==null?void 0:w.name)||s,label:w==null?void 0:w.label,values:n,bails:(A=(g=t==null?void 0:t.bailsMap)===null||g===void 0?void 0:g[s])!==null&&A!==void 0?A:!0});return Object.assign(Object.assign({},N),{path:s})});let i=!0;const u=await Promise.all(a),f={},m={};for(const s of u)f[s.path]={valid:s.valid,errors:s.errors},s.valid||(i=!1,m[s.path]=s.errors[0]);return{valid:i,results:f,errors:m}}let on=0;function st(e,n){const{value:t,initialValue:r,setInitialValue:a}=Sn(e,n.modelValue,n.form),{errorMessage:i,errors:u,setErrors:f}=ft(e,n.form),m=dt(t,r,u),s=on>=Number.MAX_SAFE_INTEGER?0:++on;function _(g){var A;"value"in g&&(t.value=g.value),"errors"in g&&f(g.errors),"touched"in g&&(m.touched=(A=g.touched)!==null&&A!==void 0?A:m.touched),"initialValue"in g&&a(g.initialValue)}return{id:s,path:e,value:t,initialValue:r,meta:m,errors:u,errorMessage:i,setState:_}}function Sn(e,n,t){const r=Q(c(n));function a(){return t?R(t.meta.value.initialValues,c(e),c(r)):c(r)}function i(s){if(!t){r.value=s;return}t.stageInitialValue(c(e),s,!0)}const u=T(a);if(!t)return{value:Q(a()),initialValue:u,setInitialValue:i};const f=ct(n,t,u,e);return t.stageInitialValue(c(e),f,!0),{value:T({get(){return R(t.values,c(e))},set(s){t.setFieldValue(c(e),s)}}),initialValue:u,setInitialValue:i}}function ct(e,n,t,r){return Se(e)?c(e):e!==void 0?e:R(n.values,c(r),c(t))}function dt(e,n,t){const r=He({touched:!1,pending:!1,valid:!0,validated:!!c(t).length,initialValue:T(()=>c(n)),dirty:T(()=>!$(c(e),c(n)))});return K(t,a=>{r.valid=!a.length},{immediate:!0,flush:"sync"}),r}function ft(e,n){function t(a){return a?Array.isArray(a)?a:[a]:[]}if(!n){const a=Q([]);return{errors:a,errorMessage:T(()=>a.value[0]),setErrors:i=>{a.value=t(i)}}}const r=T(()=>n.errorBag.value[c(e)]||[]);return{errors:r,errorMessage:T(()=>r.value[0]),setErrors:a=>{n.setFieldErrorBag(c(e),t(a))}}}function Fn(e,n,t){return ye(t==null?void 0:t.type)?yt(e,n,t):wn(e,n,t)}function wn(e,n,t){const{initialValue:r,validateOnMount:a,bails:i,type:u,checkedValue:f,label:m,validateOnValueUpdate:s,uncheckedValue:_,controlled:g,keepValueOnUnmount:A,modelPropName:w,syncVModel:N,form:Y}=vt(t),Z=g?Xe(Fe):void 0,E=Y||Z,U=Xn(e);let L=!1;const{id:X,value:v,initialValue:y,meta:p,setState:h,errors:b,errorMessage:k}=st(U,{modelValue:r,form:E});N&&ht({value:v,prop:w,handleChange:C});const x=()=>{p.touched=!0},W=T(()=>{let d=c(n);const I=c(E==null?void 0:E.schema);return I&&!Ae(I)&&!oe(I)&&(d=mt(I,c(U))||d),Ae(d)||oe(d)||ae(d)||Array.isArray(d)?d:bn(d)});async function ne(d){var I,G;return E!=null&&E.validateSchema?(I=(await E.validateSchema(d)).results[c(U)])!==null&&I!==void 0?I:{valid:!0,errors:[]}:_n(v.value,W.value,{name:c(U),label:c(m),values:(G=E==null?void 0:E.values)!==null&&G!==void 0?G:{},bails:i})}const J=Le(async()=>(p.pending=!0,p.validated=!0,ne("validated-only")),d=>(L&&(d.valid=!0,d.errors=[]),h({errors:d.errors}),p.pending=!1,d)),P=Le(async()=>ne("silent"),d=>(L&&(d.valid=!0),p.valid=d.valid,d));function B(d){return(d==null?void 0:d.mode)==="silent"?P():J()}function C(d,I=!0){const G=Je(d);v.value=G,!s&&I&&J()}dn(()=>{if(a)return J();(!E||!E.validateSchema)&&P()});function ee(d){p.touched=d}let te,le=M(v.value);function se(){te=K(v,(d,I)=>{if($(d,I)&&$(d,le))return;(s?J:P)(),le=M(d)},{deep:!0})}se();function ce(d){var I;te==null||te();const G=d&&"value"in d?d.value:y.value;h({value:M(G),initialValue:M(G),touched:(I=d==null?void 0:d.touched)!==null&&I!==void 0?I:!1,errors:(d==null?void 0:d.errors)||[]}),p.pending=!1,p.validated=!1,P(),be(()=>{se()})}function he(d){v.value=d}function we(d){h({errors:Array.isArray(d)?d:[d]})}const de={id:X,name:U,label:m,value:v,meta:p,errors:b,errorMessage:k,type:u,checkedValue:f,uncheckedValue:_,bails:i,keepValueOnUnmount:A,resetField:ce,handleReset:()=>ce(),validate:B,handleChange:C,handleBlur:x,setState:h,setTouched:ee,setErrors:we,setValue:he};if(mn(zn,de),Se(n)&&typeof c(n)!="function"&&K(n,(d,I)=>{$(d,I)||(p.validated?J():P())},{deep:!0}),!E)return de;E.register(de),fn(()=>{L=!0,E.unregister(de)});const ge=T(()=>{const d=W.value;return!d||ae(d)||Ae(d)||oe(d)||Array.isArray(d)?{}:Object.keys(d).reduce((I,G)=>{const Ee=xn(d[G]).map(fe=>fe.__locatorRef).reduce((fe,Ve)=>{const je=R(E.values,Ve)||E.values[Ve];return je!==void 0&&(fe[Ve]=je),fe},{});return Object.assign(I,Ee),I},{})});return K(ge,(d,I)=>{if(!Object.keys(d).length)return;!$(d,I)&&(p.validated?J():P())}),de}function vt(e){var n;const t=()=>({initialValue:void 0,validateOnMount:!1,bails:!0,label:void 0,validateOnValueUpdate:!0,keepValueOnUnmount:void 0,modelPropName:"modelValue",syncVModel:!0,controlled:!0}),a=((n=e==null?void 0:e.syncVModel)!==null&&n!==void 0?n:!0)&&!("initialValue"in(e||{}))?Ge(qe(),(e==null?void 0:e.modelPropName)||"modelValue"):e==null?void 0:e.initialValue;if(!e)return Object.assign(Object.assign({},t()),{initialValue:a});const i="valueProp"in e?e.valueProp:e.checkedValue,u="standalone"in e?!e.standalone:e.controlled;return Object.assign(Object.assign(Object.assign({},t()),e||{}),{initialValue:a,controlled:u??!0,checkedValue:i})}function mt(e,n){if(e)return e[n]}function yt(e,n,t){const r=t!=null&&t.standalone?void 0:Xe(Fe),a=t==null?void 0:t.checkedValue,i=t==null?void 0:t.uncheckedValue;function u(f){const m=f.handleChange,s=T(()=>{const g=c(f.value),A=c(a);return Array.isArray(g)?g.findIndex(w=>$(w,A))>=0:$(A,g)});function _(g,A=!0){var w;if(s.value===((w=g==null?void 0:g.target)===null||w===void 0?void 0:w.checked)){A&&f.validate();return}let N=Je(g);r||(N=De(c(f.value),c(a),c(i))),m(N,A)}return Object.assign(Object.assign({},f),{checked:s,checkedValue:a,uncheckedValue:i,handleChange:_})}return u(wn(e,n,t))}function ht({prop:e,value:n,handleChange:t}){const r=qe();if(!r)return;const a=e||"modelValue",i=`update:${a}`;a in r.props&&(K(n,u=>{$(u,Ge(r,a))||r.emit(i,u)}),K(()=>Ge(r,a),u=>{if(u===Ce&&n.value===void 0)return;const f=u===Ce?void 0:u;$(f,Hn(n.value,r.props.modelModifiers))||t(f)}))}function Ge(e,n){if(e)return e.props[n]}Ne({name:"Field",inheritAttrs:!1,props:{as:{type:[String,Object],default:void 0},name:{type:String,required:!0},rules:{type:[Object,String,Function],default:void 0},validateOnMount:{type:Boolean,default:!1},validateOnBlur:{type:Boolean,default:void 0},validateOnChange:{type:Boolean,default:void 0},validateOnInput:{type:Boolean,default:void 0},validateOnModelUpdate:{type:Boolean,default:void 0},bails:{type:Boolean,default:()=>Qe().bails},label:{type:String,default:void 0},uncheckedValue:{type:null,default:void 0},modelValue:{type:null,default:Ce},modelModifiers:{type:null,default:()=>({})},"onUpdate:modelValue":{type:null,default:void 0},standalone:{type:Boolean,default:!1},keepValue:{type:Boolean,default:void 0}},setup(e,n){const t=ie(e,"rules"),r=ie(e,"name"),a=ie(e,"label"),i=ie(e,"uncheckedValue"),u=ie(e,"keepValue"),{errors:f,value:m,errorMessage:s,validate:_,handleChange:g,handleBlur:A,setTouched:w,resetField:N,handleReset:Y,meta:Z,checked:E,setErrors:U}=Fn(r,t,{validateOnMount:e.validateOnMount,bails:e.bails,standalone:e.standalone,type:n.attrs.type,initialValue:Vt(e,n),checkedValue:n.attrs.value,uncheckedValue:i,label:a,validateOnValueUpdate:!1,keepValueOnUnmount:u}),L=function(b,k=!0){g(b,k),n.emit("update:modelValue",m.value)},X=h=>{ye(n.attrs.type)||(m.value=Je(h))},v=function(b){X(b),n.emit("update:modelValue",m.value)},y=T(()=>{const{validateOnInput:h,validateOnChange:b,validateOnBlur:k,validateOnModelUpdate:x}=gt(e),W=[A,n.attrs.onBlur,k?_:void 0].filter(Boolean),ne=[C=>L(C,h),n.attrs.onInput].filter(Boolean),J=[C=>L(C,b),n.attrs.onChange].filter(Boolean),P={name:e.name,onBlur:W,onInput:ne,onChange:J};P["onUpdate:modelValue"]=C=>L(C,x),ye(n.attrs.type)&&E&&(P.checked=E.value);const B=sn(e,n);return Wn(B,n.attrs)&&(P.value=m.value),P});function p(){return{field:y.value,value:m.value,meta:Z,errors:f.value,errorMessage:s.value,validate:_,resetField:N,handleChange:L,handleInput:v,handleReset:Y,handleBlur:A,setTouched:w,setErrors:U}}return n.expose({setErrors:U,setTouched:w,reset:N,validate:_,handleChange:g}),()=>{const h=We(sn(e,n)),b=Te(h,n,p);return h?Ie(h,Object.assign(Object.assign({},n.attrs),y.value),b):b}}});function sn(e,n){let t=e.as||"";return!e.as&&!n.slots.default&&(t="input"),t}function gt(e){var n,t,r,a;const{validateOnInput:i,validateOnChange:u,validateOnBlur:f,validateOnModelUpdate:m}=Qe();return{validateOnInput:(n=e.validateOnInput)!==null&&n!==void 0?n:i,validateOnChange:(t=e.validateOnChange)!==null&&t!==void 0?t:u,validateOnBlur:(r=e.validateOnBlur)!==null&&r!==void 0?r:f,validateOnModelUpdate:(a=e.validateOnModelUpdate)!==null&&a!==void 0?a:m}}function Vt(e,n){return ye(n.attrs.type)?tn(e,"modelValue")?e.modelValue:void 0:tn(e,"modelValue")?e.modelValue:n.attrs.value}let pt=0;function En(e){const n=c(e==null?void 0:e.initialValues)||{},t=c(e==null?void 0:e.validationSchema);return t&&oe(t)&&ae(t.cast)?M(t.cast(n)||{}):M(n)}function bt(e){var n;const t=pt++,r=new Set;let a=!1;const i=Q({}),u=Q(!1),f=Q(0),m=[],s=He(En(e)),{errorBag:_,setErrorBag:g,setFieldErrorBag:A}=At(e==null?void 0:e.initialErrors),w=T(()=>D(_.value).reduce((l,o)=>{const V=_.value[o];return V&&V.length&&(l[o]=V[0]),l},{}));function N(l){const o=i.value[l];return Array.isArray(o)?o[0]:o}function Y(l){return!!i.value[l]}const Z=T(()=>D(i.value).reduce((l,o)=>{const V=N(o);return V&&(l[o]={name:c(V.name)||"",label:c(V.label)||""}),l},{})),E=T(()=>D(i.value).reduce((l,o)=>{var V;const O=N(o);return O&&(l[o]=(V=O.bails)!==null&&V!==void 0?V:!0),l},{})),U=Object.assign({},(e==null?void 0:e.initialErrors)||{}),L=(n=e==null?void 0:e.keepValuesOnUnmount)!==null&&n!==void 0?n:!1,{initialValues:X,originalInitialValues:v,setInitialValues:y}=Ot(i,s,e),p=_t(i,s,v,w),h=T(()=>[...r,...D(i.value)].reduce((l,o)=>{const V=R(s,o);return ue(l,o,V),l},{})),b=e==null?void 0:e.validationSchema,k=ln(xe,5),x=ln(xe,5),W=Le(async l=>await l==="silent"?k():x(),(l,[o])=>{const V=B.fieldsByPath.value||{},O=D(B.errorBag.value);return[...new Set([...D(l.results),...D(V),...O])].reduce((S,F)=>{const z=V[F],re=(l.results[F]||{errors:[]}).errors,H={errors:re,valid:!re.length};if(S.results[F]=H,H.valid||(S.errors[F]=H.errors[0]),!z)return le(F,re),S;if(ee(z,pe=>pe.meta.valid=H.valid),o==="silent")return S;const In=Array.isArray(z)?z.some(pe=>pe.meta.validated):z.meta.validated;return o==="validated-only"&&!In||ee(z,pe=>pe.setState({errors:H.errors})),S},{valid:l.valid,results:{},errors:{}})});function ne(l){return function(V,O){return function(S){return S instanceof Event&&(S.preventDefault(),S.stopPropagation()),d(D(i.value).reduce((F,z)=>(F[z]=!0,F),{})),u.value=!0,f.value++,Me().then(F=>{const z=M(s);if(F.valid&&typeof V=="function"){const re=M(h.value);let H=l?re:z;return F.values&&(H=F.values),V(H,{evt:S,controlledValues:re,setErrors:se,setFieldError:le,setTouched:d,setFieldTouched:ge,setValues:he,setFieldValue:ce,resetForm:G,resetField:I})}!F.valid&&typeof O=="function"&&O({values:z,evt:S,errors:F.errors,results:F.results})}).then(F=>(u.value=!1,F),F=>{throw u.value=!1,F})}}}const P=ne(!1);P.withControlled=ne(!0);const B={formId:t,fieldsByPath:i,values:s,controlledValues:h,errorBag:_,errors:w,schema:b,submitCount:f,meta:p,isSubmitting:u,fieldArrays:m,keepValuesOnUnmount:L,validateSchema:c(b)?W:void 0,validate:Me,register:Ve,unregister:je,setFieldErrorBag:A,validateField:$e,setFieldValue:ce,setValues:he,setErrors:se,setFieldError:le,setFieldTouched:ge,setTouched:d,resetForm:G,resetField:I,handleSubmit:P,stageInitialValue:Mn,unsetInitialValue:jn,setFieldInitialValue:Ze,useFieldModel:de};function C(l){return Array.isArray(l)}function ee(l,o){return Array.isArray(l)?l.forEach(o):o(l)}function te(l){Object.values(i.value).forEach(o=>{o&&ee(o,l)})}function le(l,o){A(l,o)}function se(l){g(l)}function ce(l,o,{force:V}={force:!1}){var O;const j=i.value[l],S=M(o);if(!j){ue(s,l,S);return}if(C(j)&&((O=j[0])===null||O===void 0?void 0:O.type)==="checkbox"&&!Array.isArray(o)){const z=M(De(R(s,l)||[],o,void 0));ue(s,l,z);return}let F=S;!C(j)&&j.type==="checkbox"&&!V&&!a&&(F=M(De(R(s,l),o,c(j.uncheckedValue)))),ue(s,l,F)}function he(l){D(s).forEach(o=>{delete s[o]}),D(l).forEach(o=>{ce(o,l[o])}),m.forEach(o=>o&&o.reset())}function we(l){const{value:o}=Sn(l,void 0,B);return K(o,()=>{Y(c(l))||Me({mode:"validated-only"})},{deep:!0}),r.add(c(l)),o}function de(l){return Array.isArray(l)?l.map(we):we(l)}function ge(l,o){const V=i.value[l];V&&ee(V,O=>O.setTouched(o))}function d(l){D(l).forEach(o=>{ge(o,!!l[o])})}function I(l,o){const V=i.value[l];V&&ee(V,O=>O.resetField(o))}function G(l){a=!0,te(V=>V.resetField());const o=l!=null&&l.values?l.values:v.value;y(o),he(o),l!=null&&l.touched&&d(l.touched),se((l==null?void 0:l.errors)||{}),f.value=(l==null?void 0:l.submitCount)||0,be(()=>{a=!1})}function Ee(l,o){const V=Nn(l),O=o;if(!i.value[O]){i.value[O]=V;return}const j=i.value[O];j&&!Array.isArray(j)&&(i.value[O]=[j]),i.value[O]=[...i.value[O],V]}function fe(l,o){const V=o,O=i.value[V];if(O){if(!C(O)&&l.id===O.id){delete i.value[V];return}if(C(O)){const j=O.findIndex(S=>S.id===l.id);if(j===-1)return;O.splice(j,1),O.length||delete i.value[V]}}}function Ve(l){const o=c(l.name);Ee(l,o),Se(l.name)&&K(l.name,async(O,j)=>{await be(),fe(l,j),Ee(l,O),(w.value[j]||w.value[O])&&(le(j,void 0),$e(O)),await be(),Y(j)||ke(s,j)});const V=c(l.errorMessage);V&&(U==null?void 0:U[o])!==V&&$e(o),delete U[o]}function je(l){const o=c(l.name),V=i.value[o],O=!!V&&C(V);fe(l,o),be(()=>{var j;const S=(j=c(l.keepValueOnUnmount))!==null&&j!==void 0?j:c(L),F=R(s,o);if(O&&(V===i.value[o]||!i.value[o])&&!S)if(Array.isArray(F)){const re=F.findIndex(H=>$(H,c(l.checkedValue)));if(re>-1){const H=[...F];H.splice(re,1),ce(o,H,{force:!0})}}else F===c(l.checkedValue)&&ke(s,o);if(!Y(o)){if(le(o,void 0),S||O&&Array.isArray(F)&&!hn(F))return;ke(s,o)}})}async function Me(l){const o=(l==null?void 0:l.mode)||"force";if(o==="force"&&te(S=>S.meta.validated=!0),B.validateSchema)return B.validateSchema(o);const V=await Promise.all(Object.values(i.value).map(S=>{const F=Array.isArray(S)?S[0]:S;return F?F.validate(l).then(z=>({key:c(F.name),valid:z.valid,errors:z.errors})):Promise.resolve({key:"",valid:!0,errors:[]})})),O={},j={};for(const S of V)O[S.key]={valid:S.valid,errors:S.errors},S.errors.length&&(j[S.key]=S.errors[0]);return{valid:V.every(S=>S.valid),results:O,errors:j}}async function $e(l){const o=i.value[l];return o?Array.isArray(o)?o.map(V=>V.validate())[0]:o.validate():Promise.resolve({errors:[],valid:!0})}function jn(l){ke(X.value,l)}function Mn(l,o,V=!1){ue(s,l,o),Ze(l,o),V&&!(e!=null&&e.initialValues)&&ue(v.value,l,M(o))}function Ze(l,o){ue(X.value,l,M(o))}async function xe(){const l=c(b);return l?Ae(l)||oe(l)?await ut(l,s):await ot(l,s,{names:Z.value,bailsMap:E.value}):{valid:!0,results:{},errors:{}}}const kn=P((l,{evt:o})=>{Vn(o)&&o.target.submit()});return dn(()=>{if(e!=null&&e.initialErrors&&se(e.initialErrors),e!=null&&e.initialTouched&&d(e.initialTouched),e!=null&&e.validateOnMount){Me();return}B.validateSchema&&B.validateSchema("silent")}),Se(b)&&K(b,()=>{var l;(l=B.validateSchema)===null||l===void 0||l.call(B,"validated-only")}),mn(Fe,B),Object.assign(Object.assign({},B),{handleReset:()=>G(),submitForm:kn})}function _t(e,n,t,r){const a={touched:"some",pending:"some",valid:"every"},i=T(()=>!$(n,c(t)));function u(){const m=Object.values(e.value).flat(1).filter(Boolean);return D(a).reduce((s,_)=>{const g=a[_];return s[_]=m[g](A=>A.meta[_]),s},{})}const f=He(u());return Cn(()=>{const m=u();f.touched=m.touched,f.valid=m.valid,f.pending=m.pending}),T(()=>Object.assign(Object.assign({initialValues:c(t)},f),{valid:f.valid&&!D(r.value).length,dirty:i.value}))}function Ot(e,n,t){const r=En(t),a=t==null?void 0:t.initialValues,i=Q(r),u=Q(M(r));function f(m,s=!1){i.value=M(m),u.value=M(m),s&&D(e.value).forEach(_=>{const g=e.value[_],A=Array.isArray(g)?g.some(N=>N.meta.touched):g==null?void 0:g.meta.touched;if(!g||A)return;const w=R(i.value,_);ue(n,_,M(w))})}return Se(a)&&K(a,m=>{f(m,!0)},{deep:!0}),{initialValues:i,originalInitialValues:u,setInitialValues:f}}function At(e){const n=Q({});function t(i){return Array.isArray(i)?i:i?[i]:[]}function r(i,u){if(!u){delete n.value[i];return}n.value[i]=t(u)}function a(i){n.value=D(i).reduce((u,f)=>{const m=i[f];return m&&(u[f]=t(m)),u},{})}return e&&a(e),{errorBag:n,setErrorBag:a,setFieldErrorBag:r}}const St=Ne({name:"Form",inheritAttrs:!1,props:{as:{type:String,default:"form"},validationSchema:{type:Object,default:void 0},initialValues:{type:Object,default:void 0},initialErrors:{type:Object,default:void 0},initialTouched:{type:Object,default:void 0},validateOnMount:{type:Boolean,default:!1},onSubmit:{type:Function,default:void 0},onInvalidSubmit:{type:Function,default:void 0},keepValues:{type:Boolean,default:!1}},setup(e,n){const t=ie(e,"initialValues"),r=ie(e,"validationSchema"),a=ie(e,"keepValues"),{errors:i,errorBag:u,values:f,meta:m,isSubmitting:s,submitCount:_,controlledValues:g,validate:A,validateField:w,handleReset:N,resetForm:Y,handleSubmit:Z,setErrors:E,setFieldError:U,setFieldValue:L,setValues:X,setFieldTouched:v,setTouched:y,resetField:p}=bt({validationSchema:r.value?r:void 0,initialValues:t,initialErrors:e.initialErrors,initialTouched:e.initialTouched,validateOnMount:e.validateOnMount,keepValuesOnUnmount:a}),h=Z((B,{evt:C})=>{Vn(C)&&C.target.submit()},e.onInvalidSubmit),b=e.onSubmit?Z(e.onSubmit,e.onInvalidSubmit):h;function k(B){Ke(B)&&B.preventDefault(),N(),typeof n.attrs.onReset=="function"&&n.attrs.onReset()}function x(B,C){return Z(typeof B=="function"&&!C?B:C,e.onInvalidSubmit)(B)}function W(){return M(f)}function ne(){return M(m.value)}function J(){return M(i.value)}function P(){return{meta:m.value,errors:i.value,errorBag:u.value,values:f,isSubmitting:s.value,submitCount:_.value,controlledValues:g.value,validate:A,validateField:w,handleSubmit:x,handleReset:N,submitForm:h,setErrors:E,setFieldError:U,setFieldValue:L,setValues:X,setFieldTouched:v,setTouched:y,resetForm:Y,resetField:p,getValues:W,getMeta:ne,getErrors:J}}return n.expose({setFieldError:U,setErrors:E,setFieldValue:L,setValues:X,setFieldTouched:v,setTouched:y,resetForm:Y,validate:A,validateField:w,resetField:p,getValues:W,getMeta:ne,getErrors:J}),function(){const C=e.as==="form"?e.as:We(e.as),ee=Te(C,n,P);if(!e.as)return ee;const te=e.as==="form"?{novalidate:!0}:{};return Ie(C,Object.assign(Object.assign(Object.assign({},te),n.attrs),{onSubmit:b,onReset:k}),ee)}}}),Ft=St;function wt(e){const n=Xe(Fe,void 0),t=Q([]),r=()=>{},a={fields:t,remove:r,push:r,swap:r,insert:r,update:r,replace:r,prepend:r,move:r};if(!n||!c(e))return a;const i=n.fieldArrays.find(v=>c(v.path)===c(e));if(i)return i;let u=0;function f(){return R(n==null?void 0:n.values,c(e),[])||[]}function m(){const v=f();t.value=v.map(_),s()}m();function s(){const v=t.value.length;for(let y=0;y<v;y++){const p=t.value[y];p.isFirst=y===0,p.isLast=y===v-1}}function _(v){const y=u++;return{key:y,value:Kn({get(){const h=R(n==null?void 0:n.values,c(e),[])||[],b=t.value.findIndex(k=>k.key===y);return b===-1?v:h[b]},set(h){const b=t.value.findIndex(k=>k.key===y);b!==-1&&E(b,h)}}),isFirst:!1,isLast:!1}}function g(){s(),n==null||n.validate({mode:"silent"})}function A(v){const y=c(e),p=R(n==null?void 0:n.values,y);if(!p||!Array.isArray(p))return;const h=[...p];h.splice(v,1),n==null||n.unsetInitialValue(y+`[${v}]`),n==null||n.setFieldValue(y,h),t.value.splice(v,1),g()}function w(v){const y=c(e),p=R(n==null?void 0:n.values,y),h=Oe(p)?[]:p;if(!Array.isArray(h))return;const b=[...h];b.push(v),n==null||n.stageInitialValue(y+`[${b.length-1}]`,v),n==null||n.setFieldValue(y,b),t.value.push(_(v)),g()}function N(v,y){const p=c(e),h=R(n==null?void 0:n.values,p);if(!Array.isArray(h)||!(v in h)||!(y in h))return;const b=[...h],k=[...t.value],x=b[v];b[v]=b[y],b[y]=x;const W=k[v];k[v]=k[y],k[y]=W,n==null||n.setFieldValue(p,b),t.value=k,s()}function Y(v,y){const p=c(e),h=R(n==null?void 0:n.values,p);if(!Array.isArray(h)||h.length<v)return;const b=[...h],k=[...t.value];b.splice(v,0,y),k.splice(v,0,_(y)),n==null||n.setFieldValue(p,b),t.value=k,g()}function Z(v){const y=c(e);n==null||n.setFieldValue(y,v),m(),g()}function E(v,y){const p=c(e),h=R(n==null?void 0:n.values,p);!Array.isArray(h)||h.length-1<v||(n==null||n.setFieldValue(`${p}[${v}]`,y),n==null||n.validate({mode:"validated-only"}))}function U(v){const y=c(e),p=R(n==null?void 0:n.values,y),h=Oe(p)?[]:p;if(!Array.isArray(h))return;const b=[v,...h];n==null||n.stageInitialValue(y+`[${b.length-1}]`,v),n==null||n.setFieldValue(y,b),t.value.unshift(_(v)),g()}function L(v,y){const p=c(e),h=R(n==null?void 0:n.values,p),b=Oe(h)?[]:[...h];if(!Array.isArray(h)||!(v in h)||!(y in h))return;const k=[...t.value],x=k[v];k.splice(v,1),k.splice(y,0,x);const W=b[v];b.splice(v,1),b.splice(y,0,W),n==null||n.setFieldValue(p,b),t.value=k,g()}const X={fields:t,remove:A,push:w,swap:N,insert:Y,update:E,replace:Z,prepend:U,move:L};return n.fieldArrays.push(Object.assign({path:e,reset:m},X)),fn(()=>{const v=n.fieldArrays.findIndex(y=>c(y.path)===c(e));v>=0&&n.fieldArrays.splice(v,1)}),K(f,v=>{const y=t.value.map(p=>p.value);$(v,y)||m()}),X}Ne({name:"FieldArray",inheritAttrs:!1,props:{name:{type:String,required:!0}},setup(e,n){const{push:t,remove:r,swap:a,insert:i,replace:u,update:f,prepend:m,move:s,fields:_}=wt(ie(e,"name"));function g(){return{fields:_.value,push:t,remove:r,swap:a,insert:i,update:f,replace:u,prepend:m,move:s}}return n.expose({push:t,remove:r,swap:a,insert:i,update:f,replace:u,prepend:m,move:s}),()=>Te(void 0,n,g)}});Ne({name:"ErrorMessage",props:{as:{type:String,default:void 0},name:{type:String,required:!0}},setup(e,n){const t=vn(Fe,void 0),r=T(()=>t==null?void 0:t.errors.value[e.name]);function a(){return{message:r.value}}return()=>{if(!r.value)return;const i=e.as?We(e.as):e.as,u=Te(i,n,a),f=Object.assign({role:"alert"},n.attrs);return!i&&(Array.isArray(u)||!u)&&(u!=null&&u.length)?u:(Array.isArray(u)||!u)&&!(u!=null&&u.length)?Ie(i||"span",f,r.value):Ie(i,f,u)}}});const Et={class:"input"},jt={class:"input__wrap"},Mt={class:"input__label d-flex align-items-center"},kt={class:"input__label-text mr-1"},It=["value","name","type","placeholder"],Bt={key:0,class:"input__error"},cn={__name:"AdminInputComponent",props:{type:{type:String,default:"text"},placeholder:{type:String},errors:{type:Array},label:{type:String},name:{type:String,required:!0},modelValue:{required:!0},rules:{}},emits:["update:modelValue"],setup(e){const n=e,{errorMessage:t,value:r}=Fn(()=>n.name,n.rules);return(a,i)=>(me(),_e("div",Et,[q("div",jt,[q("label",Mt,[q("span",kt,en(e.label)+":",1),q("input",{value:e.modelValue,name:e.name,type:e.type,placeholder:e.placeholder,onInput:i[0]||(i[0]=u=>a.$emit("update:modelValue",u.target.value)),class:"input__item form-control w-100"},null,40,It)])]),c(t)?(me(),_e("span",Bt,en(c(t)),1)):Rn("",!0)]))}},Ct={class:"image-upload"},Nt={class:"image-upload__label"},Rt={class:"image-upload__img-wrap rounded border border-secondary mb-2"},Tt={key:0,class:"fa-solid fa-image"},$t=["src"],Ut=q("input",{type:"file",accept:"image/png, image/jpeg",class:"image-upload__input"},null,-1),Pt=q("button",{class:"btn btn-secondary w-100"},"Добавить",-1),zt={__name:"ImageUpload",setup(e){const n=Q({src:null,url:"",text:""});return(t,r)=>(me(),_e("div",Ct,[q("label",Nt,[q("div",Rt,[n.value.src?(me(),_e("img",{key:1,src:n.value.src,alt:"Upload image",class:"image-upload__img"},null,8,$t)):(me(),_e("i",Tt))]),Ut,Pt]),Be(cn,{modelValue:n.value.url,"onUpdate:modelValue":r[0]||(r[0]=a=>n.value.url=a),name:"film-url",label:"URL"},null,8,["modelValue"]),Be(cn,{modelValue:n.value.text,"onUpdate:modelValue":r[1]||(r[1]=a=>n.value.text=a),name:"film-text",label:"Text"},null,8,["modelValue"])]))}},Dt={class:"admin__section"},Lt=q("h2",{class:"text-center mb-4"},"На главной верх",-1),Gt={class:"admin__block shadow-lg rounded p-3"},qt=q("div",{class:"admin__switch-wrap"},[q("div",{class:"custom-control custom-switch custom-switch-lg admin__switch ml-auto"},[q("input",{type:"checkbox",class:"custom-control-input",id:"customSwitch1"}),q("label",{class:"custom-control-label",for:"customSwitch1"})])],-1),Wt=q("div",{class:"mb-4"},"Размер: 1000х190",-1),Yt={__name:"AdminBannersView",setup(e){return(n,t)=>(me(),Tn(Bn,null,{default:nn(()=>[q("section",Dt,[Lt,q("div",Gt,[qt,Wt,Be(c(Ft),{class:"admin__form-images"},{default:nn(()=>[Be(zt)]),_:1})])])]),_:1}))}};export{Yt as default};