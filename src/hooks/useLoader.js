import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

export default function useLoader() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('curtain-open');
      const loader = document.getElementById('stage-loader');
      if (loader) loader.style.display = 'none';
      return undefined;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      tl.to('#loader-content', { opacity: 0, scale: 0.9, duration: 0.5, delay: 0.4 })
        .call(() => {
          document.body.classList.add('curtain-open');
        })
        .to('#main-nav', { opacity: 1, duration: 0.6 }, '+=0.1')
        .to('.hero-masks-badge, .hero-pre, .hero-title, .hero-tagline, .hero-images-showcase, .hero-cta-btn', {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08
        }, '-=0.3')
        .set('#stage-loader', { display: 'none' });
    });

    return () => {
      document.body.classList.add('curtain-open');
      const loader = document.getElementById('stage-loader');
      if (loader) loader.style.display = 'none';
      ctx.revert();
    };
  }, []);
}
