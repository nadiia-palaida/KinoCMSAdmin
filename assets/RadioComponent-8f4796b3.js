import{o as t,e as n,F as l,k as c,b as r,t as i}from"./index-57ff8659.js";const d={class:"radio"},m={class:"form-check"},u=["name","id","checked","onChange"],h=["for"],$={__name:"RadioComponent",props:{options:{type:Array,required:!0},name:{type:String,required:!0},modelValue:{}},emits:["update:modelValue"],setup(e,{emit:k}){return(s,f)=>(t(),n("div",d,[(t(!0),n(l,null,c(e.options,(a,o)=>(t(),n("div",m,[r("input",{class:"form-check-input",type:"radio",name:e.name,id:`radio-${e.name}-${o}`,checked:a.value===e.modelValue,onChange:p=>s.$emit("update:modelValue",a.value)},null,40,u),r("label",{class:"form-check-label",for:`radio-${e.name}-${o}`},i(a.label),9,h)]))),256))]))}};export{$ as _};