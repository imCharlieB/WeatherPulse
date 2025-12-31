function e(e,t,a,i){var r,o=arguments.length,n=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,a,i);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,a,n):r(t,a))||n);return o>3&&n&&Object.defineProperty(t,a,n),n}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,a=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const a=void 0!==t&&1===t.length;a&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&r.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,a,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[i+1],e[0]);return new o(a,e,i)},s=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,f=globalThis,g=f.trustedTypes,u=g?g.emptyScript:"",v=f.reactiveElementPolyfillSupport,b=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?u:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},w=(e,t)=>!l(e,t),y={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,a){const{get:i,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const o=i?.call(this);r?.call(this,t),this.requestUpdate(e,o,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(s(e))}else void 0!==e&&t.push(s(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(a)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const a of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=a.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(void 0!==i&&!0===a.reflect){const r=(void 0!==a.converter?.toAttribute?a.converter:x).toAttribute(t,a.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const a=this.constructor,i=a._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=a.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=i;const o=r.fromAttribute(t,e.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,t,a){if(void 0!==e){const i=this.constructor,r=this[e];if(a??=i.getPropertyOptions(e),!((a.hasChanged??w)(r,t)||a.useDefault&&a.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:i,wrapped:r},o){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,a,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[b("elementProperties")]=new Map,k[b("finalized")]=new Map,v?.({ReactiveElement:k}),(f.reactiveElementVersions??=[]).push("2.1.1");const _=globalThis,$=_.trustedTypes,C=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+z,M=`<${A}>`,T=document,E=()=>T.createComment(""),U=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,N="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,F=/-->/g,O=/>/g,G=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,H=/"/g,W=/^(?:script|style|textarea|title)$/i,j=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),B=j(1),R=j(2),L=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,Y=T.createTreeWalker(T,129);function X(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(t):t}const K=(e,t)=>{const a=e.length-1,i=[];let r,o=2===t?"<svg>":3===t?"<math>":"",n=P;for(let t=0;t<a;t++){const a=e[t];let s,l,d=-1,c=0;for(;c<a.length&&(n.lastIndex=c,l=n.exec(a),null!==l);)c=n.lastIndex,n===P?"!--"===l[1]?n=F:void 0!==l[1]?n=O:void 0!==l[2]?(W.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=G):void 0!==l[3]&&(n=G):n===G?">"===l[0]?(n=r??P,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,s=l[1],n=void 0===l[3]?G:'"'===l[3]?H:I):n===H||n===I?n=G:n===F||n===O?n=P:(n=G,r=void 0);const h=n===G&&e[t+1].startsWith("/>")?" ":"";o+=n===P?a+M:d>=0?(i.push(s),a.slice(0,d)+S+a.slice(d)+z+h):a+z+(-2===d?t:h)}return[X(e,o+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class J{constructor({strings:e,_$litType$:t},a){let i;this.parts=[];let r=0,o=0;const n=e.length-1,s=this.parts,[l,d]=K(e,t);if(this.el=J.createElement(l,a),Y.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Y.nextNode())&&s.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(S)){const t=d[o++],a=i.getAttribute(e).split(z),n=/([.?@])?(.*)/.exec(t);s.push({type:1,index:r,name:n[2],strings:a,ctor:"."===n[1]?ae:"?"===n[1]?ie:"@"===n[1]?re:te}),i.removeAttribute(e)}else e.startsWith(z)&&(s.push({type:6,index:r}),i.removeAttribute(e));if(W.test(i.tagName)){const e=i.textContent.split(z),t=e.length-1;if(t>0){i.textContent=$?$.emptyScript:"";for(let a=0;a<t;a++)i.append(e[a],E()),Y.nextNode(),s.push({type:2,index:++r});i.append(e[t],E())}}}else if(8===i.nodeType)if(i.data===A)s.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(z,e+1));)s.push({type:7,index:r}),e+=z.length-1}r++}}static createElement(e,t){const a=T.createElement("template");return a.innerHTML=e,a}}function Z(e,t,a=e,i){if(t===L)return t;let r=void 0!==i?a._$Co?.[i]:a._$Cl;const o=U(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,a,i)),void 0!==i?(a._$Co??=[])[i]=r:a._$Cl=r),void 0!==r&&(t=Z(e,r._$AS(e,t.values),r,i)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,i=(e?.creationScope??T).importNode(t,!0);Y.currentNode=i;let r=Y.nextNode(),o=0,n=0,s=a[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new ee(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new oe(r,this,e)),this._$AV.push(t),s=a[++n]}o!==s?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=T,i}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),U(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==L&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,i="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=J.createElement(X(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new J(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,i=0;for(const r of e)i===t.length?t.push(a=new ee(this.O(E()),this.O(E()),this,this.options)):a=t[i],a._$AI(r),i++;i<t.length&&(this._$AR(a&&a._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,i,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=V}_$AI(e,t=this,a,i){const r=this.strings;let o=!1;if(void 0===r)e=Z(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==L,o&&(this._$AH=e);else{const i=e;let n,s;for(e=r[0],n=0;n<r.length-1;n++)s=Z(this,i[a+n],t,n),s===L&&(s=this._$AH[n]),o||=!U(s)||s!==this._$AH[n],s===V?e=V:e!==V&&(e+=(s??"")+r[n+1]),this._$AH[n]=s}o&&!i&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ae extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class ie extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class re extends te{constructor(e,t,a,i,r){super(e,t,a,i,r),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??V)===L)return;const a=this._$AH,i=e===V&&a!==V||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==V&&(a===V||i);i&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=_.litHtmlPolyfillSupport;ne?.(J,ee),(_.litHtmlVersions??=[]).push("3.3.1");const se=globalThis;let le=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,a)=>{const i=a?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=a?.renderBefore??null;i._$litPart$=r=new ee(t.insertBefore(E(),e),e,void 0,a??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}};le._$litElement$=!0,le.finalized=!0,se.litElementHydrateSupport?.({LitElement:le});const de=se.litElementPolyfillSupport;de?.({LitElement:le}),(se.litElementVersions??=[]).push("4.2.1");const ce=e=>(t,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:w},pe=(e=he,t,a)=>{const{kind:i,metadata:r}=a;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),o.set(a.name,e),"accessor"===i){const{name:i}=a;return{set(a){const r=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,r,e)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=a;return function(a){const r=this[i];t.call(this,a),this.requestUpdate(i,r,e)}}throw Error("Unsupported decorator location: "+i)};function me(e){return(t,a)=>"object"==typeof a?pe(e,t,a):((e,t,a)=>{const i=t.hasOwnProperty(a);return t.constructor.createProperty(a,e),i?Object.getOwnPropertyDescriptor(t,a):void 0})(e,t,a)}function fe(e){return me({...e,state:!0,attribute:!1})}function ge(e,t="°F"){const a="°C"===t?9*e/5+32:e;return a<32?{color:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",backgroundColor:"#667eea",textColor:"#ffffff"}:a<50?{color:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",backgroundColor:"#4facfe",textColor:"#1a1a1a"}:a<70?{color:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",backgroundColor:"#43e97b",textColor:"#1a1a1a"}:a<85?{color:"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",backgroundColor:"#fa709a",textColor:"#1a1a1a"}:{color:"linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",backgroundColor:"#ff6b6b",textColor:"#1a1a1a"}}function ue(e=new Date){return e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}function ve(e=new Date){return e.toLocaleDateString("en-US",{weekday:"long",month:"2-digit",day:"2-digit",year:"2-digit"})}function be(){const e=(new Date).getMonth();return e>=2&&e<=4?"spring":e>=5&&e<=7?"summer":e>=8&&e<=10?"fall":"winter"}function xe(e){return new Date(e).toLocaleDateString("en-US",{weekday:"short"})}function we(e){const t=e.toLowerCase(),a=function(){const e=(new Date).getHours();return e<6||e>=20}();return t.includes("clear")||t.includes("sunny")?a?"clear-night":"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?a?"partlycloudy-night":"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":a?"clear-night":"clear-day"}const ye=2;class ke{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,a){this._$Ct=e,this._$AM=t,this._$Ci=a}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}class _e extends ke{constructor(e){if(super(e),this.it=V,e.type!==ye)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===V||null==e)return this._t=void 0,this.it=e;if(e===L)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}_e.directiveName="unsafeHTML",_e.resultType=1;const $e=(e=>(...t)=>({_$litDirective$:e,values:t}))(_e);var Ce,Se,ze='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="26.75" x2="37.25" y1="22.91" y2="41.09" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><circle cx="32" cy="32" r="10.5" fill="url(#a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M15.71 32H9.5m45 0h-6.21"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 32 32; 360 32 32"/></path></svg>',Ae='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#a"/><linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path></svg>',Me='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="26.76" x2="41.62" y1="20.91" y2="46.65" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M39.12 16a18.38 18.38 0 00-2.38-.86l.08.06h0c11.54 12.1 2.63 32.1-14.07 31.62h-.1A18.21 18.21 0 0024.88 48a17.5 17.5 0 1014.24-32z"/></svg>';function Te(e,t=!0){let a="";switch(e.toLowerCase()){case"clear-day":case"sunny":default:a=ze;break;case"clear-night":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="21.92" x2="38.52" y1="18.75" y2="47.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="5 32 32; -15 32 32; 5 32 32"/></linearGradient></defs><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M46.66 36.2a16.66 16.66 0 01-16.78-16.55 16.29 16.29 0 01.55-4.15A16.56 16.56 0 1048.5 36.1c-.61.06-1.22.1-1.84.1z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-5 32 32; 15 32 32; -5 32 32"/></path></svg>';break;case"partlycloudy":case"partly-cloudy-day":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="16.5" x2="21.5" y1="19.67" y2="28.33" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fbbf24"/><stop offset=".45" stop-color="#fbbf24"/><stop offset="1" stop-color="#f59e0b"/></linearGradient><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><circle cx="19" cy="24" r="5" fill="url(#a)" stroke="#f8af18" stroke-miterlimit="10" stroke-width=".5"/><path fill="none" stroke="#fbbf24" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17"><animateTransform attributeName="transform" dur="45s" repeatCount="indefinite" type="rotate" values="0 19 24; 360 19 24"/></path><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/></svg>';break;case"partlycloudy-night":case"partly-cloudy-night":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="13.58" x2="24.15" y1="15.57" y2="33.87" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/><animateTransform attributeName="gradientTransform" dur="10s" repeatCount="indefinite" type="rotate" values="10 19.22 24.293; -10 19.22 24.293; 10 19.22 24.293"/></linearGradient><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.33 26.68a10.61 10.61 0 01-10.68-10.54A10.5 10.5 0 0119 13.5a10.54 10.54 0 1011.5 13.11 11.48 11.48 0 01-1.17.07z"><animateTransform attributeName="transform" dur="10s" repeatCount="indefinite" type="rotate" values="-10 19.22 24.293; 10 19.22 24.293; -10 19.22 24.293"/></path><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/></svg>';break;case"cloudy":case"overcast":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient></defs><path fill="url(#a)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"><animateTransform attributeName="transform" dur="7s" repeatCount="indefinite" type="translate" values="-3 0; 3 0; -3 0"/></path></svg>';break;case"rainy":case"rain":case"pouring":case"heavy-rain":a=Ae;break;case"drizzle":case"light-rain":a='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="23.31" x2="24.69" y1="44.3" y2="46.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="c" x1="30.31" x2="31.69" y1="44.3" y2="46.7" xlink:href="#a"/><linearGradient id="d" x1="37.31" x2="38.69" y1="44.3" y2="46.7" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.08 45.01l-.16.98"><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.08 45.01l-.16.98"><animateTransform attributeName="transform" begin="-0.5s" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.5s" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#e)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.08 45.01l-.16.98"><animateTransform attributeName="transform" begin="-1s" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-1s" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path></svg>';break;case"snowy":case"snow":a='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="30.12" x2="31.88" y1="43.48" y2="46.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><linearGradient id="c" x1="29.67" x2="32.33" y1="42.69" y2="47.31" xlink:href="#a"/><linearGradient id="d" x1="23.12" x2="24.88" y1="43.48" y2="46.52" xlink:href="#a"/><linearGradient id="e" x1="22.67" x2="25.33" y1="42.69" y2="47.31" xlink:href="#a"/><linearGradient id="f" x1="37.12" x2="38.88" y1="43.48" y2="46.52" xlink:href="#a"/><linearGradient id="g" x1="36.67" x2="39.33" y1="42.69" y2="47.31" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><g><circle cx="31" cy="45" r="1.25" fill="none" stroke="url(#a)" stroke-miterlimit="10"/><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" d="M33.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M31 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" dur="4s" repeatCount="indefinite" type="translate" values="-1 -6; 1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 31 45; 360 31 45"/><animate attributeName="opacity" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g><g><circle cx="24" cy="45" r="1.25" fill="none" stroke="url(#d)" stroke-miterlimit="10"/><path fill="none" stroke="url(#e)" stroke-linecap="round" stroke-miterlimit="10" d="M26.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M24 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" begin="-2s" dur="4s" repeatCount="indefinite" type="translate" values="1 -6; -1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 24 45; 360 24 45"/><animate attributeName="opacity" begin="-2s" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g><g><circle cx="38" cy="45" r="1.25" fill="none" stroke="url(#f)" stroke-miterlimit="10"/><path fill="none" stroke="url(#g)" stroke-linecap="round" stroke-miterlimit="10" d="M40.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M38 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" begin="-1s" dur="4s" repeatCount="indefinite" type="translate" values="1 -6; -1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 38 45; 360 38 45"/><animate attributeName="opacity" begin="-1s" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g></svg>';break;case"snowy-rainy":case"sleet":case"mix":a='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="c" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="23.12" x2="24.88" y1="43.48" y2="46.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><linearGradient id="d" x1="22.67" x2="25.33" y1="42.69" y2="47.31" xlink:href="#a"/><linearGradient id="e" x1="37.12" x2="38.88" y1="43.48" y2="46.52" xlink:href="#a"/><linearGradient id="f" x1="36.67" x2="39.33" y1="42.69" y2="47.31" xlink:href="#a"/><linearGradient id="b" x1="23.31" x2="24.69" y1="44.3" y2="46.7" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="g" x1="30.31" x2="31.69" y1="44.3" y2="46.7" xlink:href="#b"/><linearGradient id="h" x1="37.31" x2="38.69" y1="44.3" y2="46.7" xlink:href="#b"/></defs><path fill="url(#c)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><g><circle cx="24" cy="45" r="1.25" fill="none" stroke="url(#a)" stroke-miterlimit="10"/><path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" d="M26.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M24 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" begin="-2s" dur="4s" repeatCount="indefinite" type="translate" values="1 -6; -1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 24 45; 360 24 45"/><animate attributeName="opacity" begin="-2s" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g><g><circle cx="38" cy="45" r="1.25" fill="none" stroke="url(#e)" stroke-miterlimit="10"/><path fill="none" stroke="url(#f)" stroke-linecap="round" stroke-miterlimit="10" d="M40.17 46.25l-1.09-.63m-2.16-1.24l-1.09-.63M38 42.5v1.25m0 3.75v-1.25m-1.08-.63l-1.09.63m4.34-2.5l-1.09.63"/><animateTransform additive="sum" attributeName="transform" begin="-1s" dur="4s" repeatCount="indefinite" type="translate" values="1 -6; -1 12"/><animateTransform additive="sum" attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 38 45; 360 38 45"/><animate attributeName="opacity" begin="-1s" dur="4s" repeatCount="indefinite" values="0;1;1;1;0"/></g><path fill="none" stroke="url(#b)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.08 45.01l-.16.98"><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#g)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.08 45.01l-.16.98"><animateTransform attributeName="transform" begin="-0.5s" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.5s" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#h)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.08 45.01l-.16.98"><animateTransform attributeName="transform" begin="-1s" dur="1.5s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-1s" dur="1.5s" repeatCount="indefinite" values="0;1;1;0"/></path></svg>';break;case"hail":a='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="23.25" x2="24.75" y1="43.7" y2="46.3" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient><linearGradient id="c" x1="30.25" x2="31.75" y1="43.7" y2="46.3" xlink:href="#a"/><linearGradient id="d" x1="37.25" x2="38.75" y1="43.7" y2="46.3" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="url(#a)" d="M24 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z"><animateTransform attributeName="transform" dur="0.6s" repeatCount="indefinite" type="translate" values="1 -5; -2 18; -4 14"/><animate attributeName="opacity" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></path><path fill="url(#c)" d="M31 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z"><animateTransform attributeName="transform" begin="-0.4s" dur="0.6s" repeatCount="indefinite" type="translate" values="1 -5; -2 18; -4 14"/><animate attributeName="opacity" begin="-0.4s" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></path><path fill="url(#d)" d="M38 43.5a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5z"><animateTransform attributeName="transform" begin="-0.2s" dur="0.6s" repeatCount="indefinite" type="translate" values="1 -5; -2 18; -4 14"/><animate attributeName="opacity" begin="-0.2s" dur="0.6s" repeatCount="indefinite" values="1;1;0"/></path></svg>';break;case"lightning":case"thunderstorm":case"lightning-rainy":case"thunderstorms":a='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="22.53" x2="25.47" y1="42.95" y2="48.05" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4286ee"/><stop offset=".45" stop-color="#4286ee"/><stop offset="1" stop-color="#0950bc"/></linearGradient><linearGradient id="c" x1="29.53" x2="32.47" y1="42.95" y2="48.05" xlink:href="#a"/><linearGradient id="d" x1="36.53" x2="39.47" y1="42.95" y2="48.05" xlink:href="#a"/><linearGradient id="e" x1="26.74" x2="35.76" y1="37.88" y2="53.52" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f7b23b"/><stop offset=".45" stop-color="#f7b23b"/><stop offset="1" stop-color="#f59e0b"/></linearGradient></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M24.39 43.03l-.78 4.94"><animateTransform attributeName="transform" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.4s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.4s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="none" stroke="url(#d)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M38.39 43.03l-.78 4.94"><animateTransform attributeName="transform" begin="-0.2s" dur="0.7s" repeatCount="indefinite" type="translate" values="1 -5; -2 10"/><animate attributeName="opacity" begin="-0.2s" dur="0.7s" repeatCount="indefinite" values="0;1;1;0"/></path><path fill="url(#e)" stroke="#f6a823" stroke-miterlimit="10" stroke-width=".5" d="M30 36l-4 12h4l-2 10 10-14h-6l4-8h-6z"><animate attributeName="opacity" dur="2s" repeatCount="indefinite" values="1; 1; 1; 1; 1; 1; 0.1; 1; 0.1; 1; 1; 0.1; 1; 0.1; 1"/></path></svg>';break;case"fog":case"mist":case"foggy":case"haze":a='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="b" x1="22.56" x2="39.2" y1="21.96" y2="50.8" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f3f7fe"/><stop offset=".45" stop-color="#f3f7fe"/><stop offset="1" stop-color="#deeafb"/></linearGradient><linearGradient id="a" x1="27.5" x2="36.5" y1="50.21" y2="65.79" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="c" y1="44.21" y2="59.79" xlink:href="#a"/></defs><path fill="url(#b)" stroke="#e6effc" stroke-miterlimit="10" stroke-width=".5" d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z"/><path fill="none" stroke="url(#a)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 58h30"><animateTransform attributeName="transform" begin="0s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path><path fill="none" stroke="url(#c)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M17 52h30"><animateTransform attributeName="transform" begin="-4s" dur="5s" repeatCount="indefinite" type="translate" values="-4 0; 4 0; -4 0"/></path></svg>';break;case"windy":case"wind":case"exceptional":a='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="27.56" x2="38.27" y1="17.64" y2="36.19" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient><linearGradient id="b" x1="19.96" x2="31.37" y1="29.03" y2="48.8" xlink:href="#a"/></defs><path fill="none" stroke="url(#a)" stroke-dasharray="35 22" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M43.64 20a5 5 0 113.61 8.46h-35.5"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" values="-57; 57"/></path><path fill="none" stroke="url(#b)" stroke-dasharray="24 15" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M29.14 44a5 5 0 103.61-8.46h-21"><animate attributeName="stroke-dashoffset" begin="-1.5s" dur="2s" repeatCount="indefinite" values="-39; 39"/></path></svg>'}return t||(a=a.replace(/<animate[^>]*>/g,"").replace(/<\/animate>/g,""),a=a.replace(/<animateTransform[^>]*\/>/g,"")),a=a.replace(/<svg/,'<svg class="weather-icon-svg"'),R`${$e(a)}`}function Ee(e,t=!0){let a="colder"===e?'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="23.73" x2="39.18" y1="19.16" y2="45.93" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#515a69" stop-opacity=".05"/><stop offset=".45" stop-color="#6b7280" stop-opacity=".05"/><stop offset="1" stop-color="#384354" stop-opacity=".1"/></linearGradient><linearGradient id="b" x1="23.48" x2="39.43" y1="18.73" y2="46.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient></defs><circle cx="32" cy="42" r="4.5" fill="#ef4444"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 33v9"><animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="translate" values="0 0; 0 1; 0 0"/></path><path fill="url(#a)" stroke="url(#b)" stroke-linecap="round" stroke-linejoin="round" d="M32.5 29H36m3 12.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36"/><path fill="none" stroke="#2885c7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M44 26v12l-3-3.45L44 38l3-3.45"><animateTransform attributeName="transform" begin="0s" dur="1.5s" keyTimes="0.0; 0.5; 0.9; 1.0" repeatCount="indefinite" type="translate" values="0 0; 0 0; 0 6; 0 6"/><animate attributeName="opacity" dur="1.5s" keyTimes="0.0; 0.3; 0.8; 0.9; 1.0" repeatCount="indefinite" values="0; 1; 1; 0; 0"/></path></svg>':'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="23.73" x2="39.18" y1="19.16" y2="45.93" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#515a69" stop-opacity=".05"/><stop offset=".45" stop-color="#6b7280" stop-opacity=".05"/><stop offset="1" stop-color="#384354" stop-opacity=".1"/></linearGradient><linearGradient id="b" x1="23.48" x2="39.43" y1="18.73" y2="46.36" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#d4d7dd"/><stop offset=".45" stop-color="#d4d7dd"/><stop offset="1" stop-color="#bec1c6"/></linearGradient></defs><circle cx="32" cy="42" r="4.5" fill="#ef4444"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M32 19v23"><animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="translate" values="0 0; 0 1; 0 0"/></path><path fill="url(#a)" stroke="url(#b)" stroke-linecap="round" stroke-linejoin="round" d="M32.5 29H36m3 12.9a7 7 0 11-14 0 7.12 7.12 0 013-5.83v-17a4 4 0 118 0v17a7.12 7.12 0 013 5.83zM32.5 25H36m-3.5-4H36"/><path fill="none" stroke="#ef4444" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M44 38V26l-3 3.45L44 26l3 3.45"><animateTransform attributeName="transform" begin="0s" dur="1.5s" keyTimes="0.0; 0.5; 0.9; 1.0" repeatCount="indefinite" type="translate" values="0 0; 0 0; 0 -6; 0 -6"/><animate attributeName="opacity" dur="1.5s" keyTimes="0.0; 0.3; 0.8; 0.9; 1.0" repeatCount="indefinite" values="0; 1; 1; 0; 0"/></path></svg>';return t||(a=a.replace(/<animate[^>]*>/g,"").replace(/<\/animate>/g,""),a=a.replace(/<animateTransform[^>]*\/>/g,"")),a=a.replace(/<svg/,'<svg class="weather-icon-svg temp-icon"'),R`${$e(a)}`}!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ce||(Ce={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Se||(Se={}));var Ue=function(e,t,a,i){i=i||{},a=null==a?{}:a;var r=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=a,e.dispatchEvent(r),r};let De=class extends le{constructor(){super(...arguments),this._expandedSections=new Set(["required","theme"])}setConfig(e){this._config=e}_toggleSection(e){const t=new Set(this._expandedSections);t.has(e)?t.delete(e):t.add(e),this._expandedSections=t}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target,a=t.configValue;let i=t.value;if("forecast_days"!==a&&"hourly_count"!==a||!i||(i=parseInt(i,10)),this._config[a]===i)return;const r={...this._config,[a]:""===i?void 0:i};Ue(this,"config-changed",{config:r})}_toggleChanged(e){if(!this._config||!this.hass)return;const t=e.target,a=t.configValue,i=t.checked,r={...this._config,[a]:i};Ue(this,"config-changed",{config:r})}_customColorChanged(e,t){if(!this._config||!this.hass)return;const a=e.target.value,i={...this._config,custom_theme_colors:{...this._config.custom_theme_colors,[t]:a||void 0}};Ue(this,"config-changed",{config:i})}_seasonalImageChanged(e,t){if(!this._config||!this.hass)return;const a=e.target.value,i="default"===a||""===a?void 0:a,r={...this._config,seasonal_images:{...this._config.seasonal_images||{},[t]:i}};Ue(this,"config-changed",{config:r})}_weatherInfoToggle(e,t){if(!this._config||!this.hass)return;const a=e.target.checked,i=this._config.show_weather_info||[];let r;r=a?i.includes(t)?i:[...i,t]:i.filter(e=>e!==t);const o={...this._config,show_weather_info:r.length>0?r:void 0};Ue(this,"config-changed",{config:o})}render(){if(!this.hass||!this._config)return B``;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")),t=Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("temp")||e.includes("temperature"))),a=Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&this.hass.states[e].attributes.forecast);return B`
      <div class="card-config">
        <h3>WeatherPulse Card Configuration</h3>

        <!-- Required Settings -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("required")}>
            <span class="chevron ${this._expandedSections.has("required")?"expanded":""}">▶</span>
            Required Settings
          </h4>

          ${this._expandedSections.has("required")?B`
          <ha-select
            label="Weather Entity (Required)"
            .configValue=${"entity"}
            .value=${this._config.entity||""}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            ${e.map(e=>B`
                <mwc-list-item .value=${e}>
                  ${e}
                </mwc-list-item>
              `)}
          </ha-select>

          <ha-select
          label="Forecast Sensor (Recommended for Hourly)"
          .configValue=${"forecast_sensor"}
          .value=${this._config.forecast_sensor||""}
          @selected=${this._valueChanged}
          @closed=${e=>e.stopPropagation()}
        >
          ${a.map(e=>B`
              <mwc-list-item .value=${e}>
                ${e}
              </mwc-list-item>
            `)}
        </ha-select>
        <p class="helper-text">
          Select a sensor that provides forecast data for hourly. This enables hourly alerts
        </p>
          `:""}
        </div>

        <!-- Theme Settings -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("theme")}>
            <span class="chevron ${this._expandedSections.has("theme")?"expanded":""}">▶</span>
            Theme Settings
          </h4>

          ${this._expandedSections.has("theme")?B`
          <ha-select
            label="Visual Theme"
            .configValue=${"theme"}
            .value=${this._config.theme||"default"}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="default">Default</mwc-list-item>
            <mwc-list-item value="retro">Retro/Neubrutalism (Bold & Boxy)</mwc-list-item>
            <mwc-list-item value="midnight">Midnight (Sleek Dark Theme)</mwc-list-item>
            <mwc-list-item value="minimal">Minimal (Clean & Simple)</mwc-list-item>
            <mwc-list-item value="vibrant">Vibrant (Bright & Colorful)</mwc-list-item>
            <mwc-list-item value="custom">Custom (Use Custom Colors)</mwc-list-item>
          </ha-select>
          <p class="helper-text">
            Choose a pre-built visual theme or create your own custom theme.
          </p>

          ${"custom"===this._config.theme?B`
            <p class="helper-text" style="margin-top: 16px; font-weight: 600;">
              Custom Theme Colors (use CSS color values like #667eea or rgb(102, 126, 234)):
            </p>
            <ha-textfield
              label="Primary Color"
              .value=${this._config.custom_theme_colors?.primary||""}
              @input=${e=>this._customColorChanged(e,"primary")}
              placeholder="#667eea"
            ></ha-textfield>
            <ha-textfield
              label="Secondary Color"
              .value=${this._config.custom_theme_colors?.secondary||""}
              @input=${e=>this._customColorChanged(e,"secondary")}
              placeholder="#764ba2"
            ></ha-textfield>
            <ha-textfield
              label="Background Color"
              .value=${this._config.custom_theme_colors?.background||""}
              @input=${e=>this._customColorChanged(e,"background")}
              placeholder="#ffffff"
            ></ha-textfield>
            <ha-textfield
              label="Text Color"
              .value=${this._config.custom_theme_colors?.text||""}
              @input=${e=>this._customColorChanged(e,"text")}
              placeholder="#333333"
            ></ha-textfield>
            <ha-textfield
              label="Border Color"
              .value=${this._config.custom_theme_colors?.border||""}
              @input=${e=>this._customColorChanged(e,"border")}
              placeholder="#e0e0e0"
            ></ha-textfield>
            <ha-textfield
              label="Accent Color"
              .value=${this._config.custom_theme_colors?.accent||""}
              @input=${e=>this._customColorChanged(e,"accent")}
              placeholder="#f093fb"
            ></ha-textfield>
          `:""}
          `:""}
        </div>

        <!-- Temperature Settings -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("temperature")}>
            <span class="chevron ${this._expandedSections.has("temperature")?"expanded":""}">▶</span>
            Temperature Settings
          </h4>

          ${this._expandedSections.has("temperature")?B`
          <ha-select
            label="Outdoor Temperature Sensor (Optional)"
            .configValue=${"outdoor_temp_sensor"}
            .value=${this._config.outdoor_temp_sensor||""}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${t.map(e=>B`
                <mwc-list-item .value=${e}>
                  ${e}
                </mwc-list-item>
              `)}
          </ha-select>
          <p class="helper-text">
            This sensor will be used for the header gradient and can be displayed in the forecast.
          </p>

          <ha-select
            label="Temperature Display Mode"
            .configValue=${"temp_display_mode"}
            .value=${this._config.temp_display_mode||"forecast"}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="forecast">Forecast Only (High/Low)</mwc-list-item>
            <mwc-list-item value="actual">Actual Only (From Sensor)</mwc-list-item>
            <mwc-list-item value="both">Both (Forecast + Actual)</mwc-list-item>
          </ha-select>
          <p class="helper-text">
            Choose what temperature to display in forecast rows. "Actual" requires an outdoor temperature sensor.
          </p>
          `:""}
        </div>

        <!-- Header Settings -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("header")}>
            <span class="chevron ${this._expandedSections.has("header")?"expanded":""}">▶</span>
            Header Settings
          </h4>

          ${this._expandedSections.has("header")?B`
          <ha-select
            label="Header Mode"
            .configValue=${"header_mode"}
            .value=${this._config.header_mode||"time-focused"}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="time-focused">Time Focused (Large Clock)</mwc-list-item>
            <mwc-list-item value="date-focused">Date Focused (Large Date)</mwc-list-item>
            <mwc-list-item value="balanced">Balanced (Equal Time & Date)</mwc-list-item>
            <mwc-list-item value="minimal">Minimal (Icon & Temp Only)</mwc-list-item>
            <mwc-list-item value="greeting">Greeting (Personalized Message)</mwc-list-item>
            <mwc-list-item value="graphical">Graphical (Seasonal Background)</mwc-list-item>
          </ha-select>

          ${"greeting"===this._config.header_mode?B`
            <ha-textfield
              label="Greeting Name"
              .configValue=${"greeting_name"}
              .value=${this._config.greeting_name||""}
              @input=${this._valueChanged}
            ></ha-textfield>
            <p class="helper-text">
              Your name will be used in the personalized greeting message.
            </p>
          `:""}

          ${"graphical"===this._config.header_mode?B`
            <div class="seasonal-images-section">
              <p class="helper-text">
                Select bundled seasonal images or leave as default. Upload custom images to <code>/config/www/</code> to see them here.
              </p>

              <ha-select
                label="Spring Image (Mar-May)"
                .value=${this._config.seasonal_images?.spring||"default"}
                @selected=${e=>this._seasonalImageChanged(e,"spring")}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Cherry Blossoms & Tulips</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/spring-alt1.jpg">Alt 1 - More Tulips & Flowers</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/spring-alt2.jpg">Alt 2 - Vibrant Spring Garden</mwc-list-item>
              </ha-select>

              <ha-select
                label="Summer Image (Jun-Aug)"
                .value=${this._config.seasonal_images?.summer||"default"}
                @selected=${e=>this._seasonalImageChanged(e,"summer")}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Tropical Beach Sunset</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/summer-alt1.jpg">Alt 1 - Sunset Beach Painting</mwc-list-item>
              </ha-select>

              <ha-select
                label="Fall Image (Sep-Nov)"
                .value=${this._config.seasonal_images?.fall||"default"}
                @selected=${e=>this._seasonalImageChanged(e,"fall")}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Pumpkin & Maple Leaves</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/fall-alt1.jpg">Alt 1 - Autumn Forest Scene</mwc-list-item>
              </ha-select>

              <ha-select
                label="Winter Image (Dec-Feb)"
                .value=${this._config.seasonal_images?.winter||"default"}
                @selected=${e=>this._seasonalImageChanged(e,"winter")}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Snowy Winter Beach</mwc-list-item>
                <mwc-list-item value="/local/community/WeatherPulse/images/winter-alt1.jpg">Alt 1 - Snowy Palm Tree Beach</mwc-list-item>
              </ha-select>

              <p class="helper-text">
                Using "Default" will load the bundled images automatically. Select alternates to use different bundled images.
              </p>
            </div>
          `:""}

          <ha-formfield label="Show Date">
            <ha-switch
              .configValue=${"show_date"}
              .checked=${!1!==this._config.show_date}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Time">
            <ha-switch
              .configValue=${"show_time"}
              .checked=${!1!==this._config.show_time}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          `:""}
        </div>

        <!-- Forecast Settings -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("forecast")}>
            <span class="chevron ${this._expandedSections.has("forecast")?"expanded":""}">▶</span>
            Forecast Settings
          </h4>

          ${this._expandedSections.has("forecast")?B`
          <ha-formfield label="Show Forecast">
            <ha-switch
              .configValue=${"show_forecast"}
              .checked=${!1!==this._config.show_forecast}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Toggle to show or hide the forecast section. Will hide automatically if no forecast data is available.
          </p>

          <ha-select
            label="Forecast Type"
            .configValue=${"forecast_type"}
            .value=${this._config.forecast_type||"daily"}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="daily">Daily</mwc-list-item>
            <mwc-list-item value="hourly">Hourly</mwc-list-item>
          </ha-select>

          ${"hourly"===this._config.forecast_type?B`
            <ha-textfield
              label="Number of Hours"
              type="number"
              .configValue=${"hourly_count"}
              .value=${String(this._config.hourly_count||12)}
              @input=${this._valueChanged}
              min="1"
              max="48"
            ></ha-textfield>
            <p class="helper-text">
              Show 1-48 hours of forecast data
            </p>
          `:B`
            <ha-select
              label="Forecast Days"
              .configValue=${"forecast_days"}
              .value=${String(this._config.forecast_days||5)}
              @selected=${this._valueChanged}
              @closed=${e=>e.stopPropagation()}
            >
              <mwc-list-item value="5">5 Days</mwc-list-item>
              <mwc-list-item value="7">7 Days</mwc-list-item>
            </ha-select>
          `}

          <ha-select
            label="View Mode"
            .configValue=${"view_mode"}
            .value=${this._config.view_mode||"standard"}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="compact">Compact</mwc-list-item>
            <mwc-list-item value="standard">Standard</mwc-list-item>
            <mwc-list-item value="detailed">Detailed</mwc-list-item>
            <mwc-list-item value="chart">Chart (Temperature Trend Line)</mwc-list-item>
          </ha-select>
          <p class="helper-text">
            Chart view displays a temperature trend line with weather icons, similar to TV weather graphics.
          </p>
          `:""}
        </div>

        <!-- Weather Information -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("weather_info")}>
            <span class="chevron ${this._expandedSections.has("weather_info")?"expanded":""}">▶</span>
            Weather Information Display
          </h4>

          ${this._expandedSections.has("weather_info")?B`
          <p class="helper-text">
            Select which weather details to display below the header (when available from your weather provider).
          </p>

          <ha-select
            label="Weather Info Layout"
            .configValue=${"weather_info_layout"}
            .value=${this._config.weather_info_layout||"standard"}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="compact">Compact (displayed in header)</mwc-list-item>
            <mwc-list-item value="standard">Standard (separate cards)</mwc-list-item>
            <mwc-list-item value="detailed">Detailed (large cards)</mwc-list-item>
          </ha-select>

          <ha-formfield label="UV Index">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes("uv_index")}
              @change=${e=>this._weatherInfoToggle(e,"uv_index")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Wind Speed">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes("wind")}
              @change=${e=>this._weatherInfoToggle(e,"wind")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Feels Like Temperature">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes("feels_like")}
              @change=${e=>this._weatherInfoToggle(e,"feels_like")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Precipitation">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes("precipitation")}
              @change=${e=>this._weatherInfoToggle(e,"precipitation")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Humidity">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes("humidity")}
              @change=${e=>this._weatherInfoToggle(e,"humidity")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Pressure">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes("pressure")}
              @change=${e=>this._weatherInfoToggle(e,"pressure")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Visibility">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes("visibility")}
              @change=${e=>this._weatherInfoToggle(e,"visibility")}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Sunrise/Sunset">
            <ha-switch
              .checked=${this._config.show_weather_info?.includes("sunrise_sunset")}
              @change=${e=>this._weatherInfoToggle(e,"sunrise_sunset")}
            ></ha-switch>
          </ha-formfield>
          `:""}
        </div>

        <!-- Display Options -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("display")}>
            <span class="chevron ${this._expandedSections.has("display")?"expanded":""}">▶</span>
            Display Options
          </h4>

          ${this._expandedSections.has("display")?B`
          <ha-formfield label="Animate Icons">
            <ha-switch
              .configValue=${"animate_icons"}
              .checked=${!1!==this._config.animate_icons}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Auto Day/Night Mode">
            <ha-switch
              .configValue=${"night_mode"}
              .checked=${!0===this._config.night_mode}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Automatically switch to a darker, starry theme at night based on sunrise/sunset times. Works with all header modes.
          </p>

          <ha-formfield label="Show Moon Phase Icons">
            <ha-switch
              .configValue=${"show_moon_phase"}
              .checked=${!1!==this._config.show_moon_phase}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            On clear nights, replace the generic moon icon with the actual current moon phase (new moon, crescent, quarter, gibbous, full moon). Requires sensor.moon_phase entity.
          </p>

          <ha-formfield label="Enable Holiday Themes">
            <ha-switch
              .configValue=${"holiday_themes"}
              .checked=${!0===this._config.holiday_themes}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Automatically add festive decorative icons during holidays (Halloween, Christmas, New Year, Valentine's Day, St. Patrick's Day, Easter, 4th of July, Cinco de Mayo). Icons appear as subtle animated overlays.
          </p>

          <ha-formfield label="Show NWS Weather Alerts">
            <ha-switch
              .configValue=${"show_nws_alerts"}
              .checked=${!0===this._config.show_nws_alerts}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
          <p class="helper-text">
            Display National Weather Service alerts for your location. Uses your Home Assistant location coordinates.
          </p>

          ${this._config.show_nws_alerts?B`
            <ha-formfield label="Alert Test Mode (shows sample alerts from anywhere in US)">
              <ha-switch
                .configValue=${"nws_test_mode"}
                .checked=${!0===this._config.nws_test_mode}
                @change=${this._toggleChanged}
              ></ha-switch>
            </ha-formfield>
            <p class="helper-text">
              Enable this to see real NWS alerts from across the US for testing the alert display. Turn off when done testing.
            </p>
          `:""}
          `:""}
        </div>

        <!-- Advanced Options -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("advanced")}>
            <span class="chevron ${this._expandedSections.has("advanced")?"expanded":""}">▶</span>
            Advanced Options
          </h4>

          ${this._expandedSections.has("advanced")?B`
          <p class="helper-text">
            Optional: Override default sun and moon entities. Leave empty to use defaults.
          </p>

          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:"sun"}}}
            .value=${this._config.sun_entity||"sun.sun"}
            .label=${"Sun Entity"}
            .configValue=${"sun_entity"}
            @value-changed=${this._valueChanged}
          ></ha-selector>
          <p class="helper-text">
            Used for sunrise/sunset times and day/night detection. Defaults to sun.sun.
          </p>

          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:"sensor"}}}
            .value=${this._config.moon_entity||"sensor.moon_phase"}
            .label=${"Moon Entity"}
            .configValue=${"moon_entity"}
            @value-changed=${this._valueChanged}
          ></ha-selector>
          <p class="helper-text">
            Used for displaying accurate moon phase icons on clear nights. Defaults to sensor.moon_phase.
          </p>
          `:""}
        </div>

        <!-- Help Text -->
        <div class="section help">
          <p><strong>Tips:</strong></p>
          <ul>
            <li>The header gradient automatically changes color based on temperature</li>
            <li>Use greeting mode with your name for a personalized experience</li>
            <li>Add an outdoor temperature sensor for more accurate header colors</li>
            <li>All settings can also be configured via YAML</li>
          </ul>
        </div>
      </div>
    `}static get styles(){return n`
      .card-config {
        padding: 16px;
      }

      h3 {
        margin-top: 0;
        margin-bottom: 16px;
        font-size: 1.2em;
        font-weight: 500;
      }

      h4 {
        margin-top: 16px;
        margin-bottom: 8px;
        font-size: 1em;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .section-header {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        margin: -8px;
        border-radius: 4px;
        transition: background-color 0.2s;
      }

      .section-header:hover {
        background-color: var(--secondary-background-color);
      }

      .chevron {
        display: inline-block;
        font-size: 0.8em;
        transition: transform 0.2s ease;
        transform: rotate(0deg);
      }

      .chevron.expanded {
        transform: rotate(90deg);
      }

      .section {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--divider-color);
      }

      .section:last-child {
        border-bottom: none;
      }

      ha-select,
      ha-textfield {
        width: 100%;
        margin-bottom: 12px;
      }

      ha-formfield {
        display: block;
        margin-bottom: 8px;
      }

      .helper-text {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        margin: 4px 0 12px 0;
        font-style: italic;
      }

      .help {
        background: var(--secondary-background-color);
        padding: 12px;
        border-radius: 4px;
      }

      .help ul {
        margin: 8px 0 0 0;
        padding-left: 20px;
      }

      .help li {
        margin-bottom: 4px;
        font-size: 0.9em;
        color: var(--secondary-text-color);
      }
    `}};e([me({attribute:!1})],De.prototype,"hass",void 0),e([fe()],De.prototype,"_config",void 0),e([fe()],De.prototype,"_expandedSections",void 0),De=e([ce("weatherpulse-card-editor")],De);var Ne=Object.freeze({__proto__:null,get WeatherPulseCardEditor(){return De}});const Pe={halloween:{foreground:["🪦","🎃","🍬"],background:["🦇","🧛","🕷️","👻","🕸️","🕷️","🦹‍♂️","🧟"],lights:{colors:["#ff6b00","#9c27b0","#ff9800","#7b1fa2"],style:"round"}},christmas:{foreground:["🎄","🎁","🕯️"],background:["❄️","🔔","🦌","🎅","⛄","🌟","🧑‍🎄"],lights:{colors:["#ff0000","#00ff00","#ffff00","#0000ff","#ff69b4"],style:"long"}},newyear:{foreground:["🎊","YEAR","🍾"],background:["🍾","🥳","✨","🎉"],lights:{colors:["#FFD700","#C0C0C0","#4169E1","#FFD700","#C0C0C0","#4169E1"],style:"round"}},valentine:{foreground:["💝","🌹","💌"],background:["❤️","💕","💘","💖"]},stpatrick:{foreground:["🍀","☘️","🍻"],background:["🌈","💚","🎩","🪙"]},july4th:{foreground:["🇺🇸","🗽","🎆"],background:["🎇","⭐","🎉","🎊"],lights:{colors:["#ff0000","#ffffff","#0000ff","#ff0000","#ffffff","#0000ff"],style:"round"}},easter:{foreground:["🐰","🥚","🐇"],background:["🌷","🐣","💐","🌸"]},cincodemayo:{foreground:["🇲🇽","🌮","🍹"],background:["🌵","🎉","🎊","🎺"],lights:{colors:["#ff0000","#ffffff","#00ff00","#ff0000","#ffffff","#00ff00"],style:"round"}}};let Fe=class extends le{constructor(){super(...arguments),this.currentTime=ue(),this.currentDate=ve(),this.forecastData=[],this.hourlyForecastData=[],this.nwsAlerts=[],this.lastAlertFetch=0,this.lastForecastFetch=0}static async getConfigElement(){return await Promise.resolve().then(function(){return Ne}),document.createElement("weatherpulse-card-editor")}static getStubConfig(){return{type:"custom:weatherpulse-card",entity:"weather.home",header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation","wind"]}}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this.config={header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation"],show_forecast:!0,temp_display_mode:"forecast",...e}}connectedCallback(){super.connectedCallback(),this.startClock(),this.fetchForecast(),this.fetchNWSAlerts(),this.forecastUpdateInterval=window.setInterval(()=>this.fetchForecast(),18e5),this.alertUpdateInterval=window.setInterval(()=>this.fetchNWSAlerts(),3e5)}disconnectedCallback(){super.disconnectedCallback(),this.stopClock(),this.forecastUpdateInterval&&clearInterval(this.forecastUpdateInterval),this.alertUpdateInterval&&clearInterval(this.alertUpdateInterval),this.forecastDebounceTimer&&clearTimeout(this.forecastDebounceTimer)}updated(e){super.updated(e)}startClock(){this.updateTime(),this.timeInterval=window.setInterval(()=>this.updateTime(),1e3)}stopClock(){this.timeInterval&&clearInterval(this.timeInterval)}updateTime(){this.currentTime=ue(),this.currentDate=ve(),(this.config.show_time||this.config.show_date)&&this.requestUpdate()}shouldUpdate(e){if(e.has("config"))return!0;if(e.has("currentTime")||e.has("currentDate"))return!0;if(e.has("hass")){const t=e.get("hass");if(!t)return!0;if(t.states[this.config.entity]!==this.hass.states[this.config.entity])return!0;if(this.config.outdoor_temp_sensor&&t.states[this.config.outdoor_temp_sensor]!==this.hass.states[this.config.outdoor_temp_sensor])return!0;if(this.config.forecast_sensor&&t.states[this.config.forecast_sensor]!==this.hass.states[this.config.forecast_sensor])return!0;const a=this.config.sun_entity||"sun.sun";if(this.config.show_weather_info?.includes("sunrise_sunset")&&t.states[a]!==this.hass.states[a])return!0;const i=this.config.moon_entity||"sensor.moon_phase";return!1!==this.config.show_moon_phase&&t.states[i]!==this.hass.states[i]}return!!(e.has("forecastData")||e.has("hourlyForecastData")||e.has("nwsAlerts"))}async fetchForecast(){this.forecastDebounceTimer&&clearTimeout(this.forecastDebounceTimer),this.forecastDebounceTimer=window.setTimeout(async()=>{const e=Date.now();if(!(e-this.lastForecastFetch<5e3)&&(this.lastForecastFetch=e,this.hass&&this.config?.entity))try{const e=this.config.forecast_type||"daily";this.hass.connection.subscribeMessage(e=>{e?.forecast&&(this.forecastData=e.forecast)},{type:"weather/subscribe_forecast",forecast_type:e,entity_id:this.config.entity}),await this.fetchHourlyForRainTiming()}catch(e){console.error("Failed to fetch forecast data:",e),this.forecastData=[]}},1e3)}async fetchHourlyForRainTiming(){const e=this.config.forecast_sensor;if(!this.hass||!e)return void(this.hourlyForecastData=[]);const t=this.hass.states[e];this.hourlyForecastData=t?.attributes?.forecast?t.attributes.forecast:[]}getWeatherData(){const e=this.hass.states[this.config.entity];if(!e)return{};const t=`${e.last_changed}_${this.forecastData.length}`;if(this.cachedWeatherData&&this.lastWeatherEntityState===t)return this.cachedWeatherData;const a=this.forecastData;return this.cachedWeatherData={temperature:e.attributes.temperature,temperature_unit:e.attributes.temperature_unit||"°F",humidity:e.attributes.humidity,pressure:e.attributes.pressure,pressure_unit:e.attributes.pressure_unit,wind_speed:e.attributes.wind_speed,wind_speed_unit:e.attributes.wind_speed_unit,wind_bearing:e.attributes.wind_bearing,wind_gust_speed:e.attributes.wind_gust_speed,condition:e.state,forecast:a,apparent_temperature:e.attributes.apparent_temperature,uv_index:e.attributes.uv_index,visibility:e.attributes.visibility,visibility_unit:e.attributes.visibility_unit,precipitation:e.attributes.precipitation,precipitation_unit:e.attributes.precipitation_unit,cloud_coverage:e.attributes.cloud_coverage,dew_point:e.attributes.dew_point,ozone:e.attributes.ozone},this.lastWeatherEntityState=t,this.cachedWeatherData}getCurrentTemp(){if(this.config.outdoor_temp_sensor){const e=this.hass.states[this.config.outdoor_temp_sensor];if(e)return parseFloat(e.state)}return this.getWeatherData().temperature||70}getSunEntity(){const e=this.config.sun_entity||"sun.sun";return this.hass.states[e]}getMoonEntity(){const e=this.config.moon_entity||"sensor.moon_phase";return this.hass.states[e]}isNightTime(){const e=this.getSunEntity();if(e)return"below_horizon"===e.state;const t=(new Date).getHours();return t>=20||t<6}getMoonPhase(){const e=this.getMoonEntity();return e?e.state:"unknown"}getRainTiming(){const e=this.hourlyForecastData;if(!e||0===e.length)return null;const t=new Date,a=new Date(t.getTime()+144e5);for(const i of e){const e=new Date(i.datetime);if(e<=t||e>a)continue;const r=(i.precipitation_probability??0)>50,o=(i.precipitation??0)>0,n=["rainy","pouring","rain","drizzle","lightning-rainy","thunderstorm","thunderstorms"].includes((i.condition||"").toLowerCase());if(r||o||n){const a=Math.round((e.getTime()-t.getTime())/36e5);let i="";return i=a<1?"Rain expected within the hour":1===a?"Rain expected in 1 hour":`Rain expected in ${a} hours`,{isRaining:!0,message:i,time:e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}}}return null}getCurrentHoliday(){if(!this.config?.holiday_themes)return null;const e=new Date,t=e.getMonth()+1,a=e.getDate();return 10===t&&a>=25?"halloween":12===t&&a>=18&&a<=25?"christmas":12===t&&31===a||1===t&&1===a?"newyear":2!==t||13!==a&&14!==a?3===t&&17===a?"stpatrick":5===t&&5===a?"cincodemayo":7===t&&4===a?"july4th":3===t&&a>=25||4===t&&a<=10?"easter":null:"valentine"}renderHolidayDecorations(){const e=this.getCurrentHoliday();if(!e)return"";const{background:t=[]}=Pe[e]||{};let a=[],i=[];if("halloween"===e){i=[{icon:"🦇",top:8,left:8,size:2.8},{icon:"🦇",top:35,left:50,size:2.6},{icon:["🧙‍♀️","🧛","🧟"][Math.floor(Date.now()/1e4)%3],top:48,left:88,size:2.5},{icon:"🕷️",top:55,left:48,size:2.2},{icon:"🕷️",top:18,left:88,size:2},{icon:"👻",top:72,left:10,size:2.4},{icon:"🕸️",top:10,left:88,size:1.8}]}else if("christmas"===e){i=[{icon:"❄️",top:8,left:8,size:2.8},{icon:"❄️",top:10,left:90,size:2.6},{icon:"🦌",top:40,left:50,size:2.5},{icon:["🎅","🧑‍🎄"][Math.floor(Date.now()/1e4)%2],top:50,left:88,size:2.4},{icon:"⛄",top:72,left:10,size:2.2},{icon:"🌟",top:5,left:50,size:2.3},{icon:"🌟",top:75,left:88,size:2}]}else if("newyear"===e)i=[{icon:"🕛",top:8,left:8,size:2.8},{icon:"🎊",top:10,left:88,size:2.6},{icon:"🥳",top:40,left:50,size:2.5},{icon:"🍾",top:72,left:88,size:2.2},{icon:"✨",top:55,left:48,size:2.2},{icon:"🎉",top:72,left:10,size:2.2}];else if("valentine"===e)i=[{icon:"❤️",top:8,left:10,size:2.8},{icon:"❤️",top:10,left:88,size:2.6},{icon:"💕",top:40,left:50,size:2.4},{icon:"💘",top:72,left:88,size:2.2},{icon:"💖",top:72,left:10,size:2.2}];else if("july4th"===e)i=[{icon:"🎇",top:8,left:10,size:2.8},{icon:"🎇",top:10,left:88,size:2.6},{icon:"⭐",top:40,left:50,size:2.4},{icon:"⭐",top:72,left:88,size:2.2},{icon:"🎉",top:72,left:10,size:2.2},{icon:"🎊",top:55,left:48,size:2}];else if("stpatrick"===e)i=[{icon:"🌈",top:8,left:10,size:2.8},{icon:"🌈",top:10,left:88,size:2.6},{icon:"💚",top:40,left:50,size:2.4},{icon:"🎩",top:55,left:88,size:2.2},{icon:"🪙",top:72,left:10,size:2.2}];else if("easter"===e)i=[{icon:"🌷",top:8,left:10,size:2.8},{icon:"🌷",top:10,left:88,size:2.6},{icon:"🐣",top:40,left:50,size:2.4},{icon:"💐",top:72,left:88,size:2.2},{icon:"🌸",top:72,left:10,size:2.2}];else if("cincodemayo"===e)i=[{icon:"🌵",top:8,left:10,size:2.8},{icon:"🌵",top:10,left:88,size:2.6},{icon:"🎺",top:40,left:50,size:2.4},{icon:"🎉",top:72,left:10,size:2.2},{icon:"🎊",top:55,left:88,size:2}];else{const e=Math.min(5,t.length);a=t.slice(0,e);const r=[{top:5,left:5},{top:5,left:85},{top:45,left:5},{top:45,left:85},{top:80,left:50}];i=a.map((e,t)=>{const a=r[t%r.length];return{icon:e,top:a.top+(10*Math.random()-5),left:a.left+(10*Math.random()-5),size:1.5+1*Math.random()}})}const r=["🎆","🎇","⭐","✨"],o=i.map((e,t)=>{const a=r.includes(e.icon)?(40*Math.random()-20).toFixed(1):"0",i=(.8*t).toFixed(2);return B`
        <span
          class="holiday-icon holiday-background"
          style="
            font-size: ${e.size.toFixed(2)}em;
            transform: rotate(${a}deg);
            animation-delay: ${i}s;
            top: ${e.top}%;
            left: ${e.left}%;
          "
        >${e.icon}</span>
      `});return B`
      <div class="holiday-overlay">
        ${"newyear"===e?B`
          <div class="fireworks-container">
            <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div>
          </div>
        `:""}
        ${o}
      </div>
    `}async fetchNWSAlerts(){if(!this.config?.show_nws_alerts||!this.hass)return;const e=Date.now();if(!(e-this.lastAlertFetch<3e5))try{let t;if(this.config?.nws_test_mode)t="https://api.weather.gov/alerts/active?status=actual&message_type=alert",console.log("NWS Test Mode: Fetching active US alerts for display testing");else{const e=this.hass.config.latitude;t=`https://api.weather.gov/alerts/active?point=${e},${this.hass.config.longitude}`}const a=await fetch(t);if(!a.ok)return void console.warn("Failed to fetch NWS alerts:",a.status);const i=await a.json(),r=[];if(i.features&&Array.isArray(i.features)){const e=this.config?.nws_test_mode?i.features.slice(0,2):i.features;for(const t of e){const e=t.properties;e&&r.push({id:e.id||"",event:e.event||"",headline:e.headline||"",description:e.description||"",instruction:e.instruction||"",severity:e.severity||"Unknown",urgency:e.urgency||"Unknown",certainty:e.certainty||"Unknown",onset:e.onset||"",expires:e.expires||"",areaDesc:e.areaDesc||""})}}this.nwsAlerts=r,this.lastAlertFetch=e,this.config?.nws_test_mode&&r.length>0&&console.log(`NWS Test Mode: Displaying ${r.length} sample alert(s)`,r)}catch(e){console.error("Failed to fetch NWS alerts:",e)}}renderNWSAlerts(){return this.config?.show_nws_alerts&&0!==this.nwsAlerts.length?B`
      <div class="nws-alerts-section">
        ${this.nwsAlerts.map(e=>{let t="alert-unknown",a="⚠️",i="";switch(e.severity){case"Extreme":t="alert-extreme",a="🔴";break;case"Severe":t="alert-severe",a="🟠";break;case"Moderate":t="alert-moderate",a="🟡";break;case"Minor":t="alert-minor",a="🔵"}return"Immediate"===e.urgency?i="IMMEDIATE":"Expected"===e.urgency&&(i="EXPECTED"),B`
            <div class="nws-alert ${t}">
              <details class="alert-main-details">
                <summary class="alert-main-summary">
                  <span class="alert-icon">${a}</span>
                  <span class="alert-event-compact">
                    ${e.event}
                    ${i?B`<span class="urgency-badge">${i}</span>`:""}
                  </span>
                  <span class="expand-icon-main">▼</span>
                </summary>

                <div class="alert-expanded-content">
                  <div class="alert-headline">${e.headline}</div>

                  ${e.areaDesc?B`
                    <details class="alert-area-details">
                      <summary class="alert-area-summary">
                        <span class="expand-icon">▶</span>
                        Affected areas
                      </summary>
                      <div class="alert-area-content">${e.areaDesc}</div>
                    </details>
                  `:""}

                  ${e.description?B`
                    <details class="alert-description-details">
                      <summary class="alert-description-summary">
                        <span class="expand-icon">▶</span>
                        Full details
                      </summary>
                      <div class="alert-description-content">${e.description}</div>
                    </details>
                  `:""}

                  ${e.instruction?B`
                    <div class="alert-instruction">
                      <strong>⚠️ What to do:</strong> ${e.instruction}
                    </div>
                  `:""}

                  ${e.expires?B`
                    <div class="alert-expires">
                      Expires: ${new Date(e.expires).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0})}
                    </div>
                  `:""}
                </div>
              </details>
            </div>
          `})}
      </div>
    `:B``}renderWeatherInfo(e){const t=this.config?.show_weather_info;if(!t||0===t.length)return B``;const a=this.getWeatherData(),i=e||this.config?.weather_info_layout||"standard",r=[];for(const e of t){let t="",o="",n="";switch(e){case"uv_index":void 0!==a.uv_index&&(t="☀️",o="UV Index",n=String(Math.round(a.uv_index)));break;case"wind":if(void 0!==a.wind_speed){t="💨",o="Wind";const e=a.wind_speed_unit||"mph";n=`${Math.round(a.wind_speed)} ${e}`,a.wind_gust_speed&&(n+=` (gusts ${Math.round(a.wind_gust_speed)} ${e})`)}break;case"feels_like":{let e=a.apparent_temperature;if(void 0===e&&void 0!==a.temperature){const t=a.temperature,i=a.wind_speed||0;if(t<=50&&i>3)e=35.74+.6215*t-35.75*Math.pow(i,.16)+.4275*t*Math.pow(i,.16);else if(t>=80){const i=a.humidity||50;e=2.04901523*t-42.379+10.14333127*i-.22475541*t*i-.00683783*t*t-.05481717*i*i+.00122874*t*t*i+85282e-8*t*i*i-199e-8*t*t*i*i}else e=t}if(void 0!==e){t="🌡️",o="Feels Like";const i=a.temperature_unit?.replace("°","")||"F";n=`${Math.round(e)}°${i}`}break}case"precipitation":if(void 0!==a.precipitation&&a.precipitation>0){t="💧",o="Precipitation";const e=a.precipitation_unit||"in";n=`${a.precipitation} ${e}`}break;case"humidity":void 0!==a.humidity&&(t="💧",o="Humidity",n=`${Math.round(a.humidity)}%`);break;case"pressure":if(void 0!==a.pressure){t="🔽",o="Pressure";const e=a.pressure_unit||"hPa";n=`${Math.round(a.pressure)} ${e}`}break;case"visibility":if(void 0!==a.visibility){t="👁️",o="Visibility";const e=a.visibility_unit||"mi";n=`${a.visibility} ${e}`}break;case"sunrise_sunset":{const e=this.getSunEntity();if(e&&e.attributes){const a="above_horizon"===e.state,i=a?e.attributes.next_setting:e.attributes.next_rising;if(i){t=a?"🌅":"🌄",o=a?"Sunset":"Sunrise",n=new Date(i).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}}break}}n&&("compact"===i?r.push(B`
            <div class="weather-info-item weather-info-compact">
              <div class="weather-info-value">${n}</div>
              <span class="weather-info-icon">${t}</span>
            </div>
          `):"detailed"===i?r.push(B`
            <div class="weather-info-item weather-info-detailed">
              <span class="weather-info-icon">${t}</span>
              <div class="weather-info-content">
                <div class="weather-info-label">${o}</div>
                <div class="weather-info-value">${n}</div>
              </div>
            </div>
          `):r.push(B`
            <div class="weather-info-item">
              <span class="weather-info-icon">${t}</span>
              <div class="weather-info-content">
                <div class="weather-info-label">${o}</div>
                <div class="weather-info-value">${n}</div>
              </div>
            </div>
          `))}if(0===r.length)return B``;return B`
      <div class="${`weather-info-section weather-info-layout-${i}`}">
        ${r}
      </div>
    `}renderHeader(){const e=this.getWeatherData(),t=this.getCurrentTemp(),a=e.temperature,i=!!this.config.outdoor_temp_sensor,r=ge(t,e.temperature_unit),o=this.config.header_mode||"time-focused",n=this.config.temp_display_mode||"forecast",s=e.temperature_unit||"°F";let l,d="";switch(d="both"===n&&i&&a?B`
        <div class="temp-display-wrapper">
          <div class="temp-display">
            <div class="temp-main">${Math.round(t)}°${s.replace("°","")}</div>
            <div class="temp-label">Actual</div>
          </div>
          <div class="temp-display">
            <div class="temp-main">${Math.round(a)}°${s.replace("°","")}</div>
            <div class="temp-label">Forecast</div>
          </div>
        </div>
      `:"actual"===n&&i?B`
        <div class="temp-display">
          <div class="temp-main">${Math.round(t)}°${s.replace("°","")}</div>
          <div class="temp-label">Actual</div>
        </div>
      `:B`
        <div class="temp-display">
          <div class="temp-main">${Math.round(t)}°${s.replace("°","")}</div>
          <div class="temp-label">Forecast</div>
        </div>
      `,o){case"greeting":l=B`
          <div class="greeting-header">
            <div class="weather-icon ${we(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="greeting-content">
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>
              <div class="greeting-text">
                ${function(e,t,a){const i=new Date,r=i.getHours(),o=i.toLocaleDateString("en-US",{weekday:"short"}),n=i.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"2-digit"}).replace(/\//g,"-"),s=e?`, ${e}`:"";let l="Hello";l=r<12?"Good Morning":r<17?"Good Afternoon":r<22?"Good Evening":"Good Night";let d="";if(t){const e=t.toLowerCase();e.includes("rain")?d="it's rainy, don't forget your umbrella":e.includes("snow")?d="it's snowy, bundle up":e.includes("clear")||e.includes("sunny")?d=a&&a>75?"it's sunny and warm":"it's a beautiful clear day":e.includes("cloud")?d="it's overcast but pleasant":e.includes("storm")&&(d="it's stormy, stay safe indoors")}return d?`${l}${s}, ${d}. ${o} ${n}`:`${l}${s}! ${o} ${n}`}(this.config.greeting_name,e.condition,t)}
              </div>
              ${d}
            </div>
          </div>
        `;break;case"graphical":{const t=be(),a=this.config.seasonal_images?.[t],i=function(e,t){if(t)return`url(${t})`;const a="/local/community/WeatherPulse/images";switch(e||be()){case"spring":default:return`url(${a}/spring-default.jpg)`;case"summer":return`url(${a}/summer-default.jpg)`;case"fall":return`url(${a}/fall-default.jpg)`;case"winter":return`url(${a}/winter-default.jpg)`}}(t,a);l=B`
          <div class="graphical-header" style="background: ${i}; background-size: cover; background-position: center;">
            <div class="graphical-overlay">
              <div class="graphical-content">
                <div class="graphical-main">
                  <div class="weather-icon-graphical ${we(e.condition||"clear")}">
                    ${this.renderWeatherIcon(e.condition||"clear")}
                  </div>
                  <div class="graphical-right">
                    ${!1!==this.config.show_time?B`
                      <div class="graphical-time">
                        ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
                      </div>
                    `:""}
                    ${!1!==this.config.show_date?B`
                      <div class="graphical-date">${this.currentDate}</div>
                    `:""}
                    ${d}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;break}case"minimal":l=B`
          <div class="minimal-header">
            <div class="weather-icon ${we(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            ${d}
          </div>
        `;break;case"date-focused":l=B`
          <div class="datetime-header">
            <div class="weather-icon ${we(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="date-large">${this.currentDate}</div>
              ${this.config.show_time?B`<div class="time-small">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period-small">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>`:""}
              ${d}
            </div>
          </div>
        `;break;case"balanced":l=B`
          <div class="datetime-header balanced">
            <div class="weather-icon ${we(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              ${this.config.show_time?B`<div class="time-medium">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period-medium">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>`:""}
              ${this.config.show_date?B`<div class="date-medium">${this.currentDate}</div>`:""}
              ${d}
            </div>
          </div>
        `;break;default:{let r=e.condition||"clear";r=r.toLowerCase().includes("unavail")||r.toLowerCase().includes("unknown")?"Loading":r.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),l=B`
          <div class="datetime-header time-focused-header">
            <div class="weather-icon ${we(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="condition-temp">${r}, ${Math.round(a||t)}°${s.replace("°","")}</div>
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
                 ${this.config.show_date?B`<div class="date-small">${this.currentDate}</div>`:""}
                </div>
             
              ${"both"===n&&i||"actual"===n&&i?B`
                <div class="actual-temp-below">
                  <span class="actual-temp-value">${Math.round(t)}°${s.replace("°","")}</span>
                  <span class="actual-temp-label">Actual</span>
                </div>
              `:""}
            </div>
          </div>
        `}}const c=this.getCurrentHoliday();let h="",p="";if(c){const{foreground:e=[],lights:t}=Pe[c]||{},a=[e[1],e[0],e[2]].filter(Boolean);if(h=B`
        <div class="holiday-foreground-cluster">
          ${a.map((e,t)=>{const a=0===t?1:1===t?0:2;let i=e;if("YEAR"===e){const e=new Date;i=(11===e.getMonth()&&31===e.getDate()?e.getFullYear()+1:e.getFullYear()).toString()}return B`<span class="holiday-icon holiday-foreground holiday-foreground-${a} ${"YEAR"===e?"year-text":""}">${i}</span>`})}
        </div>
      `,t){p=B`
          <div class="holiday-lights">
            ${Array(12).fill(0).map((e,a)=>{const i=t.colors[a%t.colors.length],r=(.15*a).toFixed(2);return B`
                <div class="light-bulb ${"long"===t.style?"light-long":"light-round"}" style="--bulb-color: ${i}; animation-delay: ${r}s;"></div>
              `})}
          </div>
        `}}const m="compact"===(this.config?.weather_info_layout||"standard"),f=m?this.renderWeatherInfo("compact"):"";return"graphical"===o?B`
        ${p}
        ${l}
        ${h}
        ${m?B`
          <div class="weather-info-in-header">
            ${f}
          </div>
        `:""}
      `:B`
      <div class="card-header" style="background: ${r.color}; color: ${r.textColor}; position: relative;">
        ${p}
        ${l}
        ${h}
        ${m?B`
          <div class="weather-info-in-header">
            ${f}
          </div>
        `:""}
      </div>
    `}renderWeatherIcon(e,t=!1){let a;if(t)a=function(e){const t=e.toLowerCase();return t.includes("clear")||t.includes("sunny")?"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":"clear-day"}(e);else{const t=this.isNightTime(),i=e.toLowerCase();a=i.includes("clear")||i.includes("sunny")?t?"clear-night":"clear-day":i.includes("partlycloudy")||i.includes("partly")||i.includes("partial")?t?"partlycloudy-night":"partlycloudy":we(e)}const i=!1!==this.config.animate_icons;if(("clear-night"===a||"partlycloudy-night"===a)&&i&&!1!==this.config.show_moon_phase){const e=this.getMoonPhase();if(e&&"unknown"!==e)return"clear-night"===a?function(e,t=!0){let a="";switch(e.toLowerCase()){case"new_moon":case"new-moon":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/></svg>';break;case"waxing_crescent":case"waxing-crescent":default:a=Me;break;case"first_quarter":case"first-quarter":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="24.26" x2="40.74" y1="18.57" y2="47.1" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M38.8 15.87a17.48 17.48 0 00-7.12-1.58 17.37 17.37 0 01-13 29.32 13.42 13.42 0 005.93 4.23A17.68 17.68 0 0048 39.12a17.68 17.68 0 00-9.2-23.25z"/></svg>';break;case"waxing_gibbous":case"waxing-gibbous":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="24.28" x2="40.93" y1="18.15" y2="47" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M49 27a16.78 16.78 0 00-19.45-11.9 17.2 17.2 0 011.73 4 17.76 17.76 0 01-13.82 22.19A16.83 16.83 0 0037 48.74 17.83 17.83 0 0049 27z"/></svg>';break;case"full_moon":case"full-moon":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="23.25" x2="40.75" y1="16.84" y2="47.16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="17.5" fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5"/></svg>';break;case"waning_gibbous":case"waning-gibbous":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="20.23" x2="37.75" y1="18.52" y2="48.86" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M44.68 40.83a17.84 17.84 0 01-11.93-21.72 17.2 17.2 0 011.73-4A16.78 16.78 0 0015 27a17.83 17.83 0 0012 21.74 16.83 16.83 0 0019.58-7.45 18 18 0 01-1.9-.46z"/></svg>';break;case"last_quarter":case"third_quarter":case"last-quarter":case"third-quarter":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="19.64" x2="37.19" y1="18.96" y2="49.35" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M29.06 33.31a17.52 17.52 0 013.26-19 17.44 17.44 0 00-7.11 1.58A17.68 17.68 0 0016 39.12a17.68 17.68 0 0023.43 8.72 13.45 13.45 0 005.94-4.23 17.51 17.51 0 01-16.31-10.3z"/></svg>';break;case"waning_crescent":case"waning-crescent":a='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="a" x1="17.54" x2="35.04" y1="20.14" y2="50.45" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#86c3db"/><stop offset=".45" stop-color="#86c3db"/><stop offset="1" stop-color="#5eafcf"/></linearGradient></defs><circle cx="32" cy="32" r="16.5" fill="none" stroke="#e5e7eb" stroke-dasharray="1.99 5.98" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="rotate(-45 32.002 31.994)"/><path fill="url(#a)" stroke="#72b9d5" stroke-linecap="round" stroke-linejoin="round" stroke-width=".5" d="M41.25 46.82c-16.7.48-25.61-19.52-14.07-31.61h0l.08-.06a18.38 18.38 0 00-2.38.86A17.5 17.5 0 1039.12 48a18.21 18.21 0 002.23-1.19z"/></svg>'}return t||(a=a.replace(/<animate[^>]*>/g,"").replace(/<\/animate>/g,""),a=a.replace(/<animateTransform[^>]*\/>/g,"")),a=a.replace(/<svg/,'<svg class="weather-icon-svg"'),R`${$e(a)}`}(e,!0):Te(a,!0)}if(i)return Te(a,!0);return B`<span class="icon-emoji">${{"clear-day":"☀️","clear-night":"🌙",cloudy:"☁️",rainy:"🌧️",snowy:"❄️",lightning:"⛈️",fog:"🌫️",windy:"💨"}[a]||"☀️"}</span>`}renderForecast(){const e=this.getWeatherData(),t=this.config.forecast_type||"daily",a="hourly"===t?this.config.hourly_count||12:this.config.forecast_days||5,i=e.forecast?.slice(0,a)||[],r=this.config.view_mode||"standard";if(0===i.length)return B`
        <div class="no-forecast">
          <p>No forecast data available</p>
          <p class="helper">Your weather integration may not provide forecast data, or you may need to use a weather service call to fetch it.</p>
        </div>
      `;if("chart"===r)return this.renderChartView(i,e.temperature_unit||"°F",t);return B`
      <div class="${`forecast-container forecast-${r} forecast-type-${t}`}">
        ${i.map(a=>"hourly"===t?this.renderForecastHour(a,e.temperature_unit||"°F",r):this.renderForecastDay(a,e.temperature_unit||"°F",r))}
      </div>
    `}renderForecastHour(e,t,a="standard"){const i=new Date(e.datetime).toLocaleTimeString("en-US",{hour:"numeric",hour12:!0}),r=Math.round(e.temperature||0),o=e.precipitation_probability||0,n=e.condition||"clear",s=e.humidity,l=e.wind_speed;if("compact"===a){const e=ge(r,t),a=e.color.replace("135deg","180deg");return B`
        <div class="forecast-hour forecast-compact" style="background: ${a}; color: ${e.textColor}; background-clip: padding-box;">
          <div class="hour-name">${i}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(n,!0)}
          </div>
          <div class="hour-temp">${r}°</div>
          ${o>0?B`<div class="precip-compact">💧${o}%</div>`:""}
        </div>
      `}return"detailed"===a?B`
        <div class="forecast-hour forecast-detailed">
          <div class="hour-info-row">
            <div class="hour-name">${i}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(n,!0)}
            </div>
            <div class="hour-temp-display">${r}°</div>
          </div>
          ${o>0||s||l?B`
            <div class="hour-details">
              ${o>0?B`<div class="detail-item"><span>💧</span> ${o}%</div>`:""}
              ${s?B`<div class="detail-item"><span>💨</span> ${s}%</div>`:""}
              ${l?B`<div class="detail-item"><span>🌬️</span> ${Math.round(l)} mph</div>`:""}
            </div>
          `:""}
        </div>
      `:B`
      <div class="forecast-hour">
        <div class="hour-name">${i}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(n,!0)}
        </div>
        <div class="hour-temp">${r}°</div>
        ${o>0?B`<div class="precip-prob">${o}%</div>`:""}
      </div>
    `}renderForecastDay(e,t,a="standard"){const i=xe(e.datetime),r=Math.round(e.temperature||0),o=Math.round(e.templow||0),n=e.precipitation_probability||0,s=e.humidity,l=e.wind_speed,d=r-o>0?o/r*70:30;if("compact"===a){const a=ge(r,t),s=a.color.replace("135deg","180deg");return B`
        <div class="forecast-day forecast-compact" style="background: ${s}; color: ${a.textColor}; background-clip: padding-box;">
          <div class="day-name">${i}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(e.condition||"clear",!0)}
          </div>
          <div class="compact-temps">
            <span class="temp-high-compact">${r}°</span>
            <span class="temp-low-compact">${o}°</span>
          </div>
          ${n>0?B`<div class="precip-compact">💧${n}%</div>`:""}
        </div>
      `}if("detailed"===a){const t=e=>{if(void 0===e)return"";return["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.round(e/22.5)%16]},a=void 0!==e.wind_bearing?t(e.wind_bearing):"",d=void 0!==e.precipitation&&e.precipitation>0?e.precipitation:null;return B`
        <div class="forecast-day forecast-detailed">
          <div class="detailed-name-icon">
            <div class="day-name">${i}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(e.condition||"clear",!0)}
            </div>
          </div>
          <div class="detailed-temps">
            <span class="temp-item">${Ee("colder",!1!==this.config.animate_icons)}${o}°</span>
            <span class="temp-item">${Ee("warmer",!1!==this.config.animate_icons)}${r}°</span>
          </div>
          <div class="detailed-info">
            <div class="detail-item">
              <span class="detail-icon">💧</span>
              <span class="detail-text">${n>0?`${n}%${d?` (${d}")`:""}`:"0%"}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">💨</span>
              <span class="detail-text">${s?`${s}%`:"--"}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">🌬️</span>
              <span class="detail-text">${l?`${Math.round(l)} mph ${a}`:"--"}</span>
            </div>
          </div>
        </div>
      `}return B`
      <div class="forecast-day">
        <div class="day-name">${i}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(e.condition||"clear",!0)}
        </div>
        <div class="day-temp-range">
          <span class="temp-low">${o}°</span>
          <div class="temp-bar">
            <div class="temp-bar-low" style="width: ${d}%"></div>
            <div class="temp-bar-high" style="width: ${70-d}%"></div>
          </div>
          <span class="temp-high">${r}°</span>
        </div>
        ${n>0?B`
          <div class="precip-prob">${n}%</div>
        `:""}
      </div>
    `}renderChartView(e,t,a){const i=e.map(e=>"hourly"===a?e.temperature||0:[e.temperature||0,e.templow||0]).flat(),r=Math.min(...i),o=Math.max(...i),n=.3*(o-r),s=r-n,l=o+n,d=100/e.length,c=[],h=[];return e.forEach((e,t)=>{const i=Math.round(e.temperature||0),r="daily"===a?Math.round(e.templow||0):null,o=t*d+d/2,n=100-(i-s)/(l-s)*100;if(c.push(`${o.toFixed(2)},${n.toFixed(2)}`),null!==r&&r>0){const e=100-(r-s)/(l-s)*100;h.push(`${o.toFixed(2)},${e.toFixed(2)}`)}}),B`
      <div class="forecast-chart">
        <!-- Day names at top -->
        <div class="chart-labels">
          ${e.map(e=>{const t="hourly"===a?new Date(e.datetime).toLocaleTimeString("en-US",{hour:"numeric",hour12:!0}):xe(e.datetime);return B`
              <div class="chart-label">${t}</div>
            `})}
        </div>

        <!-- Temperature chart with SVG lines -->
        <div class="chart-wrapper">
          <svg class="chart-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="${c.join(" ")}"
              fill="none"
              stroke="rgba(255, 120, 80, 1)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <polyline
              points="${h.join(" ")}"
              fill="none"
              stroke="#4A9EFF"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div class="chart-container">
            ${e.map(e=>{const t=Math.round(e.temperature||0),i="daily"===a?Math.round(e.templow||0):null,r=(t-s)/(l-s)*100,o=i?(i-s)/(l-s)*100:null;return B`
                <div class="chart-column">
                  ${i?B`
                    <div class="chart-temp chart-temp-high" style="bottom: calc(${r}% - 4px)">${t}°</div>
                    <div class="chart-point chart-point-high" style="bottom: calc(${r}% - 4px)"></div>
                    <div class="chart-temp chart-temp-low" style="bottom: calc(${o}% - 4px)">${i}°</div>
                    <div class="chart-point chart-point-low" style="bottom: calc(${o}% - 4px)"></div>
                  `:B`
                    <div class="chart-temp chart-temp-single" style="bottom: calc(${r}% - 4px)">${t}°</div>
                    <div class="chart-point chart-point-single" style="bottom: calc(${r}% - 4px)"></div>
                  `}
                </div>
              `})}
          </div>
        </div>
      </div>
    `}renderRainTiming(){const e=this.getRainTiming();return e?B`
      <div class="rain-timing-banner">
        <div class="rain-timing-content">
          <span class="rain-icon">☔</span>
          <span class="rain-message">${e.message}</span>
          <span class="rain-time">(~${e.time})</span>
        </div>
      </div>
    `:""}render(){if(!this.hass||!this.config)return B``;if(!this.hass.states[this.config.entity])return B`
        <ha-card>
          <div class="error">Entity ${this.config.entity} not found</div>
        </ha-card>
      `;const e=this.getWeatherData(),t=e.forecast&&e.forecast.length>0,a=!1!==this.config.show_forecast&&t,i=this.config.night_mode&&this.isNightTime()?"night-mode":"",r="compact"===(this.config?.weather_info_layout||"standard"),o=this.nwsAlerts.some(e=>"Extreme"===e.severity||"Severe"===e.severity)?this.nwsAlerts.some(e=>"Extreme"===e.severity)?"alert-glow-extreme":"alert-glow-severe":"",n=this.getCurrentTemp();let s="";n>=95?s="temp-glow-hot":n<=20&&(s="temp-glow-freezing");const l=this.config?.theme||"default",d="default"!==l?`theme-${l}`:"";let c="";if("custom"===l&&this.config?.custom_theme_colors){const e=this.config.custom_theme_colors;c=`\n        --custom-primary: ${e.primary||"#667eea"};\n        --custom-secondary: ${e.secondary||"#764ba2"};\n        --custom-background: ${e.background||"#ffffff"};\n        --custom-text: ${e.text||"#333333"};\n        --custom-border: ${e.border||"#e0e0e0"};\n        --custom-accent: ${e.accent||"#f093fb"};\n      `}const h="compact"===(this.config.view_mode||"standard")?"card-content card-content-compact":"card-content";return B`
      <ha-card class="${i} ${o} ${s} ${d}" style="${c}">
        ${this.renderHolidayDecorations()}
        ${this.renderHeader()}
        ${this.renderRainTiming()}
        ${this.renderNWSAlerts()}
        ${r?"":this.renderWeatherInfo()}
        ${a?B`
          <div class="${h}">
            ${this.renderForecast()}
          </div>
        `:""}
      </ha-card>
    `}static get styles(){return n`
      :host {
        display: block;

        /* Color Variables - Night Mode */
        --night-bg: #0a0e27;
        --night-bg-overlay-light: rgba(10, 14, 27, 0.6);
        --night-bg-overlay-medium: rgba(10, 14, 27, 0.7);
        --night-bg-alt-light: rgba(10, 14, 39, 0.5);
        --night-bg-alt-medium: rgba(10, 14, 39, 0.8);
        --night-gradient-secondary: rgba(20, 25, 45, 0.6);
        --night-surface: rgba(29, 33, 56, 0.6);
        --night-surface-light: rgba(29, 33, 56, 0.4);
        --night-text: white;
        --night-text-secondary: #e8eaf6;
        --night-border: rgba(232, 234, 246, 0.1);
        --night-border-medium: rgba(232, 234, 246, 0.15);

        /* Color Variables - Dark/Midnight Theme */
        --dark-bg: #0d0d0d;
        --dark-bg-alt: #1a1a1a;
        --dark-surface: #151515;
        --dark-minimal: #000000;
        --dark-minimal-alt: #0a0a0a;
        --dark-text: #c0c0c0;
        --dark-text-alt: #d0d0d0;
        --dark-text-dim: #b0b0b0;

        /* Color Variables - Light/Minimal Theme */
        --light-bg: #ffffff;
        --light-surface: #f8f8f8;
        --light-border: #e0e0e0;
        --light-border-alt: #f0f0f0;
        --light-text: #333;
        --light-text-alt: #333333;

        /* Color Variables - Overlays */
        --overlay-dark-subtle: rgba(0, 0, 0, 0.1);
        --overlay-dark-light: rgba(0, 0, 0, 0.15);
        --overlay-dark-normal: rgba(0, 0, 0, 0.2);
        --overlay-dark-medium: rgba(0, 0, 0, 0.3);
        --overlay-dark-strong: rgba(0, 0, 0, 0.5);
        --overlay-dark-very-strong: rgba(0, 0, 0, 0.7);
        --overlay-light-subtle: rgba(255, 255, 255, 0.1);
        --overlay-light-light: rgba(255, 255, 255, 0.15);
        --overlay-light-normal: rgba(255, 255, 255, 0.2);
        --overlay-light-medium: rgba(255, 255, 255, 0.3);

        /* Color Variables - Alerts */
        --alert-extreme: #d32f2f;
        --alert-extreme-glow-strong: rgba(211, 47, 47, 0.6);
        --alert-extreme-glow-medium: rgba(211, 47, 47, 0.4);
        --alert-extreme-glow-light: rgba(211, 47, 47, 0.2);
        --alert-severe: #f57c00;
        --alert-severe-glow-strong: rgba(245, 124, 0, 0.5);
        --alert-severe-glow-medium: rgba(245, 124, 0, 0.3);
        --alert-severe-glow-light: rgba(245, 124, 0, 0.2);
        --alert-moderate: #fbc02d;
        --alert-minor: #1976d2;
        --alert-unknown: #757575;

        /* Color Variables - Temperature */
        --temp-cold: #4A9EFF;
        --temp-cold-alt: rgba(74, 158, 255, 0.6);
        --temp-freezing-glow-strong: rgba(79, 195, 247, 0.6);
        --temp-freezing-glow-medium: rgba(79, 195, 247, 0.4);
        --temp-freezing-glow-light: rgba(79, 195, 247, 0.2);
        --temp-hot: #e67e22;
        --temp-hot-alt: rgba(230, 74, 25, 0.6);
        --temp-hot-glow-medium: rgba(230, 74, 25, 0.4);
        --temp-hot-glow-light: rgba(230, 74, 25, 0.2);

        /* Color Variables - Chart/Gradients */
        --chart-temp-high-start: rgba(255, 120, 80, 1);
        --chart-temp-high-end: #f1c40f;
        --chart-temp-low-start: #a8dadc;
        --chart-temp-low-end: #457b9d;
        --chart-temp-single: rgba(255, 150, 100, 1);

        /* Color Variables - Theme Variants */
        --vibrant-primary: #667eea;
        --vibrant-secondary: #764ba2;
        --vibrant-accent: #f093fb;
        --vibrant-gradient: #f5576c;
        --retro-primary: #0074D9;
        --retro-secondary: #001f3f;

        /* Night Mode Optimization Variables */
        --night-stars-bg-size: 300px 150px;
        --night-stars-opacity: 0.6;
        --night-stars-animation-duration: 120s;
        --night-stars-animation-distance: -150px;
        --night-compact-stars-bg-size: 80px 80px;
        --night-compact-stars-opacity: 0.4;
        --night-twinkle-duration: 3s;
        --night-twinkle-opacity-min: 0.3;
        --night-twinkle-opacity-max: 0.6;
        --night-z-stars: 0;
        --night-z-content: 1;
        --night-compact-gradient-start: #1a3a52;
        --night-compact-gradient-end: #2c5270;
      }

      ha-card {
        overflow: hidden;
        border-radius: 12px;
        position: relative;
      }

      /* ========================================
         UTILITY CLASSES - Reusable CSS Patterns
         ======================================== */

      /* Background Utilities */
      .bg-transparent { background: transparent; }
      .bg-transparent-important { background: transparent !important; }

      /* Opacity Utilities */
      .opacity-90 { opacity: 0.9; }
      .opacity-80 { opacity: 0.8; }
      .opacity-75 { opacity: 0.75; }
      .opacity-70 { opacity: 0.7; }

      /* Shadow Utilities */
      .shadow-light { box-shadow: 0 2px 4px var(--overlay-dark-light); }
      .shadow-medium { box-shadow: 0 4px 8px var(--overlay-dark-normal); }
      .drop-shadow-subtle { filter: drop-shadow(0 2px 4px var(--overlay-dark-medium)); }
      .drop-shadow-normal { filter: drop-shadow(0 2px 8px var(--overlay-dark-normal)); }
      .drop-shadow-strong { filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4)); }

      /* Text Utilities */
      .text-lg-medium { font-size: 16px; font-weight: 500; }
      .text-base-regular { font-size: 14px; font-weight: 400; }
      .text-sm-regular { font-size: 12px; font-weight: 400; }
      .label-uppercase { text-transform: uppercase; letter-spacing: 0.5px; }

      /* Pointer Events */
      .pointer-events-none { pointer-events: none; }

      /* Position + Z-Index Utilities */
      .relative-z-content { position: relative; z-index: var(--night-z-content); }
      .relative-z-1 { position: relative; z-index: 1; }
      .relative-z-2 { position: relative; z-index: 2; }
      .relative-z-3 { position: relative; z-index: 3; }

      /* Border Radius Utilities */
      .rounded-sm { border-radius: 4px; }
      .rounded { border-radius: 8px; }
      .rounded-lg { border-radius: 12px; }

      /* Transition Utilities */
      .transition-transform { transition: transform 0.2s ease; }
      .transition-background { transition: background 0.5s ease; }

      /* ========================================
         CONSOLIDATED SELECTORS - Apply Utilities
         ======================================== */

      /* Pointer Events: None - Consolidation */
      ha-card.night-mode::before,
      ha-card.night-mode .forecast-day.forecast-compact::before,
      ha-card.night-mode .forecast-hour.forecast-compact::before,
      .holiday-overlay,
      .holiday-icon,
      .holiday-lights,
      .holiday-foreground-cluster,
      .chart-lines {
        pointer-events: none;
      }

      /* Opacity 0.9 - Consolidation */
      .time-period,
      .time-small,
      .suggestion-text,
      .weather-info-label,
      .rain-time {
        opacity: 0.9;
      }

      /* Opacity 0.8 - Consolidation */
      .time-period-medium {
        opacity: 0.8;
      }

      /* Opacity 0.7 - Consolidation */
      .date-large,
      .time-large {
        opacity: 0.7;
      }

      /* Box Shadow: Light - Consolidation */
      .forecast-type-daily .forecast-compact,
      .forecast-type-hourly .forecast-compact {
        box-shadow: 0 2px 4px var(--overlay-dark-light);
      }

      /* Box Shadow: Medium (on hover) - Consolidation */
      .forecast-type-daily .forecast-compact:hover,
      .forecast-type-hourly .forecast-compact:hover {
        box-shadow: 0 4px 8px var(--overlay-dark-normal);
      }

      /* Border Radius: 4px - Consolidation */
      .temp-bar,
      .temp-bar-low,
      .temp-bar-high,
      .forecast-type-daily .forecast-compact,
      .forecast-type-hourly .forecast-compact {
        border-radius: 4px;
      }

      /* Border Radius: 8px - Consolidation */
      .weather-info-item,
      .nws-alert {
        border-radius: 8px;
      }

      /* Background Transparent - Consolidation (without !important) */
      ha-card.night-mode .card-content,
      .weather-info-in-header .weather-info-section,
      .weather-info-in-header .weather-info-item {
        background: transparent;
      }

      /* Background Transparent - Consolidation (with !important for theme overrides) */
      ha-card.night-mode .forecast-day,
      ha-card.night-mode .forecast-hour,
      ha-card.night-mode .weather-info-section,
      ha-card.night-mode .weather-info-item,
      ha-card.theme-midnight .forecast-day,
      ha-card.theme-midnight .forecast-hour,
      ha-card.theme-midnight .weather-info-section,
      ha-card.theme-midnight .weather-info-item,
      ha-card.theme-retro .forecast-day,
      ha-card.theme-retro .forecast-hour,
      ha-card.theme-retro .weather-info-section,
      ha-card.theme-retro .weather-info-item,
      ha-card.theme-minimal .forecast-day,
      ha-card.theme-minimal .forecast-hour,
      ha-card.theme-minimal .weather-info-section,
      ha-card.theme-minimal .weather-info-item,
      ha-card.theme-vibrant .forecast-day,
      ha-card.theme-vibrant .forecast-hour,
      ha-card.theme-vibrant .weather-info-section,
      ha-card.theme-vibrant .weather-info-item {
        background: transparent !important;
      }

      /* Text: 16px / 500 - Consolidation */
      .temp-low,
      .temp-high,
      .temp-actual,
      .hour-temp {
        font-size: 16px;
        font-weight: 500;
      }

      /* Label Uppercase - Consolidation */
      .actual-temp-label,
      .temp-label,
      .weather-info-label,
      .weather-info-in-header .weather-info-label-compact,
      .urgency-badge {
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      /* Transition: Transform 0.2s - Consolidation */
      .forecast-type-daily .forecast-compact,
      .forecast-type-hourly .forecast-compact {
        transition: transform 0.2s ease;
      }

      /* Transition: Background 0.5s - Consolidation */
      .card-header {
        transition: background 0.5s ease;
      }

      /* ======================================== */

      /* Night Mode Styling */
      ha-card.night-mode {
        background: var(--night-bg);
        position: relative;
      }

      ha-card.night-mode::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image:
          radial-gradient(2px 2px at 20px 30px, var(--night-text), transparent),
          radial-gradient(2px 2px at 60px 70px, var(--night-text), transparent),
          radial-gradient(1px 1px at 50px 50px, var(--night-text), transparent),
          radial-gradient(1px 1px at 130px 80px, var(--night-text), transparent),
          radial-gradient(2px 2px at 90px 10px, var(--night-text), transparent),
          radial-gradient(1px 1px at 200px 60px, var(--night-text), transparent),
          radial-gradient(2px 2px at 170px 120px, var(--night-text), transparent),
          radial-gradient(1px 1px at 220px 90px, var(--night-text), transparent),
          radial-gradient(1px 1px at 30px 100px, var(--night-text), transparent),
          radial-gradient(2px 2px at 270px 40px, var(--night-text), transparent),
          radial-gradient(1px 1px at 150px 15px, var(--night-text), transparent),
          radial-gradient(1px 1px at 100px 130px, var(--night-text), transparent),
          radial-gradient(2px 2px at 240px 100px, var(--night-text), transparent),
          radial-gradient(1px 1px at 190px 70px, var(--night-text), transparent),
          radial-gradient(1px 1px at 80px 95px, var(--night-text), transparent);
        background-repeat: repeat;
        background-size: var(--night-stars-bg-size);
        opacity: var(--night-stars-opacity);
        z-index: var(--night-z-stars);
        animation: starsFloat var(--night-stars-animation-duration) linear infinite;
        will-change: transform;
      }

      @keyframes starsFloat {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(var(--night-stars-animation-distance));
        }
      }

      ha-card.night-mode > * {
        position: relative;
        z-index: var(--night-z-content);
      }

      ha-card.night-mode .card-header {
        position: relative;
        color: var(--night-text) !important; /* Bright white text */
        filter: none !important; /* No filter - don't dim text */
      }

      ha-card.night-mode .card-header::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, var(--night-bg-overlay-light) 0%, var(--night-gradient-secondary) 100%); /* Darker overlay */
        pointer-events: none;
        z-index: var(--night-z-stars);
      }

      ha-card.night-mode .card-header > * {
        position: relative;
        z-index: var(--night-z-content);
      }

      /* Keep holiday cluster absolutely positioned even in night mode */
      ha-card.night-mode .holiday-foreground-cluster {
        position: absolute !important;
        z-index: var(--night-z-stars) !important;
      }

      ha-card.night-mode .graphical-overlay {
        background: linear-gradient(180deg, var(--night-bg-alt-light) 0%, var(--night-bg-alt-medium) 100%);
      }

      ha-card.night-mode .card-content {
        color: var(--night-text-secondary);
      }

      ha-card.night-mode .forecast-day,
      ha-card.night-mode .forecast-hour {
        border-bottom-color: var(--night-border);
      }

      ha-card.night-mode .temp-bar {
        background: var(--night-border-medium);
      }

      ha-card.night-mode .forecast-day.forecast-compact,
      ha-card.night-mode .forecast-hour.forecast-compact {
        background: linear-gradient(180deg, var(--night-compact-gradient-start) 0%, var(--night-compact-gradient-end) 100%) !important;
        position: relative !important;
        z-index: var(--night-z-content) !important; /* Above stars */
        overflow: hidden !important;
      }

      /* Add stars to night mode compact forecast boxes */
      ha-card.night-mode .forecast-day.forecast-compact::before,
      ha-card.night-mode .forecast-hour.forecast-compact::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image:
          radial-gradient(1px 1px at 10px 15px, var(--night-text), transparent),
          radial-gradient(1px 1px at 30px 35px, var(--night-text), transparent),
          radial-gradient(1px 1px at 25px 25px, var(--night-text), transparent),
          radial-gradient(1px 1px at 65px 40px, var(--night-text), transparent),
          radial-gradient(1px 1px at 45px 5px, var(--night-text), transparent),
          radial-gradient(1px 1px at 15px 50px, var(--night-text), transparent),
          radial-gradient(1px 1px at 55px 60px, var(--night-text), transparent),
          radial-gradient(1px 1px at 40px 70px, var(--night-text), transparent),
          radial-gradient(1px 1px at 70px 20px, var(--night-text), transparent),
          radial-gradient(1px 1px at 20px 65px, var(--night-text), transparent);
        background-repeat: repeat;
        background-size: var(--night-compact-stars-bg-size);
        opacity: var(--night-compact-stars-opacity);
        z-index: var(--night-z-stars);
        animation: starsTwinkle var(--night-twinkle-duration) ease-in-out infinite;
        will-change: opacity;
      }

      @keyframes starsTwinkle {
        0%, 100% {
          opacity: var(--night-twinkle-opacity-min);
        }
        50% {
          opacity: var(--night-twinkle-opacity-max);
        }
      }

      /* Respect user's motion preferences for accessibility */
      @media (prefers-reduced-motion: reduce) {
        ha-card.night-mode::before {
          animation: none;
        }
        ha-card.night-mode .forecast-day.forecast-compact::before,
        ha-card.night-mode .forecast-hour.forecast-compact::before {
          animation: none;
          opacity: var(--night-twinkle-opacity-min);
        }
      }

      /* Ensure content is above stars */
      ha-card.night-mode .forecast-day.forecast-compact > *,
      ha-card.night-mode .forecast-hour.forecast-compact > * {
        position: relative;
        z-index: var(--night-z-content);
      }

      ha-card.night-mode .forecast-type-hourly.forecast-standard .forecast-hour {
        background: var(--night-surface) !important; /* Keep some background */
        position: relative !important;
        z-index: var(--night-z-content) !important; /* Above stars */
      }

      .error {
        padding: 20px;
        color: var(--error-color, #ff0000);
        text-align: center;
      }

      .card-header {
        padding: 24px;
        border-radius: 12px 12px 0 0;
        position: relative; /* Required for holiday-foreground-cluster absolute positioning */
        overflow: visible; /* Allow lights to extend beyond header */
      }

      .datetime-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .greeting-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      /* Graphical header with seasonal background */
      .graphical-header {
        min-height: 280px;
        display: flex;
        align-items: center;
        position: relative;
        border-radius: 12px 12px 0 0;
        overflow: hidden;
      }

      .graphical-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, var(--overlay-dark-medium) 0%, rgba(0,0,0,0.6) 100%);
        backdrop-filter: blur(2px);
      }

      .graphical-content {
        position: relative;
        z-index: 1;
        padding: 32px 32px 32px 16px;
        width: 100%;
        color: white;
        text-shadow: 0 2px 8px var(--overlay-dark-strong);
      }

      .graphical-main {
        display: flex;
        align-items: center;
        gap: 24px;
      }

      .graphical-right {
        flex: 1;
        padding-right: 16px;
      }

      .graphical-time {
        font-size: 72px;
        font-weight: 300;
        line-height: 1;
        margin-bottom: 8px;
        position: relative;
      }

      .graphical-time .time-period {
        font-size: 20px;
        position: absolute;
        top: 6px;
        margin-left: 6px;
      }

      .graphical-date {
        font-size: 24px;
        font-weight: 400;
        opacity: 0.95;
        margin-bottom: 8px;
      }

      .weather-icon-graphical {
        font-size: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 180px;
      }

      .weather-icon-graphical .weather-icon-svg {
        width: 160px;
        height: 160px;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
      }

      .weather-icon-graphical .icon-emoji {
        font-size: 160px;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
      }

      .minimal-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
      }

      .weather-icon {
        font-size: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 180px;
        position: relative;
        z-index: 3;
      }

      .icon-emoji {
        display: block;
        font-size: 160px;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
      }

      .weather-icon-svg {
        width: 160px;
        height: 160px;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
      }

      .day-icon .weather-icon-svg {
        width: 32px;
        height: 32px;
      }

      .day-icon .icon-emoji {
        font-size: 32px;
      }

      .datetime-content {
        flex: 1;
      }

      .greeting-content {
        flex: 1;
      }

      .time-large {
        font-size: 64px;
        font-weight: 300;
        line-height: 1;
        position: relative;
      }

      .time-period {
        font-size: 16px;
        font-weight: 400;
        position: absolute;
        top: 4px;
        margin-left: 4px;
      }

      .time-medium {
        font-size: 48px;
        font-weight: 300;
        line-height: 1;
        margin-bottom: 8px;
        position: relative;
      }

      .time-period-medium {
        font-size: 14px;
        font-weight: 400;
        position: absolute;
        top: 4px;
        margin-left: 4px;
        opacity: 0.9;
      }

      .time-small {
        font-size: 24px;
        font-weight: 300;
        position: relative;
      }

      .time-period-small {
        font-size: 12px;
        font-weight: 400;
        position: absolute;
        top: 2px;
        margin-left: 2px;
        opacity: 0.9;
      }

      .date-large {
        font-size: 32px;
        font-weight: 400;
        line-height: 1.2;
        margin-bottom: 8px;
      }

      .date-medium {
        font-size: 24px;
        font-weight: 400;
        line-height: 1.2;
      }

      .date-small {
        font-size: 16px;
        font-weight: 400;
        opacity: 0.9;
        text-align: left;
      }

      .condition-temp {
        font-size: 20px;
        font-weight: 400;
        opacity: 0.95;
        margin-bottom: 2px;
        text-align: left;
      }

      .actual-temp-display {
        font-size: 22px;
        font-weight: 500;
        margin-top: 2px;
        display: flex;
        align-items: baseline;
        gap: 8px;
      }

      .actual-temp-below {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
        margin-top: 4px;
      }

      .actual-temp-value {
        font-size: 24px;
        font-weight: 500;
        line-height: 1;
      }

      .actual-temp-label {
        font-size: 12px;
        font-weight: 400;
        opacity: 0.8;
      }

      .temp-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
      }

      .temp-main {
        font-size: 32px;
        font-weight: 500;
        line-height: 1;
      }

      .temp-label {
        font-size: 11px;
        font-weight: 400;
        opacity: 0.8;
      }

      .temp-display-wrapper {
        display: flex;
        gap: 24px;
        align-items: center;
        justify-content: center;
        margin-top: 12px;
      }

      .greeting-text {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 4px;
        line-height: 1.3;
      }

      .suggestion-text {
        font-size: 16px;
        margin-bottom: 4px;
        line-height: 1.2;
      }

      /* Weather Info Section */
      .weather-info-section {
        display: grid;
        gap: 12px;
        padding: 16px 20px;
        background: var(--card-background-color, rgba(0,0,0,0.02));
        border-top: 1px solid var(--divider-color, var(--overlay-dark-subtle));
      }

      /* Standard Layout (default) */
      .weather-info-layout-standard {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      }

      /* Compact Layout - single line, more items per row */
      .weather-info-layout-compact {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        padding: 12px 20px;
        gap: 8px;
      }

      /* Detailed Layout - larger cards */
      .weather-info-layout-detailed {
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 16px;
      }

      .weather-info-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        background: var(--secondary-background-color, rgba(0,0,0,0.05));
        border-radius: 8px;
        position: relative;
        z-index: 2;
      }

      /* Compact item styling */
      .weather-info-compact {
        padding: 6px 8px;
        gap: 6px;
        justify-content: center;
      }

      .weather-info-compact .weather-info-icon {
        font-size: 14px;
        min-width: 14px;
      }

      .weather-info-compact .weather-info-value {
        font-size: 13px;
        font-weight: 600;
      }

      /* Detailed item styling */
      .weather-info-detailed {
        padding: 12px;
        gap: 12px;
      }

      .weather-info-detailed .weather-info-icon {
        font-size: 28px;
        min-width: 28px;
      }

      .weather-info-detailed .weather-info-label {
        font-size: 12px;
        margin-bottom: 4px;
      }

      .weather-info-detailed .weather-info-value {
        font-size: 16px;
        font-weight: 600;
      }

      .weather-info-icon {
        font-size: 24px;
        min-width: 24px;
        text-align: center;
      }

      .weather-info-content {
        flex: 1;
        min-width: 0;
      }

      .weather-info-label {
        font-size: 11px;
        font-weight: 400;
        opacity: 0.7;
        margin-bottom: 2px;
      }

      .weather-info-value {
        font-size: 15px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      ha-card.night-mode .weather-info-section {
        background: transparent; /* No background - show stars */
        border-top-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .weather-info-item {
        background: transparent; /* No boxes - show stars */
      }

      /* Weather Info in Header (compact mode) */
      .weather-info-in-header {
        margin-top: 8px;
      }

      .weather-info-in-header .weather-info-section {
        background: transparent;
        border-top: none;
        padding: 0;
        gap: 0;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: space-evenly;
      }

      .weather-info-in-header .weather-info-item {
        background: transparent;
        padding: 4px;
        border-radius: 0;
        gap: 2px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .weather-info-in-header .weather-info-value {
        font-size: 15px;
        font-weight: 500;
        line-height: 1;
      }

      .weather-info-in-header .weather-info-label-compact {
        font-size: 10px;
        font-weight: 400;
        opacity: 0.8;
        line-height: 1;
      }

      /* For graphical mode (outside card-header) */
      .graphical-header + .weather-info-in-header {
        padding: 0 32px 20px 32px;
      }

      .graphical-header + .weather-info-in-header .weather-info-section {
        background: transparent;
        padding: 0;
        border: none;
      }

      .graphical-header + .weather-info-in-header .weather-info-item {
        background: transparent;
        color: white;
      }

      /* Rain Timing Banner (Lower Third Style) */
      .rain-timing-banner {
        background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
        padding: 12px 20px;
        box-shadow: 0 2px 8px var(--overlay-dark-light);
        position: relative;
        overflow: hidden;
      }

      .rain-timing-banner::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, var(--overlay-light-subtle), transparent);
        animation: shimmer 3s infinite;
      }

        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        color: white;
        font-size: 15px;
        position: relative;
        z-index: 1;
      }

      .rain-icon {
        font-size: 24px;
        animation: rainBounce 2s ease-in-out infinite;
      }

      @keyframes rainBounce {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-4px); }
      }

      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }

      .rain-message {
        flex: 1;
        letter-spacing: 0.3px;
        text-shadow: 0 1px 2px var(--overlay-dark-normal);
      }

      .rain-time {
        font-size: 14px;
        font-weight: 500;
      }

      /* Night mode styling for rain banner */
      ha-card.night-mode .rain-timing-banner {
        background: linear-gradient(135deg, #2c5f8d 0%, #1a3a5c 100%);
      }

      /* NWS Alerts Section */
      .nws-alerts-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px 20px;
        background: var(--card-background-color, rgba(0,0,0,0.02));
        border-top: 1px solid var(--divider-color, var(--overlay-dark-subtle));
      }

      .nws-alert {
        border-radius: 8px;
        border-left: 4px solid;
        background: var(--secondary-background-color, rgba(0,0,0,0.05));
        overflow: hidden;
      }

      .nws-alert.alert-extreme {
        border-left-color: var(--alert-extreme);
        background: rgba(211, 47, 47, 0.1);
      }

      .nws-alert.alert-severe {
        border-left-color: var(--alert-severe);
        background: rgba(245, 124, 0, 0.1);
      }

      .nws-alert.alert-moderate {
        border-left-color: #fbc02d;
        background: rgba(251, 192, 45, 0.1);
      }

      .nws-alert.alert-minor {
        border-left-color: #1976d2;
        background: rgba(25, 118, 210, 0.1);
      }

      .nws-alert.alert-unknown {
        border-left-color: #757575;
        background: rgba(117, 117, 117, 0.1);
      }

      .alert-header {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 8px;
      }

      .alert-icon {
        font-size: 20px;
        line-height: 1;
        flex-shrink: 0;
      }

      .alert-title {
        flex: 1;
        min-width: 0;
      }

      .alert-event {
        font-size: 15px;
        font-weight: 600;
        line-height: 1.2;
        margin-bottom: 2px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .urgency-badge {
        display: inline-block;
        font-size: 9px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 3px;
        background: var(--overlay-light-medium);
        color: #fff;
        text-shadow: 0 1px 2px var(--overlay-dark-medium);
      }

      .alert-area {
        font-size: 12px;
        opacity: 0.7;
        line-height: 1.2;
      }

      /* Main alert collapsible */
      .alert-main-details {
        width: 100%;
      }

      .alert-main-summary {
        cursor: pointer;
        padding: 12px;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 10px;
        user-select: none;
      }

      .alert-main-summary:hover {
        opacity: 0.9;
      }

      .alert-main-summary::-webkit-details-marker {
        display: none;
      }

      .alert-event-compact {
        flex: 1;
        font-size: 15px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .expand-icon-main {
        font-size: 12px;
        transition: transform 0.2s ease;
        flex-shrink: 0;
      }

      .alert-main-details[open] .expand-icon-main {
        transform: rotate(180deg);
      }

      .alert-expanded-content {
        padding: 0 12px 12px 12px;
      }

      /* Collapsible alert sections */
      .alert-area-details,
      .alert-description-details {
        margin-top: 6px;
      }

      .alert-area-summary,
      .alert-description-summary {
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        opacity: 0.8;
        padding: 4px 0;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 6px;
        user-select: none;
      }

      .alert-area-summary:hover,
      .alert-description-summary:hover {
        opacity: 1;
      }

      .alert-area-summary::-webkit-details-marker,
      .alert-description-summary::-webkit-details-marker {
        display: none;
      }

      .expand-icon {
        display: inline-block;
        transition: transform 0.2s ease;
        font-size: 10px;
      }

      details[open] .expand-icon {
        transform: rotate(90deg);
      }

      .alert-area-content,
      .alert-description-content {
        font-size: 12px;
        line-height: 1.4;
        margin-top: 6px;
        padding: 8px;
        background: var(--overlay-dark-subtle);
        border-radius: 4px;
        opacity: 0.9;
      }

      .alert-headline {
        font-size: 13px;
        line-height: 1.4;
        margin-bottom: 6px;
      }

      .alert-instruction {
        font-size: 13px;
        line-height: 1.4;
        margin-bottom: 6px;
        padding: 8px;
        background: var(--overlay-dark-subtle);
        border-radius: 4px;
      }

      .alert-expires {
        font-size: 11px;
        opacity: 0.6;
        font-style: italic;
      }

      ha-card.night-mode .nws-alerts-section {
        background: rgba(10, 14, 39, 0.4);
        border-top-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .nws-alert {
        background: rgba(29, 33, 56, 0.6);
      }

      ha-card.night-mode .nws-alert.alert-extreme {
        background: var(--alert-extreme-glow-light);
      }

      ha-card.night-mode .nws-alert.alert-severe {
        background: var(--alert-severe-glow-light);
      }

      ha-card.night-mode .nws-alert.alert-moderate {
        background: rgba(251, 192, 45, 0.2);
      }

      ha-card.night-mode .nws-alert.alert-minor {
        background: rgba(25, 118, 210, 0.2);
      }

      /* Alert Glow Effects for Extreme/Severe */
      ha-card.alert-glow-extreme {
        box-shadow: 0 0 20px var(--alert-extreme-glow-strong),
                    0 0 40px var(--alert-extreme-glow-medium),
                    0 0 60px var(--alert-extreme-glow-light) !important;
        animation: pulse-extreme 2s ease-in-out infinite;
      }

      ha-card.alert-glow-severe {
        box-shadow: 0 0 15px var(--alert-severe-glow-strong),
                    0 0 30px var(--alert-severe-glow-medium),
                    0 0 45px var(--alert-severe-glow-light) !important;
        animation: pulse-severe 2s ease-in-out infinite;
      }

      @keyframes pulse-extreme {
        0%, 100% {
          box-shadow: 0 0 20px var(--alert-extreme-glow-strong),
                      0 0 40px var(--alert-extreme-glow-medium),
                      0 0 60px var(--alert-extreme-glow-light) !important;
        }
        50% {
          box-shadow: 0 0 25px rgba(211, 47, 47, 0.8),
                      0 0 50px var(--alert-extreme-glow-strong),
                      0 0 75px var(--alert-extreme-glow-medium) !important;
        }
      }

      @keyframes pulse-severe {
        0%, 100% {
          box-shadow: 0 0 15px var(--alert-severe-glow-strong),
                      0 0 30px var(--alert-severe-glow-medium),
                      0 0 45px var(--alert-severe-glow-light) !important;
        }
        50% {
          box-shadow: 0 0 20px rgba(245, 124, 0, 0.7),
                      0 0 40px var(--alert-severe-glow-strong),
                      0 0 60px var(--alert-severe-glow-medium) !important;
        }
      }

      /* Extreme Temperature Glow Effects */
      ha-card.temp-glow-hot {
        box-shadow: 0 0 20px var(--temp-hot-alt),
                    0 0 40px var(--temp-hot-glow-medium),
                    0 0 60px var(--temp-hot-glow-light);
        animation: pulse-hot 3s ease-in-out infinite;
      }

      ha-card.temp-glow-freezing {
        box-shadow: 0 0 20px var(--temp-freezing-glow-strong),
                    0 0 40px var(--temp-freezing-glow-medium),
                    0 0 60px var(--temp-freezing-glow-light);
        animation: pulse-freezing 3s ease-in-out infinite;
      }

      @keyframes pulse-hot {
        0%, 100% {
          box-shadow: 0 0 20px var(--temp-hot-alt),
                      0 0 40px var(--temp-hot-glow-medium),
                      0 0 60px var(--temp-hot-glow-light);
        }
        50% {
          box-shadow: 0 0 25px rgba(230, 74, 25, 0.8),
                      0 0 50px var(--temp-hot-alt),
                      0 0 75px var(--temp-hot-glow-medium);
        }
      }

      @keyframes pulse-freezing {
        0%, 100% {
          box-shadow: 0 0 20px var(--temp-freezing-glow-strong),
                      0 0 40px var(--temp-freezing-glow-medium),
                      0 0 60px var(--temp-freezing-glow-light);
        }
        50% {
          box-shadow: 0 0 25px rgba(79, 195, 247, 0.8),
                      0 0 50px var(--temp-freezing-glow-strong),
                      0 0 75px var(--temp-freezing-glow-medium);
        }
      }

      /* Holiday Decorations Overlay */
      .holiday-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10;
        overflow: hidden;
      }

      /* Fireworks canvas for New Year's */
      /* Year text styling for New Year's foreground cluster */
      .year-text {
        font-size: 3.5rem !important;
        font-weight: bold;
        color: #FFD700;
        text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        animation: year-glow 2s ease-in-out infinite;
        line-height: 1 !important;
        display: inline-block;
      }

      @keyframes year-glow {
        0%, 100% {
          text-shadow: 0 0 10px #FFD700, 0 0 20px #FFD700;
        }
        50% {
          text-shadow: 0 0 15px #FFD700, 0 0 30px #FFD700;
        }
      }

      /* CSS-based fireworks animation for New Year's */
      .fireworks-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        overflow: hidden;
      }

      .firework {
        position: absolute;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        box-shadow: 
          0 0 10px 2px #FFD700,
          0 0 20px 4px #FFD700,
          0 0 30px 6px #C0C0C0,
          0 0 40px 8px #4169E1;
        animation: firework-burst 2s ease-out infinite;
      }

      .firework:nth-child(1) {
        top: 20%;
        left: 25%;
        animation-delay: 0s;
      }

      .firework:nth-child(2) {
        top: 35%;
        left: 70%;
        animation-delay: 0.7s;
      }

      .firework:nth-child(3) {
        top: 15%;
        left: 50%;
        animation-delay: 1.4s;
      }

      @keyframes firework-burst {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        50% {
          transform: scale(20);
          opacity: 0.8;
        }
        100% {
          transform: scale(40);
          opacity: 0;
        }
      }

      /* Background holiday icons (floating/animated) */
      .holiday-icon {
        position: absolute;
        filter: drop-shadow(0 2px 4px var(--overlay-dark-medium));
        pointer-events: none;
        animation: holiday-float 4s ease-in-out infinite;
        z-index: -1;
      }

      @keyframes holiday-float {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
          opacity: 0.7;
        }
        50% {
          transform: translateY(-10px) rotate(5deg);
          opacity: 1;
        }
      }

      .holiday-foreground-cluster {
        position: absolute;
        bottom: 8px; /* 8px from bottom edge */
        left: 8px; /* 8px from left edge */
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        z-index: 1; /* Behind weather info cards but above background */
        gap: 0px;
        pointer-events: none; /* Don't block clicks */
      }
      .holiday-foreground-0 {
        font-size: 3.5em; /* Main/center icon - largest */
        order: 2; /* Center position */
        line-height: 1;
      }
      .holiday-foreground-1 {
        font-size: 2em; /* Left side icon */
        order: 1; /* Left position */
        margin-right: -0.8em; /* More overlap with center */
        line-height: 1;
      }
      .holiday-foreground-2 {
        font-size: 2em; /* Right side icon */
        order: 3; /* Right position */
        margin-left: -0.8em; /* More overlap with center */
        line-height: 1;
      }

      .holiday-icon.holiday-foreground {
        position: static;
        animation: none !important;
        transform: none !important;
        opacity: 1 !important;
        filter: drop-shadow(0 2px 4px var(--overlay-dark-medium));
        pointer-events: none;
      }

      /* Holiday string lights */
      .holiday-lights {
        position: absolute;
        top: 4px;
        left: 0;
        right: 0;
        height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0;
        pointer-events: none;
        z-index: 2;
      }

      /* Ensure lights stretch properly in night mode */
      ha-card.night-mode .holiday-lights {
        position: absolute !important;
        width: 100%;
      }

      /* Wire connecting all bulbs */
      .holiday-lights::before {
        content: '';
        position: absolute;
        top: 4px;
        left: 0;
        right: 0;
        height: 2px;
        background: rgba(0, 0, 0, 0.35);
        border-radius: 1px;
      }

      .light-bulb {
        position: relative;
        animation: light-glow 1.5s ease-in-out infinite;
        flex-shrink: 0;
      }

      /* Round bulbs (most holidays) */
      .light-round {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--bulb-color);
        box-shadow:
          0 0 8px var(--bulb-color),
          0 0 16px var(--bulb-color);
        margin-top: 8px;
      }

      .light-round::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 8px;
        background: rgba(50, 50, 50, 0.5);
      }

      /* Long Christmas-style bulbs */
      .light-long {
        width: 10px;
        height: 18px;
        border-radius: 4px 4px 40% 40%;
        background: linear-gradient(180deg,
          rgba(255, 255, 255, 0.4) 0%,
          var(--bulb-color) 50%,
          var(--bulb-color) 100%);
        box-shadow:
          0 0 10px var(--bulb-color),
          0 0 20px var(--bulb-color);
        margin-top: 8px;
      }

      .light-long::before {
        content: '';
        position: absolute;
        top: -6px;
        left: 50%;
        transform: translateX(-50%);
        width: 6px;
        height: 6px;
        background: rgba(80, 80, 80, 0.7);
        border-radius: 3px 3px 0 0;
      }

      .light-long::after {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 8px;
        background: rgba(50, 50, 50, 0.5);
      }

      @keyframes light-glow {
        0%, 100% {
          opacity: 0.8;
          filter: brightness(1);
        }
        50% {
          opacity: 1;
          filter: brightness(1.3);
        }
      }

      /* ========================================
         PRE-BUILT THEMES
         ======================================== */

      /* RETRO THEME - 1990s Weather Channel (WeatherStar 4000 inspired) */
      ha-card.theme-retro {
        background: linear-gradient(135deg, #001f3f 0%, #0074D9 50%, #FF851B 100%) !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: white !important;
      }

      ha-card.theme-retro .card-header {
        background: transparent !important;
        border-radius: 0 !important;
        border-bottom: none;
        color: white !important;
      }

      ha-card.theme-retro .graphical-header {
        background: linear-gradient(135deg, #001f3f 0%, #0074D9 50%, #FF851B 100%) !important;
        border-radius: 0 !important;
        border-bottom: none;
      }

      ha-card.theme-retro .graphical-header::after,
      ha-card.theme-retro .graphical-overlay {
        background: transparent !important;
      }

      ha-card.theme-retro .card-content {
        background: rgba(0, 31, 63, 0.3) !important;
      }

      ha-card.theme-retro .forecast-day,
      ha-card.theme-retro .forecast-hour {
        border: none !important;
        border-bottom: 1px solid var(--overlay-light-normal) !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: white !important;
      }

      ha-card.theme-retro .forecast-compact {
        background: rgba(0, 116, 217, 0.3) !important;
        border: none !important;
        border-radius: 0 !important;
      }

      ha-card.theme-retro .weather-info-item {
        background: rgba(0, 116, 217, 0.25) !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        color: white !important;
      }

      ha-card.theme-retro .weather-info-section {
        border-top: 1px solid var(--overlay-light-normal) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-retro .nws-alert {
        background: rgba(0, 31, 63, 0.5) !important;
        border: none !important;
        border-left: 3px solid !important;
        border-radius: 0 !important;
        color: white !important;
      }

      ha-card.theme-retro .day-name,
      ha-card.theme-retro .hour-name,
      ha-card.theme-retro .temp-high,
      ha-card.theme-retro .temp-low,
      ha-card.theme-retro .weather-info-label,
      ha-card.theme-retro .weather-info-value {
        color: white !important;
      }

      ha-card.theme-retro .temp-bar {
        background: var(--overlay-light-normal) !important;
      }

      /* RETRO THEME - Night Mode */
      ha-card.theme-retro.night-mode::before {
        opacity: 1 !important; /* Keep stars visible */
      }

      ha-card.theme-retro.night-mode .card-header {
        filter: brightness(0.7) !important; /* Less dimming than default */
        color: white !important;
      }

      ha-card.theme-retro.night-mode .card-header::after {
        display: none !important; /* No default night mode overlay */
      }

      ha-card.theme-retro.night-mode .card-content {
        background: rgba(0, 10, 30, 0.5) !important; /* Dim the bottom */
      }

      ha-card.theme-retro.night-mode .forecast-day,
      ha-card.theme-retro.night-mode .forecast-hour {
        border-bottom-color: var(--overlay-light-light) !important;
      }

      /* MIDNIGHT THEME - Sleek Modern Dark */
      ha-card.theme-midnight {
        background: var(--dark-bg) !important;
        border: 1px solid var(--dark-bg-alt) !important;
        border-radius: 12px !important;
        box-shadow:
          0 8px 32px rgba(0, 0, 0, 0.8),
          0 2px 8px rgba(0, 0, 0, 0.6) !important;
        color: var(--dark-text) !important;
      }

      ha-card.theme-midnight .card-header {
        background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%) !important;
        color: #d0d0d0 !important;
        border-bottom: 1px solid var(--dark-bg-alt);
        border-radius: 12px 12px 0 0 !important;
        box-shadow: 0 2px 8px var(--overlay-dark-strong);
      }

      ha-card.theme-midnight .graphical-header::after {
        background: linear-gradient(to bottom, var(--overlay-dark-strong), rgba(0,0,0,0.8)) !important;
      }

      ha-card.theme-midnight .card-content {
        background: var(--dark-bg) !important;
        color: var(--dark-text) !important;
      }

      ha-card.theme-midnight .forecast-day,
      ha-card.theme-midnight .forecast-hour {
        background: var(--dark-surface) !important;
        border: none !important;
        border-bottom: 1px solid var(--dark-bg-alt) !important;
        box-shadow: 0 2px 6px var(--overlay-dark-strong) !important;
        color: var(--dark-text) !important;
        padding: 12px 16px !important;
      }

      ha-card.theme-midnight .forecast-day:hover,
      ha-card.theme-midnight .forecast-hour:hover {
        background: #1d1d1d !important;
        box-shadow: 0 4px 12px var(--overlay-dark-very-strong) !important;
      }

      ha-card.theme-midnight .forecast-day.forecast-compact,
      ha-card.theme-midnight .forecast-hour.forecast-compact {
        background: var(--dark-surface) !important;
        border: 1px solid var(--dark-bg-alt) !important;
        border-radius: 10px !important;
        box-shadow: 0 4px 12px var(--overlay-dark-very-strong) !important;
        color: var(--dark-text) !important;
      }

      ha-card.theme-midnight .forecast-day.forecast-compact:hover,
      ha-card.theme-midnight .forecast-hour.forecast-compact:hover {
        background: #1d1d1d !important;
        border-color: #333333 !important;
        box-shadow:
          0 4px 12px var(--overlay-dark-very-strong),
          0 0 0 1px #333333 !important;
      }

      ha-card.theme-midnight .weather-info-item {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: var(--dark-text) !important;
      }

      ha-card.theme-midnight .weather-info-section {
        background: transparent !important;
        border-top: none !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-midnight .nws-alert {
        background: var(--dark-surface) !important;
        border: 1px solid var(--dark-bg-alt) !important;
        box-shadow: 0 4px 12px var(--overlay-dark-very-strong) !important;
      }

      /* MIDNIGHT THEME - Night Mode (Even Darker) */
      ha-card.theme-midnight.night-mode {
        background: #000000 !important;
        border-color: var(--dark-bg) !important;
      }

      ha-card.theme-midnight.night-mode .card-header {
        background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%) !important;
        color: #b0b0b0 !important;
      }

      ha-card.theme-midnight.night-mode .card-content {
        background: #000000 !important;
      }

      ha-card.theme-midnight.night-mode .forecast-day,
      ha-card.theme-midnight.night-mode .forecast-hour {
        background: #0a0a0a !important;
        border-bottom-color: var(--dark-bg) !important;
      }

      ha-card.theme-midnight.night-mode .forecast-day.forecast-compact,
      ha-card.theme-midnight.night-mode .forecast-hour.forecast-compact {
        background: #0a0a0a !important;
        border-color: var(--dark-bg) !important;
      }

      ha-card.theme-midnight.night-mode .weather-info-item {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      ha-card.theme-midnight.night-mode .weather-info-section {
        background: transparent !important;
        border-top: none !important;
      }

      /* MINIMAL THEME */
      ha-card.theme-minimal {
        background: #ffffff !important;
        border: 1px solid var(--light-border) !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .card-header {
        background: #f8f8f8 !important; /* Override gradient */
        color: #333 !important;
        border-bottom: 1px solid var(--light-border);
      }

      ha-card.theme-minimal .graphical-header::after {
        background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.7)) !important;
      }

      ha-card.theme-minimal .card-content {
        background: #ffffff !important;
      }

      ha-card.theme-minimal .forecast-day,
      ha-card.theme-minimal .forecast-hour {
        border: none !important;
        border-bottom: 1px solid #f0f0f0 !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .forecast-day.forecast-compact,
      ha-card.theme-minimal .forecast-hour.forecast-compact {
        background: #f8f8f8 !important;
        border: 1px solid var(--light-border) !important;
      }

      ha-card.theme-minimal .weather-info-item {
        border: none !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .weather-info-section {
        background: #ffffff !important;
        border-top: 1px solid var(--light-border) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-minimal .nws-alert {
        background: #f8f8f8 !important;
        border: 1px solid var(--light-border) !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .day-name,
      ha-card.theme-minimal .hour-name,
      ha-card.theme-minimal .temp-high,
      ha-card.theme-minimal .temp-low,
      ha-card.theme-minimal .weather-info-label,
      ha-card.theme-minimal .weather-info-value {
        color: #333 !important;
      }

      ha-card.theme-minimal .temp-bar {
        background: var(--light-border) !important;
      }

      ha-card.theme-minimal .weather-icon-svg {
        filter: grayscale(20%) !important;
      }

      /* MINIMAL THEME - Night Mode */
      ha-card.theme-minimal.night-mode {
        background: transparent !important; /* Transparent to show stars */
        border-color: rgba(232, 234, 246, 0.2) !important;
      }

      ha-card.theme-minimal.night-mode::before {
        opacity: 1 !important; /* Full stars visibility */
      }

      ha-card.theme-minimal.night-mode .card-header {
        background: rgba(20, 24, 35, 0.85) !important; /* Dark with transparency */
        filter: none !important;
        color: white !important;
        border-bottom-color: rgba(232, 234, 246, 0.15) !important;
      }

      ha-card.theme-minimal.night-mode .card-header::after {
        display: none !important;
      }

      ha-card.theme-minimal.night-mode .card-content {
        background: rgba(10, 14, 27, 0.7) !important; /* Dark semi-transparent */
        color: #e8eaf6 !important;
      }

      ha-card.theme-minimal.night-mode .forecast-day.forecast-compact,
      ha-card.theme-minimal.night-mode .forecast-hour.forecast-compact {
        background: rgba(29, 33, 56, 0.4) !important; /* More transparent - show stars */
        border-color: rgba(232, 234, 246, 0.1) !important;
      }

      ha-card.theme-minimal.night-mode .weather-info-section {
        background: transparent !important; /* Show stars */
        border-top-color: rgba(232, 234, 246, 0.15) !important;
      }

      ha-card.theme-minimal.night-mode .weather-info-item {
        background: transparent !important; /* Show stars */
      }

      ha-card.theme-minimal.night-mode .day-name,
      ha-card.theme-minimal.night-mode .hour-name,
      ha-card.theme-minimal.night-mode .temp-high,
      ha-card.theme-minimal.night-mode .temp-low,
      ha-card.theme-minimal.night-mode .weather-info-label,
      ha-card.theme-minimal.night-mode .weather-info-value {
        color: white !important; /* Bright white text */
      }

      ha-card.theme-minimal.night-mode .forecast-day,
      ha-card.theme-minimal.night-mode .forecast-hour {
        border-bottom-color: rgba(232, 234, 246, 0.1) !important;
        color: white !important;
      }

      /* VIBRANT THEME */
      ha-card.theme-vibrant {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border: none !important;
        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4) !important;
        color: white !important;
      }

      ha-card.theme-vibrant .card-header {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
        color: white !important;
        border-bottom: none;
      }

      ha-card.theme-vibrant .graphical-header::after {
        background: linear-gradient(to bottom, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.6)) !important;
      }

      ha-card.theme-vibrant .card-content {
        background: rgba(102, 126, 234, 0.2) !important;
      }

      ha-card.theme-vibrant .forecast-day,
      ha-card.theme-vibrant .forecast-hour {
        border: none !important;
        border-bottom: 1px solid var(--overlay-light-normal) !important;
        color: white !important;
      }

      ha-card.theme-vibrant .forecast-day.forecast-compact,
      ha-card.theme-vibrant .forecast-hour.forecast-compact {
        background: linear-gradient(135deg, var(--overlay-light-normal), var(--overlay-light-subtle)) !important;
        border: 1px solid var(--overlay-light-medium) !important;
      }

      ha-card.theme-vibrant .weather-info-item {
        border: none !important;
        color: white !important;
      }

      ha-card.theme-vibrant .weather-info-section {
        border-top: 1px solid var(--overlay-light-normal) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-vibrant .nws-alert {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), var(--overlay-light-light)) !important;
        border: 1px solid rgba(255, 255, 255, 0.4) !important;
        color: white !important;
      }

      ha-card.theme-vibrant .day-name,
      ha-card.theme-vibrant .hour-name,
      ha-card.theme-vibrant .temp-high,
      ha-card.theme-vibrant .temp-low,
      ha-card.theme-vibrant .weather-info-label,
      ha-card.theme-vibrant .weather-info-value {
        color: white !important;
      }

      ha-card.theme-vibrant .temp-bar {
        background: var(--overlay-light-normal) !important;
      }

      ha-card.theme-vibrant .weather-icon-svg {
        filter: brightness(1.2) saturate(1.3) !important;
      }

      /* VIBRANT THEME - Night Mode */
      ha-card.theme-vibrant.night-mode {
        background: linear-gradient(135deg, #2a3a6e 0%, #3a255e 100%) !important; /* Darker vibrant gradient */
        box-shadow: 0 10px 40px rgba(42, 58, 110, 0.6) !important;
      }

      ha-card.theme-vibrant.night-mode::before {
        opacity: 0.5 !important; /* Medium stars */
      }

      ha-card.theme-vibrant.night-mode .card-header {
        background: linear-gradient(135deg, #7a4ba2 0%, #a53a5c 100%) !important; /* Darker pink/purple */
        filter: none !important;
        color: white !important;
      }

      ha-card.theme-vibrant.night-mode .card-header::after {
        display: none !important;
      }

      ha-card.theme-vibrant.night-mode .card-content {
        background: rgba(42, 58, 110, 0.3) !important;
      }

      ha-card.theme-vibrant.night-mode .forecast-day.forecast-compact,
      ha-card.theme-vibrant.night-mode .forecast-hour.forecast-compact {
        background: rgba(122, 75, 162, 0.3) !important;
      }

      /* CUSTOM THEME - Uses CSS Variables */
      ha-card.theme-custom {
        --theme-primary: var(--custom-primary, #667eea);
        --theme-secondary: var(--custom-secondary, #764ba2);
        --theme-background: var(--custom-background, #ffffff);
        --theme-text: var(--custom-text, #333333);
        --theme-border: var(--custom-border, #e0e0e0);
        --theme-accent: var(--custom-accent, #f093fb);

        background: var(--theme-background) !important;
        border: 2px solid var(--theme-border) !important;
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .card-header {
        background: var(--theme-primary) !important;
        color: white !important;
      }

      ha-card.theme-custom .card-content {
        background: var(--theme-background) !important;
      }

      ha-card.theme-custom .forecast-day,
      ha-card.theme-custom .forecast-hour {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid var(--theme-border) !important;
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .forecast-compact {
        background: var(--theme-secondary) !important;
        border: 1px solid var(--theme-border) !important;
        color: white !important;
      }

      ha-card.theme-custom .weather-info-item {
        background: transparent !important;
        border: none !important;
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .weather-info-section {
        background: transparent !important;
        border-top: 1px solid var(--theme-border) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-custom .nws-alert {
        background: var(--theme-accent) !important;
        border: 1px solid var(--theme-border) !important;
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .day-name,
      ha-card.theme-custom .hour-name,
      ha-card.theme-custom .temp-high,
      ha-card.theme-custom .temp-low,
      ha-card.theme-custom .weather-info-label,
      ha-card.theme-custom .weather-info-value {
        color: var(--theme-text) !important;
      }

      ha-card.theme-custom .temp-bar {
        background: var(--theme-border) !important;
      }

      /* CUSTOM THEME - Night Mode */
      ha-card.theme-custom.night-mode {
        background: #1a1d2e !important; /* Dark background override */
        border-color: #2a2d3e !important;
      }

      ha-card.theme-custom.night-mode::before {
        opacity: 0.4 !important; /* Medium-faint stars */
      }

      ha-card.theme-custom.night-mode .card-header {
        filter: brightness(0.6) !important; /* Dim the custom header color */
        color: #e8eaf6 !important;
      }

      ha-card.theme-custom.night-mode .card-header::after {
        display: none !important;
      }

      ha-card.theme-custom.night-mode .card-content {
        background: #1a1d2e !important;
        color: #e8eaf6 !important;
      }

      ha-card.theme-custom.night-mode .day-name,
      ha-card.theme-custom.night-mode .hour-name,
      ha-card.theme-custom.night-mode .temp-high,
      ha-card.theme-custom.night-mode .temp-low,
      ha-card.theme-custom.night-mode .weather-info-label,
      ha-card.theme-custom.night-mode .weather-info-value {
        color: #e8eaf6 !important;
      }

      ha-card.theme-custom.night-mode .forecast-day,
      ha-card.theme-custom.night-mode .forecast-hour {
        border-bottom-color: #2a2d3e !important;
      }

      .card-content {
        padding: 20px;
      }
      
      .card-content-compact {
        padding: 20px 5px;
      }

      /* Make card-content transparent for compact view - show background through */
      .card-content-compact {
        background: transparent !important;
      }

      .forecast-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      /* Chart View Mode */
      .forecast-chart {
        padding: 16px 0;
      }

      .chart-labels {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        padding: 0 4px;
      }

      .chart-label {
        flex: 1;
        text-align: center;
        font-size: 14px;
        font-weight: 600;
      }

      .chart-wrapper {
        position: relative;
        height: 180px;
      }

      .chart-lines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
      }

      .chart-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 100%;
        position: relative;
        gap: 8px;
        z-index: 1;
      }

      .chart-column {
        flex: 1;
        position: relative;
        height: 100%;
      }

      .chart-point {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      .chart-point-high {
        background: rgba(255, 120, 80, 1);
        box-shadow: 0 0 4px rgba(255, 120, 80, 0.5);
      }

      .chart-point-low {
        background: #4A9EFF;
        box-shadow: 0 0 6px rgba(74, 158, 255, 0.6);
      }

      .chart-point-single {
        background: rgba(255, 150, 100, 1);
        box-shadow: 0 0 4px rgba(255, 150, 100, 0.5);
      }

      .chart-temp {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 700;
        font-size: 15px;
        white-space: nowrap;
      }

      .chart-temp-high {
        color: rgba(255, 120, 80, 1);
        transform: translateX(-50%) translateY(-26px);
      }

      .chart-temp-low {
        color: #4A9EFF;
        transform: translateX(-50%) translateY(26px);
      }

      .chart-temp-single {
        color: rgba(255, 150, 100, 1);
        margin-bottom: 18px;
      }

      /* Compact mode container - different for daily vs hourly */
      .forecast-container.forecast-compact.forecast-type-daily {
        display: flex !important;
        flex-direction: row !important;
        gap: 8px !important;
        justify-content: space-between !important;
        flex-wrap: wrap !important;
        background: transparent !important;
      }

      .forecast-container.forecast-compact.forecast-type-hourly {
        display: flex !important;
        flex-direction: row !important;
        gap: 2px !important;
        overflow-x: auto !important;
        flex-wrap: nowrap !important;
        padding-bottom: 8px;
        background: transparent !important;
      }

      .forecast-day {
        display: grid;
        grid-template-columns: 55px 45px 1fr auto;
        align-items: center;
        gap: 10px;
        padding: 5px 0;
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
      }

      .forecast-day:last-child {
        border-bottom: none;
      }

      .day-name {
        font-weight: 500;
        font-size: 16px;
      }

      .day-icon {
        font-size: 32px;
        text-align: center;
      }

      .day-temp-range {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .temp-low, .temp-high {
        min-width: 35px;
      }

      .temp-low {
        opacity: 0.7;
        text-align: right;
      }

      .temp-bar {
        flex: 1;
        height: 8px;
        background: var(--divider-color, var(--overlay-dark-subtle));
        display: flex;
        overflow: hidden;
      }

      .temp-bar-low {
        background: linear-gradient(90deg, #a8dadc 0%, #457b9d 100%);
      }

      .temp-bar-high {
        background: linear-gradient(90deg, #f1c40f 0%, #e67e22 100%);
      }

      .precip-prob {
        font-size: 14px;
        opacity: 0.7;
        min-width: 40px;
        text-align: right;
      }

      .no-forecast {
        text-align: center;
        padding: 20px;
        opacity: 0.7;
      }

      .no-forecast p {
        margin: 8px 0;
      }

      .no-forecast .helper {
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }

      /* Compact view mode - vertical cards in horizontal row */
      .forecast-type-daily .forecast-compact {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 16px 12px;
        border-radius: 4px;
        flex: 1;
        min-width: 0;
        border: none;
      }

      .forecast-type-daily .forecast-compact:hover {
        transform: translateY(-2px);
      }

      .forecast-type-hourly .forecast-compact {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 6px 4px;
        background: linear-gradient(180deg, #2E5F8A 0%, #4A7FA8 100%);
        border-radius: 4px;
        flex: 0 0 auto;
        width: 55px;
        border: 2px solid transparent;
      }

      .forecast-type-hourly .forecast-compact:hover {
        transform: translateY(-2px);
      }

      .forecast-compact .day-name {
        font-weight: 700;
        font-size: 15px;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .day-icon-small {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .day-icon-small .weather-icon-svg {
        width: 40px;
        height: 40px;
      }

      .day-icon-small .icon-emoji {
        font-size: 36px;
      }

      .compact-temps {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
        text-align: center;
      }

      .temp-high-compact {
        font-size: 32px;
        font-weight: 700;
        line-height: 1;
      }

      .temp-separator {
        display: none;
      }

      .temp-low-compact {
        font-size: 20px;
        font-weight: 500;
        opacity: 0.75;
        line-height: 1;
      }

      .precip-compact {
        font-size: 11px;
        opacity: 0.8;
        text-align: center;
        font-weight: 500;
      }

      /* Detailed view mode - individual forecast items */
      .forecast-day.forecast-detailed,
      .forecast-hour.forecast-detailed {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 16px;
        padding: 4px 0;
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
        align-items: center;
      }

      .detailed-name-icon {
        display: flex;
        align-items: center;
        gap: 24px;
      }

      .detailed-name-icon .day-icon {
        font-size: 80px;
      }

      .detailed-name-icon .day-icon .weather-icon-svg {
        width: 80px;
        height: 80px;
      }

      .detailed-name-icon .day-icon .icon-emoji {
        font-size: 80px;
      }

      .detailed-name-icon .day-name {
        font-size: 18px;
        font-weight: 600;
        white-space: nowrap;
        min-width: 50px;
      }

      .detailed-temps {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        justify-content: center;
      }

      .temp-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 20px;
        font-weight: 600;
        white-space: nowrap;
      }

      .temp-item .temp-icon {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
      }

      .detailed-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 14px;
        justify-content: center;
        align-items: flex-end;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 6px;
        justify-content: flex-end;
        min-width: 100px;
      }

      .detail-icon {
        font-size: 16px;
        width: 18px;
        text-align: center;
      }

      .detail-text {
        font-size: 14px;
        font-weight: 500;
        text-align: right;
        min-width: 70px;
      }

      .temp-actual {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: var(--primary-color);
        margin-left: 8px;
      }

      .actual-label {
        font-size: 14px;
        font-weight: 400;
        opacity: 0.75;
      }

      /* Hourly forecast styles */
      .forecast-hour {
        display: grid;
        grid-template-columns: 55px 45px auto auto;
        align-items: center;
        gap: 10px;
        padding: 5px 0;
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
      }

      .forecast-hour:last-child {
        border-bottom: none;
      }

      /* 2-column layout for hourly standard mode */
      .forecast-type-hourly.forecast-standard {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 16px;
      }

      .forecast-type-hourly.forecast-standard .forecast-hour {
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
        padding: 5px 0;
        background: transparent;
        border-radius: 0;
      }

      .forecast-type-hourly.forecast-standard .forecast-hour:last-child,
      .forecast-type-hourly.forecast-standard .forecast-hour:nth-last-child(2):nth-child(odd) {
        border-bottom: none;
      }

      .hour-name {
        font-weight: 500;
        font-size: 14px;
      }

      /* Hourly detailed mode */
      .forecast-hour.forecast-detailed {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 4px 0;
        border-bottom: 1px solid var(--divider-color, var(--overlay-dark-subtle));
      }

      .hour-info-row {
        display: grid;
        grid-template-columns: 55px 45px auto;
        align-items: center;
        gap: 10px;
      }

      .hour-temp-display {
        font-size: 18px;
        font-weight: 600;
      }

      .hour-details {
        display: flex;
        gap: 16px;
        font-size: 13px;
        opacity: 0.8;
        padding-left: 8px;
      }

      /* Compact mode hour name */
      .forecast-compact .hour-name {
        font-weight: 500;
        font-size: 12px;
        text-align: center;
      }

      .forecast-compact .hour-temp {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
      }
    `}};e([me({attribute:!1})],Fe.prototype,"hass",void 0),e([fe()],Fe.prototype,"config",void 0),e([fe()],Fe.prototype,"currentTime",void 0),e([fe()],Fe.prototype,"currentDate",void 0),e([fe()],Fe.prototype,"forecastData",void 0),e([fe()],Fe.prototype,"hourlyForecastData",void 0),e([fe()],Fe.prototype,"nwsAlerts",void 0),Fe=e([ce("weatherpulse-card")],Fe),window.customCards=window.customCards||[],window.customCards.push({type:"weatherpulse-card",name:"WeatherPulse Card",description:"A modern, highly configurable weather card for Home Assistant",preview:!0,documentationURL:"https://github.com/imCharlieB/WeatherPulse"}),console.info("%c WEATHERPULSE-CARD %c v0.1.0 ","color: white; background: #4facfe; font-weight: 700;","color: #4facfe; background: white; font-weight: 700;");export{Fe as WeatherPulseCard};
