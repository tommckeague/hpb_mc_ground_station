/*! For license information please see chunk-5XT3QCZD.js.LICENSE.txt */
import{b as d}from"./chunk-YIFABOF6.js";import{a as i}from"./chunk-V624RX7A.js";import{a as z}from"./chunk-RKPKWH3Z.js";import{b as r}from"./chunk-BIYNNQRQ.js";import{e as c}from"./chunk-ZLUSVROX.js";function t(m,n,t){this.minimum=i.clone(z(m,i.ZERO)),this.maximum=i.clone(z(n,i.ZERO)),t=c(t)?i.clone(t):i.midpoint(this.minimum,this.maximum,new i),this.center=t}t.fromCorners=function(m,n,e){return r.defined("minimum",m),r.defined("maximum",n),c(e)||(e=new t),e.minimum=i.clone(m,e.minimum),e.maximum=i.clone(n,e.maximum),e.center=i.midpoint(m,n,e.center),e},t.fromPoints=function(m,n){if(c(n)||(n=new t),!c(m)||0===m.length)return n.minimum=i.clone(i.ZERO,n.minimum),n.maximum=i.clone(i.ZERO,n.maximum),n.center=i.clone(i.ZERO,n.center),n;let e=m[0].x,r=m[0].y,u=m[0].z,a=m[0].x,o=m[0].y,l=m[0].z,s=m.length;for(let i=1;i<s;i++){let n=m[i],t=n.x,c=n.y,s=n.z;e=Math.min(t,e),a=Math.max(t,a),r=Math.min(c,r),o=Math.max(c,o),u=Math.min(s,u),l=Math.max(s,l)}let h=n.minimum;h.x=e,h.y=r,h.z=u;let x=n.maximum;return x.x=a,x.y=o,x.z=l,n.center=i.midpoint(h,x,n.center),n},t.clone=function(m,n){if(c(m))return c(n)?(n.minimum=i.clone(m.minimum,n.minimum),n.maximum=i.clone(m.maximum,n.maximum),n.center=i.clone(m.center,n.center),n):new t(m.minimum,m.maximum,m.center)},t.equals=function(m,n){return m===n||c(m)&&c(n)&&i.equals(m.center,n.center)&&i.equals(m.minimum,n.minimum)&&i.equals(m.maximum,n.maximum)};var h=new i;t.intersectPlane=function(m,n){r.defined("box",m),r.defined("plane",n),h=i.subtract(m.maximum,m.minimum,h);let t=i.multiplyByScalar(h,.5,h),e=n.normal,u=t.x*Math.abs(e.x)+t.y*Math.abs(e.y)+t.z*Math.abs(e.z),c=i.dot(m.center,e)+n.distance;return c-u>0?d.INSIDE:c+u<0?d.OUTSIDE:d.INTERSECTING},t.prototype.clone=function(i){return t.clone(this,i)},t.prototype.intersectPlane=function(i){return t.intersectPlane(this,i)},t.prototype.equals=function(i){return t.equals(this,i)};var P=t;export{P as a};