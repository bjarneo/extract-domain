function r(){throw new TypeError("The given URL is not a string. Please verify your string|array.")}var t=["/",":","?","#"],e=[".","/","@"];function i(i,n){"string"!=typeof i&&r();for(var o,f=0,s=0,a=0,u=i.length,l=0;u--&&++l&&!(f&&t.indexOf(i[l])>-1);)"."===i[l]&&(++f,s=l);for(o=l,l=s;l--;)if(-1!==e.indexOf(i[l])){a=l+1;break}if(0===a&&o>3)return i;if(a>0&&a<2)return"";if(n.tld){for(var p=0,y=["/","@"],c=s;c--;)if(y.indexOf(i[c])>-1){p=c+1;break}try{return require("psl").get(i.slice(p,o))}catch(r){throw Error("You must install psl library (https://www.npmjs.com/package/psl) to use `tld` option")}}return i.slice(a,o)}module.exports=function(t,e){if(void 0===e&&(e={}),"string"==typeof t)return i(t,e);if(Array.isArray(t)){for(var n=[],o=t.length,f=0;f<o;f++)n.push(i(t[f],e));return n}r()};
//# sourceMappingURL=extract-domain.js.map
