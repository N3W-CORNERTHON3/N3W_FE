import React, { useState } from 'react';
import styled from 'styled-components';
import cancel from '../../images/CancelBtn.png'
import axios from 'axios';


const Popup = styled.div `
    width: 336px;
    height: 297px;
    border-radius: 15px;
    /*position: relative;*/
    position: absolute; 
    top: 200px;
    background-color: #fff;
    z-index: 1000; /* 팝업이 앞에 보이도록 z-index 설정 */
`;

const Content = styled.div `
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
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#5AB2FF")};
  color: #fff;
  font-size: 18px;
  padding: 0 5px;
  position: absolute;
  bottom: 12px;
  right: 22px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const AddPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
  });

  const isFormValid = formData.category && formData.level && formData.name.trim();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
    
  };

  // 제출 버튼튼
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return; // 유효성 검사

    try {// 인증 토큰 가져오기
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error("토큰이 없습니다. 로그인 상태를 확인하세요.");
      }

      const response = await axios.post(
        '/api/missions',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('미션 추가 성공:', response.data);
      onClose(); // 성공 시 팝업 닫기
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };
 
  return (
    <>
    <Popup>
        <Content>
            <CategorySelect
          name="category"
          value={formData.category}
          onChange={handleChange}>
            <option value="NONE" hidden>카테고리 선택</option>
            <option value="SELF_IMPROVEMENT">자기계발</option>
            <option value="STUDY">공부</option>
            <option value="HEALTH">건강</option>
            <option value="HOBBY">취미</option>
            <option value="ETC">기타</option>
          </CategorySelect>
          <DifficultySelect
          name="level"
          value={formData.level}
          onChange={handleChange}>
            <option value="NONE" hidden>난이도 선택</option>
            <option value="HIGH">상</option>
            <option value="MEDIUM">중</option>
            <option value="LOW">하</option>
          </DifficultySelect>
          <Title>미션 내용</Title>
            <MissionText
          name="name"
          value={formData.name}
          onChange={handleChange}></MissionText>
            <Submit type='button' onClick={handleSubmit} disabled={!isFormValid}>추가하기</Submit>
            <CancelBtn src={cancel} onClick={onClose}/>
        </Content>
    </Popup>
    </>
  );
};

export default AddPopup;
