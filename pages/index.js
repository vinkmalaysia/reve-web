import { useRef, useEffect } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import 'three';
import TopNav from 'src/components/TopNav';
import Jumbotron from 'src/components/Jumbotron';
import bp from 'src/utils/breakpoints';

const PageStyle = createGlobalStyle`
  html, body {
    margin: 0;
    width: 100vw;
    height: 100%;
    overflow: hidden;
  }

  #__next {
    min-height: 100%;
  }
`;

const MainContainer = styled.main`
  position: relative;
  top: 0;
  max-width: 600px;
  margin: 0 auto;
  pointer-events: none;

  @media screen and (min-width: ${bp.md}) {
    max-width: 800px;
  }

  @media screen and (min-width: ${bp.lg}) {
    max-width: 1200px;
  }

  @media screen and (min-width: ${bp.xl}) {
    max-width: 1440px;
  }
`;

const PanoContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  pointer-events: auto;
`;

const CanvasShadow = styled.div`
  position: absolute;
  top: 0;
  background: linear-gradient(hsla(0, 0%, 0%, 0.75) 0%, hsla(0, 0%, 0%, 0.65) 30%, hsl(0 0% 0% / 40%) 70%, hsl(0 0% 33% / 25%) 100%);
  width: 100%;
  height: 100%;
  pointer-events: none;
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
    <>
      <Head>
        <title>REVE - Interior Design</title>
      </Head>
      <PageStyle />
      <div className="wrapper">
        <PanoContainer ref={panoContainer}>
          <CanvasShadow />
        </PanoContainer>
        <MainContainer>
          <TopNav />
          <Jumbotron />
        </MainContainer>
        <style jsx>{`
          .wrapper {
            min-height: 100%;
            position: relative;
          }
        `}</style>
      </div>
    </>
  );
}
