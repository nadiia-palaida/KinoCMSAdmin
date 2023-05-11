import{r as v,c as L,g as U,o as d,e as p,t as D,f as N,b as n,w as I,v as M,h as g,i as x,j as R,d as y,F as V,k as F,a as S,l as C,m as w,n as j,p as q}from"./index-49708047.js";import{F as O}from"./vee-validate-c2eed9a0.js";import{_ as E}from"./ImageUpload-e549be2c.js";import{_ as G}from"./SelectComponent-2f1fcbef.js";import{f as T,u as A,t as K,s as P,a as Y,r as z,d as B,b as H}from"./index-08899976.js";import{v as $}from"./v4-a960c1f4.js";import{_ as W}from"./RadioComponent-a6c528fc.js";import{u as J}from"./general-332ba11c.js";import"./index-403c6953.js";const Q={class:"admin__section"},X={key:0,class:"text-center mb-4"},Z={class:"admin__block shadow-lg rounded p-3"},ee={class:"admin__switch-wrap"},se={class:"custom-control custom-switch custom-switch-lg admin__switch ml-auto"},ae=n("label",{class:"custom-control-label",for:"customSwitch1"},null,-1),le=n("div",{class:"mb-4"},"Размер: 1000х190",-1),ne={type:"button",class:"btn btn-info mb-4"},te={class:"admin__form-images mb-2"},oe={type:"submit",class:"btn btn-success"},ie={key:0,class:"spinner-border spinner-border-sm",role:"status"},ue=n("span",{class:"sr-only"},"Loading...",-1),re=[ue],de={key:1},k={__name:"BannersMultiple",props:{bannersInfo:{type:Object,required:!0},loading:{type:Boolean,default:!1},title:{type:String},firebasePathName:{type:String,required:!0},hasText:{type:Boolean,default:!0}},emits:["saveChanges"],setup(_,{emit:c}){const o=_,m=[{label:"5",value:5},{label:"10",value:10},{label:"15",value:15},{label:"20",value:20},{label:"30",value:30}],a=v({active:!0,items:[],speed:0}),h=L(()=>a.value.items);function r(l,e){a.value.items[e]?a.value.items[e]=l:a.value.items.push(l)}function i(l){if(l.target.files.length)for(let e=0;e<l.target.files.length;e++)a.value.items.push({id:$(),fileId:$(),file:l.target.files[e],url:"",text:""})}function u(l){a.value.items.splice(l,1)}async function b(){let l=[];for(let s=0;s<a.value.items.length;s++){let t=a.value.items[s];l.push({id:t.id,fileId:t.fileId,file:await T(t.fileId,o.firebasePathName)?t.file:await A(`${o.firebasePathName}/${t.fileId}`,t.file),url:t.url,text:t.text})}a.value.items=l;const e={active:a.value.active,items:l,speed:a.value.speed};c("saveChanges",e)}return U(()=>{a.value=o.bannersInfo,a.value.speed||(a.value.speed=m[0].value)}),(l,e)=>(d(),p("section",Q,[_.title?(d(),p("h2",X,D(_.title),1)):N("",!0),n("div",Z,[n("div",ee,[n("div",se,[I(n("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>a.value.active=s),type:"checkbox",class:"custom-control-input",id:"customSwitch1"},null,512),[[M,a.value.active]]),ae])]),le,g(y(O),{onSubmit:b},{default:x(()=>[n("label",ne,[R(" Додати фото "),n("input",{onChange:i,type:"file",multiple:"",accept:"image/png, image/jpeg, image/jpg, image/webp, image/svg",class:"image-upload__input"},null,32)]),n("div",te,[y(h)?(d(!0),p(V,{key:0},F(y(h),(s,t)=>(d(),S(E,{modelValue:s,hasText:_.hasText,"onUpdate:modelValue":f=>r(f,t),onDeleteImage:f=>u(t),class:"mr-4 mb-4",key:`top-banner-image-${s.id}`},null,8,["modelValue","hasText","onUpdate:modelValue","onDeleteImage"]))),128)):N("",!0)]),g(G,{modelValue:a.value.speed,"onUpdate:modelValue":e[1]||(e[1]=s=>a.value.speed=s),options:m,label:"Швидкість каруселі",name:"top-banners-carousel-speed",class:"col-3"},null,8,["modelValue"]),n("button",oe,[_.loading?(d(),p("div",ie,re)):(d(),p("span",de,"Зберегти"))])]),_:1})])]))}},ce={class:"admin__section"},me=n("h2",{class:"text-center mb-4"},"Банер на фоні",-1),fe={class:"admin__block shadow-lg rounded p-3"},ve=n("div",{class:"mb-4"},"Размер: 2000х3000",-1),pe={class:"d-flex"},_e=n("span",{class:"mr-2"},"Вибрати колір",-1),be={type:"submit",class:"btn btn-success"},he={key:0,class:"spinner-border spinner-border-sm",role:"status"},ge=n("span",{class:"sr-only"},"Loading...",-1),ye=[ge],Ie={key:1},Ne={__name:"BannerBackground",props:{bannersInfo:{type:Object,required:!0},loading:{type:Boolean,default:!1},firebasePathName:{type:String,required:!0}},emits:["saveChanges"],setup(_,{emit:c}){const o=_,m="photo",a="color",h=[{label:" Фото на фон",value:"photo"},{label:"Просто фон",value:"color"}],r=v(null),i=v({file:"",fileId:""}),u=v(null);async function b(){let l=null;u.value===m?(l=i.value,l.file=await T(i.value.fileId,o.firebasePathName)?i.value.file:await A(`${o.firebasePathName}/${i.value.fileId}`,i.value.file)):l=r.value;const e={type:u.value,banner:l};c("saveChanges",e)}return C(()=>{o.bannersInfo.type?(u.value=o.bannersInfo.type,o.bannersInfo.type===m?o.bannersInfo.banner&&o.bannersInfo.banner.hasOwnProperty("file")&&(i.value=o.bannersInfo.banner):o.bannersInfo.type===a&&(r.value=o.bannersInfo.banner)):u.value=h[0].value}),(l,e)=>(d(),p("div",ce,[me,n("div",fe,[ve,g(y(O),{onSubmit:b},{default:x(()=>[n("div",pe,[g(W,{modelValue:u.value,"onUpdate:modelValue":e[0]||(e[0]=s=>u.value=s),options:h,name:"background-banner-radio",class:"mr-4"},null,8,["modelValue"]),I(g(E,{modelValue:i.value,"onUpdate:modelValue":e[1]||(e[1]=s=>i.value=s),hasUrl:!1,hasText:!1,class:"col-2"},null,8,["modelValue"]),[[w,u.value===m]]),I(n("div",null,[n("label",null,[_e,I(n("input",{type:"color","onUpdate:modelValue":e[2]||(e[2]=s=>r.value=s)},null,512),[[j,r.value]])]),n("div",{class:"choose-color",style:q(`background: ${r.value}`)},null,4)],512),[[w,u.value===a]])]),n("button",be,[_.loading?(d(),p("div",he,ye)):(d(),p("span",Ie,"Зберегти"))])]),_:1})])]))}},we={key:0,class:"overlay overlay-page"},Be=n("i",{class:"fas fa-2x fa-sync-alt fa-spin"},null,-1),$e=[Be],Ue={__name:"AdminBannersView",setup(_){const c=v({}),o=J();v(!0);const m=v(!1),a=v(!1),h=v(!1),r=v({topBanners:[],newsBanners:[],backgroundBanner:[]}),i="topBanners",u="newsBanners",b="backgroundBanner";async function l(e,s){s===i?m.value=!0:s===u?a.value=!0:s===b&&(h.value=!0),e.items&&e.items.length?e.items.map(f=>f.fileId):e.banner.fileId&&(r.value[s]=r.value[s].filter(f=>e.banner.fileId!==f));let t=[];t.push(await Y(z(B,"banners",s),e)),r.value[s].forEach(f=>{t.push(H(f,s))}),await Promise.all(t),e.items&&e.items.length?r.value[s]=e.items.map(f=>f.fileId):e.banner.fileId&&r.value[s].push(e.banner.fileId),s===i?m.value=!1:s===u?a.value=!1:s===b&&(h.value=!1)}return C(async()=>{o.setLoading(!0),c.value=await K(P(B,"banners")),c.value.forEach(e=>{c.value[e.id]=e.data(),e.data().items?r.value[e.id]=e.data().items.map(s=>s.fileId):e.data().banner.fileId&&r.value[e.id].push(e.data().banner.fileId)}),o.setLoading(!1)}),(e,s)=>y(o).isLoading?(d(),p("div",we,$e)):(d(),p(V,{key:1},[g(k,{"banners-info":c.value[i],onSaveChanges:s[0]||(s[0]=t=>l(t,i)),firebasePathName:i,loading:m.value,title:"На головній верх",class:"mb-5"},null,8,["banners-info","loading"]),g(Ne,{"banners-info":c.value[b],firebasePathName:b,onSaveChanges:s[1]||(s[1]=t=>l(t,b)),class:"mb-5"},null,8,["banners-info"]),g(k,{"banners-info":c.value[u],hasText:!1,onSaveChanges:s[2]||(s[2]=t=>l(t,u)),firebasePathName:u,loading:a.value,title:"На головній новини, акції",class:"mb-5"},null,8,["banners-info","loading"])],64))}};export{Ue as default};
