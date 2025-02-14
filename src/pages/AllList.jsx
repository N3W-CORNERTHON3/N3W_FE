import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import PlusBtn from '../images/PlusBtn.png';
import Mission from '../components/AllList/Mission.jsx';
import styled from 'styled-components';
import AddPopup from '../components/AllList/AddPopup.jsx';
import FuncPopup from '../components/Challenge/CardDetail.jsx';
import DeletePopup from '../components/AllList/DeletePopup.jsx';
import CardDetail from '../components/Challenge/CardDetail.jsx';

const Display = styled.div `
    width: 393px;
    height: 852px;
    border: 1px solid #000;
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

  const handleAddMission = () => {
    setShowPopup(true); // 플러스 버튼 클릭 시 팝업 열기
  };

  const handleClosePopup = () => {
    setShowPopup(false); // 팝업 닫기
  };

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
                <Mission type={'ing'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'yet'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                <Mission type={'done'} category={'공부'} text={'수학 문제 풀기'}/>
                </MissionWrap>
        </Content>
        {showPopup && <AddPopup onClose={handleClosePopup} />} {/* 팝업 표시 */}
        <CardDetail category={'공부'} rate={33}/>
      <Footer/>
      </Display >
    </>
  );
};

export default AllList;
