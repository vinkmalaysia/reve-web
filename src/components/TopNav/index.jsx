import React from 'react';
import styled from 'styled-components';
import WhatsAppIcon from 'src/res/whatsapp.svg';
import FacebookIcon from 'src/res/facebook.svg';
import MessengerIcon from 'src/res/messenger.svg';

const NavContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  width: 100vw;
  position: absolute;
  top: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.1) 80%, transparent 100%);
  pointer-events: none;
`;

const NavButtonItem = styled.a`
  display: inline-block;
  margin: 12px 6px;
  pointer-events: all;
  
  svg {
    fill: rgba(221,221,221,0.8);
    width: 32px;
    height: 32px;
  }
  
  &:hover {
    svg {
      fill: white;
    }
  }
`;

function TopNav () {
  return (
    <NavContainer>
      <NavButtonItem href="https://web.whatsapp.com" title="Contact via WhatsApp"><WhatsAppIcon /></NavButtonItem>
      <NavButtonItem href="https://www.messenger.com" title="Contact via Messenger"><MessengerIcon /></NavButtonItem>
      <NavButtonItem href="https://www.facebook.com" title="Find us on Facebook"><FacebookIcon /></NavButtonItem>
    </NavContainer>
  );
}

export default TopNav;
