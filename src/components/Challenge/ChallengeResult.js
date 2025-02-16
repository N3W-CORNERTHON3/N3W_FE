import styled from "styled-components"; 
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState } from "react";

export function ChallengeResultPage(){

    const location = useLocation();
    const mission = location.state?.mission.name || "미션을 찾을 수 없습니다.";
    const missionId = location.state?.mission.missionId || "미션을 찾을 수 없습니다.";
    // console.log("missionId", missionId);
    const navigate = useNavigate();

    const token = localStorage.getItem("authToken");
    // console.log("Your token", token);
    
    // 챌린지 시작 버튼 
    const handleChallengeStart = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `/api/missions/start/${missionId}`,
                {}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    }
                }
            );
            if (response.status === 200) {
                toast.success('미션이 시작되었습니다!', {
                    autoClose: 2000,
                    position: "top-center",
                });

                // 미션 상세(진행중) 페이지로 이동
                navigate(`/challengeIng/${missionId}`);
            }
        } catch (error) {
            console.error("데이터 전송 중 오류 발생:", error);
        }
    };

    return(
        <ChallengeRootWrapper>
            <ContentContainer>

                <HeaderText>
                    도전할 미션이 정해졌어요! <br />
                    지금 바로 시작해 볼까요?
                </HeaderText>
                <ChallengeImg src={"/ChallengeResult.png"} />

                <ResultText>
                    {mission}
                </ResultText>

                <ChallengeStartBtn 
                    onClick={handleChallengeStart}
                >
                    챌린지 시작
                </ChallengeStartBtn>
                <ReSelectBtn onClick={() => navigate(`/challengeSelect`)}>
                    다시 뽑기 
                </ReSelectBtn>
            </ContentContainer>
            
        </ChallengeRootWrapper>
    )
}


const ChallengeRootWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 393px;
    height: 852px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    margin-top: 50px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-content: center;
    text-align: center;
`;

const HeaderText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #5AB2FF;
    margin-bottom: 60px;
`;

const ChallengeImg = styled.img`
    width: 91px;
    height: 57px;
    color: #A0DEFF; 
`;

const ResultText = styled.p`
    font-size: 25px;
    font-weight: 900;
    color: black;
`;

const ChallengeStartBtn = styled.button`
    width: 65%;
    height: 60px;
    background-color: #5AB2FF;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 80px;

    &:hover {
        background-color: white;
        border: 2px solid #5AB2FF;
        color: #5AB2FF;
    }
`;

const ReSelectBtn = styled.button`
    width: 65%;
    height: 60px;
    background-color: #D9D9D9;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
        background-color: white;
        border: 3px solid #D9D9D9;
        color: #D9D9D9;
    }
`;