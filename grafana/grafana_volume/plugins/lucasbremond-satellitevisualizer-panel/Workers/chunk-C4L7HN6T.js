/*! For license information please see chunk-C4L7HN6T.js.LICENSE.txt */
import{b as t}from"./chunk-KDW4RGIR.js";import{a as r}from"./chunk-RKPKWH3Z.js";import{a as m}from"./chunk-BIYNNQRQ.js";import{e as i}from"./chunk-ZLUSVROX.js";function d(e){if(e=r(e,r.EMPTY_OBJECT),!i(e.geometry))throw new m("options.geometry is required.");this.geometry=e.geometry,this.modelMatrix=t.clone(r(e.modelMatrix,t.IDENTITY)),this.id=e.id,this.pickPrimitive=e.pickPrimitive,this.attributes=r(e.attributes,{}),this.westHemisphereGeometry=void 0,this.eastHemisphereGeometry=void 0}var s=d;export{s as a};