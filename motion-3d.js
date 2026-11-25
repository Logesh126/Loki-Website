import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const canvas=document.querySelector('#hero-3d-canvas');
const stage=canvas?.closest('.universe-scene');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(canvas&&stage){
 let renderer,scene,camera,raf=0,observer;
 const pointer={x:0,y:0,tx:0,ty:0};
 const clock=new THREE.Clock();
 try{
  renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));
  renderer.setSize(stage.clientWidth,stage.clientHeight,false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  scene=new THREE.Scene();
  camera=new THREE.OrthographicCamera(-5.8,5.8,4.1,-4.1,.1,80);
  camera.position.set(0,0,20);
  const ink=new THREE.MeshBasicMaterial({color:0x080708});
  const deepRed=new THREE.MeshBasicMaterial({color:0x8d0808});
  const red=new THREE.MeshBasicMaterial({color:0xf20b0b});
  const white=new THREE.MeshBasicMaterial({color:0xf5eee7});
  const redGlow=new THREE.MeshBasicMaterial({color:0xff211b,transparent:true,opacity:.14});
  const makeShape=(points,material,z,parent=scene)=>{const s=new THREE.Shape();s.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)s.lineTo(points[i][0],points[i][1]);s.closePath();const m=new THREE.Mesh(new THREE.ShapeGeometry(s),material);m.position.z=z;parent.add(m);return m;};
  const circle=(r,material,x,y,z,parent=scene)=>{const m=new THREE.Mesh(new THREE.CircleGeometry(r,96),material);m.position.set(x,y,z);parent.add(m);return m;};
  // Warm paper atmosphere and vermilion rising sun.
  circle(3.15,redGlow,0,.95,-5);
  circle(2.42,red,0,.98,-4);
  // Hand-inked, imperfect sun rings.
  const ringMat=new THREE.LineBasicMaterial({color:0xff5a4c,transparent:true,opacity:.75});
  for(let j=0;j<3;j++){const pts=[];for(let i=0;i<=220;i++){const a=i/220*Math.PI*2,r=2.57+j*.055+Math.sin(a*7+j)*.025+Math.sin(a*13)*.012;pts.push(new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r*.98+.98,-3.8+j*.01));}scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),ringMat));}
  // Distant pagodas and layered hills.
  const pagoda=(x,y,scale,material)=>{const g=new THREE.Group();g.position.set(x,y,-2.8);g.scale.setScalar(scale);scene.add(g);makeShape([[-.12,-1.5],[-.12,.35],[-.3,.55],[0,.75],[.3,.55],[.12,.35],[.12,-1.5]],material,0,g);for(let k=0;k<4;k++){const yy=-.15+k*.38,w=.58-k*.085;makeShape([[-w,yy],[-w*.82,yy+.1],[-.42,yy+.13],[0,yy+.28],[.42,yy+.13],[w*.82,yy+.1],[w,yy]],material,.01,g);}makeShape([[0,.72],[-.04,1.08],[0,1.42],[.04,1.08]],material,.02,g);};
  pagoda(-4.3,-2.6,.9,deepRed);pagoda(4.25,-2.65,.7,deepRed);
  makeShape([[-6,-4.1],[-6,-2.3],[-4.7,-2.55],[-3.3,-2.35],[-2.1,-2.75],[-.8,-2.5],[.6,-2.8],[2,-2.45],[3.4,-2.7],[4.8,-2.4],[6,-2.55],[6,-4.1]],deepRed,-1.9);
  // Foreground mountain: dark, broad, sculptural silhouette.
  makeShape([[-4.65,-4.2],[-4.35,-2.85],[-3.8,-2.15],[-3.25,-1.65],[-2.7,-1.35],[-2.15,-1.18],[-1.4,-1.08],[-.6,-.96],[0,-.92],[.7,-1.02],[1.45,-1.18],[2.2,-1.48],[2.9,-1.95],[3.55,-2.6],[4.2,-3.4],[4.55,-4.2]],ink,-.5);
  // Samurai silhouette, assembled as a single readable ink figure.
  const samurai=new THREE.Group();samurai.position.set(0,-.5,.8);scene.add(samurai);
  // robe and legs
  makeShape([[-.42,.05],[-.66,-.52],[-.92,-1.22],[-.72,-1.38],[-.12,-1.34],[.32,-1.45],[.62,-1.35],[.32,-.98],[.2,-.48],[.28,.05]],ink,0,samurai);
  makeShape([[-.38,-1.25],[-.33,-1.78],[-.08,-1.82],[.02,-1.3]],ink,.02,samurai);
  makeShape([[.12,-1.28],[.28,-1.75],[.55,-1.78],[.52,-1.34]],ink,.03,samurai);
  // torso, shoulder and sleeve
  makeShape([[-.34,.58],[-.62,.32],[-.72,-.02],[-.5,-.32],[-.32,-.65],[.3,-.58],[.48,-.12],[.34,.35],[.12,.62]],ink,.05,samurai);
  makeShape([[.28,.35],[.55,.22],[.8,.4],[.92,.32],[.72,.06],[.45,-.04],[.22,.12]],ink,.06,samurai);
  // neck and head
  makeShape([[-.18,.58],[-.16,.95],[.18,.98],[.22,.56]],ink,.08,samurai);
  circle(.27,ink,0,1.12,.09,samurai);
  // iconic broad kasa hat
  makeShape([[-.66,1.35],[-.38,1.5],[.03,1.72],[.48,1.5],[.72,1.22],[.22,1.28],[-.24,1.26]],ink,.11,samurai);
  makeShape([[-.28,1.27],[-.65,1.13],[-.42,1.18],[-.12,1.28]],ink,.12,samurai);
  // sword and scabbard
  makeShape([[.55,.15],[1.35,.68],[1.42,.62],[.68,.03]],ink,.13,samurai);
  makeShape([[.48,.08],[.58,.02],[1.52,.75],[1.46,.81]],ink,.14,samurai);
  makeShape([[-.62,-.48],[-1.5,-1.2],[-1.43,-1.26],[-.48,-.62]],ink,.13,samurai);
  // small four-point brand mark used as a subtle seal on the distant ground, not a helmet crest.
  const mark=new THREE.Group();mark.position.set(2.35,-2.15,.2);mark.scale.setScalar(.16);samurai.add(mark);
  makeShape([[0,.48],[.13,.13],[.48,0],[.13,-.13],[0,-.48],[-.13,-.13],[-.48,0],[-.13,.13]],white,.2,mark);
  // Wind-carried cloud bands in the foreground and background.
  const clouds=[];
  const cloud=(x,y,z,scale,mat)=>{const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(scale);scene.add(g);circle(.28,mat,-.35,0,0,g);circle(.38,mat,0,.08,.01,g);circle(.28,mat,.35,0,.02,g);makeShape([[-.7,-.1],[-.5,-.25],[.55,-.23],[.8,-.08]],mat,.03,g);clouds.push({g,speed:.12+Math.random()*.08});};
  cloud(-5.8,1.5,1.5,1.1,deepRed);cloud(5.5,-.1,1.8,.9,deepRed);cloud(-4.7,-1.1,1.7,.7,deepRed);
  // Sparse floating ember specks.
  const count=150,positions=new Float32Array(count*3);
  for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*11;positions[i*3+1]=(Math.random()-.5)*7;positions[i*3+2]=2+Math.random()*2;}
  const dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  scene.add(new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xff8b70,size:.018,transparent:true,opacity:.55})));
  const resize=()=>{const w=Math.max(1,stage.clientWidth),h=Math.max(1,stage.clientHeight),aspect=w/h,viewH=8.2;camera.left=-viewH*aspect/2;camera.right=viewH*aspect/2;camera.top=viewH/2;camera.bottom=-viewH/2;camera.updateProjectionMatrix();renderer.setSize(w,h,false);};
  new ResizeObserver(resize).observe(stage);resize();
  const onMove=e=>{const r=stage.getBoundingClientRect();pointer.tx=((e.clientX-r.left)/r.width-.5)*.5;pointer.ty=((e.clientY-r.top)/r.height-.5)*.35;};
  stage.addEventListener('pointermove',onMove,{passive:true});stage.addEventListener('pointerleave',()=>{pointer.tx=0;pointer.ty=0;});
  const render=()=>{raf=0;if(document.hidden)return;const t=clock.getElapsedTime();pointer.x+=(pointer.tx-pointer.x)*.035;pointer.y+=(pointer.ty-pointer.y)*.035;if(!reduced){samurai.position.x=pointer.x*.22;samurai.rotation.y=pointer.x*.08;samurai.rotation.x=pointer.y*.06;clouds.forEach(({g,speed})=>{g.position.x+=speed*.004;if(g.position.x>7)g.position.x=-7;});}renderer.render(scene,camera);raf=requestAnimationFrame(render);};
  const start=()=>{if(!raf&&!document.hidden)render();},stop=()=>{if(raf)cancelAnimationFrame(raf);raf=0;};
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  observer=new IntersectionObserver(entries=>entries[0].isIntersecting?start():stop(),{threshold:.01});observer.observe(stage);start();
 }catch(error){console.warn('Samurai landscape scene unavailable.',error);canvas.hidden=true;}
}
if(window.gsap){
 const gsap=window.gsap,ST=window.ScrollTrigger;if(ST)gsap.registerPlugin(ST);
 if(!reduced){gsap.timeline({defaults:{ease:'power3.out'},delay:.2}).from('.universe-topline span',{y:12,autoAlpha:0,duration:.65,stagger:.12}).from('.universe-kicker',{y:14,autoAlpha:0,duration:.65},'-.25').from('.universe-copy h1',{y:65,autoAlpha:0,duration:1.15},'-.35').from('.universe-bottomline>p',{y:20,autoAlpha:0,duration:.75},'-.55').from('.universe-actions>*',{y:12,autoAlpha:0,stagger:.1,duration:.55},'-.45').from('.universe-footer span',{y:8,autoAlpha:0,stagger:.08,duration:.5},'-.35');}
}
