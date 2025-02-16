import React from 'react';
import styled from 'styled-components';

const missionColors = {
  ING: '#FFEA63', // 진행중
  INCOMPLETE: '#FFF9D0', // 미완료
  COMPLETE: '#D9D9D9', // 완료
};


const MissionDiv = styled.div`
  width: 340px;
  height: 45px;
  background-color: ${({ type }) => missionColors[type] || '#E5E5E5'}; // 상태에 따라 배경색 변경
  margin-bottom: 10px;
  padding: 7px 0px 7px 8px;
  `;

const MissionDetail = styled.div `
    display: flex;
`;

const MissionCategory = styled.p`
  background-color: ${({ color }) => color};
  border-radius: 5px;
  font-size: 10px;
  color: #000;
  margin: 0;
    width: 52px;
    height: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
`;

const MissionDifficulty = styled.p`
  width: 17px;
  height: 12px;
  background-color: #5AB2FF;
  font-size: 10px;
  color: #fff;
  margin: 0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MissionText = styled.p`
  flex-grow: 1;
  font-size: 14px;
  margin: 0;
  margin-left: 10px;
  margin-top: 8px;
`;

const levelMap = {
  HIGH: '상',
  MEDIUM: '중',
  LOW: '하',
};

const categotyMap = {
  SELF_IMPROVEMENT:'자기계발',
    STUDY:'공부',
    HEALTH:'건강',
    HOBBY:'취미',
    ETC:'기타',
};

const Mission = ({ type, category, text, onClick, level  }) => {
  const categoryData = {
    자기계발: '#FFF1F1',
    공부: '#FFE4CC',
    건강: '#E8FFE3',
    취미: '#E9F2FF',
    기타: '#F2E9FF',
  };
  

  return (
    <MissionDiv type={type} onClick={onClick}>
        <MissionDetail>
        <MissionCategory color={categoryData[categotyMap[category]]}>{categotyMap[category]}</MissionCategory>
        <MissionDifficulty>{levelMap[level]}</MissionDifficulty> {/* 영 -> 한 변환된 값 사용 */}
        </MissionDetail>
      <MissionText>{text}</MissionText>
    </MissionDiv>
  );
};

export default Mission;
