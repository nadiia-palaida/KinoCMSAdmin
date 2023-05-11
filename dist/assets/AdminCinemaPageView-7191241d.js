import{u as G}from"./general-4d5aa9bd.js";import{l as V,_ as H,a as h}from"./TextareaComponent-0882fd6c.js";import{a as A,_ as p,F as J}from"./vee-validate-42a3978c.js";import{_ as y}from"./ImageUpload-6e248471.js";import{r as f,x as K,s as O,l as P,g as z,q as Q,d as k,o as u,e as d,h as n,i as w,F as x,b as s,j as I,k as C,a as W,f as F,t as U}from"./index-57ff8659.js";import{r as q,d as _,J as X,c as Z,a as ee,o as ae,e as le,_ as se,s as oe,t as te}from"./index-08899976.js";import{p as ne,a as L}from"./preparedDataToFirebase-3ed6b348.js";import{h as ie}from"./moment-fbc5633a.js";import{v as S}from"./v4-a960c1f4.js";import"./index-8d32edcd.js";const ue={key:0,class:"overlay overlay-page"},de=s("i",{class:"fas fa-2x fa-sync-alt fa-spin"},null,-1),re=[de],me={class:"d-flex mb-4"},ce=s("div",{class:"input__label-text"},"Логотип",-1),ve={class:"d-flex mb-4"},pe=s("div",{class:"input__label-text"},"Фото верхнего баннера",-1),fe={class:"mb-4"},_e=s("div",{class:"mb-2"},[s("div",{class:"input__label-text"},"Галерея картинок"),s("div",{class:"input__label-text"},"Размер: 1000х190")],-1),ge={type:"button",class:"btn btn-info mb-4"},be={key:0,class:"d-flex flex-wrap"},Ve=s("h4",{class:"text-center mb-4"},"Список залів",-1),he={key:0,class:"table"},ye=s("thead",null,[s("tr",null,[s("th",{scope:"col"},"#"),s("th",{scope:"col"},"Назва"),s("th",{scope:"col"},"Дата створення"),s("th",{scope:"col"}),s("th",{scope:"col"})])],-1),ke={scope:"row"},we=s("i",{class:"fa-solid fa-pen"},null,-1),xe=["onClick"],Ue=s("i",{class:"fa-solid fa-trash-can"},null,-1),qe=[Ue],De={class:"seo-block"},$e=s("h4",{class:"text-center mb-4"},"Seo блок",-1),Ie={type:"submit",class:"btn btn-success"},Ce={key:0,class:"spinner-border spinner-border-sm",role:"status"},Fe=s("span",{class:"sr-only"},"Loading...",-1),Le=[Fe],Se={key:1},Je={__name:"AdminCinemaPageView",setup(Be){const D=G(),o=f(null),g=f(!1),e=f({id:S(),ua:{name:"",description:"",condition:"",logo:{},banner:{},images:[],seo:{url:"",title:"",keywords:"",description:""}},ru:{name:"",description:"",condition:"",logo:{},banner:{},images:[],seo:{url:"",title:"",keywords:"",description:""}}}),m=f([]);function B(t){return ie(t.toDate()).format("DD.MM.YYYY")}function R(t){if(t.target.files.length)for(let a=0;a<t.target.files.length;a++)e.value[o.value].images.push({fileId:S(),file:t.target.files[a]})}function M(t){e.value[o.value].images.splice(t,1)}function $(t){e.value[o.value][t]={}}let v=[];function N(t){v.push(m.value[t].id),m.value.splice(t,1)}const T=K(),b=O();async function Y(){if(A()){g.value=!0;let a={id:e.value.id};for(let l in e.value)if(V.some(i=>i.value===l)){const i=await ne(e.value[l].images,`cinemas/${e.value.id}`),c=await L(e.value[l].logo,`cinemas/${e.value.id}`),E=await L(e.value[l].banner,`cinemas/${e.value.id}`);a={...a,[l]:{...e.value[l],images:i,logo:c,banner:E}}}const r=q(_,"cinemas",e.value.id);b.params.id?await Z(r,a):await ee(r,a),v.length&&(v.forEach(async l=>{await ae(q(_,"halls",l))}),v=[]),await T.replace({name:"admin-cinemas"}),g.value=!1}}async function j(){const t=le(oe(_,"halls"),se("cinema_id","==",e.value.id));(await te(t)).forEach(r=>{m.value.push(r.data())})}return P(async()=>{if(o.value=V[0].value,b.params.id){const t=q(_,"cinemas",b.params.id),a=await X(t);a.exists()&&(e.value=a.data()),j()}D.isLoading=!1}),z(()=>{}),(t,a)=>{const r=Q("router-link");return k(D).isLoading?(u(),d("div",ue,re)):(u(),d(x,{key:1},[n(H,{modelValue:o.value,"onUpdate:modelValue":a[0]||(a[0]=l=>o.value=l),options:k(V),class:"mb-4"},null,8,["modelValue","options"]),n(k(J),{onSubmit:Y},{default:w(()=>[n(p,{modelValue:e.value[o.value].name,"onUpdate:modelValue":a[1]||(a[1]=l=>e.value[o.value].name=l),name:"cinema-name",label:"Назва кінотеатру",rules:"required",class:"col-3 mb-4"},null,8,["modelValue"]),n(h,{modelValue:e.value[o.value].description,"onUpdate:modelValue":a[2]||(a[2]=l=>e.value[o.value].description=l),name:"cinema-description",label:"Опис",rules:"required",class:"mb-4"},null,8,["modelValue"]),n(h,{modelValue:e.value[o.value].condition,"onUpdate:modelValue":a[3]||(a[3]=l=>e.value[o.value].condition=l),name:"cinema-condition",label:"Умова",rules:"required",class:"mb-4"},null,8,["modelValue"]),s("div",me,[ce,n(y,{modelValue:e.value[o.value].logo,"onUpdate:modelValue":a[4]||(a[4]=l=>e.value[o.value].logo=l),onDeleteImage:a[5]||(a[5]=l=>$("logo")),name:"cinema-logo","has-text":!1,"has-url":!1,class:"col-2"},null,8,["modelValue"])]),s("div",ve,[pe,n(y,{modelValue:e.value[o.value].banner,"onUpdate:modelValue":a[6]||(a[6]=l=>e.value[o.value].banner=l),onDeleteImage:a[7]||(a[7]=l=>$("banner")),name:"cinema-banner","has-text":!1,"has-url":!1,class:"col-2"},null,8,["modelValue"])]),s("div",fe,[_e,s("label",ge,[I(" Додати фото "),s("input",{onChange:R,type:"file",multiple:"",accept:"image/png, image/jpeg, image/jpg, image/webp, image/svg",class:"image-upload__input"},null,32)]),e.value[o.value].images.length?(u(),d("div",be,[(u(!0),d(x,null,C(e.value[o.value].images,(l,i)=>(u(),W(y,{modelValue:e.value[o.value].images[i],"onUpdate:modelValue":c=>e.value[o.value].images[i]=c,onDeleteImage:c=>M(i),name:"cinema-image","has-text":!1,"has-url":!1,class:"col-2 mb-2",key:`cinema-image-${i}`},null,8,["modelValue","onUpdate:modelValue","onDeleteImage"]))),128))])):F("",!0)]),s("div",null,[Ve,m.value.length?(u(),d("table",he,[ye,s("tbody",null,[(u(!0),d(x,null,C(m.value,(l,i)=>(u(),d("tr",null,[s("th",ke,U(i+1),1),s("td",null,U(l[o.value].name),1),s("td",null,U(B(l.created)),1),s("td",null,[n(r,{to:{name:"admin-cinemas-hall",params:{id:l.id}}},{default:w(()=>[we]),_:2},1032,["to"])]),s("td",null,[s("button",{onClick:c=>N(i),type:"button"},qe,8,xe)])]))),256))])])):F("",!0),n(r,{to:{name:"admin-cinemas-hall",query:{cinema:e.value.id}},class:"btn btn-info mb-4"},{default:w(()=>[I("Додати зал ")]),_:1},8,["to"])]),s("div",De,[$e,n(p,{modelValue:e.value[o.value].seo.url,"onUpdate:modelValue":a[8]||(a[8]=l=>e.value[o.value].seo.url=l),name:"seo-url",label:"URL",rules:"required",class:"mb-4"},null,8,["modelValue"]),n(p,{modelValue:e.value[o.value].seo.title,"onUpdate:modelValue":a[9]||(a[9]=l=>e.value[o.value].seo.title=l),name:"seo-title",label:"Title",rules:"required",class:"mb-4"},null,8,["modelValue"]),n(p,{modelValue:e.value[o.value].seo.keywords,"onUpdate:modelValue":a[10]||(a[10]=l=>e.value[o.value].seo.keywords=l),name:"seo-keywords",label:"Keywords",rules:"required",class:"mb-4"},null,8,["modelValue"]),n(h,{modelValue:e.value[o.value].seo.description,"onUpdate:modelValue":a[11]||(a[11]=l=>e.value[o.value].seo.description=l),name:"seo-description",label:"Description",rules:"required",class:"mb-4"},null,8,["modelValue"])]),s("button",Ie,[g.value?(u(),d("div",Ce,Le)):(u(),d("span",Se,"Зберегти"))])]),_:1})],64))}}};export{Je as default};
