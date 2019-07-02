(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{163:function(e,t,a){e.exports=a.p+"static/media/boy.d7fd9e0b.png"},175:function(e,t,a){e.exports=a(320)},180:function(e,t,a){},222:function(e,t){},237:function(e,t){},239:function(e,t){},273:function(e,t){},274:function(e,t){},318:function(e,t,a){},319:function(e,t,a){},320:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(36),i=a.n(o),l=(a(180),a(11)),s=a(12),c=a(15),m=a(13),u=a(14),d=a(26),p=a(39),f=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).logOut=function(e){e.preventDefault(),localStorage.removeItem("usertoken"),a.props.history.push("/")},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(d.b,{to:"/login",className:"nav-link"},"Login")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(d.b,{to:"/register",className:"nav-link"},"Register"))),t=r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(d.b,{to:"/profile",className:"nav-link"},"User")),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{href:"#",onClick:this.logOut,className:"nav-link"},"Logout")));return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbar1","aria-controls":"navbar1","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"nav-toggle-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse justify-content-md-center",id:"navbar1"},r.a.createElement("ul",{className:"navbar-nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(d.b,{to:"/",className:"nav-link"},"Home"))),localStorage.usertoken?t:e))}}]),t}(n.Component),h=Object(p.e)(f),g=a(27),v=a.n(g),E=a(66),b=a.n(E),y=a(350),w=a(346),k=a(343),N=a(347),x=a(348),S=a(339),j=a(341),O=a(344),I=a(342),_=a(345),C=Object(S.a)({card:{minWidth:240,margin:"20px 15px",padding:"20px"},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}});function W(e){var t=C();r.a.createElement("span",{className:t.bullet},"\u2022");return r.a.createElement(j.a,{className:t.card},r.a.createElement(I.a,null,r.a.createElement(k.a,{variant:"h5",component:"h2"},e.room.name),r.a.createElement(k.a,{className:t.pos,color:"textSecondary"},"".concat(e.room.player_num," players waiting"))),r.a.createElement(O.a,null,r.a.createElement(d.b,{to:"/rooms/".concat(e.room.primary_k)},r.a.createElement(_.a,{variant:"outlined",size:"small",color:"primary"},"ENTER"))))}var R=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).newRoom=function(){var e=(new Date).toLocaleTimeString(),t=window.prompt("New room name: ",e);t&&v.a.post(window.env.backend+"rooms",{roomName:t},{headers:{id:localStorage.getItem("id")}}).then(function(e){a.props.history.push("/rooms/".concat(e.data.roomid))}).catch(function(e){alert("Error in Home.js")})},a.state={rooms:[],leaders:[]},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.socket=b()(window.env.backend),this.socket.emit("enter_home"),this.socket.on("update_rooms",function(t){e.setState({rooms:t})}),v.a.get(window.env.backend+"rooms").then(function(t){e.setState({rooms:t.data})}).catch(function(e){alert("Error in getting rooms info")}),v.a.get(window.env.backend+"highScore").then(function(t){e.setState({leaders:t.data})}).catch(function(e){alert("Error in getting highest scores")})}},{key:"componentWillUnmount",value:function(){this.socket.emit("leave_home")}},{key:"render",value:function(){return r.a.createElement("div",{style:{paddingTop:"20px"}},r.a.createElement(y.a,{textAlign:"center",fontWeight:"fontWeightBold",fontSize:36,fontFamily:"Segoe UI"},"Leaderboard"),r.a.createElement(w.a,{container:!0,direction:"row",justify:"center",alignItems:"center",style:{margin:"5px auto",padding:"0 100px"}},this.state.leaders.map(function(e){return r.a.createElement(w.a,{item:!0,style:{margin:"10px 15px"}},r.a.createElement(k.a,{component:"div"},r.a.createElement(y.a,{textAlign:"center",fontWeight:"fontWeightRegular",fontSize:22,fontFamily:"Segoe UI"},e.name),r.a.createElement(y.a,{textAlign:"center",fontWeight:"fontWeightLight",fontSize:14,fontFamily:"Segoe UI"},"".concat(e.score," ms"))))})),r.a.createElement(N.a,{style:{margin:"15px"}}),r.a.createElement(x.a,{variant:"extended",size:"medium",color:"primary","aria-label":"Add",onClick:this.newRoom,style:{margin:"20px auto",display:"block"}},"NEW ROOM"),r.a.createElement(w.a,{container:!0,direction:"row",justify:"flex-start",alignItems:"flex-start"},this.state.rooms.map(function(e){return r.a.createElement(w.a,{item:!0},r.a.createElement(W,{room:e}))})))}}]),t}(n.Component),D=Object(p.e)(R),A=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).changeToSignUp=function(e){e.preventDefault(),a.props.history.push("/register")},a.changeToSignIn=function(e){e.preventDefault(),a.props.history.push("/login")},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return localStorage.usertoken?r.a.createElement(D,null):r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"jumbotron mt-5"},r.a.createElement("h1",{className:"display-4"},"Motion Run"),r.a.createElement("p",{className:"lead"},"A competition platform for motion-controlled racing game"),r.a.createElement("hr",{className:"my-4"}),r.a.createElement("p",{className:"lead"},r.a.createElement("a",{className:"btn btn-primary btn-lg",href:"#",role:"button",onClick:this.changeToSignUp},"Sign up now!"),r.a.createElement("span",null),r.a.createElement("a",{href:"#",className:"btn btn-link",role:"button",onClick:this.changeToSignIn},"Sign in"))))}}]),t}(n.Component),F=Object(p.e)(A),U=a(37),T=(a(234),function(e){var t={first_name:e.first_name,last_name:e.last_name,email:e.email,password:e.password};return v.a.post(window.env.backend+"users/register",t).then(function(e){e.data.status&&e.data.status.includes("registered")?alert("Registered"):alert("Register fail. Either the email already registered or the server is down")}).catch(function(e){alert("Register fail due to network or database error")})}),z=function(e){var t={email:e.email,password:e.password};return v.a.post(window.env.backend+"users/login",t).then(function(e){return localStorage.setItem("usertoken",e.data.token),localStorage.setItem("id",e.data.primary_k),e.data.token}).catch(function(e){})},L=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).onChange=function(t){e.setState(Object(U.a)({},t.target.name,t.target.value))},e.onSubmit=function(t){t.preventDefault();var a={email:e.state.email,password:e.state.password};z(a).then(function(t){t===localStorage.usertoken&&void 0!=t?(e.setState({success:1}),e.props.history.push("/")):e.setState({success:0})})},e.state={email:"",password:"",success:1},e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6 mt-5 mx-auto"},r.a.createElement("form",{noValidate:!0,onSubmit:this.onSubmit},r.a.createElement("h1",{className:"h3 mb-3 font-weight-normal"},"Please sign in"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email Address"),r.a.createElement("input",{type:"email",className:"form-control",name:"email",placeholder:"Enter email",value:this.state.email,onChange:this.onChange})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",name:"password",placeholder:"Enter Password",value:this.state.password,onChange:this.onChange})),r.a.createElement("button",{className:"btn btn-lg btn-primary btn-block",type:"submit"},"Sign in")),r.a.createElement("br",null),this.state.success?null:r.a.createElement("div",{className:"alert alert-danger"},r.a.createElement("strong",null,"Wrong Password or Invalid Account")," please try it again or go sign up!"))))}}]),t}(n.Component),M=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).onChange=function(t){e.setState(Object(U.a)({},t.target.name,t.target.value))},e.onSubmit=function(t){t.preventDefault();var a={first_name:e.state.first_name,last_name:e.state.last_name,email:e.state.email,password:e.state.password};T(a).then(function(t){e.props.history.push("/login")})},e.state={first_name:"",last_name:"",email:"",password:""},e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6 mt-5 mx-auto"},r.a.createElement("form",{noValidate:!0,onSubmit:this.onSubmit},r.a.createElement("h1",{className:"h3 mb-3 font-weight-normal"},"Sign up!"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"first_name"},"First Name"),r.a.createElement("input",{type:"text",className:"form-control",name:"first_name",placeholder:"Enter First Name",value:this.state.first_name,onChange:this.onChange})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"last_name"},"Last Name"),r.a.createElement("input",{type:"text",className:"form-control",name:"last_name",placeholder:"Enter Last Name",value:this.state.last_name,onChange:this.onChange})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"email"},"Email Address"),r.a.createElement("input",{type:"email",className:"form-control",name:"email",placeholder:"Enter email",value:this.state.email,onChange:this.onChange})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("input",{type:"password",className:"form-control",name:"password",placeholder:"Enter Password",value:this.state.password,onChange:this.onChange})),r.a.createElement("button",{className:"btn btn-lg btn-primary btn-block",type:"submit"},"Register")))))}}]),t}(n.Component),B=a(163),P=a.n(B),X=a(164),H=a.n(X),q=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).state={first_name:"no record",last_name:"no record",email:"no record",score:"no record"},e}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(localStorage.usertoken){var t=localStorage.usertoken,a=H()(t),n=a.id,r={first_name:a.first_name,last_name:a.last_name,email:a.email};v.a.get(window.env.backend+"score",{headers:{id:parseInt(n)}}).then(function(t){r.score=t.data.score,e.setState(r)}).catch(function(e){alert("Error when getting profile")})}}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("br",null),r.a.createElement("div",{className:"row no-gutters"},r.a.createElement("div",{className:"col-6 col-md-4"},r.a.createElement("table",{className:"table col-md-6 mx-auto"},r.a.createElement("tbody",null,r.a.createElement("tr",{className:""},r.a.createElement("img",{src:P.a,className:"media-object",style:{width:"120px"}})),r.a.createElement("br",null)," ",r.a.createElement("br",null),r.a.createElement("tr",null,r.a.createElement("td",null,"Frist Name"),r.a.createElement("td",null,this.state.first_name)),r.a.createElement("tr",null,r.a.createElement("td",null,"Last Name"),r.a.createElement("td",null,this.state.last_name)),r.a.createElement("tr",null,r.a.createElement("td",null,"Email"),r.a.createElement("td",null,this.state.email)),r.a.createElement("tr",null,r.a.createElement("td",null,"Fastest Record"),r.a.createElement("td",null,this.state.score?"".concat(this.state.score," ms"):"no record")))))))}}]),t}(n.Component),J=a(72),V=a(167),Y=a(65),$=a(321),G=(a(318),a(97)),K=a(165),Q=a.n(K),Z=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).setRef=function(e){a.webcam=e},a.getRandomizer=function(e,t){return Math.floor(Math.random()*(1+t-e))+e},a.capture=function(){var e=a.webcam.getCanvas();if(null!=e){for(var t=e.getContext("2d"),n=t.getImageData(0,0,350,350).data,r=t.getImageData(0,0,350,350).data,o=0,i=0;i<r.length;i++){var l=Math.abs(r[i]-a.state.imageData[i]);r[i]=255-l,r[i]<150&&o++}var s=new ImageData(r,350,350),c=document.createElement("canvas");c.getContext("2d").putImageData(s,0,0),a.setState({imageData:n,imageSrc:c.toDataURL(),diffPixels:o},a.props.updateX(a.state.diffPixels))}},a.state={imageSrc:"",imageData:[],diffPixels:0},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.interval=setInterval(function(){return e.capture()},10)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"render",value:function(){return r.a.createElement($.a,{style:{padding:"25px",width:"350px",height:"470px",margin:"15px"}},this.state.imageSrc&&r.a.createElement("img",{style:{width:"300px",display:"block",border:"solid gray 1px",borderRadius:"5px"},src:this.state.imageSrc,alt:"loading..."}),r.a.createElement(Q.a,{audio:!1,height:300,ref:this.setRef,screenshotFormat:"image/jpeg",width:300,videoConstraints:{facingMode:"user"}}))}}]),t}(n.Component);a(319);var ee=function(e){return r.a.createElement($.a,{style:{width:"700px",padding:"10px"}},r.a.createElement("span",{className:"gif-start"}),r.a.createElement(G.a,{translateX:e.info.x,friction:80},r.a.createElement("img",{className:"gif-now",style:{width:"100px"},src:"".concat(window.env.backend,"gifs/").concat(e.info.imgurl,".gif"),alt:"loading..."})))},te=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).updateX=function(e){a.endpoint;var t=Math.round(e/1e3);t=t<=10?t:10,t*=5;var n=a.state.players_info[a.userid].x;e&&!a.end&&a.step(n+t)},a.countdown=function(){a.setState(function(e){var t=e.timer-1;return 0===t&&(window.clearInterval(a.interval),a.interval=window.setInterval(a.judger,10),a.startTime=(new Date).getTime()),{timer:t}})},a.judger=function(){var e=document.getElementsByClassName("gif-start")[0].getBoundingClientRect().x,t=Object(V.a)(document.getElementsByClassName("gif-now")).map(function(t){return t.getBoundingClientRect().x-e});a.setState(function(e){var n=e.endplayersnum+1,r={};return t.forEach(function(t,o){if(t>=a.endpoint){var i=e.players[o],l=e.players_info[i.id],s=(new Date).getTime()-a.startTime;if(l.rank||(r.players_info=Object(J.a)({},e.players_info,Object(U.a)({},i.id,Object(J.a)({},l,{rank:n,timing:s}))),r.endplayersnum=n),e.winner||(r.winner=i.name),!a.end&&e.players[o].id==a.userid){a.end=!0;var c=a.userid,m=a.props.match.params.roomid;v.a.post(window.env.backend+"record",{roomid:m,score:parseInt(s)},{headers:{id:c}}).then(function(e){console.log("Update successes")}).catch(function(e){alert("Error when posting record")})}}}),r})},a.enter=function(){var e=a.userid,t=a.props.match.params.roomid;"undefined"===e||void 0===t?alert("Data not complete"):a.socket.emit("enter",{userid:e,roomid:t})},a.reqRoomInfo=function(){var e=a.props.match.params.roomid;void 0===e?alert("Data not complete"):a.socket.emit("reqRoomInfo",{roomid:e})},a.leave=function(){console.log("Leave");var e=a.userid,t=a.props.match.params.roomid;if("undefined"===e||void 0===t)alert("Data not complete");else{Object(Y.a)(a);a.socket.emit("leave",{userid:e,roomid:t})}window.clearInterval(a.interval)},a.start=function(){a.socket.emit("start",{roomid:a.props.match.params.roomid})},a.step=function(e){0===a.state.timer&&a.socket.emit("step",{roomid:a.props.match.params.roomid,userid:a.userid,step:e})},a.state={roominfo:null,players:[],timer:3,players_info:{},endplayersnum:0},a.end=!1,a.socket=void 0,a.userid=localStorage.getItem("id"),a.endpoint=500,a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;window.onbeforeunload=function(){console.log("onbeforeunload"),e.leave()},this.socket=b()(window.env.backend),void 0!==this.socket?(this.socket.on("err",function(t){console.log(t),e.props.history.push("/")}),this.socket.on("resRoomInfo",function(t){e.setState({roominfo:t})}),this.socket.on("kickout",function(t){alert("This room is not available anymore"),e.props.history.push("/")}),this.socket.on("players",function(t){e.setState({players:t})}),this.socket.on("start",function(t){var a={};e.state.players.forEach(function(e){a[e.id]={x:0,imgurl:Math.floor(15*Math.random())+1}}),e.setState(function(e){return{roominfo:Object(J.a)({},e.roominfo,{active:!0}),players_info:a}}),e.interval=window.setInterval(function(){e.countdown()},1e3)}),this.socket.on("update",function(t){var a=parseInt(t.id);e.setState(function(e){var n=e.players_info[a];if(n){var r=n.x,o=t.step>r?t.step:r;n.x=o}return e})}),this.reqRoomInfo(),this.enter()):alert("Can not connect to server via Socket.io")}},{key:"componentWillUnmount",value:function(){var e=parseInt(this.userid);this.state.players.map(function(e){return e.id}).includes(e)&&(console.log("componentWillUnmount"),this.leave()),window.onbeforeunload=null}},{key:"render",value:function(){var e=this;return this.state.roominfo?this.state.roominfo.active?r.a.createElement("div",null,r.a.createElement(w.a,{container:!0,spacing:3},0!==this.state.timer?r.a.createElement(w.a,{item:!0,xs:8,style:{marginTop:"50px"}},r.a.createElement(k.a,{component:"div"},r.a.createElement(y.a,{textAlign:"center",fontWeight:"fontWeightBold",fontSize:48,fontFamily:"Segoe UI"},"ARE YOU READY"),r.a.createElement(y.a,{textAlign:"center",fontWeight:"fontWeightBold",fontSize:200,fontFamily:"Segoe UI"},this.state.timer))):r.a.createElement(w.a,{item:!0,xs:8},r.a.createElement(w.a,{container:!0,direction:"column",justify:"flex-start",alignItems:"center"},this.state.players.map(function(t){return r.a.createElement(w.a,{item:!0,style:{marginTop:"30px"}},r.a.createElement("h3",{style:{display:"inline-block"}},r.a.createElement("strong",null,t.name)),e.state.players_info[t.id].rank&&r.a.createElement("span",null,r.a.createElement("h3",{style:{display:"inline-block",color:"red",fontWeight:900,marginLeft:"15px"}},"rank ".concat(e.state.players_info[t.id].rank)),t.id==e.userid&&r.a.createElement("h3",{style:{display:"inline-block",color:"gray",fontWeight:900,marginLeft:"15px"}},"".concat(e.state.players_info[t.id].timing," ms"))),r.a.createElement(ee,{info:e.state.players_info[t.id],playerid:t.id}))}))),r.a.createElement(w.a,{item:!0,xs:4,style:{marginTop:"30px"}},r.a.createElement(w.a,{container:!0,direction:"column",justify:"flex-start",alignItems:"center",spacing:2},this.state.winner&&r.a.createElement(w.a,{item:!0},r.a.createElement($.a,null,r.a.createElement(k.a,{component:"div"},r.a.createElement(y.a,{style:{width:"350px"},textAlign:"center",fontWeight:"fontWeightLight",fontSize:22,fontFamily:"Segoe UI"},"WINNER"),r.a.createElement(y.a,{style:{width:"350px"},textAlign:"center",fontWeight:"fontWeightBold",fontSize:40,fontFamily:"Segoe UI"},this.state.winner)))),r.a.createElement(w.a,{item:!0},r.a.createElement(Z,{updateX:this.updateX})))))):r.a.createElement("div",null,r.a.createElement(x.a,{variant:"extended",size:"medium",color:"primary","aria-label":"Add",onClick:this.start,style:{margin:"20px auto",display:"block"}},"START"),r.a.createElement(k.a,{component:"div"},r.a.createElement(y.a,{className:"title",textAlign:"center",fontWeight:"fontWeightLight",fontSize:22,fontFamily:"Segoe UI"},"Room Name"),r.a.createElement(y.a,{className:"content",textAlign:"center",fontWeight:"fontWeightHeavy",fontSize:60,fontFamily:"Segoe UI"},this.state.roominfo.name),r.a.createElement(N.a,{className:"divider"}),r.a.createElement(y.a,{className:"title",textAlign:"center",fontWeight:"fontWeightLight",fontSize:22,fontFamily:"Segoe UI"},"Players"),this.state.players.map(function(e){return r.a.createElement(y.a,{className:"content",textAlign:"center",fontWeight:"fontWeightHeavy",fontSize:36,fontFamily:"Segoe UI"},e.name)}))):r.a.createElement("h3",null,"Loading")}}]),t}(n.Component),ae=Object(p.e)(te),ne=function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(d.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(h,null),r.a.createElement("div",{className:"container"},r.a.createElement(p.a,{exact:!0,path:"/",component:F}),r.a.createElement(p.a,{exact:!0,path:"/register",component:M}),r.a.createElement(p.a,{exact:!0,path:"/login",component:L}),r.a.createElement(p.a,{exact:!0,path:"/profile",component:q}),r.a.createElement(p.a,{exact:!0,path:"/rooms/:roomid",component:ae}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var re=a(166),oe=a(351),ie=a(349),le=a(71);console.log("prduction"),window.env={backend:"/"};var se=Object(re.a)({palette:{primary:ie.a,secondary:le.a}});i.a.render(r.a.createElement(oe.a,{theme:se},r.a.createElement(ne,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[175,1,2]]]);
//# sourceMappingURL=main.cdf9c36d.chunk.js.map