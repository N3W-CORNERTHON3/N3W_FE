import { MdOutlineFlag } from "react-icons/md";
import styled from "styled-components"; 

export function MissionInitial1page(){
    return(
        <MissionRootWrapper>
            <ContentContainer>

                <MissionText1>
                    <span className="highlight">작심 3일</span>이 처음이신가요?
                </MissionText1>
                <MissionText2>
                    아래의 <span className="highlight">미션 추가하기</span> 버튼을 <br/>
                    이루고 싶은 목표를 추가해 주세요.
                </MissionText2>

                <MissionIcon />

                <MissionAddBtn>
                    미션 추가하기 
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
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    align-self: center;
    justify-content: center;
    text-align: start;
    transform: translateY(-50px);
`;

const MissionText1 = styled.div`
    font-size: 20px;
    font-weight: 400;
    color: black;
    margin-left: 10px;

    .highlight {
        font-weight: bolder; 
    }
`;

const MissionText2 = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: black;
    margin-left: 10px;

    .highlight {
        font-weight: bolder; 
    }
`;

const MissionIcon = styled(MdOutlineFlag)`
    font-size: 120px;
    color: #A0DEFF; 
    margin-bottom: 10px;
    align-self: center;
`;

const MissionAddBtn = styled.button`
    width: 95%;
    height: 45px;
    background-color: #5AB2FF;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 55px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    align-self: center;

    &:hover {
        background-color: white;
        border: 2px solid #5AB2FF;
        color: #5AB2FF;
    }
`;