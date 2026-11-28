(async()=>{
 const $=s=>document.querySelector(s); const grid=$('#project-grid');
 const menu=$('.menu-toggle'), nav=$('.main-nav');
 menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
 try{
  const response=await fetch('gallery-data.json'); if(!response.ok) throw new Error('Could not load gallery data');
  const data=await response.json();
  const projectInfo=[
   ['mother-teresa-group','Mother Teresa Group','Eight institutional websites · UI/UX & graphic design','projects/mother-teresa-group.html','01',[['Main website','https://www.motherterasakalvi.com/'],['Instagram','https://www.instagram.com/mother_terasa_kalvi?dlrf=M2lrYW85em4xNmcy']]],
   ['ciphermutex','CipherMutex','Product design, brand communication & creative work','projects/ciphermutex.html','02',[['Live website','https://www.ciphermutex.com/'],['Instagram','https://www.instagram.com/ciphermutex/']]],
   ['pebblezapp','Pebblezapp','Digital product experience & interface design','projects/pebblezapp.html','02',[['Live website','https://www.pebblezapp.com/collections/all-products/3186552000001364608'],['Instagram','https://www.instagram.com/pebblezapp/']]],
   ['nesswa','Nesswa','A visual identity and digital design collection','projects/nesswa.html','03',[['Live website','https://nesswaelitestore.com/'],['Instagram','https://www.instagram.com/perricofoods/']]],
   ['v-study-global','V Study Global','Study-abroad brand communication & digital content','projects/v-study-global.html','04',[['Instagram','https://www.instagram.com/v_studyglobal/']]],
   ['vyess-fms','Vyess FMS','Fleet management product and visual design','projects/vyess-fms.html','05'],
   ['marsforce','Marsforce','Selected visual communication','projects/marsforce.html','06',[['Live website','https://www.marsforce.in/']]],
   ['mukkani','Mukkani','Brand and visual design explorations','projects/mukkani.html','07',[['Instagram','https://www.instagram.com/mukkani_trichy?dlrf=eXJ0ZWhsbGswZm1o']]],
   ['varunan-drone','Varunan Drone','Aerial technology brand and visual work','projects/varunan-drone.html','08',[['Instagram','https://www.instagram.com/varunan_drone?xtok=eXB0ZDhkd2E4c2sy']]]
  ];
  const safe=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const usable=data.filter(x=>x.pages&&x.pages[0]&&!/payslip|salary|offer letter|employee|id card|intern form|agreement|contract|bank|aadhaar|pan card/i.test((x.name||'')+' '+(x.file||'')));
  if(grid) grid.classList.add('project-list');
  if(grid) grid.innerHTML=projectInfo.map(([key,name,desc,href,num,links=[]])=>`<div class="project-card project-list-item"><span class="project-list-number">${num}</span><span class="project-list-copy"><small>Selected project</small><a class="project-title-link" href="${href}"><strong>${safe(name)}</strong><em>${safe(desc)}</em></a><span class="project-external-links">${links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`).join('')}</span></span><span class="project-list-category">${safe(key.replace(/-/g,' ').toLowerCase())}</span><a class="project-list-arrow" href="${href}" aria-label="View ${safe(name)} project">↗</a></div>`).join('');
  const picks=usable.filter(x=>['UI/UX Design','Graphic Design','Brand Identity','Print & Stationery','Packaging Design'].includes(x.category)).slice(0,20);
  const makeCard=x=>`<a class="marquee-item" href="#work"><img loading="lazy" decoding="async" src="${safe(x.pages[0])}" alt="${safe(x.name||x.category||'Selected design')}"><span>${safe(x.category||'Selected work')}</span></a>`;
  const split=Math.ceil(picks.length/2);const a=picks.slice(0,split).map(makeCard).join('');const b=picks.slice(split).map(makeCard).join('');
  const one=$('#marquee-one'),two=$('#marquee-two');if(one)one.innerHTML=a+a;if(two)two.innerHTML=b+b;
 }catch(error){console.error(error);if(grid)grid.innerHTML='<p class="loading">The project archive could not be loaded. Please refresh in a moment.</p>';}

 // Scroll vertically to move the career timeline horizontally; normal page flow resumes afterwards.
 const experience=$('.experience'), horizontal=$('.experience-horizontal'), pin=$('.experience-pin'), track=$('.career-track');
 let travel=0, frame=0;
 const measureCareer=()=>{
   if(!experience||!horizontal||!pin||!track)return;
   travel=Math.max(0,track.scrollWidth-window.innerWidth+24);
   horizontal.style.height=(window.innerHeight+travel)+'px';
   updateCareer();
 };
 const updateCareer=()=>{
   if(!experience||!horizontal||!track)return;
   const rect=horizontal.getBoundingClientRect();
   const distance=Math.max(1,horizontal.offsetHeight-window.innerHeight);
   const progress=Math.min(1,Math.max(0,-rect.top/distance));
   track.style.transform='translate3d('+(-travel*progress)+'px,0,0)';
 };
 const onCareerScroll=()=>{if(!frame){frame=requestAnimationFrame(()=>{updateCareer();frame=0;});}};
 if(experience&&horizontal&&track){
   measureCareer();
   window.addEventListener('resize',measureCareer,{passive:true});
   window.addEventListener('scroll',onCareerScroll,{passive:true});
   if('ResizeObserver' in window){new ResizeObserver(measureCareer).observe(track);}
 }


 // Rotate one client review at a time; also allow manual navigation.
 const testimonialStage=$('.testimonial-stage');
 if(testimonialStage){
   const reviews=[...testimonialStage.querySelectorAll('.testimonial-card')];
   const counter=$('.testimonial-counter');
   const previous=$('.testimonial-prev');
   const next=$('.testimonial-next');
   let activeReview=Math.max(0,reviews.findIndex(review=>review.classList.contains('is-active')));
   let rotationTimer;
   const showReview=(index)=>{
     if(!reviews.length)return;
     reviews[activeReview]?.classList.remove('is-active');
     reviews[activeReview]?.setAttribute('aria-hidden','true');
     activeReview=(index+reviews.length)%reviews.length;
     reviews[activeReview].classList.add('is-active');
     reviews[activeReview].setAttribute('aria-hidden','false');
     if(counter)counter.textContent=String(activeReview+1).padStart(2,'0')+' / '+String(reviews.length).padStart(2,'0');
   };
   const restartRotation=()=>{
     window.clearInterval(rotationTimer);
     if(reviews.length>1)rotationTimer=window.setInterval(()=>{
       if(!document.hidden)showReview(activeReview+1);
     },15000);
   };
   previous?.addEventListener('click',()=>{showReview(activeReview-1);restartRotation();});
   next?.addEventListener('click',()=>{showReview(activeReview+1);restartRotation();});
   if(reviews.length>1)restartRotation();
 }

 
 // Site-wide scroll reveals: headings, copy, cards and controls enter as they reach view.
 const motionTargets=[
   '.hero-meta','.hero .eyebrow','.hero h1','.hero-bottom p','.hero-bottom .text-link','.hero-index',
   '.section-kicker','.intro-grid h2','.intro-copy > *','.skills-marquee-heading',
   '.experience-heading > *','.experience-scroll-note','.career-card',
   '.marquee-heading > *','.marquee-item','.work-heading > *','.project-list-item',
   '.testimonial-intro > *','.testimonial-stage .testimonial-card','.testimonial-footer',
   '.contact > .eyebrow','.contact-link','.contact-bottom > *',
   '.detail > *','.story .row > *','.project-gallery > *',
   '.collection .section-head > *','.collection .work-row','.section .work-row',
   'main > .section > *'
 ].join(',');
 const motionNodes=[...document.querySelectorAll(motionTargets)];
 const uniqueMotionNodes=[...new Set(motionNodes)].filter(node=>!node.closest('.site-loader'));
 uniqueMotionNodes.forEach((node,index)=>{
   node.setAttribute('data-motion-reveal','');
   const siblings=[...node.parentElement.children].filter(item=>item.matches('[data-motion-reveal]'));
   node.style.setProperty('--motion-delay',Math.min(siblings.length-1,5)*85+'ms');
 });
 if('IntersectionObserver' in window){
   const motionObserver=new IntersectionObserver(entries=>{
     entries.forEach(entry=>{
       if(entry.isIntersecting){
         entry.target.classList.add('motion-visible');
         motionObserver.unobserve(entry.target);
       }
     });
   },{threshold:.12,rootMargin:'0px 0px -36px 0px'});
   uniqueMotionNodes.forEach(node=>motionObserver.observe(node));
 }else{
   uniqueMotionNodes.forEach(node=>node.classList.add('motion-visible'));
 }


 // Original cinematic noir ambience — generated in-browser, starts only after user intent.
 const scoreButton=document.querySelector('.noir-audio-toggle');
 if(scoreButton){
   let scoreContext=null,scoreNodes=[],scoreTimer=null,scoreStep=0;
   const setAudioState=playing=>{
     scoreButton.setAttribute('aria-pressed',String(playing));
     scoreButton.querySelector('.audio-label').textContent=playing?'SOUND ON':'SOUND OFF';
     scoreButton.setAttribute('aria-label',playing?'Pause cinematic ambience':'Play cinematic ambience');
   };
   const makeScore=()=>{
     const AudioCtx=window.AudioContext||window.webkitAudioContext;
     if(!AudioCtx)return false;
     scoreContext=new AudioCtx();
     const master=scoreContext.createGain();master.gain.value=.0001;master.connect(scoreContext.destination);
     const compressor=scoreContext.createDynamicsCompressor();compressor.threshold.value=-22;compressor.knee.value=18;compressor.ratio.value=3;compressor.attack.value=.04;compressor.release.value=.4;master.connect(compressor);compressor.connect(scoreContext.destination);
     const lowpass=scoreContext.createBiquadFilter();lowpass.type='lowpass';lowpass.frequency.value=680;lowpass.Q.value=.7;lowpass.connect(master);
     const padGain=scoreContext.createGain();padGain.gain.value=.42;padGain.connect(lowpass);
     // Deep, slow minor-key harmonic bed; original notes, not a sampled film score.
     const chords=[[73.42,110,146.83],[58.27,87.31,116.54],[65.41,98,130.81],[55,82.41,110]];
     chords[0].forEach((freq,i)=>{
       const osc=scoreContext.createOscillator();osc.type=i===0?'sine':'triangle';osc.frequency.value=freq;
       const g=scoreContext.createGain();g.gain.value=i===0?.72:.32;osc.connect(g);g.connect(padGain);osc.start();scoreNodes.push(osc,g);
     });
     const bass=scoreContext.createOscillator();bass.type='sine';bass.frequency.value=36.71;
     const bassGain=scoreContext.createGain();bassGain.gain.value=.48;bass.connect(bassGain);bassGain.connect(master);bass.start();scoreNodes.push(bass,bassGain);
     const subLfo=scoreContext.createOscillator();subLfo.frequency.value=.16;
     const lfoGain=scoreContext.createGain();lfoGain.gain.value=4;subLfo.connect(lfoGain);lfoGain.connect(bass.frequency);subLfo.start();scoreNodes.push(subLfo,lfoGain);
     // A restrained high, glassy motif that cycles independently of any existing soundtrack.
     const motif=[293.66,349.23,440,392,293.66,261.63,349.23,329.63];
     const playNote=()=>{
       if(!scoreContext||scoreContext.state!=='running')return;
       const now=scoreContext.currentTime;
       const freq=motif[scoreStep%motif.length];scoreStep++;
       const osc=scoreContext.createOscillator();osc.type='sine';osc.frequency.setValueAtTime(freq,now);
       const env=scoreContext.createGain();env.gain.setValueAtTime(.0001,now);env.gain.exponentialRampToValueAtTime(.11,now+.16);env.gain.exponentialRampToValueAtTime(.0001,now+2.1);
       const tone=scoreContext.createBiquadFilter();tone.type='lowpass';tone.frequency.value=1150;
       osc.connect(tone);tone.connect(env);env.connect(master);osc.start(now);osc.stop(now+2.2);
     };
     scoreTimer=window.setInterval(playNote,1900);
     master.gain.setTargetAtTime(.82,scoreContext.currentTime,1.2);
     playNote();
     return true;
   };
   scoreButton.addEventListener('click',async()=>{
     try{
       if(!scoreContext){if(!makeScore())return;await scoreContext.resume();setAudioState(true);}
       else if(scoreContext.state==='running'){await scoreContext.suspend();setAudioState(false);}
       else{await scoreContext.resume();setAudioState(true);}
     }catch(error){setAudioState(false);}
   });
   window.addEventListener('pagehide',()=>{if(scoreTimer)window.clearInterval(scoreTimer);if(scoreContext)scoreContext.close();},{once:true});
 }

})();