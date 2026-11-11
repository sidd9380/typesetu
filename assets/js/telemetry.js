var TEL={
  mode:"typed", val:"", started:false, t0:0, startedAt:0, lastT:0, finishStamp:0,
  keystrokes:0, backspaces:0, deletedChars:0, charT:[], accs:{},
  pauseCount:0, pauseMs:0, longestPauseMs:0, longestPauseWord:-1, lastWord:-1, tailWord:0,
  burst:null, fixingMs:0, bursts:0, posMap:null, posEnds:null,
  setTarget:function(text,mode){
    this.reset();
    this.mode=mode||"typed";
    if(mode==="pos"&&typeof text==="string"){
      var map=[], ends=[], wi=0, i;
      for(i=0;i<=text.length;i++){ map[i]=wi; if(i<text.length&&text[i]===" "){ ends[wi]=i; wi++; } }
      ends[wi]=text.length;
      this.posMap=map; this.posEnds=ends;
    }
  },
  reset:function(){
    this.val=""; this.started=false; this.t0=0; this.startedAt=0; this.lastT=0; this.finishStamp=0;
    this.keystrokes=0; this.backspaces=0; this.deletedChars=0; this.charT=[]; this.accs={};
    this.pauseCount=0; this.pauseMs=0; this.longestPauseMs=0; this.longestPauseWord=-1; this.lastWord=-1; this.tailWord=0;
    this.burst=null; this.fixingMs=0; this.bursts=0; this.posMap=null; this.posEnds=null;
  },
  _acc:function(w){ if(w<0) w=0; var a=this.accs[w]; if(!a){ a={startT:null,endT:null,keys:0,bs:0,paused:false}; this.accs[w]=a; } return a; },
  _spacesBefore:function(pos){ var n=0; for(var i=0;i<pos;i++) if(this.val[i]===" ") n++; return n; },
  _wordAtIns:function(pos){
    if(this.mode==="pos"&&this.posMap) return this.posMap[Math.min(pos,this.posMap.length-1)];
    if(pos>=this.val.length) return this.tailWord;
    return this._spacesBefore(pos);
  },
  _wordAtDel:function(pos){
    if(this.mode==="pos"&&this.posMap) return this.posMap[Math.min(pos,this.posMap.length-1)];
    if(pos>=this.val.length-1){ return this.val[pos]===" "? Math.max(0,this.tailWord-1) : this.tailWord; }
    return this._spacesBefore(pos);
  },
  _ins:function(pos,ch,t){
    var w=this._wordAtIns(pos), a=this._acc(w);
    a.keys++; if(a.startT===null) a.startT=t;
    if(this.mode==="pos"&&this.posEnds){ if(this.posEnds[w]!=null&&pos>=this.posEnds[w]&&a.endT===null) a.endT=t; }
    else if(ch===" ") a.endT=t;
    this.charT.splice(pos,0,t);
    var atEnd= pos>=this.val.length;
    this.val=this.val.slice(0,pos)+ch+this.val.slice(pos);
    if(atEnd&&ch===" ") this.tailWord++;
    this.lastWord=w;
  },
  _del:function(pos,t){
    var w=this._wordAtDel(pos), a=this._acc(w), ch=this.val[pos];
    a.bs++;
    if(this.mode==="pos"&&this.posEnds){ if(this.posEnds[w]===pos) a.endT=null; }
    else if(ch===" ") a.endT=null;
    this.charT.splice(pos,1);
    var atEnd= pos>=this.val.length-1;
    this.val=this.val.slice(0,pos)+this.val.slice(pos+1);
    if(atEnd&&ch===" ") this.tailWord=Math.max(0,this.tailWord-1);
    this.lastWord=w;
  },
  _closeBurst:function(atT){
    if(!this.burst) return;

    this.fixingMs+=Math.min(5000,Math.max(0,atT-this.burst.startT));
    this.bursts++;
    this.burst=null;
  },
  feed:function(newVal){
    if(typeof newVal!=="string") return;
    var old=this.val; if(newVal===old) return;
    var t=(window.performance&&performance.now)? performance.now():Date.now();
    var minL=Math.min(old.length,newVal.length), p=0;
    while(p<minL&&old[p]===newVal[p]) p++;
    var sf=0; while(sf<(minL-p)&&old[old.length-1-sf]===newVal[newVal.length-1-sf]) sf++;
    var delN=old.length-p-sf, insStr=newVal.slice(p,newVal.length-sf);
    if(delN===0&&insStr.length===0){ this.val=newVal; return; }
    if(!this.started){
      if(insStr.length===0){ this.val=newVal; return; }
      this.started=true; this.t0=t; this.startedAt=Date.now(); this.lastT=t;
    } else {
      var gap=t-this.lastT;
      if(gap>2000){
        this.pauseCount++; this.pauseMs+=gap;
        if(gap>this.longestPauseMs){ this.longestPauseMs=gap; this.longestPauseWord=this.lastWord; }
        if(this.lastWord>=0) this._acc(this.lastWord).paused=true;
      }
      this.lastT=t;
    }
    if(delN>0){
      this.backspaces+=delN; this.deletedChars+=delN;
      if(this.burst&&t-this.burst.lastBsT>1500) this._closeBurst(this.burst.lastActT);
      if(!this.burst) this.burst={startT:t,preLen:old.length,lastBsT:t,lastActT:t};
      else { this.burst.lastBsT=t; this.burst.lastActT=t; }
      for(var k=0;k<delN;k++) this._del(p,t);
    }
    if(insStr.length>0){
      this.keystrokes+=insStr.length;
      if(this.burst&&t-this.burst.lastBsT>1500) this._closeBurst(this.burst.lastActT);
      for(var m=0;m<insStr.length;m++){
        var ch=insStr[m], pos=p+m, wB=this._wordAtIns(pos);
        this._ins(pos,ch,t);
        if(this.burst){
          this.burst.lastActT=t;
          var closes=false;
          if(this.mode==="pos"&&this.posEnds){ if(this.posEnds[wB]!=null&&pos>=this.posEnds[wB]) closes=true; }
          else if(ch===" ") closes=true;
          if(closes||newVal.length>=this.burst.preLen) this._closeBurst(t);
        }
      }
    }
  },
  finalize:function(){
    if(!this.started) return null;
    var fT=(window.performance&&performance.now)? performance.now():Date.now();
    this.finishStamp=fT;
    if(this.burst) this._closeBurst(this.burst.lastActT);
    var activeMs=Math.max(1,Math.round(fT-this.t0));

    var bucketSec= activeMs<120000? 60:30, bucketMs=bucketSec*1000;
    var nb=Math.max(1,Math.ceil(activeMs/bucketMs)), counts=[], bi;
    for(bi=0;bi<nb;bi++) counts.push(0);
    for(var i=0;i<this.charT.length;i++){ var b=Math.floor((this.charT[i]-this.t0)/bucketMs); if(b<0)b=0; if(b>=nb)b=nb-1; counts[b]++; }
    function durOf(idx){ var d=Math.min(bucketMs,activeMs-idx*bucketMs); return d<=0? bucketMs:d; }
    var buckets=counts.map(function(c,idx){ return {chars:c, wpm:+((c/5)/(durOf(idx)/60000)).toFixed(1)}; });
    var totalChars=counts.reduce(function(a,c){ return a+c; },0);
    var overall= totalChars/5/(activeMs/60000);
    var wsum=0; buckets.forEach(function(bk,idx){ wsum+=bk.wpm*durOf(idx); });

    var reconOk= Math.abs(wsum/activeMs-overall)<=1;
    return {activeMs:activeMs, startedAt:this.startedAt, keystrokes:this.keystrokes, backspaces:this.backspaces,
      deletedChars:this.deletedChars, fixingMs:Math.round(this.fixingMs), bursts:this.bursts,
      pauseCount:this.pauseCount, pauseMs:Math.round(this.pauseMs), longestPauseMs:Math.round(this.longestPauseMs),
      longestPauseWord:this.longestPauseWord, buckets:buckets, bucketSec:bucketSec, reconOk:reconOk, totalChars:totalChars};
  }
};
window.TEL=TEL;

function alignHcm(target,typedStr){
  var al=alignWordsHcm(target,typedStr), out=[];
  al.pairs.forEach(function(p){
    if(p.kind==="del") return;
    if(p.kind==="ins"){ out.push({exp:"",got:p.got,st:"full"}); return; }
    out.push({exp:p.exp,got:p.got,st:(p.kind==="ok"?"ok":"full")});
  });
  out.deletions=al.pairs.filter(function(p){ return p.kind==="del"; })
    .map(function(p){ return {exp:p.exp,got:"(missed)",st:"full"}; });
  return out;
}

function alignWordsE(expText,gotText){
  var E=expText.split(/\s+/).filter(Boolean), G=gotText.split(/\s+/).filter(Boolean);
  var i=0,j=0, perTyped=[], skipped=[];
  while(i<E.length&&j<G.length){
    if(E[i]===G[j]){ perTyped.push({exp:E[i],got:G[j],st:"ok"}); i++; j++; continue; }
    if(i+1<E.length&&E[i+1]===G[j]){ skipped.push({exp:E[i]}); i++; continue; }
    if(j+1<G.length&&G[j+1]===E[i]){ perTyped.push({exp:"",got:G[j],st:"full"}); j++; continue; }
    if(j===G.length-1&&G[j].length<E[i].length&&E[i].indexOf(G[j])===0){ perTyped.push({exp:E[i],got:G[j],st:"ok"}); j++; i++; break; }
    perTyped.push({exp:E[i],got:G[j],st:classifyPair(E[i],G[j])}); i++; j++;
  }
  while(j<G.length){ perTyped.push({exp:"",got:G[j],st:"full"}); j++; }
  return {perTyped:perTyped, skipped:skipped};
}

function charAlignOps(e,g){
  var m=e.length,n=g.length,i,j,D=[];
  for(i=0;i<=m;i++){ D.push([]); for(j=0;j<=n;j++) D[i][j]= (i===0? j : (j===0? i:0)); }
  for(i=1;i<=m;i++) for(j=1;j<=n;j++) D[i][j]=Math.min(D[i-1][j]+1,D[i][j-1]+1,D[i-1][j-1]+(e[i-1]===g[j-1]?0:1));
  var subs=[],om=0,ins=0; i=m; j=n;
  while(i>0||j>0){
    if(i>0&&j>0&&D[i][j]===D[i-1][j-1]+(e[i-1]===g[j-1]?0:1)){
      if(e[i-1]!==g[j-1]){ if(e[i-1]===" ") ins++; else if(g[j-1]===" ") om++; else subs.push([e[i-1],g[j-1]]); }
      i--; j--;
    } else if(i>0&&D[i][j]===D[i-1][j]+1){ if(e[i-1]!==" ") om++; i--; }
    else if(j>0){ if(g[j-1]!==" ") ins++; j--; }
    else break;
  }
  return {subs:subs,om:om,ins:ins};
}
function confusionsFromPairs(pairs){
  var map={}, om=0, ins=0;
  pairs.forEach(function(pr){
    var r=charAlignOps(pr.exp,pr.got); om+=r.om; ins+=r.ins;
    r.subs.forEach(function(s){ var k=s[0]+""+s[1]; map[k]=(map[k]||0)+1; });
  });
  var list=Object.keys(map).map(function(k){ var p=k.split(""); return {exp:p[0],got:p[1],n:map[k]}; });
  list.sort(function(a,b){ return b.n-a.n; });
  return {list:list.slice(0,8), om:om, ins:ins};
}

function buildTelemetry(aligned,conf){
  var agg=TEL.finalize(); if(!agg) return null;
  var words=null, corr=0;
  if(aligned){
    words=aligned.map(function(al,j){
      var a=TEL.accs[j]||{startT:null,endT:null,keys:(al.got||"").length,bs:0,paused:false};
      return {i:j, exp:al.exp, got:al.got, st:al.st,
        startMs: a.startT!=null? Math.max(0,Math.round(a.startT-TEL.t0)):0,
        endMs: Math.max(0,Math.round((a.endT!=null? a.endT:TEL.finishStamp)-TEL.t0)),
        keys:a.keys, bs:a.bs, paused:!!a.paused};
    });
    words.forEach(function(w){ if(w.bs>0&&w.st==="ok") corr++; });
  }
  var tel={v:1, startedAt:agg.startedAt, activeMs:agg.activeMs, keystrokes:agg.keystrokes,
    backspaces:agg.backspaces, deletedChars:agg.deletedChars, fixingMs:agg.fixingMs, bursts:agg.bursts,
    pauseCount:agg.pauseCount, pauseMs:agg.pauseMs, longestPauseMs:agg.longestPauseMs,
    longestPauseWord:agg.longestPauseWord, correctedSlips:corr, words:words,
    confusions:conf.list, omissions:conf.om, insertions:conf.ins,
    buckets:agg.buckets, bucketSec:agg.bucketSec, reconOk:agg.reconOk};

  if(words&&(words.length>1200||JSON.stringify(tel).length>120000)){ tel.words=null; tel.buckets=null; }
  return tel;
}
function buildHcmTelemetry(mres){
  window.__fxHcm=null;
  if(!TEL.started||!TEL.keystrokes) return;
  var typedStr=""; state.typed.forEach(function(x){ typedStr+=x.ch; });
  var aligned=alignHcm(state.target,typedStr);
  var dels=aligned.deletions||[];
  var fulls=dels.length; aligned.forEach(function(w){ if(w.st==="full") fulls++; });
  var pairs=aligned.filter(function(w){ return w.exp&&w.got&&w.st!=="ok"; });
  var conf=confusionsFromPairs(pairs);

  var wordsOk= !(mres&&typeof mres.total==="number")||fulls===mres.total;
  var tel=buildTelemetry(wordsOk? aligned:null, conf);
  var feed;
  if(wordsOk){

    feed=aligned.filter(function(w){ return w.st==="full"&&w.exp; }).map(function(w){ return {exp:w.exp,got:w.got,st:"full"}; });
    feed=feed.concat(dels.map(function(w){ return {exp:w.exp,got:w.got,st:"full"}; }));
  }
  else { feed=[]; (mres.rows||[]).forEach(function(r){ if(r.exp==="(extra)") return; for(var c=0;c<r.count;c++) feed.push({exp:r.exp,got:r.got,st:"full"}); }); }
  window.__fxHcm={tel:tel, feed:feed};
}
function buildExamTelemetry(sp,target,typedText,sc){
  window.__fxEx=null;
  if(!TEL.started||!TEL.keystrokes) return;
  var al=alignWordsE(target,typedText);
  var f=0,hf=0; al.perTyped.forEach(function(w){ if(w.st==="full") f++; else if(w.st==="half") hf++; });
  var ok= (f+al.skipped.length===sc.full&&hf===sc.half);
  var pairs=al.perTyped.filter(function(w){ return w.exp&&w.got&&w.st!=="ok"; });
  var conf=confusionsFromPairs(pairs);
  var tel=buildTelemetry(ok? al.perTyped:null, conf);

  var feed=[];
  sc.detail.forEach(function(d){
    if(d.kind==="half") feed.push({exp:d.exp,got:d.got,st:"half"});
    else if(d.kind==="wrong") feed.push({exp:d.exp,got:d.got,st:"full"});
    else if(d.kind==="skipped") feed.push({exp:d.exp,got:"",st:"full"});
  });
  window.__fxEx={tel:tel, feed:feed};
}
