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

const ContactSection = styled.section`

`;

const ContactButton = styled.button`
  margin: 36px 0;
  border: 0;
  border-radius: 9999px;
  color: white;
  background-color: #ff55a6;
  padding: 16px 24px;
  font-family: 'Raleway', 'Segoe UI Light', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.25s;
  pointer-events: auto;

  &:hover {
    background: rgba(0, 0, 0, 0.6);
    text-shadow: none;
    color: #ff55a6;
  }
`;

function Jumbotron () {
  return (
    <JumbotronContainer>
      <Logo>REVE</Logo>
      <Slogan>Inspiring Spaces, Crafted for You</Slogan>
      <ContactSection>
        <a href="https://facebook.com">
          <ContactButton>Get Free Quote</ContactButton>
        </a>
      </ContactSection>
    </JumbotronContainer>
  );
}

export default Jumbotron;
