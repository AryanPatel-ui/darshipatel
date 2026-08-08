import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Icon from '../Shared/Icon';

const images = [
  ['side', '/lollapalooza-india.jpg', 'Lollapalooza India Entrance', 'left'],
  ['center', '/darshi-portrait.jpg', 'Darshi Patel Graduation Portrait', 'center'],
  ['side', '/darshi-hero-3.jpg', 'Darshi Patel Cafe Portrait', 'right']
];

export default function Hero() {
  const showcaseRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const frames = showcaseRef.current?.querySelectorAll('.hero-img-frame');
    if (!frames || frames.length === 0) return undefined;

    let dropTween = null;

    const dropPuppets = () => {
      // Set initial state high above the top of the viewport
      gsap.set(frames, {
        y: '-130vh',
        opacity: 0,
        rotation: (i) => [-8, 5, 8][i]
      });

      // Elastic puppet fall animation with string tension bounce
      dropTween = gsap.to(frames, {
        y: (i) => (i === 1 ? -15 : 0),
        opacity: 1,
        rotation: (i) => [-1.8, 0, 1.8][i],
        duration: 1.5,
        stagger: {
          each: 0.18,
          from: 'center'
        },
        ease: 'elastic.out(1.05, 0.48)',
        delay: 0.15,
        onComplete: () => {
          frames.forEach(frame => frame.classList.add('puppet-swaying'));
        }
      });
    };

    if (document.body.classList.contains('curtain-open')) {
      dropPuppets();
      return () => dropTween?.kill();
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (document.body.classList.contains('curtain-open')) {
            dropPuppets();
            observer.disconnect();
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
      dropTween?.kill();
    };
  }, []);

  return (
    <section className="hero-stage" id="hero">
      <div className="hero-arch-decor" />
      <div className="hero-content">
        <div className="hero-masks-badge">
          <Icon name="masks" />
        </div>
        <span className="hero-pre">Act I — The Opening Act</span>
        <h1 className="hero-title" data-split>
          Darshi <span className="gold-text">Patel</span>
        </h1>
        <p className="hero-tagline">
          Part pragmatic problem-solver, part creative director, I live and breathe event planning and experiential marketing. I aspire to turn big ideas into immersive brand experiences, live event moments, and scroll-stopping content that truly connects with people. From a napkin sketch to live applause, I want to make sure every moment hits the right note.
        </p>
      </div>

      <div className="hero-images-showcase" ref={showcaseRef}>
        <div className="puppet-rigging-bar" aria-hidden="true" />
        {images.map(([size, src, alt, pos]) => (
          <div className={`hero-img-frame ${size} puppet-frame puppet-${pos}`} key={alt}>
            <div className="puppet-string-assembly" aria-hidden="true">
              <div className="puppet-ring ring-left" />
              <div className="puppet-ring ring-right" />
              <div className="puppet-string string-left" />
              <div className="puppet-string string-right" />
            </div>
            <a
              href="https://www.instagram.com/_darshi_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-img-link"
              title="Visit Darshi on Instagram"
            >
              <img src={src} alt={alt} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}


