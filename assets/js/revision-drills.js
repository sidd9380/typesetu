function storedMistakeDetail(en){
  if(!en) return [];
  if(en.mistakeDetail&&en.mistakeDetail.length) return en.mistakeDetail;
  var out=[], seen={};
  if(en.telemetry&&en.telemetry.words){
    en.telemetry.words.forEach(function(w){ if((w.st==="full"||w.st==="half")&&w.exp&&!seen[w.exp]){ seen[w.exp]=1; out.push({exp:w.exp,got:w.got||"",st:w.st}); } });
    if(out.length) return out;
  }
  if(en.weakWords){ Object.keys(en.weakWords).forEach(function(w){ if(w&&!seen[w]){ seen[w]=1; out.push({exp:w,got:"",st:"full"}); } }); }
  return out;
}

function revBankKey(exp){
  if(!exp||typeof revLoad!=="function") return null;
  var bank=revLoad(), found=null, low=String(exp).toLowerCase();
  bank.words.forEach(function(x){ if(x.word===exp) found=x.word; });
  if(found) return found;
  bank.words.forEach(function(x){ if(String(x.word).toLowerCase()===low) found=x.word; });
  return found;
}

function startRevDrill(words){
  if(typeof revLoad!=="function"||typeof revStartStreamSession!=="function") return false;
  var bank=revLoad(), ws=[], seen={};
  (words||[]).forEach(function(w){
    if(!w||seen[w]) return;
    var e=null; bank.words.forEach(function(x){ if(x.word===w) e=x; });
    if(e){ seen[w]=1; ws.push(e.word); }
  });
  if(!ws.length) return false;
  revSummary=null;
  return revStartStreamSession(ws);
}
function revWireDrillButtons(wrap){
  if(!wrap) return;
  wrap.querySelectorAll(".revDrillOne").forEach(function(b){
    b.addEventListener("click",function(){
      var w=b.getAttribute("data-word")||"";
      try{ w=decodeURIComponent(w); }catch(e){}
      if(w) startRevDrill([w]);
    });
  });
}

function launchResultDrill(clientId){
  if(!clientId) return;
  var en=null; loadHist().forEach(function(x){ if(x.clientId===clientId) en=x; });
  if(!en) return;
  var det=storedMistakeDetail(en); if(!det.length) return;
  var missing=det.filter(function(d){ return !revBankKey(d.exp); });
  if(missing.length&&typeof revFeed==="function"){ try{ revFeed(missing, en.examId||"hcm"); }catch(e){ console.warn("Launch drill bank feed failed",e); } }
  var words=[];
  det.forEach(function(d){ var k=revBankKey(d.exp); if(k&&words.indexOf(k)<0) words.push(k); });
  if(words.length) startRevDrill(words);
}

function pmApplyResults(mres,s){
  var words=window.__pmWords||[]; window.__pmWords=[];
  if(!words.length||typeof revApplyResult!=="function") return;
  var typedLen=0, target="";
  try{ typedLen=state.typed.length; target=state.target||""; }catch(e){}
  var lastStart={}, bounds=[], start=null, k;
  for(k=0;k<=target.length;k++){
    if(k===target.length||target[k]===" "){ if(start!==null){ bounds.push([start,k]); start=null; } }
    else if(start===null) start=k;
  }
  bounds.forEach(function(w){ lastStart[target.slice(w[0],w[1])]=w[0]; });
  var bad={}; (mres.rows||[]).forEach(function(r){ bad[r.exp]=1; });
  words.forEach(function(w){
    var key=revBankKey(w); if(!key) return;
    var attempted= (lastStart[w]!=null&&typedLen>lastStart[w])||(target.length>0&&typedLen>=target.length);
    if(!attempted) return;
    if(bad[w]) revApplyResult(key,false);
    else if((+s.acc||0)>=98) revApplyResult(key,true);
  });
}

function hcmEntryForTest(testId){
  var h=loadHist(), i;
  for(i=0;i<h.length;i++){ if(h[i].testId===testId) return h[i]; }
  var it=(typeof flatTexts!=="undefined")? flatTexts.find(function(x){ return x.id===testId; }) : null;
  if(it){ for(i=0;i<h.length;i++){ if(!h[i].examId&&h[i].name===it.name) return h[i]; } }
  return null;
}
function openStoredResult(en){
  if(!en) return;
  if(en.examId&&typeof specOf==="function"&&specOf(en.examId)){ renderStoredResult(en); return; }
  renderStoredHcmResult(en);
}
function openStoredResultById(cid){
  if(!cid) return;
  var en=null; loadHist().forEach(function(x){ if(x.clientId===cid) en=x; });
  if(en) openStoredResult(en);
}

function renderStoredHcmResult(en){
  var qual=(+en.net||0)>=30;
  var catNames={spelling:"Spelling / wrong character",capital:"Capitalisation",punct:"Punctuation",spacing:"Spacing",other:"Other / extra–omitted"};
  var h="<button class='pill' type='button' id='xrBack3'>← Back to Progress</button>";
  h+="<h1 style='font-size:26px;margin-top:12px'>"+escapeHtml(en.name||"Typing test")+"</h1>";
  h+="<p><span class='statusChip "+(qual?"q":"nq")+"'>"+(qual?"✓ Qualified":"✗ Below qualifying speed")+"</span></p>"
    +"<p class='sub'>"+escapeHtml(bandLabel(+en.net||0))+" · Attempted "+escapeHtml(en.d||"")+"</p>";
  h+="<div class='card'><h2>Performance Summary</h2><div class='statsGrid'>"
    +"<div class='stat'><div class='v'>"+Math.round(en.net||0)+"</div><div class='l'>Net WPM</div></div>"
    +"<div class='stat'><div class='v'>"+(+en.acc||0).toFixed(1)+"%</div><div class='l'>Accuracy</div></div>"
    +"<div class='stat'><div class='v'>"+(qual? (en.marks||0)+" / 25":"0 (DQ)")+"</div><div class='l'>Marks</div></div>"
    +"<div class='stat'><div class='v'>"+(en.gross||0)+"</div><div class='l'>Gross WPM</div></div>"
    +"<div class='stat'><div class='v'>"+fmtNum(en.chars||0)+"</div><div class='l'>Keystrokes typed</div></div>"
    +"<div class='stat'><div class='v'>"+(en.bs||0)+"</div><div class='l'>Backspaces used</div></div>"
    +"<div class='stat'><div class='v'>"+fmtTime(en.durSec||((en.min||0)*60))+"</div><div class='l'>Time used</div></div>"
    +"<div class='stat'><div class='v'>"+(en.words||0)+"</div><div class='l'>Words typed</div></div>"
    +"<div class='stat'><div class='v'>"+(en.errs||0)+"</div><div class='l'>Full mistakes</div></div>"
    +"</div></div>";
  if(en.errCat){
    var rowsB=""; Object.keys(catNames).forEach(function(k){ rowsB+="<tr><td>"+catNames[k]+"</td><td><strong>"+(en.errCat[k]||0)+"</strong></td></tr>"; });
    rowsB+="<tr><td><strong>Total errors</strong></td><td><strong>"+(en.errs||0)+"</strong></td></tr>";
    h+="<div class='card'><h2>Error breakdown</h2><table><tbody>"+rowsB+"</tbody></table></div>";
  }
  var wkS=Object.keys(en.weakKeys||{}).sort(function(a,b){ return en.weakKeys[b]-en.weakKeys[a]; }).slice(0,6)
    .map(function(k){ return "'"+(k===" "?"space":escapeHtml(k))+"' ×"+en.weakKeys[k]; }).join(", ");
  var wwS=Object.keys(en.weakWords||{}).sort(function(a,b){ return en.weakWords[b]-en.weakWords[a]; }).slice(0,6)
    .map(function(k){ return escapeHtml(k)+" ×"+en.weakWords[k]; }).join(", ");
  if(wkS||wwS) h+="<div class='card'><h2>Weakest keys &amp; words</h2><p class='small' style='margin:0'>"+(wkS? "Weakest keys: <strong>"+wkS+"</strong><br>":"")+(wwS? "Words with errors: <strong>"+wwS+"</strong>":"")+"</p></div>";
  if(en.telemetry){
    h+=forensicsHtml(en.telemetry,{engine:"E3",examId:"hcm",netWpm:+en.net||0,grossWpm:+en.gross||0,acc:+en.acc||0,chars:en.chars||0,completion:null,wordsTyped:en.words||0});
  } else {
    h+="<div class='card'><p class='small' style='margin:0'>Detailed analysis is available for tests taken after the Phase 3 update.</p></div>";
  }
  h+="<div style='display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px'><button class='btn' type='button' data-view='test'>⌨️ Typing Test</button>"
    +(storedMistakeDetail(en).length? "<button class='btn secondary' id='xrDrill3' type='button'>🔁 Launch drill — fix these words</button>":"")
    +"<button class='btn secondary' type='button' data-view='progress'>📊 Dashboard</button></div>";
  document.getElementById("exResultBody").innerHTML=h;
  document.getElementById("xrBack3").addEventListener("click",function(){ showView("progress"); });
  var xrD3=document.getElementById("xrDrill3"); if(xrD3) xrD3.addEventListener("click",function(){ launchResultDrill(en.clientId); });
  showView("examresult");
}

var hwElV29=document.getElementById("historyWrap");
if(hwElV29) hwElV29.addEventListener("click",function(ev){
  var tr=ev.target&&ev.target.closest? ev.target.closest("tr[data-cid]"):null;
  if(tr) openStoredResultById(tr.getAttribute("data-cid"));
});
var fxLbElV29=document.getElementById("fxLaunchBtn");
if(fxLbElV29) fxLbElV29.addEventListener("click",function(){ launchResultDrill(window.__lastEntryClientId); });
