import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const JumbotronContainer = styled.main`
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  margin: 60px;
  pointer-events: none;
`;

const Logo = styled.h1`
  color: rgba(255,255,255,0.5);
  font-size: 150px;
  font-family: 'Raleway', 'Segoe UI Light', sans-serif;
  font-weight: 200;
  margin: 0;
  letter-spacing: 50px;
`;

const Slogan = styled.p`
  display: inline-block;
  color: rgba(255,255,255,0.9);
  font-size: 28px;
  font-family: 'Raleway', 'Segoe UI Light', sans-serif;
  font-weight: 500;
  letter-spacing: 6px;
  margin: 0 8px;
  padding: 0 28px;
  border-left:  6px solid #ff55a6;
  border-right: 6px solid #ff55a6;
`;

const ContactSection = styled.section`

`;

const ContactButton = styled.button`
  display: block;
  margin: 36px 12px;
  pointer-events: all;
  border: 2px solid  #ff55a6;
  color: white;
  background-color: rgba(0,0,0,0.08);
  padding: 16px 24px;
  font-family: 'Raleway', 'Segoe UI Light', sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 3px;
  cursor: pointer;
  text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 6px rgba(0,0,0,0.5);
  transition: all 0.25s;

  &:hover {
    background: rgba(255,255,255,0.2);
    color: #fff;
    text-shadow: none;
    padding-left: 28px;
    padding-right: 28px;
  }
`;

function Jumbotron () {
  return (
    <JumbotronContainer>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Raleway:200,500&display=swap" rel="stylesheet" />
      </Head>
      <Logo>DEMO</Logo>
      <Slogan>LIVE IN YOUR DREAMS</Slogan>
      <ContactSection>
        <a href="https://facebook.com">
          <ContactButton>Find us on Facebook</ContactButton>
        </a>
      </ContactSection>
    </JumbotronContainer>
  );
}

export default Jumbotron;
