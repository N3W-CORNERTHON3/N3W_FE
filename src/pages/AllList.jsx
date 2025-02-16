import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import PlusBtn from '../images/PlusBtn.png';
import Mission from '../components/AllList/Mission.jsx';
import styled from 'styled-components';
import AddPopup from '../components/AllList/AddPopup.jsx';
import FuncPopup from '../components/AllList/FuncPopup.jsx';
import DeletePopup from '../components/AllList/DeletePopup.jsx';
import EditPopup from '../components/AllList/EditPopup.jsx'; // EditPopup import 추가
import axios from 'axios';


const Display = styled.div `
    width: 393px;
    height: 852px;
    display: flex;
  align-items: center;
  flex-direction: column;
    margin-top: 50px;
    background-color: #fff;
  text-align: left;
`;

const Content = styled.div `
  display: flex;
  align-items: center;
  flex-direction: column; /* 세로로 쌓이도록 설정 */
  margin-top: 26px;
`;

const FuncDiv = styled.div `
  display: flex;
  width: 340px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const AddMission = styled.div `
  width: 51px;
  height: 35px;
  border-radius: 20px;
  background-color: #CAF4FF;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Plus = styled.img `
`;

const CategorySelect = styled.select `
  width: 158px;
  height: 35px;
  border-radius: 20px;
  border: 1px solid #000;
 font-size: 15px;
  padding: 9px 14px;
`;

const MissionWrap = styled.div`
  width: 393px;
  height: 599px;
  display: flex;
  flex-direction: column; /* 세로로 쌓이도록 설정 */
  align-items: center;
  overflow-y: scroll; /* 세로 스크롤 */
  
  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const AllList = () => {
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리
  const [showFuncPopup, setShowFuncPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null); // 선택된 미션 관리
  const [missions, setMissions] = useState([]); // 미션

  const [categoryFilter, setCategoryFilter] = useState('ALL'); // 카테고리 필터 상태 추가

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value); // 드롭다운 값 변경 시 상태 업데이트
  };

  // 미션 불러오기
const fetchMissions = async () => {
  try {
    const token = localStorage.getItem('authToken');
    console.log(token);

    const response = await axios.get('/api/missions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    

    setMissions(response.data);
  } catch (error) {
    console.error('Error fetching missions:', error);
  }
};

useEffect(() => {
  fetchMissions(); // 컴포넌트 마운트 시 실행
}, []);


  const handleAddMission = () => {
    setShowPopup(true); // 플러스 버튼 클릭 시 팝업 열기
  };

  const handleMissionClick = (mission) => {
    setSelectedMission(mission); // 클릭한 미션 데이터 설정
    setShowFuncPopup(true); // Func 팝업 열기
    setShowEditPopup(false); // 다른 팝업 닫기
    setShowDeletePopup(false); // 다른 팝업 닫기
  };

  const handleEditClick = () => {
    setShowFuncPopup(false); // Func 팝업 닫기
    setShowEditPopup(true); // Edit 팝업 열기
  };

  const handleDeleteClick = () => {
    setShowFuncPopup(false); // Func 팝업 닫기
    setShowDeletePopup(true); // Delete 팝업 열기
  };

  // ✅ 팝업 닫을 때 목록 갱신
const handleClosePopup = () => {
  setShowPopup(false);
  fetchMissions(); // 미션 목록 다시 불러오기
};

const handleCloseFuncPopup = () => {
  setShowFuncPopup(false);
  fetchMissions();
};

const handleCloseEditPopup = () => {
  setShowEditPopup(false);
  fetchMissions();
};

const handleCloseDeletePopup = () => {
  setShowDeletePopup(false);
  fetchMissions();
};

  // 미션 필터
  const filteredMissions = categoryFilter === 'ALL' 
  ? missions 
  : missions.filter((mission) => mission.category === categoryFilter);

  return (
    <>
      <Display blur={showPopup}>
        <Header />
        <Content style={{ filter: showPopup ? 'blur(3px)' : 'none' }}>
          <FuncDiv>
          <CategorySelect id="category" name="category" onChange={handleCategoryChange}>
            <option value="ALL">전체</option>
            <option value="SELF_IMPROVEMENT">자기계발</option>
            <option value="STUDY">공부</option>
            <option value="HEALTH">건강</option>
            <option value="HOBBY">취미</option>
            <option value="ETC">기타</option>
          </CategorySelect>
          <AddMission onClick={handleAddMission}>
            <Plus src={PlusBtn}/>
          </AddMission>
          </FuncDiv>
          
          <MissionWrap>
          {filteredMissions.message ? (
              <p>미션이 없습니다</p> // 미션이 없을 때 출력
            ) : (
              filteredMissions.map((mission, index) => (
                <Mission
                  key={index}
                  type={mission.status}
                  category={mission.category}
                  text={mission.name}
                  level={mission.level}
                  onClick={() => handleMissionClick(mission)}
                />
              ))
            )}
          </MissionWrap>
        </Content>
        {showPopup && <AddPopup onClose={handleClosePopup} />} {/* 팝업 표시 */}
        {showFuncPopup && (
          <FuncPopup
            mission={selectedMission} // 선택된 미션 데이터 전달
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onClose={handleCloseFuncPopup}
          />
        )}
        {showEditPopup && (
          <EditPopup
            mission={selectedMission}
            onClose={handleCloseEditPopup}
          />
        )}
        {showDeletePopup && (
          <DeletePopup
            mission={selectedMission}
            onClose={handleCloseDeletePopup}
          />
        )}
        <Footer />

      </Display >
    </>
  );
};

export default AllList;
