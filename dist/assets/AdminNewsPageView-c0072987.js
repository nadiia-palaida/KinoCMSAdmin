import{r as p,x as D,s as F,l as L,d as b,o as u,e as r,b as o,w as S,v as C,h as t,i as N,F as g,j as R,k as T,a as j,f as G}from"./index-49708047.js";import{u as A}from"./general-332ba11c.js";import{l as f,_ as J,a as V}from"./TextareaComponent-21f0aea7.js";import{a as K,_ as m,F as M}from"./vee-validate-c2eed9a0.js";import{_ as w}from"./ImageUpload-e549be2c.js";import{p as E,a as O}from"./preparedDataToFirebase-3ed6b348.js";import{r as y,d as k,J as P,V as z,c as H,a as Q}from"./index-08899976.js";import{v as h}from"./v4-a960c1f4.js";import"./index-403c6953.js";const W={key:0,class:"overlay overlay-page"},X=o("i",{class:"fas fa-2x fa-sync-alt fa-spin"},null,-1),Y=[X],Z={class:"d-flex"},ee={class:"custom-control custom-switch custom-switch-lg admin__switch mr-4"},ae=o("label",{class:"custom-control-label",for:"customSwitch1"},null,-1),le={class:"row"},se={class:"d-flex mb-4"},oe=o("div",{class:"input__label-text"},"Головна картинка",-1),te={class:"mb-4"},ne=o("div",{class:"mb-2"},[o("div",{class:"input__label-text"},"Галерея картинок"),o("div",{class:"input__label-text"},"Размер: 1000х190")],-1),ie={type:"button",class:"btn btn-info mb-4"},ue={key:0,class:"d-flex flex-wrap"},de={class:"seo-block"},re=o("h4",{class:"text-center mb-4"},"Seo блок",-1),me={type:"submit",class:"btn btn-success"},ce={key:0,class:"spinner-border spinner-border-sm",role:"status"},ve=o("span",{class:"sr-only"},"Loading...",-1),pe=[ve],be={key:1},qe={__name:"AdminNewsPageView",setup(fe){const _=A(),l=p(null),v=p(!1),e=p({id:h(),created:null,active:!0,publication_date:null,ua:{name:"",description:"",banner:{},images:[],video_link:"",seo:{url:"",title:"",keywords:"",description:""}},ru:{name:"",description:"",banner:{},images:[],video_link:"",seo:{url:"",title:"",keywords:"",description:""}}});function x(i){if(i.target.files.length)for(let a=0;a<i.target.files.length;a++)e.value[l.value].images.push({fileId:h(),file:i.target.files[a]})}function U(){e.value[l.value].banner={}}function q(i){e.value[l.value].images.splice(i,1)}const I=D(),c=F();async function $(){if(K()){v.value=!0;let a={id:e.value.id,active:e.value.active,publication_date:e.value.publication_date};for(let n in e.value)if(f.some(d=>d.value===n)){const d=await E(e.value[n].images,`news/${e.value.id}`),B=await O(e.value[n].banner,`news/${e.value.id}`);a={...a,created:c.params.id?e.value.created:z(),[n]:{...e.value[n],images:d,banner:B}}}const s=y(k,"news",e.value.id);c.params.id?await H(s,a):await Q(s,a),await I.replace({name:"admin-news"}),v.value=!1}}return L(async()=>{if(l.value=f[0].value,c.params.id){const i=y(k,"news",c.params.id),a=await P(i);a.exists()&&(e.value=a.data())}_.isLoading=!1}),(i,a)=>b(_).isLoading?(u(),r("div",W,Y)):(u(),r(g,{key:1},[o("div",Z,[o("div",ee,[S(o("input",{"onUpdate:modelValue":a[0]||(a[0]=s=>e.value.active=s),type:"checkbox",class:"custom-control-input",id:"customSwitch1"},null,512),[[C,e.value.active]]),ae]),t(J,{modelValue:l.value,"onUpdate:modelValue":a[1]||(a[1]=s=>l.value=s),options:b(f),class:"mb-4"},null,8,["modelValue","options"])]),t(b(M),{onSubmit:$},{default:N(()=>[o("div",le,[t(m,{modelValue:e.value[l.value].name,"onUpdate:modelValue":a[2]||(a[2]=s=>e.value[l.value].name=s),name:"news-name",label:"Назва новини",rules:"required",class:"col-6 mb-4"},null,8,["modelValue"]),t(m,{modelValue:e.value.publication_date,"onUpdate:modelValue":a[3]||(a[3]=s=>e.value.publication_date=s),name:"news-publication-date",type:"date",label:"Дата публікації",rules:"required",class:"col-6 mb-4"},null,8,["modelValue"])]),t(V,{modelValue:e.value[l.value].description,"onUpdate:modelValue":a[4]||(a[4]=s=>e.value[l.value].description=s),name:"news-description",label:"Опис",rules:"required",class:"mb-4"},null,8,["modelValue"]),o("div",se,[oe,t(w,{modelValue:e.value[l.value].banner,"onUpdate:modelValue":a[5]||(a[5]=s=>e.value[l.value].banner=s),onDeleteImage:U,name:"news-banner","has-text":!1,"has-url":!1,class:"col-2"},null,8,["modelValue"])]),o("div",te,[ne,o("label",ie,[R(" Додати фото "),o("input",{onChange:x,type:"file",multiple:"",accept:"image/png, image/jpeg, image/jpg, image/webp, image/svg",class:"image-upload__input"},null,32)]),e.value[l.value].images.length?(u(),r("div",ue,[(u(!0),r(g,null,T(e.value[l.value].images,(s,n)=>(u(),j(w,{modelValue:e.value[l.value].images[n],"onUpdate:modelValue":d=>e.value[l.value].images[n]=d,onDeleteImage:d=>q(n),name:"news-image","has-text":!1,"has-url":!1,class:"col-2 mb-2",key:`news-image-${n}`},null,8,["modelValue","onUpdate:modelValue","onDeleteImage"]))),128))])):G("",!0)]),t(m,{modelValue:e.value[l.value].video_link,"onUpdate:modelValue":a[6]||(a[6]=s=>e.value[l.value].video_link=s),name:"news-video",label:"Посилання на відео",rules:"required|url",class:"col-6 mb-4"},null,8,["modelValue"]),o("div",de,[re,t(m,{modelValue:e.value[l.value].seo.url,"onUpdate:modelValue":a[7]||(a[7]=s=>e.value[l.value].seo.url=s),name:"seo-url",label:"URL",rules:"required",class:"mb-4"},null,8,["modelValue"]),t(m,{modelValue:e.value[l.value].seo.title,"onUpdate:modelValue":a[8]||(a[8]=s=>e.value[l.value].seo.title=s),name:"seo-title",label:"Title",rules:"required",class:"mb-4"},null,8,["modelValue"]),t(m,{modelValue:e.value[l.value].seo.keywords,"onUpdate:modelValue":a[9]||(a[9]=s=>e.value[l.value].seo.keywords=s),name:"seo-keywords",label:"Keywords",rules:"required",class:"mb-4"},null,8,["modelValue"]),t(V,{modelValue:e.value[l.value].seo.description,"onUpdate:modelValue":a[10]||(a[10]=s=>e.value[l.value].seo.description=s),name:"seo-description",label:"Description",rules:"required",class:"mb-4"},null,8,["modelValue"])]),o("button",me,[v.value?(u(),r("div",ce,pe)):(u(),r("span",be,"Зберегти"))])]),_:1})],64))}};export{qe as default};
