import React from 'react';
import styled from 'styled-components';
import star from '../../images/Star.png';
import noStar from '../../images/NoStar.png';

const categoryColors = {
  SELF_IMPROVEMENT: '#FFF1F1',    // 자기계발 카테고리 색상
  STUDY: '#FFE4CC',     // 공부 카테고리 색상
  HEALTH: '#E8FFE3',      // 건강 카테고리 색상
  HOBBY: '#E9F2FF',    // 취미 카테고리 색상
  ETC: '#F2E9FF',    // 기타 카테고리 색상
  };

const Card = styled.div `
    width: 115px;
    height: 140px;
    border-radius: 15px;
    background-color: ${({ category }) => categoryColors[category] || '#E5E5E5'};  // 카테고리에 따라 배경색 변경
    display: flex;
    flex-direction: column;
    align-items:center;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
    margin-bottom: 36px;

    &:hover {
        background-color: ${({ category }) => categoryColors[category] ? darkenColor(categoryColors[category], 0.1) : '#ccc'};
    }
    `;

const CardContent = styled.div `
  width: 100px;
  padding: 18px 0 15px 0;
  border-bottom: 1px solid #B0B0B0;
  display: flex;
  flex-direction: column;
  align-items:center;
`;

const Mission = styled.p `
  font-size: 15px;
  margin: 0;
`;

const MissionNum = styled.p `
  font-size: 40px;
  margin: 0;
`;

const StarWrap = styled.div `
  width: 90px;
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
`;

const Star = styled.img `
`;

// 색상을 어둡게 만드는 함수 (옵션)
const darkenColor = (color, percentage) => {
    const colorCode = color.slice(1);
    const num = parseInt(colorCode, 16);
    const amt = Math.round(2.55 * percentage * 100);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`;
  };

const Cards = ({ onClick, category, number, achievement}) => {
  const stars = Array(3)
    .fill(noStar)
    .map((_, index) => (index < achievement ? star : noStar));
  
  return (
    <>
         <Card category={category} onClick={onClick}>
            <CardContent>
                <Mission>mission</Mission>
                <MissionNum>{number}</MissionNum>
            </CardContent>
            <StarWrap>
            {stars.map((src, index) => (
            <Star key={index} src={src} />
          ))}
                </StarWrap>
        </Card>
        
    </>
  );
};

export default Cards;
