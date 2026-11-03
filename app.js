(async()=>{
 const $=s=>document.querySelector(s); const grid=$('#project-grid');
 const menu=$('.menu-toggle'), nav=$('.main-nav');
 menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
 try{
  const response=await fetch('gallery-data.json'); if(!response.ok) throw new Error('Could not load gallery data');
  const data=await response.json();
  const projectInfo=[
   ['ciphermutex','CipherMutex','Product design, brand communication & creative work','projects/ciphermutex.html','01'],
   ['pebblezapp','PebbleZapp','Digital product experience & interface design','projects/pebblezapp.html','02'],
   ['nesswa','Nesswa','A visual identity and digital design collection','projects/nesswa.html','03'],
   ['v-study-global','V Study Global','Study-abroad brand communication & digital content','projects/v-study-global.html','04'],
   ['vyess-fms','Vyess FMS','Fleet management product and visual design','projects/vyess-fms.html','05'],
   ['marsforce','Marsforce','Selected visual communication','projects/marsforce.html','06'],
   ['mukkani','Mukkani','Brand and visual design explorations','projects/mukkani.html','07'],
   ['varunan-drone','VARUNAN DRONE','Aerial technology brand and visual work','projects/varunan-drone.html','08']
  ];
  const safe=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const usable=data.filter(x=>x.pages&&x.pages[0]&&!/payslip|salary|offer letter|employee|id card|intern form|agreement|contract|bank|aadhaar|pan card/i.test((x.name||'')+' '+(x.file||'')));
  if(grid) grid.classList.add('project-list');
  if(grid) grid.innerHTML=projectInfo.map(([key,name,desc,href,num])=>`<a class="project-card project-list-item" href="${href}"><span class="project-list-number">${num}</span><span class="project-list-copy"><small>SELECTED PROJECT</small><strong>${safe(name)}</strong><em>${safe(desc)}</em></span><span class="project-list-category">${safe(key.replace(/-/g,' ').toUpperCase())}</span><span class="project-list-arrow">↗</span></a>`).join('');
  const picks=usable.filter(x=>['UI/UX Design','Graphic Design','Brand Identity','Print & Stationery','Packaging Design'].includes(x.category)).slice(0,20);
  const makeCard=x=>`<a class="marquee-item" href="archive.html"><img loading="lazy" src="${safe(x.pages[0])}" alt="${safe(x.name||x.category||'Selected design')}"><span>${safe(x.category||'Selected work')}</span></a>`;
  const split=Math.ceil(picks.length/2);const a=picks.slice(0,split).map(makeCard).join('');const b=picks.slice(split).map(makeCard).join('');
  const one=$('#marquee-one'),two=$('#marquee-two');if(one)one.innerHTML=a+a;if(two)two.innerHTML=b+b;
 }catch(error){console.error(error);if(grid)grid.innerHTML='<p class="loading">The project archive could not be loaded. Please refresh in a moment.</p>';}
})();
