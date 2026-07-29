import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import Icon from '../Shared/Icon';
import NextChapter from '../Shared/NextChapter';
import useCurtainNavigation from '../../hooks/useCurtainNavigation.jsx';
const images = [
  ['side', '/lollapalooza-india.jpg', 'Lollapalooza India Entrance'],
  ['center', '/darshi-portrait.jpg', 'Darshi Patel Graduation Portrait'],
  ['side', '/darshi-hero-3.jpg', 'Darshi Patel Cafe Portrait']
];
export default function Hero() {
  const { goTo } = useCurtainNavigation();
  useLayoutEffect(() => {
    if (!document.body.classList.contains('curtain-open')) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.inOut' } })
        .to('.hero-masks-badge', { opacity: 1, y: 0, duration: .55 })
        .to('.hero-pre', { opacity: 1, y: 0, duration: .55 }, '-=.35')
        .to('.hero-title', { opacity: 1, y: 0, duration: .75 }, '-=.35')
        .to('.hero-tagline', { opacity: 1, y: 0, duration: .55 }, '-=.45')
        .to('.hero-images-showcase', { opacity: 1, y: 0, duration: .65 }, '-=.4')
        .to('.hero-cta-btn', { opacity: 1, y: 0, duration: .55 }, '-=.45');
    });
    return () => ctx.revert();
  }, []);
  return <section className="hero-stage" id="hero"><div className="hero-arch-decor" /><div className="spotlight-container">{['far-left','inner-left','center','inner-right','far-right'].map(c => <div className={`spotlight-beam ${c}`} key={c} />)}</div><div className="stage-floor-glow" /><div className="hero-content"><div className="hero-masks-badge"><Icon name="masks" /></div><span className="hero-pre">Act I — The Opening Act</span><h1 className="hero-title">Darshi <span className="gold-text">Patel</span></h1><p className="hero-tagline">Part pragmatic problem-solver, part creative director, I live and breathe event planning and experiential marketing. I aspire to build immersive brand narratives, live event dynamics, and scroll-stopping content that grab attention and hold onto it. With a knack for event planning and experiential marketing, I aspire to transform big ideas into seamless, crowd-connecting activations. From napkin sketch to live applause, I want to makes sure every moment hits the right note.</p></div><div className="hero-images-showcase">{images.map(([size, src, alt]) => <div className={`hero-img-frame ${size}`} key={alt}><a href="https://www.instagram.com/_darshi_/" target="_blank" rel="noopener noreferrer" className="hero-img-link" title="Visit Darshi on Instagram"><img src={src} alt={alt} /></a></div>)}</div></section>;
}
