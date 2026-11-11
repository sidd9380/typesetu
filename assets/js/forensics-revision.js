function fxTpc(w){ var len=Math.max(1,(w.exp||w.got||"").length); return (w.endMs-w.startMs)/len; }
function hcmBandInfo(n){
  if(n<30) return {label:"below 30",marks:0,nextAt:30,nextMarks:10};
  if(n<31) return {label:"30",marks:10,nextAt:31,nextMarks:12};
  if(n<=35) return {label:"31–35",marks:12,nextAt:36,nextMarks:15};
  if(n<=40) return {label:"36–40",marks:15,nextAt:41,nextMarks:18};
  if(n<=45) return {label:"41–45",marks:18,nextAt:46,nextMarks:21};
  if(n<=50) return {label:"46–50",marks:21,nextAt:51,nextMarks:25};
  return null;
}
function fxDistance(ctx){
  if(ctx.engine==="E3"){
    var n=ctx.netWpm, b=hcmBandInfo(n);
    if(!b) return "Your net speed <strong>"+n.toFixed(1)+" WPM</strong> is in the top band — full <strong>25 marks</strong>. The job now is making it repeatable.";
    if(n<30) return "Your net speed <strong>"+n.toFixed(1)+" WPM</strong> is below the 30 WPM qualifying minimum — <strong>30 WPM</strong> is the first step, into the 10-mark band.";
    return "Your net speed <strong>"+n.toFixed(1)+" WPM</strong> sits in the "+b.label+" band ("+b.marks+" marks). <strong>"+b.nextAt+" WPM</strong> would put you in the "+b.nextMarks+"-mark band.";
  }
  if(ctx.engine==="E1"){
    var ep=ctx.errorPct, cap=ctx.cap, s;
    if(ep<=cap) s="Error <strong>"+ep.toFixed(1)+"%</strong> — inside the "+cap+"% "+escapeHtml(ctx.catLabel||"")+" cap, with <strong>"+(cap-ep).toFixed(1)+" points</strong> to spare.";
    else s="Error <strong>"+ep.toFixed(1)+"%</strong> — over the "+cap+"% "+escapeHtml(ctx.catLabel||"")+" cap by <strong>"+(ep-cap).toFixed(1)+" points</strong>. That gap is the thing to close.";
    if(ctx.examId==="chsl"){
      if(ctx.netWpm>=35) s+=" Net speed <strong>"+Math.round(ctx.netWpm)+" WPM</strong> also clears the 35 WPM target.";
      else s+=" Net speed <strong>"+Math.round(ctx.netWpm)+" WPM</strong> is about "+Math.ceil(35-ctx.netWpm)+" short of the 35 WPM target.";
    }
    return s;
  }
  var parts=[];
  if(ctx.netWpm>=30) parts.push("Net speed <strong>"+ctx.netWpm.toFixed(1)+" WPM</strong> — "+(ctx.netWpm-30).toFixed(1)+" above the 30 WPM qualifying floor.");
  else parts.push("Net speed <strong>"+ctx.netWpm.toFixed(1)+" WPM</strong> — "+(30-ctx.netWpm).toFixed(1)+" below the 30 WPM qualifying floor.");
  if(ctx.wordsTyped<300) parts.push("Words typed <strong>"+ctx.wordsTyped+"</strong> — "+(300-ctx.wordsTyped)+" short of the 300-word minimum, so this attempt is not evaluated.");
  else parts.push("Words typed <strong>"+ctx.wordsTyped+"</strong> clear the 300-word evaluation minimum.");
  return parts.join(" ");
}
function fxThirdSpeed(slice,tel,startIdx){
  var chars=0, mins=0;
  slice.forEach(function(bk,k){
    var idx=startIdx+k; chars+=bk.chars;
    var durMs=Math.min(tel.bucketSec*1000, tel.activeMs-idx*tel.bucketSec*1000); if(durMs<=0) durMs=tel.bucketSec*1000;
    mins+=durMs/60000;
  });
  return mins>0? (chars/5)/mins:0;
}
function fxInsights(tel,ctx,words,mistakes,aggOnly){
  var out=[], full= !aggOnly&&words.length>=40;

  if(full&&tel.buckets&&tel.buckets.length>=3&&ctx.completion!=null&&ctx.completion>=60){
    var b=tel.buckets, third=Math.floor(b.length/3);
    if(third>=1){
      var fsp=fxThirdSpeed(b.slice(0,third),tel,0), lsp=fxThirdSpeed(b.slice(b.length-third),tel,b.length-third);
      if(fsp>0&&lsp>0){
        var d=(lsp-fsp)/fsp*100;
        if(d<=-10) out.push("You slowed down towards the end — <strong>"+Math.round(fsp)+" WPM</strong> in the first third, <strong>"+Math.round(lsp)+" WPM</strong> in the last.");
        else if(d>=10) out.push("You sped up as you went — <strong>"+Math.round(fsp)+" WPM</strong> in the first third, <strong>"+Math.round(lsp)+" WPM</strong> in the last. A steadier start usually scores better.");
      }
    }
  }

  if(tel.activeMs>0&&tel.fixingMs/tel.activeMs>=0.05){
    var weq=Math.round(tel.fixingMs*((ctx.chars||0)/tel.activeMs)/5);
    out.push("Fixing mistakes cost you about <strong>"+Math.round(tel.fixingMs/1000)+" seconds</strong> — "+Math.round(tel.fixingMs/tel.activeMs*100)+"% of your test. At your average speed that's roughly <strong>"+weq+" words</strong> you could have typed instead.");
  }

  if(full&&tel.pauseCount>=3){
    var txt="You paused <strong>"+tel.pauseCount+" times</strong> for over 2 seconds — "+Math.round(tel.pauseMs/1000)+" seconds in total. The longest was <strong>"+Math.round(tel.longestPauseMs/1000)+" seconds</strong>";
    var lw=words[tel.longestPauseWord];
    if(lw) txt+=", around word "+(tel.longestPauseWord+1)+" ('"+escapeHtml(lw.exp||lw.got)+"')";
    out.push(txt+".");
  }

  if(full&&mistakes.length>=4){
    var sorted=words.slice().sort(function(a,b){ return fxTpc(a)-fxTpc(b); });
    var thirdN=Math.floor(sorted.length/3);
    if(thirdN>=5){
      var fast=sorted.slice(0,thirdN), slow=sorted.slice(sorted.length-thirdN);
      var fm=0, sm=0;
      fast.forEach(function(w){ if(w.st!=="ok") fm++; });
      slow.forEach(function(w){ if(w.st!=="ok") sm++; });
      var fr=fm/fast.length, sr=sm/slow.length;
      if(fm>sm&&(sr===0? fm>=2 : fr>=2*sr)) out.push("Most of your mistakes (<strong>"+fm+" of "+mistakes.length+"</strong>) happened in words you typed faster than your usual pace. Easing off slightly on those words protects your score.");
    }
  }

  if(full&&tel.correctedSlips>=5&&ctx.acc>=98){
    out.push("You caught and fixed <strong>"+tel.correctedSlips+" slips</strong> yourself — they cost time but zero marks.");
  }

  var dist=fxDistance(ctx); if(dist) out.push(dist);
  return out;
}
function fxChart(tel,ctx){
  var b=tel.buckets, nb=b.length;
  var totalChars=b.reduce(function(a,x){ return a+x.chars; },0);
  var overall= totalChars/5/(tel.activeMs/60000);
  var maxW=1; b.forEach(function(x){ if(x.wpm>maxW) maxW=x.wpm; }); if(overall>maxW) maxW=overall;
  maxW=Math.max(10,Math.ceil(maxW*1.15));
  var W=660,H=212,pl=36,pr=8,pt=16,pb=26, pw=W-pl-pr, ph=H-pt-pb, bw=pw/nb;
  var s="<div class='fxSec'><h3>Speed through the test</h3><svg viewBox='0 0 "+W+" "+H+"' style='width:100%;height:auto;display:block' role='img' aria-label='Your speed in each "+tel.bucketSec+"-second stretch of the test'>";
  [0,0.5,1].forEach(function(f){ var y=pt+ph-ph*f;
    s+="<line x1='"+pl+"' y1='"+y+"' x2='"+(W-pr)+"' y2='"+y+"' stroke='var(--line)' stroke-width='1'/><text x='"+(pl-6)+"' y='"+(y+4)+"' font-size='11' fill='var(--muted)' text-anchor='end'>"+Math.round(maxW*f)+"</text>";
  });
  b.forEach(function(x,i){
    var bh=(x.wpm/maxW)*ph, x0=pl+i*bw+2, w0=Math.max(2,bw-4), y0=pt+ph-bh;
    s+="<rect x='"+x0.toFixed(1)+"' y='"+y0.toFixed(1)+"' width='"+w0.toFixed(1)+"' height='"+Math.max(0,bh).toFixed(1)+"' rx='3' fill='var(--primary)' opacity='0.85'/>";
    if(nb<=20) s+="<text x='"+(x0+w0/2).toFixed(1)+"' y='"+(y0-4)+"' font-size='10.5' fill='var(--ink)' text-anchor='middle'>"+Math.round(x.wpm)+"</text>";
    if(nb<=10||i%2===0){ var tsec=i*tel.bucketSec; s+="<text x='"+(x0+w0/2).toFixed(1)+"' y='"+(H-8)+"' font-size='10.5' fill='var(--muted)' text-anchor='middle'>"+Math.floor(tsec/60)+":"+("0"+(tsec%60)).slice(-2)+"</text>"; }
  });
  var oy=pt+ph-(overall/maxW)*ph;
  s+="<line x1='"+pl+"' y1='"+oy+"' x2='"+(W-pr)+"' y2='"+oy+"' stroke='var(--orange)' stroke-width='2' stroke-dasharray='6 4'/><text x='"+(W-pr)+"' y='"+(oy-6)+"' font-size='11' font-weight='700' fill='var(--warn)' text-anchor='end'>Overall "+overall.toFixed(1)+" WPM</text>";
  s+="</svg><p class='small' style='margin:0'>Bars: WPM in each "+tel.bucketSec+"-second stretch, counted only from characters still on screen at the end. Dashed line: your overall gross speed.</p></div>";
  return s;
}
function fxWhen(tel,mistakes){
  var counts=[0,0,0];
  mistakes.forEach(function(w){ var idx= tel.activeMs>0? Math.floor(w.endMs/tel.activeMs*3):0; if(idx>2) idx=2; if(idx<0) idx=0; counts[idx]++; });
  var mx=Math.max(counts[0],counts[1],counts[2],1), names=["First third","Middle third","Last third"];
  var h="<div class='fxSec'><h3>When mistakes happened</h3>";
  counts.forEach(function(c,i){ h+="<div class='fxBarRow'><span class='fxBarLab'>"+names[i]+"</span><span class='fxBarTrack'><i style='width:"+Math.round(c/mx*100)+"%'></i></span><strong>"+c+"</strong></div>"; });
  return h+"</div>";
}
function fxSlowWords(words){
  var tpcs=words.map(fxTpc).sort(function(a,b){ return a-b; });
  var med=tpcs[Math.floor(tpcs.length/2)]||0; if(med<=0) return "";

  var flagged=words.filter(function(w){ return fxTpc(w)>=1.5*med||w.paused; });
  if(!flagged.length) return "";
  flagged.sort(function(a,b){ return (b.endMs-b.startMs)-(a.endMs-a.startMs); });
  var h="<div class='fxSec'><h3>Words that slowed you down</h3><p class='small'>Words that took far longer than your typical pace for their length. A pause is not slow typing — words where you stopped are marked as pauses, never merged into slowness.</p>";
  flagged.slice(0,8).forEach(function(w){
    var dur=(w.endMs-w.startMs)/1000, typ=med*Math.max(1,(w.exp||"").length)/1000;
    h+="<div class='fxWordRow'><span class='mono'><strong>"+escapeHtml(w.exp||w.got)+"</strong></span><span>"+dur.toFixed(1)+"s <span class='small'>(your typical for this length: "+typ.toFixed(1)+"s)</span></span><span class='fxTag'>"+(w.paused?"paused here":"slow")+"</span></div>";
  });
  return h+"</div>";
}
function fxKeys(tel){
  var pairs=(tel.confusions||[]).filter(function(c){ return c.n>=2; }).slice(0,6), lines=[];
  pairs.forEach(function(c){ lines.push("You typed <strong class='mono'>"+escapeHtml(c.got)+"</strong> for <strong class='mono'>"+escapeHtml(c.exp)+"</strong> — "+c.n+" times"); });
  if(tel.omissions>=3) lines.push("You dropped a letter <strong>"+tel.omissions+" times</strong> (omissions).");
  if(tel.insertions>=3) lines.push("You added an extra letter <strong>"+tel.insertions+" times</strong> (insertions).");
  if(!lines.length) return "";
  return "<div class='fxSec'><h3>Keys you mix up</h3>"+lines.map(function(l){ return "<p style='margin:0 0 6px'>"+l+"</p>"; }).join("")+"<p class='small' style='margin:0'>Counted from your final text only — a slip you corrected is not a mix-up.</p></div>";
}
function fxFixing(tel,ctx){
  var h="<div class='fxSec'><h3>Fixing mistakes</h3>";
  if(!tel.backspaces) return h+"<p style='margin:0'>No corrections — every word was typed once.</p></div>";
  var pct= tel.activeMs? tel.fixingMs/tel.activeMs*100:0;
  var weq= tel.activeMs? Math.round(tel.fixingMs*((ctx.chars||0)/tel.activeMs)/5):0;
  h+="<div class='statsGrid' style='margin:4px 0 8px'>"
    +"<div class='stat'><div class='v'>"+tel.backspaces+"</div><div class='l'>Backspaces</div></div>"
    +"<div class='stat'><div class='v'>"+tel.bursts+"</div><div class='l'>Fix bursts</div></div>"
    +"<div class='stat'><div class='v'>"+(tel.fixingMs/1000).toFixed(1)+"s</div><div class='l'>Time fixing</div></div>"
    +"<div class='stat'><div class='v'>"+pct.toFixed(1)+"%</div><div class='l'>Share of test</div></div></div>"
    +"<p style='margin:0'>That fixing time equals roughly <strong>"+weq+" words</strong> at your average speed.</p></div>";
  return h;
}
function fxTech(tel,ctx){
  var totalChars= tel.buckets? tel.buckets.reduce(function(a,x){ return a+x.chars; },0) : (ctx.chars||0);
  var overall= tel.activeMs? totalChars/5/(tel.activeMs/60000):0;
  var h="<details class='fxTech'><summary>Technical details</summary><ul class='tight'>"
    +"<li>Deep analysis v"+tel.v+" — recorded from this attempt's own keystrokes, first keystroke to finish. Nothing is estimated, and nothing is carried over from other attempts.</li>"
    +"<li>Active time "+(tel.activeMs/1000).toFixed(1)+"s · Pauses over 2s: "+tel.pauseCount+", totalling "+(tel.pauseMs/1000).toFixed(1)+"s (longest "+(tel.longestPauseMs/1000).toFixed(1)+"s). Pauses are reported, never subtracted from your time.</li>";
  if(ctx.engine!=="E2") h+="<li>Fixing time is measured per fix burst — from a burst's first Backspace to the keystroke that restores the word, or the word's end — and capped at 5 seconds per burst, so thinking time after a fix is never billed as fixing.</li>";
  if(tel.buckets) h+="<li>Bucket speed = final-text characters typed in that "+tel.bucketSec+"s ÷ 5 ÷ "+(tel.bucketSec/60)+" min. Deleted characters never count.</li>"
    +"<li>Reconciliation check: duration-weighted mean of bucket speeds vs overall gross speed ("+overall.toFixed(1)+" WPM) — "+(tel.reconOk?"passed ✓ (within ±1 WPM)":"failed, so the speed chart is hidden rather than shown wrong")+".</li>";
  return h+"</ul></details>";
}
function forensicsHtml(tel,ctx){
  if(!tel||tel.v!==1) return "";
  var h="";
  if(ctx.engine==="E2") h+="<p class='small' style='margin-top:12px'>The learning sections below use your word-by-word results <strong>before the 5% allowance</strong>; the headline figures above are after it.</p>";
  var aggOnly=!tel.words, words=tel.words||[];
  var mistakes=words.filter(function(w){ return w.st==="full"||w.st==="half"; });
  var ins=fxInsights(tel,ctx,words,mistakes,aggOnly);
  if(ins.length) h+="<div class='fxSec'><h3>Your Typing, Explained</h3>"+ins.map(function(t,i){ return "<div class='fxInsight'><span class='fxN'>"+(i+1)+"</span><p>"+t+"</p></div>"; }).join("")+"</div>";
  if(tel.buckets&&tel.buckets.length>=4&&tel.reconOk) h+=fxChart(tel,ctx);

  if(!aggOnly&&mistakes.length>=1) h+=fxWhen(tel,mistakes);
  if(!aggOnly&&words.length>=10){ var sw=fxSlowWords(words); if(sw) h+=sw; }
  if(!aggOnly&&words.length>=40){ var kk=fxKeys(tel); if(kk) h+=kk; }
  if(ctx.engine!=="E2") h+=fxFixing(tel,ctx);
  h+=fxTech(tel,ctx);
  return h;
}

var LS_REV="hcm_revision_v1";
function revDateStr(d){ return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2); }
function revToday(){ return revDateStr(new Date()); }
function revAddDays(dateStr,n){ var d=new Date(dateStr+"T12:00:00"); d.setDate(d.getDate()+n); return revDateStr(d); }
function revLoad(){ try{ var b=JSON.parse(localStorage.getItem(LS_REV)); if(b&&Array.isArray(b.words)) return b; }catch(e){} return {words:[],updatedAt:null}; }
function revSave(bank){
  try{ localStorage.setItem(LS_REV,JSON.stringify(bank)); }catch(e){}
  revSaveCloud(bank);
  paintRevBadges();
}
function revSaveCloud(bank){
  if(!window.__fbUser||typeof fbDb==="undefined"||!fbDb) return;
  var uid=window.__fbUser.uid;
  RateLimit.debounce("revisionSave",4000,function(){
    if(!window.__fbUser||window.__fbUser.uid!==uid||rateLimited("cloudWrite")) return;
    var latest=revLoad();
    try{ fbDb.collection("users").doc(uid).collection("data").doc("revision")
      .set({words:latest.words,updatedAt:latest.updatedAt||new Date().toISOString()}).catch(function(){}); }catch(e){}
  });
}
function revMergeEntry(p,q){
  function stageOf(e){ return e.status==="mastered"? 99:e.stage; }
  function ndOf(e){ return e.nextDue||"9999-99-99"; }
  var base= stageOf(q)>stageOf(p)? q : stageOf(p)>stageOf(q)? p : (ndOf(q)>ndOf(p)? q:p);
  var out=JSON.parse(JSON.stringify(base));
  out.countFull=Math.max(p.countFull||0,q.countFull||0);
  out.countHalf=Math.max(p.countHalf||0,q.countHalf||0);
  out.typed={}; var tk={}; Object.keys(p.typed||{}).forEach(function(k){ tk[k]=1; }); Object.keys(q.typed||{}).forEach(function(k){ tk[k]=1; });
  Object.keys(tk).forEach(function(k){ out.typed[k]=Math.max((p.typed||{})[k]||0,(q.typed||{})[k]||0); });
  out.types={}; var ty={}; Object.keys(p.types||{}).forEach(function(k){ ty[k]=1; }); Object.keys(q.types||{}).forEach(function(k){ ty[k]=1; });
  Object.keys(ty).forEach(function(k){ out.types[k]=Math.max((p.types||{})[k]||0,(q.types||{})[k]||0); });
  out.exams=[]; (p.exams||[]).concat(q.exams||[]).forEach(function(x){ if(out.exams.indexOf(x)<0) out.exams.push(x); });
  out.firstSeen= (p.firstSeen||"")<(q.firstSeen||"")? p.firstSeen:q.firstSeen;
  out.lastSeen= (p.lastSeen||"")>(q.lastSeen||"")? p.lastSeen:q.lastSeen;
  return out;
}
function revMergeBanks(a,b){
  var map={}, order=[];
  [a,b].forEach(function(bk){ (bk.words||[]).forEach(function(e){
    if(!map[e.word]){ map[e.word]=JSON.parse(JSON.stringify(e)); order.push(e.word); }
    else map[e.word]=revMergeEntry(map[e.word],e);
  }); });
  return {words:order.map(function(k){ return map[k]; }), updatedAt:new Date().toISOString()};
}
function revCloudSync(){
  if(!window.__fbUser||typeof fbDb==="undefined"||!fbDb) return;
  var uid=window.__fbUser.uid;
  fbDb.collection("users").doc(uid).collection("data").doc("revision").get().then(function(doc){
    var local=revLoad();
    if(doc.exists){
      var cv=doc.data()||{};
      var merged=revMergeBanks(local,{words:Array.isArray(cv.words)? cv.words:[],updatedAt:cv.updatedAt||null});
      try{ localStorage.setItem(LS_REV,JSON.stringify(merged)); }catch(e){}
      revSaveCloud(merged);
    } else revSaveCloud(local);
    paintRevBadges();
    var rv=document.getElementById("view-revision"); if(rv&&rv.classList.contains("active")) renderRevision();
  }).catch(function(){});
}
function wordErrorType(exp,got,st){
  exp=exp||""; got=got||"";
  var caseOnly= exp.toLowerCase()===got.toLowerCase()&&exp!==got;
  var punctOnly= exp.replace(/[^A-Za-z0-9]/g,"")===got.replace(/[^A-Za-z0-9]/g,"")&&exp!==got;
  var spaceOnly= exp.replace(/\s/g,"")===got.replace(/\s/g,"")&&exp!==got&&(exp.indexOf(" ")>=0||got.indexOf(" ")>=0);
  if(st==="half"){ if(caseOnly) return "capitalisation"; if(punctOnly) return "punctuation"; if(spaceOnly) return "spacing"; return "halfChar"; }
  if(got==="") return "omission";
  if(exp==="") return "insertion";
  if(caseOnly) return "capitalisation";
  if(punctOnly) return "punctuation";
  if(spaceOnly) return "spacing";
  if(exp.length===got.length) return "substitution";
  var d=lev(exp,got);
  if(got.length<exp.length) return d<=exp.length-got.length+1? "omission":"substitution";
  return d<=got.length-exp.length+1? "insertion":"substitution";
}
function revFeed(errors,examId){
  if(!errors||!errors.length) return;
  var bank=revLoad(), today=revToday(), changed=false;
  errors.forEach(function(er){
    if(!er.exp) return;
    var type=wordErrorType(er.exp,er.got||"",er.st);
    var key= type==="capitalisation"? er.exp : er.exp.toLowerCase();
    var e=null;
    bank.words.forEach(function(x){ if(x.word===key) e=x; });
    if(!e){
      e={word:key, typed:{}, types:{substitution:0,omission:0,insertion:0,capitalisation:0,punctuation:0,spacing:0,halfChar:0},
        countFull:0, countHalf:0, exams:[], firstSeen:today, lastSeen:today, stage:0, nextDue:revAddDays(today,1), status:"learning"};
      bank.words.push(e);
    }
    if(er.st==="half") e.countHalf=(e.countHalf||0)+1; else e.countFull=(e.countFull||0)+1;
    if(er.got) e.typed[er.got]=(e.typed[er.got]||0)+1;
    e.types[type]=(e.types[type]||0)+1;
    if(e.exams.indexOf(examId)<0) e.exams.push(examId);
    e.lastSeen=today;

    e.status="learning"; e.stage=0; e.nextDue=revAddDays(today,1);
    changed=true;
  });
  if(!changed) return;

  var guard=0;
  while(bank.words.filter(function(x){ return x.status==="learning"; }).length>500&&guard++<600){
    var mastered=bank.words.filter(function(x){ return x.status==="mastered"; })
      .sort(function(a,b){ return (a.lastSeen||"")<(b.lastSeen||"")? -1:1; });
    if(mastered.length){ bank.words.splice(bank.words.indexOf(mastered[0]),1); continue; }
    var learning=bank.words.filter(function(x){ return x.status==="learning"; })
      .sort(function(a,b){ return (a.countFull+0.5*a.countHalf)-(b.countFull+0.5*b.countHalf); });
    if(learning.length) bank.words.splice(bank.words.indexOf(learning[0]),1); else break;
  }
  bank.updatedAt=new Date().toISOString();
  revSave(bank);
}
function revDueList(bank){
  var today=revToday();
  return bank.words.filter(function(e){ return e.status==="learning"&&e.nextDue&&e.nextDue<=today; })
    .sort(function(a,b){ return (a.stage-b.stage)||((b.countFull+0.5*(b.countHalf||0))-(a.countFull+0.5*(a.countHalf||0))); });
}
function paintRevBadges(){
  var n=0; try{ n=revDueList(revLoad()).length; }catch(e){}
  var b=document.getElementById("sbRevBadge"); if(b){ b.textContent=n; b.style.display= n? "":"none"; }
  var cc=document.getElementById("ccRev"); if(cc) cc.textContent= n? " · 🔁 "+n+" word"+(n===1?"":"s")+" due for revision":"";
  var dr=document.getElementById("drawerRevDue"); if(dr) dr.textContent= n? n+" due ›":"›";
}
function revTypedForms(e){
  var ks=Object.keys(e.typed||{}).sort(function(a,b){ return e.typed[b]-e.typed[a]; }).slice(0,3);
  return ks.map(function(k){ return "“"+escapeHtml(k)+"” ×"+e.typed[k]; }).join(" · ");
}
function revDueLabel(e){
  var today=revToday();
  if(e.status==="mastered") return "Mastered";
  if(!e.nextDue) return "—";
  if(e.nextDue<=today) return "Due today";
  if(e.nextDue===revAddDays(today,1)) return "Due tomorrow";
  return "Due "+e.nextDue;
}
var revSummary=null;
function renderRevision(){
  var wrap=document.getElementById("revBody"); if(!wrap) return;
  var bank=revLoad(), due=revDueList(bank);
  var learning=bank.words.filter(function(x){ return x.status==="learning"; }).length;
  var mastered=bank.words.filter(function(x){ return x.status==="mastered"; }).length;
  var h="";
  if(revSummary){
    h+="<div class='card'><h2>Session complete</h2>"
      +"<p>Passed and moved up the ladder: <strong>"+revSummary.passed.length+"</strong> word"+(revSummary.passed.length===1?"":"s")
      +(revSummary.passed.length? " ("+revSummary.passed.map(escapeHtml).join(", ")+")":"")+".</p>"
      +"<p>Reset to the start (due again tomorrow): <strong>"+revSummary.failed.length+"</strong> word"+(revSummary.failed.length===1?"":"s")
      +(revSummary.failed.length? " ("+revSummary.failed.map(escapeHtml).join(", ")+")":"")+".</p>"
      +(due.length? "<p><strong>"+due.length+"</strong> more word"+(due.length===1?" is":"s are")+" still due today.</p>"
        +"<div style='display:flex;gap:8px;flex-wrap:wrap'><button class='btn' id='revAgain' type='button'>↻ Practise this set again</button><button class='btn secondary' id='revSummaryOk' type='button'>Done</button></div></div>"
        : "<p>Nothing else is due today. 🎉</p>"
        +"<button class='btn secondary' id='revSummaryOk' type='button'>Done</button></div>");
  }
  if(!bank.words.length){
    h+="<div class='card'><h2>No weak words yet</h2><p style='margin:0'>Finish any typing test and the words still wrong when it is scored collect here automatically, each with its next practice date. Words you fix with Backspace while typing never appear.</p></div>";
    wrap.innerHTML=h; revWireSummary(); return;
  }
  h+="<div class='tilesRow'>"
    +"<div class='tileStat'><div class='tv'>"+due.length+"</div><div class='tl'>Due today</div></div>"
    +"<div class='tileStat'><div class='tv'>"+learning+"</div><div class='tl'>Still learning</div></div>"
    +"<div class='tileStat'><div class='tv'>"+mastered+"</div><div class='tl'>Mastered</div></div></div>";
  if(due.length){
    h+="<div class='card'><h2>Due today — "+due.length+" word"+(due.length===1?"":"s")+"</h2>"
      +"<p class='small'>Type the passage — each due word appears 3 times. Clean typing moves a word up the ladder (1 → 3 → 7 → 16 days); one mistake sends it back to tomorrow.</p>"
      +"<button class='btn big' id='revStart' type='button'>▶ Start revision session ("+Math.min(18,due.length)+" word"+(Math.min(18,due.length)===1?"":"s")+" · "+(Math.min(18,due.length)*3)+" in the passage)</button>";
    var groups={}, order=[];
    due.forEach(function(e){ var ex=(e.exams&&e.exams[0])||"hcm"; if(!groups[ex]){ groups[ex]=[]; order.push(ex); } groups[ex].push(e); });
    order.forEach(function(ex){
      var sp=specOf(ex);
      h+="<h3 style='margin-top:16px'>From "+(sp? escapeHtml(sp.short):ex)+"</h3>";
      groups[ex].forEach(function(e){
        var forms=revTypedForms(e);
        h+="<div class='revDueRow'><span class='mono' style='font-size:17px'><strong>"+escapeHtml(e.word)+"</strong></span>"
          +(forms? "<span class='small'>you typed "+forms+"</span>":"")
          +"<span class='chip'>Stage "+e.stage+" of 3</span><span class='chip'>"+((e.countFull||0)+(e.countHalf||0))+" scored error"+(((e.countFull||0)+(e.countHalf||0))===1?"":"s")+"</span>"
          +"<button class='btn secondary revDrillOne' data-word='"+encodeURIComponent(e.word)+"' type='button' style='margin-left:auto'>Start drill</button></div>";
      });
    });
    h+="</div>";
  } else {
    h+="<div class='card'><h2>Nothing due today 🎉</h2><p style='margin:0'>Your weak words are resting on their schedule — each one returns on its due date (1, 3, 7, then 16 days after its last clean pass). New scored mistakes from any test join the bank automatically."+(learning? " You don't have to wait: any word still learning can be drilled right now — use its <strong>Drill</strong> button in your weak-word bank below, and a clean pass still moves it up the ladder.":"")+"</p></div>";
  }
  var all=bank.words.slice().sort(function(a,b){
    var da=(a.status==="learning"&&a.nextDue&&a.nextDue<=revToday())?0:1, db=(b.status==="learning"&&b.nextDue&&b.nextDue<=revToday())?0:1;
    if(da!==db) return da-db;
    return ((b.countFull||0)+0.5*(b.countHalf||0))-((a.countFull||0)+0.5*(a.countHalf||0));
  });
  h+="<div class='card'><h2>Your weak-word bank ("+bank.words.length+")</h2><div style='overflow-x:auto'><table><tr><th>Word</th><th>You typed</th><th>Errors</th><th>Stage</th><th>Next due</th><th>Status</th><th>Drill</th></tr>";
  all.forEach(function(e){
    h+="<tr><td class='mono'><strong>"+escapeHtml(e.word)+"</strong></td><td class='mono'>"+(revTypedForms(e)||"—")+"</td>"
      +"<td>"+(e.countFull||0)+" full"+((e.countHalf||0)? " · "+e.countHalf+" half":"")+"</td>"
      +"<td>"+(e.status==="mastered"? "—":"Stage "+e.stage+" of 3")+"</td>"
      +"<td>"+revDueLabel(e)+"</td>"
      +"<td>"+(e.status==="mastered"? "<strong style='color:var(--green)'>Mastered ✓</strong>":"Learning")+"</td>"
      +"<td>"+(e.status==="learning"? "<button class='pill revDrillOne' data-word='"+encodeURIComponent(e.word)+"' type='button'>Drill</button>":"—")+"</td></tr>";
  });
  h+="</table></div></div>";
  wrap.innerHTML=h;
  var st=document.getElementById("revStart");
  if(st) st.addEventListener("click",function(){
    revSummary=null;
    revStartStreamSession(revDueList(revLoad()).map(function(e){ return e.word; }));
  });
  revWireSummary();
  if(typeof revWireDrillButtons==="function") revWireDrillButtons(wrap);
}
function revWireSummary(){
  var ok=document.getElementById("revSummaryOk");
  if(ok) ok.addEventListener("click",function(){ revSummary=null; renderRevision(); });
  var ag=document.getElementById("revAgain");
  if(ag) ag.addEventListener("click",function(){
    revSummary=null;
    revStartStreamSession(revDueList(revLoad()).map(function(e){ return e.word; }));
  });
}
function revApplyResult(word,passed){
  var bank=revLoad(), e=null;
  bank.words.forEach(function(x){ if(x.word===word) e=x; });
  if(!e) return;
  var today=revToday();
  if(passed){
    if(e.stage>=3){ e.status="mastered"; e.nextDue=null; }
    else { var dueMap={0:3,1:7,2:16}; e.nextDue=revAddDays(today,dueMap[e.stage]||3); e.stage++; }
  } else { e.status="learning"; e.stage=0; e.nextDue=revAddDays(today,1); }
  e.lastSeen=today;
  bank.updatedAt=new Date().toISOString();
  revSave(bank);
}

function revComposeStream(wordsArray){
  var ws=(wordsArray||[]).slice(0,18), out=[], r, i;
  for(r=0;r<3;r++) for(i=0;i<ws.length;i++) out.push(ws[i]);
  return out;
}
function revStartStreamSession(wordsArray){
  var seen={}, ws=[];
  (wordsArray||[]).forEach(function(w){ if(w&&!seen[w]){ seen[w]=1; ws.push(w); } });
  ws=ws.slice(0,18);
  if(!ws.length) return false;
  var stream=revComposeStream(ws);
  if(!stream.length) return false;
  window.__revStreamWords=ws.slice();
  revSummary=null;
  if(state.examMode&&typeof setExamMode==="function") setExamMode(false);
  if(state.paperView&&typeof setPaperView==="function") setPaperView(false);
  setDuration(2);
  loadText("revisionStream","Revision session",stream.join(" "),true);
  gotoPractice(); focusCapture();
  return true;
}

function revStreamApply(){
  var words=window.__revStreamWords||[];
  window.__revStreamWords=[];
  if(!words.length||typeof alignWordsHcm!=="function") return;
  var res=alignWordsHcm(state.target, typedString());
  var kindByTi={};
  (res.pairs||[]).forEach(function(p){ if(p.ti>=0) kindByTi[p.ti]=p.kind; });
  var targets=hcmWordTokens(state.target).map(function(t){ return t.w; });
  var passed=[], failed=[];
  words.forEach(function(w){
    var clean=0, botched=false;
    targets.forEach(function(tw,ti){
      if(tw!==w) return;
      var k=kindByTi[ti];
      if(k==="ok") clean++;
      else if(k==="sub"||k==="del") botched=true;
    });
    if(botched){ revApplyResult(w,false); failed.push(w); }
    else if(clean>=3){ revApplyResult(w,true); passed.push(w); }
  });
  revSummary={passed:passed, failed:failed};
  if(typeof showViewReplace==="function") showViewReplace("revision"); else showView("revision");
}

var __showViewV28=showView;
showView=function(name,scrollTarget){
  __showViewV28(name,scrollTarget);
  if(name==="revision") renderRevision();
  paintRevBadges();
};
paintRevBadges();
