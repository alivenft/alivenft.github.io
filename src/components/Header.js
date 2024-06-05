import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Track BTC Price</h1>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  padding: 20px;
  text-align: center;
  background-color: #282c34;
  color: #61dafb;
`;

export default Header;
