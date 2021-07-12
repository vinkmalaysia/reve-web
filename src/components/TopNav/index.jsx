import React from 'react';
import styled from 'styled-components';
import WhatsAppIcon from 'src/res/whatsapp.svg';
import FacebookIcon from 'src/res/facebook.svg';
import MessengerIcon from 'src/res/messenger.svg';

const CanvasShadow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100vw;
  position: absolute;
  top: 0;
  height: 90vh;
  background: linear-gradient(hsl(309deg 76% 42% / 30%) 0%, hsl(309deg 28% 33% / 15%) 60%, hsl(309deg 20% 33% / 5%) 95%,rgb(107 60 100 / 0%) 100%);
  pointer-events: none;
`;

const NavContainer = styled.nav`
  padding: 16px;
`;

const NavButtonItem = styled.a`
  display: inline-block;
  margin: 12px 6px;
  pointer-events: all;
  transition: all 70ms;

  svg {
    fill: rgba(221,221,221,0.8);
    width: 32px;
    height: 32px;
    filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.4));
  }

  &:hover {
    transform: scale(1.25);
    svg {
      fill: white;
    }
  }
`;

function TopNav () {
  return (
    <CanvasShadow>
      <NavContainer>
        <NavButtonItem href="https://web.whatsapp.com" title="Contact via WhatsApp"><WhatsAppIcon /></NavButtonItem>
        <NavButtonItem href="https://www.messenger.com" title="Contact via Messenger"><MessengerIcon /></NavButtonItem>
        <NavButtonItem href="https://www.facebook.com" title="Find us on Facebook"><FacebookIcon /></NavButtonItem>
      </NavContainer>
    </CanvasShadow>
  );
}

export default TopNav;
