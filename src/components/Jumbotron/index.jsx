import React from 'react';
import styled from 'styled-components';
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
  width: min-content;
  color: rgba(255, 255, 255, 0.75);
  text-shadow: 0 0 175px rgb(0 0 0 / 25%);
  font-size: 4.5rem;
  font-family: 'Raleway', 'Segoe UI Light', sans-serif;
  font-weight: 600;
  margin: 0;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  letter-spacing: 6px;
  pointer-events: auto;

  @media screen and (min-width: ${bp.sm}) {
    font-size: 6rem;
  }

  @media screen and (min-width: ${bp.md}) {
    font-size: 8rem;
  }
`;

const Slogan = styled.p`
  display: block;
  width: fit-content;
  color: rgba(255,255,255,0.9);
  font-size: 16px;
  font-family: 'Raleway', 'Segoe UI Light', sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  margin-top: 16px;
  padding: 0 24px;
  border-left-style: solid;
  border-right-style: solid;
  border-color: #ff55a6;
  border-width: 4px;
  text-transform: uppercase;
  pointer-events: auto;

  @media screen and (min-width: ${bp.sm}) {
    font-size: 28px;
    font-weight: 500;
    letter-spacing: 2px;
  }
`;

const ContactButton = styled.button`
  margin: 36px 0;
  border: 0;
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.8);
  background: linear-gradient(335deg, #ff55a6, #5b3dff);
  padding: 16px 24px;
  font-family: 'Raleway', 'Segoe UI Light', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  pointer-events: auto;
  transform: scale(0.95);
  transition: all 0.25s;

  &:hover {
    color: rgba(255, 255, 255, 1);
    box-shadow: inset 0 1px 2px rgba(244, 232, 255, 0.9), inset 0 0px 10px rgba(255, 255, 255, 0.4), 0 0 30px rgba(183, 76, 255, 0.75);
    transform: scale(1);
  }
`;

const PortfolioButton = styled.button`
  margin: 36px 0;
  margin-left: 8px;
  border: solid 2px rgba(255, 255, 255, 0.6);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.8);
  background: transparent;
  padding: 16px 24px;
  font-family: 'Raleway', 'Segoe UI Light', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.25s;
  pointer-events: auto;
  transform: scale(0.95);

  &:hover {
    border: solid 2px rgba(255, 255, 255, 1);
    color: rgba(255, 255, 255, 1);
    transform: scale(1);
  }
`;

function Jumbotron () {
  return (
    <JumbotronContainer>
      <Logo>REVE</Logo>
      <Slogan>Inspiring Spaces, Crafted for You</Slogan>
      <section>
        <a href="https://facebook.com">
          <ContactButton>Get Free Quote</ContactButton>
          <PortfolioButton>Portfolio</PortfolioButton>
        </a>
      </section>
    </JumbotronContainer>
  );
}

export default Jumbotron;
