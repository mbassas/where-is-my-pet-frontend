(this["webpackJsonpwhere-is-my-pet-frontend"]=this["webpackJsonpwhere-is-my-pet-frontend"]||[]).push([[0],{118:function(e,t,a){e.exports=a(147)},147:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(14),i=a.n(l),s=a(11),o=a(40),c=a(62),u=a(13),m=a.n(u),p=a(22),d=a(18),b=a(19),v=a(30),h=a(31),f=a(60),g=a.n(f),E={BASE_URL:"https://where-is-my-pet.herokuapp.com"},w=function(){function e(){Object(d.a)(this,e)}return Object(b.a)(e,[{key:"authHeader",value:function(){var e=k.getToken();return e?{authorization:"Bearer ".concat(e)}:{}}},{key:"makeRequest",value:function(e){var t=e.method,a=e.params,n=void 0===a?{}:a,r=e.headers,l=void 0===r?{}:r,i=e.url;return g.a.request({method:t,url:"".concat(E.BASE_URL).concat(i),data:n,headers:Object(c.a)({},l,{},this.authHeader())})}}]),e}(),O=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"ResetPassword",value:function(e,t){return this.makeRequest({method:"POST",url:"/users/reset-password",params:{token:e,newPassword:t}})}},{key:"SendResetPassword",value:function(e){return this.makeRequest({method:"POST",url:"/users/reset-password-email",params:{usernameOrEmail:e}})}},{key:"SignUp",value:function(e){return this.makeRequest({method:"POST",url:"/users/sign-up",params:e})}},{key:"SignIn",value:function(e,t){return this.makeRequest({method:"POST",url:"/users/sign-in",params:{username:e,password:t}})}}]),a}(w),y=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"UploadAnimal",value:function(e){var t=new FormData;return Object.entries(e).forEach((function(e){var a=Object(s.a)(e,2),n=a[0],r=a[1];r&&t.append(n,r)})),this.makeRequest({method:"POST",url:"/animals",params:t})}}]),a}(w),j=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"Get",value:function(){return this.makeRequest({method:"GET",url:"/Species"})}}]),a}(w),S=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(b.a)(a,[{key:"Get",value:function(e){return this.makeRequest({method:"GET",url:"/Breeds/".concat(e)})}}]),a}(w),k=new(function(){function e(){Object(d.a)(this,e),this.Users=new O,this.Animals=new y,this.Species=new j,this.Breeds=new S,this.token=""}return Object(b.a)(e,[{key:"getToken",value:function(){return this.token||(this.token=localStorage.getItem("user_token")||""),this.token}},{key:"setToken",value:function(e){this.token=e,localStorage.setItem("user_token",e)}}]),e}()),x=a(195),C=a(197),N=a(198),T=a(150),P=a(209),U=a(4),I=a(206),L=a(191),A=a(192),R=a(149),F=a(193),M=a(194),D=a(205),B=a(190),q=a(46),G=a(35);var W=function(){var e=Object(q.g)(),t=/sign-in/.test(e.pathname)?1:0;return r.a.createElement(D.a,{value:t,variant:"fullWidth",indicatorColor:"primary"},r.a.createElement(B.a,{label:"Sign Up",component:G.b,to:"/sign-up"}),r.a.createElement(B.a,{label:"Sign In",component:G.b,to:"/sign-in"}))};var _=Object(M.a)({title:{marginTop:"0",marginBottom:"2rem",fontSize:"2rem",textAlign:"center",width:"100%"},container:{paddingTop:"3rem",minHeight:"100vh",background:"linear-gradient(rgba(167, 102, 10, 1), rgba(255, 136, 0, 1))"},wrapper:{padding:"1em 1.2rem",position:"relative",marginBottom:"50px"},backdrop:{display:"flex",justifyContent:"center",alignItems:"center",position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.5)",zIndex:1}}),z=function(e){var t=e.children,a=e.isLoading,n=e.showTabs,l=void 0===n||n,i=_();return r.a.createElement(L.a,{className:i.container},r.a.createElement("h1",{className:i.title},"Welcome to Where is my pet?"),r.a.createElement(A.a,{container:!0,justify:"center"},r.a.createElement(A.a,{component:R.a,xs:12,sm:10,md:6,item:!0,className:i.wrapper},l&&r.a.createElement(W,null),a&&r.a.createElement("div",{className:i.backdrop},r.a.createElement(F.a,null)),t)))},Y=a(98),H=a.n(Y),V=a(99),J=a.n(V),K=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={values:{name:"",surname:"",email:"",phone:"",username:"",password:""},isSubmitting:!1,submitError:!1},e._onSubmit=function(){var t=Object(p.a)(m.a.mark((function t(a){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),e.setState({isSubmitting:!0}),t.prev=2,t.next=5,k.Users.SignUp(e.state.values);case 5:t.next=10;break;case 7:t.prev=7,t.t0=t.catch(2),e.setState({submitError:!0});case 10:return t.prev=10,e.setState({isSubmitting:!1}),t.finish(10);case 13:case"end":return t.stop()}}),t,null,[[2,7,10,13]])})));return function(e){return t.apply(this,arguments)}}(),e._onChange=function(t){e.setState({values:Object(c.a)({},e.state.values,Object(o.a)({},t.currentTarget.name,t.currentTarget.value))})},e}return Object(b.a)(a,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(z,{isLoading:this.state.isSubmitting},this.state.submitError&&r.a.createElement(r.a.Fragment,null,r.a.createElement(I.a,{severity:"error"},"Ups - Cannot create account!"),r.a.createElement("br",null)),r.a.createElement("p",null,"Sign up to upload an animal!"),r.a.createElement("form",{onSubmit:this._onSubmit},r.a.createElement(x.a,{required:!0,margin:"normal",type:"text",name:"name",onChange:this._onChange,label:"Name",variant:"outlined",className:e.input}),r.a.createElement(x.a,{required:!0,margin:"normal",type:"text",name:"surname",onChange:this._onChange,label:"Surname",variant:"outlined",className:e.input}),r.a.createElement(x.a,{required:!0,margin:"normal",type:"email",name:"email",onChange:this._onChange,label:"Email",variant:"outlined",className:e.input}),r.a.createElement(x.a,{required:!0,margin:"normal",type:"tel",name:"phone",onChange:this._onChange,label:"Mobile phone",variant:"outlined",className:e.input}),r.a.createElement(x.a,{required:!0,margin:"normal",type:"text",name:"username",onChange:this._onChange,label:"Username",variant:"outlined",className:e.input}),r.a.createElement(Q,{required:!0,margin:"normal",name:"password",onChange:this._onChange,label:"Password",variant:"outlined",className:e.input}),r.a.createElement(C.a,{type:"submit",variant:"contained",color:"primary",disabled:this.state.isSubmitting,fullWidth:!0},"SIGN UP")))}}]),a}(n.Component);function Q(e){var t=r.a.useState(!1),a=Object(s.a)(t,2),n=a[0],l=a[1],i=r.a.createElement(N.a,{position:"end"},r.a.createElement(T.a,{"aria-label":"toggle password visibility",onClick:function(){return l(!n)},onMouseDown:function(e){e.preventDefault()}},n?r.a.createElement(H.a,null):r.a.createElement(J.a,null)));return r.a.createElement(x.a,Object.assign({type:n?"text":"password",InputProps:{endAdornment:i}},e))}var X=Object(P.a)({container:{minHeight:"100vh",background:"linear-gradient(rgba(167, 102, 10, 1), rgba(255, 136, 0, 1))"},wrapper:{padding:"1em 1.2rem"},input:{width:"100%"}}),Z=Object(U.a)(X)(K),$=a(204),ee=a(199),te=function(e){Object(h.a)(a,e);var t=Object(v.a)(a);function a(){var e;Object(d.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={username:"",password:"",isSubmitting:!1,submitError:!1},e._onSubmit=function(){var t=Object(p.a)(m.a.mark((function t(a){var n;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),e.setState({isSubmitting:!0}),t.prev=2,t.next=5,k.Users.SignIn(e.state.username,e.state.password);case 5:n=t.sent,k.setToken(n.data.token),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),e.setState({submitError:!0});case 12:return t.prev=12,e.setState({isSubmitting:!1}),t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[2,9,12,15]])})));return function(e){return t.apply(this,arguments)}}(),e}return Object(b.a)(a,[{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(z,{isLoading:this.state.isSubmitting},this.state.submitError&&r.a.createElement(r.a.Fragment,null,r.a.createElement(I.a,{severity:"error"},"Ups - Cannot create account!"),r.a.createElement("br",null)),r.a.createElement("p",null,"Enter your username and password to sign in:"),r.a.createElement("form",{onSubmit:this._onSubmit},r.a.createElement(x.a,{required:!0,margin:"normal",type:"text",name:"username",label:"Username",variant:"outlined",className:t.input,onChange:function(t){return e.setState({username:t.currentTarget.value})}}),r.a.createElement(x.a,{required:!0,margin:"normal",type:"password",name:"password",label:"Password",variant:"outlined",className:t.input,onChange:function(t){return e.setState({password:t.currentTarget.value})}}),r.a.createElement(C.a,{type:"submit",variant:"contained",color:"primary",disabled:this.state.isSubmitting,fullWidth:!0},"SIGN IN"),r.a.createElement("div",{className:t.forgotPassword},r.a.createElement(ee.a,{component:G.b,to:"/recover-password"},"Forgot your password? Click here."))))}}]),a}(n.Component),ae=Object(P.a)({input:{width:"100%"},forgotPassword:{marginTop:"10px",textAlign:"center"}}),ne=Object(U.a)(ae)(te);function re(){var e=r.a.useState(!1),t=Object(s.a)(e,2),a=t[0],n=t[1],l=r.a.useState(!1),i=Object(s.a)(l,2),o=i[0],c=i[1],u=r.a.useState(!1),d=Object(s.a)(u,2),b=d[0],v=d[1],h=r.a.useState(!1),f=Object(s.a)(h,2),g=f[0],E=f[1],w=r.a.useState(!1),O=Object(s.a)(w,2),y=O[0],j=O[1],S=r.a.useState(""),N=Object(s.a)(S,2),T=N[0],P=N[1],U=function(){var e=Object(p.a)(m.a.mark((function e(t){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),v(!1),c(!1),E(!1),j(!1),T){e.next=8;break}return E(!0),e.abrupt("return");case 8:return e.prev=8,n(!0),e.next=12,k.Users.SendResetPassword(T);case 12:c(!0),e.next=21;break;case 15:if(e.prev=15,e.t0=e.catch(8),!/Invalid Username or Email/.test(null===e.t0||void 0===e.t0||null===(a=e.t0.response)||void 0===a?void 0:a.data)){e.next=20;break}return j(!0),e.abrupt("return");case 20:v(!0);case 21:return e.prev=21,n(!1),e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[8,15,21,24]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(z,{isLoading:a,showTabs:!1},r.a.createElement("h2",null,"Reset your password"),r.a.createElement("p",null,"Enter your username or email to recover your account:"),o&&r.a.createElement(I.a,{severity:"success"},"An email has been sent to your address. Please check your inbox."),b&&r.a.createElement(I.a,{severity:"error"},"Ups - Something has gone wrong."),g&&r.a.createElement(I.a,{severity:"warning"},"Please, enter your username or email."),y&&r.a.createElement(I.a,{severity:"warning"},"Invalid username or password."),r.a.createElement("form",{onSubmit:U},r.a.createElement(x.a,{type:"text",label:"Username or Email",onChange:function(e){return P(e.currentTarget.value)},variant:"outlined",margin:"normal",fullWidth:!0}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(C.a,{type:"submit",variant:"contained",color:"primary",fullWidth:!0},"Send recover email")))}function le(e){var t=e.token,a=r.a.useState(""),n=Object(s.a)(a,2),l=n[0],i=n[1],o=r.a.useState(""),c=Object(s.a)(o,2),u=c[0],d=c[1],b=r.a.useState(!1),v=Object(s.a)(b,2),h=v[0],f=v[1],g=r.a.useState(!1),E=Object(s.a)(g,2),w=E[0],O=E[1],y=r.a.useState(!1),j=Object(s.a)(y,2),S=j[0],N=j[1],T=r.a.useState(!1),P=Object(s.a)(T,2),U=P[0],L=P[1],A=function(){var e=Object(p.a)(m.a.mark((function e(a){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),L(!1),N(!1),f(!1),l&&l===u){e.next=9;break}return f(!0),e.abrupt("return");case 9:f(!1);case 10:return e.prev=10,O(!0),e.next=14,k.Users.ResetPassword(t,l);case 14:N(!0),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(10),L(!0);case 20:return e.prev=20,O(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[10,17,20,23]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(z,{isLoading:w,showTabs:!1},r.a.createElement("h2",null,"Reset your password"),r.a.createElement("p",null,"Enter a new password for your account:"),S&&r.a.createElement(I.a,{severity:"success"},"Your password has been updated"),U&&r.a.createElement(I.a,{severity:"error"},"Ups - Something has gone wrong."),h&&r.a.createElement(I.a,{severity:"warning"},"Passwords do not match"),r.a.createElement("form",{onSubmit:A},r.a.createElement(x.a,{type:"password",label:"Password",onChange:function(e){return i(e.currentTarget.value)},variant:"outlined",margin:"normal",fullWidth:!0}),r.a.createElement(x.a,{type:"password",label:"Repeat your password",onChange:function(e){return d(e.currentTarget.value)},variant:"outlined",margin:"normal",fullWidth:!0}),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(C.a,{type:"submit",variant:"contained",color:"primary",fullWidth:!0},"Reset Password")))}var ie=function(){var e=new URLSearchParams(Object(q.g)().search).get("h");return r.a.createElement(r.a.Fragment,null,!e&&r.a.createElement(re,null),e&&r.a.createElement(le,{token:e}))},se=a(12),oe=a(69),ce=a(211),ue=a(103),me=a.n(ue),pe="https://nominatim.openstreetmap.org";function de(e,t){return be.apply(this,arguments)}function be(){return(be=Object(p.a)(m.a.mark((function e(t,a){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get("".concat(pe,"/reverse?lat=").concat(t,"&lon=").concat(a,"&format=json"));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ve(e){return he.apply(this,arguments)}function he(){return(he=Object(p.a)(m.a.mark((function e(t){var a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get("".concat(pe,"/search?q=spain ").concat(t,"&format=json"));case 2:return a=e.sent,e.abrupt("return",a.data[0]);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function fe(){return new Promise((function(e,t){navigator.geolocation?navigator.geolocation.getCurrentPosition(e):t()}))}var ge=function(e){var t=e.onChange,a=void 0===t?function(){}:t,n=e.inputProps,l=r.a.useState(""),i=Object(s.a)(l,2),o=i[0],c=i[1];function u(){return d.apply(this,arguments)}function d(){return(d=Object(p.a)(m.a.mark((function e(){var t,n,r,l,i;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fe();case 2:return t=e.sent,e.next=5,de(t.coords.latitude,t.coords.longitude);case 5:if(n=e.sent){e.next=8;break}return e.abrupt("return");case 8:console.log(n),r=n.address,l=n.lat,i=n.lon,c("".concat(r.postcode," ").concat(r.town)),a(parseFloat(l),parseFloat(i));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(){return(b=Object(p.a)(m.a.mark((function e(){var t,n,r,l;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o){e.next=3;break}return a(null,null),e.abrupt("return");case 3:return e.next=5,ve(o);case 5:if(t=e.sent){e.next=8;break}return e.abrupt("return");case 8:n=t.lat,r=t.lon,l=t.display_name,c(l.split(",")[0]),a(parseFloat(n),parseFloat(r));case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}r.a.useEffect((function(){u()}),[]);var v=r.a.createElement(N.a,{position:"end"},r.a.createElement(ce.a,{title:"Auto locate","aria-label":"add",placement:"right"},r.a.createElement(T.a,{"aria-label":"toggle password visibility",onClick:u,onMouseDown:function(e){e.preventDefault()}},r.a.createElement(me.a,null))));return r.a.createElement(x.a,Object.assign({type:"text",InputProps:{endAdornment:v}},n,{value:o,onChange:function(e){return c(e.currentTarget.value)},onBlur:function(){return b.apply(this,arguments)},variant:"outlined"}))},Ee=a(159),we=a(154),Oe=a(210),ye=a(200),je=a(207),Se={CAT:"Cat",DOG:"Dog",OTHER:"Others"};var ke=function(){var e=Object(se.e)(),t=e.handleChange,a=e.values,n=r.a.useState([]),l=Object(s.a)(n,2),i=l[0],o=l[1];return r.a.useEffect((function(){k.Species.Get().then((function(e){var t=e.data;return o(t)}))}),[]),r.a.createElement(Ee.a,{component:"fieldset"},r.a.createElement(we.a,{component:"legend"},"Species"),r.a.createElement(Oe.a,{row:!0,"aria-label":"Species",name:"species",value:a.species,onChange:t},i.map((function(e){return r.a.createElement(ye.a,{value:e,control:r.a.createElement(je.a,null),label:Se[e]||""})}))))};var xe=function(e){var t=e.className,a=Object(se.e)(),n=a.values,l=a.setFieldValue;return r.a.createElement(D.a,{value:n.status,variant:"fullWidth",indicatorColor:"primary",onChange:function(e,t){return l("status",t)},className:t},r.a.createElement(B.a,{value:De.LOST,label:"Lost"}),r.a.createElement(B.a,{value:De.FOUND,label:"Found"}))},Ce=a(153),Ne=a(157);var Te=Object(M.a)((function(e){return Object(P.a)({formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)}})})),Pe=function(e){var t=e.species,a=r.a.useState([]),n=Object(s.a)(a,2),l=n[0],i=n[1],o=Object(se.e)(),c=o.values,u=o.handleChange,m=Te();return r.a.useEffect((function(){t&&k.Breeds.Get(t).then((function(e){var t=e.data;return i(t.sort())}))}),[t]),r.a.createElement(Ee.a,{variant:"outlined",className:m.formControl},r.a.createElement(Ce.a,{htmlFor:"outlined-age-native-simple"},"Breed"),r.a.createElement(Ne.a,{native:!0,value:c.breed,onChange:u,label:"Breed",inputProps:{name:"breed",id:"outlined-age-native-simple"},disabled:!t},r.a.createElement("option",{"aria-label":"None",value:""}),l.map((function(e){return r.a.createElement("option",{value:e},e)}))))},Ue=a(34),Ie=a(201);var Le=function(){var e=Object(se.e)(),t=e.values,a=e.handleChange,n=Object(Ue.a)(),l=Object(Ie.a)(n.breakpoints.down("sm"));return r.a.createElement(Ee.a,{component:"fieldset"},r.a.createElement(we.a,{component:"legend"},"Size"),r.a.createElement(Oe.a,{"aria-label":"Size",name:"size",value:t.size,onChange:a,row:l},r.a.createElement(ye.a,{value:Be.SMALL,control:r.a.createElement(je.a,null),label:"Small"}),r.a.createElement(ye.a,{value:Be.MEDIUM,control:r.a.createElement(je.a,null),label:"Medium"}),r.a.createElement(ye.a,{value:Be.BIG,control:r.a.createElement(je.a,null),label:"Big"})))},Ae=a(104),Re=a.n(Ae);var Fe=Object(M.a)((function(e){return{input:{marginTop:".5rem",marginBottom:"1rem"},wrapper:{display:"flex",flexDirection:"column"},previewWrapper:{width:"100%",height:"24rem",flexGrow:1,border:"1px dashed ".concat(e.palette.divider),borderRadius:e.shape.borderRadius,display:"flex",alignItems:"center",justifyContent:"center",background:e.palette.grey[100],cursor:"pointer"},preview:{maxWidth:"100%",maxHeight:"100%"}}})),Me=function(e){var t=e.className,a=r.a.useRef(null),n=Fe(),l=r.a.useState(""),i=Object(s.a)(l,2),o=i[0],c=i[1],u=Object(se.e)().setFieldValue;return r.a.createElement("div",{className:"".concat(n.wrapper," ").concat(t)},r.a.createElement("div",{className:"".concat(n.previewWrapper),onClick:function(){var e;return null===(e=a.current)||void 0===e?void 0:e.click()}},!o&&r.a.createElement(Re.a,{fontSize:"large",color:"disabled"}),o&&r.a.createElement("img",{src:o,className:n.preview})),r.a.createElement("input",{onChange:function(e){var t;if(e.preventDefault(),null===(t=e.target.files)||void 0===t?void 0:t.length){var a=new FileReader,n=e.target.files[0];a.onloadend=function(){"string"===typeof a.result&&(c(a.result),u("images",n))},a.readAsDataURL(n)}},ref:a,className:n.input,type:"file",accept:"image/*"}))};var De,Be,qe,Ge=function(){var e=Object(se.e)(),t=e.values,a=e.handleChange;return r.a.createElement(Ee.a,{component:"fieldset"},r.a.createElement(we.a,{component:"legend"},"Gender"),r.a.createElement(Oe.a,{"aria-label":"Gender",name:"gender",value:t.gender,onChange:a,row:!0},r.a.createElement(ye.a,{value:qe.MALE,control:r.a.createElement(je.a,null),label:"Male"}),r.a.createElement(ye.a,{value:qe.FEMALE,control:r.a.createElement(je.a,null),label:"Female"})))};!function(e){e.LOST="LOST",e.FOUND="FOUND"}(De||(De={})),function(e){e.SMALL="SMALL",e.MEDIUM="MEDIUM",e.BIG="BIG",e.EMPTY=""}(Be||(Be={})),function(e){e.MALE="MALE",e.FEMALE="FEMALE",e.EMPTY=""}(qe||(qe={}));var We={status:De.FOUND,species:"",breed:"",size:Be.EMPTY,color:"",name:"",gender:qe.EMPTY,age:"",lat:void 0,lng:void 0,images:void 0};function _e(){var e=Object(se.e)(),t=e.isSubmitting,a=e.isValid,n=e.setFieldValue,l=e.values,i=ze();return r.a.createElement(se.b,{className:i.form},r.a.createElement(xe,{className:i.statusInput}),r.a.createElement(ke,null),r.a.createElement(Pe,{species:l.species}),r.a.createElement(Me,{className:i.animalImageInput}),r.a.createElement(Le,null),r.a.createElement(se.a,{component:oe.a,name:"color",label:"Color",variant:"outlined"}),l.status===De.LOST&&r.a.createElement(r.a.Fragment,null,r.a.createElement(se.a,{component:oe.a,name:"age",label:"Pet Age",variant:"outlined"}),r.a.createElement(Ge,null),r.a.createElement(se.a,{component:oe.a,name:"name",label:"Pet name",variant:"outlined"})),r.a.createElement(ge,{inputProps:{label:"Enter your town or postcode",className:i.locationInput},onChange:function(e,t){n("lat",e),n("lng",t)}}),r.a.createElement(C.a,{type:"submit",variant:"contained",color:"primary",disabled:t||!a,className:i.uploadButton},"UPLOAD"))}var ze=Object(M.a)((function(e){return{form:Object(o.a)({display:"grid",gridGap:"15px",width:"100%",justifyContent:"center"},e.breakpoints.up("sm"),{gridTemplateColumns:"1fr 1fr"}),statusInput:Object(o.a)({},e.breakpoints.up("sm"),{gridColumn:"span 2"}),uploadButton:Object(o.a)({},e.breakpoints.up("sm"),{gridColumn:"span 2"}),locationInput:Object(o.a)({},e.breakpoints.up("sm"),{gridColumn:"span 2"}),animalImageInput:Object(o.a)({},e.breakpoints.up("sm"),{gridRow:"span 5"})}})),Ye=function(){function e(){return(e=Object(p.a)(m.a.mark((function e(t,a){var n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.setSubmitting,e.prev=1,e.next=4,k.Animals.UploadAnimal(t);case 4:e.next=8;break;case 6:e.prev=6,e.t0=e.catch(1);case 8:return e.prev=8,n(!1),e.finish(8);case 11:case"end":return e.stop()}}),e,null,[[1,6,8,11]])})))).apply(this,arguments)}return r.a.createElement(se.c,{initialValues:We,onSubmit:function(t,a){return e.apply(this,arguments)},validate:function(e){var t={};return e.status||(t.status="You must enter the status for the animal"),e.species||(t.species="You must enter the species for the animal"),t}},r.a.createElement(_e,null))},He=a(202),Ve=a(203),Je=a(79),Ke=a(105),Qe=a.n(Ke);var Xe=Object(M.a)((function(e){return Object(P.a)({root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}})})),Ze=function(){var e=Xe();return r.a.createElement("div",{className:e.root},r.a.createElement(He.a,{position:"static"},r.a.createElement(Ve.a,null,r.a.createElement(T.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(Qe.a,null)),r.a.createElement(Je.a,{variant:"h6",className:e.title},"Where is my pet"),r.a.createElement(C.a,{color:"inherit",component:G.b,to:"/sign-in"},"Login"))))};var $e=function(e){var t=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ze,null),r.a.createElement(L.a,null,r.a.createElement(A.a,{container:!0,justify:"center"},t)))};var et=function(){return r.a.createElement($e,null,r.a.createElement(Ye,null))};var tt=function(){return r.a.createElement("div",null)};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement($.a,null),r.a.createElement(G.a,null,r.a.createElement(q.d,null,r.a.createElement(q.b,{path:"/sign-in"},r.a.createElement(ne,null)),r.a.createElement(q.b,{path:"/sign-up"},r.a.createElement(Z,null)),r.a.createElement(q.b,{path:"/recover-password"},r.a.createElement(ie,null)),r.a.createElement(q.b,{path:"/upload-animal"},r.a.createElement(et,null)),r.a.createElement(q.b,{path:"/view-animal"},r.a.createElement(tt,null)),r.a.createElement(q.a,{to:"/sign-in"})))),document.getElementById("root"))}},[[118,1,2]]]);
//# sourceMappingURL=main.f1befb7b.chunk.js.map