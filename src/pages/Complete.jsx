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

    const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리
    
      const handleOpenPopup = () => {
        setShowPopup(true); // 플러스 버튼 클릭 시 팝업 열기
      };
    
      const handleClosePopup = () => {
        setShowPopup(false); // 팝업 닫기
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
        <Header/>
        <Content>
            <CategoryWrap>
              {categoryData.map((category, index) => (
                <Category key={index} style={{ backgroundColor: category.color }}>
                  {category.name}
                </Category>
              ))}
            </CategoryWrap>
            <CardWarp>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
                <Cards onClick={handleOpenPopup} category={"study"} number={5}/>
            </CardWarp>
        {showPopup && <CardDetail onClose={handleClosePopup} />} {/* 팝업 표시 */}

    </Content>
    <Footer/>
    </Display>
    </>
  );
};

export default Complete;
