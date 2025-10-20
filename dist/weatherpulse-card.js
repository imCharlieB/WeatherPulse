function e(e,t,a,i){var r,o=arguments.length,s=o<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,a):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,a,i);else for(var n=e.length-1;n>=0;n--)(r=e[n])&&(s=(o<3?r(s):o>3?r(t,a,s):r(t,a))||s);return o>3&&s&&Object.defineProperty(t,a,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,a=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let o=class{constructor(e,t,a){if(this._$cssResult$=!0,a!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(a&&void 0===e){const a=void 0!==t&&1===t.length;a&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&r.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const a=1===e.length?e[0]:t.reduce((t,a,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[i+1],e[0]);return new o(a,e,i)},n=a?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const a of e.cssRules)t+=a.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,g=globalThis,u=g.trustedTypes,f=u?u.emptyScript:"",w=g.reactiveElementPolyfillSupport,x=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let a=e;switch(t){case Boolean:a=null!==e;break;case Number:a=null===e?null:Number(e);break;case Object:case Array:try{a=JSON.parse(e)}catch(e){a=null}}return a}},b=(e,t)=>!c(e,t),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const a=Symbol(),i=this.getPropertyDescriptor(e,a,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,a){const{get:i,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const o=i?.call(this);r?.call(this,t),this.requestUpdate(e,o,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??v}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const a of t)this.createProperty(a,e[a])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,a]of t)this.elementProperties.set(e,a)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const a=this._$Eu(e,t);void 0!==a&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const a=new Set(e.flat(1/0).reverse());for(const e of a)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Eu(e,t){const a=t.attribute;return!1===a?void 0:"string"==typeof a?a:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const a of t.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(a)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const a of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=a.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,a){this._$AK(e,a)}_$ET(e,t){const a=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,a);if(void 0!==i&&!0===a.reflect){const r=(void 0!==a.converter?.toAttribute?a.converter:y).toAttribute(t,a.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const a=this.constructor,i=a._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=a.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=i;const o=r.fromAttribute(t,e.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(e,t,a){if(void 0!==e){const i=this.constructor,r=this[e];if(a??=i.getPropertyOptions(e),!((a.hasChanged??b)(r,t)||a.useDefault&&a.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,a))))return;this.C(e,t,a)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:a,reflect:i,wrapped:r},o){a&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||a||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,a]of e){const{wrapped:e}=a,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,a,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[x("elementProperties")]=new Map,$[x("finalized")]=new Map,w?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.1");const _=globalThis,k=_.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,A="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,D=`<${E}>`,M=document,T=()=>M.createComment(""),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,z=Array.isArray,F="[ \t\n\f\r]",B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,U=/>/g,H=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,W=/"/g,O=/^(?:script|style|textarea|title)$/i,L=e=>(t,...a)=>({_$litType$:e,strings:t,values:a}),j=L(1),R=L(2),V=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),Y=new WeakMap,q=M.createTreeWalker(M,129);function X(e,t){if(!z(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const K=(e,t)=>{const a=e.length-1,i=[];let r,o=2===t?"<svg>":3===t?"<math>":"",s=B;for(let t=0;t<a;t++){const a=e[t];let n,c,l=-1,d=0;for(;d<a.length&&(s.lastIndex=d,c=s.exec(a),null!==c);)d=s.lastIndex,s===B?"!--"===c[1]?s=I:void 0!==c[1]?s=U:void 0!==c[2]?(O.test(c[2])&&(r=RegExp("</"+c[2],"g")),s=H):void 0!==c[3]&&(s=H):s===H?">"===c[0]?(s=r??B,l=-1):void 0===c[1]?l=-2:(l=s.lastIndex-c[2].length,n=c[1],s=void 0===c[3]?H:'"'===c[3]?W:N):s===W||s===N?s=H:s===I||s===U?s=B:(s=H,r=void 0);const h=s===H&&e[t+1].startsWith("/>")?" ":"";o+=s===B?a+D:l>=0?(i.push(n),a.slice(0,l)+A+a.slice(l)+C+h):a+C+(-2===l?t:h)}return[X(e,o+(e[a]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Z{constructor({strings:e,_$litType$:t},a){let i;this.parts=[];let r=0,o=0;const s=e.length-1,n=this.parts,[c,l]=K(e,t);if(this.el=Z.createElement(c,a),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=q.nextNode())&&n.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(A)){const t=l[o++],a=i.getAttribute(e).split(C),s=/([.?@])?(.*)/.exec(t);n.push({type:1,index:r,name:s[2],strings:a,ctor:"."===s[1]?ae:"?"===s[1]?ie:"@"===s[1]?re:te}),i.removeAttribute(e)}else e.startsWith(C)&&(n.push({type:6,index:r}),i.removeAttribute(e));if(O.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=k?k.emptyScript:"";for(let a=0;a<t;a++)i.append(e[a],T()),q.nextNode(),n.push({type:2,index:++r});i.append(e[t],T())}}}else if(8===i.nodeType)if(i.data===E)n.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)n.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const a=M.createElement("template");return a.innerHTML=e,a}}function J(e,t,a=e,i){if(t===V)return t;let r=void 0!==i?a._$Co?.[i]:a._$Cl;const o=P(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,a,i)),void 0!==i?(a._$Co??=[])[i]=r:a._$Cl=r),void 0!==r&&(t=J(e,r._$AS(e,t.values),r,i)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:a}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);q.currentNode=i;let r=q.nextNode(),o=0,s=0,n=a[0];for(;void 0!==n;){if(o===n.index){let t;2===n.type?t=new ee(r,r.nextSibling,this,e):1===n.type?t=new n.ctor(r,n.name,n.strings,this,e):6===n.type&&(t=new oe(r,this,e)),this._$AV.push(t),n=a[++s]}o!==n?.index&&(r=q.nextNode(),o++)}return q.currentNode=M,i}p(e){let t=0;for(const a of this._$AV)void 0!==a&&(void 0!==a.strings?(a._$AI(e,a,t),t+=a.strings.length-2):a._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,a,i){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=a,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=J(this,e,t),P(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>z(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:a}=e,i="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=Z.createElement(X(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Q(i,this),a=e.u(this.options);e.p(t),this.T(a),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new Z(e)),t}k(e){z(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let a,i=0;for(const r of e)i===t.length?t.push(a=new ee(this.O(T()),this.O(T()),this,this.options)):a=t[i],a._$AI(r),i++;i<t.length&&(this._$AR(a&&a._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,a,i,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,a.length>2||""!==a[0]||""!==a[1]?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=G}_$AI(e,t=this,a,i){const r=this.strings;let o=!1;if(void 0===r)e=J(this,e,t,0),o=!P(e)||e!==this._$AH&&e!==V,o&&(this._$AH=e);else{const i=e;let s,n;for(e=r[0],s=0;s<r.length-1;s++)n=J(this,i[a+s],t,s),n===V&&(n=this._$AH[s]),o||=!P(n)||n!==this._$AH[s],n===G?e=G:e!==G&&(e+=(n??"")+r[s+1]),this._$AH[s]=n}o&&!i&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ae extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class ie extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class re extends te{constructor(e,t,a,i,r){super(e,t,a,i,r),this.type=5}_$AI(e,t=this){if((e=J(this,e,t,0)??G)===V)return;const a=this._$AH,i=e===G&&a!==G||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,r=e!==G&&(a===G||i);i&&this.element.removeEventListener(this.name,this,a),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){J(this,e)}}const se=_.litHtmlPolyfillSupport;se?.(Z,ee),(_.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;class ce extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,a)=>{const i=a?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=a?.renderBefore??null;i._$litPart$=r=new ee(t.insertBefore(T(),e),e,void 0,a??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ce._$litElement$=!0,ce.finalized=!0,ne.litElementHydrateSupport?.({LitElement:ce});const le=ne.litElementPolyfillSupport;le?.({LitElement:ce}),(ne.litElementVersions??=[]).push("4.2.1");const de=e=>(t,a)=>{void 0!==a?a.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:b},pe=(e=he,t,a)=>{const{kind:i,metadata:r}=a;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),o.set(a.name,e),"accessor"===i){const{name:i}=a;return{set(a){const r=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,r,e)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=a;return function(a){const r=this[i];t.call(this,a),this.requestUpdate(i,r,e)}}throw Error("Unsupported decorator location: "+i)};function me(e){return(t,a)=>"object"==typeof a?pe(e,t,a):((e,t,a)=>{const i=t.hasOwnProperty(a);return t.constructor.createProperty(a,e),i?Object.getOwnPropertyDescriptor(t,a):void 0})(e,t,a)}function ge(e){return me({...e,state:!0,attribute:!1})}function ue(e=new Date){return e.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}function fe(e=new Date){return e.toLocaleDateString("en-US",{weekday:"long",month:"2-digit",day:"2-digit",year:"2-digit"})}function we(){const e=(new Date).getMonth();return e>=2&&e<=4?"spring":e>=5&&e<=7?"summer":e>=8&&e<=10?"fall":"winter"}function xe(e){return new Date(e).toLocaleDateString("en-US",{weekday:"short"})}function ye(e){const t=e.toLowerCase(),a=function(){const e=(new Date).getHours();return e<6||e>=20}();return t.includes("clear")||t.includes("sunny")?a?"clear-night":"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?a?"partlycloudy-night":"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":a?"clear-night":"clear-day"}function be(e,t=!0){const a=t?"animated":"";switch(e){case"clear-day":case"sunny":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <style>
            .fog-cloud {
              animation: ${t?"fogFloat 8s ease-in-out infinite":"none"};
            }
            @keyframes fogFloat {
              0%, 100% { transform: translate(0px, 0px); }
              50% { transform: translate(4px, -2px); }
            }
          </style>
          <!-- Single fog cloud - light and simple -->
          <g class="fog-cloud" opacity="0.5">
            <ellipse cx="35" cy="50" rx="18" ry="14" fill="#D8D8D8"/>
            <ellipse cx="50" cy="45" rx="22" ry="18" fill="#E0E0E0"/>
            <ellipse cx="65" cy="50" rx="18" ry="14" fill="#D8D8D8"/>
            <rect x="17" y="50" width="66" height="18" rx="3" fill="#DCDCDC"/>
          </g>
        </svg>
      `;case"windy":case"wind":case"exceptional":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="20" fill="#FDB813"/>
        </svg>
      `}}var ve,$e;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ve||(ve={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}($e||($e={}));var _e=function(e,t,a,i){i=i||{},a=null==a?{}:a;var r=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=a,e.dispatchEvent(r),r};let ke=class extends ce{constructor(){super(...arguments),this._expandedSections=new Set(["required","theme"])}setConfig(e){this._config=e}_toggleSection(e){const t=new Set(this._expandedSections);t.has(e)?t.delete(e):t.add(e),this._expandedSections=t}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target,a=t.configValue;let i=t.value;if("forecast_days"!==a&&"hourly_count"!==a||!i||(i=parseInt(i,10)),this._config[a]===i)return;const r={...this._config,[a]:""===i?void 0:i};_e(this,"config-changed",{config:r})}_toggleChanged(e){if(!this._config||!this.hass)return;const t=e.target,a=t.configValue,i=t.checked,r={...this._config,[a]:i};_e(this,"config-changed",{config:r})}_customColorChanged(e,t){if(!this._config||!this.hass)return;const a=e.target.value,i={...this._config,custom_theme_colors:{...this._config.custom_theme_colors,[t]:a||void 0}};_e(this,"config-changed",{config:i})}_seasonalImageChanged(e,t){if(!this._config||!this.hass)return;const a=e.target.value,i="default"===a||""===a?void 0:a,r={...this._config,seasonal_images:{...this._config.seasonal_images||{},[t]:i}};_e(this,"config-changed",{config:r})}_weatherInfoToggle(e,t){if(!this._config||!this.hass)return;const a=e.target.checked,i=this._config.show_weather_info||[];let r;r=a?i.includes(t)?i:[...i,t]:i.filter(e=>e!==t);const o={...this._config,show_weather_info:r.length>0?r:void 0};_e(this,"config-changed",{config:o})}render(){if(!this.hass||!this._config)return j``;const e=Object.keys(this.hass.states).filter(e=>e.startsWith("weather.")),t=Object.keys(this.hass.states).filter(e=>e.startsWith("sensor.")&&(e.includes("temp")||e.includes("temperature")));return j`
      <div class="card-config">
        <h3>WeatherPulse Card Configuration</h3>

        <!-- Required Settings -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("required")}>
            <span class="chevron ${this._expandedSections.has("required")?"expanded":""}">▶</span>
            Required Settings
          </h4>

          ${this._expandedSections.has("required")?j`
          <ha-select
            label="Weather Entity (Required)"
            .configValue=${"entity"}
            .value=${this._config.entity||""}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            ${e.map(e=>j`
                <mwc-list-item .value=${e}>
                  ${e}
                </mwc-list-item>
              `)}
          </ha-select>
          `:""}
        </div>

        <!-- Theme Settings -->
        <div class="section">
          <h4 class="section-header" @click=${()=>this._toggleSection("theme")}>
            <span class="chevron ${this._expandedSections.has("theme")?"expanded":""}">▶</span>
            Theme Settings
          </h4>

          ${this._expandedSections.has("theme")?j`
          <ha-select
            label="Visual Theme"
            .configValue=${"theme"}
            .value=${this._config.theme||"default"}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="default">Default</mwc-list-item>
            <mwc-list-item value="retro">Retro/Neubrutalism (Bold & Boxy)</mwc-list-item>
            <mwc-list-item value="glass">Glassmorphism (Frosted Glass)</mwc-list-item>
            <mwc-list-item value="minimal">Minimal (Clean & Simple)</mwc-list-item>
            <mwc-list-item value="vibrant">Vibrant (Bright & Colorful)</mwc-list-item>
            <mwc-list-item value="custom">Custom (Use Custom Colors)</mwc-list-item>
          </ha-select>
          <p class="helper-text">
            Choose a pre-built visual theme or create your own custom theme.
          </p>

          ${"custom"===this._config.theme?j`
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

          ${this._expandedSections.has("temperature")?j`
          <ha-select
            label="Outdoor Temperature Sensor (Optional)"
            .configValue=${"outdoor_temp_sensor"}
            .value=${this._config.outdoor_temp_sensor||""}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${t.map(e=>j`
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

          ${this._expandedSections.has("header")?j`
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

          ${"greeting"===this._config.header_mode?j`
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

          ${"graphical"===this._config.header_mode?j`
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

          ${this._expandedSections.has("forecast")?j`
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

          ${"hourly"===this._config.forecast_type?j`
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
          `:j`
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

          ${this._expandedSections.has("weather_info")?j`
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

          ${this._expandedSections.has("display")?j`
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

          ${this._config.show_nws_alerts?j`
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

          ${this._expandedSections.has("advanced")?j`
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
    `}static get styles(){return s`
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
    `}};e([me({attribute:!1})],ke.prototype,"hass",void 0),e([ge()],ke.prototype,"_config",void 0),e([ge()],ke.prototype,"_expandedSections",void 0),ke=e([de("weatherpulse-card-editor")],ke);var Se=Object.freeze({__proto__:null,get WeatherPulseCardEditor(){return ke}});let Ae=class extends ce{constructor(){super(...arguments),this.currentTime=ue(),this.currentDate=fe(),this.forecastData=[],this.nwsAlerts=[],this.lastAlertFetch=0}static async getConfigElement(){return await Promise.resolve().then(function(){return Se}),document.createElement("weatherpulse-card-editor")}static getStubConfig(){return{type:"custom:weatherpulse-card",entity:"weather.home",header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation","wind"]}}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this.config={header_mode:"time-focused",show_date:!0,show_time:!0,forecast_type:"daily",forecast_days:5,hourly_count:12,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation"],show_forecast:!0,temp_display_mode:"forecast",...e}}connectedCallback(){super.connectedCallback(),this.startClock(),this.fetchForecast(),this.fetchNWSAlerts(),this.forecastUpdateInterval=window.setInterval(()=>this.fetchForecast(),18e5),this.alertUpdateInterval=window.setInterval(()=>this.fetchNWSAlerts(),3e5)}disconnectedCallback(){super.disconnectedCallback(),this.stopClock(),this.forecastUpdateInterval&&clearInterval(this.forecastUpdateInterval),this.alertUpdateInterval&&clearInterval(this.alertUpdateInterval)}startClock(){this.updateTime(),this.timeInterval=window.setInterval(()=>this.updateTime(),1e3)}stopClock(){this.timeInterval&&clearInterval(this.timeInterval)}updateTime(){this.currentTime=ue(),this.currentDate=fe()}shouldUpdate(e){if(e.has("config"))return!0;if(e.has("hass")){const t=e.get("hass");return!t||t.states[this.config.entity]!==this.hass.states[this.config.entity]}return!0}async fetchForecast(){if(this.hass&&this.config?.entity)try{const e=this.config.forecast_type||"daily";this.hass.connection.subscribeMessage(e=>{e?.forecast&&(this.forecastData=e.forecast)},{type:"weather/subscribe_forecast",forecast_type:e,entity_id:this.config.entity})}catch(e){const t=this.hass.states[this.config.entity];t?.attributes?.forecast&&(this.forecastData=t.attributes.forecast)}}getWeatherData(){const e=this.hass.states[this.config.entity];if(!e)return{};let t=this.forecastData.length>0?this.forecastData:e.attributes.forecast||[];return{temperature:e.attributes.temperature,temperature_unit:e.attributes.temperature_unit||"°F",humidity:e.attributes.humidity,pressure:e.attributes.pressure,pressure_unit:e.attributes.pressure_unit,wind_speed:e.attributes.wind_speed,wind_speed_unit:e.attributes.wind_speed_unit,wind_bearing:e.attributes.wind_bearing,wind_gust_speed:e.attributes.wind_gust_speed,condition:e.state,forecast:t,apparent_temperature:e.attributes.apparent_temperature,uv_index:e.attributes.uv_index,visibility:e.attributes.visibility,visibility_unit:e.attributes.visibility_unit,precipitation:e.attributes.precipitation,precipitation_unit:e.attributes.precipitation_unit,cloud_coverage:e.attributes.cloud_coverage,dew_point:e.attributes.dew_point,ozone:e.attributes.ozone}}getCurrentTemp(){if(this.config.outdoor_temp_sensor){const e=this.hass.states[this.config.outdoor_temp_sensor];if(e)return parseFloat(e.state)}return this.getWeatherData().temperature||70}getSunEntity(){const e=this.config.sun_entity||"sun.sun";return this.hass.states[e]}getMoonEntity(){const e=this.config.moon_entity||"sensor.moon_phase";return this.hass.states[e]}isNightTime(){const e=this.getSunEntity();if(e)return"below_horizon"===e.state;const t=(new Date).getHours();return t>=20||t<6}getMoonPhase(){const e=this.getMoonEntity();return e?e.state:"unknown"}getCurrentHoliday(){if(!this.config?.holiday_themes)return null;const e=new Date,t=e.getMonth()+1,a=e.getDate();return 10===t&&a>=25?"halloween":12===t&&a>=18&&a<=25?"christmas":12===t&&31===a||1===t&&1===a?"newyear":2!==t||13!==a&&14!==a?3===t&&17===a?"stpatrick":5===t&&5===a?"cincodemayo":7===t&&4===a?"july4th":3===t&&a>=25||4===t&&a<=10?"easter":null:"valentine"}renderHolidayDecorations(){const e=this.getCurrentHoliday();if(!e)return j``;const t={halloween:["🎃","👻","🦇","🕷️"],christmas:["🎄","⛄","🎅","❄️"],newyear:["🎆","🎊","🥳","✨"],valentine:["❤️","💕","💝","🌹"],stpatrick:["🍀","🌈","☘️","💚"],july4th:["🇺🇸","🎆","⭐","🎇"],easter:["🐰","🥚","🌷","🐣"],cincodemayo:["🇲🇽","🌮","🌵","🎉"]}[e]||[];return j`
      <div class="holiday-overlay">
        <span class="holiday-icon holiday-icon-1">${t[0]||""}</span>
        <span class="holiday-icon holiday-icon-2">${t[1]||""}</span>
        <span class="holiday-icon holiday-icon-3">${t[2]||""}</span>
        <span class="holiday-icon holiday-icon-4">${t[3]||""}</span>
      </div>
    `}async fetchNWSAlerts(){if(!this.config?.show_nws_alerts||!this.hass)return;const e=Date.now();if(!(e-this.lastAlertFetch<3e5))try{let t;if(this.config?.nws_test_mode)t="https://api.weather.gov/alerts/active?status=actual&message_type=alert",console.log("NWS Test Mode: Fetching active US alerts for display testing");else{const e=this.hass.config.latitude;t=`https://api.weather.gov/alerts/active?point=${e},${this.hass.config.longitude}`}const a=await fetch(t);if(!a.ok)return void console.warn("Failed to fetch NWS alerts:",a.status);const i=await a.json(),r=[];if(i.features&&Array.isArray(i.features)){const e=this.config?.nws_test_mode?i.features.slice(0,2):i.features;for(const t of e){const e=t.properties;e&&r.push({id:e.id||"",event:e.event||"",headline:e.headline||"",description:e.description||"",instruction:e.instruction||"",severity:e.severity||"Unknown",urgency:e.urgency||"Unknown",certainty:e.certainty||"Unknown",onset:e.onset||"",expires:e.expires||"",areaDesc:e.areaDesc||""})}}this.nwsAlerts=r,this.lastAlertFetch=e,this.config?.nws_test_mode&&r.length>0&&console.log(`NWS Test Mode: Displaying ${r.length} sample alert(s)`,r)}catch(e){console.error("Failed to fetch NWS alerts:",e)}}renderNWSAlerts(){return this.config?.show_nws_alerts&&0!==this.nwsAlerts.length?j`
      <div class="nws-alerts-section">
        ${this.nwsAlerts.map(e=>{let t="alert-unknown",a="⚠️",i="";switch(e.severity){case"Extreme":t="alert-extreme",a="🔴";break;case"Severe":t="alert-severe",a="🟠";break;case"Moderate":t="alert-moderate",a="🟡";break;case"Minor":t="alert-minor",a="🔵"}return"Immediate"===e.urgency?i="IMMEDIATE":"Expected"===e.urgency&&(i="EXPECTED"),j`
            <div class="nws-alert ${t}">
              <div class="alert-header">
                <span class="alert-icon">${a}</span>
                <div class="alert-title">
                  <div class="alert-event">
                    ${e.event}
                    ${i?j`<span class="urgency-badge">${i}</span>`:""}
                  </div>
                  <div class="alert-area">${e.areaDesc}</div>
                </div>
              </div>
              <div class="alert-headline">${e.headline}</div>
              ${e.instruction?j`
                <div class="alert-instruction">
                  <strong>⚠️ What to do:</strong> ${e.instruction}
                </div>
              `:""}
              ${e.expires?j`
                <div class="alert-expires">
                  Expires: ${new Date(e.expires).toLocaleString("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit",hour12:!0})}
                </div>
              `:""}
            </div>
          `})}
      </div>
    `:j``}renderWeatherInfo(e){const t=this.config?.show_weather_info;if(!t||0===t.length)return j``;const a=this.getWeatherData(),i=e||this.config?.weather_info_layout||"standard",r=[];for(const e of t){let t="",o="",s="";switch(e){case"uv_index":void 0!==a.uv_index&&(t="☀️",o="UV Index",s=String(Math.round(a.uv_index)));break;case"wind":if(void 0!==a.wind_speed){t="💨",o="Wind";const e=a.wind_speed_unit||"mph";s=`${Math.round(a.wind_speed)} ${e}`,a.wind_gust_speed&&(s+=` (gusts ${Math.round(a.wind_gust_speed)} ${e})`)}break;case"feels_like":let e=a.apparent_temperature;if(void 0===e&&void 0!==a.temperature){const t=a.temperature,i=a.wind_speed||0;if(t<=50&&i>3)e=35.74+.6215*t-35.75*Math.pow(i,.16)+.4275*t*Math.pow(i,.16);else if(t>=80){const i=a.humidity||50;e=2.04901523*t-42.379+10.14333127*i-.22475541*t*i-.00683783*t*t-.05481717*i*i+.00122874*t*t*i+85282e-8*t*i*i-199e-8*t*t*i*i}else e=t}if(void 0!==e){t="🌡️",o="Feels Like";const i=a.temperature_unit?.replace("°","")||"F";s=`${Math.round(e)}°${i}`}break;case"precipitation":if(void 0!==a.precipitation&&a.precipitation>0){t="💧",o="Precipitation";const e=a.precipitation_unit||"in";s=`${a.precipitation} ${e}`}break;case"humidity":void 0!==a.humidity&&(t="💧",o="Humidity",s=`${Math.round(a.humidity)}%`);break;case"pressure":if(void 0!==a.pressure){t="🔽",o="Pressure";const e=a.pressure_unit||"hPa";s=`${Math.round(a.pressure)} ${e}`}break;case"visibility":if(void 0!==a.visibility){t="👁️",o="Visibility";const e=a.visibility_unit||"mi";s=`${a.visibility} ${e}`}break;case"sunrise_sunset":const i=this.getSunEntity();if(i&&i.attributes){const e="above_horizon"===i.state,a=e?i.attributes.next_setting:i.attributes.next_rising;if(a){t=e?"🌅":"🌄",o=e?"Sunset":"Sunrise",s=new Date(a).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}}}s&&("compact"===i?r.push(j`
            <div class="weather-info-item weather-info-compact">
              <div class="weather-info-value">${s}</div>
              <div class="weather-info-label-compact">${o.toUpperCase()}</div>
            </div>
          `):"detailed"===i?r.push(j`
            <div class="weather-info-item weather-info-detailed">
              <span class="weather-info-icon">${t}</span>
              <div class="weather-info-content">
                <div class="weather-info-label">${o}</div>
                <div class="weather-info-value">${s}</div>
              </div>
            </div>
          `):r.push(j`
            <div class="weather-info-item">
              <span class="weather-info-icon">${t}</span>
              <div class="weather-info-content">
                <div class="weather-info-label">${o}</div>
                <div class="weather-info-value">${s}</div>
              </div>
            </div>
          `))}if(0===r.length)return j``;return j`
      <div class="${`weather-info-section weather-info-layout-${i}`}">
        ${r}
      </div>
    `}renderHeader(){const e=this.getWeatherData(),t=this.getCurrentTemp(),a=e.temperature,i=!!this.config.outdoor_temp_sensor,r=function(e,t="°F"){const a="°C"===t?9*e/5+32:e;return a<32?{color:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",backgroundColor:"#667eea",textColor:"#ffffff"}:a<50?{color:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",backgroundColor:"#4facfe",textColor:"#ffffff"}:a<70?{color:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",backgroundColor:"#43e97b",textColor:"#1a1a1a"}:a<85?{color:"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",backgroundColor:"#fa709a",textColor:"#1a1a1a"}:{color:"linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",backgroundColor:"#ff6b6b",textColor:"#ffffff"}}(t,e.temperature_unit),o=this.config.header_mode||"time-focused",s=this.config.temp_display_mode||"forecast",n=e.temperature_unit||"°F";let c,l="";switch(l="both"===s&&i&&a?j`
        <div class="temp-display-wrapper">
          <div class="temp-display">
            <div class="temp-main">${Math.round(t)}°${n.replace("°","")}</div>
            <div class="temp-label">Actual</div>
          </div>
          <div class="temp-display">
            <div class="temp-main">${Math.round(a)}°${n.replace("°","")}</div>
            <div class="temp-label">Forecast</div>
          </div>
        </div>
      `:"actual"===s&&i?j`
        <div class="temp-display">
          <div class="temp-main">${Math.round(t)}°${n.replace("°","")}</div>
          <div class="temp-label">Actual</div>
        </div>
      `:j`
        <div class="temp-display">
          <div class="temp-main">${Math.round(t)}°${n.replace("°","")}</div>
          <div class="temp-label">Forecast</div>
        </div>
      `,o){case"greeting":c=j`
          <div class="greeting-header">
            <div class="weather-icon ${ye(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="greeting-content">
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>
              <div class="greeting-text">
                ${function(e,t,a){const i=new Date,r=i.getHours(),o=i.toLocaleDateString("en-US",{weekday:"short"}),s=i.toLocaleDateString("en-US",{month:"2-digit",day:"2-digit",year:"2-digit"}).replace(/\//g,"-"),n=e?`, ${e}`:"";let c="Hello";c=r<12?"Good Morning":r<17?"Good Afternoon":r<22?"Good Evening":"Good Night";let l="";if(t){const e=t.toLowerCase();e.includes("rain")?l="it's rainy, don't forget your umbrella":e.includes("snow")?l="it's snowy, bundle up":e.includes("clear")||e.includes("sunny")?l=a&&a>75?"it's sunny and warm":"it's a beautiful clear day":e.includes("cloud")?l="it's overcast but pleasant":e.includes("storm")&&(l="it's stormy, stay safe indoors")}return l?`${c}${n}, ${l}. ${o} ${s}`:`${c}${n}! ${o} ${s}`}(this.config.greeting_name,e.condition,t)}
              </div>
              ${l}
            </div>
          </div>
        `;break;case"graphical":const r=we(),o=this.config.seasonal_images?.[r],d=function(e,t){if(t)return`url(${t})`;const a="/local/community/WeatherPulse/images";switch(e||we()){case"spring":default:return`url(${a}/spring-default.jpg)`;case"summer":return`url(${a}/summer-default.jpg)`;case"fall":return`url(${a}/fall-default.jpg)`;case"winter":return`url(${a}/winter-default.jpg)`}}(r,o);c=j`
          <div class="graphical-header" style="background: ${d}; background-size: cover; background-position: center;">
            <div class="graphical-overlay">
              <div class="graphical-content">
                <div class="graphical-main">
                  <div class="weather-icon-graphical ${ye(e.condition||"clear")}">
                    ${this.renderWeatherIcon(e.condition||"clear")}
                  </div>
                  <div class="graphical-right">
                    ${!1!==this.config.show_time?j`
                      <div class="graphical-time">
                        ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
                      </div>
                    `:""}
                    ${!1!==this.config.show_date?j`
                      <div class="graphical-date">${this.currentDate}</div>
                    `:""}
                    ${l}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;break;case"minimal":c=j`
          <div class="minimal-header">
            <div class="weather-icon ${ye(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            ${l}
          </div>
        `;break;case"date-focused":c=j`
          <div class="datetime-header">
            <div class="weather-icon ${ye(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="date-large">${this.currentDate}</div>
              ${this.config.show_time?j`<div class="time-small">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period-small">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>`:""}
              ${l}
            </div>
          </div>
        `;break;case"balanced":c=j`
          <div class="datetime-header balanced">
            <div class="weather-icon ${ye(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              ${this.config.show_time?j`<div class="time-medium">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period-medium">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>`:""}
              ${this.config.show_date?j`<div class="date-medium">${this.currentDate}</div>`:""}
              ${l}
            </div>
          </div>
        `;break;default:let h=e.condition||"clear";h=h.toLowerCase().includes("unavail")||h.toLowerCase().includes("unknown")?"Loading":h.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "),c=j`
          <div class="datetime-header time-focused-header">
            <div class="weather-icon ${ye(e.condition||"clear")}">
              ${this.renderWeatherIcon(e.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="condition-temp">${h}, ${Math.round(a||t)}°${n.replace("°","")}</div>
              <div class="time-large">
                ${this.currentTime.replace(/\s?(AM|PM)/i,"")}<span class="time-period">${this.currentTime.match(/(AM|PM)/i)?.[0]||""}</span>
              </div>
              ${this.config.show_date?j`<div class="date-small">${this.currentDate}</div>`:""}
              ${"both"===s&&i||"actual"===s&&i?j`
                <div class="actual-temp-below">
                  <span class="actual-temp-value">${Math.round(t)}°${n.replace("°","")}</span>
                  <span class="actual-temp-label">Actual</span>
                </div>
              `:""}
            </div>
          </div>
        `}const d="compact"===(this.config?.weather_info_layout||"standard"),h=d?this.renderWeatherInfo("compact"):"";return"graphical"===o?j`
        ${c}
        ${d?j`
          <div class="weather-info-in-header">
            ${h}
          </div>
        `:""}
      `:j`
      <div class="card-header" style="background: ${r.color}; color: ${r.textColor};">
        ${c}
        ${d?j`
          <div class="weather-info-in-header">
            ${h}
          </div>
        `:""}
      </div>
    `}renderWeatherIcon(e,t=!1){const a=t?function(e){const t=e.toLowerCase();return t.includes("clear")||t.includes("sunny")?"clear-day":t.includes("partlycloudy")||t.includes("partly")||t.includes("partial")?"partlycloudy":t.includes("cloud")?"cloudy":t.includes("rain")?"rainy":t.includes("snow")?"snowy":t.includes("storm")||t.includes("thunder")?"lightning":t.includes("fog")||t.includes("mist")?"fog":t.includes("wind")?"windy":"clear-day"}(e):ye(e),i=!1!==this.config.animate_icons;if(("clear-night"===a||"partlycloudy-night"===a)&&i&&!1!==this.config.show_moon_phase){const e=this.getMoonPhase();if(e&&"unknown"!==e)return"clear-night"===a?function(e,t=!0){const a=t?"animated":"",i=R`
    <defs>
      <radialGradient id="moonPhaseGradient" cx="40%" cy="40%">
        <stop offset="0%" style="stop-color:#FFFEF0;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#F4E5C2;stop-opacity:1" />
      </radialGradient>
    </defs>
  `,r=R`
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
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${r}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="#2a2a3e" stroke="#4a4a5e" stroke-width="2"/>
          </g>
        </svg>
      `;case"waxing_crescent":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${i}
          ${r}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <circle cx="46" cy="50" r="20" fill="#1a1a2e"/>
          </g>
        </svg>
      `;case"first_quarter":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${i}
          ${r}
          <g class="moon-shape">
            <path d="M 50 28 A 22 22 0 0 1 50 72 L 50 28 Z" fill="url(#moonPhaseGradient)"/>
            <circle cx="50" cy="50" r="22" fill="none" stroke="#4a4a5e" stroke-width="1"/>
          </g>
        </svg>
      `;case"waxing_gibbous":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${i}
          ${r}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <ellipse cx="40" cy="50" rx="8" ry="22" fill="#1a1a2e"/>
          </g>
        </svg>
      `;case"full_moon":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${i}
          ${r}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
          </g>
        </svg>
      `;case"waning_gibbous":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${i}
          ${r}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <ellipse cx="60" cy="50" rx="8" ry="22" fill="#1a1a2e"/>
          </g>
        </svg>
      `;case"last_quarter":case"third_quarter":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${i}
          ${r}
          <g class="moon-shape">
            <path d="M 50 28 A 22 22 0 0 0 50 72 L 50 28 Z" fill="url(#moonPhaseGradient)"/>
            <circle cx="50" cy="50" r="22" fill="none" stroke="#4a4a5e" stroke-width="1"/>
          </g>
        </svg>
      `;case"waning_crescent":return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${i}
          ${r}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <circle cx="54" cy="50" r="20" fill="#1a1a2e"/>
          </g>
        </svg>
      `;default:return R`
        <svg class="weather-icon-svg ${a}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          ${i}
          ${r}
          <g class="moon-shape">
            <circle cx="50" cy="50" r="22" fill="url(#moonPhaseGradient)"/>
            <circle cx="58" cy="48" r="20" fill="#1a1a2e"/>
          </g>
        </svg>
      `}}(e,!0):be(a,!0)}if(i)return be(a,!0);return j`<span class="icon-emoji">${{"clear-day":"☀️","clear-night":"🌙",cloudy:"☁️",rainy:"🌧️",snowy:"❄️",lightning:"⛈️",fog:"🌫️",windy:"💨"}[a]||"☀️"}</span>`}renderForecast(){const e=this.getWeatherData(),t=this.config.forecast_type||"daily",a="hourly"===t?this.config.hourly_count||12:this.config.forecast_days||5,i=e.forecast?.slice(0,a)||[],r=this.config.view_mode||"standard";if(0===i.length)return j`
        <div class="no-forecast">
          <p>No forecast data available</p>
          <p class="helper">Your weather integration may not provide forecast data, or you may need to use a weather service call to fetch it.</p>
        </div>
      `;if("chart"===r)return this.renderChartView(i,e.temperature_unit||"°F",t);return j`
      <div class="${`forecast-container forecast-${r} forecast-type-${t}`}">
        ${i.map(a=>"hourly"===t?this.renderForecastHour(a,e.temperature_unit||"°F",r):this.renderForecastDay(a,e.temperature_unit||"°F",r))}
      </div>
    `}renderForecastHour(e,t,a="standard"){const i=new Date(e.datetime).toLocaleTimeString("en-US",{hour:"numeric",hour12:!0}),r=Math.round(e.temperature||0),o=e.precipitation_probability||0,s=e.condition||"clear",n=e.humidity,c=e.wind_speed;return"compact"===a?j`
        <div class="forecast-hour forecast-compact">
          <div class="hour-name">${i}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(s,!0)}
          </div>
          <div class="hour-temp">${r}°</div>
          ${o>0?j`<div class="precip-compact">💧${o}%</div>`:""}
        </div>
      `:"detailed"===a?j`
        <div class="forecast-hour forecast-detailed">
          <div class="hour-info-row">
            <div class="hour-name">${i}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(s,!0)}
            </div>
            <div class="hour-temp-display">${r}°</div>
          </div>
          ${o>0||n||c?j`
            <div class="hour-details">
              ${o>0?j`<div class="detail-item"><span>💧</span> ${o}%</div>`:""}
              ${n?j`<div class="detail-item"><span>💨</span> ${n}%</div>`:""}
              ${c?j`<div class="detail-item"><span>🌬️</span> ${Math.round(c)} mph</div>`:""}
            </div>
          `:""}
        </div>
      `:j`
      <div class="forecast-hour">
        <div class="hour-name">${i}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(s,!0)}
        </div>
        <div class="hour-temp">${r}°</div>
        ${o>0?j`<div class="precip-prob">${o}%</div>`:""}
      </div>
    `}renderForecastDay(e,t,a="standard"){const i=xe(e.datetime),r=Math.round(e.temperature||0),o=Math.round(e.templow||0),s=e.precipitation_probability||0,n=e.humidity,c=e.wind_speed,l=r-o>0?o/r*70:30;return"compact"===a?j`
        <div class="forecast-day forecast-compact">
          <div class="day-name">${i}</div>
          <div class="day-icon-small">
            ${this.renderWeatherIcon(e.condition||"clear",!0)}
          </div>
          <div class="compact-temps">
            <span class="temp-high-compact">${r}°</span>
            <span class="temp-low-compact">${o}°</span>
          </div>
          ${s>0?j`<div class="precip-compact">💧${s}%</div>`:""}
        </div>
      `:"detailed"===a?j`
        <div class="forecast-day forecast-detailed">
          <div class="day-info-row">
            <div class="day-name">${i}</div>
            <div class="day-icon">
              ${this.renderWeatherIcon(e.condition||"clear",!0)}
            </div>
            <div class="day-temp-range">
              <span class="temp-low">${o}°</span>
              <div class="temp-bar">
                <div class="temp-bar-low" style="width: ${l}%"></div>
                <div class="temp-bar-high" style="width: ${70-l}%"></div>
              </div>
              <span class="temp-high">${r}°</span>
            </div>
          </div>
          ${s>0||n||c?j`
            <div class="day-details">
              ${s>0?j`<div class="detail-item"><span>💧</span> ${s}%</div>`:""}
              ${n?j`<div class="detail-item"><span>💨</span> ${n}%</div>`:""}
              ${c?j`<div class="detail-item"><span>🌬️</span> ${Math.round(c)} mph</div>`:""}
            </div>
          `:""}
        </div>
      `:j`
      <div class="forecast-day">
        <div class="day-name">${i}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(e.condition||"clear",!0)}
        </div>
        <div class="day-temp-range">
          <span class="temp-low">${o}°</span>
          <div class="temp-bar">
            <div class="temp-bar-low" style="width: ${l}%"></div>
            <div class="temp-bar-high" style="width: ${70-l}%"></div>
          </div>
          <span class="temp-high">${r}°</span>
        </div>
        ${s>0?j`
          <div class="precip-prob">${s}%</div>
        `:""}
      </div>
    `}renderChartView(e,t,a){const i=e.map(e=>"hourly"===a?e.temperature||0:[e.temperature||0,e.templow||0]).flat(),r=Math.min(...i),o=Math.max(...i),s=.2*(o-r),n=r-s,c=o+s,l=60,d=100/(e.length-1),h=[],p=[];e.forEach((e,t)=>{const i=t*d;if("hourly"===a){const t=e.temperature||0,a=l-(t-n)/(c-n)*l;h.push(`${i},${a}`)}else{const t=e.temperature||0,a=e.templow||0,r=l-(t-n)/(c-n)*l,o=l-(a-n)/(c-n)*l;h.push(`${i},${r}`),p.push(`${i},${o}`)}});const m=h.join(" "),g=p.join(" ");return j`
      <div class="forecast-chart">
        <svg viewBox="0 0 ${100} ${l}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <!-- Temperature lines -->
          ${"daily"===a?j`
            <polyline
              points="${g}"
              fill="none"
              stroke="rgba(100, 150, 255, 0.6)"
              stroke-width="0.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          `:""}
          <polyline
            points="${m}"
            fill="none"
            stroke="rgba(255, 150, 100, 0.8)"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <!-- Temperature points -->
          ${h.map(e=>{const[t,a]=e.split(",").map(Number);return j`
              <circle cx="${t}" cy="${a}" r="1" fill="rgba(255, 150, 100, 1)" />
            `})}
          ${"daily"===a?p.map(e=>{const[t,a]=e.split(",").map(Number);return j`
              <circle cx="${t}" cy="${a}" r="0.8" fill="rgba(100, 150, 255, 1)" />
            `}):""}
        </svg>

        <!-- Forecast items below chart -->
        <div class="chart-items">
          ${e.map(e=>{const t="hourly"===a?new Date(e.datetime).toLocaleTimeString("en-US",{hour:"numeric",hour12:!0}):xe(e.datetime),i=Math.round(e.temperature||0),r="daily"===a?Math.round(e.templow||0):null,o=e.condition||"clear";return j`
              <div class="chart-item">
                <div class="chart-icon">
                  ${this.renderWeatherIcon(o,!0)}
                </div>
                <div class="chart-day">${t}</div>
                <div class="chart-temps">
                  <span class="chart-temp-high">${i}°</span>
                  ${null!==r?j`<span class="chart-temp-low">${r}°</span>`:""}
                </div>
              </div>
            `})}
        </div>
      </div>
    `}render(){if(!this.hass||!this.config)return j``;if(!this.hass.states[this.config.entity])return j`
        <ha-card>
          <div class="error">Entity ${this.config.entity} not found</div>
        </ha-card>
      `;const e=this.getWeatherData(),t=e.forecast&&e.forecast.length>0,a=!1!==this.config.show_forecast&&t,i=this.config.night_mode&&this.isNightTime()?"night-mode":"",r="compact"===(this.config?.weather_info_layout||"standard"),o=this.nwsAlerts.some(e=>"Extreme"===e.severity||"Severe"===e.severity)?this.nwsAlerts.some(e=>"Extreme"===e.severity)?"alert-glow-extreme":"alert-glow-severe":"",s=this.getCurrentTemp();let n="";s>=95?n="temp-glow-hot":s<=20&&(n="temp-glow-freezing");const c=this.config?.theme||"default",l="default"!==c?`theme-${c}`:"";let d="";if("custom"===c&&this.config?.custom_theme_colors){const e=this.config.custom_theme_colors;d=`\n        --custom-primary: ${e.primary||"#667eea"};\n        --custom-secondary: ${e.secondary||"#764ba2"};\n        --custom-background: ${e.background||"#ffffff"};\n        --custom-text: ${e.text||"#333333"};\n        --custom-border: ${e.border||"#e0e0e0"};\n        --custom-accent: ${e.accent||"#f093fb"};\n      `}return j`
      <ha-card class="${i} ${o} ${n} ${l}" style="${d}">
        ${this.renderHolidayDecorations()}
        ${this.renderHeader()}
        ${this.renderNWSAlerts()}
        ${r?"":this.renderWeatherInfo()}
        ${a?j`
          <div class="card-content">
            ${this.renderForecast()}
          </div>
        `:""}
      </ha-card>
    `}static get styles(){return s`
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
        color: white !important; /* Bright white text */
        filter: none !important; /* No filter - don't dim text */
      }

      ha-card.night-mode .card-header::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(10, 14, 27, 0.6) 0%, rgba(20, 25, 45, 0.6) 100%); /* Darker overlay */
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
        background: transparent; /* Transparent to show stars through */
        color: #e8eaf6;
      }

      ha-card.night-mode .forecast-day,
      ha-card.night-mode .forecast-hour {
        background: transparent !important; /* Show stars through */
        border-bottom-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .temp-bar {
        background: rgba(232, 234, 246, 0.15);
      }

      ha-card.night-mode .forecast-compact {
        background: rgba(29, 33, 56, 0.6) !important; /* Keep some background */
        position: relative !important;
        z-index: 1 !important; /* Above stars */
      }

      ha-card.night-mode .forecast-type-hourly.forecast-standard .forecast-hour {
        background: rgba(29, 33, 56, 0.6) !important; /* Keep some background */
        position: relative !important;
        z-index: 1 !important; /* Above stars */
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
        background: transparent; /* No background - show stars */
        border-top-color: rgba(232, 234, 246, 0.1);
      }

      ha-card.night-mode .weather-info-item {
        background: transparent; /* No boxes - show stars */
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

      .holiday-icon {
        position: absolute;
        font-size: 32px;
        opacity: 0.3;
        animation: holiday-float 4s ease-in-out infinite;
      }

      .holiday-icon-1 {
        top: 10px;
        right: 10px;
        animation-delay: 0s;
      }

      .holiday-icon-2 {
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        animation-delay: 1s;
      }

      .holiday-icon-3 {
        bottom: 10px;
        right: 50px;
        animation-delay: 2s;
      }

      .holiday-icon-4 {
        top: 100px;
        right: 50%;
        transform: translateX(50%);
        animation-delay: 3s;
      }

      @keyframes holiday-float {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
          opacity: 0.3;
        }
        50% {
          transform: translateY(-10px) rotate(5deg);
          opacity: 0.5;
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
        backdrop-filter: none !important;
      }

      ha-card.theme-retro .card-content {
        background: rgba(0, 31, 63, 0.3) !important;
      }

      ha-card.theme-retro .forecast-day,
      ha-card.theme-retro .forecast-hour {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
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
        background: transparent !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
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
        background: rgba(255, 255, 255, 0.2) !important;
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
        border-bottom-color: rgba(255, 255, 255, 0.15) !important;
      }

      /* GLASSMORPHISM THEME */
      ha-card.theme-glass {
        background: rgba(255, 255, 255, 0.15) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15) !important;
      }

      ha-card.theme-glass .card-header {
        background: rgba(255, 255, 255, 0.08) !important; /* Override gradient */
        backdrop-filter: blur(10px) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      ha-card.theme-glass .graphical-header::after {
        background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3)) !important;
        backdrop-filter: blur(5px) !important;
      }

      ha-card.theme-glass .forecast-day,
      ha-card.theme-glass .forecast-hour {
        background: transparent !important;
        backdrop-filter: none !important;
        border: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
      }

      ha-card.theme-glass .forecast-compact {
        background: rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
      }

      ha-card.theme-glass .weather-info-item {
        background: transparent !important;
        backdrop-filter: none !important;
        border: none !important;
      }

      ha-card.theme-glass .weather-info-section {
        background: transparent !important;
        border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-glass .nws-alert {
        background: rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(15px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
      }

      /* GLASS THEME - Night Mode */
      ha-card.theme-glass.night-mode {
        background: rgba(10, 14, 39, 0.3) !important; /* Darker base */
        backdrop-filter: blur(25px) !important;
      }

      ha-card.theme-glass.night-mode::before {
        opacity: 0.7 !important; /* Dimmer stars */
      }

      ha-card.theme-glass.night-mode .card-header {
        background: rgba(10, 14, 39, 0.15) !important; /* Keep glass header style */
        filter: none !important; /* No brightness filter */
        backdrop-filter: blur(15px) !important;
        color: #e8eaf6 !important;
      }

      ha-card.theme-glass.night-mode .card-header::after {
        display: none !important; /* No default night overlay */
      }

      ha-card.theme-glass.night-mode .card-content {
        background: transparent !important;
      }

      ha-card.theme-glass.night-mode .forecast-compact {
        background: rgba(29, 33, 56, 0.5) !important;
        backdrop-filter: blur(10px) !important;
      }

      /* MINIMAL THEME */
      ha-card.theme-minimal {
        background: #ffffff !important;
        border: 1px solid #e0e0e0 !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .card-header {
        background: #f8f8f8 !important; /* Override gradient */
        color: #333 !important;
        border-bottom: 1px solid #e0e0e0;
      }

      ha-card.theme-minimal .graphical-header::after {
        background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0.7)) !important;
      }

      ha-card.theme-minimal .card-content {
        background: #ffffff !important;
      }

      ha-card.theme-minimal .forecast-day,
      ha-card.theme-minimal .forecast-hour {
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid #f0f0f0 !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .forecast-compact {
        background: #f8f8f8 !important;
        border: 1px solid #e0e0e0 !important;
      }

      ha-card.theme-minimal .weather-info-item {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        color: #333 !important;
      }

      ha-card.theme-minimal .weather-info-section {
        background: #ffffff !important;
        border-top: 1px solid #e0e0e0 !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-minimal .nws-alert {
        background: #f8f8f8 !important;
        border: 1px solid #e0e0e0 !important;
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
        background: #e0e0e0 !important;
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

      ha-card.theme-minimal.night-mode .forecast-compact {
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
        background: transparent !important;
        border: none !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        color: white !important;
      }

      ha-card.theme-vibrant .forecast-compact {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1)) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
      }

      ha-card.theme-vibrant .weather-info-item {
        background: transparent !important;
        border: none !important;
        color: white !important;
      }

      ha-card.theme-vibrant .weather-info-section {
        background: transparent !important;
        border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
        padding-top: 12px !important;
        margin-top: 8px !important;
      }

      ha-card.theme-vibrant .nws-alert {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15)) !important;
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
        background: rgba(255, 255, 255, 0.2) !important;
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

      ha-card.theme-vibrant.night-mode .forecast-compact {
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

      .forecast-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      /* Chart View Mode */
      .forecast-chart {
        padding: 16px 0;
      }

      .forecast-chart svg {
        width: 100%;
        height: 120px;
        margin-bottom: 16px;
      }

      .chart-items {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }

      .chart-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        flex: 1;
        min-width: 0;
      }

      .chart-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .chart-icon .weather-icon-svg {
        width: 32px;
        height: 32px;
      }

      .chart-day {
        font-size: 13px;
        font-weight: 500;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }

      .chart-temps {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        font-size: 14px;
      }

      .chart-temp-high {
        font-weight: 600;
        color: rgba(255, 120, 80, 1);
      }

      .chart-temp-low {
        font-size: 12px;
        opacity: 0.7;
        color: rgba(100, 150, 255, 1);
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
    `}};e([me({attribute:!1})],Ae.prototype,"hass",void 0),e([ge()],Ae.prototype,"config",void 0),e([ge()],Ae.prototype,"currentTime",void 0),e([ge()],Ae.prototype,"currentDate",void 0),e([ge()],Ae.prototype,"forecastData",void 0),e([ge()],Ae.prototype,"nwsAlerts",void 0),Ae=e([de("weatherpulse-card")],Ae),window.customCards=window.customCards||[],window.customCards.push({type:"weatherpulse-card",name:"WeatherPulse Card",description:"A modern, highly configurable weather card for Home Assistant",preview:!0,documentationURL:"https://github.com/imCharlieB/WeatherPulse"}),console.info("%c WEATHERPULSE-CARD %c v0.1.0 ","color: white; background: #4facfe; font-weight: 700;","color: #4facfe; background: white; font-weight: 700;");export{Ae as WeatherPulseCard};
