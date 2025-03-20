'use client';

import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(
      '.scroll-fade-in, .scroll-fade-in-left, .scroll-fade-in-right, .scroll-scale-in',
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('scroll-fade-in')) {
              entry.target.classList.add('fade-in-up', 'visible');
            } else if (entry.target.classList.contains('scroll-fade-in-left')) {
              entry.target.classList.add('fade-in-left', 'visible');
            } else if (
              entry.target.classList.contains('scroll-fade-in-right')
            ) {
              entry.target.classList.add('fade-in-right', 'visible');
            } else if (entry.target.classList.contains('scroll-scale-in')) {
              entry.target.classList.add('scale-in', 'visible');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    fadeElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);
}

export function ScrollAnimationInitializer() {
  useScrollAnimation();
  return null;
}
