import React from 'react';
import styled from 'styled-components';
import WhatsAppIcon from 'src/res/whatsapp.svg';
import FacebookIcon from 'src/res/facebook.svg';
import MessengerIcon from 'src/res/messenger.svg';

const NavContainer = styled.nav`
  display: flex;
  justify-content: end;
`;

const NavButtonItem = styled.a`
  display: block;
  line-height: 0;
  transition: all 150ms;
  padding: 6px;
  border-radius: 9999px;
  border: solid 4px rgba(255, 255, 255, .25);


  svg {
    fill: rgba(221, 221, 221, 0.8);
    width: 24px;
    height: 24px;
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.4));
  }

  &:hover {
    transform: scale(1.25);

    svg {
      fill: #ce8eec;
    }
  }
`;

function TopNav () {
  return (
    <>
      <NavContainer>
        <div className="contact">
          Contact: 018-9857161
          <style jsx>{`
            .contact {
              display: inline-flex;
              align-items: center;
              color: #eee;
            }
          `}</style>
        </div>
        <div className="social-buttons">
          <NavButtonItem href="https://web.whatsapp.com" title="Contact via WhatsApp"><WhatsAppIcon /></NavButtonItem>
          <NavButtonItem href="https://www.messenger.com" title="Contact via Messenger"><MessengerIcon /></NavButtonItem>
          <NavButtonItem href="https://www.facebook.com" title="Find us on Facebook"><FacebookIcon /></NavButtonItem>
          <style jsx>{`
            .social-buttons {
              display: inline-flex;
              margin: 16px;
              gap: 8px;
              pointer-events: auto;
            }
          `}</style>
        </div>
      </NavContainer>
    </>
  );
}

export default TopNav;
