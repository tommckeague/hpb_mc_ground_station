/*! For license information please see createPlaneOutlineGeometry.js.LICENSE.txt */
import{a as l}from"./chunk-FDDSRMXI.js";import{b as d,c as y,d as s}from"./chunk-YYYI3I6L.js";import{d as c}from"./chunk-YIFABOF6.js";import"./chunk-PQVQONHO.js";import"./chunk-KDW4RGIR.js";import{a as f}from"./chunk-VNDUYYBJ.js";import{a}from"./chunk-V624RX7A.js";import"./chunk-VZ2RFJ3P.js";import"./chunk-RN5GA5QZ.js";import"./chunk-TWC6ISJU.js";import"./chunk-RKPKWH3Z.js";import{b as m}from"./chunk-BIYNNQRQ.js";import{e as i}from"./chunk-ZLUSVROX.js";function o(){this._workerName="createPlaneOutlineGeometry"}o.packedLength=0,o.pack=function(n,e){return m.defined("value",n),m.defined("array",e),e},o.unpack=function(n,e,r){return m.defined("array",n),i(r)?r:new o};var n=new a(-.5,-.5,0),p=new a(.5,.5,0);o.createGeometry=function(){let e=new l,r=new Uint16Array(8),t=new Float64Array(12);return t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=p.x,t[4]=n.y,t[5]=n.z,t[6]=p.x,t[7]=p.y,t[8]=n.z,t[9]=n.x,t[10]=p.y,t[11]=n.z,e.position=new s({componentDatatype:f.DOUBLE,componentsPerAttribute:3,values:t}),r[0]=0,r[1]=1,r[2]=1,r[3]=2,r[4]=2,r[5]=3,r[6]=3,r[7]=0,new y({attributes:e,indices:r,primitiveType:d.LINES,boundingSphere:new c(a.ZERO,Math.sqrt(2))})};var u=o;function w(n,e){return i(e)&&(n=u.unpack(n,e)),u.createGeometry(n)}var D=w;export{D as default};