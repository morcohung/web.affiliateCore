(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["HomePage"],{"0e4a":function(t,e,a){"use strict";a("3db9")},"3db9":function(t,e,a){},"5ac6":function(t,e,a){"use strict";a("9817")},"740e":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"static-content-page"},[a("v-runtime-template",{attrs:{template:this.StaticContent.body}})],1)},i=[],s=a("5530"),o=a("8860"),r=a("da13"),c=a("1baa"),l=a("5d23"),d=a("a523"),u=a("8dd9"),m=a("b0af"),p=a("0fd9"),g=a("62ad"),h=a("ce7e"),f=a("99d9"),v=a("a797"),V=a("169a"),b=a("8336"),C=a("2fa4"),x=a("40dc"),S=a("adda"),_=a("8212"),I=a("132d"),O=(a("58ca"),a("a026")),y=a("2f62"),L=a("dd1e"),$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("VContainer",[a("h1",{staticClass:"text-xxxl mb-8"},[t._v(t._s(t.title))]),a("VSheet",{staticClass:"mb-4",attrs:{color:"transparent"}},[t._t("default",[a("div",{staticClass:"static-page--content"},[a("p",[t._v(t._s(t.message))])])]),a("VList",{staticClass:"rounded-lg",attrs:{outlined:""}},[a("VListItemGroup",[t._t("list-items")],2)],1)],2)],1)},w=[],j=O["default"].extend({name:"StaticListPage",props:["title","message"]}),k=j,P=a("2877"),A=a("6544"),D=a.n(A),B=Object(P["a"])(k,$,w,!1,null,null,null),E=B.exports;D()(B,{VContainer:d["a"],VList:o["a"],VListItemGroup:c["a"],VSheet:u["a"]});var H=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("VListItem",{on:{click:function(e){e.stopPropagation(),t.toggleDialog=!0}}},[t._v(" "+t._s(t.text)+" ")]),a("VDialog",{attrs:{"content-class":t.$vuetify.breakpoint.mdAndUp?"static-content-dialog desktop-drawer":"static-content-dialog mobile-drawer",transition:"v-slide-x-reverse"},model:{value:t.toggleDialog,callback:function(e){t.toggleDialog=e},expression:"toggleDialog"}},[a("VSheet",{attrs:{color:"'transparent'"}},[a("VAppBar",{attrs:{height:"auto",flat:"",absolute:"",color:"white"}},[a("VBtn",{staticClass:"ml-n3",attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.toggleDialog=!1}}},[a("span",{staticClass:"betfont icon-stick-arrow-left"})])],1),a("div",{staticClass:"v-app-bar"}),a("VDivider"),t._t("default")],2)],1)],1)},T=[],R=O["default"].extend({name:"StaticListItem",data:function(){return{toggleDialog:!1}},props:["text"]}),M=R,N=Object(P["a"])(M,H,T,!1,null,null,null),U=N.exports;D()(N,{VAppBar:x["a"],VBtn:b["a"],VDialog:V["a"],VDivider:h["a"],VListItem:r["a"],VSheet:u["a"]});var F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("StaticListItem",{attrs:{text:this.text}},[[a("div",{staticClass:"pa-8"},[a("h2",{staticClass:"text-xxxl mb-8"},[t._t("dialog-title"),t._v(" "+t._s(t.dialogTitle)+" ")],2),a("div",[a("p",{staticClass:"text-md"},[t._t("default")],2)]),t._t("external")],2)]],2)],1)},G=[],W=O["default"].extend({name:"StaticListItemAdv",props:["text","dialogTitle"],components:{StaticListItem:U}}),q=W,J=Object(P["a"])(q,F,G,!1,null,null,null),Z=J.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("VContainer",[a("h1",{staticClass:"text-xxxl mb-8"},[t._v(" "+t._s(t.title)+" ")]),a("VSheet",{staticClass:"mb-4",attrs:{color:"transparent"}},[a("div",{staticClass:"static-page--content"},[a("p",[t._v(t._s(t.message))])]),a("VCard",{staticClass:"rounded-lg",attrs:{flat:!t.$vuetify.breakpoint.smAndDown,color:t.$vuetify.breakpoint.smAndDown?"undefined":"transparent"}},[a("VRow",{attrs:{dense:""}},[t._t("default")],2)],1)],1)],1)},K=[],Q=O["default"].extend({name:"StaticContactPage",props:["title","message"]}),X=Q,Y=Object(P["a"])(X,z,K,!1,null,null,null),tt=Y.exports;D()(Y,{VCard:m["a"],VContainer:d["a"],VRow:p["a"],VSheet:u["a"]});var et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("VCol",{attrs:{cols:"12",sm:"6"}},[a("VCard",{staticClass:"rounded-lg",attrs:{flat:!!t.$vuetify.breakpoint.smAndDown,color:t.$vuetify.breakpoint.smAndDown?"transparent":"undefined"}},[a("VCardText",{staticClass:"d-flex align-center"},[t._t("default",[a("div",{class:t.iconName+" pa-3 pr-7 betfont text-md"}),a("div",[a("h4",{staticClass:"text-md"},[a("a",{staticClass:"text-decoration-none text--primary",attrs:{href:t.hrefLink}},[t._v(t._s(t.hrefText))])]),a("h3",{staticClass:"text-sm text--disabled"},[t._v(t._s(t.quoteText))])])])],2)],1)],1)},at=[],nt=O["default"].extend({name:"StaticContactItem",props:["iconName","hrefLink","hrefText","quoteText"]}),it=nt,st=Object(P["a"])(it,et,at,!1,null,null,null),ot=st.exports;D()(st,{VCard:m["a"],VCardText:f["c"],VCol:g["a"]});var rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("VRow",{attrs:{dense:""}},[a("VCol",{attrs:{cols:"12",lg:"6"}},[t._t("default",[a("section",[a("VCard",{attrs:{elevation:"4",outlined:"","min-height":"25rem"}},[a("VImg",{staticClass:"d-flex align-end",attrs:{src:"https://doc.188contents.com/contents/aff/Images/Affiliates/TVScreen/888x400-sample-image.jpg",height:"25.25rem",gradient:"to top , rgba(0,0,0,0) 25%, rgba(0,0,0,0)"}},[a("div",{staticClass:"pa-4 text-center"},[a("h1",{staticClass:"black--text text-xxxl  font-weight-bold"},[t._v(" OFFICIAL APAC SPONSOR OF FORMULA 1® ")]),a("h2",{staticClass:"gray--text text-md mb-2"},[t._v(" Sign up, promote us and start earning. ")]),a("VBtn",{attrs:{depressed:"",color:"primary mb-2",to:{path:"/"+this.$route.params.lang+"/Register"}}},[t._v("Sign Up")]),a("div",{staticClass:"text--disabled"},[t._v(" Already have an account? "),a("router-link",{attrs:{to:{path:"/"+this.$route.params.lang+"/Login"}}},[t._v("Log in")])],1)],1)])],1)],1)])],2),a("VCol",{attrs:{cols:"12",lg:"6"}},[a("VRow",{attrs:{dense:""}},[a("VCol",{attrs:{cols:"12",sm:"4",lg:"12"}},[t._t("banner-1")],2),a("VCol",{attrs:{cols:"12",sm:"4",lg:"12"}},[t._t("banner-2")],2),a("VCol",{attrs:{cols:"12",sm:"4",lg:"12"}},[t._t("banner-3")],2)],1)],1)],1)],1)},ct=[],lt=O["default"].extend({name:"StaticHomePage"}),dt=lt,ut=Object(P["a"])(dt,rt,ct,!1,null,null,null),mt=ut.exports;D()(ut,{VBtn:b["a"],VCard:m["a"],VCol:g["a"],VImg:S["a"],VRow:p["a"]});var pt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("VCard",{attrs:{elevation:"4",outlined:"","min-height":"25rem"}},[a("VImg",{staticClass:"d-flex align-end",attrs:{src:this.backgroundImagePath,height:"25.25rem",gradient:"to top , rgba(0,0,0,0) 25%, rgba(0,0,0,0)"}},[t._t("default",[a("div",{staticClass:"pa-4 text-center"},[a("h1",{staticClass:"black--text text-xxxl  font-weight-bold"},[t._v(" "+t._s(this.titlePrimary)+" ")]),a("h2",{staticClass:"gray--text text-md mb-2"},[t._v(" "+t._s(this.titleSecondary)+" ")]),a("VBtn",{attrs:{depressed:"",color:"primary mb-2",to:{path:"/"+this.$route.params.lang+"/Register"}}},[t._v("Sign Up")]),a("div",{staticClass:"text--disabled"},[t._v(" Already have an account? "),a("router-link",{attrs:{to:{path:"/"+this.$route.params.lang+"/Login"}}},[t._v("Log in")])],1)],1)])],2)],1)],1)},gt=[],ht=O["default"].extend({name:"StaticBannerMain",props:["backgroundImagePath","titlePrimary","titleSecondary",""]}),ft=ht,vt=Object(P["a"])(ft,pt,gt,!1,null,null,null),Vt=vt.exports;D()(vt,{VBtn:b["a"],VCard:m["a"],VImg:S["a"]});var bt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("router-link",{staticClass:"text-decoration-none",attrs:{to:{path:"/"+this.$route.params.lang+"/"+this.linkAddress.replace(/^\/+|\/+$/g,"")}}},[a("section",{staticStyle:{height:"100%"}},[a("VCard",{attrs:{elevation:"4",outlined:"",height:"100%","min-height":"8rem"}},[a("VImg",{staticClass:"d-flex align-center",attrs:{src:this.backgroundImagePath,"min-height":"8rem"}},[a("div",{staticClass:"d-flex align-center pa-4"},[a("VAvatar",{attrs:{color:"black"}},[a("span",{staticClass:"white--text"},[t._t("icon",[a("svg",{staticStyle:{width:"24px",height:"24px","margin-top":".2em"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"}})])])],2)]),t._t("default",[a("div",{staticClass:"px-4"},[a("h1",{staticClass:"black--text text-md  font-weight-bold"},[t._v(" "+t._s(this.titlePrimary)+" ")]),a("h2",{staticClass:"text--secondary text-sm mb-2",staticStyle:{"line-height":"1.2em"}},[t._v(" "+t._s(this.titleSecondary)+" ")])])])],2)])],1)],1)])],1)},Ct=[],xt=O["default"].extend({name:"StaticBannerItem",props:["backgroundImagePath","linkAddress","titlePrimary","titleSecondary"]}),St=xt,_t=Object(P["a"])(St,bt,Ct,!1,null,null,null),It=_t.exports;D()(_t,{VAvatar:_["a"],VCard:m["a"],VImg:S["a"]});var Ot=O["default"].extend({name:"StaticContent",data:function(){return{language:"",resourceName:"",showMoreDetails:!1}},metaInfo:function(){return this.StaticContent.metaInfo},beforeMount:function(){this.loadStaticPage()},computed:Object(s["a"])(Object(s["a"])({},Object(y["d"])("Web",["StaticContent"])),Object(y["d"])("Web",["showLoginDialog","showSignUpDialog"])),watch:{$route:"loadStaticPage"},methods:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(y["b"])("Web",["fetchStaticContent"])),Object(y["b"])("Web",["setShowLoginDialog","setShowSignUpDialog"])),{},{openLoginDialog:function(){this.setShowLoginDialog(!0)},openSignUpDialog:function(){this.setShowSignUpDialog(!0)},loadStaticPage:function(){var t;this.language=this.$route.params.lang,this.resourceName=null!==(t=this.$route.params.viewName)&&void 0!==t?t:"Home";var e={Language:this.language,ResourceName:this.resourceName,VueElements:["VList","VListItem","VListItemGroup","VListItemTitle","VListItemSubtitle","VContainer","VSheet","VCard","VRow","VCol","VDivider","VCardText","VOverlay","VDialog","VBtn","VSpacer","VAppBar","VImg","VAvatar","VIcon","StaticListPage","StaticListItem","StaticListItemAdv","StaticContactPage","StaticContactItem","StaticHomePage","StaticBannerMain","StaticBannerItem"]};this.fetchStaticContent(e)}}),components:{VRuntimeTemplate:L["a"],VList:o["a"],VListItem:r["a"],VListItemGroup:c["a"],VListItemTitle:l["c"],VListItemSubtitle:l["b"],VContainer:d["a"],VSheet:u["a"],VCard:m["a"],VRow:p["a"],VCol:g["a"],VDivider:h["a"],VCardText:f["c"],VOverlay:v["a"],VDialog:V["a"],VBtn:b["a"],VSpacer:C["a"],VAppBar:x["a"],VImg:S["a"],VAvatar:_["a"],VIcon:I["a"],StaticListPage:E,StaticListItem:U,StaticListItemAdv:Z,StaticContactPage:tt,StaticContactItem:ot,StaticHomePage:mt,StaticBannerMain:Vt,StaticBannerItem:It}}),yt=Ot,Lt=(a("5ac6"),a("8160"),Object(P["a"])(yt,n,i,!1,null,"49378e71",null));e["default"]=Lt.exports},"78a7":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("VSheet",{staticClass:"bg--gray"},[a("VContainer",[t.loggedIn?a("AfterLogin"):t._e(),t.loggedIn?t._e():a("StaticContentPage")],1)],1)},i=[],s=a("5530"),o=(a("d3b7"),a("3ca3"),a("ddb0"),a("a523")),r=a("2f62"),c=a("4f54"),l=a("740e"),d={name:"HomePage",data:function(){return{loggedIn:!1}},components:{VContainer:o["a"],AfterLogin:c["default"],StaticContentPage:l["default"]},created:function(){var t=this;Promise.all([this.checkSession()]).then((function(){1===t.SessionModel.Status?t.loggedIn=!0:t.loggedIn=!1}))},computed:Object(s["a"])({},Object(r["d"])("Auth",["SessionModel"])),methods:Object(s["a"])({},Object(r["b"])("Auth",["checkSession"]))},u=d,m=(a("0e4a"),a("2877")),p=a("6544"),g=a.n(p),h=a("8dd9"),f=Object(m["a"])(u,n,i,!1,null,"29d7caa4",null);e["default"]=f.exports;g()(f,{VContainer:o["a"],VSheet:h["a"]})},8160:function(t,e,a){"use strict";a("d44c")},9817:function(t,e,a){},d44c:function(t,e,a){},dd1e:function(t,e,a){"use strict";var n=function(t,e,a){if(!e.hasOwnProperty(a)){var n=Object.getOwnPropertyDescriptor(t,a);Object.defineProperty(e,a,n)}};e["a"]={props:{template:String,parent:Object,templateProps:{type:Object,default:function(){return{}}}},render:function(t){if(this.template){var e=this.parent||this.$parent,a=e.$data;void 0===a&&(a={});var i=e.$props;void 0===i&&(i={});var s=e.$options;void 0===s&&(s={});var o=s.components;void 0===o&&(o={});var r=s.computed;void 0===r&&(r={});var c=s.methods;void 0===c&&(c={});var l=this.$data;void 0===l&&(l={});var d=this.$props;void 0===d&&(d={});var u=this.$options;void 0===u&&(u={});var m=u.methods;void 0===m&&(m={});var p=u.computed;void 0===p&&(p={});var g=u.components;void 0===g&&(g={});var h={$data:{},$props:{},$options:{},components:{},computed:{},methods:{}};Object.keys(a).forEach((function(t){void 0===l[t]&&(h.$data[t]=a[t])})),Object.keys(i).forEach((function(t){void 0===d[t]&&(h.$props[t]=i[t])})),Object.keys(c).forEach((function(t){void 0===m[t]&&(h.methods[t]=c[t])})),Object.keys(r).forEach((function(t){void 0===p[t]&&(h.computed[t]=r[t])})),Object.keys(o).forEach((function(t){void 0===g[t]&&(h.components[t]=o[t])}));var f=Object.keys(h.methods||{}),v=Object.keys(h.$data||{}),V=Object.keys(h.$props||{}),b=Object.keys(this.templateProps),C=v.concat(V).concat(f).concat(b),x=(_=e,I={},f.forEach((function(t){return n(_,I,t)})),I),S=function(t){var e={};return t.forEach((function(t){t&&Object.getOwnPropertyNames(t).forEach((function(a){return n(t,e,a)}))})),e}([h.$data,h.$props,x,this.templateProps]);return t({template:this.template||"<div></div>",props:C,computed:h.computed,components:h.components,provide:this.$parent._provided},{props:S})}var _,I}}}}]);
//# sourceMappingURL=HomePage.75b0a051.js.map