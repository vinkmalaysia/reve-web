import React, { useRef, useEffect } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import 'three';
import TopNav from 'src/components/TopNav';

const PageStyle = createGlobalStyle`
  html, body {
    margin: 0;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    background-color: black;
  }
`;

const PanoContainer = styled.div`
  width: 100%;
  min-height: 100%;
  height: stretch;
  height: 100vh;
  opacity: 0.8;
`;

function randomIntInRange (min, max) {
  // Round to integer
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let nextSlideTimer;

export default function HomePage () {
  const panoContainer = useRef(null);

  useEffect(() => {
    import('panolens').then(PANOLENS => {
      const imgList = [
        'img/interior/01.jpg',
        'img/interior/02.jpg',
        'img/interior/03.jpg',
      ];

      // Rotate image after waiting for at least n seconds
      const slideMinDuration = 5000;
      // Randomize wait duration by n sec of possible extra waiting time
      const randomizeSlideDuration = 5000;
      // Time for auto rotation to resume after user interactivity ended (in ms)
      const autoRotateActivationDuration = 5000;

      const viewer = new PANOLENS.Viewer({
        controlButtons: ['fullscreen'],
        autoRotate: true,
        autoRotateSpeed: 0.4,
        autoRotateActivationDuration,
        container: panoContainer.current,
      });

      // Preload images
      const panoList = imgList.map(src => new PANOLENS.ImagePanorama(src));
      panoList.forEach(pano => pano.load());

      // Register panorama with view
      panoList.forEach(pano => viewer.add(pano));

      /**
       * Change panorama randomly
       * @param delay 0: immediately, >0: change after wait for, unspecified: randomly
       */
      function updateRandomPanorama (delay) {
        // Do nothing if no other panorama in list
        if (panoList.length > 1) {
          let nextPanorama;

          do {
            // Randomize next image and make sure is different
            const randomIndex = randomIntInRange(0, panoList.length - 1);
            nextPanorama = panoList[randomIndex];
          } while (nextPanorama === viewer.panorama);

          // No delay
          // Change panorama immediately
          if (delay === 0) {
            viewer.setPanorama(nextPanorama);
          }

          // Schedule next update
          if (nextSlideTimer) {
            clearTimeout(nextSlideTimer);
          }

          if (!delay || delay === 0) {
            // Randomize next slide delay
            const randomDelay = randomIntInRange(slideMinDuration, slideMinDuration + randomizeSlideDuration);
            nextSlideTimer = setTimeout(() => updateRandomPanorama(0), randomDelay);
          } else {
            // Use delay specified by user
            nextSlideTimer = setTimeout(() => updateRandomPanorama(0), delay);
          }
        }
      }

      function resumeAutoPlay () {
        // After auto rotate resumed
        // Wait for 3 seconds and change to next image immediately
        updateRandomPanorama(autoRotateActivationDuration + 3000);
      }

      // Resume auto play
      window.addEventListener('mouseup', resumeAutoPlay);
      window.addEventListener('touchend', resumeAutoPlay);

      // Start auto plau
      updateRandomPanorama(0);
    });
  });

  return (
    <div>
      <Head>
        <title>App</title>
      </Head>
      <PageStyle />
      <PanoContainer ref={panoContainer} />
      <TopNav />
    </div>
  );
}
