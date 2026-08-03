import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function useTheatrePerformance() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let splits = [];
    const ctx = gsap.context(() => {
      splits = gsap.utils.toArray('[data-split]').filter(element => !element.closest('#hero')).map(element => new SplitType(element, { types: 'chars' }));
      splits.forEach(split => {
        gsap.set(split.chars, { yPercent: 108, opacity: 0, willChange: 'transform' });
        gsap.to(split.chars, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.025, ease: 'power4.out', scrollTrigger: { trigger: split.elements[0], start: 'top 82%', once: true } });
      });
      gsap.utils.toArray('[data-act-color]').forEach(section => {
        const color = section.dataset.actColor;
        ScrollTrigger.create({ trigger: section, start: 'top 58%', end: 'bottom 42%', onEnter: () => document.documentElement.style.setProperty('--act-light', color), onEnterBack: () => document.documentElement.style.setProperty('--act-light', color) });
        const ensemble = section.querySelectorAll('.ticket-card, .rep-item, .opera-box-card, .mosaic-card, .parchment-scroll-box, .about-title, .p-body, .finale-sub, .email-direct-container, .theatrical-form');
        if (ensemble.length) gsap.fromTo(ensemble, { clipPath: 'inset(0 0 100% 0)', y: 24 }, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 72%', once: true } });
      });
    });
    return () => { splits?.forEach(split => split.revert()); ctx.revert(); };
  }, [pathname]);
}
