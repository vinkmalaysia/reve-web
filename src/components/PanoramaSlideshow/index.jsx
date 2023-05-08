'use client';

import { useCallback, useRef } from 'react';
import * as Panolens from 'panolens';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;

  canvas {
    filter: blur(0px);
  }
`;

// Change panorama after waiting for at least
const slideDurationMin = 5000;

// Add extra waiting time to randomize duration
const slideDurationExtra = 5000;

// Duration for auto-rotate to resume after user interactivity ended (in ms)
const autoRotateResumeDelay = 5000;

// Panorama images
const panoramas = [
  'img/interior/3213672934175.webp',
  'img/interior/5719383895173.webp',
  'img/interior/8569244855844.webp',
].map(url => new Panolens.ImagePanorama(url));

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
  const slideTimer = useRef();
  const viewerRef = useRef();

  /**
   * Change panorama randomly
   * @param delay 0: immediately, >0: change after wait for, unspecified: randomly
   */
  function updateRandomPanorama (delay) {
    // Do nothing if no other panorama in list
    const panoramasArr = viewerRef.current.getScene().children;

    if (panoramasArr.length > 1) {
      let nextTimeout;
      let nextPanorama;

      do {
        // Randomize next image and make sure is different
        const randomIndex = randomInRange(0, panoramasArr.length - 1);
        nextPanorama = panoramasArr[randomIndex];
      } while (nextPanorama === viewerRef.current?.panorama);

      // Immediate
      // Change panorama immediately
      if (delay === 0) viewerRef.current?.setPanorama?.(nextPanorama);

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

  /**
   * Resume autoplay after user interaction
   */
  const resumeAutoplay = () => {
    // After auto-rotate resumed
    // Wait for 3 seconds before transition into next panorama
    updateRandomPanorama(autoRotateResumeDelay + 3000);
  };

  // Mount
  const setContainerRef = useCallback(node => {
    if (node) {
      viewerRef.current = new Panolens.Viewer({
        controlButtons: ['fullscreen'],
        autoRotate: true,
        autoRotateSpeed: 0.4,
        autoRotateActivationDuration: autoRotateResumeDelay,
        cameraFov: 80,
        container: node,
      });

      panoramas.forEach(pano => {
        viewerRef.current?.add(pano);
      });

      node.addEventListener('pointerup', resumeAutoplay);

      updateRandomPanorama(0);
    } else {
      // Unmounted, cleanup
      panoramas.forEach(pano => {
        viewerRef.current?.remove?.(pano);
      });

      viewerRef.current?.getRenderer?.().dispose?.();
      viewerRef.current?.dispose?.();

      // Remove leftover dom nodes created by panolens
      const container = viewerRef.current?.container;

      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }

        container.removeEventListener('pointerup', resumeAutoplay);
      }

      viewerRef.current = null;
    }
  }, []);

  return <Container ref={setContainerRef} />;
}
