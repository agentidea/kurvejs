var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},kurve;!function(e){function t(e){setTimeout(e,0)}function n(e,t){var n=e;return n._self=t,n}function o(e,t,n,o,r){var i=e;i._self=t;var s=e["@odata.nextLink"];return s&&(i._next=function(){return n.GetCollection(s,t,o,r)}),o&&i.forEach(function(e){return e._self=e.id&&o(e.id)}),i}var r=function(){function e(){}return e}();e.Error=r;var i;!function(e){e[e.Pending=0]="Pending",e[e.ResolutionInProgress=1]="ResolutionInProgress",e[e.Resolved=2]="Resolved",e[e.Rejected=3]="Rejected"}(i||(i={}));var s=function(){function e(e,t,n){this._dispatcher=e,this._successCB=t,this._errorCB=n,this.result=new a(e)}return e.prototype.resolve=function(e,t){var n=this;return"function"!=typeof this._successCB?void this.result.resolve(e):void(t?this._dispatcher(function(){return n._dispatchCallback(n._successCB,e)}):this._dispatchCallback(this._successCB,e))},e.prototype.reject=function(e,t){var n=this;return"function"!=typeof this._errorCB?void this.result.reject(e):void(t?this._dispatcher(function(){return n._dispatchCallback(n._errorCB,e)}):this._dispatchCallback(this._errorCB,e))},e.prototype._dispatchCallback=function(e,t){var n;try{n=e(t),this.result.resolve(n)}catch(o){return void this.result.reject(o)}},e}(),a=function(){function e(e){this._stack=[],this._state=i.Pending,this._dispatcher=e?e:t,this.promise=new c(this)}return e.prototype.DispatchDeferred=function(e){setTimeout(e,0)},e.prototype.then=function(e,t){if("function"!=typeof e&&"function"!=typeof t)return this.promise;var n=new s(this._dispatcher,e,t);switch(this._state){case i.Pending:case i.ResolutionInProgress:this._stack.push(n);break;case i.Resolved:n.resolve(this._value,!0);break;case i.Rejected:n.reject(this._error,!0)}return n.result.promise},e.prototype.resolve=function(e){return this._state!==i.Pending?this:this._resolve(e)},e.prototype._resolve=function(e){var t,n=this,o=typeof e,r=!0;try{if(null===e||"object"!==o&&"function"!==o||"function"!=typeof(t=e.then))this._state=i.ResolutionInProgress,this._dispatcher(function(){n._state=i.Resolved,n._value=e;var t,o=n._stack.length;for(t=0;o>t;t++)n._stack[t].resolve(e,!1);n._stack.splice(0,o)});else{if(e===this.promise)throw new TypeError("recursive resolution");this._state=i.ResolutionInProgress,t.call(e,function(e){r&&(r=!1,n._resolve(e))},function(e){r&&(r=!1,n._reject(e))})}}catch(s){r&&this._reject(s)}return this},e.prototype.reject=function(e){return this._state!==i.Pending?this:this._reject(e)},e.prototype._reject=function(e){var t=this;return this._state=i.ResolutionInProgress,this._dispatcher(function(){t._state=i.Rejected,t._error=e;var n=t._stack.length,o=0;for(o=0;n>o;o++)t._stack[o].reject(e,!1);t._stack.splice(0,n)}),this},e}();e.Deferred=a;var c=function(){function e(e){this._deferred=e}return e.prototype.then=function(e,t){return this._deferred.then(e,t)},e.prototype.fail=function(e){return this._deferred.then(void 0,e)},e}();e.Promise=c,function(e){e[e.v1=1]="v1",e[e.v2=2]="v2"}(e.EndPointVersion||(e.EndPointVersion={}));var h=e.EndPointVersion;!function(e){e[e.Client=1]="Client",e[e.Node=2]="Node"}(e.Mode||(e.Mode={}));var u=e.Mode,l=function(){function e(e,t,n,o,r){this.id=e,this.scopes=t,this.resource=n,this.token=o,this.expiry=r}return Object.defineProperty(e.prototype,"isExpired",{get:function(){return this.expiry<=new Date((new Date).getTime()+6e4)},enumerable:!0,configurable:!0}),e.prototype.hasScopes=function(e){var t=this;return this.scopes?e.every(function(e){return t.scopes.some(function(t){return e===t})}):!1},e}(),d=function(){function e(e){var t=this;this.tokenStorage=e,this.cachedTokens={},e&&e.getAll().forEach(function(e){var n=e.id,o=e.scopes,r=e.resource,i=e.token,s=e.expiry,a=new l(n,o,r,i,new Date(s));a.isExpired?t.tokenStorage.remove(a.id):t.cachedTokens[a.id]=a})}return e.prototype.add=function(e){this.cachedTokens[e.id]=e,this.tokenStorage&&this.tokenStorage.add(e.id,e)},e.prototype.getForResource=function(e){var t=this.cachedTokens[e];return t&&t.isExpired?(this.remove(e),null):t},e.prototype.getForScopes=function(e){for(var t in this.cachedTokens){var n=this.cachedTokens[t];if(n.hasScopes(e)){if(!n.isExpired)return n;this.remove(t)}}return null},e.prototype.clear=function(){this.cachedTokens={},this.tokenStorage&&this.tokenStorage.clear()},e.prototype.remove=function(e){this.tokenStorage&&this.tokenStorage.remove(e),delete this.cachedTokens[e]},e}(),p=function(){function e(){}return e}();e.IdToken=p;var f=function(){function e(e){var t=this;this.policy="",this.mode=u.Client,this.clientId=e.clientId,this.tokenProcessorUrl=e.tokenProcessingUri,this.version=e.version?e.version:h.v1,e.appSecret&&(this.appSecret=e.appSecret),this.mode=e.mode,this.mode===u.Client&&(this.tokenCache=new d(e.tokenStorage),window.addEventListener("message",function(e){if("id_token"===e.data.type)if(e.data.error){var n=new r;n.text=e.data.error,t.loginCallback(n)}else if(t.state!==e.data.state){var o=new r;o.statusText="Invalid state",t.loginCallback(o)}else t.decodeIdToken(e.data.token),t.loginCallback(null);else if("access_token"===e.data.type)if(e.data.error){var n=new r;n.text=e.data.error,t.getTokenCallback(null,n)}else{var i=e.data.token,s=document.getElementById("tokenIFrame");if(s.parentNode.removeChild(s),e.data.state!==t.state){var o=new r;o.statusText="Invalid state",t.getTokenCallback(null,o)}else t.getTokenCallback(i,null)}}))}return e.prototype.parseQueryString=function(e){var t=e||window.location.search||"",n=[],o={};if(t=t.replace(/.*?\?/,""),t.length){n=t.split("&");for(var r in n){var i=n[r].split("=")[0];i.length&&("undefined"==typeof o[i]&&(o[i]=[]),o[i].push(n[r].split("=")[1]))}}return o},e.prototype.token=function(e,t){var n=t.indexOf(e);if(0>n)return null;var o=t.indexOf("&",n+e.length);return t.substring(n,o>0?o:t.length)},e.prototype.checkForIdentityRedirect=function(){var e=(this.parseQueryString(window.location.href),this.token("#id_token=",window.location.href)),t=this.token("#access_token",window.location.href);if(e){return this.decodeIdToken(e),this.loginCallback&&this.loginCallback(null),!0}if(t)throw"Should not get here.  This should be handled via the iframe approach.";return!1},e.prototype.decodeIdToken=function(e){var t=this,n=this.base64Decode(e.substring(e.indexOf(".")+1,e.lastIndexOf("."))),o=JSON.parse(n),r=new Date(new Date("01/01/1970 0:0 UTC").getTime()+1e3*parseInt(o.exp));this.idToken=new p,this.idToken.FullToken=o,this.idToken.Token=e,this.idToken.Expiry=r,this.idToken.UPN=o.upn,this.idToken.TenantId=o.tid,this.idToken.FamilyName=o.family_name,this.idToken.GivenName=o.given_name,this.idToken.Name=o.name,this.idToken.PreferredUsername=o.preferred_username;var i=r.getTime()-(new Date).getTime()-3e5;this.refreshTimer=setTimeout(function(){t.renewIdToken()},i)},e.prototype.decodeAccessToken=function(e,t,n){var o=this.base64Decode(e.substring(e.indexOf(".")+1,e.lastIndexOf("."))),r=JSON.parse(o),i=new Date(new Date("01/01/1970 0:0 UTC").getTime()+1e3*parseInt(r.exp)),s=t||n.join(" "),a=new l(s,n,t,e,i);return a},e.prototype.getIdToken=function(){return this.idToken},e.prototype.isLoggedIn=function(){return this.idToken?this.idToken.Expiry>new Date:!1},e.prototype.renewIdToken=function(){clearTimeout(this.refreshTimer),this.login(function(){})},e.prototype.getCurrentEndPointVersion=function(){return this.version},e.prototype.getAccessTokenAsync=function(e){var t=new a;return this.getAccessToken(e,function(e,n){e?t.reject(e):t.resolve(n)}),t.promise},e.prototype.getAccessToken=function(e,t){var n=this;if(this.version!==h.v1){var o=new r;return o.statusText="Currently this identity class is using v2 OAuth mode. You need to use getAccessTokenForScopes() method",void t(o)}if(this.mode===u.Client){var i=this.tokenCache.getForResource(e);if(i)return t(null,i.token);this.getTokenCallback=function(o,r){if(r)t(r);else{var i=n.decodeAccessToken(o,e);n.tokenCache.add(i),t(null,o)}},this.nonce="token"+this.generateNonce(),this.state="token"+this.generateNonce();var s=document.createElement("iframe");s.style.display="none",s.id="tokenIFrame",s.src=this.tokenProcessorUrl+"?clientId="+encodeURIComponent(this.clientId)+"&resource="+encodeURIComponent(e)+"&redirectUri="+encodeURIComponent(this.tokenProcessorUrl)+"&state="+encodeURIComponent(this.state)+"&version="+encodeURIComponent(this.version.toString())+"&nonce="+encodeURIComponent(this.nonce)+"&op=token",document.body.appendChild(s)}else{var a=this.parseNodeCookies(this.req),c=this.NodeRetrieveDataCallBack("session|"+a.kurveSession),l=this.NodeRetrieveDataCallBack("code|"+c),d="grant_type=authorization_code&client_id="+encodeURIComponent(this.clientId)+"&code="+encodeURIComponent(l)+"&redirect_uri="+encodeURIComponent(this.tokenProcessorUrl)+"&resource="+encodeURIComponent(e)+"&client_secret="+encodeURIComponent(this.appSecret),p={host:"login.microsoftonline.com",port:"443",path:"/common/oauth2/token",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":d.length,accept:"*/*"}},f=this.https.request(p,function(o){o.setEncoding("utf8"),o.on("data",function(o){{var r=JSON.parse(o);n.decodeAccessToken(r.access_token,e)}t(null,r.access_token)})});f.write(d),f.end()}},e.prototype.parseNodeCookies=function(e){var t={},n=e.headers.cookie;return n&&n.split(";").forEach(function(e){var n=e.split("=");t[n.shift().trim()]=decodeURI(n.join("="))}),t},e.prototype.handleNodeCallback=function(e,t,n,o,r,i){var s=this;this.NodePersistDataCallBack=r,this.NodeRetrieveDataCallBack=i;var c=e.url;this.req=e,this.res=t,this.https=n;var u=this.parseQueryString(c),l=this.token("code=",c),d=(this.token("#access_token",c),this.parseNodeCookies(e)),p=new a;if(this.version===h.v1){if(l){var f=u.code[0],v=u.state[0],g=i("state|"+v);if(g)if("waiting"===g){var m=new Date((new Date).getTime()+864e5);r("state|"+v,"done",m);var y="grant_type=authorization_code&client_id="+encodeURIComponent(this.clientId)+"&code="+encodeURIComponent(f)+"&redirect_uri="+encodeURIComponent(this.tokenProcessorUrl)+"&resource="+encodeURIComponent("https://graph.microsoft.com")+"&client_secret="+encodeURIComponent(this.appSecret),k={host:"login.microsoftonline.com",port:"443",path:"/common/oauth2/token",method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":y.length,accept:"*/*"}},R=n.request(k,function(e){e.setEncoding("utf8"),e.on("data",function(e){var n=JSON.parse(e),i=JSON.parse(s.base64Decode(n.access_token.substring(n.access_token.indexOf(".")+1,n.access_token.lastIndexOf(".")))),a=i.upn,c=o.createHash("sha256");c.update(Math.random().toString());var h=c.digest("hex"),u=new Date((new Date).getTime()+18e5);r("session|"+h,a,u),r("code|"+a,f,u),t.writeHead(302,{"Set-Cookie":"kurveSession="+h,Location:"/"}),t.end(),p.resolve(!1)})});R.write(y),R.end()}else t.writeHead(500,"Replay detected",{"content-type":"text/plain"}),t.end("Replay detected"),p.resolve(!1);else t.writeHead(500,"State doesn't match",{"content-type":"text/plain"}),t.end("State doesn't match"),p.resolve(!1);return p.promise}if(d.kurveSession){var C=i("session|"+d.kurveSession);if(C)return p.resolve(!0),p.promise}var _=this.generateNonce(),m=new Date((new Date).getTime()+9e5);r("state|"+_,"waiting",m);var c="https://login.microsoftonline.com/common/oauth2/authorize?response_type=code&client_id="+encodeURIComponent(this.clientId)+"&redirect_uri="+encodeURIComponent(this.tokenProcessorUrl)+"&state="+encodeURIComponent(_);return t.writeHead(302,{Location:c}),t.end(),p.resolve(!1),p.promise}return p.resolve(!1),p.promise},e.prototype.getAccessTokenForScopesAsync=function(e,t){void 0===t&&(t=!1);var n=new a;return this.getAccessTokenForScopes(e,t,function(e,t){t?n.reject(t):n.resolve(e)}),n.promise},e.prototype.getAccessTokenForScopes=function(e,t,n){var o=this;if(this.version!==h.v2){var i=new r;return i.statusText="Dynamic scopes require v2 mode. Currently this identity class is using v1",void n(null,i)}var s=this.tokenCache.getForScopes(e);if(s)return n(s.token,null);if(this.getTokenCallback=function(r,i){if(i)t||!i.text?n(null,i):i.text.indexOf("AADSTS65001")>=0?o.getAccessTokenForScopes(e,!0,o.getTokenCallback):n(null,i);else{var s=o.decodeAccessToken(r,null,e);o.tokenCache.add(s),n(r,null)}},this.nonce="token"+this.generateNonce(),this.state="token"+this.generateNonce(),t)window.open(this.tokenProcessorUrl+"?clientId="+encodeURIComponent(this.clientId)+"&scopes="+encodeURIComponent(e.join(" "))+"&redirectUri="+encodeURIComponent(this.tokenProcessorUrl)+"&version="+encodeURIComponent(this.version.toString())+"&state="+encodeURIComponent(this.state)+"&nonce="+encodeURIComponent(this.nonce)+"&op=token","_blank");else{var a=document.createElement("iframe");a.style.display="none",a.id="tokenIFrame",a.src=this.tokenProcessorUrl+"?clientId="+encodeURIComponent(this.clientId)+"&scopes="+encodeURIComponent(e.join(" "))+"&redirectUri="+encodeURIComponent(this.tokenProcessorUrl)+"&version="+encodeURIComponent(this.version.toString())+"&state="+encodeURIComponent(this.state)+"&nonce="+encodeURIComponent(this.nonce)+"&login_hint="+encodeURIComponent(this.idToken.PreferredUsername)+"&domain_hint="+encodeURIComponent("9188040d-6c67-4c5b-b112-36a304b66dad"===this.idToken.TenantId?"consumers":"organizations")+"&op=token",document.body.appendChild(a)}},e.prototype.loginAsync=function(e){var t=new a;return this.login(function(e){e?t.reject(e):t.resolve(null)},e),t.promise},e.prototype.login=function(e,t){if(this.loginCallback=e,t||(t={}),t.policy&&(this.policy=t.policy),t.scopes&&this.version===h.v1){var n=new r;return n.text="Scopes can only be used with OAuth v2.",void e(n)}if(t.policy&&!t.tenant){var n=new r;return n.text="In order to use policy (AAD B2C) a tenant must be specified as well.",void e(n)}this.state="login"+this.generateNonce(),this.nonce="login"+this.generateNonce();var o=this.tokenProcessorUrl+"?clientId="+encodeURIComponent(this.clientId)+"&redirectUri="+encodeURIComponent(this.tokenProcessorUrl)+"&state="+encodeURIComponent(this.state)+"&nonce="+encodeURIComponent(this.nonce)+"&version="+encodeURIComponent(this.version.toString())+"&op=login&p="+encodeURIComponent(this.policy);t.tenant&&(o+="&tenant="+encodeURIComponent(t.tenant)),this.version===h.v2&&(t.scopes||(t.scopes=[]),t.scopes.indexOf("profile")<0&&t.scopes.push("profile"),t.scopes.indexOf("openid")<0&&t.scopes.push("openid"),o+="&scopes="+encodeURIComponent(t.scopes.join(" "))),window.open(o,"_blank")},e.prototype.loginNoWindowAsync=function(e){var t=new a;return this.loginNoWindow(function(e){e?t.reject(e):t.resolve(null)},e),t.promise},e.prototype.loginNoWindow=function(e,t){this.loginCallback=e,this.state="clientId="+this.clientId+"&tokenProcessorUrl="+this.tokenProcessorUrl,this.nonce=this.generateNonce();var n=this.checkForIdentityRedirect();if(!n){var o=t?t:window.location.href.split("#")[0],r="https://login.microsoftonline.com/common/oauth2/authorize?response_type=id_token&client_id="+encodeURIComponent(this.clientId)+"&redirect_uri="+encodeURIComponent(o)+"&state="+encodeURIComponent(this.state)+"&nonce="+encodeURIComponent(this.nonce);window.location.href=r}},e.prototype.logOut=function(){this.tokenCache.clear();var e="https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri="+encodeURI(window.location.href);window.location.href=e},e.prototype.base64Decode=function(e){var t,n,o,r,i={},s=0,a=0,c="",h=String.fromCharCode,u=e.length,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(t=0;64>t;t++)i[l.charAt(t)]=t;for(o=0;u>o;o++)for(n=i[e.charAt(o)],s=(s<<6)+n,a+=6;a>=8;)((r=s>>>(a-=8)&255)||u-2>o)&&(c+=h(r));return c},e.prototype.generateNonce=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;32>n;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e},e}();e.Identity=f;var v=function(){function e(e,t,n){this.req=null,this.accessToken=null,this.KurveIdentity=null,this.defaultResourceID="https://graph.microsoft.com",this.baseUrl="https://graph.microsoft.com/v1.0",n&&(this.https=n),this.mode=t,e.defaultAccessToken?this.accessToken=e.defaultAccessToken:this.KurveIdentity=e.identity}return Object.defineProperty(e.prototype,"me",{get:function(){return new j(this,this.baseUrl)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"users",{get:function(){return new D(this,this.baseUrl)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"groups",{get:function(){return new E(this,this.baseUrl)},enumerable:!0,configurable:!0}),e.prototype.Get=function(e,t,o,i){console.log("GET",e,o);var s=new a;return this.get(e,function(e,o){if(i)s.resolve(n(o,t));else{var a=JSON.parse(o);if(a.error){var c=new r;return c.other=a.error,void s.reject(c)}s.resolve(n(a,t))}},i,o),s.promise},e.prototype.GetCollection=function(e,t,n,i){var s=this;console.log("GET collection",e,i);var c=new a;return this.get(e,function(e,a){var h=JSON.parse(a);if(h.error){var u=new r;return u.other=h.error,void c.reject(u)}c.resolve(o(h,t,s,n,i))},null,i),c.promise},e.prototype.Post=function(e,t,n,o){console.log("POST",t,o);var r=new a;return r.promise},e.prototype.get=function(e,t,n,o){var r=this;if(this.mode===u.Client){var i=new XMLHttpRequest;n&&(i.responseType=n),i.onreadystatechange=function(){4===i.readyState&&(200===i.status?t(null,n?i.response:i.responseText):t(r.generateError(i)))},i.open("GET",e),this.addAccessTokenAndSend(i,function(e){e&&t(e)},o)}else{this.findAccessToken(function(o,i){var s=e.substr(27,e.length),a={host:"graph.microsoft.com",port:"443",path:s,method:"GET",headers:{"Content-Type":n?n:"application/json",accept:"*/*",Authorization:"Bearer "+o}},c=r.https.request(a,function(e){e.setEncoding("utf8"),e.on("data",function(e){t(null,e)})});c.end()},o)}},e.prototype.findAccessToken=function(e,t){this.accessToken?e(this.accessToken,null):t?this.KurveIdentity.getAccessTokenForScopes(t,!1,function(t,n){n?e(null,n):e(t,null)}):this.KurveIdentity.getAccessToken(this.defaultResourceID,function(t,n){t?e(null,t):e(n,null)})},e.prototype.post=function(e,t,n,o,r){},e.prototype.generateError=function(e){var t=new r;return t.status=e.status,t.statusText=e.statusText,""===e.responseType||"text"===e.responseType?t.text=e.responseText:t.other=e.response,t},e.prototype.addAccessTokenAndSend=function(e,t,n){this.findAccessToken(function(n,o){n?(e.setRequestHeader("Authorization","Bearer "+n),e.send()):t(o)},n)},e}();e.Graph=v;var g=function(){function e(){}return e.rootUrl="https://graph.microsoft.com/",e.General={OpenId:"openid",OfflineAccess:"offline_access"},e.User={Read:e.rootUrl+"User.Read",ReadAll:e.rootUrl+"User.Read.All",ReadWrite:e.rootUrl+"User.ReadWrite",ReadWriteAll:e.rootUrl+"User.ReadWrite.All",ReadBasicAll:e.rootUrl+"User.ReadBasic.All"},e.Contacts={Read:e.rootUrl+"Contacts.Read",ReadWrite:e.rootUrl+"Contacts.ReadWrite"},e.Directory={ReadAll:e.rootUrl+"Directory.Read.All",ReadWriteAll:e.rootUrl+"Directory.ReadWrite.All",AccessAsUserAll:e.rootUrl+"Directory.AccessAsUser.All"},e.Group={ReadAll:e.rootUrl+"Group.Read.All",ReadWriteAll:e.rootUrl+"Group.ReadWrite.All",AccessAsUserAll:e.rootUrl+"Directory.AccessAsUser.All"},e.Mail={Read:e.rootUrl+"Mail.Read",ReadWrite:e.rootUrl+"Mail.ReadWrite",Send:e.rootUrl+"Mail.Send"},e.Calendars={Read:e.rootUrl+"Calendars.Read",ReadWrite:e.rootUrl+"Calendars.ReadWrite"},e.Files={Read:e.rootUrl+"Files.Read",ReadAll:e.rootUrl+"Files.Read.All",ReadWrite:e.rootUrl+"Files.ReadWrite",ReadWriteAppFolder:e.rootUrl+"Files.ReadWrite.AppFolder",ReadWriteSelected:e.rootUrl+"Files.ReadWrite.Selected"},e.Tasks={ReadWrite:e.rootUrl+"Tasks.ReadWrite"},e.People={Read:e.rootUrl+"People.Read",ReadWrite:e.rootUrl+"People.ReadWrite"},e.Notes={Create:e.rootUrl+"Notes.Create",ReadWriteCreatedByApp:e.rootUrl+"Notes.ReadWrite.CreatedByApp",Read:e.rootUrl+"Notes.Read",ReadAll:e.rootUrl+"Notes.Read.All",ReadWriteAll:e.rootUrl+"Notes.ReadWrite.All"},e}();e.Scopes=g;var m=function(e,t){return e?e+(t?"&"+t:""):t},y=function(){function e(e){var t=this;this.query=e,this.toString=function(){return t.query},this.odata=function(e){return t.query=m(t.query,e),t},this.select=function(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];return t.odata("$select="+e.join(","))},this.expand=function(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];return t.odata("$expand="+e.join(","))},this.filter=function(e){return t.odata("$filter="+e)},this.orderby=function(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];return t.odata("$orderby="+e.join(","))},this.top=function(e){return t.odata("$top="+e)},this.skip=function(e){return t.odata("$skip="+e)}}return e}();e.OData=y;var k=function(e,t){var n=t&&t.toString();return e+(n?"?"+n:"")};e.singletonFromResponse=n,e.collectionFromResponse=o;var R=function(){function e(e,t){var n=this;this.graph=e,this.path=t,this.scopesForV2=function(e){return n.graph.KurveIdentity&&n.graph.KurveIdentity.getCurrentEndPointVersion()===h.v2?e:null},this.pathWithQuery=function(e,t){return void 0===t&&(t=""),k(n.path+t,e)}}return e}();e.Node=R;var C=function(e){function t(){var t=this;e.apply(this,arguments),this.pathWithQuery=function(e,n){return void 0===n&&(n=""),t._nextLink||k(t.path+n,e)}}return __extends(t,e),Object.defineProperty(t.prototype,"nextLink",{set:function(e){this._nextLink=e},enumerable:!0,configurable:!0}),t}(R);e.CollectionNode=C;var _=function(e){function t(n,o,r,i){var s=this;void 0===o&&(o=""),e.call(this,n,o+(i?"/"+i:"")),this.context=r,this.GetAttachment=function(e){return s.graph.Get(s.pathWithQuery(e),s,s.scopesForV2(t.scopes[s.context]))}}return __extends(t,e),t.scopes={messages:[g.Mail.Read],events:[g.Calendars.Read]},t}(R);e.Attachment=_;var U=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+"/attachments"),this.context=o,this.$=function(e){return new _(r.graph,r.path,r.context,e)},this.GetAttachments=function(e){return r.graph.GetCollection(r.pathWithQuery(e),r,r.$,r.scopesForV2(_.scopes[r.context]))}}return __extends(t,e),t}(C);e.Attachments=U;var w=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+(o?"/"+o:"")),this.GetMessage=function(e){return r.graph.Get(r.pathWithQuery(e),r,r.scopesForV2([g.Mail.Read]))},this.SendMessage=function(e){return r.graph.Post(null,r.pathWithQuery(e,"/microsoft.graph.sendMail"),r,r.scopesForV2([g.Mail.Send]))}}return __extends(t,e),Object.defineProperty(t.prototype,"attachments",{get:function(){return new U(this.graph,this.path,"messages")},enumerable:!0,configurable:!0}),t}(R);e.Message=w;var T=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/messages"),this.$=function(e){return new w(o.graph,o.path,e)},this.GetMessages=function(e){return o.graph.GetCollection(o.pathWithQuery(e),o,o.$,o.scopesForV2([g.Mail.Read]))},this.CreateMessage=function(e,t){return o.graph.Post(e,o.pathWithQuery(t),o,o.scopesForV2([g.Mail.ReadWrite]))}}return __extends(t,e),t}(C);e.Messages=T;var I=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+(o?"/"+o:"")),this.GetEvent=function(e){return r.graph.Get(r.pathWithQuery(e),r,r.scopesForV2([g.Calendars.Read]))}}return __extends(t,e),Object.defineProperty(t.prototype,"attachments",{get:function(){return new U(this.graph,this.path,"events")},enumerable:!0,configurable:!0}),t}(R);e.Event=I;var b=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/events"),this.$=function(e){return new I(o.graph,o.path,e)},this.GetEvents=function(e){return o.graph.GetCollection(o.pathWithQuery(e),o,o.$,o.scopesForV2([g.Calendars.Read]))}}return __extends(t,e),t}(C);e.Events=b;var A=function(e){function t(n,o){var r=this;void 0===o&&(o=""),e.call(this,n,o+t.suffix),this.$=function(e){return new I(r.graph,r.path,e)},this.dateRange=function(e,t){return"startDateTime="+e.toISOString()+"&endDateTime="+t.toISOString()},this.GetCalendarView=function(e){return r.graph.GetCollection(r.pathWithQuery(e),r,r.$,r.scopesForV2([g.Calendars.Read]))}}return __extends(t,e),t.suffix="/calendarView",t}(C);e.CalendarView=A;var x=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+(o?"/"+o:"")),this.GetMailFolder=function(e){return r.graph.Get(r.pathWithQuery(e),r,r.scopesForV2([g.Mail.Read]))}}return __extends(t,e),t}(R);e.MailFolder=x;var S=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/mailFolders"),this.$=function(e){return new x(o.graph,o.path,e)},this.GetMailFolders=function(e){return o.graph.GetCollection(o.pathWithQuery(e),o,o.$,o.scopesForV2([g.Mail.Read]))}}return __extends(t,e),t}(C);e.MailFolders=S;var P=function(e){function t(n,o,r){var i=this;void 0===o&&(o=""),e.call(this,n,o+"/photo"),this.context=r,this.GetPhotoProperties=function(e){return i.graph.Get(i.pathWithQuery(e),i,i.scopesForV2(t.scopes[i.context]))},this.GetPhotoImage=function(e){return i.graph.Get(i.pathWithQuery(e,"/$value"),i,i.scopesForV2(t.scopes[i.context]),"blob")}}return __extends(t,e),t.scopes={user:[g.User.ReadBasicAll],group:[g.Group.ReadAll],contact:[g.Contacts.Read]},t}(R);e.Photo=P;var G=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/manager"),this.GetManager=function(e){return o.graph.Get(o.pathWithQuery(e),o,o.scopesForV2([g.User.ReadAll]))}}return __extends(t,e),t}(R);e.Manager=G;var F=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/memberOf"),this.GetGroups=function(e){return o.graph.GetCollection(o.pathWithQuery(e),o,E.$(o.graph),o.scopesForV2([g.User.ReadAll]))}}return __extends(t,e),t}(C);e.MemberOf=F;var W=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+"/"+o),this.graph=t,this.GetDirectReport=function(e){return r.graph.Get(r.pathWithQuery(e),r,r.scopesForV2([g.User.Read]))}}return __extends(t,e),t}(R);e.DirectReport=W;var O=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/directReports"),this.$=function(e){return new W(o.graph,o.path,e)},this.GetDirectReports=function(e){return o.graph.GetCollection(o.pathWithQuery(e),o,D.$(o.graph),o.scopesForV2([g.User.Read]))}}return __extends(t,e),t}(C);e.DirectReports=O;var j=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,o?n+"/"+o:n+"/me"),this.graph=t,this.GetUser=function(e){return r.graph.Get(r.pathWithQuery(e),r,r.scopesForV2([g.User.Read]))}}return __extends(t,e),Object.defineProperty(t.prototype,"messages",{get:function(){return new T(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"events",{get:function(){return new b(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"calendarView",{get:function(){return new A(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mailFolders",{get:function(){return new S(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"photo",{get:function(){return new P(this.graph,this.path,"user")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"manager",{get:function(){return new G(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"directReports",{get:function(){return new O(this.graph,this.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"memberOf",{get:function(){return new F(this.graph,this.path)},enumerable:!0,configurable:!0}),t}(R);e.User=j;var D=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/users"),this.$=function(e){return new j(o.graph,o.path,e)},this.GetUsers=function(e){return o.graph.GetCollection(o.pathWithQuery(e),o,o.$,o.scopesForV2([g.User.Read]))}}return __extends(t,e),t.$=function(e){return e.users.$},t}(C);e.Users=D;var N=function(e){function t(t,n,o){var r=this;void 0===n&&(n=""),e.call(this,t,n+"/"+o),this.graph=t,this.GetGroup=function(e){return r.graph.Get(r.pathWithQuery(e),r,r.scopesForV2([g.Group.ReadAll]))}}return __extends(t,e),t}(R);e.Group=N;var E=function(e){function t(t,n){var o=this;void 0===n&&(n=""),e.call(this,t,n+"/groups"),this.$=function(e){return new N(o.graph,o.path,e)},this.GetGroups=function(e){return o.graph.GetCollection(o.pathWithQuery(e),o,o.$,o.scopesForV2([g.Group.ReadAll]))}}return __extends(t,e),t.$=function(e){return e.groups.$},t}(C);e.Groups=E}(kurve||(kurve={}));