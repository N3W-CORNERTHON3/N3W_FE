import React, { useState } from 'react';
import styled from 'styled-components';
import cancel from '../../images/CancelBtn.png'



const Popup = styled.div `
    width: 226px;
    height: 292px;
    border-radius: 15px;
    /*position: relative;*/
    position: absolute; 
    top: 200px;
    left: 75px;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
    background-color: ${({ color }) => color};
    z-index: 1000; /* 팝업이 앞에 보이도록 z-index 설정 */
`;

const Content = styled.form `
display: flex;
    flex-direction: column; /* 세로로 쌓이도록 설정 */
    margin: 25px 0 0 15px;
`;

const CancelBtn = styled.img `
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer; /* 클릭 가능하게 커서 변경 */
`;

const MissionText = styled.h3 `
  margin: 0;
    font-size: 15px;
  margin-bottom: 8px;
  font-weight: bold;

`;

const MissionDetail = styled.div `
    display: flex;
  margin-bottom: 8px;
    align-items: center;
`;

const MissionCategory = styled.p`
  border-radius: 5px;
  font-size: 10px;
  color: #000;
  margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MissionDifficulty = styled.p`
  width: 17px;
  height: 12px;
  background-color: #FFF9D0;
  font-size: 10px;
  color: #000;
  margin: 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

const SubTitle = styled.p`
    margin: 0;
    font-size: 12px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const RateWrap = styled.div `
    display: flex;
    margin-bottom: 8px;

`;

const RateYellow = styled.div `
    width: 147px;
    height: 12px;
    border-radius: 20px;
    background-color: #FFFDF0;
`;

const RateBlue = styled.div `
    width: ${({ rate }) => rate}%;
    height: 12px;
    border-radius: 20px;
    background-color: #A0DEFF;
`;

const RateText = styled.p `
    margin: 0;
    font-size: 10px;
    margin-left: 9px;
`;

const Memo = styled.div `
    width: 195px;
    height: 112px;
    border-radius: 15px;
    background-color: #FBFBFB;
    display: flex;
    justify-content: center;
    padding-top: 11px;
`;

const MemoText = styled.p `
    font-size: 10px;
    width: 156px;
    height: 84px;
    overflow: hidden;
`;


const CardDetail = ({ onClose, category, rate }) => {
    const categoryData = {
        자기계발: '#FFF1F1',
        공부: '#FFE4CC',
        건강: '#E8FFE3',
        취미: '#E9F2FF',
        기타: '#F2E9FF',
      };
  return (
    <>
    <Popup color={categoryData[category]}>
        <Content>
          <MissionText>미션 내용</MissionText>
          <MissionDetail>
                <MissionCategory>{category}</MissionCategory>
                <MissionDifficulty>상</MissionDifficulty>
        </MissionDetail>
            <SubTitle>성취율</SubTitle>
            <RateWrap>
                <RateYellow>
                <RateBlue rate={rate}></RateBlue>
                </RateYellow>
                <RateText>{rate}%</RateText>
            </RateWrap>
            <SubTitle>메모</SubTitle>
            <Memo><MemoText>어쩌구저쩌구</MemoText></Memo>
            <CancelBtn src={cancel} onClick={onClose}/>
        </Content>
    </Popup>
    </>
  );
};

export default CardDetail;
