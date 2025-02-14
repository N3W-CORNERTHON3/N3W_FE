import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Complete from '../images/Complete.png';
import AllList from '../images/AllList.png';
import Challenge from '../images/Challenge.png';


// styled-components를 사용한 스타일링

const Display = styled.div`
  width: 393px;
  height: 852px;
  position: relative;
  border: 1px solid #ccc;  /* 확인을 위해 경계선 추가 */
`;

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  border-radius: 15px 0 0 15px;
  background-color: #FFFFFF80;
  height: 100%;
  width: 200px;
  right: -200px;  /* 닫혔을 때는 화면 밖에 위치 */
  top: 0;
  position: absolute;
  transition: 0.5s ease;

  &.open {
    right: 15px;  /* 열렸을 때는 화면 안으로 이동 */
    transition: 0.5s ease;
  }
`;


const MenuWrap = styled.ul `
      list-style: none;
      padding: 0;
      margin-top: 100px;
`;

const MenuImg = styled.img `
  width: 24px;
  heigiht: 24px;
`;

const Menu = styled.li`
  display: flex;
  padding-top: 20px;
  padding-bottom: 15px;
  border-bottom: 1.5px solid rgb(231, 231, 231);

  &:last-child {
    border: none;
  }
`;

const MenuText = styled.p `
  font-size: 15px;
  margin: 0;
  margin-left: 24px;
`;

const ExitMenu = styled.span`
  position: absolute;
  bottom: 26px;
  font-size: 0.8rem;
`;

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef(null);

  // 사이드바 외부 클릭 시 닫히는 로직
  const handlerOutside = (e) => {
    if (outside.current && !outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handlerOutside);
    return () => {
      document.removeEventListener('mousedown', handlerOutside);
    };
  }, []); // 한 번만 실행되도록 설정

  // 사이드바를 닫는 함수
  const toggleSide = () => {
    setIsOpen(false);
  };

  return (
    <SideBarWrap ref={outside} className={isOpen ? 'open' : ''}>
      <MenuWrap>
        <Menu><MenuImg src={Complete}/><MenuText>성취 미션</MenuText></Menu>
        <Menu><MenuImg src={Challenge}/><MenuText>챌린지</MenuText></Menu>
        <Menu><MenuImg src={AllList}/><MenuText>전체 미션 목록</MenuText></Menu>
      </MenuWrap>
    </SideBarWrap>
  );
}

export default Sidebar;