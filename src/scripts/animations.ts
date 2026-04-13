import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initParallax(selector: string, speed = 0.3): void {
  if (prefersReducedMotion()) return;

  const elements = document.querySelectorAll<HTMLElement>(selector);
  elements.forEach((el) => {
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

export function initScrollReveal(
  selector: string,
  options: { distance?: number; duration?: number; delay?: number } = {},
): void {
  if (prefersReducedMotion()) return;

  const { distance = 16, duration = 0.4, delay = 0 } = options;

  const elements = document.querySelectorAll<HTMLElement>(selector);
  elements.forEach((el) => {
    gsap.set(el, { y: distance, opacity: 0 });
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

export function initStaggerReveal(
  parentSelector: string,
  childSelector: string,
  options: { distance?: number; duration?: number; stagger?: number } = {},
): void {
  if (prefersReducedMotion()) return;

  const { distance = 16, duration = 0.4, stagger = 0.1 } = options;

  const parents = document.querySelectorAll<HTMLElement>(parentSelector);
  parents.forEach((parent) => {
    const children = parent.querySelectorAll<HTMLElement>(childSelector);
    gsap.set(children, { y: distance, opacity: 0 });
    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}