/* Client-side rate limiting for auth actions and cloud writes.
   This protects the Firebase quota from double-clicks, retry loops and
   casual abuse. It is not a security boundary on its own: firestore.rules
   and Firebase Auth's own throttling enforce limits on the server. */
var RateLimit=(function(){
  var PREFIX="ts_rl_v1:";
  var memory={};
  var timers={};

  function read(key){
    if(memory[key]) return memory[key];
    try{ var v=JSON.parse(localStorage.getItem(PREFIX+key)||"[]"); return Array.isArray(v)? v : []; }catch(e){ return []; }
  }
  function write(key,arr){
    memory[key]=arr;
    try{ localStorage.setItem(PREFIX+key,JSON.stringify(arr)); }catch(e){}
  }

  /* Sliding window: allows `limit` calls per `windowMs`.
     Returns {ok:true} or {ok:false, retryIn:<seconds>}. */
  function attempt(key,limit,windowMs){
    var now=Date.now();
    var arr=read(key).filter(function(t){ return now-t<windowMs; });
    if(arr.length>=limit){
      write(key,arr);
      return {ok:false, retryIn:Math.max(1,Math.ceil((arr[0]+windowMs-now)/1000))};
    }
    arr.push(now);
    write(key,arr);
    return {ok:true, retryIn:0};
  }

  function reset(key){
    delete memory[key];
    try{ localStorage.removeItem(PREFIX+key); }catch(e){}
  }

  /* Trailing debounce keyed by name: only the last call in a burst runs. */
  function debounce(key,waitMs,fn){
    if(timers[key]) clearTimeout(timers[key]);
    timers[key]=setTimeout(function(){ delete timers[key]; fn(); },waitMs);
  }

  function waitText(sec){
    if(sec>=60){ var m=Math.ceil(sec/60); return m+" minute"+(m===1?"":"s"); }
    return sec+" second"+(sec===1?"":"s");
  }

  return {attempt:attempt, reset:reset, debounce:debounce, waitText:waitText};
})();

var RATE_LIMITS={
  login:{limit:5, windowMs:5*60*1000},
  signup:{limit:5, windowMs:60*60*1000},
  passwordReset:{limit:3, windowMs:15*60*1000},
  cloudWrite:{limit:60, windowMs:10*60*1000}
};

function rateLimited(name){
  var cfg=RATE_LIMITS[name];
  var r=RateLimit.attempt(name,cfg.limit,cfg.windowMs);
  return r.ok? null : "Too many attempts. Please wait "+RateLimit.waitText(r.retryIn)+" and try again.";
}
