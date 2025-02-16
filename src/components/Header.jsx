import React, { useState } from 'react';
import styled from 'styled-components';
import logoimg from '../images/Logo.png';
import hamburger from '../images/hamburger.png';
import Sidebar from './Sidebar.jsx';

const HeaderDiv = styled.div`
  width: 393px;
  height: 66px;
  border: none;
  border-bottom: 1.5px solid #B5B5B5;;

  display: flex;
  align-items: center;
  position: relative;
  top: 118px;
  background-color: #fff;
`;

const Logo = styled.img`
  height: 29.38px;
  margin-left: 24.48px;
`;

const HamburgerBtn = styled.button`
  background: none;
  border: none;
  margin-left: auto;
  margin-right: 24.48px;
`;

const HamburgerImg = styled.img`
  width: 24px;
  height: 24px;
`;

const Header = () => {
  // useState를 컴포넌트 함수 내에 선언
  const [isOpen, setIsOpen] = useState(false);

  // 사이드바를 열고 닫는 함수
  const toggleSide = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HeaderDiv>
        <Logo src={logoimg} alt="logo" />
        <HamburgerBtn onClick={toggleSide}>
          <HamburgerImg src={hamburger} alt="hamburger menu" />
        </HamburgerBtn>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </HeaderDiv>
    </>
  );
};

export default Header;
