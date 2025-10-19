function e(e,t,i,a){var s,r=arguments.length,o=r<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,a);else for(var n=e.length-1;n>=0;n--)(s=e[n])&&(o=(r<3?s(o):r>3?s(t,i,o):s(t,i))||o);return r>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new r(i,e,a)},n=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,a))(t)})(e):e,{is:l,defineProperty:c,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,u=globalThis,f=u.trustedTypes,m=f?f.emptyScript:"",w=u.reactiveElementPolyfillSupport,x=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!l(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&c(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:s}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const r=a?.call(this);s?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,a)=>{if(i)e.adoptedStyleSheets=a.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of a){const a=document.createElement("style"),s=t.litNonce;void 0!==s&&a.setAttribute("nonce",s),a.textContent=i.cssText,e.appendChild(a)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=a;const r=s.fromAttribute(t,e.type);this[a]=r??this._$Ej?.get(a)??r,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const a=this.constructor,s=this[e];if(i??=a.getPropertyOptions(e),!((i.hasChanged??v)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==s||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[x("elementProperties")]=new Map,b[x("finalized")]=new Map,w?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.1");const _=globalThis,k=_.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,D=`<${E}>`,P=document,M=()=>P.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,F=Array.isArray,T="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,B=/-->/g,I=/>/g,W=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,H=/"/g,N=/^(?:script|style|textarea|title)$/i,j=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),L=j(1),R=j(2),V=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,q=P.createTreeWalker(P,129);function X(e,t){if(!F(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const Z=(e,t)=>{const i=e.length-1,a=[];let s,r=2===t?"<svg>":3===t?"<math>":"",o=U;for(let t=0;t<i;t++){const i=e[t];let n,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===U?"!--"===l[1]?o=B:void 0!==l[1]?o=I:void 0!==l[2]?(N.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=W):void 0!==l[3]&&(o=W):o===W?">"===l[0]?(o=s??U,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?W:'"'===l[3]?H:O):o===H||o===O?o=W:o===B||o===I?o=U:(o=W,s=void 0);const h=o===W&&e[t+1].startsWith("/>")?" ":"";r+=o===U?i+D:c>=0?(a.push(n),i.slice(0,c)+S+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[X(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class J{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,r=0;const o=e.length-1,n=this.parts,[l,c]=Z(e,t);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=q.nextNode())&&n.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(S)){const t=c[r++],i=a.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);n.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?ie:"?"===o[1]?ae:"@"===o[1]?se:te}),a.removeAttribute(e)}else e.startsWith(C)&&(n.push({type:6,index:s}),a.removeAttribute(e));if(N.test(a.tagName)){const e=a.textContent.split(C),t=e.length-1;if(t>0){a.textContent=k?k.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],M()),q.nextNode(),n.push({type:2,index:++s});a.append(e[t],M())}}}else if(8===a.nodeType)if(a.data===E)n.push({type:2,index:s});else{let e=-1;for(;-1!==(e=a.data.indexOf(C,e+1));)n.push({type:7,index:s}),e+=C.length-1}s++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,a){if(t===V)return t;let s=void 0!==a?i._$Co?.[a]:i._$Cl;const r=z(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(e),s._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=s:i._$Cl=s),void 0!==s&&(t=Q(e,s._$AS(e,t.values),s,a)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??P).importNode(t,!0);q.currentNode=a;let s=q.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let t;2===n.type?t=new ee(s,s.nextSibling,this,e):1===n.type?t=new n.ctor(s,n.name,n.strings,this,e):6===n.type&&(t=new re(s,this,e)),this._$AV.push(t),n=i[++o]}r!==n?.index&&(s=q.nextNode(),r++)}return q.currentNode=P,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),z(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>F(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new K(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new J(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new ee(this.O(M()),this.O(M()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,a){const s=this.strings;let r=!1;if(void 0===s)e=Q(this,e,t,0),r=!z(e)||e!==this._$AH&&e!==V,r&&(this._$AH=e);else{const a=e;let o,n;for(e=s[0],o=0;o<s.length-1;o++)n=Q(this,a[i+o],t,o),n===V&&(n=this._$AH[o]),r||=!z(n)||n!==this._$AH[o],n===G?e=G:e!==G&&(e+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!a&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ae extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class se extends te{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??G)===V)return;const i=this._$AH,a=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==G&&(i===G||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const oe=_.litHtmlPolyfillSupport;oe?.(J,ee),(_.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;class le extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const a=i?.renderBefore??t;let s=a._$litPart$;if(void 0===s){const e=i?.renderBefore??null;a._$litPart$=s=new ee(t.insertBefore(M(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}le._$litElement$=!0,le.finalized=!0,ne.litElementHydrateSupport?.({LitElement:le});const ce=ne.litElementPolyfillSupport;ce?.({LitElement:le}),(ne.litElementVersions??=[]).push("4.2.1");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},pe=(e=he,t,i)=>{const{kind:a,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,s,e)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const s=this[a];t.call(this,i),this.requestUpdate(a,s,e)}}throw Error("Unsupported decorator location: "+a)};function ge(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ue(e){return ge({...e,state:!0,attribute:!1})}function fe(e=new Date){return e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}function me(e=new Date){return e.toLocaleDateString("en-US",{weekday:"long",month:"2-digit",day:"2-digit",year:"2-digit"})}function we(){const e=(new Date).getMonth();return e>=2&&e<=4?"spring":e>=5&&e<=7?"summer":e>=8&&e<=10?"fall":"winter"}function xe(e){const t=e.toLowerCase(),i=function(){const e=(new Date).getHours();return e<6||e>=20}();return t.includes("clear")||t.includes("sunny")?i?"clear-night":"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?i?"partlycloudy-night":"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":i?"clear-night":"clear-day"}function ye(e,t=!0){const i=t?"animated":"";switch(e){case"clear-day":case"sunny":return R`
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
      `;case"clear-night":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="moonGradient" cx="40%" cy="40%">
              <stop offset="0%" style="stop-color:#FFFEF0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#F4E5C2;stop-opacity:1" />
            </radialGradient>
          </defs>
          <style>
            .crescent-moon {
              animation: ${t?"moonFloat 6s ease-in-out infinite":"none"};
              transform-origin: 50px 50px;
            }
            @keyframes moonFloat {
              0%, 100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-4px) rotate(-2deg);
              }
            }
          </style>
          <!-- Crescent moon shape -->
          <g class="crescent-moon">
            <!-- Full moon circle -->
            <circle cx="50" cy="50" r="22" fill="url(#moonGradient)"/>
            <!-- Dark circle to create crescent -->
            <circle cx="58" cy="48" r="20" fill="#1a1a2e"/>
          </g>
        </svg>
      `;case"partlycloudy-night":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="moonGradientSmall" cx="35%" cy="35%">
              <stop offset="0%" style="stop-color:#FFFEF0;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#F4E5C2;stop-opacity:1" />
            </radialGradient>
          </defs>
          <style>
            .crescent-moon-small {
              animation: ${t?"moonFloat 6s ease-in-out infinite":"none"};
              transform-origin: 28px 28px;
            }
            @keyframes moonFloat {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-3px);
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
          <!-- Crescent moon -->
          <g class="crescent-moon-small">
            <circle cx="28" cy="28" r="13" fill="url(#moonGradientSmall)"/>
            <circle cx="34" cy="26" r="12" fill="#1a1a2e"/>
          </g>
          <!-- Cloud in foreground -->
          <g class="cloud">
            <ellipse cx="50" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <ellipse cx="65" cy="55" rx="22" ry="18" fill="#F0F0F0"/>
            <ellipse cx="80" cy="60" rx="18" ry="14" fill="#E8E8E8"/>
            <rect x="32" y="60" width="66" height="18" rx="3" fill="#ECECEC"/>
          </g>
        </svg>
      `;case"cloudy":return R`
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
      `;case"partlycloudy":case"partly-cloudy-day":case"partly-cloudy-night":return R`
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
      `;case"rainy":case"pouring":case"rain":return R`
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
      `;case"snowy":case"snow":case"snowy-rainy":return R`
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
      `;case"lightning":case"thunderstorm":case"lightning-rainy":return R`
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
      `;case"fog":case"mist":case"foggy":return R`
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
      `;case"windy":case"wind":case"exceptional":return R`
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
      `;default:return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="#FDB813"/>
        </svg>
      `}}var ve,$e;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ve||(ve={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}($e||($e={}));var be=function(e,t,i,a){a=a||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===a.bubbles||a.bubbles,cancelable:Boolean(a.cancelable),composed:void 0===a.composed||a.composed});return s.detail=i,e.dispatchEvent(s),s};let _e=class extends le{setConfig(e){this._config=e}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configValue;let a=t.value;if("forecast_days"!==i&&"hourly_count"!==i||!a||(a=parseInt(a,10)),this._config[i]===a)return;const s={...this._config,[i]:""===a?void 0:a};be(this,"config-changed",{config:s})}_toggleChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configValue,a=t.checked,s={...this._config,[i]:a};be(this,"config-changed",{config:s})}_seasonalImageChanged(e,t){if(!this._config||!this.hass)return;const i=e.target.value,a="default"===i||""===i?void 0:i,s={...this._config,seasonal_images:{...this._config.seasonal_images||{},[t]:a}};be(this,"config-changed",{config:s})}_weatherInfoToggle(e,t){if(!this._config||!this.hass)return;const i=e.target.checked,a=this._config.show_weather_info||[];let s;s=i?a.includes(t)?a:[...a,t]:a.filter(e=>e!==t);const r={...this._config,show_weather_info:s.length>0?s:void 0};be(this,"config-changed",{config:r})}render(){if(!this.hass||!this._config)return L``;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")),t=Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("temp")||e.includes("temperature")));return L`
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

        <!-- Weather Information -->
        <div class="section">
          <h4>Weather Information Display</h4>
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

          ${this._config.show_nws_alerts?L`
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

        </div>

        <!-- Advanced Options -->
        <div class="section">
          <h4>Advanced Options</h4>
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
    `}};e([ge({attribute:!1})],_e.prototype,"hass",void 0),e([ue()],_e.prototype,"_config",void 0),_e=e([de("weatherpulse-card-editor")],_e);var ke=Object.freeze({__proto__:null,get WeatherPulseCardEditor(){return _e}});let Ae=class extends le{constructor(){super(...arguments),this.currentTime=fe(),this.currentDate=me(),this.forecastData=[],this.nwsAlerts=[],this.lastAlertFetch=0}static async getConfigElement(){return await Promise.resolve().then(function(){return ke}),document.createElement("weatherpulse-card-editor")}static getStubConfig(){return{type:"custom:weatherpulse-card",entity:"weather.home",header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation","wind"]}}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this.config={header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation"],show_forecast:!0,temp_display_mode:"forecast",...e}}connectedCallback(){super.connectedCallback(),this.startClock(),this.fetchForecast(),this.fetchNWSAlerts(),this.forecastUpdateInterval=window.setInterval(()=>this.fetchForecast(),18e5),this.alertUpdateInterval=window.setInterval(()=>this.fetchNWSAlerts(),3e5)}disconnectedCallback(){super.disconnectedCallback(),this.stopClock(),this.forecastUpdateInterval&&clearInterval(this.forecastUpdateInterval),this.alertUpdateInterval&&clearInterval(this.alertUpdateInterval)}startClock(){this.updateTime(),this.timeInterval=window.setInterval(()=>this.updateTime(),1e3)}stopClock(){this.timeInterval&&clearInterval(this.timeInterval)}updateTime(){this.currentTime=fe(),this.currentDate=me()}shouldUpdate(e){if(e.has("config"))return!0;if(e.has("hass")){const t=e.get("hass");return!t||t.states[this.config.entity]!==this.hass.states[this.config.entity]}return!0}async fetchForecast(){if(this.hass&&this.config?.entity)try{const e=this.config.forecast_type||"daily";this.hass.connection.subscribeMessage(e=>{e?.forecast&&(this.forecastData=e.forecast)},{type:"weather/subscribe_forecast",forecast_type:e,entity_id:this.config.entity})}catch(e){const t=this.hass.states[this.config.entity];t?.attributes?.forecast&&(this.forecastData=t.attributes.forecast)}}getWeatherData(){const e=this.hass.states[this.config.entity];if(!e)return{};let t=this.forecastData.length>0?this.forecastData:e.attributes.forecast||[];return{temperature:e.attributes.temperature,temperature_unit:e.attributes.temperature_unit||"°F",humidity:e.attributes.humidity,pressure:e.attributes.pressure,pressure_unit:e.attributes.pressure_unit,wind_speed:e.attributes.wind_speed,wind_speed_unit:e.attributes.wind_speed_unit,wind_bearing:e.attributes.wind_bearing,wind_gust_speed:e.attributes.wind_gust_speed,condition:e.state,forecast:t,apparent_temperature:e.attributes.apparent_temperature,uv_index:e.attributes.uv_index,visibility:e.attributes.visibility,visibility_unit:e.attributes.visibility_unit,precipitation:e.attributes.precipitation,precipitation_unit:e.attributes.precipitation_unit,cloud_coverage:e.attributes.cloud_coverage,dew_point:e.attributes.dew_point,ozone:e.attributes.ozone}}getCurrentTemp(){if(this.config.outdoor_temp_sensor){const e=this.hass.states[this.config.outdoor_temp_sensor];if(e)return parseFloat(e.state)}return this.getWeatherData().temperature||70}getSunEntity(){const e=this.config.sun_entity||"sun.sun";return this.hass.states[e]}getMoonEntity(){const e=this.config.moon_entity||"sensor.moon_phase";return this.hass.states[e]}isNightTime(){const e=this.getSunEntity();if(e)return"below_horizon"===e.state;const t=(new Date).getHours();return t>=20||t<6}getMoonPhase(){const e=this.getMoonEntity();return e?e.state:"unknown"}async fetchNWSAlerts(){if(!this.config?.show_nws_alerts||!this.hass)return;const e=Date.now();if(!(e-this.lastAlertFetch<3e5))try{let t;if(this.config?.nws_test_mode)t="https://api.weather.gov/alerts/active?status=actual&message_type=alert",console.log("NWS Test Mode: Fetching active US alerts for display testing");else{const e=this.hass.config.latitude;t=`https://api.weather.gov/alerts/active?point=${e},${this.hass.config.longitude}`}const i=await fetch(t);if(!i.ok)return void console.warn("Failed to fetch NWS alerts:",i.status);const a=await i.json(),s=[];if(a.features&&Array.isArray(a.features)){const e=this.config?.nws_test_mode?a.features.slice(0,2):a.features;for(const t of e){const e=t.properties;e&&s.push({id:e.id||"",event:e.event||"",headline:e.headline||"",description:e.description||"",instruction:e.instruction||"",severity:e.severity||"Unknown",urgency:e.urgency||"Unknown",certainty:e.certainty||"Unknown",onset:e.onset||"",expires:e.expires||"",areaDesc:e.areaDesc||""})}}this.nwsAlerts=s,this.lastAlertFetch=e,this.config?.nws_test_mode&&s.length>0&&console.log(`NWS Test Mode: Displaying ${s.length} sample alert(s)`,s)}catch(e){console.error("Failed to fetch NWS alerts:",e)}}renderNWSAlerts(){return this.config?.show_nws_alerts&&0!==this.nwsAlerts.length?L`
      <div class="nws-alerts-section">
        ${this.nwsAlerts.map(e=>{let t="alert-unknown",i="⚠️",a="";switch(e.severity){case"Extreme":t="alert-extreme",i="🔴";break;case"Severe":t="alert-severe",i="🟠";break;case"Moderate":t="alert-moderate",i="🟡";break;case"Minor":t="alert-minor",i="🔵"}return"Immediate"===e.urgency?a="IMMEDIATE":"Expected"===e.urgency&&(a="EXPECTED"),L`
            <div class="nws-alert ${t}">
              <div class="alert-header">
                <span class="alert-icon">${i}</span>
                <div class="alert-title">
                  <div class="alert-event">
                    ${e.event}
                    ${a?L`<span class="urgency-badge">${a}</span>`:""}
                  </div>
                  <div class="alert-area">${e.areaDesc}</div>
                </div>
              </div>
              <div class="alert-headline">${e.headline}</div>
              ${e.instruction?L`
                <div class="alert-instruction">
                  <strong>⚠️ What to do:</strong> ${e.instruction}
                </div>
              `:""}
              ${e.expires?L`
                <div class="alert-expires">
                  Expires: ${new Date(e.expires).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0})}
                </div>
              `:""}
            </div>
          `})}
      </div>
    `:L``}renderWeatherInfo(e){const t=this.config?.show_weather_info;if(!t||0===t.length)return L``;const i=this.getWeatherData(),a=e||this.config?.weather_info_layout||"standard",s=[];for(const e of t){let t="",r="",o="";switch(e){case"uv_index":void 0!==i.uv_index&&(t="☀️",r="UV Index",o=String(Math.round(i.uv_index)));break;case"wind":if(void 0!==i.wind_speed){t="💨",r="Wind";const e=i.wind_speed_unit||"mph";o=`${Math.round(i.wind_speed)} ${e}`,i.wind_gust_speed&&(o+=` (gusts ${Math.round(i.wind_gust_speed)} ${e})`)}break;case"feels_like":let e=i.apparent_temperature;if(void 0===e&&void 0!==i.temperature){const t=i.temperature,a=i.wind_speed||0;if(t<=50&&a>3)e=35.74+.6215*t-35.75*Math.pow(a,.16)+.4275*t*Math.pow(a,.16);else if(t>=80){const a=i.humidity||50;e=2.04901523*t-42.379+10.14333127*a-.22475541*t*a-.00683783*t*t-.05481717*a*a+.00122874*t*t*a+85282e-8*t*a*a-199e-8*t*t*a*a}else e=t}if(void 0!==e){t="🌡️",r="Feels Like";const a=i.temperature_unit?.replace("°","")||"F";o=`${Math.round(e)}°${a}`}break;case"precipitation":if(void 0!==i.precipitation&&i.precipitation>0){t="💧",r="Precipitation";const e=i.precipitation_unit||"in";o=`${i.precipitation} ${e}`}break;case"humidity":void 0!==i.humidity&&(t="💧",r="Humidity",o=`${Math.round(i.humidity)}%`);break;case"pressure":if(void 0!==i.pressure){t="🔽",r="Pressure";const e=i.pressure_unit||"hPa";o=`${Math.round(i.pressure)} ${e}`}break;case"visibility":if(void 0!==i.visibility){t="👁️",r="Visibility";const e=i.visibility_unit||"mi";o=`${i.visibility} ${e}`}break;case"sunrise_sunset":const a=this.getSunEntity();if(a&&a.attributes){const e="above_horizon"===a.state,i=e?a.attributes.next_setting:a.attributes.next_rising;if(i){t=e?"🌅":"🌄",r=e?"Sunset":"Sunrise",o=new Date(i).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}}}o&&("compact"===a?s.push(L`
            <div class="weather-info-item weather-info-compact">
              <div class="weather-info-value">${o}</div>
              <div class="weather-info-label-compact">${r.toUpperCase()}</div>
            </div>
          `):"detailed"===a?s.push(L`
            <div class="weather-info-item weather-info-detailed">
              <span class="weather-info-icon">${t}</span>
              <div class="weather-info-content">
                <div class="weather-info-label">${r}</div>
                <div class="weather-info-value">${o}</div>
              </div>
            </div>
          `):s.push(L`
            <div class="weather-info-item">
              <span class="weather-info-icon">${t}</span>
              <div class="weather-info-content">
                <div class="weather-info-label">${r}</div>
                <div class="weather-info-value">${o}</div>
              </div>
            </div>
          `))}if(0===s.length)return L``;return L`
      <div class="${`weather-info-section weather-info-layout-${a}`}">
        ${s}
      </div>
    `}renderHeader(){const e=this.getWeatherData(),t=this.getCurrentTemp(),i=e.temperature,a=!!this.config.outdoor_temp_sensor,s=function(e,t="°F"){const i="°C"===t?9*e/5+32:e;return i<32?{color:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",backgroundColor:"#667eea",textColor:"#ffffff"}:i<50?{color:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",backgroundColor:"#4facfe",textColor:"#ffffff"}:i<70?{color:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",backgroundColor:"#43e97b",textColor:"#1a1a1a"}:i<85?{color:"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",backgroundColor:"#fa709a",textColor:"#1a1a1a"}:{color:"linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",backgroundColor:"#ff6b6b",textColor:"#ffffff"}}(t,e.temperature_unit),r=this.config.header_mode||"time-focused",o=this.config.temp_display_mode||"forecast",n=e.temperature_unit||"°F";let l,c="";switch(c="both"===o&&a&&i?L`
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
      `:"actual"===o&&a?L`
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
                ${function(e,t,i){const a=new Date,s=a.getHours(),r=a.toLocaleDateString("en-US",{weekday:"short"}),o=a.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"2-digit"}).replace(/\//g,"-"),n=e?`, ${e}`:"";let l="Hello";l=s<12?"Good Morning":s<17?"Good Afternoon":s<22?"Good Evening":"Good Night";let c="";if(t){const e=t.toLowerCase();e.includes("rain")?c="it's rainy, don't forget your umbrella":e.includes("snow")?c="it's snowy, bundle up":e.includes("clear")||e.includes("sunny")?c=i&&i>75?"it's sunny and warm":"it's a beautiful clear day":e.includes("cloud")?c="it's overcast but pleasant":e.includes("storm")&&(c="it's stormy, stay safe indoors")}return c?`${l}${n}, ${c}. ${r} ${o}`:`${l}${n}! ${r} ${o}`}(this.config.greeting_name,e.condition,t)}
              </div>
              ${c}
            </div>
          </div>
        `;break;case"graphical":const s=we(),r=this.config.seasonal_images?.[s],d=function(e,t){if(t)return`url(${t})`;const i="/local/community/WeatherPulse/images";switch(e||we()){case"spring":default:return`url(${i}/spring-default.jpg)`;case"summer":return`url(${i}/summer-default.jpg)`;case"fall":return`url(${i}/fall-default.jpg)`;case"winter":return`url(${i}/winter-default.jpg)`}}(s,r);l=L`
          <div class="graphical-header" style="background: ${d}; background-size: cover; background-position: center;">
            <div class="graphical-overlay">
              <div class="graphical-content">
                <div class="graphical-main">
                  <div class="weather-icon-graphical ${xe(e.condition||"clear")}">
                    ${this.renderWeatherIcon(e.condition||"clear")}
                  </div>
                  <div class="graphical-right">
                    ${!1!==this.config.show_time?L`
                      <div class="graphical-time">
                        ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
                      </div>
                    `:""}
                    ${!1!==this.config.show_date?L`
                      <div class="graphical-date">${this.currentDate}</div>
                    `:""}
                    ${c}
                  </div>
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
        `;break;default:const h=(e.condition||"clear").split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ");l=L`
          <div class="datetime-header time-focused-header">
            <div class="weather-icon ${xe(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="condition-temp">${h}, ${Math.round(i||t)}°${n.replace("°","")}</div>
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>
              ${this.config.show_date?L`<div class="date-small">${this.currentDate}</div>`:""}
              ${"both"===o&&a||"actual"===o&&a?L`
                <div class="actual-temp-below">
                  <span class="actual-temp-value">${Math.round(t)}°${n.replace("°","")}</span>
                  <span class="actual-temp-label">Actual</span>
                </div>
              `:""}
            </div>
          </div>
        `}const d="compact"===(this.config?.weather_info_layout||"standard"),h=d?this.renderWeatherInfo("compact"):"";return"graphical"===r?L`
        ${l}
        ${d?L`
          <div class="weather-info-in-header">
            ${h}
          </div>
        `:""}
      `:L`
      <div class="card-header" style="background: ${s.color}; color: ${s.textColor};">
        ${l}
        ${d?L`
          <div class="weather-info-in-header">
            ${h}
          </div>
        `:""}
      </div>
    `}renderWeatherIcon(e,t=!1){const i=t?function(e){const t=e.toLowerCase();return t.includes("clear")||t.includes("sunny")?"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":"clear-day"}(e):xe(e),a=!1!==this.config.animate_icons;if(("clear-night"===i||"partlycloudy-night"===i)&&a&&!1!==this.config.show_moon_phase){const e=this.getMoonPhase();if(e&&"unknown"!==e)return"clear-night"===i?function(e,t=!0){const i=t?"animated":"",a=R`
    <defs>
      <radialGradient id="moonPhaseGradient" cx="40%" cy="40%">
        <stop offset="0%" style="stop-color:#FFFEF0;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#F4E5C2;stop-opacity:1" />
      </radialGradient>
    </defs>
  `,s=R`
    <style>
      .moon-shape {
        animation: ${t?"moonFloat 6s ease-in-out infinite":"none"};
        transform-origin: 50px 50px;
      }
      @keyframes moonFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-4px) rotate(-2deg); }
      }
    </style>
  `;switch(e.toLowerCase()){case"new_moon":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${s}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="#2a2a3e" stroke="#4a4a5e" stroke-width="2"/>
          </g>
        </svg>
      `;case"waxing_crescent":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${a}
          ${s}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <circle cx="46" cy="50" r="20" fill="#1a1a2e"/>
          </g>
        </svg>
      `;case"first_quarter":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${a}
          ${s}
          <g class="moon-shape">
            <path d="M 50 28 A 22 22 0 0 1 50 72 L 50 28 Z" fill="url(#moonPhaseGradient)"/>
            <circle cx="50" cy="50" r="22" fill="none" stroke="#4a4a5e" stroke-width="1"/>
          </g>
        </svg>
      `;case"waxing_gibbous":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${a}
          ${s}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <ellipse cx="40" cy="50" rx="8" ry="22" fill="#1a1a2e"/>
          </g>
        </svg>
      `;case"full_moon":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${a}
          ${s}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
          </g>
        </svg>
      `;case"waning_gibbous":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${a}
          ${s}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <ellipse cx="60" cy="50" rx="8" ry="22" fill="#1a1a2e"/>
          </g>
        </svg>
      `;case"last_quarter":case"third_quarter":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${a}
          ${s}
          <g class="moon-shape">
            <path d="M 50 28 A 22 22 0 0 0 50 72 L 50 28 Z" fill="url(#moonPhaseGradient)"/>
            <circle cx="50" cy="50" r="22" fill="none" stroke="#4a4a5e" stroke-width="1"/>
          </g>
        </svg>
      `;case"waning_crescent":return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${a}
          ${s}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <circle cx="54" cy="50" r="20" fill="#1a1a2e"/>
          </g>
        </svg>
      `;default:return R`
        <svg class="weather-icon-svg ${i}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${a}
          ${s}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <circle cx="58" cy="48" r="20" fill="#1a1a2e"/>
          </g>
        </svg>
      `}}(e,!0):ye(i,!0)}if(a)return ye(i,!0);return L`<span class="icon-emoji">${{"clear-day":"☀️","clear-night":"🌙",cloudy:"☁️",rainy:"🌧️",snowy:"❄️",lightning:"⛈️",fog:"🌫️",windy:"💨"}[i]||"☀️"}</span>`}renderForecast(){const e=this.getWeatherData(),t=this.config.forecast_type||"daily",i="hourly"===t?this.config.hourly_count||12:this.config.forecast_days||5,a=e.forecast?.slice(0,i)||[],s=this.config.view_mode||"standard";if(0===a.length)return L`
        <div class="no-forecast">
          <p>No forecast data available</p>
          <p class="helper">Your weather integration may not provide forecast data, or you may need to use a weather service call to fetch it.</p>
        </div>
      `;return L`
      <div class="${`forecast-container forecast-${s} forecast-type-${t}`}">
        ${a.map(i=>"hourly"===t?this.renderForecastHour(i,e.temperature_unit||"°F",s):this.renderForecastDay(i,e.temperature_unit||"°F",s))}
      </div>
    `}renderForecastHour(e,t,i="standard"){const a=new Date(e.datetime).toLocaleTimeString("en-US",{hour:"numeric",hour12:!0}),s=Math.round(e.temperature||0),r=e.precipitation_probability||0,o=e.condition||"clear",n=e.humidity,l=e.wind_speed;return"compact"===i?L`
        <div class="forecast-hour forecast-compact">
          <div class="hour-name">${a}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(o,!0)}
          </div>
          <div class="hour-temp">${s}°</div>
          ${r>0?L`<div class="precip-compact">💧${r}%</div>`:""}
        </div>
      `:"detailed"===i?L`
        <div class="forecast-hour forecast-detailed">
          <div class="hour-info-row">
            <div class="hour-name">${a}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(o,!0)}
            </div>
            <div class="hour-temp-display">${s}°</div>
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
        <div class="hour-name">${a}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(o,!0)}
        </div>
        <div class="hour-temp">${s}°</div>
        ${r>0?L`<div class="precip-prob">${r}%</div>`:""}
      </div>
    `}renderForecastDay(e,t,i="standard"){const a=(s=e.datetime,new Date(s).toLocaleDateString("en-US",{weekday:"short"}));var s;const r=Math.round(e.temperature||0),o=Math.round(e.templow||0),n=e.precipitation_probability||0,l=e.humidity,c=e.wind_speed,d=r-o>0?o/r*70:30;return"compact"===i?L`
        <div class="forecast-day forecast-compact">
          <div class="day-name">${a}</div>
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
            <div class="day-name">${a}</div>
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
        <div class="day-name">${a}</div>
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
      `;const e=this.getWeatherData(),t=e.forecast&&e.forecast.length>0,i=!1!==this.config.show_forecast&&t,a=this.config.night_mode&&this.isNightTime()?"night-mode":"",s="compact"===(this.config?.weather_info_layout||"standard"),r=this.nwsAlerts.some(e=>"Extreme"===e.severity||"Severe"===e.severity)?this.nwsAlerts.some(e=>"Extreme"===e.severity)?"alert-glow-extreme":"alert-glow-severe":"",o=this.getCurrentTemp();let n="";return o>=95?n="temp-glow-hot":o<=20&&(n="temp-glow-freezing"),L`
      <ha-card class="${a} ${r} ${n}">
        ${this.renderHeader()}
        ${this.renderNWSAlerts()}
        ${s?"":this.renderWeatherInfo()}
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
        position: relative;
      }

      /* Night Mode Styling */
      ha-card.night-mode {
        background: #0a0e27;
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
          radial-gradient(2px 2px at 20px 30px, white, transparent),
          radial-gradient(2px 2px at 60px 70px, white, transparent),
          radial-gradient(1px 1px at 50px 50px, white, transparent),
          radial-gradient(1px 1px at 130px 80px, white, transparent),
          radial-gradient(2px 2px at 90px 10px, white, transparent),
          radial-gradient(1px 1px at 200px 60px, white, transparent),
          radial-gradient(2px 2px at 170px 120px, white, transparent),
          radial-gradient(1px 1px at 220px 90px, white, transparent),
          radial-gradient(1px 1px at 30px 100px, white, transparent),
          radial-gradient(2px 2px at 270px 40px, white, transparent),
          radial-gradient(1px 1px at 150px 15px, white, transparent),
          radial-gradient(1px 1px at 100px 130px, white, transparent),
          radial-gradient(2px 2px at 240px 100px, white, transparent),
          radial-gradient(1px 1px at 190px 70px, white, transparent),
          radial-gradient(1px 1px at 80px 95px, white, transparent);
        background-repeat: repeat;
        background-size: 300px 150px;
        opacity: 0.6;
        pointer-events: none;
        z-index: 0;
        animation: starsFloat 120s linear infinite;
      }

      @keyframes starsFloat {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(-150px);
        }
      }

      ha-card.night-mode > * {
        position: relative;
        z-index: 1;
      }

      ha-card.night-mode .card-header {
        position: relative;
        color: #e8eaf6 !important;
        filter: brightness(0.4) contrast(1.1);
      }

      ha-card.night-mode .card-header::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(26, 31, 58, 0.7) 0%, rgba(45, 53, 97, 0.7) 100%);
        pointer-events: none;
        z-index: 0;
      }

      ha-card.night-mode .card-header > * {
        position: relative;
        z-index: 1;
      }

      ha-card.night-mode .graphical-overlay {
        background: linear-gradient(180deg, rgba(10,14,39,0.5) 0%, rgba(10,14,39,0.8) 100%);
      }

      ha-card.night-mode .card-content {
        background: rgba(10, 14, 39, 0.6);
        color: #e8eaf6;
      }

      ha-card.night-mode .forecast-day,
      ha-card.night-mode .forecast-hour {
        border-bottom-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .temp-bar {
        background: rgba(232, 234, 246, 0.15);
      }

      ha-card.night-mode .forecast-compact {
        background: rgba(29, 33, 56, 0.7) !important;
      }

      ha-card.night-mode .forecast-type-hourly.forecast-standard .forecast-hour {
        background: rgba(29, 33, 56, 0.7) !important;
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
        background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
        backdrop-filter: blur(2px);
      }

      .graphical-content {
        position: relative;
        z-index: 1;
        padding: 32px 32px 32px 16px;
        width: 100%;
        color: white;
        text-shadow: 0 2px 8px rgba(0,0,0,0.5);
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

      /* Weather Info Section */
      .weather-info-section {
        display: grid;
        gap: 12px;
        padding: 16px 20px;
        background: var(--card-background-color, rgba(0,0,0,0.02));
        border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
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
      }

      /* Compact item styling */
      .weather-info-compact {
        padding: 6px 8px;
        gap: 6px;
        justify-content: center;
      }

      .weather-info-compact .weather-info-icon {
        font-size: 18px;
        min-width: 18px;
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
        text-transform: uppercase;
        letter-spacing: 0.5px;
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
        background: rgba(10, 14, 39, 0.4);
        border-top-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .weather-info-item {
        background: rgba(29, 33, 56, 0.6);
      }

      /* Weather Info in Header (compact mode) */
      .weather-info-in-header {
        margin-top: 12px;
      }

      .weather-info-in-header .weather-info-section {
        background: transparent;
        border-top: none;
        padding: 0;
        gap: 0;
        grid-template-columns: repeat(auto-fit, minmax(50px, max-content));
        justify-content: space-evenly;
      }

      .weather-info-in-header .weather-info-item {
        background: transparent;
        padding: 0;
        border-radius: 0;
        gap: 2px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .weather-info-in-header .weather-info-value {
        font-size: 18px;
        font-weight: 500;
        line-height: 1;
      }

      .weather-info-in-header .weather-info-label-compact {
        font-size: 10px;
        font-weight: 400;
        opacity: 0.8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
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

      /* NWS Alerts Section */
      .nws-alerts-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px 20px;
        background: var(--card-background-color, rgba(0,0,0,0.02));
        border-top: 1px solid var(--divider-color, rgba(0,0,0,0.1));
      }

      .nws-alert {
        padding: 12px;
        border-radius: 8px;
        border-left: 4px solid;
        background: var(--secondary-background-color, rgba(0,0,0,0.05));
      }

      .nws-alert.alert-extreme {
        border-left-color: #d32f2f;
        background: rgba(211, 47, 47, 0.1);
      }

      .nws-alert.alert-severe {
        border-left-color: #f57c00;
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
        background: rgba(255, 255, 255, 0.3);
        color: #fff;
        letter-spacing: 0.5px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }

      .alert-area {
        font-size: 12px;
        opacity: 0.7;
        line-height: 1.2;
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
        background: rgba(0, 0, 0, 0.1);
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
        background: rgba(211, 47, 47, 0.2);
      }

      ha-card.night-mode .nws-alert.alert-severe {
        background: rgba(245, 124, 0, 0.2);
      }

      ha-card.night-mode .nws-alert.alert-moderate {
        background: rgba(251, 192, 45, 0.2);
      }

      ha-card.night-mode .nws-alert.alert-minor {
        background: rgba(25, 118, 210, 0.2);
      }

      /* Alert Glow Effects for Extreme/Severe */
      ha-card.alert-glow-extreme {
        box-shadow: 0 0 20px rgba(211, 47, 47, 0.6),
                    0 0 40px rgba(211, 47, 47, 0.4),
                    0 0 60px rgba(211, 47, 47, 0.2);
        animation: pulse-extreme 2s ease-in-out infinite;
      }

      ha-card.alert-glow-severe {
        box-shadow: 0 0 15px rgba(245, 124, 0, 0.5),
                    0 0 30px rgba(245, 124, 0, 0.3),
                    0 0 45px rgba(245, 124, 0, 0.2);
        animation: pulse-severe 2s ease-in-out infinite;
      }

      @keyframes pulse-extreme {
        0%, 100% {
          box-shadow: 0 0 20px rgba(211, 47, 47, 0.6),
                      0 0 40px rgba(211, 47, 47, 0.4),
                      0 0 60px rgba(211, 47, 47, 0.2);
        }
        50% {
          box-shadow: 0 0 25px rgba(211, 47, 47, 0.8),
                      0 0 50px rgba(211, 47, 47, 0.6),
                      0 0 75px rgba(211, 47, 47, 0.4);
        }
      }

      @keyframes pulse-severe {
        0%, 100% {
          box-shadow: 0 0 15px rgba(245, 124, 0, 0.5),
                      0 0 30px rgba(245, 124, 0, 0.3),
                      0 0 45px rgba(245, 124, 0, 0.2);
        }
        50% {
          box-shadow: 0 0 20px rgba(245, 124, 0, 0.7),
                      0 0 40px rgba(245, 124, 0, 0.5),
                      0 0 60px rgba(245, 124, 0, 0.3);
        }
      }

      /* Extreme Temperature Glow Effects */
      ha-card.temp-glow-hot {
        box-shadow: 0 0 20px rgba(230, 74, 25, 0.6),
                    0 0 40px rgba(230, 74, 25, 0.4),
                    0 0 60px rgba(230, 74, 25, 0.2);
        animation: pulse-hot 3s ease-in-out infinite;
      }

      ha-card.temp-glow-freezing {
        box-shadow: 0 0 20px rgba(79, 195, 247, 0.6),
                    0 0 40px rgba(79, 195, 247, 0.4),
                    0 0 60px rgba(79, 195, 247, 0.2);
        animation: pulse-freezing 3s ease-in-out infinite;
      }

      @keyframes pulse-hot {
        0%, 100% {
          box-shadow: 0 0 20px rgba(230, 74, 25, 0.6),
                      0 0 40px rgba(230, 74, 25, 0.4),
                      0 0 60px rgba(230, 74, 25, 0.2);
        }
        50% {
          box-shadow: 0 0 25px rgba(230, 74, 25, 0.8),
                      0 0 50px rgba(230, 74, 25, 0.6),
                      0 0 75px rgba(230, 74, 25, 0.4);
        }
      }

      @keyframes pulse-freezing {
        0%, 100% {
          box-shadow: 0 0 20px rgba(79, 195, 247, 0.6),
                      0 0 40px rgba(79, 195, 247, 0.4),
                      0 0 60px rgba(79, 195, 247, 0.2);
        }
        50% {
          box-shadow: 0 0 25px rgba(79, 195, 247, 0.8),
                      0 0 50px rgba(79, 195, 247, 0.6),
                      0 0 75px rgba(79, 195, 247, 0.4);
        }
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
    `}};e([ge({attribute:!1})],Ae.prototype,"hass",void 0),e([ue()],Ae.prototype,"config",void 0),e([ue()],Ae.prototype,"currentTime",void 0),e([ue()],Ae.prototype,"currentDate",void 0),e([ue()],Ae.prototype,"forecastData",void 0),e([ue()],Ae.prototype,"nwsAlerts",void 0),Ae=e([de("weatherpulse-card")],Ae),window.customCards=window.customCards||[],window.customCards.push({type:"weatherpulse-card",name:"WeatherPulse Card",description:"A modern, highly configurable weather card for Home Assistant",preview:!0,documentationURL:"https://github.com/imCharlieB/WeatherPulse"}),console.info("%c WEATHERPULSE-CARD %c v0.1.0 ","color: white; background: #4facfe; font-weight: 700;","color: #4facfe; background: white; font-weight: 700;");export{Ae as WeatherPulseCard};
