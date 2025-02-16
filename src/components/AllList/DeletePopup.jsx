
import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const Popup = styled.div `
    width: 336px;
    height: 142px;
    border-radius: 15px;
    /*position: relative;*/
    position: absolute; 
        top: 400px;

    background-color: #fff;
    z-index: 1000; /* 팝업이 앞에 보이도록 z-index 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const Content = styled.form `
    display: flex;
    flex-direction: column;
`;

const CancelBtn = styled.img `
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer; /* 클릭 가능하게 커서 변경 */
`;

const Warning = styled.p `
    font-size: 20px;
`;

const ButtonWrap = styled.div `
    display: flex;
  margin-top: 10px;
`;

const Yes = styled.button `
    width: 104px;
  height: 32px;
  border-radius: 20px;
  border: none;
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
  font-size: 18px;
  padding: 0 5px;
  
`;

const No = styled(Yes) `
margin-left: 22px;
`;

const DeletePopup = ({ onClose, mission }) => { // onDeleteSuccess 추가
    const handleDeleteMission = async () => {
        try {
          const token = localStorage.getItem('authToken'); // 인증 토큰 가져오기
      
          const response = await axios.delete(`/api/missions/${mission.missionId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          // 서버 응답이 204인 경우 성공 처리
          if (response.status === 204) {
            console.log("미션이 삭제되었습니다."); // 기본 메시지 출력
            alert("미션이 삭제되었습니다."); // 사용자에게 알림
            onClose(); // 팝업 닫기
            return;
          }
      
          // 응답에 message가 있는 경우 출력
          console.log(response.data?.message || "미션이 삭제되었습니다.");
          alert(response.data?.message || "미션이 삭제되었습니다.");

          onClose();
        } catch (error) {
          console.error('미션 삭제 중 오류 발생:', error.response?.data?.message || error.message);
          alert(error.response?.data?.message || "삭제 중 오류가 발생했습니다.");
        }
      };
 
  return (
    <>
    <Popup>
        <Content>
            <Warning>미션을 삭제하시겠습니까?</Warning>
            <ButtonWrap>
            <Yes type='button'  onClick={handleDeleteMission}>예</Yes>
            <No type='button' onClick={onClose}>아니오</No>
            </ButtonWrap>
        </Content>
    </Popup>
    </>
  );
};

export default DeletePopup;
