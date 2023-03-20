import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import TopNav from 'src/components/TopNav';
import Jumbotron from 'src/components/Jumbotron';
import PanoramaSlideshow from 'src/components/PanoramaSlideshow';
import bp from 'src/utils/breakpoints';

const PageStyle = createGlobalStyle`
  html, body {
    margin: 0;
    width: 100vw;
    overflow: hidden;
  }

  html {
    height: 100%;

  }

  body {
    min-height: 100%;
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

const SlideshowContainer = styled.div`
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

export default function HomePage () {
  return (
    <>
      <Head>
        <title>REVE - Interior Design</title>
      </Head>
      <PageStyle />
      <div className="wrapper">
        <SlideshowContainer>
          <CanvasShadow />
          <PanoramaSlideshow />
        </SlideshowContainer>
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
