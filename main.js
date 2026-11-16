(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var EASE='cubic-bezier(.2,.7,.2,1)';
var $=function(i){return document.getElementById(i)};
/* tour */
var T=window.TABS,tabs=document.querySelectorAll('.tab'),img=$('tImg');
function show(i){
  var t=T[i];
  tabs.forEach(function(b,j){b.classList.toggle('active',j===i);b.setAttribute('aria-selected',j===i)});
  $('tTitle').textContent=t.t;$('tDesc').textContent=t.d;
  $('tBul').innerHTML=t.b.map(function(x){return '<li><span class="material-symbols-outlined">check_circle</span>'+x+'</li>'}).join('');
  img.style.opacity=0;
  setTimeout(function(){img.style.visibility='visible';img.src='assets/screens/'+t.i;img.style.opacity=1},reduce?0:350);
}
tabs.forEach(function(b,i){b.addEventListener('click',function(){show(i)})});
show(0);
/* scaling */
function scale(){
  var w=$('stageWrap'),s=w.clientWidth/1000;
  $('stage').style.transform='scale('+s+')';w.style.height=(700*s)+'px';
  var f=$('fanWrap'),fs=Math.min(1.3,f.clientWidth/900);
  $('fan').style.transform='scale('+fs+')';f.style.height=(620*fs)+'px';
  f.style.maxWidth='100%';
  if(f.clientWidth>900*fs){$('fan').style.left=((f.clientWidth-900*fs)/2)+'px'}else $('fan').style.left='0';
}
scale();addEventListener('resize',scale);addEventListener('load',scale);
if(reduce)return;
/* hero entrance */
var opts=function(d,delay){return{duration:d,delay:delay,easing:EASE,fill:'backwards'}};
Array.prototype.forEach.call($('heroL').children,function(el,i){
  el.animate([{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'none'}],opts(800,100+i*90));
});
$('stage').animate([{opacity:0,transform:'translateX(60px) scale(.96)'},{opacity:1,transform:'none'}],opts(1100,250));
/* scroll reveal */
var els=[].slice.call(document.querySelectorAll('[data-reveal]'));
var groups=new Map();
els.forEach(function(el){var p=el.parentNode;if(!groups.has(p))groups.set(p,[]);var a=groups.get(p);el._i=a.length;a.push(el)});
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;io.unobserve(e.target);
  e.target.animate([{opacity:0,translate:'0 48px'},{opacity:1,translate:'0 0'}],opts(800,(e.target._i%4)*90));
})},{threshold:.1});
els.forEach(function(el){
  var r=el.getBoundingClientRect();
  if(r.top<innerHeight&&r.bottom>0)return; // already in view: no animation
  io.observe(el);
});
})();
