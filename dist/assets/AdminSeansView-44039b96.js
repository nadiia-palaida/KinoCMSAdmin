import{r as i,d as n,J as f,t as N,s as U,c as J,a as O}from"./index-08899976.js";import{_}from"./SelectComponent-2f1fcbef.js";import{a as C,_ as v,F as D}from"./vee-validate-c2eed9a0.js";import{r as o,c as E,x as L,s as T,l as $,z,o as u,a as V,i as A,d as b,h as r,f as H,b as w,e as h}from"./index-49708047.js";import{v as M}from"./v4-a960c1f4.js";const j={type:"submit",class:"btn btn-success"},G={key:0,class:"spinner-border spinner-border-sm",role:"status"},K=w("span",{class:"sr-only"},"Loading...",-1),P=[K],Q={key:1},ae={__name:"AdminSeansView",props:{hallId:{required:!0}},setup(g){const d=g,S="ua",y=o([]),t=o({}),m=o([]),c=o(!1),q=E(()=>y.value.map(l=>({label:l[S].name,value:l.id}))),a=o({id:M(),film_id:null,cinema_id:d.cinemaId,hall_id:d.hallId,seats:[],type:null,date:null,time:null,price:null});async function x(){const l=await R(a.value.film_id);return a.value.film_id&&l?m.value=l.type.map(e=>({label:e,value:e})):[]}async function F(){(await N(U(n,"films"))).forEach(e=>{y.value.push(e.data())})}async function k(l){const e=i(n,"halls",l),s=await f(e);s.exists()&&(t.value=s.data())}async function R(l){const e=i(n,"films",l),s=await f(e);return s.exists()?s.data():null}const B=L(),p=T();async function I(){if(C()){c.value=!0;const e=i(n,"seanses",a.value.id),s={...a.value};p.params.id?await J(e,s):await O(e,s),await B.replace({name:"admin-cinemas-hall",params:{id:t.value.id}}),c.value=!1}}return $(async()=>{if(await F(),await k(d.hallId),t.value&&(a.value.cinema_id=t.value.cinema_id,a.value.seats=JSON.parse(JSON.stringify(t.value.seats))),p.params.id){const l=i(n,"seanses",p.params.id),e=await f(l);e.exists()&&(a.value=e.data())}}),z(()=>a.value.film_id,l=>{x()}),(l,e)=>(u(),V(b(D),{onSubmit:I},{default:A(()=>[r(_,{modelValue:a.value.film_id,"onUpdate:modelValue":e[0]||(e[0]=s=>a.value.film_id=s),options:b(q),label:"Фільм",rules:"required",name:"seans-film",class:"col-3"},null,8,["modelValue","options"]),m.value.length?(u(),V(_,{key:0,modelValue:a.value.type,"onUpdate:modelValue":e[1]||(e[1]=s=>a.value.type=s),options:m.value,rules:"required",name:"seans-type",label:"Тип фільму",class:"col-3 mb-4"},null,8,["modelValue","options"])):H("",!0),r(v,{modelValue:a.value.date,"onUpdate:modelValue":e[2]||(e[2]=s=>a.value.date=s),name:"seans-date",type:"date",label:"Дата",rules:"required",class:"col-2 mb-4"},null,8,["modelValue"]),r(v,{modelValue:a.value.time,"onUpdate:modelValue":e[3]||(e[3]=s=>a.value.time=s),name:"seans-time",type:"time",label:"Час",rules:"required",class:"col-2 mb-4"},null,8,["modelValue"]),r(v,{modelValue:a.value.price,"onUpdate:modelValue":e[4]||(e[4]=s=>a.value.price=s),name:"seans-price",type:"price",label:"Ціна",rules:"required|numeric",class:"col-2 mb-4"},null,8,["modelValue"]),w("button",j,[c.value?(u(),h("div",G,P)):(u(),h("span",Q,"Зберегти"))])]),_:1}))}};export{ae as default};
