var EXAM_SPECS=[
 {id:"hcm",engine:"E3",name:"Delhi Police HCM",short:"Delhi Police HCM",body:"Delhi Police",posts:"Head Constable Ministerial (HCM)",durationMin:10,durationLabel:"10 minutes",targetLabel:"30 WPM (net) · English",targetWPM:30,nature:"25 marks in final merit",errorAllowance:"No half mistakes — every error counts in full",backspace:true,penaltyLabel:"1 word deducted per full mistake",evaluation:"Marks bands by net WPM",categories:null,starter:false,pibNote:"Some practice passages are adapted from Press Information Bureau (PIB), Government of India releases.",
  formula:["Gross WPM = keystrokes typed ÷ 5 ÷ minutes.","Count full mistakes — HCM has no half mistakes: spelling, capitalisation, punctuation, spacing and omitted words all count in full.","Net WPM = (gross words − full mistakes) ÷ minutes.","Marks by net WPM band: below 30 disqualifies · 30 → 10 · 31–35 → 12 · 36–40 → 15 · 41–45 → 18 · 46–50 → 21 · 51+ → 25."],
  faq:[["What speed do I need?","A net speed of at least 30 WPM to qualify; 51+ net WPM earns the full 25 marks."],["Are there half mistakes in HCM?","No. Every error — even one wrong letter or a missed capital — counts as a full mistake."],["Is the test on paper or screen?","You type from a printed sheet (paper-to-screen). TypeSetu keeps both: choose Screen or Paper View before you start."],["How long is the test?","10 minutes, with a passage of roughly 400+ words (about 2,000 keystrokes)."]]},
 {id:"chsl",engine:"E1",name:"SSC CHSL — LDC / JSA",short:"SSC CHSL",body:"Staff Selection Commission (SSC)",posts:"Lower Division Clerk (LDC) / Junior Secretariat Assistant (JSA)",durationMin:10,durationLabel:"10 minutes",targetLabel:"35 WPM · English",targetWPM:35,nature:"Qualifying only",errorAllowance:"Error % ≤ 7% (UR) · ≤ 10% (Reserved)",backspace:true,penaltyLabel:"Error % = (Full + 0.5 × Half) ÷ words typed × 100",evaluation:"Qualifying — error % cap + 35 WPM speed, by category",categories:[{id:"UR",label:"UR",cap:7},{id:"Reserved",label:"Reserved",cap:10}],starter:false,pibNote:"Some practice passages are adapted from Press Information Bureau (PIB), Government of India releases.",
  formula:["Type the passage on screen (TCS-style) in 10 minutes — Backspace is allowed, and only the final on-screen text is judged.","Compare word by word: a word with a single character-level error (one letter wrong, omitted or added, a capitalisation, punctuation or spacing slip) is a HALF mistake; a wrong, skipped or extra word is a FULL mistake.","Error % = (Full mistakes + 0.5 × Half mistakes) ÷ words typed × 100.","You qualify when Error % is within your category cap (UR 7% · Reserved 10%) AND your speed reaches 35 WPM. Untyped passage text is never counted as a mistake — completion % is reported separately."],
  faq:[["What error % is allowed?","Up to 7% for UR and up to 10% for Reserved categories — and you must also reach 35 WPM."],["What is a half mistake?","A word with exactly one character-level slip — one letter wrong, missed or extra, or a capitalisation / punctuation / spacing slip. Wrong, skipped and extra words are full mistakes."],["Is CHSL typing qualifying or scored?","Qualifying only — it does not add marks to your merit; you must simply clear it."],["How long is the passage?","About 1,750 keystrokes (roughly 230–280 words) in 10 minutes."]]},
 {id:"cgl",engine:"E1",name:"SSC CGL — DEST",short:"SSC CGL DEST",body:"Staff Selection Commission (SSC)",posts:"Data Entry Speed Test (DEST) — Tax Assistant and other posts",durationMin:15,durationLabel:"15 minutes",targetLabel:"Completion within 15 min · English",targetWPM:0,nature:"Qualifying only",errorAllowance:"Error % ≤ 20% (UR) · ≤ 25% (OBC/EWS) · ≤ 30% (Others)",backspace:true,penaltyLabel:"Error % = (Full + 0.5 × Half) ÷ words typed × 100",evaluation:"Qualifying — error % cap by category",categories:[{id:"UR",label:"UR",cap:20},{id:"OBC-EWS",label:"OBC / EWS",cap:25},{id:"Others",label:"Others",cap:30}],starter:false,pibNote:"Some practice passages are adapted from Press Information Bureau (PIB), Government of India releases.",
  formula:["Type the passage on screen (TCS-style) in 15 minutes — about 2,000 keystrokes. Backspace is allowed; only the final on-screen text is judged.","Compare word by word: a single character-level slip in a word is a HALF mistake; a wrong, skipped or extra word is a FULL mistake.","Error % = (Full mistakes + 0.5 × Half mistakes) ÷ words typed × 100.","You qualify when Error % is inside your category cap — UR 20% · OBC/EWS 25% · Others 30%. (Higher-standard posts use tighter caps of 5% / 7% / 10%.) There is no separate WPM target: completing the passage inside the cap is the standard. Untyped text is never counted as a mistake."],
  faq:[["What error % is allowed in DEST?","UR 20%, OBC/EWS 25%, Others 30%. Some higher-standard posts apply 5% / 7% / 10% instead."],["Is there a WPM target?","No separate target — finish the ~2,000-keystroke passage in 15 minutes with your error % inside the cap. Your words typed and gross WPM are shown for information."],["What is a half mistake?","A word with exactly one character-level slip. Wrong, skipped and extra words are full mistakes."],["Is DEST qualifying or scored?","Qualifying only."]]},
 {id:"rrb",engine:"E2",name:"RRB NTPC — CBTST",short:"RRB NTPC",body:"Railway Recruitment Board (RRB)",posts:"NTPC posts requiring a typing skill test (CBTST)",durationMin:10,durationLabel:"10 minutes",targetLabel:"30 WPM (net) · English",targetWPM:30,nature:"Qualifying only",errorAllowance:"First 5% of words typed are penalty-free",backspace:false,penaltyLabel:"10 words per excess mistake (full + half, after 5% free allowance)",evaluation:"Qualifying — net speed ≥ 30 WPM; minimum 300 words typed",categories:null,starter:false,pibNote:"Some practice passages are adapted from Press Information Bureau (PIB), Government of India releases.",
  formula:["Type for 10 minutes with Backspace DISABLED — the caret stays at the end, like the real CBTST. If you finish the passage early, it restarts from the beginning and keeps cycling until time ends.","Compare word by word: a word with a single character-level error (one letter wrong, omitted or added, a capitalisation, punctuation or spacing slip) is a HALF mistake; a wrong, skipped or extra word is a FULL mistake.","The first 5% of words typed are penalty-free: Final Mistakes = (Full + 0.5 × Half) − the 5% allowance, never below zero.","Net Speed = (Words typed − Final Mistakes × 10) ÷ minutes. You need at least 300 words typed for the attempt to be evaluated at all, and a net speed of 30 WPM to qualify."],
  faq:[["Does Backspace work in RRB NTPC typing?","No — Backspace is disabled in the real CBTST, and so it is here. Arrow keys, word-delete shortcuts and mouse repositioning are locked too; the caret stays at the end."],["Are there half mistakes in CBTST?","Yes. Under the official RRB instructions, a word with a single character-level error is a half mistake; wrong, skipped and extra words are full."],["What is the 5% rule?","Mistakes up to 5% of your total words typed are ignored. Beyond that, each final mistake (full + 0.5 × half, after the allowance) deducts 10 words from your net speed."],["What if I type fewer than 300 words?","The attempt is marked “Not evaluated” — the real test applies the same 300-word minimum."]]}
];
function specOf(id){ return EXAM_SPECS.find(function(x){return x.id===id;}); }
function fmtNum(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,","); }

function flowText(t){ return (t||"").replace(/\s+/g," "); }
function batchTests(examId){
  var sp=specOf(examId); var raw=PASSAGE_BATCH[examId]||[];
  return raw.map(function(p,i){
    return {id:p.tid,num:i+1,name:(examId==="hcm"?"HCM":sp.short)+" Mock "+(i+1),text:flowText(p.text),diff:p.diff,topic:p.topic};
  });
}
function hcmTests(){ return batchTests("hcm"); }
function testsOf(examId){ return batchTests(examId); }

PASSAGE_BATCH.hcm.forEach(function(p,i){
  flatTexts.push({id:p.tid,name:"HCM Mock "+(i+1),text:flowText(p.text)});
  DIFF[p.tid]=p.diff;
});
function attemptedEntry(testId){
  var h=loadHist();
  for(var i=0;i<h.length;i++){ if(h[i].testId===testId) return h[i]; }
  return null;
}

function examCardHtml(sp){
  var n=testsOf(sp.id).length;
  return "<button class='examCard' type='button' data-hub='"+sp.id+"'><h3>"+sp.name+"</h3><p>"+sp.posts+"</p><div class='ecMeta'><span class='pillStat'>"+n+" tests</span><span class='ecGo'>Start practice</span></div></button>";
}
function renderExamGrids(){
  var g=document.getElementById("examGrid"); if(g) g.innerHTML=EXAM_SPECS.map(examCardHtml).join("");
  var hg=document.getElementById("hubGrid"); if(hg) hg.innerHTML=EXAM_SPECS.map(examCardHtml).join("");
}
function filterExamGrid(inputId,gridId){
  var inp=document.getElementById(inputId), grid=document.getElementById(gridId); if(!inp||!grid) return;
  var q=(inp.value||"").toLowerCase();
  grid.querySelectorAll(".examCard").forEach(function(c){
    var sp=specOf(c.getAttribute("data-hub"));
    var hay=(sp.name+" "+sp.body+" "+sp.posts).toLowerCase();
    c.style.display=(!q||hay.indexOf(q)>=0)?"":"none";
  });
}
["examSearch","hubSearch"].forEach(function(id){
  var el=document.getElementById(id);
  if(el) el.addEventListener("input",function(){ filterExamGrid("examSearch","examGrid"); filterExamGrid("hubSearch","hubGrid"); });
});
document.addEventListener("click",function(e){
  var t=e.target&&e.target.closest? e.target.closest("[data-hub]"):null;
  if(t){ openHub(t.getAttribute("data-hub")); }
  var so=e.target&&e.target.closest? e.target.closest("[data-soon]"):null;
  if(so){
    var nm=so.getAttribute("data-soon");
    document.getElementById("soonTitle").textContent=nm+" — coming soon";
    document.getElementById("soonText").textContent= nm==="Live Tests"
      ? "Scheduled live tests are being built. Until they open, every mock on the Exam Patterns hubs is free and available any time — no fake schedules, no invented counts."
      : "Our own printable passage sheets are being prepared for each exam's real format. They will appear here as free downloads — no placeholder files in the meantime.";
    showView("soon");
  }
});

var hubState={examId:"chsl",q:"",sort:"new",filter:"all",diff:"all"};
function openHub(examId){ hubState={examId:examId,q:"",sort:"new",filter:"all",diff:"all"}; renderHub(); showView("hub"); }
function renderHub(){
  var sp=specOf(hubState.examId); if(!sp) return;
  var tests=testsOf(sp.id);
  var h="<h1 style='font-size:28px'>"+sp.name+"</h1><p class='sub'>"+sp.posts+"</p>";
  h+="<div style='display:flex;flex-wrap:wrap;gap:6px;margin:10px 0'><span class='pillStat'>"+tests.length+" tests available</span><span class='pillStat'>Duration: "+sp.durationLabel+"</span><span class='pillStat'>Target: "+sp.targetLabel+"</span></div>";
  h+="<div class='patStrip'>"
    +"<span class='psItem'><span class='psL'>Duration</span><span class='psV'>"+sp.durationLabel+"</span></span>"
    +"<span class='psItem'><span class='psL'>Target speed</span><span class='psV'>"+sp.targetLabel+"</span></span>"
    +"<span class='psItem'><span class='psL'>Error rule</span><span class='psV'>"+sp.errorAllowance+"</span></span>"
    +"<span class='psItem'><span class='psL'>Penalty</span><span class='psV'>"+sp.penaltyLabel+"</span></span>"
    +"<span class='psItem'><span class='psL'>Backspace</span><span class='psV'>"+(sp.backspace?"Allowed":"Disabled")+"</span></span>"
    +"<span class='psItem'><span class='psL'>Evaluation</span><span class='psV'>"+sp.evaluation+"</span></span></div>";
  h+="<p class='small' style='margin:0 0 14px'>Pattern last checked: 9 Nov 2026</p>";
  if(sp.id==="hcm"){
    h+="<div class='card'><h2>The HCM course</h2><div style='display:flex;gap:8px;flex-wrap:wrap'><button class='btn' type='button' data-view='test'>⌨️ Typing Test (Screen / Paper chooser)</button><button class='btn secondary' type='button' data-view='drills'>🎯 Lessons &amp; Drills</button><button class='btn secondary' type='button' data-view='practice'>📄 Themed Practice</button><button class='btn secondary' type='button' data-view='mock'>🏛 Exam Mock</button></div></div>";
  }
  h+="<div class='card'><h2>Tests</h2>"
    +"<div class='controls'><input class='searchBox' id='tlSearch' type='search' placeholder='Search by name or number…' style='flex:1 1 200px' value='"+escapeHtml(hubState.q)+"'>"
    +"<select id='tlSort' aria-label='Sort tests'><option value='new'"+(hubState.sort==="new"?" selected":"")+">Newest first</option><option value='old'"+(hubState.sort==="old"?" selected":"")+">Oldest first</option></select></div>"
    +"<div class='controls' id='tlFilters'>"
    +"<button class='pill tlF' data-f='all' type='button'>All</button><button class='pill tlF' data-f='done' type='button'>Attempted</button><button class='pill tlF' data-f='todo' type='button'>Not attempted</button><span style='flex:1'></span>"
    +"<button class='pill tlD' data-d='all' type='button'>All difficulties</button><button class='pill tlD' data-d='easy' type='button'>Easy</button><button class='pill tlD' data-d='medium' type='button'>Moderate</button><button class='pill tlD' data-d='hard' type='button'>Hard</button></div>"
    +"<div id='tlList'></div>" + "<p class='small' style='margin:10px 0 0;opacity:.75'>"+sp.pibNote+"</p></div>";
  h+="<div class='card'><h2>Frequently asked questions</h2>"+sp.faq.map(function(f){return "<details><summary>"+f[0]+"</summary><p style='margin-top:8px'>"+f[1]+"</p></details>";}).join("")+"</div>";
  document.getElementById("hubBody").innerHTML=h;
  var srch=document.getElementById("tlSearch");
  if(srch) srch.addEventListener("input",function(){ hubState.q=srch.value; renderTestList(); });
  var srt=document.getElementById("tlSort");
  if(srt) srt.addEventListener("change",function(){ hubState.sort=srt.value; renderTestList(); });
  document.querySelectorAll(".tlF").forEach(function(b){ b.addEventListener("click",function(){ hubState.filter=b.dataset.f; renderTestList(); }); });
  document.querySelectorAll(".tlD").forEach(function(b){ b.addEventListener("click",function(){ hubState.diff=b.dataset.d; renderTestList(); }); });
  renderTestList();
}
function renderTestList(){
  var sp=specOf(hubState.examId); var wrap=document.getElementById("tlList"); if(!wrap) return;
  document.querySelectorAll(".tlF").forEach(function(b){ b.classList.toggle("active",b.dataset.f===hubState.filter); });
  document.querySelectorAll(".tlD").forEach(function(b){
    var d=b.dataset.d; var cnt= d==="all"? testsOf(sp.id).length : testsOf(sp.id).filter(function(t){return t.diff===d;}).length;
    b.classList.toggle("active",d===hubState.diff);
    if(d!=="all") b.textContent=(d==="easy"?"Easy":d==="medium"?"Moderate":"Hard")+" ("+cnt+")";
  });
  var tests=testsOf(sp.id).slice();
  if(hubState.sort==="new") tests.sort(function(a,b){return b.num-a.num;}); else tests.sort(function(a,b){return a.num-b.num;});
  var q=hubState.q.toLowerCase();
  var rowsHtml="";
  tests.forEach(function(t){
    var att= sp.id==="hcm"? (lessonStatus(t.id).completed? {} : null) : attemptedEntry(t.id);
    if(hubState.filter==="done"&&!att) return;
    if(hubState.filter==="todo"&&att) return;
    if(hubState.diff!=="all"&&t.diff!==hubState.diff) return;
    if(q && (t.name.toLowerCase().indexOf(q)<0 && String(t.num).indexOf(q)<0 && (t.topic||"").toLowerCase().indexOf(q)<0)) return;
    var wc=wordCountOf(t.text);
    var act= att
      ? "<button class='btn secondary trResult' data-tid='"+t.id+"' type='button'>Result</button><button class='btn trStart' data-tid='"+t.id+"' type='button'>Retake</button>"
      : "<button class='btn trStart' data-tid='"+t.id+"' type='button'>Start Test →</button>";
    rowsHtml+="<div class='testRow'><span class='trNum'>"+t.num+"</span><span class='trMain'><strong>"+escapeHtml(t.name)+"</strong>"+(t.topic?"<span class='trTopic'>"+escapeHtml(t.topic)+"</span>":"")+"<span>"+wc+" words · "+fmtNum(t.text.length)+" keystrokes"+(att?" · ✓ Attempted":"")+"</span></span><span class='dtag d-"+t.diff+"'>"+(t.diff==="easy"?"Easy":t.diff==="medium"?"Moderate":"Hard")+"</span><span class='trAct'>"+act+"</span></div>";
  });
  wrap.innerHTML= rowsHtml||"<p class='small'>No tests match these filters.</p>";
  wrap.querySelectorAll(".trStart").forEach(function(b){ b.addEventListener("click",function(){ startHubTest(sp.id,b.dataset.tid); }); });
  wrap.querySelectorAll(".trResult").forEach(function(b){ b.addEventListener("click",function(){

    var en= sp.id==="hcm"? hcmEntryForTest(b.dataset.tid) : attemptedEntry(b.dataset.tid);
    if(en) openStoredResult(en); else showView("progress");
  }); });
}
function startHubTest(examId,testId){
  if(examId==="hcm"){
    var it=flatTexts.find(function(x){return x.id===testId;});
    if(it && testId.indexOf("para")!==0 && testId!=="sim10"){

      sel.value=it.id; loadText(it.id,it.name,it.text,false); gotoPractice(); focusCapture(); return;
    }
    selectLessonById(testId); return;
  }
  var sp=specOf(examId); var t=testsOf(examId).find(function(x){return x.id===testId;}); if(!t) return;
  openExamTest(sp,t);
}

function lev(a,b){
  if(a===b) return 0;
  var m=a.length,n=b.length; if(Math.abs(m-n)>2) return 3;
  var prev=[],cur=[],i,j;
  for(j=0;j<=n;j++) prev[j]=j;
  for(i=1;i<=m;i++){ cur[0]=i; for(j=1;j<=n;j++){ cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1)); } var tmp=prev; prev=cur; cur=tmp; }
  return prev[n];
}
function classifyPair(exp,got){
  if(exp===got) return "ok";
  if(exp.toLowerCase()===got.toLowerCase()) return "half";
  if(lev(exp,got)===1) return "half";
  if(lev(exp.replace(/[^A-Za-z0-9]/g,""),got.replace(/[^A-Za-z0-9]/g,""))===0) return "half";
  return "full";
}
function scoreWords(expText,gotText){
  var E=expText.split(/\s+/).filter(Boolean), G=gotText.split(/\s+/).filter(Boolean);
  var i=0,j=0,full=0,half=0,wrong=0,skipped=0,extra=0,detail=[];
  while(i<E.length&&j<G.length){
    if(E[i]===G[j]){ i++; j++; continue; }
    if(i+1<E.length&&E[i+1]===G[j]){ skipped++; full++; detail.push({exp:E[i],got:"",kind:"skipped"}); i++; continue; }
    if(j+1<G.length&&G[j+1]===E[i]){ extra++; full++; detail.push({exp:"",got:G[j],kind:"extra"}); j++; continue; }
    if(j===G.length-1 && G[j].length<E[i].length && E[i].indexOf(G[j])===0){ j++; i++; break; }
    var c=classifyPair(E[i],G[j]);
    if(c==="half"){ half++; detail.push({exp:E[i],got:G[j],kind:"half"}); } else { full++; wrong++; detail.push({exp:E[i],got:G[j],kind:"wrong"}); }
    i++; j++;
  }
  while(j<G.length){ extra++; full++; detail.push({exp:"",got:G[j],kind:"extra"}); j++; }
  var consumedE=i;
  return {full:full,half:half,wrong:wrong,skipped:skipped,extra:extra,detail:detail,wordsTyped:G.length,expWords:E.length,consumedE:consumedE,completion: E.length? Math.min(100,consumedE/E.length*100):0};
}

var EX={spec:null,test:null,category:null,started:false,startT:0,timer:null,finished:false,fontPx:19,sound:false,audio:null,cycles:0};
function exFullTarget(){
  var base=EX.test.text;
  if(EX.spec.id!=="rrb") return base;
  var typed=(document.getElementById("exCapture").value||"");
  var reps=Math.max(1,Math.ceil((typed.length+200)/base.length));
  var out=""; for(var k=0;k<reps;k++) out+=(out?" ":"")+base;
  return out;
}
function openExamTest(sp,t){
  EX.spec=sp; EX.test=t; EX.category= sp.categories? sp.categories[0].id : ""; EX.started=false; EX.finished=false; EX.cycles=0;
  clearInterval(EX.timer);
  if(window.TEL) TEL.setTarget(null,"typed");
  document.getElementById("exTitle").textContent=sp.name+" — "+t.name;
  document.getElementById("exCand").textContent= window.__fbUser? ((window.__accountName||"").trim()||window.__fbUser.email||"Account") : "Practice candidate";
  document.getElementById("exBsState").textContent="Backspace: "+(sp.backspace?"Allowed":"Disabled");
  document.getElementById("exTime").textContent=fmtTime(sp.durationMin*60);
  document.getElementById("exRing").style.strokeDashoffset="0";
  document.getElementById("exWords").textContent="0"; document.getElementById("exKeys").textContent="0";
  document.getElementById("exPreTitle").textContent=t.name+" — before you start";
  document.getElementById("exPreInfo").textContent=sp.durationLabel+" · "+wordCountOf(t.text)+" words · "+fmtNum(t.text.length)+" keystrokes · Backspace "+(sp.backspace?"allowed":"DISABLED")+" · "+sp.evaluation+".";
  var cw=document.getElementById("exCatWrap");
  if(sp.categories){
    cw.innerHTML="<strong>Your category:</strong> <span class='hint'>the verdict uses this cap.</span><div class='controls' style='margin-top:8px'>"+sp.categories.map(function(c){ return "<button class='pill exCat' data-cat='"+c.id+"' type='button'>"+c.label+" — error ≤ "+c.cap+"%</button>"; }).join("")+"</div>";
    cw.querySelectorAll(".exCat").forEach(function(b){ b.addEventListener("click",function(){ EX.category=b.dataset.cat; paintExCats(); }); });
    paintExCats();
  } else cw.innerHTML="";
  document.getElementById("exPrePanel").style.display="block";
  document.getElementById("exStage").style.display="none";
  document.getElementById("exPassage").textContent=t.text;
  document.getElementById("exCapture").value="";
  document.getElementById("exTyped").innerHTML="<span class='ph'>Click here and start typing the passage above…</span>";
  applyExFont();
  showView("examtest");
}
function paintExCats(){ document.querySelectorAll(".exCat").forEach(function(b){ b.classList.toggle("active",b.dataset.cat===EX.category); }); }
function applyExFont(){
  var fam= EX.fontFam==="serif"? "Georgia,serif" : EX.fontFam==="sans"? "\"Public Sans\",sans-serif" : "\"JetBrains Mono\",monospace";
  ["exPassage","exTyped"].forEach(function(id){ var el=document.getElementById(id); if(el){ el.style.fontSize=EX.fontPx+"px"; el.style.fontFamily=fam; } });
}
function exFocus(){ var c=document.getElementById("exCapture"); try{ c.focus({preventScroll:true}); }catch(e){ c.focus(); } }
document.getElementById("exStartBtn").addEventListener("click",function(){
  document.getElementById("exPrePanel").style.display="none";
  document.getElementById("exStage").style.display="block";
  exFocus();
});
document.getElementById("exTypedWrap").addEventListener("click",function(){ exFocus(); });
document.getElementById("exBack").addEventListener("click",function(){
  if(EX.started&&!EX.finished){ askConfirm("Leave this test?","Your attempt will be cancelled and nothing will be saved.",function(){ clearInterval(EX.timer); openHub(EX.spec.id); }); }
  else openHub(EX.spec.id);
});
document.getElementById("exCancel").addEventListener("click",function(){
  askConfirm("Cancel this test?","The attempt will be discarded — no result is saved.",function(){ clearInterval(EX.timer); EX.finished=true; openHub(EX.spec.id); });
});
document.getElementById("exSubmit").addEventListener("click",function(){
  askConfirm("Submit this test?","Your result will be calculated from the text now on screen.",function(){ finishExamTest(); });
});
document.getElementById("exFontMinus").addEventListener("click",function(){ EX.fontPx=Math.max(15,EX.fontPx-1); applyExFont(); });
document.getElementById("exFontPlus").addEventListener("click",function(){ EX.fontPx=Math.min(26,EX.fontPx+1); applyExFont(); });
document.getElementById("exSettingsBtn").addEventListener("click",function(){
  var p=document.getElementById("exSetPanel"); if(p) p.style.display= p.style.display==="none"?"block":"none";
  if(EX.spec) {}
  var pre=document.getElementById("exPrePanel"); if(pre&&EX.started===false){ pre.style.display="block"; }
});
document.querySelectorAll(".exFont").forEach(function(b){ b.addEventListener("click",function(){ EX.fontFam=b.dataset.font; document.querySelectorAll(".exFont").forEach(function(x){x.classList.toggle("active",x===b);}); applyExFont(); }); });
document.getElementById("exSoundBtn").addEventListener("click",function(){ EX.sound=!EX.sound; this.textContent=EX.sound?"On":"Off"; this.classList.toggle("active",EX.sound); });
document.getElementById("exFull").addEventListener("click",function(){
  var el=document.getElementById("view-examtest");
  try{ if(document.fullscreenElement) document.exitFullscreen(); else if(el.requestFullscreen) el.requestFullscreen(); }catch(e){}
});
function exBeep(){
  if(!EX.sound) return;
  try{
    if(!EX.audio) EX.audio=new (window.AudioContext||window.webkitAudioContext)();
    if(EX.audio.state==="suspended") EX.audio.resume();
    var o=EX.audio.createOscillator(), g=EX.audio.createGain();
    o.frequency.value=620; g.gain.value=0.03; o.connect(g); g.connect(EX.audio.destination);
    o.start(); g.gain.exponentialRampToValueAtTime(0.0001,EX.audio.currentTime+0.05); o.stop(EX.audio.currentTime+0.06);
  }catch(e){}
}
var exCaptureEl=document.getElementById("exCapture");
exCaptureEl.addEventListener("keydown",function(e){
  if(EX.spec && !EX.spec.backspace){
    if(e.key==="Backspace"||e.key==="Delete"||e.key==="ArrowLeft"||e.key==="ArrowRight"||e.key==="ArrowUp"||e.key==="ArrowDown"||e.key==="Home"||e.key==="End"||e.ctrlKey||e.metaKey){ e.preventDefault(); return; }
  }
});
exCaptureEl.addEventListener("click",function(){ if(EX.spec&&!EX.spec.backspace){ var c=exCaptureEl; try{ c.setSelectionRange(c.value.length,c.value.length); }catch(e){} } });
exCaptureEl.addEventListener("input",function(){
  if(EX.finished) return;
  var v=exCaptureEl.value;
  if(window.TEL) TEL.feed(v);
  if(!EX.started&&v.length>0) startExTimer();
  exBeep();
  var disp=document.getElementById("exTyped");
  disp.textContent=v||"";
  if(!v) disp.innerHTML="<span class='ph'>Start typing…</span>";
  document.getElementById("exWords").textContent=wordCountOf(v);
  document.getElementById("exKeys").textContent=v.length;
  var pas=document.getElementById("exPassage");
  var tgt=exFullTarget(); pas.textContent=tgt;
  var prog=tgt.length? v.length/tgt.length:0;
  pas.scrollTop=Math.max(0,prog*(pas.scrollHeight-pas.clientHeight));
});
function startExTimer(){
  EX.started=true; EX.startT=Date.now();
  var total=EX.spec.durationMin*60;
  EX.timer=setInterval(function(){
    var el=(Date.now()-EX.startT)/1000, left=Math.max(0,total-el);
    document.getElementById("exTime").textContent=fmtTime(left);
    document.getElementById("exRing").style.strokeDashoffset=String(169.6*(1-left/total));
    if(el>=total) finishExamTest();
  },200);
}
function askConfirm(title,text,onYes,onNo){
  document.getElementById("confirmTitle").textContent=title;
  document.getElementById("confirmText").textContent=text;
  var box=document.getElementById("confirmBox"); box.classList.add("open");
  var yes=document.getElementById("confirmYes"), no=document.getElementById("confirmNo");
  var newYes=yes.cloneNode(true), newNo=no.cloneNode(true);
  yes.parentNode.replaceChild(newYes,yes); no.parentNode.replaceChild(newNo,no);
  newYes.addEventListener("click",function(){ box.classList.remove("open"); onYes(); });
  newNo.addEventListener("click",function(){ box.classList.remove("open"); if(onNo){ onNo(); } else if(EX.started&&!EX.finished) exFocus(); });
}
function finishExamTest(){
  if(EX.finished) return; EX.finished=true; clearInterval(EX.timer);
  var sp=EX.spec, t=EX.test;
  var typedText=exCaptureEl.value||"";
  var el=EX.started? Math.min((Date.now()-EX.startT)/1000, sp.durationMin*60) : sp.durationMin*60;
  if(el<=0) el=sp.durationMin*60;
  var mins=el/60;
  var target= sp.id==="rrb"? exFullTarget() : t.text;
  var sc=scoreWords(target,typedText);
  var wordsTyped=sc.wordsTyped;
  var gross= mins>0? (typedText.length/5)/mins : 0;
  var weighted=sc.full+0.5*sc.half;
  var entry, result;
  if(sp.engine==="E1"){
    var errPct= wordsTyped? (weighted/wordsTyped*100):0;
    var cat=sp.categories.find(function(c){return c.id===EX.category;})||sp.categories[0];

    var netInd=Math.max(0,gross-(weighted)/mins);
    var speedOk= sp.id==="chsl"? (netInd>=sp.targetWPM) : true;
    var qual= errPct<=cat.cap && speedOk;
    var reason= qual? "Error "+errPct.toFixed(1)+"% is within the "+cat.cap+"% "+cat.label+" limit"+(sp.id==="chsl"?" and net speed "+Math.round(netInd)+" WPM meets the 35 WPM target":"")
      : (errPct>cat.cap? "Error "+errPct.toFixed(1)+"% exceeds the "+cat.cap+"% "+cat.label+" limit" : "Net speed "+Math.round(netInd)+" WPM is below the 35 WPM target");
    var acc=Math.max(0,100-(wordsTyped?(weighted/wordsTyped*100):0));
    entry=mkEntry(sp,t,{gross:Math.round(gross),net:Math.round(netInd),acc:+acc.toFixed(1),errs:Math.round(weighted),errorPct:+errPct.toFixed(1),verdict:(qual?"Qualified":"Not qualified")+" — "+reason});
    result={sp:sp,t:t,sc:sc,qual:qual,reason:reason,gross:gross,netInd:netInd,errPct:errPct,acc:acc,el:el,mins:mins,typedText:typedText,target:target,cat:cat};
  } else {
    var allowance=wordsTyped*0.05;
    var finalM=Math.max(0,weighted-allowance);
    var net= mins>0? Math.max(0,(wordsTyped-finalM*10)/mins):0;
    var evaluated=wordsTyped>=300;
    var qual2= evaluated&&net>=30;
    var reason2= !evaluated? "Not evaluated — only "+wordsTyped+" words typed; the CBTST minimum is 300 words"
      : qual2? "Net speed "+net.toFixed(1)+" WPM meets the 30 WPM qualifying standard"
      : "Net speed "+net.toFixed(1)+" WPM is below the 30 WPM qualifying standard";
    var acc2=Math.max(0,100-(wordsTyped?(weighted/wordsTyped*100):0));
    var errPct2= wordsTyped? (weighted/wordsTyped*100):0;
    entry=mkEntry(sp,t,{gross:Math.round(gross),net:Math.round(net),acc:+acc2.toFixed(1),errs:Math.round(weighted),errorPct:+errPct2.toFixed(1),verdict:(evaluated?(qual2?"Qualified":"Not qualified"):"Not evaluated")+" — "+reason2});
    entry.finalMistakes=+finalM.toFixed(1); entry.allowance=+allowance.toFixed(1);
    result={sp:sp,t:t,sc:sc,qual:qual2,reason:reason2,gross:gross,net:net,errPct:errPct2,acc:acc2,el:el,mins:mins,typedText:typedText,target:target,allowance:allowance,finalM:finalM,evaluated:evaluated};
  }
  entry.full=sc.full; entry.half=sc.half; entry.words=wordsTyped; entry.chars=typedText.length; entry.durSec=Math.round(el);
  entry.breakdown={wrong:sc.wrong,skipped:sc.skipped,extra:sc.extra};

  (function(){ var seen={}, det=[];
    sc.detail.forEach(function(d){ if(d.kind==="extra"||!d.exp) return; var k=d.exp+""+d.got; if(seen[k]) return; seen[k]=1; det.push({exp:d.exp,got:d.got,st:(d.kind==="half"?"half":"full")}); });
    if(det.length) entry.mistakeDetail=det.slice(0,60);
  })();
  result.entryClientId=entry.clientId;

  if(window.TEL && typeof buildExamTelemetry==="function"){
    try{
      buildExamTelemetry(sp,target,typedText,sc);
      if(window.__fxEx){
        if(window.__fxEx.tel) entry.telemetry=window.__fxEx.tel;
        result.tel=entry.telemetry||null;
        if(typeof revFeed==="function") revFeed(window.__fxEx.feed, sp.id);
      }
    }catch(e){ console.warn("Telemetry failed",e); }
  }
  var h=loadHist(); h.unshift(entry); saveHist(h);
  if(window.__fbUser){ saveResultToCloud(entry).then(function(){ try{renderDashboard();renderHistory();renderTrends();}catch(e){} }); }
  try{ renderDashboard(); renderHistory(); renderTrends(); }catch(e){}
  renderExamResult(result);
  showViewReplace("examresult");
}
function mkEntry(sp,t,o){
  var nowIso=new Date().toISOString();
  return {clientId:newClientId(),ts:nowIso,d:new Date().toLocaleString("en-IN"),name:sp.short+" — "+t.name,part:sp.name,gross:o.gross,net:o.net,acc:o.acc,errs:o.errs,marks:0,min:sp.durationMin,durSec:0,chars:0,words:0,bs:0,examMode:true,examId:sp.id,testId:t.id,category:EX.category||"",engine:sp.engine,full:0,half:0,errorPct:o.errorPct,verdict:o.verdict,errCat:{spelling:0,capital:0,punct:0,spacing:0,other:0},weakKeys:{},weakWords:{},synced:false};
}
function comparisonHtml(target,typedText,detail){
  var bad={}, half={};
  var E=target.split(/\s+/).filter(Boolean);
  var used={};
  detail.forEach(function(d){ if(d.kind==="half") half[d.exp]=true; else if(d.exp) bad[d.exp]=true; });
  return E.map(function(w){
    if(bad[w]) return "<span class='badW'>"+escapeHtml(w)+"</span>";
    if(half[w]) return "<span class='halfW'>"+escapeHtml(w)+"</span>";
    return escapeHtml(w);
  }).join(" ");
}
function renderExamResult(r){
  var sp=r.sp, sc=r.sc;
  var h="<button class='pill' type='button' id='xrBack'>← Back to "+sp.short+" hub</button>";
  h+="<h1 style='font-size:26px;margin-top:12px'>"+sp.name+" — "+r.t.name+"</h1>";
  h+="<p><span class='statusChip "+(r.qual?"q":"nq")+"'>"+(r.qual?"✓ Qualified":(r.evaluated===false?"Not evaluated":"✗ Not qualified"))+"</span></p><p class='sub'>"+escapeHtml(r.reason)+"</p>";
  h+="<div class='card'><h2>Performance Summary</h2><div class='statsGrid'>"
    +(sp.engine==="E1"
      ? "<div class='stat'><div class='v'>"+r.errPct.toFixed(1)+"%</div><div class='l'>Error % (headline)</div></div><div class='stat'><div class='v'>"+Math.round(r.gross)+"</div><div class='l'>Gross WPM</div></div><div class='stat'><div class='v'>"+Math.round(r.netInd)+"</div><div class='l'>Net WPM (indicative)</div></div><div class='stat'><div class='v'>"+r.acc.toFixed(1)+"%</div><div class='l'>Accuracy</div></div>"
      : "<div class='stat'><div class='v'>"+r.net.toFixed(1)+"</div><div class='l'>Net WPM</div></div><div class='stat'><div class='v'>"+Math.round(r.gross)+"</div><div class='l'>Gross WPM</div></div><div class='stat'><div class='v'>"+r.errPct.toFixed(1)+"%</div><div class='l'>Error %</div></div><div class='stat'><div class='v'>"+r.acc.toFixed(1)+"%</div><div class='l'>Accuracy</div></div>")
    +"<div class='stat'><div class='v'>"+sc.full+"</div><div class='l'>Full mistakes</div></div>"
    +"<div class='stat'><div class='v'>"+sc.half+"</div><div class='l'>Half mistakes</div></div>"
    +"<div class='stat'><div class='v'>"+sc.wordsTyped+"</div><div class='l'>Words typed</div></div>"
    +"<div class='stat'><div class='v'>"+fmtNum(r.typedText.length)+"</div><div class='l'>Keystrokes</div></div>"
    +"<div class='stat'><div class='v'>"+fmtTime(Math.round(r.el))+"</div><div class='l'>Time used</div></div>"
    +"<div class='stat'><div class='v'>"+sc.completion.toFixed(0)+"%</div><div class='l'>Passage completed</div></div>"
    +"</div><p class='small'>Scoring covers the typed portion only — untyped passage text is never counted as a mistake; completion % is reported separately above.</p></div>";
  h+="<div class='card'><h2>Mistake Calculation</h2><ol style='padding-left:20px;margin:6px 0'>";

  var wtd=sc.full+0.5*sc.half;
  if(sp.engine==="E1"){
    var gD=r.gross.toFixed(2), pD=(wtd/r.mins).toFixed(2);
    var nD=Math.max(0,parseFloat(gD)-parseFloat(pD));
    h+="<li>Full mistakes: <strong>"+sc.full+"</strong> · Half mistakes: <strong>"+sc.half+"</strong> (weighted "+wtd.toFixed(1)+").</li>"
      +"<li>Error % = (Full + 0.5 × Half) ÷ words typed × 100 = ("+sc.full+" + "+(0.5*sc.half).toFixed(1)+") ÷ "+sc.wordsTyped+" × 100 = <strong>"+r.errPct.toFixed(2)+"%</strong> (shown as "+r.errPct.toFixed(1)+"% in the tiles above).</li>"
      +"<li>Net WPM (indicative) = Gross WPM − weighted mistakes per minute = "+gD+" − "+pD+" = <strong>"+nD.toFixed(2)+" WPM</strong> (shown as "+Math.round(r.netInd)+" in the tiles above).</li>"
      +"<li>Your category cap ("+r.cat.label+"): <strong>"+r.cat.cap+"%</strong>."+(sp.id==="chsl"?" Net speed: <strong>"+Math.round(r.netInd)+" WPM</strong> against the 35 WPM target — the same net figure as the tiles.":"")+"</li>";
  } else {
    h+="<li>Full mistakes: <strong>"+sc.full+"</strong> · Half mistakes: <strong>"+sc.half+"</strong> (weighted "+wtd.toFixed(1)+").</li>"
      +"<li>Penalty-free allowance = 5% of words typed = 5% × "+sc.wordsTyped+" = <strong>"+r.allowance.toFixed(2)+"</strong>.</li>"
      +"<li>Final Mistakes = max(0, (Full + 0.5 × Half) − allowance) = max(0, "+wtd.toFixed(1)+" − "+r.allowance.toFixed(2)+") = <strong>"+r.finalM.toFixed(2)+"</strong> (never below zero).</li>"
      +"<li>Net Speed = (Words typed − Final Mistakes × 10) ÷ minutes = ("+sc.wordsTyped+" − "+(r.finalM*10).toFixed(1)+") ÷ "+r.mins.toFixed(3)+" = <strong>"+r.net.toFixed(1)+" WPM</strong>.</li>"
      +(r.evaluated?"<li>Words typed ("+sc.wordsTyped+") clear the 300-word minimum, so this attempt is evaluated.</li>":"<li>Words typed ("+sc.wordsTyped+") are below the 300-word minimum — this attempt is <strong>Not evaluated</strong>.</li>");
  }
  h+="</ol></div>";
  h+="<div class='card'><h2>Error Breakdown</h2><table><tbody>"
    +"<tr><td>Wrong words</td><td><strong>"+sc.wrong+"</strong></td></tr>"
    +"<tr><td>Skipped words</td><td><strong>"+sc.skipped+"</strong></td></tr>"
    +"<tr><td>Extra words</td><td><strong>"+sc.extra+"</strong></td></tr>"
    +"<tr><td>Half mistakes (single character-level slips)</td><td><strong>"+sc.half+"</strong></td></tr></tbody></table></div>";
  h+="<div class='card'><h2>Passage Comparison</h2><p class='small'>Original passage with mistakes marked — <span class='badW' style='background:var(--redSoft);color:var(--red);border-radius:4px;padding:0 4px'>full mistake</span> · <span style='background:var(--orangeSoft);color:var(--warn);border-radius:4px;padding:0 4px'>half mistake</span>. Below it is exactly what you typed.</p><div class='cmpBox'>"+comparisonHtml(r.target,r.typedText,sc.detail)+"</div><h3 style='margin-top:14px'>What you typed</h3><div class='cmpBox'>"+escapeHtml(r.typedText||"(nothing typed)")+"</div></div>";

  if(r.tel){
    var fxCtx= sp.engine==="E1"
      ? {engine:"E1",examId:sp.id,netWpm:r.netInd,grossWpm:r.gross,acc:r.acc,chars:r.typedText.length,errorPct:r.errPct,cap:r.cat.cap,catLabel:r.cat.label,completion:sc.completion,wordsTyped:sc.wordsTyped}
      : {engine:"E2",examId:sp.id,netWpm:r.net,grossWpm:r.gross,acc:r.acc,chars:r.typedText.length,errorPct:r.errPct,completion:sc.completion,wordsTyped:sc.wordsTyped,evaluated:r.evaluated};
    h+=forensicsHtml(r.tel,fxCtx);
  }
  h+="<div style='display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px'><button class='btn' id='xrRetake' type='button'>↻ Retake this test</button>"
    +((sc.full+sc.half)>0? "<button class='btn secondary' id='xrDrill' type='button'>🔁 Launch drill — fix these words</button>":"")
    +"<button class='btn secondary' type='button' data-view='progress'>📊 Dashboard</button></div>";
  document.getElementById("exResultBody").innerHTML=h;
  document.getElementById("xrBack").addEventListener("click",function(){ openHub(sp.id); });
  document.getElementById("xrRetake").addEventListener("click",function(){ openExamTest(sp,r.t); });
  var xrD=document.getElementById("xrDrill"); if(xrD) xrD.addEventListener("click",function(){ launchResultDrill(r.entryClientId); });
}
function renderStoredResult(en){
  var sp=specOf(en.examId); if(!sp) return;
  var t=testsOf(en.examId).find(function(x){return x.id===en.testId;})||{name:en.name};
  var qual=(en.verdict||"").indexOf("Qualified")===0;
  var h="<button class='pill' type='button' id='xrBack2'>← Back to "+sp.short+" hub</button>";
  h+="<h1 style='font-size:26px;margin-top:12px'>"+sp.name+" — "+escapeHtml(t.name)+"</h1>";
  h+="<p><span class='statusChip "+(qual?"q":"nq")+"'>"+(qual?"✓ Qualified":"✗ "+escapeHtml((en.verdict||"Result").split(" — ")[0]))+"</span></p><p class='sub'>"+escapeHtml(en.verdict||"")+"</p>";
  h+="<div class='card'><h2>Performance Summary</h2><div class='statsGrid'>"
    +"<div class='stat'><div class='v'>"+(en.errorPct!=null? (+en.errorPct).toFixed(1)+"%":"—")+"</div><div class='l'>Error %</div></div>"
    +"<div class='stat'><div class='v'>"+(en.gross||0)+"</div><div class='l'>Gross WPM</div></div>"
    +"<div class='stat'><div class='v'>"+(en.net||0)+"</div><div class='l'>Net WPM"+(sp.engine==="E1"?" (indicative)":"")+"</div></div>"
    +"<div class='stat'><div class='v'>"+(+en.acc||0).toFixed(1)+"%</div><div class='l'>Accuracy</div></div>"
    +"<div class='stat'><div class='v'>"+(en.full||0)+"</div><div class='l'>Full mistakes</div></div>"
    +"<div class='stat'><div class='v'>"+(en.half||0)+"</div><div class='l'>Half mistakes</div></div>"
    +"<div class='stat'><div class='v'>"+(en.words||0)+"</div><div class='l'>Words typed</div></div>"
    +"<div class='stat'><div class='v'>"+fmtNum(en.chars||0)+"</div><div class='l'>Keystrokes</div></div></div>"
    +(en.category?"<p class='small'>Category: <strong>"+escapeHtml(en.category)+"</strong> · Attempted "+escapeHtml(en.d||"")+"</p>":"<p class='small'>Attempted "+escapeHtml(en.d||"")+"</p>")
    +"</div>";

  if(en.telemetry){
    var catS= sp.categories? (sp.categories.find(function(c){return c.id===en.category;})||sp.categories[0]) : null;
    var expW= t.text? wordCountOf(t.text):0;
    var compS= (en.telemetry.words&&expW)? Math.min(100, en.telemetry.words.length/expW*100) : null;
    var sCtx= sp.engine==="E1"
      ? {engine:"E1",examId:sp.id,netWpm:en.net||0,grossWpm:en.gross||0,acc:+en.acc||0,chars:en.chars||0,errorPct:(en.errorPct!=null?en.errorPct:0),cap:catS?catS.cap:0,catLabel:catS?catS.label:"",completion:compS,wordsTyped:en.words||0}
      : {engine:"E2",examId:sp.id,netWpm:en.net||0,grossWpm:en.gross||0,acc:+en.acc||0,chars:en.chars||0,errorPct:(en.errorPct!=null?en.errorPct:0),completion:compS,wordsTyped:en.words||0,evaluated:(en.words||0)>=300};
    h+=forensicsHtml(en.telemetry,sCtx);
  } else {
    h+="<div class='card'><p class='small' style='margin:0'>Detailed analysis is available for tests taken after the Phase 3 update.</p></div>";
  }
  h+="<div style='display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px'><button class='btn' id='xrRetake2' type='button'>↻ Retake this test</button>"
    +(((en.full||0)+(en.half||0))>0||storedMistakeDetail(en).length? "<button class='btn secondary' id='xrDrill2' type='button'>🔁 Launch drill — fix these words</button>":"")
    +"<button class='btn secondary' type='button' data-view='progress'>📊 Dashboard</button></div>";
  document.getElementById("exResultBody").innerHTML=h;
  document.getElementById("xrBack2").addEventListener("click",function(){ openHub(sp.id); });
  document.getElementById("xrRetake2").addEventListener("click",function(){ if(t.id) openExamTest(sp,t); });
  var xrD2=document.getElementById("xrDrill2"); if(xrD2) xrD2.addEventListener("click",function(){ launchResultDrill(en.clientId); });
  showView("examresult");
}

var __showViewV26=showView;
showView=function(name,scrollTarget){
  __showViewV26(name,scrollTarget);
  document.querySelectorAll(".sbLink[data-view]").forEach(function(b){ b.classList.toggle("active",b.dataset.view===name||(name==="hub"&&b.dataset.view==="hubs")||(name==="examtest"&&b.dataset.view==="hubs")); });
  document.querySelectorAll(".bottomNav button").forEach(function(b){ b.classList.toggle("active",b.dataset.view===name||(name==="hub"&&b.dataset.view==="hubs")); });
  paintSbAccount();
  if(name==="home") updateContinue();
};
function paintSbAccount(){}
var sbCollapseEl=document.getElementById("sbCollapse");
if(sbCollapseEl) sbCollapseEl.addEventListener("click",function(){ document.body.classList.toggle("sbClosed"); sbCollapseEl.setAttribute("aria-label",document.body.classList.contains("sbClosed")?"Expand sidebar":"Collapse sidebar"); });
function updateContinue(){
  var card=document.getElementById("continueCard"); if(!card) return;
  var h=loadHist();
  if(!h.length){ card.style.display="none"; return; }
  card.style.display="";
  var last=h[0];
  var cc=document.getElementById("ccLast");
  if(cc) cc.textContent=(last.name||"Test")+" · "+(last.net||0)+" net WPM · "+(+last.acc||0).toFixed(1)+"% accuracy";
}

if(typeof renderHistory==="function"){
  var __renderHistoryV26=renderHistory;
  renderHistory=function(){
    __renderHistoryV26();
    try{
      var h=loadHist(), w=document.getElementById("historyWrap");
      if(!w||!h.length) return;
      var rows=h.slice(0,20).map(function(x){
        var last= x.examId? escapeHtml(x.verdict||"—") : (x.net>=30? x.marks+" / 25":"DQ");
        return "<tr data-cid='"+escapeHtml(x.clientId||"")+"' class='histRow' style='cursor:pointer' title='Open this result'><td>"+escapeHtml(x.d||"")+"</td><td>"+escapeHtml(x.name||"")+"</td><td>"+x.min+" min</td><td>"+x.gross+"</td><td><strong>"+x.net+"</strong></td><td>"+x.acc+"%</td><td>"+x.errs+"</td><td>"+last+"</td></tr>";
      }).join("");
      w.innerHTML="<div style='overflow-x:auto'><table><tr><th>Date</th><th>Text</th><th>Dur.</th><th>Gross</th><th>Net WPM</th><th>Accuracy</th><th>Errors</th><th>Marks / Verdict</th></tr>"+rows+"</table></div>";
    }catch(e){}
  };
  renderHistory();
}
renderExamGrids();
paintSbAccount();
updateContinue();
