/*! For license information please see decodeDraco.js.LICENSE.txt */
import{a as O}from"./chunk-HPQQGA4G.js";import{a as I}from"./chunk-2SKW2VRQ.js";import{a as m}from"./chunk-EQ7PMEBC.js";import{a as w}from"./chunk-VNDUYYBJ.js";import"./chunk-VZ2RFJ3P.js";import"./chunk-RN5GA5QZ.js";import{a as A}from"./chunk-TWC6ISJU.js";import"./chunk-RKPKWH3Z.js";import"./chunk-BIYNNQRQ.js";import{d as D,e as d}from"./chunk-ZLUSVROX.js";var o,b=D(O(),1);function F(t,e){let r=t.num_points(),n=t.num_faces(),a=new o.DracoInt32Array,i=3*n,s=m.createTypedArray(r,i),u=0;for(let r=0;r<n;++r)e.GetFaceFromMesh(t,r,a),s[u+0]=a.GetValue(0),s[u+1]=a.GetValue(1),s[u+2]=a.GetValue(2),u+=3;return o.destroy(a),{typedArray:s,numberOfIndices:i}}function U(t,e,r,n,a){let i,s;n.quantizationBits<=8?(s=new o.DracoUInt8Array,i=new Uint8Array(a),e.GetAttributeUInt8ForAllPoints(t,r,s)):n.quantizationBits<=16?(s=new o.DracoUInt16Array,i=new Uint16Array(a),e.GetAttributeUInt16ForAllPoints(t,r,s)):(s=new o.DracoFloat32Array,i=new Float32Array(a),e.GetAttributeFloatForAllPoints(t,r,s));for(let t=0;t<a;++t)i[t]=s.GetValue(t);return o.destroy(s),i}function k(t,e,r,n){let a,i;switch(r.data_type()){case 1:case 11:i=new o.DracoInt8Array,a=new Int8Array(n),e.GetAttributeInt8ForAllPoints(t,r,i);break;case 2:i=new o.DracoUInt8Array,a=new Uint8Array(n),e.GetAttributeUInt8ForAllPoints(t,r,i);break;case 3:i=new o.DracoInt16Array,a=new Int16Array(n),e.GetAttributeInt16ForAllPoints(t,r,i);break;case 4:i=new o.DracoUInt16Array,a=new Uint16Array(n),e.GetAttributeUInt16ForAllPoints(t,r,i);break;case 5:case 7:i=new o.DracoInt32Array,a=new Int32Array(n),e.GetAttributeInt32ForAllPoints(t,r,i);break;case 6:case 8:i=new o.DracoUInt32Array,a=new Uint32Array(n),e.GetAttributeUInt32ForAllPoints(t,r,i);break;case 9:case 10:i=new o.DracoFloat32Array,a=new Float32Array(n),e.GetAttributeFloatForAllPoints(t,r,i)}for(let t=0;t<n;++t)a[t]=i.GetValue(t);return o.destroy(i),a}function p(t,e,r){let n,a=t.num_points(),i=r.num_components(),s=new o.AttributeQuantizationTransform;if(s.InitFromAttribute(r)){let t=new Array(i);for(let e=0;e<i;++e)t[e]=s.min_value(e);n={quantizationBits:s.quantization_bits(),minValues:t,range:s.range(),octEncoded:!1}}o.destroy(s),s=new o.AttributeOctahedronTransform,s.InitFromAttribute(r)&&(n={quantizationBits:s.quantization_bits(),octEncoded:!0}),o.destroy(s);let u,l=a*i;u=d(n)?U(t,e,r,n,l):k(t,e,r,l);let c=w.fromTypedArray(u);return{array:u,data:{componentsPerAttribute:i,componentDatatype:c,byteOffset:r.byte_offset(),byteStride:w.getSizeInBytes(c)*i,normalized:r.normalized(),quantization:n}}}function _(t){let e=new o.Decoder;t.dequantizeInShader&&(e.SkipAttributeTransform(o.POSITION),e.SkipAttributeTransform(o.NORMAL));let r=new o.DecoderBuffer;if(r.Init(t.buffer,t.buffer.length),e.GetEncodedGeometryType(r)!==o.POINT_CLOUD)throw new A("Draco geometry type must be POINT_CLOUD.");let n=new o.PointCloud,a=e.DecodeBufferToPointCloud(r,n);if(!a.ok()||0===n.ptr)throw new A(`Error decoding draco point cloud: ${a.error_msg()}`);o.destroy(r);let i={},s=t.properties;for(let t in s)if(s.hasOwnProperty(t)){let r;if("POSITION"===t||"NORMAL"===t){let a=e.GetAttributeId(n,o[t]);r=e.GetAttribute(n,a)}else{let o=s[t];r=e.GetAttributeByUniqueId(n,o)}i[t]=p(n,e,r)}return o.destroy(n),o.destroy(e),i}function g(t){let e=new o.Decoder,r=["POSITION","NORMAL","COLOR","TEX_COORD"];if(t.dequantizeInShader)for(let t=0;t<r.length;++t)e.SkipAttributeTransform(o[r[t]]);let n=t.bufferView,a=new o.DecoderBuffer;if(a.Init(t.array,n.byteLength),e.GetEncodedGeometryType(a)!==o.TRIANGULAR_MESH)throw new A("Unsupported draco mesh geometry type.");let i=new o.Mesh,s=e.DecodeBufferToMesh(a,i);if(!s.ok()||0===i.ptr)throw new A(`Error decoding draco mesh geometry: ${s.error_msg()}`);o.destroy(a);let u={},l=t.compressedAttributes;for(let t in l)if(l.hasOwnProperty(t)){let r=l[t],o=e.GetAttributeByUniqueId(i,r);u[t]=p(i,e,o)}let c={indexArray:F(i,e),attributeData:u};return o.destroy(i),o.destroy(e),c}async function z(t,e){return d(t.bufferView)?g(t):_(t)}async function C(t,e){let r=t.webAssemblyConfig;return o=d(r)&&d(r.wasmBinaryFile)?await(0,b.default)(r):await(0,b.default)(),!0}async function G(t,e){let r=t.webAssemblyConfig;return d(r)?C(t,e):z(t,e)}var h=I(G);export{h as default};