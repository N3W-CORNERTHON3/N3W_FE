import React, { useState } from 'react';
import styled from 'styled-components';
import cancel from '../../images/CancelBtn.png'

const Popup = styled.div `
    width: 336px;
    height: 297px;
    border-radius: 15px;
    /*position: relative;*/
    position: absolute; 
    top: 180px;
    left: 28px;
    background-color: #fff;
    z-index: 1000; /* 팝업이 앞에 보이도록 z-index 설정 */
`;

const Content = styled.form `
display: flex;
    flex-direction: column; /* 세로로 쌓이도록 설정 */
    margin: 12px 0 0 20px;
`;

const CancelBtn = styled.img `
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer; /* 클릭 가능하게 커서 변경 */
`;

const CategorySelect = styled.select `
  width: 158px;
  height: 35px;
  border-radius: 20px;
  border: 1px solid #000;
 font-size: 15px;
  padding: 9px 14px;
  margin-bottom: 13px;
`;

const DifficultySelect = styled(CategorySelect) `
   
`;

const Title = styled.p `
  margin: 0;
font-size: 15px;
  margin-bottom: 8px;
  margin-left: 3px;

`;

const MissionText = styled.textarea `
width: 287px;
  height: 99px;
  border: 1px solid #000;
  border-radius: 3px;
  resize: none; /* 크기 조절 불가능하게 설정 */  
`;

const Submit = styled.button `
    width: 104px;
  height: 32px;
  border-radius: 20px;
  border: none;
  background-color: #5AB2FF;
  color: #fff;
  font-size: 18px;
  padding: 0 5px;
  position: absolute;
  bottom: 12px;
  right: 22px;
`;

const EditPopup = ({ onClose }) => {
 
  return (
    <>
    <Popup>
        <Content>
            <CategorySelect id="category" name="category">
            <option value="none" hidden>카테고리 선택</option>
            <option value="develope">자기계발</option>
            <option value="study">공부</option>
            <option value="health">건강</option>
            <option value="hobby">취미</option>
            <option value="others">기타</option>
          </CategorySelect>
          <DifficultySelect id="difficulty" name="difficulty">
            <option value="none" hidden>난이도 선택</option>
            <option value="high">상</option>
            <option value="mid">중</option>
            <option value="low">하</option>
          </DifficultySelect>
          <Title>미션 내용</Title>
            <MissionText></MissionText>
            <Submit type='submit' >추가하기</Submit>
            <CancelBtn src={cancel} onClick={onClose}/>
        </Content>
    </Popup>
    </>
  );
};

export default EditPopup;
