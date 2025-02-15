import React, { useState } from 'react';

import styled from 'styled-components';
import Cards from '../components/Challenge/Cards.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CardDetail from '../components/Challenge/CardDetail.jsx';

const Display = styled.div `
    width: 393px;
    height: 852px;
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
    align-items:center;
`;

const CategoryWrap = styled.div `
    width: 320px;
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
    padding: 0 5px 18px 5px;
    border-bottom: 1px solid #B0B0B0;
`;

const Category = styled.div `
    width: 46px;
    height: 20px;
    border-radius: 50px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div `
    width: 393px;
    display: flex;
    flex-direction: column;
    align-items:center;
     filter: ${({ showPopup }) => (showPopup ? 'blur(5px)' : 'none')}; // 모달이 열리면 블러 처리
//   transition: filter 0.3s ease;  // 부드러운 전환 효과
`;

const CardWarp = styled.div`
  width: 365px;
  height: 595px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  gap: 0;
  margin-top: 22px;
  overflow-y: scroll;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; 
  }
  -ms-overflow-style: none;  
  scrollbar-width: none;  
`;

const Complete = () => {

    const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 데이터 상태

    const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리
    
    const handleOpenPopup = (cardData) => {
        setSelectedCard(cardData);  // 선택된 카드 데이터를 설정
        setShowPopup(true);  // 팝업 열기
      };
      
    
      const handleClosePopup = () => {
        setShowPopup(false); // 팝업 닫기
      };

      const categoryMap = {
        develope: '자기계발',
        study: '공부',
        health: '건강',
        hobby: '취미',
        others: '기타',
    };

    const categoryData = [
        { name: '전체', color: '#E5E5E5' },
        { name: '자기계발', color: '#FFF1F1' },
        { name: '공부', color: '#FFE4CC' },
        { name: '건강', color: '#E8FFE3' },
        { name: '취미', color: '#E9F2FF' },
        { name: '기타', color: '#F2E9FF' },
      ];

      const cards = [
        {
            id: 1,
            category: 'develope',  // 영어로 된 카테고리
            title: '독서 30분',
            description: '매일 아침 30분 독서를 통해 지식과 사고력을 향상시키기 위한 도전입니다.',
            number: 5,
        },
        {
            id: 2,
            category: 'study',  // 영어로 된 카테고리
            title: '영어 단어 암기',
            description: '하루에 20개의 영어 단어를 외워 어휘력을 늘려나가요.',
            number: 7,
        },
        {
            id: 3,
            category: 'health',
            title: '매일 5km 달리기',
            description: '매일 5km를 달리며 건강을 유지하고 체력을 단련합니다.',
            number: 10,
        },
        {
            id: 4,
            category: 'hobby',
            title: '기타 연습',
            description: '매일 1시간씩 기타를 연습하여 연주 실력을 향상시키는 도전입니다.',
            number: 8,
        },
        {
            id: 5,
            category: 'others',
            title: '명상 10분',
            description: '매일 10분간 명상을 하여 마음의 평화를 찾고 스트레스를 해소합니다.',
            number: 4,
        },
    ];
      
    
      return (
        <>
        <Display>
        <Header/>
        <Content showPopup={showPopup}>
            <CategoryWrap>
              {categoryData.map((category, index) => (
                <Category key={index} style={{ backgroundColor: category.color }}>
                  {category.name}
                </Category>
              ))}
            </CategoryWrap>
            <CardWarp>
            {cards.map((card, index) => (
                <Cards 
                    key={index}
                    onClick={() => handleOpenPopup(card)} // 카드 클릭 시 해당 카드 데이터 전달
                    category={card.category} 
                    number={card.number}
                />
                ))}
            </CardWarp>
            
    </Content>
    {showPopup && selectedCard && (
  <CardDetail onClose={handleClosePopup} card={selectedCard} category={categoryMap[selectedCard.category]} rate={33}/>
)} 
    <Footer/>
    </Display>
    </>
  );
};

export default Complete;