var navRenderView=showView;
var NAV33={idx:-1,current:null,restoring:false,replaceOnce:false,guardOpen:false};
function nav33Key(st){ return st.view+"|"+(st.examId||"")+"|"+(st.resultId||""); }
function nav33Collect(view){
  var st={v33:1,view:view,n:0};
  if(view==="hub"){ st.examId=(typeof hubState!=="undefined"&&hubState)? (hubState.examId||null) : null; }
  if(view==="examresult"){
    var cid=window.__navResultCid||null;
    if(!cid&&NAV33.current&&NAV33.current.view==="examtest"){
      try{ var h=loadHist(); if(h&&h.length) cid=h[0].clientId||null; }catch(e){}
    }
    st.resultId=cid;
  }
  return st;
}
function nav33StopRunningTests(fromView,toView){
  if(fromView===toView) return;
  if(fromView==="test") nav33DiscardHcmTest();
  if(fromView==="examtest"&&toView!=="examresult"&&typeof EX!=="undefined"&&EX.started&&!EX.finished){
    clearInterval(EX.timer); EX.finished=true;
  }
}
function nav33ShowView(name,scrollTarget){
  if(typeof VIEWS!=="undefined"&&VIEWS.indexOf(name)<0) name="home";
  nav33StopRunningTests(NAV33.current&&NAV33.current.view,name);
  if(NAV33.restoring){ navRenderView(name,scrollTarget); return; }
  var st=nav33Collect(name);

  var fromAuth= NAV33.current&&(NAV33.current.view==="login"||NAV33.current.view==="signup");
  var replace= NAV33.replaceOnce||fromAuth;
  NAV33.replaceOnce=false;
  if(!replace&&NAV33.current&&nav33Key(st)===nav33Key(NAV33.current)){
    navRenderView(name,scrollTarget);
    nav33Stamp(NAV33.current);
    return;
  }
  navRenderView(name,scrollTarget);
  if(!replace&&NAV33.current){

    try{ history.replaceState(NAV33.current,"","#/"+NAV33.current.view); }catch(e){}
  }
  st.n= replace? Math.max(0,NAV33.idx) : NAV33.idx+1;
  try{ if(replace) history.replaceState(st,"","#/"+name); else history.pushState(st,"","#/"+name); }catch(e){}
  NAV33.idx=st.n; NAV33.current=st;
}
showView=nav33ShowView;
function showViewReplace(name,scrollTarget){ NAV33.replaceOnce=true; showView(name,scrollTarget); }
function nav33Stamp(st){ try{ history.replaceState(st,"","#/"+st.view); }catch(e){} }
function nav33Restore(st){
  if(!st||typeof st.view!=="string") st={v33:1,view:"home",n:NAV33.idx};
  if(st.view==="hub"&&!st.examId) st={v33:1,view:"hubs",n:st.n};
  nav33StopRunningTests(NAV33.current&&NAV33.current.view,st.view);
  NAV33.restoring=true;
  NAV33.idx=(typeof st.n==="number")? st.n : NAV33.idx;
  NAV33.current=st;
  try{
    if(st.view==="hub"){
      var hb=document.getElementById("hubBody");
      if(hubState.examId!==st.examId||!hb||!hb.innerHTML){
        hubState={examId:st.examId,q:"",sort:"new",filter:"all",diff:"all"};
        renderHub();
      }
      navRenderView("hub");
    } else if(st.view==="examresult"&&st.resultId){
      var en=null;
      loadHist().forEach(function(x){ if(x.clientId===st.resultId) en=x; });
      if(en){ openStoredResult(en); }
      else { NAV33.current={v33:1,view:"progress",n:NAV33.idx}; navRenderView("progress"); }
    } else {
      navRenderView(st.view);
    }
  }catch(e){ try{ navRenderView("home"); }catch(e2){} }
  NAV33.restoring=false;
  nav33Stamp(NAV33.current);
}

function nav33DiscardHcmTest(){
  try{
    if(typeof state!=="undefined"&&state&&state.started&&!state.finished){
      if(state.examMode&&typeof setExamMode==="function") setExamMode(false);
      else if(typeof resetTest==="function") resetTest();
    }
  }catch(e){}
}
window.addEventListener("popstate",function(e){
  if(NAV33.guardOpen) return;
  var st=(e.state&&e.state.v33)? e.state : null;
  if(!st){
    var m=(location.hash||"").match(/^#\/(\w+)$/);
    st={v33:1,view:(m? m[1]:"home"),n:Math.max(0,NAV33.idx-1)};
    if(st.view==="hub") st.examId=(typeof hubState!=="undefined"&&hubState)? (hubState.examId||null) : null;
  }
  var cur=NAV33.current;

  if(cur&&st.view!==cur.view&&cur.view==="examtest"&&typeof EX!=="undefined"&&EX&&EX.started&&!EX.finished){
    NAV33.guardOpen=true;
    var target=st;
    var delta=((typeof st.n==="number")? st.n : NAV33.idx-1)-NAV33.idx;
    askConfirm("Leave this test?","Your attempt will be cancelled and nothing will be saved.",function(){
      NAV33.guardOpen=false;
      try{ clearInterval(EX.timer); }catch(e2){}
      nav33Restore(target);
    },function(){
      NAV33.guardOpen=false;
      if(delta===0){ nav33Restore(cur); return; }
      try{ history.go(-delta); }catch(e2){}
      setTimeout(function(){ if(NAV33.current!==cur) return; if(!document.getElementById("view-examtest").classList.contains("active")) nav33Restore(cur); },400);
    });
    return;
  }
  if(cur&&st.view!==cur.view&&cur.view==="test") nav33DiscardHcmTest();

  nav33Restore(st);
});

document.addEventListener("click",function(e){
  var b=e.target&&e.target.closest? e.target.closest(".navBackBtn") : null;
  if(!b) return;
  nav33DiscardHcmTest();
  if(NAV33.idx>0){ history.back(); }
  else { showView(b.getAttribute("data-fallback-view")||"home"); }
});

if(typeof openStoredResult==="function"){
  var __nav33OSR=openStoredResult;
  openStoredResult=function(en){ window.__navResultCid=(en&&en.clientId)||null; return __nav33OSR(en); };
}
if(typeof openStoredResultById==="function"){
  var __nav33OSRI=openStoredResultById;
  openStoredResultById=function(cid){ window.__navResultCid=cid||null; return __nav33OSRI(cid); };
}

(function nav33Seed(){
  var activeEl=document.querySelector(".view.active");
  var v=activeEl? activeEl.id.replace(/^view-/,"") : "home";
  if(v==="hub"){ navRenderView("hubs"); v="hubs"; }
  var st=nav33Collect(v); st.n=0;
  NAV33.idx=0; NAV33.current=st;
  nav33Stamp(st);
})();
