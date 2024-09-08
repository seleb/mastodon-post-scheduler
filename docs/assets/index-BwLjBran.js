(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const B=`<h1>mastodon-post-scheduler</h1>
<p>a basic web ui for scheduling posts on mastodon</p>
<h2>how to get an access token</h2>
<ul>
<li>create/login to a mastodon account</li>
<li>go to <code>Preferences &gt; Development &gt; New application</code></li>
<li>give it whatever name you'd like (this will show up in the app field of the post)</li>
<li>include the scopes <code>read:statuses</code>, <code>write:media</code>, and <code>write:statuses</code></li>
<li>once created, select it and copy <code>Your access token</code></li>
</ul>
<h2>notes</h2>
<ul>
<li>posts scheduled with this tool use your default language setting</li>
<li>instances have their own post length/attachment limits, which this tool does not check for you</li>
<li>this tool does not store any data: it fetches and posts on your behalf, but the actual scheduling is handled by your instance</li>
<li>when posts are scheduled in the near future, your instance may post them immediately instead of scheduling them (default is &lt;5min)</li>
<li>the &quot;in reply to&quot; field can be post URL or ID, but if it's from another instance, make sure to use the reference from your own instance instead of theirs</li>
</ul>
`,G="mastodon-post-scheduler",J="1.4.0",Z="a basic web ui for scheduling posts on mastodon",K={postversion:"npm run build",start:"vite --port 80",build:"vite build",serve:"vite preview",lint:'eslint "src/**/*.js"'},X={type:"git",url:"git+https://github.com/seleb/mastodon-post-scheduler.git"},Y="Sean S. LeBlanc <sean.s.leblanc@gmail.com>",Q="MIT",V={plugins:["@semantic-release/commit-analyzer","@semantic-release/release-notes-generator","@semantic-release/changelog","@semantic-release/npm","@semantic-release/github",["@semantic-release/git",{assets:["docs/**/*","CHANGELOG.md","package.json","package-lock.json"]}]]},ee={eslint:"^8.44.0","eslint-config-airbnb-base":"^15.0.0","eslint-config-prettier":"^8.8.0","eslint-plugin-import":"^2.27.5","eslint-plugin-prettier":"^4.2.1",masto:"^6.8.0",prettier:"^2.8.8","rollup-plugin-visualizer":"^5.9.2",sass:"^1.63.6",vite:"^5.4.3","vite-plugin-markdown":"^2.2.0-2"},te={private:!0,name:G,version:J,description:Z,scripts:K,repository:X,author:Y,license:Q,release:V,devDependencies:ee};function re(n,e){var t=Object.setPrototypeOf;t?t(n,e):n.__proto__=e}function ne(n,e){e===void 0&&(e=n.constructor);var t=Error.captureStackTrace;t&&t(n,e)}var se=function(){var n=function(t,r){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(s,o){s.__proto__=o}||function(s,o){for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(s[i]=o[i])},n(t,r)};return function(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");n(e,t);function r(){this.constructor=e}e.prototype=t===null?Object.create(t):(r.prototype=t.prototype,new r)}}(),S=function(n){se(e,n);function e(t,r){var s=this.constructor,o=n.call(this,t,r)||this;return Object.defineProperty(o,"name",{value:s.name,enumerable:!1,configurable:!0}),re(o,s.prototype),ne(o),o}return e}(Error);var v=function(){return v=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++){t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},v.apply(this,arguments)};function oe(n){return n.toLowerCase()}var ie=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],ae=/[^A-Z0-9]+/gi;function H(n,e){e===void 0&&(e={});for(var t=e.splitRegexp,r=t===void 0?ie:t,s=e.stripRegexp,o=s===void 0?ae:s,i=e.transform,c=i===void 0?oe:i,a=e.delimiter,u=a===void 0?" ":a,l=k(k(n,r,"$1\0$2"),o,"\0"),h=0,f=l.length;l.charAt(h)==="\0";)h++;for(;l.charAt(f-1)==="\0";)f--;return l.slice(h,f).split("\0").map(c).join(u)}function k(n,e,t){return e instanceof RegExp?n.replace(e,t):e.reduce(function(r,s){return r.replace(s,t)},n)}function z(n,e){var t=n.charAt(0),r=n.substr(1).toLowerCase();return e>0&&t>="0"&&t<="9"?"_"+t+r:""+t.toUpperCase()+r}function ce(n,e){return e===void 0&&(e={}),H(n,v({delimiter:"",transform:z},e))}function le(n,e){return e===0?n.toLowerCase():z(n,e)}function ue(n,e){return e===void 0&&(e={}),ce(n,v({transform:le},e))}function de(n,e){return e===void 0&&(e={}),H(n,v({delimiter:"."},e))}function _(n,e){return e===void 0&&(e={}),de(n,v({delimiter:"_"},e))}class E extends S{}class q extends S{constructor(e,t,r,s){super(e,s),this.contentType=t,this.data=r}}class M extends S{constructor(e,t){super(e.message,t),this.statusCode=e.statusCode,this.message=e.message,this.description=e.description,this.additionalProperties=e.additionalProperties,this.details=e.details}}class U extends S{}function N(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function g(n,e,t,r){function s(o){return o instanceof t?o:new t(function(i){i(o)})}return new(t||(t=Promise))(function(o,i){function c(l){try{u(r.next(l))}catch(h){i(h)}}function a(l){try{u(r.throw(l))}catch(h){i(h)}}function u(l){l.done?o(l.value):s(l.value).then(c,a)}u((r=r.apply(n,[])).next())})}const he=n=>new Promise(e=>setTimeout(()=>e(),n)),x=n=>typeof n=="object"&&n!==null&&n.constructor.name==="Object";function fe(){}const pe=n=>{const e=new Map;for(const t of n.split(",")){const r=t.match(/<([^>]+)>;\s*rel="([^"]+)"/);r&&e.set(r[2],r[1])}return e};class w{constructor(e,t,r,s,o="next"){this.http=e,this.nextPath=t,this.nextParams=r,this.meta=s,this.direction=o}next(){return g(this,void 0,void 0,function*(){if(this.nextPath==null)return{done:!0,value:void 0};const e=yield this.http.request(Object.assign({method:"GET",path:this.nextPath,search:this.nextParams},this.meta)),t=this.getLink(e.headers.get("link"));return this.nextPath=t==null?void 0:t.pathname,this.nextParams=t==null?void 0:t.search.replace(/^\?/,""),{done:!1,value:yield e.data}})}return(e){return g(this,void 0,void 0,function*(){return this.clear(),{done:!0,value:yield e}})}throw(e){return g(this,void 0,void 0,function*(){throw this.clear(),e})}then(e=Promise.resolve.bind(Promise),t=Promise.reject.bind(Promise)){return this.next().then(r=>e(r.value),t)}values(){return this[Symbol.asyncIterator]()}getDirection(){return this.direction}setDirection(e){return new w(this.http,this.nextPath,this.nextParams,this.meta,e)}[Symbol.asyncIterator](){return this}getLink(e){if(e==null)return;const t=pe(e).get(this.direction);if(t!=null)return new URL(t)}clear(){this.nextPath=void 0,this.nextParams=void 0}clone(){return new w(this.http,this.nextPath,this.nextParams,this.meta,this.direction)}}class me{constructor(e,t){this.http=e,this.hook=t}dispatch(e){this.hook!=null&&(e=this.hook.beforeDispatch(e));let t=this.hook.dispatch(e);if(t!==!1)return t;switch(e.type){case"fetch":{t=this.http.get(e.path,e.data,e.meta);break}case"create":{t=this.http.post(e.path,e.data,e.meta);break}case"update":{t=this.http.put(e.path,e.data,e.meta);break}case"remove":{t=this.http.delete(e.path,e.data,e.meta);break}case"list":{t=new w(this.http,e.path,e.data);break}}return t instanceof Promise?t.then(r=>{var s;return(s=this.hook)===null||s===void 0?void 0:s.afterDispatch(e,r)}):this.hook.afterDispatch(e,t)}}const b=(n,e={})=>{const{context:t=[],applicable:r=!1}=e;let s={};const o={get:ve(n,t)};return r&&(s=fe,o.apply=ye(n,t)),new Proxy(s,o)},ge=new Set(["then","catch","finally","inspect","toString","valueOf","toJSON","constructor","prototype","length","name","caller","callee","arguments","bind","apply","call"]),ve=(n,e)=>(t,r)=>{if(!(typeof r=="string"&&ge.has(r))){if(r===Symbol.dispose)return n[Symbol.dispose];if(typeof r!="symbol")return r.startsWith("$")?b(n,{context:[...e,r],applicable:!0}):b(n,{context:[...e,_(r)],applicable:!0})}},ye=(n,e)=>(t,r,s)=>{const o=e.pop();if(o==null)throw new Error("No action specified");if(o==="$select")return b(n,{context:[...e,...s],applicable:!0});const i="/"+e.join("/"),[c,a]=s;return n.dispatch({type:o,path:i,data:c,meta:a})};function W(n){return["fetch","create","update","remove","list"].includes(n)}function we(n){if(W(n))return n;switch(n){case"lookup":case"verify_credentials":return"fetch";case"update_credentials":return"update";default:return"create"}}function be(n,e){return n==="create"&&e==="/api/v1/accounts"||n==="update"&&e==="/api/v1/accounts/update_credentials"||n==="create"&&e==="/api/v1/email"||n==="create"&&e==="/api/v1/featured_tag"||n==="create"&&e==="/api/v1/media"||n==="create"&&e==="/api/v2/media"?"multipart-form":"json"}function Oe(n,e,t){return g(this,void 0,void 0,function*(){let r;const s=AbortSignal.timeout(e);for(;r==null;){if(s.aborted)throw new U(`Media processing timed out of ${e}ms`);try{yield he(1e3);const o=yield t.get(`/api/v1/media/${n}`);o.url!=null&&(r=o)}catch(o){if(o instanceof M&&o.statusCode===404)continue;throw o}}return r})}class Se{constructor(e,t=1e3*60){this.http=e,this.mediaTimeout=t}beforeDispatch(e){const t=we(e.type),r=W(e.type)?e.path:e.path+"/"+_(e.type),s=be(t,r),o=Object.assign(Object.assign({},e.meta),{encoding:s});return{type:t,path:r,data:e.data,meta:o}}dispatch(e){return e.type==="update"&&e.path==="/api/v1/accounts/update_credentials"?this.http.patch(e.path,e.data,e.meta):!1}afterDispatch(e,t){var r;if(e.type==="create"&&e.path==="/api/v2/media"){const s=t;return x(e.data)&&((r=e.data)===null||r===void 0?void 0:r.skipPolling)===!0?s:Oe(s.id,this.mediaTimeout,this.http)}return t}}const Ee=n=>{const e=new AbortController;for(const t of n)t.addEventListener("abort",()=>e.abort(),{once:!0});return e.signal},Pe=([n,...e])=>{const t=new Headers(n);for(const r of e)for(const[s,o]of new Headers(r).entries())t.set(s,o);return t};class Re{constructor(e,t){this.props=e,this.serializer=t}mergeRequestInitWithDefaults(e={}){const t=Object.assign({},this.props.requestInit);{const{headers:r,signal:s}=e,o=N(e,["headers","signal"]);Object.assign(t,o),t.headers=this.mergeHeadersWithDefaults(r),t.signal=this.mergeAbortSignalWithDefaults(s)}return t}resolvePath(e,t){const r=new URL(e,this.props.url);return typeof t=="string"?r.search=t:t!=null&&(r.search=this.serializer.serialize("querystring",t)),r}mergeHeadersWithDefaults(e={}){var t,r;const s=Pe([(r=(t=this.props.requestInit)===null||t===void 0?void 0:t.headers)!==null&&r!==void 0?r:{},e]),o=new Headers(s);return this.props.accessToken&&o.set("Authorization",`Bearer ${this.props.accessToken}`),new Headers(o)}mergeAbortSignalWithDefaults(e){var t;const r=[];return this.props.timeout!=null&&r.push(AbortSignal.timeout(this.props.timeout)),!((t=this.props.requestInit)===null||t===void 0)&&t.signal&&r.push(this.props.requestInit.signal),e!=null&&r.push(e),r.length===1?r[0]:Ee(r)}}class _e{get(e,t,r={}){return this.request(Object.assign({method:"GET",path:e,search:t},r)).then(s=>s.data)}post(e,t,r={}){return this.request(Object.assign({method:"POST",path:e,body:t},r)).then(s=>s.data)}delete(e,t,r={}){return this.request(Object.assign({method:"DELETE",path:e,body:t},r)).then(s=>s.data)}put(e,t,r={}){return this.request(Object.assign({method:"PUT",path:e,body:t},r)).then(s=>s.data)}patch(e,t,r={}){return this.request(Object.assign({method:"PATCH",path:e,body:t},r)).then(s=>s.data)}}const L=n=>{var e;const t=(e=n.get("Content-Type"))===null||e===void 0?void 0:e.replace(/\s*;.*$/,"");if(typeof t=="string")switch(t){case"application/json":return"json";case"multipart/form-data":return"multipart-form";default:return}};class xe extends _e{constructor(e,t,r){super(),this.serializer=e,this.config=t,this.logger=r}request(e){return g(this,void 0,void 0,function*(){var t,r,s,o,i;const c=this.createRequest(e);try{(t=this.logger)===null||t===void 0||t.log("info",`↑ ${c.method} ${c.url}`),(r=this.logger)===null||r===void 0||r.log("debug","	body",{encoding:e.encoding,body:e.body});const a=yield fetch(c);if(!a.ok)throw a;const u=yield a.text(),l=L(a.headers);if(l==null)throw new E("The server returned data with an unknown encoding.");const h=this.serializer.deserialize(l,u);return(s=this.logger)===null||s===void 0||s.log("info",`↓ ${c.method} ${c.url}`),(o=this.logger)===null||o===void 0||o.log("debug","	body",u),{headers:a.headers,data:h}}catch(a){throw(i=this.logger)===null||i===void 0||i.log("debug","HTTP failed",a),yield this.createError(a)}})}createRequest(e){const{method:t,path:r,search:s,encoding:o="json",requestInit:i={}}=e,c=this.config.resolvePath(r,s),a=this.serializer.serialize(o,e.body),u=this.config.mergeRequestInitWithDefaults(i),l=new Request(c,Object.assign({method:t,body:a},u));return typeof a=="string"&&o==="json"&&l.headers.set("Content-Type","application/json"),l}createError(e){return g(this,void 0,void 0,function*(){if(e instanceof Response){const t=L(e.headers);if(t==null)throw new E("The server returned data with an unknown encoding. The server may be down.");const r=this.serializer.deserialize(t,yield e.text()),{error:s,errorDescription:o,details:i}=r,c=N(r,["error","errorDescription","details"]);return new M({statusCode:e.status,message:s,description:o,details:i,additionalProperties:c},{cause:e})}return e!=null&&e.name==="TimeoutError"?new U("Request timed out",{cause:e}):e})}}class Ae{constructor(e){this.level=e}log(e,t,r){if(!this.level.satisfies(e))return;const s=r==null?[t]:[t,r];switch(e){case"debug":{console.debug(...s);return}case"info":{console.info(...s);return}case"warn":{console.warn(...s);return}case"error":{console.error(...s);return}}}}const d=Object.freeze({DEBUG:1,INFO:2,WARN:4,ERROR:8});class m{constructor(e){this.level=e}satisfies(e){switch(e){case"debug":return!!(this.level&d.DEBUG);case"info":return!!(this.level&d.INFO);case"warn":return!!(this.level&d.WARN);case"error":return!!(this.level&d.ERROR)}}static from(e){switch(e){case"debug":return new m(d.DEBUG|d.INFO|d.WARN|d.ERROR);case"info":return new m(d.INFO|d.WARN|d.ERROR);case"warn":return new m(d.WARN|d.ERROR);case"error":return new m(d.ERROR)}}}const Te=n=>{const e=m.from(n??"warn");return new Ae(e)},F=n=>{const e=(t,r="")=>Array.isArray(t)?t.flatMap((s,o)=>e(s,r==""?o.toString():n.onArray(r,o))):x(t)?Object.entries(t).flatMap(([s,o])=>e(o,r===""?s:n.onObject(r,s))):[[r,t]];return e},je=n=>{const e=F({onArray:(t,r)=>`${t}[${r}]`,onObject:(t,r)=>`${t}[${r}]`});return Object.fromEntries(e(n))},$e=n=>F({onArray:t=>`${t}[]`,onObject:(t,r)=>`${t}[${r}]`})(n).filter(([,t])=>t!=null).map(([t,r])=>`${t}=${encodeURIComponent(r)}`).join("&"),P=(n,e)=>Array.isArray(n)?n.map(t=>P(t,e)):x(n)?Object.fromEntries(Object.entries(n).map(([t,r])=>[e(t),P(r,e)])):n,C=(n,e)=>P(n,r=>r.includes(":")||r.startsWith("_")?r:e(r));class ke{serialize(e,t){const r=C(t,_);switch(e){case"json":return JSON.stringify(r);case"multipart-form":{const s=new FormData;for(const[o,i]of Object.entries(je(r)))s.append(o,i);return s}case"querystring":return $e(r);default:throw new E(`Unknown content type ${e} to serialize.`)}}deserialize(e,t){switch(e){case"json":try{return C(JSON.parse(t),ue)}catch{throw new q(`Malformed JSON ${t} returned from the server.`,e,t)}default:throw new q(`Unknown content type ${e} returned from the server.`,e,t)}}}const qe=n=>{const e=new ke,t=new Re(n,e),r=Te(n.log),s=new xe(e,t,r),o=new Se(s),i=new me(s,o);return b(i,{context:["api"]})};let y,I="";async function A(n,e){const t=`${n}:${e}`;return y&&I===t||(y=await qe({url:n,accessToken:e}),I=t),y}async function Le(n,e){const r=await(await A(n,e)).v1.scheduledStatuses.list({limit:500});return console.log(r),r}async function Ce(n,e,{scheduledAt:t,spoilerText:r,status:s,visibility:o,media:i,inReplyToId:c}){const a=await A(n,e);let u;i!=null&&i.length&&(console.log("uploading media"),u=[],await i.reduce(async(h,f)=>{console.log(f);const $=await a.v2.media.create({file:f.file,description:f.description});return u.push($.id),console.log("uploaded media",$),h},Promise.resolve())),console.log("posting",{scheduledAt:t,spoilerText:r,status:s,visibility:o,mediaIds:u});const l=await a.v1.statuses.create({scheduled_at:t,spoilerText:r,status:s,visibility:o,mediaIds:u,inReplyToId:c});console.log("posted",l)}async function Ie(n,e,t){const s=await(await A(n,e)).v1.scheduledStatuses.$select(t).remove();console.log("canceled",s)}const R=document.querySelector("#formPost");function T(){const n=new FormData(R),e=n.get("instance"),t=n.get("token");let r=n.get("scheduledAt");try{r=new Date(r).toISOString()}catch{r=null}const s=n.get("cw"),o=n.get("post"),i=n.get("visibility"),c=Array.from(j.querySelectorAll("li")).map(u=>({file:u.file,description:u.querySelector("textarea").value})),a=n.get("inReplyToId").replace(/(.*\/)?(\d+)$/,"$2");return{instance:e,token:t,scheduledAt:r,cw:s,post:o,visibility:i,media:c,inReplyToId:a}}const p=document.querySelector("#scheduledPosts");async function De(n){try{const e=n.currentTarget.value,t=T();await Ie(t.instance,t.token,e),await O()}catch(e){console.error(e),window.alert(`error canceling post: ${e.message} (see console for details)`)}}async function O(){const n=T();if(n.instance&&n.token)try{p.innerHTML="<li>loading...</li>";const e=await Le(n.instance,n.token);if(!e.length){p.innerHTML="<li>no scheduled posts</li>";return}e.sort((t,r)=>t.scheduledAt.localeCompare(r.scheduledAt)),p.innerHTML=e.map(t=>{const r=new Date(t.scheduledAt);return`
				<li>
					<i title="${t.params.visibility}">${{public:"🌎",unlisted:"🔓",private:"🔒",direct:"@"}[t.params.visibility]}</i> <time datetime=${r.toISOString()}>${r.toString()}</time>
					${t.params.spoilerText?`<details><summary>${t.params.spoilerText}</summary>${t.params.text}</details>`:`<div>${t.params.text}</div>`}
					
					${t.mediaAttachments.length?`<ul>
						${t.mediaAttachments.map(s=>`<li>
							<a href="${s.url}" target="_blank" rel="noopener noreferrer">
								<img loading="lazy" src="${s.previewUrl}" alt="${s.description}" title="${s.description}" />
							</a>
						</li>`).join(`
`)}
					</ul>`:""}
					<button value=${t.id} type="button">cancel</button>
				</li>`}).join(`
`),p.querySelectorAll("button").forEach(t=>{t.addEventListener("click",De)})}catch(e){console.error(e),p.innerHTML=`<li>error fetching posts: ${e.message} (see console for details)</li>`}else p.innerHTML="<li>instance + access token required to fetch posts</li>"}async function He(){try{const n=T();if(!n.scheduledAt)throw new Error("no scheduled date set");await Ce(n.instance,n.token,{scheduledAt:n.scheduledAt,spoilerText:n.cw,status:n.post,visibility:n.visibility,media:n.media,inReplyToId:n.inReplyToId}),R.querySelector("#cw").value="",R.querySelector("#post").value="",j.innerHTML=""}catch(n){console.error(n),window.alert(`error scheduling post: ${n.message} (see console for details)`)}}document.querySelector("#formPost").addEventListener("submit",async n=>{n.preventDefault(),n.submitter.value==="refresh posts"?(n.submitter.disabled=!0,await O(),n.submitter.disabled=!1):n.submitter.value==="schedule new post"&&(n.submitter.disabled=!0,await He(),n.submitter.disabled=!1,await O())});document.querySelector("#about").innerHTML=B;document.querySelector("#version").textContent=te.version;const j=document.querySelector("#listMedia"),D=document.querySelector("#media");D.addEventListener("change",n=>{Array.from(n.currentTarget.files).forEach(e=>{const t=document.createElement("li");t.innerHTML=`<span>${e.name} (${e.type})</span> <div></div> <label>description <textarea></textarea></label> <button type="button">remove</button>`,t.file=e,t.querySelector("button").addEventListener("click",()=>{t.remove()});let r;e.type.startsWith("image")?(r=document.createElement("img"),r.src=URL.createObjectURL(e)):e.type.startsWith("video")?(r=document.createElement("video"),r.src=URL.createObjectURL(e)):e.type.startsWith("audio")?(r=document.createElement("audio"),r.src=URL.createObjectURL(e)):(r=document.createElement("div"),r.textContent="no preview available"),t.querySelector("div").replaceWith(r),j.append(t)}),D.value=null});O();document.querySelector("#preloader").remove();
