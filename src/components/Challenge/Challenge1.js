import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";

export function ChallengePage1(){


    const navigate = useNavigate();

    return(
        <MissionRootWrapper>
            <ContentContainer>

                <MainImg src="/ChallengeMain.png" />

                <HeaderText>
                    <span className="highlight">아직 도전할 챌린지가 없습니다! </span> <br />
                    오늘은 어떤 새로운 도전을 시작해 볼까요?
                </HeaderText>


                <MissionAddBtn onClick={() => navigate(`/challengeSelect`)}>
                    랜덤 미션 받으러 가기 
                </MissionAddBtn>
            </ContentContainer>
            
        </MissionRootWrapper>
    )
}


const MissionRootWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 393px;
    height: 852px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    margin-top: 50px;
    background-color: #A0DEFF;
`;

const ContentContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: start;
    align-self: center;
    justify-content: center;
    text-align: start;
    transform: translateY(-50px);
`;

const MainImg = styled.img`
    width: 280px;
    height: 180px;
    color: #A0DEFF; 
    margin-bottom: 40px;
    align-self: center;
`;

const HeaderText = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: black;
    margin-left: 10px;
    text-align: center;

    .highlight{
        font-size: 22px;
    }
`;

const MissionAddBtn = styled.button`
    width: 69%;
    height: 75px;
    background-color: #FFF9D0;
    color: black;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 90px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    align-self: center;

    &:hover {
        color: #5AB2FF;
    }
`;