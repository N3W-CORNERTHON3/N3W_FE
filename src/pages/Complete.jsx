import React, { useState } from 'react';

import styled from 'styled-components';
import Cards from '../components/Challenge/Cards.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CardDetail from '../components/Challenge/CardDetail.jsx';
import { useEffect } from 'react';
import axios from 'axios';

const Display = styled.div `
    width: 393px;
    height: 852px;
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: 50px;
    background-color: #fff;
    `;

const CategoryWrap = styled.div `
    width: 320px;
    display: flex;
    justify-content: space-around;
    margin-top: 90px;
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
    align-items: flex-start;
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
    
    const [cards, setCards] = useState([]); // 카드드

    const handleOpenPopup = (cardData) => {
        setSelectedCard(cardData);  // 선택된 카드 데이터를 설정
        setShowPopup(true);  // 팝업 열기
      };
      
    
      const handleClosePopup = () => {
        setShowPopup(false); // 팝업 닫기
      };

      const fetchMissions = async () => {
        try {
          const token = localStorage.getItem('authToken');
      
          const response = await axios.get('/api/achive/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          
      
          // 여기서 response.data.data를 사용해야 실제 미션 목록을 가져옴
          setCards(response.data.data);
        } catch (error) {
          console.error('Error fetching missions:', error);
        }
      };
      
      useEffect(() => {
        fetchMissions(); // 컴포넌트 마운트 시 실행
      }, []);
      
      const categoryMap = {
        STUDY: '공부',
        HEALTH: '건강',
        DEVELOP: '자기계발',
        HOBBY: '취미',
        OTHERS: '기타',
      };
    

    const categoryData = [
        { name: '전체', color: '#E5E5E5' },
        { name: '자기계발', color: '#FFF1F1' },
        { name: '공부', color: '#FFE4CC' },
        { name: '건강', color: '#E8FFE3' },
        { name: '취미', color: '#E9F2FF' },
        { name: '기타', color: '#F2E9FF' },
      ];
      
    
      return (
        <>
        <Display>

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
      key={card.missionId} 
      onClick={() => handleOpenPopup(card)} 
      category={card.category} 
      number={card.achievement} // 또는 다른 숫자 값
      title={card.name} // 카드 제목 추가 (필요하면)
    />
  ))}
            </CardWarp>
            
    </Content>
    {showPopup && selectedCard && (
  <CardDetail onClose={handleClosePopup} card={selectedCard} category={categoryMap[selectedCard.category]} rate={33}/>
)} 
    </Display>
    </>
  );
};

export default Complete;