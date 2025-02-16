import React, { useState } from 'react';
import styled from 'styled-components';
import cancel from '../../images/CancelBtn.png';
import axios from "axios";

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
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#5AB2FF")};

  color: #fff;
  font-size: 18px;
  padding: 0 5px;
  position: absolute;
  bottom: 12px;
  right: 22px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

`;

const EditPopup = ({ onClose, mission }) => {
  const [formData, setFormData] = useState({
    name: mission.name,
    category: mission.category,
    level: mission.level,
  });

  const isFormValid = formData.category && formData.level && formData.name.trim();

  // 폼 값에 따라 자동적으로 formData 수정
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  
  const updateMission = async () => {
    try {
      const token = localStorage.getItem("authToken");
      

      console.log(formData);
      
      const response = await axios.put(
        `/api/missions/${mission.missionId}`, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("미션 업데이트 성공:", response.data);
    } catch (error) {
      console.error("미션 업데이트 중 오류 발생:", error.response?.data?.message || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 동작 방지
    if (!isFormValid) return; // 유효성 검사

    await updateMission(mission.missionId, formData);
    onClose(); // 성공 시 팝업 닫기
  };

  return (
    <>
    <Popup>
        <Content>
            <CategorySelect name="category" value={formData.category} onChange={handleChange}>
            <option value="SELF_IMPROVEMENT">자기계발</option>
            <option value="STUDY">공부</option>
            <option value="HEALTH">건강</option>
            <option value="HOBBY">취미</option>
            <option value="ETC">기타</option>
          </CategorySelect>
          <DifficultySelect name="level" value={formData.level} onChange={handleChange}>
          <option value="HIGH">상</option>
            <option value="MEDIUM">중</option>
            <option value="LOW">하</option>
          </DifficultySelect>
          <Title>미션 내용</Title>
            <MissionText name="name" value={formData.name} onChange={handleChange}></MissionText>
            <Submit type="button" onClick={handleSubmit} disabled={!isFormValid}>수정하기</Submit>

            <CancelBtn src={cancel} onClick={onClose}/>
        </Content>
    </Popup>
    </>
  );
};

export default EditPopup;
