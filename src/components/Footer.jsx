import React from 'react';
import styled from 'styled-components';

const FooterDiv = styled.div`
  width: 365px;
  height: 102px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 28px;
  position: absolute;
  top: 869px;
  text-align: left;
  `;

const AppTitle = styled.h3 `
    font-size: 15px;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
    margin-bottom: 5px;
`;

const Team = styled.p `
    font-size: 12px;
    color: #ffffff;
    margin: 0;
    margin-bottom: 3px;
`;

const MemberDiv = styled.div `
  display: flex;
`;

const Member = styled(Team) `
    font-size: 10px;
    margin-right: 9px;
`;

const Position = styled(Member) `
    font-weight: bold;
    margin-right: 5px;
`;

const Club = styled.p `
  margin: 0;
  font-size: 12px;
  color: #ffffff;
  margin-top: 10px;
`;

const Footer = () => {

  return (
    <>
      <FooterDiv>
        <AppTitle>작심3일</AppTitle>
        <Team>N3W</Team>
        <MemberDiv><Position>백엔드</Position><Member>김미주 심수빈 정민주</Member><Position>프론트엔드</Position><Member> 박민주 박소이</Member></MemberDiv>
        <Club>DSWU CORNER</Club>
      </FooterDiv>
    </>
  );
};

export default Footer;
