document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Create floating bubbles
  const bubbleContainer = document.getElementById('bubble-container');
  const bubbleCount = 12;
  const bubbles = [];

  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    const size = Math.random() * 40 + 20; // 20-60px
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.top = Math.random() * 100 + '%';
    bubble.style.opacity = Math.random() * 0.3 + 0.1;
    bubbleContainer.appendChild(bubble);

    // Animate each bubble with random duration and delay
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 3;
    gsap.fromTo(bubble, 
      {
        y: 0,
        x: 0,
        rotation: 0,
      },
      {
        y: Math.random() * 200 - 100,
        x: Math.random() * 150 - 75,
        rotation: 360,
        duration: duration,
        delay: delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      }
    );
    bubbles.push(bubble);
  }

  const intro = gsap.timeline();
  intro.from("h1", {duration: 0.9, y: -30, opacity: 0, ease: "power3.out"});
  intro.from(".meta", {duration: 0.6, y: -8, opacity: 0}, "-=0.45");

  gsap.from("section h2", {
    duration: 0.8,
    x: -24,
    opacity: 0,
    stagger: 0.06,
    ease: "power2.out"
  });

  gsap.utils.toArray('section').forEach((sec) => {
    gsap.from(sec, {
      scrollTrigger: {
        trigger: sec,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // subtle hover lift for sections
  document.querySelectorAll('section').forEach((sec) => {
    sec.style.willChange = 'transform, box-shadow';
    sec.addEventListener('mouseenter', () => gsap.to(sec, {scale: 1.01, boxShadow: '0 10px 30px rgba(0,0,0,0.12)', duration: 0.28}));
    sec.addEventListener('mouseleave', () => gsap.to(sec, {scale: 1, boxShadow: '0 2px 6px rgba(0,0,0,0.08)', duration: 0.28}));
  });

  // soft pulsing underline on the h1 border
  gsap.to('h1', {borderBottomColor: '#ff6b6b', duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2});
});
