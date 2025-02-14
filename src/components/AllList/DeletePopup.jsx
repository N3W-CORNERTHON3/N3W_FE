
import React, { useState } from 'react';
import styled from 'styled-components';



const Popup = styled.div `
    width: 336px;
    height: 142px;
    border-radius: 15px;
    /*position: relative;*/
    position: absolute; 
    top: 180px;
    left: 28px;
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

const DeletePopup = ({ onClose }) => {
 
  return (
    <>
    <Popup>
        <Content>
            <Warning>미션을 삭제하시겠습니까?</Warning>
            <ButtonWrap>
            <Yes type='button' >예</Yes>
            <No type='button' onClick={onClose}>아니오</No>
            </ButtonWrap>
        </Content>
    </Popup>
    </>
  );
};

export default DeletePopup;
