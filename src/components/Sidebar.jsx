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
  background-color:rgba(255, 255, 255, 0.9);
  height: 832px;
  width: 200px;
  top: 0;
  position: absolute;
  transition: 0.5s ease;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; /* 숨김 처리 */

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
  width: 50px;
  height: 50px;
  border-radius: 25px;
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
      console.log(response);

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
        fetchMissions();// 진행 중일 때 
      } else {
        navigate('/challenge'); // 진행 중이지 않을 때
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  // 미션 불러오기
  const fetchMissions = async () => {
    try {
      const response = await axios.get('/api/missions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      
      const missions = response.data; // 서버에서 받은 미션 목록
      const progressingMission = missions.find(mission => mission.status === 'PROGRESSING'); // 진행 중인 미션 찾기
  
      if (progressingMission) {
        const { missionId } = progressingMission; // 진행 중인 미션의 ID
        navigate(`/challengeIng/${missionId}`); // 해당 미션 ID로 이동
      } else {
        console.log('No ongoing mission.');
      }
  
    } catch (error) {
      console.error('Error fetching missions:', error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('image', file);  // form-data로 이미지 파일 추가
  
    try {
      const response = await axios.put('/api/member/profiles', formData, {
        headers: {
          Authorization: `Bearer ${token}`,  // 인증 토큰 추가
          'Content-Type': 'multipart/form-data',  // multipart/form-data 헤더 설정
        },
      });
  
      if (response.data.success) {
        // 성공 시 서버로부터 받은 이미지 URL로 프로필 이미지 변경
        setProfileData((prev) => ({ ...prev, profileImg: response.data.data }));
        console.log('프로필 변경 성공:', response.data.data);
      } else {
        console.error('프로필 변경 실패:', response.data.message);
      }
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };
  
  return (
    <SideBarWrap ref={outside} className={isOpen ? 'open' : ''} isOpen={isOpen}>
      <Profile>
      <ProfileImg
  src={profileData.profileImg == 'defualtImg' ? profile : profileData.profileImg}
  alt="Profile"
  onClick={() => document.getElementById('fileInput').click()}  // 클릭 시 파일 선택 창 열기
/>
        <input
          id="fileInput"
          type="file"
          style={{ display: 'none' }}  // 화면에 보이지 않도록 숨김
          onChange={handleFileChange}  // 파일 선택 시 호출할 핸들러
        />

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