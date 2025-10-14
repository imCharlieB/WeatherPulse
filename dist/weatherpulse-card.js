function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",$=m.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!c(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);o?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const r=o.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,o=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??y)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[_("elementProperties")]=new Map,b[_("finalized")]=new Map,$?.({ReactiveElement:b}),(m.reactiveElementVersions??=[]).push("2.1.1");const x=globalThis,A=x.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,T=`<${P}>`,k=document,O=()=>k.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,D=Array.isArray,M="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,z=/>/g,N=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),F=new WeakMap,q=k.createTreeWalker(k,129);function G(t,e){if(!D(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=H;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,d=0;for(;d<i.length&&(n.lastIndex=d,c=n.exec(i),null!==c);)d=n.lastIndex,n===H?"!--"===c[1]?n=R:void 0!==c[1]?n=z:void 0!==c[2]?(j.test(c[2])&&(o=RegExp("</"+c[2],"g")),n=N):void 0!==c[3]&&(n=N):n===N?">"===c[0]?(n=o??H,l=-1):void 0===c[1]?l=-2:(l=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?N:'"'===c[3]?I:W):n===I||n===W?n=N:n===R||n===z?n=H:(n=N,o=void 0);const h=n===N&&t[e+1].startsWith("/>")?" ":"";r+=n===H?i+T:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+S+h):i+S+(-2===l?e:h)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[c,l]=J(t,e);if(this.el=K.createElement(c,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=q.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[r++],i=s.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),q.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:o}),t+=S.length-1}o++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===V)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Y(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??k).importNode(e,!0);q.currentNode=s;let o=q.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new st(o,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(o=q.nextNode(),r++)}return q.currentNode=k,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),U(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>D(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new K(t)),e}k(t){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=Y(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=Y(this,s[i+n],e,n),a===V&&(a=this._$AH[n]),r||=!U(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends X{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??B)===V)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const ot=x.litHtmlPolyfillSupport;ot?.(K,Q),(x.litHtmlVersions??=[]).push("3.3.1");const rt=globalThis;class nt extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Q(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}nt._$litElement$=!0,nt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:nt});const at=rt.litElementPolyfillSupport;at?.({LitElement:nt}),(rt.litElementVersions??=[]).push("4.2.1");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},dt=(t=lt,e,i)=>{const{kind:s,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return ht({...t,state:!0,attribute:!1})}function ut(t=new Date){return t.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}function mt(t=new Date){return t.toLocaleDateString("en-US",{weekday:"long",month:"2-digit",day:"2-digit",year:"2-digit"})}function gt(t){const e=t.toLowerCase();return e.includes("clear")||e.includes("sunny")?"clear-day":e.includes("cloud")?"cloudy":e.includes("rain")?"rainy":e.includes("snow")?"snowy":e.includes("storm")||e.includes("thunder")?"lightning":e.includes("fog")||e.includes("mist")?"fog":e.includes("wind")?"windy":"clear-day"}var ft,$t;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ft||(ft={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}($t||($t={}));var _t=function(t,e,i,s){s=s||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,t.dispatchEvent(o),o};let vt=class extends nt{setConfig(t){this._config=t}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue,s=e.value;if(this._config[i]===s)return;const o={...this._config,[i]:""===s?void 0:s};_t(this,"config-changed",{config:o})}_toggleChanged(t){if(!this._config||!this.hass)return;const e=t.target,i=e.configValue,s=e.checked,o={...this._config,[i]:s};_t(this,"config-changed",{config:o})}render(){if(!this.hass||!this._config)return L``;const t=Object.keys(this.hass.states).filter(t=>t.startsWith("weather.")),e=Object.keys(this.hass.states).filter(t=>t.startsWith("sensor.")&&(t.includes("temp")||t.includes("temperature")));return L`
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
            @closed=${t=>t.stopPropagation()}
          >
            ${t.map(t=>L`
                <mwc-list-item .value=${t}>
                  ${t}
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
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${e.map(t=>L`
                <mwc-list-item .value=${t}>
                  ${t}
                </mwc-list-item>
              `)}
          </ha-select>
          <p class="helper-text">
            If set, the card will use this sensor for the actual outdoor temperature instead of the forecast.
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
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="time-focused">Time Focused (Large Clock)</mwc-list-item>
            <mwc-list-item value="date-focused">Date Focused (Large Date)</mwc-list-item>
            <mwc-list-item value="balanced">Balanced (Equal Time & Date)</mwc-list-item>
            <mwc-list-item value="minimal">Minimal (Icon & Temp Only)</mwc-list-item>
            <mwc-list-item value="greeting">Greeting (Personalized Message)</mwc-list-item>
          </ha-select>

          ${"greeting"===this._config.header_mode?L`
            <ha-textfield
              label="Greeting Name"
              .configValue=${"greeting_name"}
              .value=${this._config.greeting_name||""}
              @input=${this._valueChanged}
            ></ha-textfield>
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
            label="Forecast Days"
            .configValue=${"forecast_days"}
            .value=${this._config.forecast_days||5}
            @selected=${this._valueChanged}
            @closed=${t=>t.stopPropagation()}
          >
            <mwc-list-item value="5">5 Days</mwc-list-item>
            <mwc-list-item value="7">7 Days</mwc-list-item>
            <mwc-list-item value="10">10 Days</mwc-list-item>
          </ha-select>

          <ha-select
            label="View Mode"
            .configValue=${"view_mode"}
            .value=${this._config.view_mode||"standard"}
            @selected=${this._valueChanged}
            @closed=${t=>t.stopPropagation()}
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
    `}};t([ht({attribute:!1})],vt.prototype,"hass",void 0),t([pt()],vt.prototype,"_config",void 0),vt=t([ct("weatherpulse-card-editor")],vt);var yt=Object.freeze({__proto__:null,get WeatherPulseCardEditor(){return vt}});let wt=class extends nt{constructor(){super(...arguments),this.currentTime=ut(),this.currentDate=mt()}static async getConfigElement(){return await Promise.resolve().then(function(){return yt}),document.createElement("weatherpulse-card-editor")}static getStubConfig(){return{type:"custom:weatherpulse-card",entity:"weather.home",header_mode:"time-focused",show_date:!0,show_time:!0,forecast_days:5,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation","wind"]}}setConfig(t){if(!t.entity)throw new Error("You need to define an entity");this.config={header_mode:"time-focused",show_date:!0,show_time:!0,forecast_days:5,view_mode:"standard",animate_icons:!0,data_rows:["temperature","precipitation"],show_forecast:!0,...t}}connectedCallback(){super.connectedCallback(),this.startClock()}disconnectedCallback(){super.disconnectedCallback(),this.stopClock()}startClock(){this.updateTime(),this.timeInterval=window.setInterval(()=>this.updateTime(),1e3)}stopClock(){this.timeInterval&&clearInterval(this.timeInterval)}updateTime(){this.currentTime=ut(),this.currentDate=mt()}shouldUpdate(t){if(t.has("config"))return!0;if(t.has("hass")){const e=t.get("hass");return!e||e.states[this.config.entity]!==this.hass.states[this.config.entity]}return!0}getWeatherData(){const t=this.hass.states[this.config.entity];if(!t)return{};let e=t.attributes.forecast||[];return console.log("Weather entity:",t.entity_id),console.log("Weather attributes:",t.attributes),console.log("Forecast data:",e),{temperature:t.attributes.temperature,temperature_unit:t.attributes.temperature_unit||"°F",humidity:t.attributes.humidity,pressure:t.attributes.pressure,wind_speed:t.attributes.wind_speed,wind_bearing:t.attributes.wind_bearing,condition:t.state,forecast:e}}getCurrentTemp(){if(this.config.outdoor_temp_sensor){const t=this.hass.states[this.config.outdoor_temp_sensor];if(t)return parseFloat(t.state)}return this.getWeatherData().temperature||70}renderHeader(){const t=this.getWeatherData(),e=this.getCurrentTemp(),i=function(t,e="°F"){const i="°C"===e?9*t/5+32:t;return i<32?{color:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",backgroundColor:"#667eea",textColor:"#ffffff"}:i<50?{color:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",backgroundColor:"#4facfe",textColor:"#ffffff"}:i<70?{color:"linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",backgroundColor:"#43e97b",textColor:"#1a1a1a"}:i<85?{color:"linear-gradient(135deg, #fa709a 0%, #fee140 100%)",backgroundColor:"#fa709a",textColor:"#1a1a1a"}:{color:"linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",backgroundColor:"#ff6b6b",textColor:"#ffffff"}}(e,t.temperature_unit);let s;switch(this.config.header_mode||"time-focused"){case"greeting":s=L`
          <div class="greeting-header">
            <div class="weather-icon ${gt(t.condition||"clear")}">
              ${this.renderWeatherIcon(t.condition||"clear")}
            </div>
            <div class="greeting-content">
              <div class="greeting-text">
                ${function(t){const e=(new Date).getHours();let i="Hello";return i=e<12?"Good Morning":e<17?"Good Afternoon":e<22?"Good Evening":"Good Night",`${i}${t?`, ${t}`:""}!`}(this.config.greeting_name,t.condition)}
              </div>
              <div class="suggestion-text">
                ${function(t,e){if(!t)return"";const i=t.toLowerCase();return i.includes("rain")?"Don't forget your umbrella!":i.includes("snow")?"Bundle up, winter is here!":i.includes("clear")||i.includes("sunny")?e&&e>75?"Perfect day for outdoor activities!":"Beautiful day ahead!":i.includes("cloud")?"Overcast but pleasant.":i.includes("storm")?"Stay safe indoors!":""}(t.condition,e)}
              </div>
              ${this.config.show_time?L`<div class="time-small">${this.currentTime}</div>`:""}
              ${this.config.show_date?L`<div class="date-small">${this.currentDate}</div>`:""}
              <div class="temp-display">${Math.round(e)}${t.temperature_unit}</div>
            </div>
          </div>
        `;break;case"minimal":s=L`
          <div class="minimal-header">
            <div class="weather-icon ${gt(t.condition||"clear")}">
              ${this.renderWeatherIcon(t.condition||"clear")}
            </div>
            <div class="temp-display">${Math.round(e)}${t.temperature_unit}</div>
          </div>
        `;break;case"date-focused":s=L`
          <div class="datetime-header">
            <div class="weather-icon ${gt(t.condition||"clear")}">
              ${this.renderWeatherIcon(t.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="date-large">${this.currentDate}</div>
              ${this.config.show_time?L`<div class="time-small">${this.currentTime}</div>`:""}
              <div class="temp-display">${Math.round(e)}${t.temperature_unit}</div>
            </div>
          </div>
        `;break;case"balanced":s=L`
          <div class="datetime-header balanced">
            <div class="weather-icon ${gt(t.condition||"clear")}">
              ${this.renderWeatherIcon(t.condition||"clear")}
            </div>
            <div class="datetime-content">
              ${this.config.show_time?L`<div class="time-medium">${this.currentTime}</div>`:""}
              ${this.config.show_date?L`<div class="date-medium">${this.currentDate}</div>`:""}
              <div class="temp-display">${Math.round(e)}${t.temperature_unit}</div>
            </div>
          </div>
        `;break;default:s=L`
          <div class="datetime-header">
            <div class="weather-icon ${gt(t.condition||"clear")}">
              ${this.renderWeatherIcon(t.condition||"clear")}
            </div>
            <div class="datetime-content">
              <div class="time-large">${this.currentTime}</div>
              ${this.config.show_date?L`<div class="date-small">${this.currentDate}</div>`:""}
              <div class="temp-display">${Math.round(e)}${t.temperature_unit}</div>
            </div>
          </div>
        `}return L`
      <div class="card-header" style="background: ${i.color}; color: ${i.textColor};">
        ${s}
      </div>
    `}renderWeatherIcon(t){const e=gt(t);return L`<span class="icon-emoji">${{"clear-day":"☀️",cloudy:"☁️",rainy:"🌧️",snowy:"❄️",lightning:"⛈️",fog:"🌫️",windy:"💨"}[e]||"☀️"}</span>`}renderForecast(){const t=this.getWeatherData(),e=t.forecast?.slice(0,this.config.forecast_days||5)||[];return 0===e.length?L`<div class="no-forecast">No forecast data available</div>`:L`
      <div class="forecast-container">
        ${e.map(e=>this.renderForecastDay(e,t.temperature_unit||"°F"))}
      </div>
    `}renderForecastDay(t,e){const i=(s=t.datetime,new Date(s).toLocaleDateString("en-US",{weekday:"short"}));var s;const o=Math.round(t.temperature||0),r=Math.round(t.templow||0),n=t.precipitation_probability||0,a=o-r>0?r/o*70:30;return L`
      <div class="forecast-day">
        <div class="day-name">${i}</div>
        <div class="day-icon">
          ${this.renderWeatherIcon(t.condition||"clear")}
        </div>
        <div class="day-temp-range">
          <span class="temp-low">${r}°</span>
          <div class="temp-bar">
            <div class="temp-bar-low" style="width: ${a}%"></div>
            <div class="temp-bar-high" style="width: ${70-a}%"></div>
          </div>
          <span class="temp-high">${o}°</span>
        </div>
        ${n>0?L`
          <div class="precip-prob">${n}%</div>
        `:""}
      </div>
    `}render(){if(!this.hass||!this.config)return L``;if(!this.hass.states[this.config.entity])return L`
        <ha-card>
          <div class="error">Entity ${this.config.entity} not found</div>
        </ha-card>
      `;const t=this.getWeatherData(),e=t.forecast&&t.forecast.length>0,i=!1!==this.config.show_forecast&&e;return L`
      <ha-card>
        ${this.renderHeader()}
        ${i?L`
          <div class="card-content">
            ${this.renderForecast()}
          </div>
        `:""}
      </ha-card>
    `}static get styles(){return n`
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
        gap: 20px;
      }

      .greeting-header {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .minimal-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
      }

      .weather-icon {
        font-size: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 100px;
      }

      .icon-emoji {
        display: block;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
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
        margin-bottom: 8px;
      }

      .time-medium {
        font-size: 48px;
        font-weight: 300;
        line-height: 1;
        margin-bottom: 8px;
      }

      .time-small {
        font-size: 24px;
        font-weight: 300;
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
      }

      .temp-display {
        font-size: 28px;
        font-weight: 500;
        margin-top: 8px;
      }

      .greeting-text {
        font-size: 32px;
        font-weight: 500;
        margin-bottom: 8px;
      }

      .suggestion-text {
        font-size: 18px;
        opacity: 0.9;
        margin-bottom: 8px;
      }

      .card-content {
        padding: 20px;
      }

      .forecast-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .forecast-day {
        display: grid;
        grid-template-columns: 50px 50px 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 8px 0;
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
    `}};t([ht({attribute:!1})],wt.prototype,"hass",void 0),t([pt()],wt.prototype,"config",void 0),t([pt()],wt.prototype,"currentTime",void 0),t([pt()],wt.prototype,"currentDate",void 0),wt=t([ct("weatherpulse-card")],wt),window.customCards=window.customCards||[],window.customCards.push({type:"weatherpulse-card",name:"WeatherPulse Card",description:"A modern, highly configurable weather card for Home Assistant",preview:!0,documentationURL:"https://github.com/imCharlieB/WeatherPulse"}),console.info("%c WEATHERPULSE-CARD %c v0.1.0 ","color: white; background: #4facfe; font-weight: 700;","color: #4facfe; background: white; font-weight: 700;");export{wt as WeatherPulseCard};
