import React, { useState } from 'react';
import styled from 'styled-components';
import cancel from '../../images/CancelBtn.png'



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
`;

const CancelBtn = styled.img `
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer; /* 클릭 가능하게 커서 변경 */
`;

const Edit = styled.button `
    width: 104px;
  height: 32px;
  border-radius: 20px;
  border: none;
  background-color: #5AB2FF;
  color: #fff;
  font-size: 18px;
  padding: 0 5px;
  
`;

const Delete = styled(Edit) `
margin-left: 22px;
`;

const FuncPopup = ({ onClose }) => {
 
  return (
    <>
    <Popup>
        <Content>
            <Edit type='button' >수정하기</Edit>
            <Delete type='button' >삭제하기</Delete>
            <CancelBtn src={cancel} onClick={onClose}/>
        </Content>
    </Popup>
    </>
  );
};

export default FuncPopup;
