(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["menu-StaticContentPage"],{"0fd9":function(t,e,a){"use strict";a("4b85");var n=a("a026"),i=a("d9f7"),s=a("80d2");const r=["sm","md","lg","xl"],o=["start","end","center"];function l(t,e){return r.reduce((a,n)=>(a[t+Object(s["F"])(n)]=e(),a),{})}const c=t=>[...o,"baseline","stretch"].includes(t),d=l("align",()=>({type:String,default:null,validator:c})),u=t=>[...o,"space-between","space-around"].includes(t),p=l("justify",()=>({type:String,default:null,validator:u})),g=t=>[...o,"space-between","space-around","stretch"].includes(t),m=l("alignContent",()=>({type:String,default:null,validator:g})),f={align:Object.keys(d),justify:Object.keys(p),alignContent:Object.keys(m)},h={align:"align",justify:"justify",alignContent:"align-content"};function v(t,e,a){let n=h[t];if(null!=a){if(e){const a=e.replace(t,"");n+="-"+a}return n+="-"+a,n.toLowerCase()}}const b=new Map;e["a"]=n["default"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...p,alignContent:{type:String,default:null,validator:g},...m},render(t,{props:e,data:a,children:n}){let s="";for(const i in e)s+=String(e[i]);let r=b.get(s);if(!r){let t;for(t in r=[],f)f[t].forEach(a=>{const n=e[a],i=v(t,a,n);i&&r.push(i)});r.push({"no-gutters":e.noGutters,"row--dense":e.dense,["align-"+e.align]:e.align,["justify-"+e.justify]:e.justify,["align-content-"+e.alignContent]:e.alignContent}),b.set(s,r)}return t(e.tag,Object(i["a"])(a,{staticClass:"row",class:r}),n)}})},"5ac6":function(t,e,a){"use strict";a("9817")},"62ad":function(t,e,a){"use strict";a("4b85");var n=a("a026"),i=a("d9f7"),s=a("80d2");const r=["sm","md","lg","xl"],o=(()=>r.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),l=(()=>r.reduce((t,e)=>(t["offset"+Object(s["F"])(e)]={type:[String,Number],default:null},t),{}))(),c=(()=>r.reduce((t,e)=>(t["order"+Object(s["F"])(e)]={type:[String,Number],default:null},t),{}))(),d={col:Object.keys(o),offset:Object.keys(l),order:Object.keys(c)};function u(t,e,a){let n=t;if(null!=a&&!1!==a){if(e){const a=e.replace(t,"");n+="-"+a}return"col"!==t||""!==a&&!0!==a?(n+="-"+a,n.toLowerCase()):n.toLowerCase()}}const p=new Map;e["a"]=n["default"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...o,offset:{type:[String,Number],default:null},...l,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:a,children:n,parent:s}){let r="";for(const i in e)r+=String(e[i]);let o=p.get(r);if(!o){let t;for(t in o=[],d)d[t].forEach(a=>{const n=e[a],i=u(t,a,n);i&&o.push(i)});const a=o.some(t=>t.startsWith("col-"));o.push({col:!a||!e.cols,["col-"+e.cols]:e.cols,["offset-"+e.offset]:e.offset,["order-"+e.order]:e.order,["align-self-"+e.alignSelf]:e.alignSelf}),p.set(r,o)}return t(e.tag,Object(i["a"])(a,{class:o}),n)}})},"740e":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"static-content-page"},[a("v-runtime-template",{attrs:{template:this.StaticContent.body}})],1)},i=[],s=a("5530"),r=a("8860"),o=a("da13"),l=a("1baa"),c=a("5d23"),d=a("a523"),u=a("8dd9"),p=a("b0af"),g=a("0fd9"),m=a("62ad"),f=a("ce7e"),h=a("99d9"),v=a("a797"),b=a("169a"),V=a("8336"),C=a("2fa4"),x=a("40dc"),S=a("adda"),y=a("8212"),_=a("132d"),O=(a("58ca"),a("a026")),j=a("2f62"),w=a("dd1e"),I=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("VContainer",[a("h1",{staticClass:"text-xxxl mb-8"},[t._v(t._s(t.title))]),a("VSheet",{staticClass:"mb-4",attrs:{color:"transparent"}},[t._t("default",[a("div",{staticClass:"static-page--content"},[a("p",[t._v(t._s(t.message))])])]),a("VList",{staticClass:"rounded-lg",attrs:{outlined:""}},[a("VListItemGroup",[t._t("list-items")],2)],1)],2)],1)},L=[],k=O["default"].extend({name:"StaticListPage",props:["title","message"]}),$=k,P=a("2877"),A=a("6544"),D=a.n(A),B=Object(P["a"])($,I,L,!1,null,null,null),E=B.exports;D()(B,{VContainer:d["a"],VList:r["a"],VListItemGroup:l["a"],VSheet:u["a"]});var N=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("VListItem",{on:{click:function(e){e.stopPropagation(),t.toggleDialog=!0}}},[t._v(" "+t._s(t.text)+" ")]),a("VDialog",{attrs:{"content-class":t.$vuetify.breakpoint.mdAndUp?"static-content-dialog desktop-drawer":"static-content-dialog mobile-drawer",transition:"v-slide-x-reverse"},model:{value:t.toggleDialog,callback:function(e){t.toggleDialog=e},expression:"toggleDialog"}},[a("VSheet",{attrs:{color:"'transparent'"}},[a("VAppBar",{attrs:{height:"auto",flat:"",absolute:"",color:"white"}},[a("VBtn",{staticClass:"ml-n3",attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.toggleDialog=!1}}},[a("span",{staticClass:"betfont icon-stick-arrow-left"})])],1),a("div",{staticClass:"v-app-bar"}),a("VDivider"),t._t("default")],2)],1)],1)},H=[],T=O["default"].extend({name:"StaticListItem",data:function(){return{toggleDialog:!1}},props:["text"]}),R=T,M=Object(P["a"])(R,N,H,!1,null,null,null),U=M.exports;D()(M,{VAppBar:x["a"],VBtn:V["a"],VDialog:b["a"],VDivider:f["a"],VListItem:o["a"],VSheet:u["a"]});var F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("StaticListItem",{attrs:{text:this.text}},[[a("div",{staticClass:"pa-8"},[a("h2",{staticClass:"text-xxxl mb-8"},[t._t("dialog-title"),t._v(" "+t._s(t.dialogTitle)+" ")],2),a("div",[a("p",{staticClass:"text-md"},[t._t("default")],2)]),t._t("external")],2)]],2)],1)},G=[],W=O["default"].extend({name:"StaticListItemAdv",props:["text","dialogTitle"],components:{StaticListItem:U}}),q=W,J=Object(P["a"])(q,F,G,!1,null,null,null),Z=J.exports,z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("VContainer",[a("h1",{staticClass:"text-xxxl mb-8"},[t._v(" "+t._s(t.title)+" ")]),a("VSheet",{staticClass:"mb-4",attrs:{color:"transparent"}},[a("div",{staticClass:"static-page--content"},[a("p",[t._v(t._s(t.message))])]),a("VCard",{staticClass:"rounded-lg",attrs:{flat:!t.$vuetify.breakpoint.smAndDown,color:t.$vuetify.breakpoint.smAndDown?"undefined":"transparent"}},[a("VRow",{attrs:{dense:""}},[t._t("default")],2)],1)],1)],1)},K=[],Q=O["default"].extend({name:"StaticContactPage",props:["title","message"]}),X=Q,Y=Object(P["a"])(X,z,K,!1,null,null,null),tt=Y.exports;D()(Y,{VCard:p["a"],VContainer:d["a"],VRow:g["a"],VSheet:u["a"]});var et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("VCol",{attrs:{cols:"12",sm:"6"}},[a("VCard",{staticClass:"rounded-lg",attrs:{flat:!!t.$vuetify.breakpoint.smAndDown,color:t.$vuetify.breakpoint.smAndDown?"transparent":"undefined"}},[a("VCardText",{staticClass:"d-flex align-center"},[t._t("default",[a("div",{class:t.iconName+" pa-3 pr-7 betfont text-md"}),a("div",[a("h4",{staticClass:"text-md"},[a("a",{staticClass:"text-decoration-none text--primary",attrs:{href:t.hrefLink}},[t._v(t._s(t.hrefText))])]),a("h3",{staticClass:"text-sm text--disabled"},[t._v(t._s(t.quoteText))])])])],2)],1)],1)},at=[],nt=O["default"].extend({name:"StaticContactItem",props:["iconName","hrefLink","hrefText","quoteText"]}),it=nt,st=Object(P["a"])(it,et,at,!1,null,null,null),rt=st.exports;D()(st,{VCard:p["a"],VCardText:h["c"],VCol:m["a"]});var ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("VRow",{attrs:{dense:""}},[a("VCol",{attrs:{cols:"12",lg:"6"}},[t._t("default",[a("section",[a("VCard",{attrs:{elevation:"4",outlined:"","min-height":"25rem"}},[a("VImg",{staticClass:"d-flex align-end",attrs:{src:"https://doc.188contents.com/contents/aff/Images/Affiliates/TVScreen/888x400-sample-image.jpg",height:"25.25rem",gradient:"to top , rgba(0,0,0,0) 25%, rgba(0,0,0,0)"}},[a("div",{staticClass:"pa-4 text-center"},[a("h1",{staticClass:"black--text text-xxxl  font-weight-bold"},[t._v(" OFFICIAL APAC SPONSOR OF FORMULA 1® ")]),a("h2",{staticClass:"gray--text text-md mb-2"},[t._v(" Sign up, promote us and start earning. ")]),a("VBtn",{attrs:{depressed:"",color:"primary mb-2",to:{path:"/"+this.$route.params.lang+"/Register"}}},[t._v("Sign Up")]),a("div",{staticClass:"text--disabled"},[t._v(" Already have an account? "),a("router-link",{attrs:{to:{path:"/"+this.$route.params.lang+"/Login"}}},[t._v("Log in")])],1)],1)])],1)],1)])],2),a("VCol",{attrs:{cols:"12",lg:"6"}},[a("VRow",{attrs:{dense:""}},[a("VCol",{attrs:{cols:"12",sm:"4",lg:"12"}},[t._t("banner-1")],2),a("VCol",{attrs:{cols:"12",sm:"4",lg:"12"}},[t._t("banner-2")],2),a("VCol",{attrs:{cols:"12",sm:"4",lg:"12"}},[t._t("banner-3")],2)],1)],1)],1)],1)},lt=[],ct=O["default"].extend({name:"StaticHomePage"}),dt=ct,ut=Object(P["a"])(dt,ot,lt,!1,null,null,null),pt=ut.exports;D()(ut,{VBtn:V["a"],VCard:p["a"],VCol:m["a"],VImg:S["a"],VRow:g["a"]});var gt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("VCard",{attrs:{elevation:"4",outlined:"","min-height":"25rem"}},[a("VImg",{staticClass:"d-flex align-end",attrs:{src:this.backgroundImagePath,height:"25.25rem",gradient:"to top , rgba(0,0,0,0) 25%, rgba(0,0,0,0)"}},[t._t("default",[a("div",{staticClass:"pa-4 text-center"},[a("h1",{staticClass:"black--text text-xxxl  font-weight-bold"},[t._v(" "+t._s(this.titlePrimary)+" ")]),a("h2",{staticClass:"gray--text text-md mb-2"},[t._v(" "+t._s(this.titleSecondary)+" ")]),a("VBtn",{attrs:{depressed:"",color:"primary mb-2",to:{path:"/"+this.$route.params.lang+"/Register"}}},[t._v("Sign Up")]),a("div",{staticClass:"text--disabled"},[t._v(" Already have an account? "),a("router-link",{attrs:{to:{path:"/"+this.$route.params.lang+"/Login"}}},[t._v("Log in")])],1)],1)])],2)],1)],1)},mt=[],ft=O["default"].extend({name:"StaticBannerMain",props:["backgroundImagePath","titlePrimary","titleSecondary",""]}),ht=ft,vt=Object(P["a"])(ht,gt,mt,!1,null,null,null),bt=vt.exports;D()(vt,{VBtn:V["a"],VCard:p["a"],VImg:S["a"]});var Vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("router-link",{staticClass:"text-decoration-none",attrs:{to:{path:"/"+this.$route.params.lang+"/"+this.linkAddress.replace(/^\/+|\/+$/g,"")}}},[a("section",{staticStyle:{height:"100%"}},[a("VCard",{attrs:{elevation:"4",outlined:"",height:"100%","min-height":"8rem"}},[a("VImg",{staticClass:"d-flex align-center",attrs:{src:this.backgroundImagePath,"min-height":"8rem"}},[a("div",{staticClass:"d-flex align-center pa-4"},[a("VAvatar",{attrs:{color:"black"}},[a("span",{staticClass:"white--text"},[t._t("icon",[a("svg",{staticStyle:{width:"24px",height:"24px","margin-top":".2em"},attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{fill:"currentColor",d:"M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"}})])])],2)]),t._t("default",[a("div",{staticClass:"px-4"},[a("h1",{staticClass:"black--text text-md  font-weight-bold"},[t._v(" "+t._s(this.titlePrimary)+" ")]),a("h2",{staticClass:"text--secondary text-sm mb-2",staticStyle:{"line-height":"1.2em"}},[t._v(" "+t._s(this.titleSecondary)+" ")])])])],2)])],1)],1)])],1)},Ct=[],xt=O["default"].extend({name:"StaticBannerItem",props:["backgroundImagePath","linkAddress","titlePrimary","titleSecondary"]}),St=xt,yt=Object(P["a"])(St,Vt,Ct,!1,null,null,null),_t=yt.exports;D()(yt,{VAvatar:y["a"],VCard:p["a"],VImg:S["a"]});var Ot=O["default"].extend({name:"StaticContent",data:function(){return{language:"",resourceName:"",showMoreDetails:!1}},metaInfo:function(){return this.StaticContent.metaInfo},beforeMount:function(){this.loadStaticPage()},computed:Object(s["a"])(Object(s["a"])({},Object(j["d"])("Web",["StaticContent"])),Object(j["d"])("Web",["showLoginDialog","showSignUpDialog"])),watch:{$route:"loadStaticPage"},methods:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(j["b"])("Web",["fetchStaticContent"])),Object(j["b"])("Web",["setShowLoginDialog","setShowSignUpDialog"])),{},{openLoginDialog:function(){this.setShowLoginDialog(!0)},openSignUpDialog:function(){this.setShowSignUpDialog(!0)},loadStaticPage:function(){var t;this.language=this.$route.params.lang,this.resourceName=null!==(t=this.$route.params.viewName)&&void 0!==t?t:"Home";var e={Language:this.language,ResourceName:this.resourceName,VueElements:["VList","VListItem","VListItemGroup","VListItemTitle","VListItemSubtitle","VContainer","VSheet","VCard","VRow","VCol","VDivider","VCardText","VOverlay","VDialog","VBtn","VSpacer","VAppBar","VImg","VAvatar","VIcon","StaticListPage","StaticListItem","StaticListItemAdv","StaticContactPage","StaticContactItem","StaticHomePage","StaticBannerMain","StaticBannerItem"]};this.fetchStaticContent(e)}}),components:{VRuntimeTemplate:w["a"],VList:r["a"],VListItem:o["a"],VListItemGroup:l["a"],VListItemTitle:c["c"],VListItemSubtitle:c["b"],VContainer:d["a"],VSheet:u["a"],VCard:p["a"],VRow:g["a"],VCol:m["a"],VDivider:f["a"],VCardText:h["c"],VOverlay:v["a"],VDialog:b["a"],VBtn:V["a"],VSpacer:C["a"],VAppBar:x["a"],VImg:S["a"],VAvatar:y["a"],VIcon:_["a"],StaticListPage:E,StaticListItem:U,StaticListItemAdv:Z,StaticContactPage:tt,StaticContactItem:rt,StaticHomePage:pt,StaticBannerMain:bt,StaticBannerItem:_t}}),jt=Ot,wt=(a("5ac6"),a("8160"),Object(P["a"])(jt,n,i,!1,null,"49378e71",null));e["default"]=wt.exports},8160:function(t,e,a){"use strict";a("d44c")},9817:function(t,e,a){},d44c:function(t,e,a){},dd1e:function(t,e,a){"use strict";var n=function(t,e,a){if(!e.hasOwnProperty(a)){var n=Object.getOwnPropertyDescriptor(t,a);Object.defineProperty(e,a,n)}};e["a"]={props:{template:String,parent:Object,templateProps:{type:Object,default:function(){return{}}}},render:function(t){if(this.template){var e=this.parent||this.$parent,a=e.$data;void 0===a&&(a={});var i=e.$props;void 0===i&&(i={});var s=e.$options;void 0===s&&(s={});var r=s.components;void 0===r&&(r={});var o=s.computed;void 0===o&&(o={});var l=s.methods;void 0===l&&(l={});var c=this.$data;void 0===c&&(c={});var d=this.$props;void 0===d&&(d={});var u=this.$options;void 0===u&&(u={});var p=u.methods;void 0===p&&(p={});var g=u.computed;void 0===g&&(g={});var m=u.components;void 0===m&&(m={});var f={$data:{},$props:{},$options:{},components:{},computed:{},methods:{}};Object.keys(a).forEach((function(t){void 0===c[t]&&(f.$data[t]=a[t])})),Object.keys(i).forEach((function(t){void 0===d[t]&&(f.$props[t]=i[t])})),Object.keys(l).forEach((function(t){void 0===p[t]&&(f.methods[t]=l[t])})),Object.keys(o).forEach((function(t){void 0===g[t]&&(f.computed[t]=o[t])})),Object.keys(r).forEach((function(t){void 0===m[t]&&(f.components[t]=r[t])}));var h=Object.keys(f.methods||{}),v=Object.keys(f.$data||{}),b=Object.keys(f.$props||{}),V=Object.keys(this.templateProps),C=v.concat(b).concat(h).concat(V),x=(y=e,_={},h.forEach((function(t){return n(y,_,t)})),_),S=function(t){var e={};return t.forEach((function(t){t&&Object.getOwnPropertyNames(t).forEach((function(a){return n(t,e,a)}))})),e}([f.$data,f.$props,x,this.templateProps]);return t({template:this.template||"<div></div>",props:C,computed:f.computed,components:f.components,provide:this.$parent._provided},{props:S})}var y,_}}}}]);
//# sourceMappingURL=menu-StaticContentPage.eaffd31e.js.map