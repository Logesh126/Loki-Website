import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const canvas = document.querySelector('#hero-3d-canvas');
const stage = canvas?.closest('.hero-3d-stage');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

if (canvas && stage) {
  let renderer, scene, camera, sculpture, wire, particles, frameId = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const clock = new THREE.Clock();

  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
    renderer.setSize(stage.clientWidth, stage.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(34, stage.clientWidth / stage.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    scene.add(new THREE.AmbientLight(0xaaa0cc, 1.1));
    const key = new THREE.PointLight(0xc8b5ff, 95, 18); key.position.set(3.5, 3.2, 4); scene.add(key);
    const rim = new THREE.PointLight(0x7554c8, 115, 16); rim.position.set(-4, -2, 2); scene.add(rim);
    const soft = new THREE.PointLight(0xf2eaff, 28, 12); soft.position.set(0, 4, -3); scene.add(soft);

    const group = new THREE.Group(); scene.add(group); sculpture = group;
    const geometry = new THREE.TorusKnotGeometry(1.48, 0.43, 240, 32, 2, 5);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x9580cb, metalness: 0.82, roughness: 0.23, clearcoat: 1,
      clearcoatRoughness: 0.16, iridescence: 0.65, iridescenceIOR: 1.32,
      emissive: 0x25183f, emissiveIntensity: 0.36
    });
    const mesh = new THREE.Mesh(geometry, material); group.add(mesh);
    const wireGeometry = new THREE.TorusKnotGeometry(1.51, 0.435, 110, 12, 2, 5);
    const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xd8caff, wireframe: true, transparent: true, opacity: 0.105 });
    wire = new THREE.Mesh(wireGeometry, wireMaterial); group.add(wire);

    const dustGeometry = new THREE.BufferGeometry();
    const count = 650;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 2.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const dustMaterial = new THREE.PointsMaterial({ color: 0xbdaaff, size: 0.018, transparent: true, opacity: 0.72, sizeAttenuation: true });
    particles = new THREE.Points(dustGeometry, dustMaterial); scene.add(particles);

    const resize = () => {
      if (!renderer || !camera) return;
      const width = Math.max(1, stage.clientWidth), height = Math.max(1, stage.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 9.2 : 8.4;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize); observer.observe(stage);

    const onPointer = event => {
      const rect = stage.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 0.65;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 0.5;
    };
    if (finePointer && !reduceMotion) stage.addEventListener('pointermove', onPointer, { passive: true });
    stage.addEventListener('pointerleave', () => { pointer.tx = 0; pointer.ty = 0; }, { passive: true });

    const render = () => {
      frameId = 0;
      if (document.hidden || !renderer) return;
      const t = clock.getElapsedTime();
      pointer.x += (pointer.tx - pointer.x) * 0.035;
      pointer.y += (pointer.ty - pointer.y) * 0.035;
      if (!reduceMotion) {
        sculpture.rotation.y = t * 0.13 + pointer.x;
        sculpture.rotation.x = Math.sin(t * 0.18) * 0.16 + pointer.y;
        wire.rotation.copy(sculpture.rotation);
        particles.rotation.y = -t * 0.025;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    const start = () => { if (!frameId && !document.hidden) render(); };
    const stop = () => { if (frameId) cancelAnimationFrame(frameId); frameId = 0; };
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
    const inView = new IntersectionObserver(entries => entries[0].isIntersecting ? start() : stop(), { threshold: 0.02 });
    inView.observe(stage);
    start();
  } catch (error) {
    console.warn('3D hero unavailable; keeping the dark visual fallback.', error);
    canvas.hidden = true;
  }
}

// GSAP: restrained, editorial movement. Native scrolling remains untouched.
if (window.gsap) {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.12 });
  intro.from('.hero-meta', { y: 14, duration: 0.7, autoAlpha: 0 })
    .from('.hero-copy .eyebrow', { y: 18, duration: 0.65, autoAlpha: 0 }, '-=0.35')
    .from('.hero-copy h1', { y: 42, rotateX: -7, transformOrigin: '50% 100%', duration: 1.05, autoAlpha: 0 }, '-=0.36')
    .from('.hero-description', { y: 22, duration: 0.72, autoAlpha: 0 }, '-=0.55')
    .from('.hero-actions > *', { y: 14, stagger: 0.1, duration: 0.55, autoAlpha: 0 }, '-=0.45')
    .from('.hero-3d-caption,.hero-3d-coordinate', { y: 10, duration: 0.6, autoAlpha: 0 }, '-=0.55');

  if (ScrollTrigger && !reduceMotion) {
    gsap.utils.toArray('.section-kicker,.intro-grid h2,.experience-heading h2,.work-heading h2,.testimonial-intro h2,.contact-link').forEach((element) => {
      gsap.from(element, {
        y: 34, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true }
      });
    });
    gsap.utils.toArray('.career-card,.project-list-item,.testimonial-card').forEach((element, index) => {
      gsap.from(element, {
        y: 24, duration: 0.7, delay: (index % 3) * 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 92%', once: true }
      });
    });
    gsap.to('.hero-3d-orbit.orbit-one', { rotation: 12, ease: 'none', scrollTrigger: { trigger: '.hero-redesign', start: 'top top', end: 'bottom top', scrub: 1 } });
  }
}
