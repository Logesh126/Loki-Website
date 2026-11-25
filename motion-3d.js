import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const canvas=document.querySelector('#hero-3d-canvas');
const stage=canvas?.closest('.universe-scene');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(canvas&&stage){
 let renderer,scene,camera,assembly,raf=0,observer;
 const pointer={x:0,y:0,tx:0,ty:0,down:false};
 const clock=new THREE.Clock();
 try{
  renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));
  renderer.setSize(stage.clientWidth,stage.clientHeight,false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.18;
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(34,stage.clientWidth/stage.clientHeight,.1,100);
  camera.position.set(0,0,9.4);
  scene.add(new THREE.HemisphereLight(0xded4f4,0x100d18,1.5));
  const light=(color,intensity,pos)=>{const l=new THREE.PointLight(color,intensity,22);l.position.set(...pos);scene.add(l);};
  light(0xd7c2ff,125,[3.5,4,5]);light(0x7553bd,150,[-4,-2,2]);light(0xffffff,36,[0,1,-5]);
  assembly=new THREE.Group();scene.add(assembly);
  const coreGeo=new THREE.IcosahedronGeometry(1.12,5);
  const coreMat=new THREE.MeshPhysicalMaterial({color:0x8e79b7,metalness:.86,roughness:.2,clearcoat:1,clearcoatRoughness:.12,iridescence:.8,iridescenceIOR:1.35,emissive:0x211533,emissiveIntensity:.3});
  const core=new THREE.Mesh(coreGeo,coreMat);assembly.add(core);
  const inner=new THREE.Mesh(new THREE.IcosahedronGeometry(.82,3),new THREE.MeshBasicMaterial({color:0xc8b6ef,wireframe:true,transparent:true,opacity:.13}));assembly.add(inner);
  const rings=[];
  const makeRing=(radius,tube,rotation,material)=>{const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,18,220),material);ring.rotation.set(...rotation);assembly.add(ring);rings.push(ring);return ring;};
  const gold=new THREE.MeshStandardMaterial({color:0xc8b5e8,metalness:.9,roughness:.25,emissive:0x24183b,emissiveIntensity:.18});
  makeRing(1.72,.012,[1.02,.24,-.36],gold);
  makeRing(2.04,.006,[.42,-.8,.58],new THREE.MeshBasicMaterial({color:0xe7dcff,transparent:true,opacity:.38}));
  makeRing(1.42,.008,[1.3,.9,.2],new THREE.MeshBasicMaterial({color:0x8d72c0,transparent:true,opacity:.6}));
  const shards=new THREE.Group();assembly.add(shards);
  const shardMat=new THREE.MeshPhysicalMaterial({color:0xb7a3dc,metalness:.8,roughness:.19,transmission:.12,transparent:true,opacity:.9,clearcoat:1});
  for(let i=0;i<9;i++){
   const mesh=new THREE.Mesh(new THREE.OctahedronGeometry(.12+Math.random()*.13,0),shardMat);
   const a=i/9*Math.PI*2,r=2.45+Math.random()*.35;
   mesh.position.set(Math.cos(a)*r,Math.sin(a)*r*.68,(Math.random()-.5)*1.3);
   mesh.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3);
   shards.add(mesh);
  }
  const dustCount=850,positions=new Float32Array(dustCount*3);
  for(let i=0;i<dustCount;i++){const r=2.8+Math.random()*3.6,a=Math.random()*Math.PI*2,b=Math.acos(2*Math.random()-1);positions[i*3]=r*Math.sin(b)*Math.cos(a);positions[i*3+1]=r*Math.sin(b)*Math.sin(a);positions[i*3+2]=r*Math.cos(b);}
  const dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  scene.add(new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xc8b5ef,size:.012,transparent:true,opacity:.58,sizeAttenuation:true})));
  const resize=()=>{const w=Math.max(1,stage.clientWidth),h=Math.max(1,stage.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=w<600?10.5:9.4;camera.updateProjectionMatrix();};
  new ResizeObserver(resize).observe(stage);
  const onMove=e=>{const r=stage.getBoundingClientRect();pointer.tx=((e.clientX-r.left)/r.width-.5)*.85;pointer.ty=((e.clientY-r.top)/r.height-.5)*.65;};
  canvas.addEventListener('pointermove',onMove,{passive:true});
  canvas.addEventListener('pointerdown',()=>{pointer.down=true;});
  window.addEventListener('pointerup',()=>{pointer.down=false;});
  canvas.addEventListener('pointerleave',()=>{pointer.tx=0;pointer.ty=0;});
  const render=()=>{raf=0;if(document.hidden)return;const t=clock.getElapsedTime();pointer.x+=(pointer.tx-pointer.x)*.035;pointer.y+=(pointer.ty-pointer.y)*.035;
   if(!reduced){assembly.rotation.y=t*.095+pointer.x;assembly.rotation.x=Math.sin(t*.16)*.09+pointer.y;assembly.rotation.z=Math.sin(t*.11)*.035;shards.rotation.y=-t*.075;rings.forEach((r,i)=>r.rotation.z+=Math.sin(t*.16+i)*.0005);}
   renderer.render(scene,camera);raf=requestAnimationFrame(render);};
  const start=()=>{if(!raf&&!document.hidden)render();},stop=()=>{if(raf)cancelAnimationFrame(raf);raf=0;};
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  observer=new IntersectionObserver(entries=>entries[0].isIntersecting?start():stop(),{threshold:.01});observer.observe(stage);start();
 }catch(error){console.warn('Interactive 3D scene unavailable; retaining ambient fallback.',error);canvas.hidden=true;}
}
if(window.gsap){
 const gsap=window.gsap,ST=window.ScrollTrigger;if(ST)gsap.registerPlugin(ST);
 if(!reduced){gsap.timeline({defaults:{ease:'power3.out'},delay:.2}).from('.universe-topline span',{y:12,autoAlpha:0,duration:.65,stagger:.12}).from('.universe-kicker',{y:14,autoAlpha:0,duration:.65},'-.25').from('.universe-copy h1',{y:65,autoAlpha:0,rotateX:-8,duration:1.15,transformOrigin:'50% 100%'},'-.35').from('.universe-bottomline>p',{y:20,autoAlpha:0,duration:.75},'-.55').from('.universe-actions>*',{y:12,autoAlpha:0,stagger:.1,duration:.55},'-.45').from('.universe-footer span',{y:8,autoAlpha:0,stagger:.08,duration:.5},'-.35');}
 if(ST&&!reduced){gsap.to('.universe-halo.halo-a',{rotation:10,ease:'none',scrollTrigger:{trigger:'.universe-hero',start:'top top',end:'bottom top',scrub:1}});}
}
