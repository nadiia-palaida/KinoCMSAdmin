import{r as p,x as B,s as $,l as F,d as f,o as u,e as m,b as t,w as q,v as L,h as i,i as C,F as _,j as S,k as N,a as R,f as T}from"./index-5ccc9495.js";import{_ as j}from"./TabsComponent-2b439d40.js";import{a as G,_ as c,F as K}from"./InputComponent-926cc09d.js";import{_ as V}from"./TextareaComponent-3fceddef.js";import{_ as y}from"./ImageUpload-734539ec.js";import{l as g}from"./languages-14535d94.js";import{V as M,r as A,d as E,b as O,a as P}from"./index-2c7431f0.js";import{p as z,a as H}from"./preparedDataToFirebase-469b79a8.js";import{u as J}from"./general-e95eafb2.js";import{a as Q}from"./queriesFirestore-d3fa99f6.js";import{v as h}from"./v4-a960c1f4.js";import"./vee-validate-6f28d402.js";import"./index-dbcece3d.js";const W={key:0,class:"overlay overlay-page"},X=t("i",{class:"fas fa-2x fa-sync-alt fa-spin"},null,-1),Y=[X],Z={class:"d-flex"},ee={class:"custom-control custom-switch custom-switch-lg admin__switch mr-4"},ae=t("label",{class:"custom-control-label",for:"customSwitch1"},null,-1),le={class:"d-flex mb-4"},se=t("div",{class:"input__label-text"},"Головна картинка",-1),te={class:"mb-4"},oe=t("div",{class:"mb-2"},[t("div",{class:"input__label-text"},"Галерея картинок"),t("div",{class:"input__label-text"},"Размер: 1000х190")],-1),ie={type:"button",class:"btn btn-info mb-4"},ne={key:0,class:"d-flex flex-wrap"},ue={class:"seo-block"},re=t("h4",{class:"text-center mb-4"},"Seo блок",-1),me={type:"submit",class:"btn btn-success"},de={key:0,class:"spinner-border spinner-border-sm",role:"status"},ce=t("span",{class:"sr-only"},"Loading...",-1),ve=[ce],pe={key:1},$e={__name:"DefaultPageView",setup(fe){const b=J(),l=p(null),v=p(!1),e=p({id:h(),created:null,active:!0,canDelete:!0,ua:{name:"",description:"",banner:{},images:[],seo:{url:"",title:"",keywords:"",description:""}},ru:{name:"",description:"",banner:{},images:[],seo:{url:"",title:"",keywords:"",description:""}}});function w(n){if(n.target.files.length)for(let a=0;a<n.target.files.length;a++)e.value[l.value].images.push({fileId:h(),file:n.target.files[a]})}function k(){e.value[l.value].banner={}}function x(n){e.value[l.value].images.splice(n,1)}const U=B(),d=$();async function D(){if(G()){v.value=!0;let a={id:e.value.id,active:e.value.active,canDelete:e.value.canDelete};for(let o in e.value)if(g.some(r=>r.value===o)){const r=await z(e.value[o].images,`pages/${e.value.id}`),I=await H(e.value[o].banner,`pages/${e.value.id}`);a={...a,created:d.params.id?e.value.created:M(),[o]:{...e.value[o],images:r,banner:I}}}const s=A(E,"pages",e.value.id);d.params.id?await O(s,a):await P(s,a),await U.replace({name:"admin-pages"}),v.value=!1}}return F(async()=>{l.value=g[0].value,d.params.id&&(e.value=await Q("pages",d.params.id)),b.isLoading=!1}),(n,a)=>f(b).isLoading?(u(),m("div",W,Y)):(u(),m(_,{key:1},[t("div",Z,[t("div",ee,[q(t("input",{"onUpdate:modelValue":a[0]||(a[0]=s=>e.value.active=s),type:"checkbox",class:"custom-control-input",id:"customSwitch1"},null,512),[[L,e.value.active]]),ae]),i(j,{modelValue:l.value,"onUpdate:modelValue":a[1]||(a[1]=s=>l.value=s),options:f(g),class:"mb-4"},null,8,["modelValue","options"])]),i(f(K),{onSubmit:D},{default:C(()=>[i(c,{modelValue:e.value[l.value].name,"onUpdate:modelValue":a[2]||(a[2]=s=>e.value[l.value].name=s),name:"item-name",label:"Назва",rules:"required",class:"col-6 mb-4"},null,8,["modelValue"]),i(V,{modelValue:e.value[l.value].description,"onUpdate:modelValue":a[3]||(a[3]=s=>e.value[l.value].description=s),name:"item-description",label:"Опис",rules:"required",class:"mb-4"},null,8,["modelValue"]),t("div",le,[se,i(y,{modelValue:e.value[l.value].banner,"onUpdate:modelValue":a[4]||(a[4]=s=>e.value[l.value].banner=s),onDeleteImage:k,name:"item-banner","has-text":!1,"has-url":!1,class:"col-2"},null,8,["modelValue"])]),t("div",te,[oe,t("label",ie,[S(" Додати фото "),t("input",{onChange:w,type:"file",multiple:"",accept:"image/png, image/jpeg, image/jpg, image/webp, image/svg",class:"image-upload__input"},null,32)]),e.value[l.value].images.length?(u(),m("div",ne,[(u(!0),m(_,null,N(n.imageItem[l.value].images,(s,o)=>(u(),R(y,{modelValue:s[l.value].images[o],"onUpdate:modelValue":r=>s[l.value].images[o]=r,onDeleteImage:r=>x(o),name:"item-image","has-text":!1,"has-url":!1,class:"col-2 mb-2",key:`item-image-${o}`},null,8,["modelValue","onUpdate:modelValue","onDeleteImage"]))),128))])):T("",!0)]),t("div",ue,[re,i(c,{modelValue:e.value[l.value].seo.url,"onUpdate:modelValue":a[5]||(a[5]=s=>e.value[l.value].seo.url=s),name:"seo-url",label:"URL",rules:"required",class:"mb-4"},null,8,["modelValue"]),i(c,{modelValue:e.value[l.value].seo.title,"onUpdate:modelValue":a[6]||(a[6]=s=>e.value[l.value].seo.title=s),name:"seo-title",label:"Title",rules:"required",class:"mb-4"},null,8,["modelValue"]),i(c,{modelValue:e.value[l.value].seo.keywords,"onUpdate:modelValue":a[7]||(a[7]=s=>e.value[l.value].seo.keywords=s),name:"seo-keywords",label:"Keywords",rules:"required",class:"mb-4"},null,8,["modelValue"]),i(V,{modelValue:e.value[l.value].seo.description,"onUpdate:modelValue":a[8]||(a[8]=s=>e.value[l.value].seo.description=s),name:"seo-description",label:"Description",rules:"required",class:"mb-4"},null,8,["modelValue"])]),t("button",me,[v.value?(u(),m("div",de,ve)):(u(),m("span",pe,"Зберегти"))])]),_:1})],64))}};export{$e as default};