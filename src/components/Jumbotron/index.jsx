import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import css from 'styled-jsx/css';
import { useFloating, FloatingPortal, FloatingOverlay, useClick, useDismiss, useInteractions, useTransitionStatus } from '@floating-ui/react';
import SplitType from 'split-type';
import { animate, stagger } from 'framer-motion';
import bp from 'src/utils/breakpoints';

const JumbotronContainer = styled.section`
  margin-top: 32px;
  padding-left: 24px;
  padding-right: 24px;
  pointer-events: none;

  @media screen and (min-width: ${bp.xs}) {
    margin-top: 48px;
    padding-left: 48px;
    padding-right: 48px;
  }

  @media screen and (min-width: ${bp.sm}) {
    margin-top: 72px;
    padding-left: 64px;
    padding-right: 64px;
  }
`;

const Logo = styled.h1`
  display: block;
  color: #fff;
  text-shadow: 0 0 175px rgb(0 0 0 / 25%);
  font-size: 4.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -1px;
  pointer-events: auto;
  font-kerning: none;
  overflow: hidden;

  @media screen and (min-width: ${bp.sm}) {
    font-size: 6rem;
  }

  @media screen and (min-width: ${bp.md}) {
    font-size: 8rem;
  }
`;

const CategoryText = styled.div`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  padding: 6px 24px;
  background-image: linear-gradient(120deg, #1f253f 0%, #1e1f26 100%);
  width: max-content;
  border-top-left-radius: 16px;
  border-bottom-right-radius: 16px;
  pointer-events: auto;
  line-height: 1.25rem;
`;

const Slogan = styled.p`
  display: block;
  width: fit-content;
  color: #fff5fc;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  pointer-events: auto;
  text-shadow: #551965 0 0 16px;
  mix-blend-mode: difference;

  @media screen and (min-width: ${bp.sm}) {
    font-size: 1.875rem;
    letter-spacing: 2px;
  }
`;

const ActionsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 60px 0;

  @media screen and (min-width: ${bp.sm}) {
    flex-direction: row;
    gap: 6px;
  }
`;

const ContactButton = styled.button`
  border: 0;
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.8);
  background: linear-gradient(335deg, #ff55a6, #5b3dff);
  padding: 16px 24px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.25s;

  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: inset 0 1px 2px rgba(244, 232, 255, 0.9), inset 0 0px 10px rgba(255, 255, 255, 0.4), 0 0 30px rgba(183, 76, 255, 0.75);
  }
`;

const PortfolioButton = styled.button`
  border: solid 2px rgba(255, 255, 255, 0.6);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  padding: 16px 24px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.25s;
  backdrop-filter: brightness(60%) blur(4px);
  pointer-events: auto;

  &:hover {
    border: solid 2px rgba(255, 255, 255, 1);
    color: rgba(255, 255, 255, 1);
  }
`;

const overlayStyle = css.resolve`
  div {
    display: grid;
    place-items: center;
    isolation: isolate;
    background: rgb(36 46 89 / 75%);
    backdrop-filter: saturate(50%) blur(4px);
    opacity: 0;
    transition: opacity 250ms;
  }

  div[data-status='open'] {
    opacity: 1;
  }

  div[data-status='close'] {
    transition-delay: 350ms;
  }
`;

function Jumbotron () {
  const [isPortfolioOpen, setPortfolioOpen] = useState(false);

  const { refs, context } = useFloating({
    open: isPortfolioOpen,
    onOpenChange: setPortfolioOpen,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, {
      outsidePressEvent: 'click',
    }),
  ]);

  const { isMounted, status } = useTransitionStatus(context, { duration: 600 });

  const projects = new Array(8).fill(true).map((_, i) => ({ id: i }));

  useEffect(() => {
    const logoSplitText = new SplitType("[data-animate-id='logo']", { tagName: 'span', types: 'chars' });
    animate([
      [
        logoSplitText.chars,
        {
          y: ['100%', '0%'],
          opacity: [0, 1],
        },
        { duration: 0.6, delay: stagger(0.15, { startDelay: 0.6 }) },
      ],
      [
        "[data-animate-id='category']",
        {
          y: ['100%', '0%'],
          opacity: [0, 1],
        },
        { ease: 'easeOut', duration: 0.6, at: '-0.4' },
      ],
      [
        "[data-animate-id='slogan']",
        {
          y: ['100%', '0%'],
          opacity: [0, 1],
        },
        { ease: 'easeOut', duration: 0.6 },
      ],
      [
        "[data-animate-id='btn-contact']",
        {
          opacity: [0, 1],
        },
        { ease: 'easeOut', duration: 0.6 },
      ],
      [
        "[data-animate-id='btn-portfolio']",
        {
          opacity: [0, 1],
        },
        { ease: 'easeOut', duration: 0.6 },
      ],
    ]);

    return () => {
      SplitType.revert("[data-animate-id='logo']");
    };
  }, []);

  return (
    <JumbotronContainer>
      <Logo data-animate-id="logo">REVE</Logo>
      <CategoryText data-animate-id="category">Interior Design</CategoryText>
      <Slogan data-animate-id="slogan">Inspiring Spaces, Crafted for You</Slogan>
      <ActionsSection>
        <ContactButton data-animate-id="btn-contact">Get Free Quote</ContactButton>
        <PortfolioButton data-animate-id="btn-portfolio" ref={refs.setReference} {...getReferenceProps()}>Portfolio</PortfolioButton>
      </ActionsSection>
      {isMounted && (
        <FloatingPortal>
          <FloatingOverlay
            lockScroll
            className={overlayStyle.className}
            data-status={status}
          >
            <>
              <div>
                <button className="btn-portfolio-close">
                  <span>Close</span>
                </button>
                <style jsx>{`
                  div {
                    position: sticky;
                    top: 0;
                    right: 0;
                    z-index: 99;
                    justify-self: end;
                  }

                  button.btn-portfolio-close {
                    margin: 0.725rem;
                    padding: 6px 16px;
                    background: transparent;
                    border: none;
                    border-left: 2px solid white;
                    border-right: 2px solid white;
                    font-size: 0.875rem;
                    color: white;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 600ms ease;
                    overflow: hidden;
                    max-width: 0;
                    animation: button-portfolio-close-reveal 600ms 100ms ease both;
                  }

                  @media screen and (min-width: ${bp.sm}) {
                    button.btn-portfolio-close {
                      margin: 1.125rem;
                      padding: 6px 12px;
                      font-size: 1.25rem;
                    }
                  }

                  button.btn-portfolio-close:hover {
                    color: #ff55a6;
                  }

                  button.btn-portfolio-close > span {
                    display: block;
                    animation: button-portfolio-close-text-reveal 200ms 300ms ease both;
                    transition: color 200ms ease;
                  }

                  button.btn-portfolio-close:hover > span {

                  }

                  @keyframes button-portfolio-close-reveal {
                    to {
                      max-width: 300px;
                    }
                  }

                  @keyframes button-portfolio-close-text-reveal {
                    from {
                      transform: rotateX(90deg);
                    }

                    to {
                      transform: rotateX(0deg);
                    }
                  }
                `}</style>
              </div>
              <section className="portfolioWrapper" ref={refs.setFloating} {...getFloatingProps()}>
                <div className="portfolioGrid" data-status={status}>
                  {
                    projects.map(p => (
                      <div key={p.id}></div>
                    ))
                  }
                </div>
                <style jsx>{`
                  .portfolioWrapper {
                    color: black;
                    padding: 16px;
                    margin: 16px;
                    margin-top: 160px;
                    width: 100%;
                    pointer-events: none;
                  }

                  .portfolioGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 500px));
                    gap: 1.2rem;
                    place-content: center;
                    pointer-events: none;
                    opacity: 0;
                    transform: perspective(900px) rotateX(-45deg) scale(0.7);
                    transition: all 600ms ease;
                  }

                  @media screen and (min-width: ${bp.lg}) {
                    .portfolioGrid {
                      gap: 1rem;
                    }
                  }

                  .portfolioGrid[data-status='open'] {
                    opacity: 1;
                    transform: rotate(0deg) scale(1);
                  }


                  @media screen and (min-height: 800px) {
                    .portfolioGrid > div {
                      height: 400px;
                    }
                  }

                  .portfolioGrid > div:hover {
                    background-color: rgba(40, 40, 40);
                    box-shadow: none;
                    transform: scale(1.05);
                  }

                  .portfolioGrid > div {
                    background-color: rgba(17, 17, 17, 0.9);
                    border-radius: 12px;
                    padding: 6px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.4),
                    0px 6px 12px rgba(0, 0, 0, 0.1);
                    transition: box-shadow 300ms ease, transform 300ms, background-color ease 300ms;
                    width: 100%;
                    height: 300px;
                    pointer-events: auto;
                    cursor: pointer;
                  }
                `}</style>
              </section>
            </>
          </FloatingOverlay>
          {overlayStyle.styles}
        </FloatingPortal>
      )}
    </JumbotronContainer>
  );
}

export default Jumbotron;
