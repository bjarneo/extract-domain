function r(){throw new TypeError("The given URL is not a string. Please verify your string|array.")}var t=["/",":","?","#"],e=[".","/","@"];function i(i,n){"string"!=typeof i&&r();for(var o,s=0,f=0,a=0,l=i.length,u=0;l--&&++u&&!(s&&t.indexOf(i[u])>-1);)"."===i[u]&&(++s,f=u);for(o=u,u=f;u--;)if(-1!==e.indexOf(i[u])){a=u+1;break}if(a<2)return"";if(n.tld){for(var p=0,y=["/","@"];u--;)if(y.indexOf(i[u])>-1){p=u+1;break}try{require("psl")}catch(r){throw Error("You must install psl library (https://www.npmjs.com/package/psl) to use `tld` option")}return psl.get(i.slice(p,o))}return i.slice(a,o)}module.exports=function(t,e){if(void 0===e&&(e={}),"string"==typeof t)return i(t,e);if(Array.isArray(t)){for(var n=[],o=t.length,s=0;s<o;s++)n.push(i(t[s],e));return n}r()};
//# sourceMappingURL=extract-domain.js.map
