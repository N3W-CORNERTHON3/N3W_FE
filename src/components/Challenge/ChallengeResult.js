import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";

export function ChallengeResultPage(){

    const navigate = useNavigate();

    return(
        <ChallengeRootWrapper>
            <ContentContainer>

                <HeaderText>
                    도전할 미션이 정해졌어요! <br />
                    지금 바로 시작해 볼까요?
                </HeaderText>
                <ChallengeImg src={"/ChallengeResult.png"} />

                <ResultText>
                    하루에 만보 걷기
                </ResultText>

                <ChallengeStartBtn onClick={() => navigate(`/challengeSelect`)}>
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