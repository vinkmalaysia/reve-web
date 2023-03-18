'use client';

import { useEffect, useRef } from 'react';

// Change panorama after waiting for at least
const slideDurationMin = 5000;

// Add extra waiting time to randomize duration
const slideDurationExtra = 5000;

// Duration for auto-rotate to resume after user interactivity ended (in ms)
const autoRotateResumeDelay = 5000;

// Panorama images
const images = [
  'img/interior/01.jpg',
  'img/interior/02.jpg',
  'img/interior/03.jpg',
];

/**
 * Calculate a random integer between `min` and `max`, inclusive
 * @param min {number}
 * @param max {number}
 * @returns {number}
 */
function randomInRange (min, max) {
  // Round to integer
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function PanoramaSlideshow (props) {
  const panoramas = useRef({});

  // Preload images

  const slideTimer = useRef();
  const containerRef = useRef();
  const viewerRef = useRef();

  /**
   * Change panorama randomly
   * @param delay 0: immediately, >0: change after wait for, unspecified: randomly
   */
  function updateRandomPanorama (delay) {
    // Do nothing if no other panorama in list
    const panoramasArr = Object.values(panoramas.current);

    if (panoramasArr.length > 1) {
      let nextTimeout;
      let nextPanorama;

      do {
        // Randomize next image and make sure is different
        const randomIndex = randomInRange(0, panoramasArr.length - 1);
        nextPanorama = panoramasArr[randomIndex];
      } while (nextPanorama === viewerRef?.current?.panorama);

      // Immediate
      // Change panorama immediately
      if (delay === 0) viewerRef.current.setPanorama(nextPanorama);

      // Timer
      if (delay > 0) {
        // Use specified delay
        nextTimeout = delay;
      } else {
        // Generate random delay
        nextTimeout = randomInRange(slideDurationMin, slideDurationMin + slideDurationExtra);
      }

      // Schedule
      if (slideTimer.current) clearTimeout(slideTimer.current);
      slideTimer.current = setTimeout(() => updateRandomPanorama(0), nextTimeout);
    }
  }

  // Mount
  useEffect(() => {
    import('panolens').then(Panolens => {
      viewerRef.current = new Panolens.Viewer({
        controlButtons: ['fullscreen'],
        autoRotate: true,
        autoRotateSpeed: 0.4,
        autoRotateActivationDuration: autoRotateResumeDelay,
        container: containerRef.current,
      });

      // Set FOV
      viewerRef.current.setCameraFov(55);

      // Load images
      images.forEach(src => {
        let p;

        // Cache loaded panorama instances
        if (!panoramas.current[src]) {
          p = new Panolens.ImagePanorama(src);
          panoramas.current[src] = p;
        }
        viewerRef?.current?.add(p || panoramas.current[src]);
      });

      // Start autoplay
      updateRandomPanorama(0);
    });

    /**
     * Resume autoplay after user interaction
     */
    const resumeAutoplay = () => {
      // After auto-rotate resumed
      // Wait for 3 seconds before transition into next panorama
      updateRandomPanorama(autoRotateResumeDelay + 3000);
    };

    containerRef.current.addEventListener('pointerup', resumeAutoplay);

    // Cleanup
    return () => {
      // Unmount
      containerRef.current.removeEventListener('pointerup', resumeAutoplay);
      viewerRef.current.destroy();
    };
  }, []);

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
}
