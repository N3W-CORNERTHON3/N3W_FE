import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Complete from '../images/Complete.png';
import AllList from '../images/AllList.png';
import Challenge from '../images/Challenge.png';
import axios from 'axios';
import profile from '../images/ProfileImg.png';
import logout from '../images/Logout.png';
import { useNavigate } from 'react-router-dom';

// styled-components를 사용한 스타일링

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  border-radius: 15px 0 0 15px;
  background-color:rgba(255, 255, 255, 0.8);
  height: 832px;
  width: 200px;
  right: -220px;  /* 닫혔을 때는 화면 밖에 위치 */
  top: 0;
  position: absolute;
  transition: 0.5s ease;
  

  &.open {
    right: 0px;  /* 열렸을 때는 화면 안으로 이동 */
    transition: 0.5s ease;
  }
`;


const MenuWrap = styled.ul `
      list-style: none;
      padding: 0;
      margin-top: 40px;
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

const Profile = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 85px;
  `;

const ProfileImg = styled.img `
`;

const Name = styled.p `
  font-size: 15px;
  margin: 0;
  margin-top: 12px;
`;

const LogoutWrap = styled.div `
  display: flex;
  margin-left: 24px;
  margin-top: 300px;
`;

const LogoutImg = styled.img `
  width: 17.8px;
  height: 18px;
`;

const LogoutText = styled.p `
  margin: 0;
  margin-left: 12.4px;
  color: #898686;
  font-size: 15px;
`;

function Sidebar({ isOpen, setIsOpen }) {
  const [profileData, setProfileData] = useState({ id: '', profileImg: '' });
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

  // 프로필 정보를 받아오는 비동기 함수
  const token = localStorage.getItem('authToken');
  
  const axios_get = async () => {
    try {
      const response = await axios.get('/api/member/profiles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data.profileImg);

      // 서버 응답에서 데이터를 받아와서 상태 업데이트
      setProfileData({
        id: response.data.data.id,
        profileImg: response.data.data.profileImg, // 프로필 이미지 경로 업데이트
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios_get();  // 컴포넌트가 마운트될 때 프로필 정보를 가져옴
  }, []);

  const navigate = useNavigate();


  // 진행중인 미션 확인
  const checkOngoing = async () => {
    try {
      const response2 = await axios.get('/api/missions/ongoing', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response2.data.hasOngoingMission) {
        navigate('/challengeIng'); // 진행 중일 때
      } else {
        navigate('/challenge'); // 진행 중이지 않을 때
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SideBarWrap ref={outside} className={isOpen ? 'open' : ''}>
      <Profile>
      <ProfileImg src={profileData.profileImg === 'defualtImg' ? profile : profileData.profileImg} alt="Profile" />
      <Name>{profileData.id}</Name>
      </Profile>
      <MenuWrap>
      <Menu onClick={() => navigate('/challengeComplete')}>
        <MenuImg src={Complete} />
        <MenuText>성취 미션</MenuText>
      </Menu>
        <Menu onClick={checkOngoing}><MenuImg src={Challenge}/><MenuText>챌린지</MenuText></Menu>
        <Menu onClick={() => navigate('/mission')}>
          <MenuImg src={AllList} />
          <MenuText>전체 미션 목록</MenuText>
        </Menu>
      </MenuWrap>
      <LogoutWrap onClick={() => {
  localStorage.removeItem('authToken');  // 토큰 삭제
  navigate('/');  // 로그인 페이지로 이동
}}>
        <LogoutImg src={logout}/>
        <LogoutText>로그아웃</LogoutText>
      </LogoutWrap>
    </SideBarWrap>
  );
}

export default Sidebar;