const scene=document.querySelector('.samurai-poster-scene');
const art=document.querySelector('.samurai-poster-art');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(scene&&art&&!reduced){
 let tx=0,ty=0,x=0,y=0,raf=0;
 scene.addEventListener('pointermove',e=>{const r=scene.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*7;ty=((e.clientY-r.top)/r.height-.5)*-5;},{passive:true});
 scene.addEventListener('pointerleave',()=>{tx=0;ty=0;});
 const tick=()=>{x+=(tx-x)*.035;y+=(ty-y)*.035;art.style.transform=`translate3d(${x}px,${y}px,0) scale(1.015)`;raf=requestAnimationFrame(tick);};
 const io=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){if(!raf)tick();}else if(raf){cancelAnimationFrame(raf);raf=0;}},{threshold:.01});io.observe(scene);
}
if(window.gsap&&!reduced){
 const gsap=window.gsap;
 gsap.timeline({defaults:{ease:'power3.out'},delay:.15})
  .from('.universe-topline span',{y:12,autoAlpha:0,duration:.6,stagger:.1})
  .from('.poster-frame',{y:34,scale:.96,autoAlpha:0,duration:1.1},'-.25')
  .from('.universe-kicker',{y:12,autoAlpha:0,duration:.55},'-.55')
  .from('.universe-copy h1',{y:45,autoAlpha:0,duration:.9},'-.35')
  .from('.universe-bottomline>p,.universe-actions>*',{y:14,autoAlpha:0,duration:.6,stagger:.08},'-.45')
  .from('.universe-footer span',{y:8,autoAlpha:0,duration:.45,stagger:.07},'-.35');
}
