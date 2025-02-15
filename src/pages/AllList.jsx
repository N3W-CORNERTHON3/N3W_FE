import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import PlusBtn from '../images/PlusBtn.png';
import Mission from '../components/AllList/Mission.jsx';
import styled from 'styled-components';
import AddPopup from '../components/AllList/AddPopup.jsx';
import FuncPopup from '../components/AllList/FuncPopup.jsx';
import DeletePopup from '../components/AllList/DeletePopup.jsx';
import EditPopup from '../components/AllList/EditPopup.jsx'; // EditPopup import 추가

const Display = styled.div `
    width: 393px;
    height: 852px;
    border: 1px solid #000;
    display: flex;
  align-items: center;
  flex-direction: column;
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

  const handleClosePopup = () => {
    setShowPopup(false); // 팝업 닫기
  };

  const missions = [
    { type: 'ing', category: '공부', text: '수학 문제 풀기' },
    { type: 'yet', category: '공부', text: '영어 단어 외우기' },
    // 더 많은 미션 데이터를 추가하세요
  ];


  return (
    <>
      <Display blur={showPopup}>
      <Header/>
        <Content style={{ filter: showPopup ? 'blur(3px)' : 'none' }}>
          <FuncDiv>
          <CategorySelect id="category" name="category">
            <option value="all">전체</option>
            <option value="develope">자기계발</option>
            <option value="study">공부</option>
            <option value="health">건강</option>
            <option value="hobby">취미</option>
            <option value="others">기타</option>
          </CategorySelect>
          <AddMission onClick={handleAddMission}>
            <Plus src={PlusBtn}/>
          </AddMission>
          </FuncDiv>
          
            <MissionWrap>
            {missions.map((mission, index) => (
              <Mission
                key={index}
                type={mission.type}
                category={mission.category}
                text={mission.text}
                onClick={() => handleMissionClick(mission)}
              />
            ))}

                </MissionWrap>
        </Content>
        {showPopup && <AddPopup onClose={handleClosePopup} />} {/* 팝업 표시 */}
        {showFuncPopup && (
          <FuncPopup
            mission={selectedMission} // 선택된 미션 데이터 전달
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onClose={() => setShowFuncPopup(false)}
          />
        )}
        {showEditPopup && (
          <EditPopup
            mission={selectedMission}
            onClose={() => setShowEditPopup(false)}
          />
        )}
        {showDeletePopup && (
          <DeletePopup
            mission={selectedMission}
            onClose={() => setShowDeletePopup(false)}
          />
        )}
      <Footer/>
      </Display >
    </>
  );
};

export default AllList;
