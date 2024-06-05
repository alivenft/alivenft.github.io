import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Track BTC Price</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  text-align: center;
  background-color: #282c34;
  color: #61dafb;
`;

export default Footer;
