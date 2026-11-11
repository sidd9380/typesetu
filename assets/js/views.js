var VIEWS=["home","test","drills","practice","mock","guide","progress","login","signup","hubs","hub","examtest","examresult","soon","customtests","revision","factcards"];
var lastView="home", returnView="home";
var VIEW_TITLES={home:"Home",test:"Typing test",drills:"Lessons & drills",practice:"Practice passages",mock:"Exam mock",guide:"Exam guide",progress:"Dashboard",login:"Log in",signup:"Create account",hubs:"Exam patterns",hub:"Exam patterns",examtest:"Exam test",examresult:"Result",soon:"Coming soon",customtests:"Custom tests",revision:"Revision",factcards:"Fact Cards"};
function showView(name,scrollTarget){
  if(VIEWS.indexOf(name)<0) name="home";
  if(name!=="login"&&name!=="signup"){ lastView=name; }
  else { returnView=lastView; }
  VIEWS.forEach(function(v){
    var el=document.getElementById("view-"+v);
    if(el) el.classList.toggle("active", v===name);
  });
  document.querySelectorAll(".navLink").forEach(function(b){ b.classList.toggle("active", b.dataset.view===name); });
  document.body.classList.toggle("authMode", name==="login"||name==="signup");
  document.body.setAttribute("data-screen", name);
  var tt=document.getElementById("tbTitle"); if(tt) tt.textContent=VIEW_TITLES[name]||"";
  try{ history.replaceState(null,"", "#/"+name); }catch(e){}
  if(scrollTarget){
    var t=document.getElementById(scrollTarget);
    if(t){ requestAnimationFrame(function(){ try{ t.scrollIntoView({behavior:"smooth",block:"start"}); }catch(e){} }); return; }
  }

  var viewEl=document.getElementById("view-"+name);
  var resetViewScroll=function(skipEnginePanes){
    try{ window.scrollTo(0,0); document.documentElement.scrollTop=0; if(document.body) document.body.scrollTop=0; }catch(e){}
    if(!viewEl) return;
    try{ viewEl.scrollTop=0; viewEl.scrollLeft=0; }catch(e){}
    var nodes=viewEl.querySelectorAll("*");
    for(var ni=0;ni<nodes.length;ni++){
      var nd=nodes[ni];
      if(skipEnginePanes && (nd.id==="typeBox"||nd.id==="paperSheet")) continue;
      if(nd.scrollHeight>nd.clientHeight||nd.scrollWidth>nd.clientWidth){ try{ nd.scrollTop=0; nd.scrollLeft=0; }catch(e){} }
    }
  };
  resetViewScroll(false);
  requestAnimationFrame(function(){ resetViewScroll(false); });
  setTimeout(function(){ if(viewEl && viewEl.classList.contains("active")) resetViewScroll(true); },150);
  if(name==="test" && typeof renderText==="function"){ requestAnimationFrame(function(){ try{ renderText(); }catch(e){} }); }
}
document.addEventListener("click",function(e){
  var t=e.target && e.target.closest ? e.target.closest("[data-view]") : null;
  if(!t) return;
  showView(t.dataset.view, t.dataset.scrollto||null);
  if(typeof closeDrawer==="function") closeDrawer();
});
(function initFromHash(){
  var m=(location.hash||"").match(/^#\/(\w+)$/);
  showView(m? m[1] : "home");
})();

function paintNavAccount(){
  var user=window.__fbUser||null;
  var out=document.getElementById("navLoggedOut"), inn=document.getElementById("navLoggedIn");
  if(out) out.style.display= user? "none":"";
  if(inn) inn.style.display= user? "":"none";
  var ah=document.getElementById("acctHead"); if(ah) ah.style.display= user? "":"none";
  var ph=document.getElementById("profHead"); if(ph) ph.classList.toggle("isLink",!user);
  if(user){

    var n=((window.__accountName||"").trim())||((typeof SETTINGS!=="undefined"&&(SETTINGS.name||"").trim())||"");
    var av=document.getElementById("navAvatar");
    if(av) av.textContent= (n||user.email||"?").charAt(0).toUpperCase();
    var nm=document.getElementById("navUserName");
    if(nm) nm.textContent= n||(user.email||"Account");
  }
}
if(typeof paintProfile==="function"){
  var __paintProfile=paintProfile;
  paintProfile=function(){ __paintProfile(); paintNavAccount(); };
}
paintNavAccount();
var navUserBtnEl=document.getElementById("navUserBtn");
if(navUserBtnEl) navUserBtnEl.addEventListener("click",function(){ var m=document.getElementById("menuBtn"); if(m) m.click(); });

if(typeof renderDashboard==="function"){
  var __renderDashboard=renderDashboard;
  renderDashboard=function(){
    __renderDashboard();
    try{
      var h=loadHist(), strip=document.getElementById("homeBest");
      if(strip){
        if(!h.length){ strip.style.display="none"; }
        else{
          strip.style.display="";
          var best=Math.max.apply(null,h.map(function(x){return x.net}));
          var daysSet={}; h.forEach(function(x){ var d=new Date(x.ts||x.d); if(!isNaN(d)) daysSet[d.toDateString()]=1; });
          var streak=0, cur=new Date(); while(daysSet[cur.toDateString()]){ streak++; cur.setDate(cur.getDate()-1); }
          var hb=document.getElementById("hbBest"); if(hb) hb.textContent=best;
          var hs=document.getElementById("hbStreak"); if(hs) hs.textContent=streak;
        }
      }
    }catch(e){}
  };
  renderDashboard();
}

var fsRestartEl=document.getElementById("fsRestart");
if(fsRestartEl) fsRestartEl.addEventListener("click",function(){ resetTest(); focusCapture(); });
var fsExitEl=document.getElementById("fsExit");
if(fsExitEl) fsExitEl.addEventListener("click",function(){
  if(state.started && !state.finished) finishTest();

  if(state.examMode) setExamMode(false);
  document.body.classList.remove("focused");
});

var mockExamBtnEl=document.getElementById("mockExamBtn");
if(mockExamBtnEl) mockExamBtnEl.addEventListener("click",function(){ showView("test"); setExamMode(true); });
var mockSimBtnEl=document.getElementById("mockSimBtn");
if(mockSimBtnEl) mockSimBtnEl.addEventListener("click",function(){
  if(state.examMode) setExamMode(false);
  if(state.paperView) setPaperView(false);
  setDuration(10); selectLessonById("sim10");
});

var mdurSel=10;
document.querySelectorAll(".mdur").forEach(function(b){
  b.addEventListener("click",function(){
    document.querySelectorAll(".mdur").forEach(function(x){ x.classList.remove("active"); });
    b.classList.add("active"); mdurSel=+b.dataset.min;
  });
});
var startCustomMockEl=document.getElementById("startCustomMock");
if(startCustomMockEl) startCustomMockEl.addEventListener("click",function(){
  var ta=document.getElementById("customMockText"), msg=document.getElementById("customMockMsg");
  var text=(ta? ta.value:"").replace(/\s+/g," ").trim();
  if(text.length<20){ if(msg){ msg.textContent="Paste a paragraph first — at least a sentence or two (20+ characters) — then start your mock."; msg.style.color="var(--red)"; } return; }
  if(state.examMode) setExamMode(false);
  setDuration(mdurSel);
  loadText("customMock","Custom Mock",text,false);
  if(msg){ msg.textContent=""; }
  showView("test");
  setPaperView(true);
  focusCapture();
});

var cdurSel=5;
document.querySelectorAll(".cdur").forEach(function(b){
  b.addEventListener("click",function(){
    document.querySelectorAll(".cdur").forEach(function(x){ x.classList.remove("active"); });
    b.classList.add("active"); cdurSel=+b.dataset.min;
  });
});
var loadCustomEl=document.getElementById("loadCustom");
if(loadCustomEl) loadCustomEl.addEventListener("click",function(){
  var ta=document.getElementById("customText"), msg=document.getElementById("customMsg");
  var text=(ta? ta.value:"").replace(/\s+/g," ").trim();
  if(text.length<20){ if(msg){ msg.textContent="Paste a little more text first — at least a sentence or two (20+ characters)."; msg.style.color="var(--red)"; } return; }
  if(state.examMode) setExamMode(false);
  if(state.paperView) setPaperView(false);
  setDuration(cdurSel);
  loadText("customText","Custom text",text,false);
  if(msg){ msg.textContent=""; }
  showView("test"); focusCapture();
});

function applyKb(){
  var on=!!SETTINGS.kb;
  var ks=document.getElementById("kbSection"); if(ks) ks.style.display= on? "block":"none";
  document.querySelectorAll(".kbToggleBtn").forEach(function(b){
    b.textContent= on? "Hide finger keyboard":"Show finger keyboard";
    b.classList.toggle("active",on);
  });
}
document.querySelectorAll(".kbToggleBtn").forEach(function(b){
  b.addEventListener("click",function(){ SETTINGS.kb=!SETTINGS.kb; persistSettings(); applyKb(); if(b.closest && b.closest("#practiceCard") && typeof focusCapture==="function") focusCapture(); });
});
applyKb();

function fldErr(id,msg){
  var el=document.getElementById(id); if(!el) return;
  el.textContent=msg||""; el.style.display= msg? "block":"none";
}
function viewMsg(id,msg,isErr){
  var el=document.getElementById(id); if(!el) return;
  el.textContent=msg||""; el.style.color= isErr? "var(--red)":"var(--green)";
}
function validEmail(em){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em||""); }
var EYE_SVG='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>';
var EYE_OFF_SVG='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.6 10.6 0 0 1 12 19c-7 0-11-7-11-7a18.5 18.5 0 0 1 4.06-4.94M9.9 4.24A9.5 9.5 0 0 1 12 5c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12A3 3 0 1 1 9.88 9.88"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
document.querySelectorAll("[data-eye]").forEach(function(b){
  b.addEventListener("click",function(){
    var inp=document.getElementById(b.dataset.eye); if(!inp) return;
    var show=inp.type==="password";
    inp.type= show? "text":"password";
    b.innerHTML= show? EYE_OFF_SVG : EYE_SVG;
    b.setAttribute("aria-label", show? "Hide password":"Show password");
    b.setAttribute("title", show? "Hide password":"Show password");
    b.setAttribute("aria-pressed", show? "true":"false");
    try{ inp.focus({preventScroll:true}); }catch(e){ try{ inp.focus(); }catch(e2){} }
  });
});
function setBusy(btn,busy,label){
  if(!btn) return;
  if(busy){ btn.dataset.label=btn.textContent; btn.textContent=label; btn.disabled=true; btn.setAttribute("aria-busy","true"); }
  else { btn.textContent=btn.dataset.label||btn.textContent; btn.disabled=false; btn.removeAttribute("aria-busy"); }
}
var liSubmitEl=document.getElementById("liSubmit");
if(liSubmitEl) liSubmitEl.addEventListener("click",function(){
  if(liSubmitEl.disabled) return;
  var em=(document.getElementById("liEmail").value||"").trim(), pw=document.getElementById("liPass").value||"";
  fldErr("liEmailErr", validEmail(em)? "":"That email address does not look valid — please check it.");
  fldErr("liPassErr", pw? "":"Enter your password.");
  if(!validEmail(em)||!pw) return;
  if(!fbAuth){ viewMsg("liMsg","Sign-in is unavailable right now. You can keep practising — results save on this device.",true); return; }
  var limited=rateLimited("login");
  if(limited){ viewMsg("liMsg",limited,true); return; }
  viewMsg("liMsg","");
  setBusy(liSubmitEl,true,"Signing in…");
  fbAuth.signInWithEmailAndPassword(em,pw).then(function(){
    RateLimit.reset("login");
    setBusy(liSubmitEl,false);
    viewMsg("liMsg","");
    showView(returnView||"home");
  }).catch(function(e){ setBusy(liSubmitEl,false); viewMsg("liMsg",friendlyAuthError(e),true); });
});
var liForgotEl=document.getElementById("liForgot");
if(liForgotEl) liForgotEl.addEventListener("click",function(){
  if(liForgotEl.disabled) return;
  var em=(document.getElementById("liEmail").value||"").trim();
  if(!validEmail(em)){ fldErr("liEmailErr","Enter your email address first, then choose Forgot password."); return; }
  if(!fbAuth){ viewMsg("liMsg","Password reset is unavailable right now.",true); return; }
  var limited=rateLimited("passwordReset");
  if(limited){ viewMsg("liMsg",limited,true); return; }
  liForgotEl.disabled=true;
  fbAuth.sendPasswordResetEmail(em).then(function(){ viewMsg("liMsg","If an account exists for that email, a reset link is on its way."); })
    .catch(function(e){
      if(e&&e.code==="auth/user-not-found") viewMsg("liMsg","If an account exists for that email, a reset link is on its way.");
      else viewMsg("liMsg",friendlyAuthError(e),true);
    })
    .then(function(){ liForgotEl.disabled=false; });
});
var suSubmitEl=document.getElementById("suSubmit");
if(suSubmitEl) suSubmitEl.addEventListener("click",function(){
  if(suSubmitEl.disabled) return;
  var nm=(document.getElementById("suName").value||"").trim().slice(0,40);
  var em=(document.getElementById("suEmail").value||"").trim(), pw=document.getElementById("suPass").value||"";
  fldErr("suEmailErr", validEmail(em)? "":"That email address does not look valid — please check it.");
  fldErr("suPassErr", pw.length>=6? "":"Use at least 6 characters for your password.");
  if(!validEmail(em)||pw.length<6) return;
  if(!fbAuth){ viewMsg("suMsg","Sign-up is unavailable right now. You can keep practising — results save on this device.",true); return; }
  var limited=rateLimited("signup");
  if(limited){ viewMsg("suMsg",limited,true); return; }
  viewMsg("suMsg","");
  setBusy(suSubmitEl,true,"Creating account…");
  fbAuth.createUserWithEmailAndPassword(em,pw).then(function(cred){
    window.__accountName=nm;
    var u=(cred&&cred.user)||window.__fbUser||null;
    if(u){
      if(typeof acctNameCacheSet==="function") acctNameCacheSet(u.uid,nm);
      if(nm && typeof u.updateProfile==="function"){ try{ u.updateProfile({displayName:nm}).catch(function(){}); }catch(e){} }
      if(fbDb){ try{ fbDb.collection("users").doc(u.uid).set({name:nm,siteName:nm,displayName:nm,email:em,lastLogin:firebase.firestore.FieldValue.serverTimestamp()},{merge:true}).catch(function(){}); }catch(e){} }
    }
    if(typeof applyName==="function") applyName();
    setBusy(suSubmitEl,false);
    viewMsg("suMsg","");
    showView(returnView||"home");
  }).catch(function(e){ setBusy(suSubmitEl,false); viewMsg("suMsg",friendlyAuthError(e),true); });
});
[["liEmail","liSubmit"],["liPass","liSubmit"],["suName","suSubmit"],["suEmail","suSubmit"],["suPass","suSubmit"]].forEach(function(pair){
  var inp=document.getElementById(pair[0]), btn=document.getElementById(pair[1]);
  if(inp&&btn) inp.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); btn.click(); } });
});

function resultCardName(){
  if(!window.__fbUser) return "";
  var an=(window.__accountName||"").trim()||(window.__fbUser.displayName||"").trim();
  return an;
}
function fillResultCard(){
  var r=window.__lastResult, tb=document.getElementById("rcBody"); if(!tb) return;
  var nm=resultCardName();
  if(!r){ tb.innerHTML="<tr><td colspan='2'>Finish a typing test first — your result card will appear here.</td></tr>"; return; }
  var rows=[
    ["Date", r.date||""],
    ["Test", r.name||""],
    ["Duration", (r.min||"")+" min · "+(r.durSec||0)+" seconds used"],
    ["Gross WPM", r.gross], ["Net WPM", r.net], ["Accuracy", (+r.acc||0).toFixed(1)+"%"],
    ["Errors", r.errs], ["Marks", (r.net>=30? (r.marks||0)+" / 25" : "0 — below qualifying (DQ)")],
    ["Marks band", r.band||""]
  ];
  if(nm) rows.unshift(["Name", nm]);
  tb.innerHTML=rows.map(function(x){ return "<tr><td style='font-weight:700;width:38%'>"+escapeHtml(String(x[0]))+"</td><td>"+escapeHtml(String(x[1]))+"</td></tr>"; }).join("");
}
var rcBtnEl=document.getElementById("rcBtn");
if(rcBtnEl) rcBtnEl.addEventListener("click",function(){
  fillResultCard();
  var ov=document.getElementById("rcOverlay"); if(ov){ ov.classList.add("open"); ov.setAttribute("aria-hidden","false"); }
  document.body.classList.add("rcOpen");
});
function closeRc(){
  var ov=document.getElementById("rcOverlay"); if(ov){ ov.classList.remove("open"); ov.setAttribute("aria-hidden","true"); }
  document.body.classList.remove("rcOpen");
}
var rcCloseEl=document.getElementById("rcClose");
if(rcCloseEl) rcCloseEl.addEventListener("click",closeRc);
var rcOverlayEl=document.getElementById("rcOverlay");
if(rcOverlayEl) rcOverlayEl.addEventListener("click",function(e){ if(e.target===rcOverlayEl) closeRc(); });

var GATE_KEY="ts_gate_v1";
var gateSawUser=false;
function gateFlag(){ try{ return localStorage.getItem(GATE_KEY)||""; }catch(e){ return ""; } }
function setGateFlag(v){ try{ if(v) localStorage.setItem(GATE_KEY,v); else localStorage.removeItem(GATE_KEY); }catch(e){} }
var NON_RETURN_VIEWS=["login","signup","examtest","examresult"];
function openGate(){
  document.body.classList.add("gated");
  if(!document.getElementById("view-login").classList.contains("active")){ if(typeof showViewReplace==="function") showViewReplace("login"); else showView("login"); }
  if(NON_RETURN_VIEWS.indexOf(returnView)>=0) returnView="home";
}
function closeGate(target){
  var wasGated=document.body.classList.contains("gated");
  document.body.classList.remove("gated");
  document.documentElement.classList.remove("gate-pending");
  if(wasGated && target) showView(target);
}
function authGateUpdate(user){
  document.documentElement.classList.remove("gate-pending");
  if(user){
    gateSawUser=true; setGateFlag("user"); closeGate(returnView||"home");
    var onAuth=document.getElementById("view-login").classList.contains("active")||document.getElementById("view-signup").classList.contains("active");
    if(onAuth) showView(NON_RETURN_VIEWS.indexOf(returnView)<0? returnView : "home");
    return;
  }
  if(gateSawUser){ gateSawUser=false; setGateFlag(""); openGate(); return; }
  if(gateFlag()!=="guest") openGate();
}
document.querySelectorAll(".gateSkipBtn").forEach(function(b){
  b.addEventListener("click",function(){ setGateFlag("guest"); closeGate(returnView||"home"); });
});
if(typeof firebase==="undefined"||!fbAuth) authGateUpdate(null);
setTimeout(function(){
  if(document.documentElement.classList.contains("gate-pending")) authGateUpdate(window.__fbUser||null);
},4000);

document.querySelectorAll("[data-auth-back]").forEach(function(b){ b.addEventListener("click",function(){ showView(returnView&&returnView!=="login"&&returnView!=="signup"?returnView:"home"); }); });

var profHeadEl=document.getElementById("profHead");
if(profHeadEl) profHeadEl.addEventListener("click",function(e){ if(window.__fbUser||e.target.closest("button")) return; if(typeof closeDrawer==="function") closeDrawer(); showView("login"); });
