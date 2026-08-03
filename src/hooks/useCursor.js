import { useEffect } from 'react';
export default function useCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return undefined;
    const spot = document.getElementById('cursor-spotlight'), dot = document.getElementById('cursor-dot');
    if (!spot || !dot) return undefined;
    let mx = innerWidth / 2, my = innerHeight / 2, sx = mx, sy = my, frame;
    const move = e => { mx = e.clientX; my = e.clientY; dot.style.left = `${mx}px`; dot.style.top = `${my}px`; };
    const animate = () => { sx += (mx - sx) * .12; sy += (my - sy) * .12; spot.style.left = `${sx}px`; spot.style.top = `${sy}px`; frame = requestAnimationFrame(animate); };
    const interactive = 'a, button, .opera-box-card, .ticket-card, .mosaic-card, .hero-img-frame';
    const over = event => { if (event.target.closest(interactive)) document.body.classList.add('hover-interactive'); };
    const out = event => { if (event.target.closest(interactive)) document.body.classList.remove('hover-interactive'); };
    addEventListener('mousemove', move); document.addEventListener('mouseover', over); document.addEventListener('mouseout', out); animate();
    return () => { removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out); cancelAnimationFrame(frame); };
  }, []);
}
