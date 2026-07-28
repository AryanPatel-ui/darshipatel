import { useLayoutEffect } from 'react'; import { gsap } from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export default function useGSAPAnimations() { useLayoutEffect(() => { const ctx = gsap.context(() => { gsap.utils.toArray('.act-container').forEach(section => gsap.from(section, { opacity: 0, y: 40, duration: 1.2, scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' } })); }); return () => ctx.revert(); }, []); }
