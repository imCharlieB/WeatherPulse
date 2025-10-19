function e(e,t,i,s){var a,o=arguments.length,r=o<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(r=(o<3?a(r):o>3?a(t,i,r):a(t,i))||r);return o>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new o(i,e,s)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,u=globalThis,f=u.trustedTypes,g=f?f.emptyScript:"",y=u.reactiveElementPolyfillSupport,v=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const o=s?.call(this);a?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=s;const o=a.fromAttribute(t,e.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const s=this.constructor,a=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??w)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==a||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[v("elementProperties")]=new Map,_[v("finalized")]=new Map,y?.({ReactiveElement:_}),(u.reactiveElementVersions??=[]).push("2.1.1");const b=globalThis,A=b.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+E,D=`<${S}>`,P=document,M=()=>P.createComment(""),F=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,z="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,O=/>/g,H=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,j=/"/g,R=/^(?:script|style|textarea|title)$/i,N=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),W=N(1),L=N(2),V=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),q=new WeakMap,G=P.createTreeWalker(P,129);function X(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,s=[];let a,o=2===t?"<svg>":3===t?"<math>":"",r=B;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===B?"!--"===l[1]?r=U:void 0!==l[1]?r=O:void 0!==l[2]?(R.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=H):void 0!==l[3]&&(r=H):r===H?">"===l[0]?(r=a??B,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?H:'"'===l[3]?j:I):r===j||r===I?r=H:r===U||r===O?r=B:(r=H,a=void 0);const h=r===H&&e[t+1].startsWith("/>")?" ":"";o+=r===B?i+D:c>=0?(s.push(n),i.slice(0,c)+C+i.slice(c)+E+h):i+E+(-2===c?t:h)}return[X(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Q{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,o=0;const r=e.length-1,n=this.parts,[l,c]=J(e,t);if(this.el=Q.createElement(l,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=G.nextNode())&&n.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=c[o++],i=s.getAttribute(e).split(E),r=/([.?@])?(.*)/.exec(t);n.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?ie:"?"===r[1]?se:"@"===r[1]?ae:te}),s.removeAttribute(e)}else e.startsWith(E)&&(n.push({type:6,index:a}),s.removeAttribute(e));if(R.test(s.tagName)){const e=s.textContent.split(E),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],M()),G.nextNode(),n.push({type:2,index:++a});s.append(e[t],M())}}}else if(8===s.nodeType)if(s.data===S)n.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf(E,e+1));)n.push({type:7,index:a}),e+=E.length-1}a++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,s){if(t===V)return t;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const o=F(t)?void 0:t._$litDirective$;return a?.constructor!==o&&(a?._$AO?.(!1),void 0===o?a=void 0:(a=new o(e),a._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(t=Z(e,a._$AS(e,t.values),a,s)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);G.currentNode=s;let a=G.nextNode(),o=0,r=0,n=i[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new ee(a,a.nextSibling,this,e):1===n.type?t=new n.ctor(a,n.name,n.strings,this,e):6===n.type&&(t=new oe(a,this,e)),this._$AV.push(t),n=i[++r]}o!==n?.index&&(a=G.nextNode(),o++)}return G.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),F(e)?e===Y||null==e||""===e?(this._$AH!==Y&&this._$AR(),this._$AH=Y):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Y&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Q.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new K(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Q(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new ee(this.O(M()),this.O(M()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(e,t=this,i,s){const a=this.strings;let o=!1;if(void 0===a)e=Z(this,e,t,0),o=!F(e)||e!==this._$AH&&e!==V,o&&(this._$AH=e);else{const s=e;let r,n;for(e=a[0],r=0;r<a.length-1;r++)n=Z(this,s[i+r],t,r),n===V&&(n=this._$AH[r]),o||=!F(n)||n!==this._$AH[r],n===Y?e=Y:e!==Y&&(e+=(n??"")+a[r+1]),this._$AH[r]=n}o&&!s&&this.j(e)}j(e){e===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Y?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Y)}}class ae extends te{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??Y)===V)return;const i=this._$AH,s=e===Y&&i!==Y||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==Y&&(i===Y||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const re=b.litHtmlPolyfillSupport;re?.(Q,ee),(b.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;class le extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(void 0===a){const e=i?.renderBefore??null;s._$litPart$=a=new ee(t.insertBefore(M(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}le._$litElement$=!0,le.finalized=!0,ne.litElementHydrateSupport?.({LitElement:le});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:le}),(ne.litElementVersions??=[]).push("4.2.1");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:w},pe=(e=he,t,i)=>{const{kind:s,metadata:a}=i;let o=globalThis.litPropertyMetadata.get(a);if(void 0===o&&globalThis.litPropertyMetadata.set(a,o=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,a,e)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];t.call(this,i),this.requestUpdate(s,a,e)}}throw Error("Unsupported decorator location: "+s)};function me(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return me({...e,state:!0,attribute:!1})}function fe(e=new Date){return e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}function ge(e=new Date){return e.toLocaleDateString("en-US",{weekday:"long",month:"2-digit",day:"2-digit",year:"2-digit"})}function ye(){const e=(new Date).getMonth();return e>=2&&e<=4?"spring":e>=5&&e<=7?"summer":e>=8&&e<=10?"fall":"winter"}function ve(e){const t=e.toLowerCase(),i=function(){const e=(new Date).getHours();return e<6||e>=20}();return t.includes("clear")||t.includes("sunny")?i?"clear-night":"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?i?"partlycloudy-night":"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":i?"clear-night":"clear-day"}var xe,we;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(xe||(xe={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(we||(we={}));var $e=function(e,t,i,s){s=s||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a};let _e=class extends le{setConfig(e){this._config=e}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configValue;let s=t.value;if("forecast_days"!==i&&"hourly_count"!==i||!s||(s=parseInt(s,10)),this._config[i]===s)return;const a={...this._config,[i]:""===s?void 0:s};$e(this,"config-changed",{config:a})}_toggleChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configValue,s=t.checked,a={...this._config,[i]:s};$e(this,"config-changed",{config:a})}_seasonalImageChanged(e,t){if(!this._config||!this.hass)return;const i=e.target.value,s="default"===i||""===i?void 0:i,a={...this._config,seasonal_images:{...this._config.seasonal_images||{},[t]:s}};$e(this,"config-changed",{config:a})}render(){if(!this.hass||!this._config)return W``;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")),t=Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("temp")||e.includes("temperature")));return W`
      <div class="card-config">
        <h3>WeatherPulse Card Configuration</h3>

        <!-- Required Settings -->
        <div class="section">
          <h4>Required Settings</h4>

          <ha-select
            label="Weather Entity (Required)"
            .configValue=${"entity"}
            .value=${this._config.entity||""}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            ${e.map(e=>W`
                <mwc-list-item .value=${e}>
                  ${e}
                </mwc-list-item>
              `)}
          </ha-select>
        </div>

        <!-- Temperature Settings -->
        <div class="section">
          <h4>Temperature Settings</h4>

          <ha-select
            label="Outdoor Temperature Sensor (Optional)"
            .configValue=${"outdoor_temp_sensor"}
            .value=${this._config.outdoor_temp_sensor||""}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${t.map(e=>W`
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
        </div>

        <!-- Header Settings -->
        <div class="section">
          <h4>Header Settings</h4>

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

          ${"greeting"===this._config.header_mode?W`
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

          ${"graphical"===this._config.header_mode?W`
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
                <mwc-list-item value="/hacsfiles/weatherpulse/images/spring-alt1.jpg">Alt 1 - More Tulips & Flowers</mwc-list-item>
                <mwc-list-item value="/hacsfiles/weatherpulse/images/spring-alt2.jpg">Alt 2 - Vibrant Spring Garden</mwc-list-item>
              </ha-select>

              <ha-select
                label="Summer Image (Jun-Aug)"
                .value=${this._config.seasonal_images?.summer||"default"}
                @selected=${e=>this._seasonalImageChanged(e,"summer")}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Tropical Beach Sunset</mwc-list-item>
                <mwc-list-item value="/hacsfiles/weatherpulse/images/summer-alt1.jpg">Alt 1 - Sunset Beach Painting</mwc-list-item>
              </ha-select>

              <ha-select
                label="Fall Image (Sep-Nov)"
                .value=${this._config.seasonal_images?.fall||"default"}
                @selected=${e=>this._seasonalImageChanged(e,"fall")}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Pumpkin & Maple Leaves</mwc-list-item>
                <mwc-list-item value="/hacsfiles/weatherpulse/images/fall-alt1.jpg">Alt 1 - Autumn Forest Scene</mwc-list-item>
              </ha-select>

              <ha-select
                label="Winter Image (Dec-Feb)"
                .value=${this._config.seasonal_images?.winter||"default"}
                @selected=${e=>this._seasonalImageChanged(e,"winter")}
                @closed=${e=>e.stopPropagation()}
              >
                <mwc-list-item value="default">Default - Snowy Winter Beach</mwc-list-item>
                <mwc-list-item value="/hacsfiles/weatherpulse/images/winter-alt1.jpg">Alt 1 - Snowy Palm Tree Beach</mwc-list-item>
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
        </div>

        <!-- Forecast Settings -->
        <div class="section">
          <h4>Forecast Settings</h4>

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

          ${"hourly"===this._config.forecast_type?W`
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
          `:W`
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
          </ha-select>
        </div>

        <!-- Display Options -->
        <div class="section">
          <h4>Display Options</h4>

          <ha-formfield label="Animate Icons">
            <ha-switch
              .configValue=${"animate_icons"}
              .checked=${!1!==this._config.animate_icons}
              @change=${this._toggleChanged}
            ></ha-switch>
          </ha-formfield>
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
    `}static get styles(){return r`
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
    `}};e([me({attribute:!1})],_e.prototype,"hass",void 0),e([ue()],_e.prototype,"_config",void 0),_e=e([de("weatherpulse-card-editor")],_e);var be=Object.freeze({__proto__:null,get WeatherPulseCardEditor(){return _e}});let Ae=class extends le{constructor(){super(...arguments),this.currentTime=fe(),this.currentDate=ge(),this.forecastData=[]}static async getConfigElement(){return await Promise.resolve().then(function(){return be}),document.createElement("weatherpulse-card-editor")}static getStubConfig(){return{type:"custom:weatherpulse-card",entity:"weather.home",header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation","wind"]}}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this.config={header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation"],show_forecast:!0,temp_display_mode:"forecast",...e}}connectedCallback(){super.connectedCallback(),this.startClock(),this.fetchForecast(),this.forecastUpdateInterval=window.setInterval(()=>this.fetchForecast(),18e5)}disconnectedCallback(){super.disconnectedCallback(),this.stopClock(),this.forecastUpdateInterval&&clearInterval(this.forecastUpdateInterval)}startClock(){this.updateTime(),this.timeInterval=window.setInterval(()=>this.updateTime(),1e3)}stopClock(){this.timeInterval&&clearInterval(this.timeInterval)}updateTime(){this.currentTime=fe(),this.currentDate=ge()}shouldUpdate(e){if(e.has("config"))return!0;if(e.has("hass")){const t=e.get("hass");return!t||t.states[this.config.entity]!==this.hass.states[this.config.entity]}return!0}async fetchForecast(){if(this.hass&&this.config?.entity)try{const e=this.config.forecast_type||"daily";this.hass.connection.subscribeMessage(e=>{e?.forecast&&(this.forecastData=e.forecast)},{type:"weather/subscribe_forecast",forecast_type:e,entity_id:this.config.entity})}catch(e){const t=this.hass.states[this.config.entity];t?.attributes?.forecast&&(this.forecastData=t.attributes.forecast)}}getWeatherData(){const e=this.hass.states[this.config.entity];if(!e)return{};let t=this.forecastData.length>0?this.forecastData:e.attributes.forecast||[];return{temperature:e.attributes.temperature,temperature_unit:e.attributes.temperature_unit||"°F",humidity:e.attributes.humidity,pressure:e.attributes.pressure,wind_speed:e.attributes.wind_speed,wind_bearing:e.attributes.wind_bearing,condition:e.state,forecast:t}}getCurrentTemp(){if(this.config.outdoor_temp_sensor){const e=this.hass.states[this.config.outdoor_temp_sensor];if(e)return parseFloat(e.state)}return this.getWeatherData().temperature||70}renderHeader(){const e=this.getWeatherData(),t=this.getCurrentTemp(),i=e.temperature,s=!!this.config.outdoor_temp_sensor,a=function(e,t="°F"){const i="°C"===t?9*e/5+32:e;return i<32?{color:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",backgroundColor:"#667eea",textColor:"#ffffff"}:i<50?{color:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",backgroundColor:"#4facfe",textColor:"#ffffff"}:i<70?{color:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",backgroundColor:"#43e97b",textColor:"#1a1a1a"}:i<85?{color:"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",backgroundColor:"#fa709a",textColor:"#1a1a1a"}:{color:"linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",backgroundColor:"#ff6b6b",textColor:"#ffffff"}}(t,e.temperature_unit),o=this.config.header_mode||"time-focused",r=this.config.temp_display_mode||"forecast",n=e.temperature_unit||"°F";let l,c="";switch(c="both"===r&&s&&i?W`
        <div class="temp-display-wrapper">
          <div class="temp-display">
            <div class="temp-main">${Math.round(t)}°${n.replace("°","")}</div>
            <div class="temp-label">Actual</div>
          </div>
          <div class="temp-display">
            <div class="temp-main">${Math.round(i)}°${n.replace("°","")}</div>
            <div class="temp-label">Forecast</div>
          </div>
        </div>
      `:"actual"===r&&s?W`
        <div class="temp-display">
          <div class="temp-main">${Math.round(t)}°${n.replace("°","")}</div>
          <div class="temp-label">Actual</div>
        </div>
      `:W`
        <div class="temp-display">
          <div class="temp-main">${Math.round(t)}°${n.replace("°","")}</div>
          <div class="temp-label">Forecast</div>
        </div>
      `,o){case"greeting":l=W`
          <div class="greeting-header">
            <div class="weather-icon ${ve(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="greeting-content">
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>
              <div class="greeting-text">
                ${function(e,t,i){const s=new Date,a=s.getHours(),o=s.toLocaleDateString("en-US",{weekday:"short"}),r=s.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"2-digit"}).replace(/\//g,"-"),n=e?`, ${e}`:"";let l="Hello";l=a<12?"Good Morning":a<17?"Good Afternoon":a<22?"Good Evening":"Good Night";let c="";if(t){const e=t.toLowerCase();e.includes("rain")?c="it's rainy, don't forget your umbrella":e.includes("snow")?c="it's snowy, bundle up":e.includes("clear")||e.includes("sunny")?c=i&&i>75?"it's sunny and warm":"it's a beautiful clear day":e.includes("cloud")?c="it's overcast but pleasant":e.includes("storm")&&(c="it's stormy, stay safe indoors")}return c?`${l}${n}, ${c}. ${o} ${r}`:`${l}${n}! ${o} ${r}`}(this.config.greeting_name,e.condition,t)}
              </div>
              ${c}
            </div>
          </div>
        `;break;case"graphical":const a=ye(),o=this.config.seasonal_images?.[a],d=function(e,t){if(t)return`url(${t})`;switch(e||ye()){case"spring":default:return"url(/hacsfiles/weatherpulse/images/spring-default.jpg)";case"summer":return"url(/hacsfiles/weatherpulse/images/summer-default.jpg)";case"fall":return"url(/hacsfiles/weatherpulse/images/fall-default.jpg)";case"winter":return"url(/hacsfiles/weatherpulse/images/winter-default.jpg)"}}(a,o);l=W`
          <div class="graphical-header" style="background: ${d}; background-size: cover; background-position: center;">
            <div class="graphical-overlay">
              <div class="graphical-content">
                <div class="graphical-time">
                  ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
                </div>
                <div class="graphical-date">${this.currentDate}</div>
                <div class="graphical-weather">
                  <div class="weather-icon-graphical ${ve(e.condition||"clear")}">
                    ${this.renderWeatherIcon(e.condition||"clear")}
                  </div>
                  ${c}
                </div>
              </div>
            </div>
          </div>
        `;break;case"minimal":l=W`
          <div class="minimal-header">
            <div class="weather-icon ${ve(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            ${c}
          </div>
        `;break;case"date-focused":l=W`
          <div class="datetime-header">
            <div class="weather-icon ${ve(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="date-large">${this.currentDate}</div>
              ${this.config.show_time?W`<div class="time-small">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period-small">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>`:""}
              ${c}
            </div>
          </div>
        `;break;case"balanced":l=W`
          <div class="datetime-header balanced">
            <div class="weather-icon ${ve(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              ${this.config.show_time?W`<div class="time-medium">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period-medium">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>`:""}
              ${this.config.show_date?W`<div class="date-medium">${this.currentDate}</div>`:""}
              ${c}
            </div>
          </div>
        `;break;default:const h=(e.condition||"clear").split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ");l=W`
          <div class="datetime-header time-focused-header">
            <div class="weather-icon ${ve(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="condition-temp">${h}, ${Math.round(i||t)}°${n.replace("°","")}</div>
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>
              ${this.config.show_date?W`<div class="date-small">${this.currentDate}</div>`:""}
              ${"both"===r&&s||"actual"===r&&s?W`
                <div class="actual-temp-below">
                  <span class="actual-temp-value">${Math.round(t)}°${n.replace("°","")}</span>
                  <span class="actual-temp-label">Actual</span>
                </div>
              `:""}
            </div>
          </div>
        `}return"graphical"===o?l:W`
      <div class="card-header" style="background: ${a.color}; color: ${a.textColor};">
        ${l}
      </div>
    `}renderWeatherIcon(e,t=!1){const i=t?function(e){const t=e.toLowerCase();return t.includes("clear")||t.includes("sunny")?"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":"clear-day"}(e):ve(e);if(!1!==this.config.animate_icons)return function(e,t=!0){const i=t?"animated":"";switch(e){case"clear-day":case"sunny":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .sun-rays {
              animation: ${t?"rotate 20s linear infinite":"none"};
              transform-origin: 50px 50px;
            }
            .sun-core {
              animation: ${t?"pulse 4s ease-in-out infinite":"none"};
              transform-origin: 50px 50px;
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.05); opacity: 0.9; }
            }
          </style>
          <!-- Sun rays -->
          <g class="sun-rays">
            <line x1="50" y1="10" x2="50" y2="20" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="50" y1="80" x2="50" y2="90" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="10" y1="50" x2="20" y2="50" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="80" y1="50" x2="90" y2="50" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="21" y1="21" x2="28" y2="28" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="72" y1="72" x2="79" y2="79" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="79" y1="21" x2="72" y2="28" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
            <line x1="28" y1="72" x2="21" y2="79" stroke="#FDB813" stroke-width="3" stroke-linecap="round"/>
          </g>
          <!-- Sun core -->
          <circle class="sun-core" cx="50" cy="50" r="20" fill="#FDB813"/>
        </svg>
      `;case"clear-night":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .moon-glow {
              animation: ${t?"moonPulse 4s ease-in-out infinite":"none"};
              transform-origin: 50px 50px;
            }
            @keyframes moonPulse {
              0%, 100% {
                opacity: 0.1;
              }
              50% {
                opacity: 0.2;
              }
            }
            .moon-body {
              animation: ${t?"moonGlowBody 4s ease-in-out infinite":"none"};
              transform-origin: 50px 50px;
            }
            @keyframes moonGlowBody {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.95;
              }
            }
          </style>
          <!-- Very subtle glow effect -->
          <circle class="moon-glow" cx="50" cy="50" r="26" fill="#FFF9C4" opacity="0.15"/>
          <!-- Main moon body -->
          <circle class="moon-body" cx="50" cy="50" r="20" fill="#FFF9C4"/>
          <!-- Moon crater details -->
          <circle cx="45" cy="45" r="3" fill="#F0E68C" opacity="0.3"/>
          <circle cx="58" cy="48" r="4" fill="#F0E68C" opacity="0.2"/>
          <circle cx="48" cy="56" r="2.5" fill="#F0E68C" opacity="0.25"/>
        </svg>
      `;case"partlycloudy-night":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .moon-glow-small {
              animation: ${t?"moonPulseSmall 4s ease-in-out infinite":"none"};
              transform-origin: 30px 30px;
            }
            @keyframes moonPulseSmall {
              0%, 100% {
                opacity: 0.1;
              }
              50% {
                opacity: 0.2;
              }
            }
            .cloud {
              animation: ${t?"float 6s ease-in-out infinite":"none"};
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
          </style>
          <!-- Very subtle moon glow -->
          <circle class="moon-glow-small" cx="30" cy="30" r="15" fill="#FFF9C4" opacity="0.15"/>
          <!-- Moon body -->
          <circle cx="30" cy="30" r="12" fill="#FFF9C4"/>
          <circle cx="28" cy="28" r="2" fill="#F0E68C" opacity="0.3"/>
          <circle cx="34" cy="32" r="1.5" fill="#F0E68C" opacity="0.2"/>
          <!-- Cloud in foreground -->
          <g class="cloud">
            <ellipse cx="50" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <ellipse cx="65" cy="55" rx="22" ry="18" fill="#F0F0F0"/>
            <ellipse cx="80" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <rect x="32" y="60" width="66" height="18" rx="3" fill="#ECECEC"/>
          </g>
        </svg>
      `;case"cloudy":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .cloud {
              animation: ${t?"float 6s ease-in-out infinite":"none"};
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
            }
          </style>
          <g class="cloud">
            <ellipse cx="35" cy="50" rx="18" ry="14" fill="#C8C8C8"/>
            <ellipse cx="50" cy="45" rx="22" ry="18" fill="#D8D8D8"/>
            <ellipse cx="65" cy="50" rx="18" ry="14" fill="#C8C8C8"/>
            <rect x="17" y="50" width="66" height="18" rx="3" fill="#D0D0D0"/>
          </g>
        </svg>
      `;case"partlycloudy":case"partly-cloudy-day":case"partly-cloudy-night":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .sun-group {
              animation: ${t?"rotate 20s linear infinite":"none"};
              transform-origin: 30px 30px;
            }
            .cloud {
              animation: ${t?"float 6s ease-in-out infinite":"none"};
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
          </style>
          <!-- Sun in background (entire sun group rotates together) -->
          <g class="sun-group">
            <line x1="30" y1="12" x2="30" y2="18" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="30" y1="42" x2="30" y2="48" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="12" y1="30" x2="18" y2="30" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="42" y1="30" x2="48" y2="30" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="17" y1="17" x2="21" y2="21" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="39" y1="39" x2="43" y2="43" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="43" y1="17" x2="39" y2="21" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <line x1="21" y1="39" x2="17" y2="43" stroke="#FDB813" stroke-width="2" stroke-linecap="round"/>
            <circle cx="30" cy="30" r="12" fill="#FDB813"/>
          </g>
          <!-- Cloud in foreground -->
          <g class="cloud">
            <ellipse cx="50" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <ellipse cx="65" cy="55" rx="22" ry="18" fill="#F0F0F0"/>
            <ellipse cx="80" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <rect x="32" y="60" width="66" height="18" rx="3" fill="#ECECEC"/>
          </g>
        </svg>
      `;case"rainy":case"pouring":case"rain":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .cloud {
              animation: ${t?"float 6s ease-in-out infinite":"none"};
            }
            .rain-drop {
              animation: ${t?"rain 0.8s linear infinite":"none"};
            }
            .rain-drop:nth-child(2) { animation-delay: 0.2s; }
            .rain-drop:nth-child(3) { animation-delay: 0.4s; }
            .rain-drop:nth-child(4) { animation-delay: 0.6s; }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes rain {
              0% { transform: translateY(0px); opacity: 1; }
              100% { transform: translateY(20px); opacity: 0; }
            }
          </style>
          <g class="cloud">
            <ellipse cx="35" cy="35" rx="12" ry="10" fill="#B0B0B0"/>
            <ellipse cx="50" cy="30" rx="15" ry="12" fill="#C0C0C0"/>
            <ellipse cx="65" cy="35" rx="12" ry="10" fill="#B0B0B0"/>
            <rect x="23" y="35" width="54" height="12" rx="2" fill="#B8B8B8"/>
          </g>
          <g opacity="0.8">
            <line class="rain-drop" x1="30" y1="55" x2="30" y2="70" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            <line class="rain-drop" x1="45" y1="55" x2="45" y2="70" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            <line class="rain-drop" x1="60" y1="55" x2="60" y2="70" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            <line class="rain-drop" x1="37" y1="60" x2="37" y2="75" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            <line class="rain-drop" x1="52" y1="60" x2="52" y2="75" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
          </g>
        </svg>
      `;case"snowy":case"snow":case"snowy-rainy":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .cloud {
              animation: ${t?"float 6s ease-in-out infinite":"none"};
            }
            .snowflake {
              animation: ${t?"snow 3s linear infinite":"none"};
            }
            .snowflake:nth-child(2) { animation-delay: 0.5s; }
            .snowflake:nth-child(3) { animation-delay: 1s; }
            .snowflake:nth-child(4) { animation-delay: 1.5s; }
            .snowflake:nth-child(5) { animation-delay: 2s; }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            @keyframes snow {
              0% { transform: translateY(0px) translateX(0px); opacity: 1; }
              100% { transform: translateY(25px) translateX(3px); opacity: 0; }
            }
          </style>
          <g class="cloud">
            <ellipse cx="35" cy="35" rx="12" ry="10" fill="#B8B8B8"/>
            <ellipse cx="50" cy="30" rx="15" ry="12" fill="#C8C8C8"/>
            <ellipse cx="65" cy="35" rx="12" ry="10" fill="#B8B8B8"/>
            <rect x="23" y="35" width="54" height="12" rx="2" fill="#C0C0C0"/>
          </g>
          <g fill="#E3F2FD" opacity="0.9">
            <circle class="snowflake" cx="30" cy="55" r="3"/>
            <circle class="snowflake" cx="45" cy="60" r="3"/>
            <circle class="snowflake" cx="60" cy="55" r="3"/>
            <circle class="snowflake" cx="37" cy="65" r="2.5"/>
            <circle class="snowflake" cx="52" cy="68" r="2.5"/>
          </g>
        </svg>
      `;case"lightning":case"thunderstorm":case"lightning-rainy":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .storm-cloud {
              animation: ${t?"shake 4s ease-in-out infinite":"none"};
            }
            .lightning {
              animation: ${t?"flash 2s ease-in-out infinite":"none"};
            }
            @keyframes shake {
              0%, 100% { transform: translateX(0px); }
              25% { transform: translateX(-2px); }
              75% { transform: translateX(2px); }
            }
            @keyframes flash {
              0%, 50%, 100% { opacity: 0; }
              55%, 65% { opacity: 1; }
            }
          </style>
          <g class="storm-cloud">
            <ellipse cx="35" cy="35" rx="14" ry="11" fill="#606060"/>
            <ellipse cx="50" cy="28" rx="17" ry="14" fill="#707070"/>
            <ellipse cx="65" cy="35" rx="14" ry="11" fill="#606060"/>
            <rect x="21" y="35" width="58" height="14" rx="2" fill="#686868"/>
          </g>
          <path class="lightning" d="M 50 50 L 42 65 L 48 65 L 43 80 L 55 62 L 50 62 Z"
                fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
        </svg>
      `;case"fog":case"mist":case"foggy":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .fog-line {
              animation: ${t?"drift 8s ease-in-out infinite":"none"};
            }
            .fog-line:nth-child(2) { animation-delay: 1s; }
            .fog-line:nth-child(3) { animation-delay: 2s; }
            .fog-line:nth-child(4) { animation-delay: 3s; }
            @keyframes drift {
              0%, 100% { transform: translateX(0px); opacity: 0.6; }
              50% { transform: translateX(5px); opacity: 0.3; }
            }
          </style>
          <g fill="none" stroke="#A0A0A0" stroke-width="4" stroke-linecap="round" opacity="0.7">
            <line class="fog-line" x1="20" y1="35" x2="80" y2="35"/>
            <line class="fog-line" x1="15" y1="50" x2="75" y2="50"/>
            <line class="fog-line" x1="25" y1="65" x2="85" y2="65"/>
            <line class="fog-line" x1="20" y1="80" x2="80" y2="80"/>
          </g>
        </svg>
      `;case"windy":case"wind":case"exceptional":return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .wind-line {
              animation: ${t?"wind 3s ease-in-out infinite":"none"};
            }
            .wind-line:nth-child(2) { animation-delay: 0.5s; }
            .wind-line:nth-child(3) { animation-delay: 1s; }
            @keyframes wind {
              0% { transform: translateX(-10px); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateX(10px); opacity: 0; }
            }
          </style>
          <g fill="none" stroke="#90CAF9" stroke-width="3" stroke-linecap="round">
            <path class="wind-line" d="M 15 30 Q 40 25 65 30 T 95 30"/>
            <path class="wind-line" d="M 10 50 Q 35 45 60 50 T 90 50"/>
            <path class="wind-line" d="M 15 70 Q 40 65 65 70 T 95 70"/>
          </g>
        </svg>
      `;default:return L`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="#FDB813"/>
        </svg>
      `}}(i,!0);return W`<span class="icon-emoji">${{"clear-day":"☀️","clear-night":"🌙",cloudy:"☁️",rainy:"🌧️",snowy:"❄️",lightning:"⛈️",fog:"🌫️",windy:"💨"}[i]||"☀️"}</span>`}renderForecast(){const e=this.getWeatherData(),t=this.config.forecast_type||"daily",i="hourly"===t?this.config.hourly_count||12:this.config.forecast_days||5,s=e.forecast?.slice(0,i)||[],a=this.config.view_mode||"standard";if(0===s.length)return W`
        <div class="no-forecast">
          <p>No forecast data available</p>
          <p class="helper">Your weather integration may not provide forecast data, or you may need to use a weather service call to fetch it.</p>
        </div>
      `;return W`
      <div class="${`forecast-container forecast-${a} forecast-type-${t}`}">
        ${s.map(i=>"hourly"===t?this.renderForecastHour(i,e.temperature_unit||"°F",a):this.renderForecastDay(i,e.temperature_unit||"°F",a))}
      </div>
    `}renderForecastHour(e,t,i="standard"){const s=new Date(e.datetime).toLocaleTimeString("en-US",{hour:"numeric",hour12:!0}),a=Math.round(e.temperature||0),o=e.precipitation_probability||0,r=e.condition||"clear",n=e.humidity,l=e.wind_speed;return"compact"===i?W`
        <div class="forecast-hour forecast-compact">
          <div class="hour-name">${s}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(r,!0)}
          </div>
          <div class="hour-temp">${a}°</div>
          ${o>0?W`<div class="precip-compact">💧${o}%</div>`:""}
        </div>
      `:"detailed"===i?W`
        <div class="forecast-hour forecast-detailed">
          <div class="hour-info-row">
            <div class="hour-name">${s}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(r,!0)}
            </div>
            <div class="hour-temp-display">${a}°</div>
          </div>
          ${o>0||n||l?W`
            <div class="hour-details">
              ${o>0?W`<div class="detail-item"><span>💧</span> ${o}%</div>`:""}
              ${n?W`<div class="detail-item"><span>💨</span> ${n}%</div>`:""}
              ${l?W`<div class="detail-item"><span>🌬️</span> ${Math.round(l)} mph</div>`:""}
            </div>
          `:""}
        </div>
      `:W`
      <div class="forecast-hour">
        <div class="hour-name">${s}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(r,!0)}
        </div>
        <div class="hour-temp">${a}°</div>
        ${o>0?W`<div class="precip-prob">${o}%</div>`:""}
      </div>
    `}renderForecastDay(e,t,i="standard"){const s=(a=e.datetime,new Date(a).toLocaleDateString("en-US",{weekday:"short"}));var a;const o=Math.round(e.temperature||0),r=Math.round(e.templow||0),n=e.precipitation_probability||0,l=e.humidity,c=e.wind_speed,d=o-r>0?r/o*70:30;return"compact"===i?W`
        <div class="forecast-day forecast-compact">
          <div class="day-name">${s}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(e.condition||"clear",!0)}
          </div>
          <div class="compact-temps">
            <span class="temp-high-compact">${o}°</span>
            <span class="temp-low-compact">${r}°</span>
          </div>
          ${n>0?W`<div class="precip-compact">💧${n}%</div>`:""}
        </div>
      `:"detailed"===i?W`
        <div class="forecast-day forecast-detailed">
          <div class="day-info-row">
            <div class="day-name">${s}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(e.condition||"clear",!0)}
            </div>
            <div class="day-temp-range">
              <span class="temp-low">${r}°</span>
              <div class="temp-bar">
                <div class="temp-bar-low" style="width: ${d}%"></div>
                <div class="temp-bar-high" style="width: ${70-d}%"></div>
              </div>
              <span class="temp-high">${o}°</span>
            </div>
          </div>
          ${n>0||l||c?W`
            <div class="day-details">
              ${n>0?W`<div class="detail-item"><span>💧</span> ${n}%</div>`:""}
              ${l?W`<div class="detail-item"><span>💨</span> ${l}%</div>`:""}
              ${c?W`<div class="detail-item"><span>🌬️</span> ${Math.round(c)} mph</div>`:""}
            </div>
          `:""}
        </div>
      `:W`
      <div class="forecast-day">
        <div class="day-name">${s}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(e.condition||"clear",!0)}
        </div>
        <div class="day-temp-range">
          <span class="temp-low">${r}°</span>
          <div class="temp-bar">
            <div class="temp-bar-low" style="width: ${d}%"></div>
            <div class="temp-bar-high" style="width: ${70-d}%"></div>
          </div>
          <span class="temp-high">${o}°</span>
        </div>
        ${n>0?W`
          <div class="precip-prob">${n}%</div>
        `:""}
      </div>
    `}render(){if(!this.hass||!this.config)return W``;if(!this.hass.states[this.config.entity])return W`
        <ha-card>
          <div class="error">Entity ${this.config.entity} not found</div>
        </ha-card>
      `;const e=this.getWeatherData(),t=e.forecast&&e.forecast.length>0,i=!1!==this.config.show_forecast&&t;return W`
      <ha-card>
        ${this.renderHeader()}
        ${i?W`
          <div class="card-content">
            ${this.renderForecast()}
          </div>
        `:""}
      </ha-card>
    `}static get styles(){return r`
      :host {
        display: block;
      }

      ha-card {
        overflow: hidden;
        border-radius: 12px;
      }

      .error {
        padding: 20px;
        color: var(--error-color, #ff0000);
        text-align: center;
      }

      .card-header {
        padding: 24px;
        border-radius: 12px 12px 0 0;
        transition: background 0.5s ease;
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
        align-items: flex-end;
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
        background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
        backdrop-filter: blur(2px);
      }

      .graphical-content {
        position: relative;
        z-index: 1;
        padding: 32px;
        width: 100%;
        color: white;
        text-shadow: 0 2px 8px rgba(0,0,0,0.5);
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
        margin-bottom: 16px;
      }

      .graphical-weather {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .weather-icon-graphical {
        font-size: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .weather-icon-graphical .weather-icon-svg {
        width: 100px;
        height: 100px;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
      }

      .weather-icon-graphical .icon-emoji {
        font-size: 100px;
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
        margin-bottom: 2px;
        position: relative;
      }

      .time-period {
        font-size: 16px;
        font-weight: 400;
        position: absolute;
        top: 4px;
        margin-left: 4px;
        opacity: 0.9;
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
        opacity: 0.9;
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
        font-size: 18px;
        font-weight: 400;
        opacity: 0.9;
        text-align: center;
      }

      .condition-temp {
        font-size: 20px;
        font-weight: 400;
        opacity: 0.95;
        margin-bottom: 2px;
        text-align: center;
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
        text-transform: uppercase;
        letter-spacing: 0.5px;
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
        text-transform: uppercase;
        letter-spacing: 0.5px;
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
        opacity: 0.9;
        margin-bottom: 4px;
        line-height: 1.2;
      }

      .card-content {
        padding: 20px;
      }

      .forecast-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      /* Compact mode container - different for daily vs hourly */
      .forecast-type-daily.forecast-compact,
      .forecast-container.forecast-compact.forecast-type-daily {
        display: flex !important;
        flex-direction: row !important;
        gap: 8px !important;
        justify-content: space-between !important;
        flex-wrap: wrap !important;
      }

      .forecast-type-hourly.forecast-compact,
      .forecast-container.forecast-compact.forecast-type-hourly {
        display: flex !important;
        flex-direction: row !important;
        gap: 8px !important;
        overflow-x: auto !important;
        flex-wrap: nowrap !important;
        padding-bottom: 8px;
      }

      .forecast-day {
        display: grid;
        grid-template-columns: 55px 45px 1fr auto;
        align-items: center;
        gap: 10px;
        padding: 5px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
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
        font-size: 16px;
        font-weight: 500;
        min-width: 35px;
      }

      .temp-low {
        opacity: 0.7;
        text-align: right;
      }

      .temp-bar {
        flex: 1;
        height: 8px;
        border-radius: 4px;
        background: var(--divider-color, rgba(0,0,0,0.1));
        display: flex;
        overflow: hidden;
      }

      .temp-bar-low {
        background: linear-gradient(90deg, #a8dadc 0%, #457b9d 100%);
        border-radius: 4px 0 0 4px;
      }

      .temp-bar-high {
        background: linear-gradient(90deg, #f1c40f 0%, #e67e22 100%);
        border-radius: 0 4px 4px 0;
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
        gap: 8px;
        padding: 12px 8px;
        background: var(--card-background-color, #1c1c1c);
        border-radius: 8px;
        flex: 1;
        min-width: 0;
      }

      .forecast-type-hourly .forecast-compact {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 12px 8px;
        background: var(--card-background-color, #1c1c1c);
        border-radius: 8px;
        flex: 0 0 auto;
        width: 70px;
      }

      .forecast-compact .day-name {
        font-weight: 500;
        font-size: 14px;
        text-align: center;
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
        gap: 4px;
        align-items: center;
        text-align: center;
      }

      .temp-high-compact {
        font-size: 18px;
        font-weight: 600;
      }

      .temp-separator {
        display: none;
      }

      .temp-low-compact {
        font-size: 14px;
        opacity: 0.7;
      }

      .precip-compact {
        font-size: 12px;
        opacity: 0.7;
        text-align: center;
      }

      /* Detailed view mode */
      .forecast-detailed {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      .day-info-row {
        display: grid;
        grid-template-columns: 55px 45px 1fr auto;
        align-items: center;
        gap: 10px;
      }

      .day-details {
        display: flex;
        gap: 16px;
        font-size: 13px;
        opacity: 0.8;
        padding-left: 8px;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .detail-item span {
        font-size: 14px;
      }

      .temp-actual {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 16px;
        font-weight: 500;
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
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      .forecast-hour:last-child {
        border-bottom: none;
      }

      /* 2-column layout for hourly standard mode */
      .forecast-type-hourly.forecast-standard {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px 16px;
      }

      .forecast-type-hourly.forecast-standard .forecast-hour {
        border-bottom: none;
        padding: 8px;
        background: var(--card-background-color, rgba(0,0,0,0.05));
        border-radius: 8px;
      }

      .hour-name {
        font-weight: 500;
        font-size: 14px;
      }

      .hour-temp {
        font-size: 16px;
        font-weight: 500;
      }

      /* Hourly detailed mode */
      .forecast-hour.forecast-detailed {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.1));
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
    `}};e([me({attribute:!1})],Ae.prototype,"hass",void 0),e([ue()],Ae.prototype,"config",void 0),e([ue()],Ae.prototype,"currentTime",void 0),e([ue()],Ae.prototype,"currentDate",void 0),e([ue()],Ae.prototype,"forecastData",void 0),Ae=e([de("weatherpulse-card")],Ae),window.customCards=window.customCards||[],window.customCards.push({type:"weatherpulse-card",name:"WeatherPulse Card",description:"A modern, highly configurable weather card for Home Assistant",preview:!0,documentationURL:"https://github.com/imCharlieB/WeatherPulse"}),console.info("%c WEATHERPULSE-CARD %c v0.1.0 ","color: white; background: #4facfe; font-weight: 700;","color: #4facfe; background: white; font-weight: 700;");export{Ae as WeatherPulseCard};
