import{f as a,u as r}from"./index-08899976.js";async function n(e,i){return Object.keys(e).length?{fileId:e.fileId,file:await a(e.fileId,i)?e.file:await r(`${i}/${e.fileId}`,e.file)}:{}}async function I(e,i){let t=[];for(let l=0;l<e.length;l++){let f=e[l];t.push({fileId:f.fileId,file:await a(f.fileId,i)?f.file:await r(`${i}/${f.fileId}`,f.file)})}return t}export{n as a,I as p};
