import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

export default function useLoader() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
      tl.to('#loader-content', { opacity: 0, scale: 0.9, duration: 0.6, delay: 0.6 })
        .call(() => {
          document.body.classList.add('curtain-open');
        })
        .to('#main-nav', { opacity: 1, duration: 0.8 }, '+=0.2')
        .to('.hero-masks-badge', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .to('.hero-pre', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .to('.hero-title', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
        .to('.hero-images-showcase', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .to('.hero-cta-btn', { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
        .set('#stage-loader', { display: 'none' });
    });
    return () => ctx.revert();
  }, []);
}

