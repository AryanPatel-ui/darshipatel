import { useEffect } from 'react';
export default function useCursor() {
  useEffect(() => {
    const spot = document.getElementById('cursor-spotlight'), dot = document.getElementById('cursor-dot');
    if (!spot || !dot) return undefined;
    let mx = innerWidth / 2, my = innerHeight / 2, sx = mx, sy = my, frame;
    const move = e => { mx = e.clientX; my = e.clientY; dot.style.left = `${mx}px`; dot.style.top = `${my}px`; };
    const animate = () => { sx += (mx - sx) * .12; sy += (my - sy) * .12; spot.style.left = `${sx}px`; spot.style.top = `${sy}px`; frame = requestAnimationFrame(animate); };
    const enter = () => document.body.classList.add('hover-interactive');
    const leave = () => document.body.classList.remove('hover-interactive');
    const targets = document.querySelectorAll('a, button, .opera-box-card, .ticket-card, .mosaic-card, .hero-img-frame');
    addEventListener('mousemove', move); targets.forEach(t => { t.addEventListener('mouseenter', enter); t.addEventListener('mouseleave', leave); }); animate();
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(frame); targets.forEach(t => { t.removeEventListener('mouseenter', enter); t.removeEventListener('mouseleave', leave); }); };
  }, []);
}
