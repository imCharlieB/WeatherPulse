function e(e,t,i,s){var a,r=arguments.length,o=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(o=(r<3?a(o):r>3?a(t,i,o):a(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,s)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:f}=Object,m=globalThis,u=m.trustedTypes,g=u?u.emptyScript:"",y=m.reactiveElementPolyfillSupport,x=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?g:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const r=s?.call(this);a?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),a=t.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const r=a.fromAttribute(t,e.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const s=this.constructor,a=this[e];if(i??=s.getPropertyOptions(e),!((i.hasChanged??w)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==a||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[x("elementProperties")]=new Map,_[x("finalized")]=new Map,y?.({ReactiveElement:_}),(m.reactiveElementVersions??=[]).push("2.1.1");const b=globalThis,C=b.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,A="?"+F,S=`<${A}>`,D=document,B=()=>D.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,T="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,O=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,R=/"/g,G=/^(?:script|style|textarea|title)$/i,N=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),L=N(1),W=N(2),j=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Y=new WeakMap,q=D.createTreeWalker(D,129);function X(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Q=(e,t)=>{const i=e.length-1,s=[];let a,r=2===t?"<svg>":3===t?"<math>":"",o=z;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===z?"!--"===l[1]?o=U:void 0!==l[1]?o=O:void 0!==l[2]?(G.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=H):void 0!==l[3]&&(o=H):o===H?">"===l[0]?(o=a??z,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?H:'"'===l[3]?R:I):o===R||o===I?o=H:o===U||o===O?o=z:(o=H,a=void 0);const p=o===H&&e[t+1].startsWith("/>")?" ":"";r+=o===z?i+S:c>=0?(s.push(n),i.slice(0,c)+k+i.slice(c)+F+p):i+F+(-2===c?t:p)}return[X(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,r=0;const o=e.length-1,n=this.parts,[l,c]=Q(e,t);if(this.el=Z.createElement(l,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=q.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(k)){const t=c[r++],i=s.getAttribute(e).split(F),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?ie:"?"===o[1]?se:"@"===o[1]?ae:te}),s.removeAttribute(e)}else e.startsWith(F)&&(n.push({type:6,index:a}),s.removeAttribute(e));if(G.test(s.tagName)){const e=s.textContent.split(F),t=e.length-1;if(t>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],B()),q.nextNode(),n.push({type:2,index:++a});s.append(e[t],B())}}}else if(8===s.nodeType)if(s.data===A)n.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf(F,e+1));)n.push({type:7,index:a}),e+=F.length-1}a++}}static createElement(e,t){const i=D.createElement("template");return i.innerHTML=e,i}}function J(e,t,i=e,s){if(t===j)return t;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=M(t)?void 0:t._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(e),a._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(t=J(e,a._$AS(e,t.values),a,s)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??D).importNode(t,!0);q.currentNode=s;let a=q.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new ee(a,a.nextSibling,this,e):1===n.type?t=new n.ctor(a,n.name,n.strings,this,e):6===n.type&&(t=new re(a,this,e)),this._$AV.push(t),n=i[++o]}r!==n?.index&&(a=q.nextNode(),r++)}return q.currentNode=D,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),M(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new K(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new Z(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new ee(this.O(B()),this.O(B()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,s){const a=this.strings;let r=!1;if(void 0===a)e=J(this,e,t,0),r=!M(e)||e!==this._$AH&&e!==j,r&&(this._$AH=e);else{const s=e;let o,n;for(e=a[0],o=0;o<a.length-1;o++)n=J(this,s[i+o],t,o),n===j&&(n=this._$AH[o]),r||=!M(n)||n!==this._$AH[o],n===V?e=V:e!==V&&(e+=(n??"")+a[o+1]),this._$AH[o]=n}r&&!s&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class ae extends te{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??V)===j)return;const i=this._$AH,s=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const oe=b.litHtmlPolyfillSupport;oe?.(Z,ee),(b.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;class le extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(void 0===a){const e=i?.renderBefore??null;s._$litPart$=a=new ee(t.insertBefore(B(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}le._$litElement$=!0,le.finalized=!0,ne.litElementHydrateSupport?.({LitElement:le});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:le}),(ne.litElementVersions??=[]).push("4.2.1");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:w},he=(e=pe,t,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,a,e)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];t.call(this,i),this.requestUpdate(s,a,e)}}throw Error("Unsupported decorator location: "+s)};function fe(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function me(e){return fe({...e,state:!0,attribute:!1})}function ue(e=new Date){return e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}function ge(e=new Date){return e.toLocaleDateString("en-US",{weekday:"long",month:"2-digit",day:"2-digit",year:"2-digit"})}function ye(){const e=(new Date).getMonth();return e>=2&&e<=4?"spring":e>=5&&e<=7?"summer":e>=8&&e<=10?"fall":"winter"}function xe(e){const t=e.toLowerCase(),i=function(){const e=(new Date).getHours();return e<6||e>=20}();return t.includes("clear")||t.includes("sunny")?i?"clear-night":"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?i?"partlycloudy-night":"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":i?"clear-night":"clear-day"}var ve,we;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ve||(ve={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(we||(we={}));var $e=function(e,t,i,s){s=s||{},i=null==i?{}:i;var a=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return a.detail=i,e.dispatchEvent(a),a};let _e=class extends le{setConfig(e){this._config=e}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configValue;let s=t.value;if("forecast_days"!==i&&"hourly_count"!==i||!s||(s=parseInt(s,10)),this._config[i]===s)return;const a={...this._config,[i]:""===s?void 0:s};$e(this,"config-changed",{config:a})}_toggleChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configValue,s=t.checked,a={...this._config,[i]:s};$e(this,"config-changed",{config:a})}render(){if(!this.hass||!this._config)return L``;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")),t=Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("temp")||e.includes("temperature")));return L`
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
            ${e.map(e=>L`
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
            ${t.map(e=>L`
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

          ${"greeting"===this._config.header_mode?L`
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

          ${"graphical"===this._config.header_mode?L`
            <p class="helper-text">
              The graphical header displays a seasonal background that automatically changes based on the current season (Spring, Summer, Fall, Winter). You can customize these images in YAML config using the <code>seasonal_images</code> option.
            </p>
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

          ${"hourly"===this._config.forecast_type?L`
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
          `:L`
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
    `}static get styles(){return o`
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
    `}};e([fe({attribute:!1})],_e.prototype,"hass",void 0),e([me()],_e.prototype,"_config",void 0),_e=e([de("weatherpulse-card-editor")],_e);var be=Object.freeze({__proto__:null,get WeatherPulseCardEditor(){return _e}});let Ce=class extends le{constructor(){super(...arguments),this.currentTime=ue(),this.currentDate=ge(),this.forecastData=[]}static async getConfigElement(){return await Promise.resolve().then(function(){return be}),document.createElement("weatherpulse-card-editor")}static getStubConfig(){return{type:"custom:weatherpulse-card",entity:"weather.home",header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation","wind"]}}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this.config={header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation"],show_forecast:!0,temp_display_mode:"forecast",...e}}connectedCallback(){super.connectedCallback(),this.startClock(),this.fetchForecast(),this.forecastUpdateInterval=window.setInterval(()=>this.fetchForecast(),18e5)}disconnectedCallback(){super.disconnectedCallback(),this.stopClock(),this.forecastUpdateInterval&&clearInterval(this.forecastUpdateInterval)}startClock(){this.updateTime(),this.timeInterval=window.setInterval(()=>this.updateTime(),1e3)}stopClock(){this.timeInterval&&clearInterval(this.timeInterval)}updateTime(){this.currentTime=ue(),this.currentDate=ge()}shouldUpdate(e){if(e.has("config"))return!0;if(e.has("hass")){const t=e.get("hass");return!t||t.states[this.config.entity]!==this.hass.states[this.config.entity]}return!0}async fetchForecast(){if(this.hass&&this.config?.entity)try{const e=this.config.forecast_type||"daily";this.hass.connection.subscribeMessage(e=>{e?.forecast&&(this.forecastData=e.forecast)},{type:"weather/subscribe_forecast",forecast_type:e,entity_id:this.config.entity})}catch(e){const t=this.hass.states[this.config.entity];t?.attributes?.forecast&&(this.forecastData=t.attributes.forecast)}}getWeatherData(){const e=this.hass.states[this.config.entity];if(!e)return{};let t=this.forecastData.length>0?this.forecastData:e.attributes.forecast||[];return{temperature:e.attributes.temperature,temperature_unit:e.attributes.temperature_unit||"°F",humidity:e.attributes.humidity,pressure:e.attributes.pressure,wind_speed:e.attributes.wind_speed,wind_bearing:e.attributes.wind_bearing,condition:e.state,forecast:t}}getCurrentTemp(){if(this.config.outdoor_temp_sensor){const e=this.hass.states[this.config.outdoor_temp_sensor];if(e)return parseFloat(e.state)}return this.getWeatherData().temperature||70}renderHeader(){const e=this.getWeatherData(),t=this.getCurrentTemp(),i=e.temperature,s=!!this.config.outdoor_temp_sensor,a=function(e,t="°F"){const i="°C"===t?9*e/5+32:e;return i<32?{color:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",backgroundColor:"#667eea",textColor:"#ffffff"}:i<50?{color:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",backgroundColor:"#4facfe",textColor:"#ffffff"}:i<70?{color:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",backgroundColor:"#43e97b",textColor:"#1a1a1a"}:i<85?{color:"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",backgroundColor:"#fa709a",textColor:"#1a1a1a"}:{color:"linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",backgroundColor:"#ff6b6b",textColor:"#ffffff"}}(t,e.temperature_unit),r=this.config.header_mode||"time-focused",o=this.config.temp_display_mode||"forecast",n=e.temperature_unit||"°F";let l,c="";switch(c="both"===o&&s&&i?L`
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
      `:"actual"===o&&s?L`
        <div class="temp-display">
          <div class="temp-main">${Math.round(t)}°${n.replace("°","")}</div>
          <div class="temp-label">Actual</div>
        </div>
      `:L`
        <div class="temp-display">
          <div class="temp-main">${Math.round(t)}°${n.replace("°","")}</div>
          <div class="temp-label">Forecast</div>
        </div>
      `,r){case"greeting":l=L`
          <div class="greeting-header">
            <div class="weather-icon ${xe(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="greeting-content">
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>
              <div class="greeting-text">
                ${function(e,t,i){const s=new Date,a=s.getHours(),r=s.toLocaleDateString("en-US",{weekday:"short"}),o=s.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"2-digit"}).replace(/\//g,"-"),n=e?`, ${e}`:"";let l="Hello";l=a<12?"Good Morning":a<17?"Good Afternoon":a<22?"Good Evening":"Good Night";let c="";if(t){const e=t.toLowerCase();e.includes("rain")?c="it's rainy, don't forget your umbrella":e.includes("snow")?c="it's snowy, bundle up":e.includes("clear")||e.includes("sunny")?c=i&&i>75?"it's sunny and warm":"it's a beautiful clear day":e.includes("cloud")?c="it's overcast but pleasant":e.includes("storm")&&(c="it's stormy, stay safe indoors")}return c?`${l}${n}, ${c}. ${r} ${o}`:`${l}${n}! ${r} ${o}`}(this.config.greeting_name,e.condition,t)}
              </div>
              ${c}
            </div>
          </div>
        `;break;case"graphical":const a=ye(),r=this.config.seasonal_images?.[a],d=function(e,t){if(t)return`url(${t})`;switch(e||ye()){case"spring":return"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%2387CEEB'/%3E%3Cstop offset='100%25' style='stop-color:%23B4E7F8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1200' height='800'/%3E%3Cellipse cx='600' cy='700' rx='800' ry='200' fill='%2390EE90'/%3E%3Cellipse cx='300' cy='720' rx='600' ry='150' fill='%2376D776'/%3E%3Cellipse cx='900' cy='720' rx='500' ry='130' fill='%2376D776'/%3E%3Ccircle cx='200' cy='150' r='35' fill='%23FFD700' opacity='0.9'/%3E%3Cg%3E%3Ccircle cx='150' cy='600' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='155' cy='595' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='145' cy='595' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='150' cy='590' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='160' cy='600' r='4' fill='%23FFB6C1'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='950' cy='580' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='955' cy='575' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='945' cy='575' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='950' cy='570' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='960' cy='580' r='4' fill='%23FFB6C1'/%3E%3C/g%3E%3Cg%3E%3Ccircle cx='500' cy='620' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='505' cy='615' r='4' fill='%23FFC0CB'/%3E%3Ccircle cx='495' cy='615' r='4' fill='%23FFB6C1'/%3E%3Ccircle cx='500' cy='610' r='4' fill='%23FFC0CB'/%3E%3C/g%3E%3C/svg%3E\")";case"summer":return"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%2300BFFF'/%3E%3Cstop offset='100%25' style='stop-color:%2387CEEB'/%3E%3C/linearGradient%3E%3ClinearGradient id='ocean' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%231E90FF'/%3E%3Cstop offset='100%25' style='stop-color:%2300CED1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1200' height='800'/%3E%3Ccircle cx='200' cy='120' r='45' fill='%23FFD700'/%3E%3Crect y='450' fill='url(%23ocean)' width='1200' height='350'/%3E%3Cellipse cx='600' cy='455' rx='800' ry='15' fill='%23FFF' opacity='0.6'/%3E%3Cellipse cx='300' cy='470' rx='600' ry='12' fill='%23FFF' opacity='0.5'/%3E%3Cellipse cx='900' cy='465' rx='500' ry='10' fill='%23FFF' opacity='0.5'/%3E%3Cellipse cx='600' cy='700' rx='800' ry='150' fill='%23F4A460'/%3E%3Cellipse cx='300' cy='720' rx='600' ry='120' fill='%23DEB887'/%3E%3Cellipse cx='900' cy='720' rx='500' ry='110' fill='%23D2B48C'/%3E%3Ccircle cx='850' cy='650' r='8' fill='%23FFF'/%3E%3Ccircle cx='870' cy='655' r='6' fill='%23FFF'/%3E%3Ccircle cx='890' cy='648' r='7' fill='%23FFF'/%3E%3C/svg%3E\")";case"fall":return"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%23FF8C42'/%3E%3Cstop offset='100%25' style='stop-color:%23FFB84D'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1200' height='800'/%3E%3Cellipse cx='600' cy='700' rx='800' ry='200' fill='%238B4513'/%3E%3Cellipse cx='300' cy='720' rx='600' ry='150' fill='%23A0522D'/%3E%3Cellipse cx='900' cy='720' rx='500' ry='130' fill='%23A0522D'/%3E%3Ccircle cx='250' cy='550' r='40' fill='%23D2691E'/%3E%3Crect x='245' y='590' width='10' height='120' fill='%238B4513'/%3E%3Ccircle cx='800' cy='520' r='50' fill='%23CD5C5C'/%3E%3Crect x='795' y='570' width='10' height='140' fill='%238B4513'/%3E%3Cg opacity='0.8'%3E%3Cellipse cx='150' cy='400' rx='8' ry='12' fill='%23FF6347' transform='rotate(45 150 400)'/%3E%3Cellipse cx='650' cy='420' rx='8' ry='12' fill='%23FF8C00' transform='rotate(-30 650 420)'/%3E%3Cellipse cx='950' cy='380' rx='8' ry='12' fill='%23DC143C' transform='rotate(20 950 380)'/%3E%3Cellipse cx='400' cy='350' rx='8' ry='12' fill='%23FF4500' transform='rotate(60 400 350)'/%3E%3Cellipse cx='500' cy='450' rx='8' ry='12' fill='%23FF6347' transform='rotate(-45 500 450)'/%3E%3C/g%3E%3C/svg%3E\")";case"winter":return"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' style='stop-color:%234A5F7F'/%3E%3Cstop offset='100%25' style='stop-color:%237B9CB5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1200' height='800'/%3E%3Cellipse cx='600' cy='700' rx='800' ry='200' fill='%23F0F8FF'/%3E%3Cellipse cx='300' cy='720' rx='600' ry='150' fill='%23E6F3FF'/%3E%3Cellipse cx='900' cy='720' rx='500' ry='130' fill='%23E6F3FF'/%3E%3Cpolygon points='200,620 180,680 220,680' fill='%23228B22'/%3E%3Cpolygon points='200,600 175,660 225,660' fill='%232E8B57'/%3E%3Cpolygon points='200,580 170,640 230,640' fill='%23228B22'/%3E%3Crect x='195' y='680' width='10' height='30' fill='%238B4513'/%3E%3Cpolygon points='850,600 830,660 870,660' fill='%23228B22'/%3E%3Cpolygon points='850,580 825,640 875,640' fill='%232E8B57'/%3E%3Cpolygon points='850,560 820,620 880,620' fill='%23228B22'/%3E%3Crect x='845' y='660' width='10' height='50' fill='%238B4513'/%3E%3Cg opacity='0.9'%3E%3Ccircle cx='150' cy='250' r='3' fill='%23FFF'/%3E%3Ccircle cx='450' cy='300' r='3' fill='%23FFF'/%3E%3Ccircle cx='750' cy='280' r='3' fill='%23FFF'/%3E%3Ccircle cx='950' cy='320' r='3' fill='%23FFF'/%3E%3Ccircle cx='300' cy='200' r='3' fill='%23FFF'/%3E%3Ccircle cx='600' cy='240' r='3' fill='%23FFF'/%3E%3Ccircle cx='900' cy='220' r='3' fill='%23FFF'/%3E%3C/g%3E%3C/svg%3E\")";default:return"linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"}}(a,r);l=L`
          <div class="graphical-header" style="background: ${d}; background-size: cover; background-position: center;">
            <div class="graphical-overlay">
              <div class="graphical-content">
                <div class="graphical-time">
                  ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
                </div>
                <div class="graphical-date">${this.currentDate}</div>
                <div class="graphical-weather">
                  <div class="weather-icon-graphical ${xe(e.condition||"clear")}">
                    ${this.renderWeatherIcon(e.condition||"clear")}
                  </div>
                  ${c}
                </div>
              </div>
            </div>
          </div>
        `;break;case"minimal":l=L`
          <div class="minimal-header">
            <div class="weather-icon ${xe(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            ${c}
          </div>
        `;break;case"date-focused":l=L`
          <div class="datetime-header">
            <div class="weather-icon ${xe(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="date-large">${this.currentDate}</div>
              ${this.config.show_time?L`<div class="time-small">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period-small">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>`:""}
              ${c}
            </div>
          </div>
        `;break;case"balanced":l=L`
          <div class="datetime-header balanced">
            <div class="weather-icon ${xe(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              ${this.config.show_time?L`<div class="time-medium">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period-medium">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>`:""}
              ${this.config.show_date?L`<div class="date-medium">${this.currentDate}</div>`:""}
              ${c}
            </div>
          </div>
        `;break;default:const p=(e.condition||"clear").split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ");l=L`
          <div class="datetime-header time-focused-header">
            <div class="weather-icon ${xe(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="condition-temp">${p}, ${Math.round(i||t)}°${n.replace("°","")}</div>
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>
              ${this.config.show_date?L`<div class="date-small">${this.currentDate}</div>`:""}
              ${"both"===o&&s||"actual"===o&&s?L`
                <div class="actual-temp-below">
                  <span class="actual-temp-value">${Math.round(t)}°${n.replace("°","")}</span>
                  <span class="actual-temp-label">Actual</span>
                </div>
              `:""}
            </div>
          </div>
        `}return"graphical"===r?l:L`
      <div class="card-header" style="background: ${a.color}; color: ${a.textColor};">
        ${l}
      </div>
    `}renderWeatherIcon(e,t=!1){const i=t?function(e){const t=e.toLowerCase();return t.includes("clear")||t.includes("sunny")?"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":"clear-day"}(e):xe(e);if(!1!==this.config.animate_icons)return function(e,t=!0){const i=t?"animated":"";switch(e){case"clear-day":case"sunny":return W`
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
      `;case"clear-night":return W`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="moonGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
            <radialGradient id="moonGradient">
              <stop offset="0%" style="stop-color:#FFF9C4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#F0E68C;stop-opacity:1" />
            </radialGradient>
          </defs>
          <style>
            .moon-glow {
              animation: ${t?"moonPulse 3s ease-in-out infinite":"none"};
              transform-origin: 50px 50px;
            }
            @keyframes moonPulse {
              0%, 100% {
                transform: scale(1);
                opacity: 0.5;
              }
              50% {
                transform: scale(1.2);
                opacity: 0.8;
              }
            }
            .moon-body {
              animation: ${t?"moonGlow 3s ease-in-out infinite":"none"};
              transform-origin: 50px 50px;
            }
            @keyframes moonGlow {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.03);
              }
            }
          </style>
          <!-- Glow effect circle -->
          <circle class="moon-glow" cx="50" cy="50" r="28" fill="#FFF9C4" opacity="0.4"/>
          <!-- Main moon body -->
          <circle class="moon-body" cx="50" cy="50" r="20" fill="url(#moonGradient)" filter="url(#moonGlow)"/>
          <!-- Moon crater details -->
          <circle cx="45" cy="45" r="3" fill="#F0E68C" opacity="0.3"/>
          <circle cx="58" cy="48" r="4" fill="#F0E68C" opacity="0.2"/>
          <circle cx="48" cy="56" r="2.5" fill="#F0E68C" opacity="0.25"/>
        </svg>
      `;case"partlycloudy-night":return W`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="moonGlowSmall">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>
          <style>
            .moon-glow-small {
              animation: ${t?"moonPulseSmall 3s ease-in-out infinite":"none"};
              transform-origin: 30px 30px;
            }
            @keyframes moonPulseSmall {
              0%, 100% {
                transform: scale(1);
                opacity: 0.4;
              }
              50% {
                transform: scale(1.15);
                opacity: 0.7;
              }
            }
            .moon-body-small {
              animation: ${t?"moonGlowSmall 3s ease-in-out infinite":"none"};
              transform-origin: 30px 30px;
            }
            @keyframes moonGlowSmall {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.03);
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
          <!-- Moon glow in background -->
          <circle class="moon-glow-small" cx="30" cy="30" r="16" fill="#FFF9C4" opacity="0.3"/>
          <!-- Moon body -->
          <g class="moon-body-small">
            <circle cx="30" cy="30" r="12" fill="#FFF9C4" filter="url(#moonGlowSmall)"/>
            <circle cx="28" cy="28" r="2" fill="#F0E68C" opacity="0.3"/>
            <circle cx="34" cy="32" r="1.5" fill="#F0E68C" opacity="0.2"/>
          </g>
          <!-- Cloud in foreground -->
          <g class="cloud">
            <ellipse cx="50" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <ellipse cx="65" cy="55" rx="22" ry="18" fill="#F0F0F0"/>
            <ellipse cx="80" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <rect x="32" y="60" width="66" height="18" rx="3" fill="#ECECEC"/>
          </g>
        </svg>
      `;case"cloudy":return W`
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
      `;case"partlycloudy":case"partly-cloudy-day":case"partly-cloudy-night":return W`
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
      `;case"rainy":case"pouring":case"rain":return W`
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
      `;case"snowy":case"snow":case"snowy-rainy":return W`
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
      `;case"lightning":case"thunderstorm":case"lightning-rainy":return W`
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
      `;case"fog":case"mist":case"foggy":return W`
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
      `;case"windy":case"wind":case"exceptional":return W`
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
      `;default:return W`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="#FDB813"/>
        </svg>
      `}}(i,!0);return L`<span class="icon-emoji">${{"clear-day":"☀️","clear-night":"🌙",cloudy:"☁️",rainy:"🌧️",snowy:"❄️",lightning:"⛈️",fog:"🌫️",windy:"💨"}[i]||"☀️"}</span>`}renderForecast(){const e=this.getWeatherData(),t=this.config.forecast_type||"daily",i="hourly"===t?this.config.hourly_count||12:this.config.forecast_days||5,s=e.forecast?.slice(0,i)||[],a=this.config.view_mode||"standard";if(0===s.length)return L`
        <div class="no-forecast">
          <p>No forecast data available</p>
          <p class="helper">Your weather integration may not provide forecast data, or you may need to use a weather service call to fetch it.</p>
        </div>
      `;return L`
      <div class="${`forecast-container forecast-${a} forecast-type-${t}`}">
        ${s.map(i=>"hourly"===t?this.renderForecastHour(i,e.temperature_unit||"°F",a):this.renderForecastDay(i,e.temperature_unit||"°F",a))}
      </div>
    `}renderForecastHour(e,t,i="standard"){const s=new Date(e.datetime).toLocaleTimeString("en-US",{hour:"numeric",hour12:!0}),a=Math.round(e.temperature||0),r=e.precipitation_probability||0,o=e.condition||"clear",n=e.humidity,l=e.wind_speed;return"compact"===i?L`
        <div class="forecast-hour forecast-compact">
          <div class="hour-name">${s}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(o,!0)}
          </div>
          <div class="hour-temp">${a}°</div>
          ${r>0?L`<div class="precip-compact">💧${r}%</div>`:""}
        </div>
      `:"detailed"===i?L`
        <div class="forecast-hour forecast-detailed">
          <div class="hour-info-row">
            <div class="hour-name">${s}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(o,!0)}
            </div>
            <div class="hour-temp-display">${a}°</div>
          </div>
          ${r>0||n||l?L`
            <div class="hour-details">
              ${r>0?L`<div class="detail-item"><span>💧</span> ${r}%</div>`:""}
              ${n?L`<div class="detail-item"><span>💨</span> ${n}%</div>`:""}
              ${l?L`<div class="detail-item"><span>🌬️</span> ${Math.round(l)} mph</div>`:""}
            </div>
          `:""}
        </div>
      `:L`
      <div class="forecast-hour">
        <div class="hour-name">${s}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(o,!0)}
        </div>
        <div class="hour-temp">${a}°</div>
        ${r>0?L`<div class="precip-prob">${r}%</div>`:""}
      </div>
    `}renderForecastDay(e,t,i="standard"){const s=(a=e.datetime,new Date(a).toLocaleDateString("en-US",{weekday:"short"}));var a;const r=Math.round(e.temperature||0),o=Math.round(e.templow||0),n=e.precipitation_probability||0,l=e.humidity,c=e.wind_speed,d=r-o>0?o/r*70:30;return"compact"===i?L`
        <div class="forecast-day forecast-compact">
          <div class="day-name">${s}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(e.condition||"clear",!0)}
          </div>
          <div class="compact-temps">
            <span class="temp-high-compact">${r}°</span>
            <span class="temp-low-compact">${o}°</span>
          </div>
          ${n>0?L`<div class="precip-compact">💧${n}%</div>`:""}
        </div>
      `:"detailed"===i?L`
        <div class="forecast-day forecast-detailed">
          <div class="day-info-row">
            <div class="day-name">${s}</div>
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
          </div>
          ${n>0||l||c?L`
            <div class="day-details">
              ${n>0?L`<div class="detail-item"><span>💧</span> ${n}%</div>`:""}
              ${l?L`<div class="detail-item"><span>💨</span> ${l}%</div>`:""}
              ${c?L`<div class="detail-item"><span>🌬️</span> ${Math.round(c)} mph</div>`:""}
            </div>
          `:""}
        </div>
      `:L`
      <div class="forecast-day">
        <div class="day-name">${s}</div>
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
        ${n>0?L`
          <div class="precip-prob">${n}%</div>
        `:""}
      </div>
    `}render(){if(!this.hass||!this.config)return L``;if(!this.hass.states[this.config.entity])return L`
        <ha-card>
          <div class="error">Entity ${this.config.entity} not found</div>
        </ha-card>
      `;const e=this.getWeatherData(),t=e.forecast&&e.forecast.length>0,i=!1!==this.config.show_forecast&&t;return L`
      <ha-card>
        ${this.renderHeader()}
        ${i?L`
          <div class="card-content">
            ${this.renderForecast()}
          </div>
        `:""}
      </ha-card>
    `}static get styles(){return o`
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
    `}};e([fe({attribute:!1})],Ce.prototype,"hass",void 0),e([me()],Ce.prototype,"config",void 0),e([me()],Ce.prototype,"currentTime",void 0),e([me()],Ce.prototype,"currentDate",void 0),e([me()],Ce.prototype,"forecastData",void 0),Ce=e([de("weatherpulse-card")],Ce),window.customCards=window.customCards||[],window.customCards.push({type:"weatherpulse-card",name:"WeatherPulse Card",description:"A modern, highly configurable weather card for Home Assistant",preview:!0,documentationURL:"https://github.com/imCharlieB/WeatherPulse"}),console.info("%c WEATHERPULSE-CARD %c v0.1.0 ","color: white; background: #4facfe; font-weight: 700;","color: #4facfe; background: white; font-weight: 700;");export{Ce as WeatherPulseCard};
