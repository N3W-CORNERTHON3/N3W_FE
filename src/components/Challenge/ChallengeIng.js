import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProcessChart from "./Chart";

export function ChallengeIngPage(){

    const navigate = useNavigate();

    // 체크박스 상태 관리 
    const [checkedStates, setCheckedStates] = useState([false, false, false]);
    const handleCompleteChange = (index) => {
        setCheckedStates((prev) => {
            const newState = [...prev];
            newState[index] = !newState[index];
            return newState;
        });
    };

    // 메모 상태 관리
    const [content, setContent] = useState("");
    
    const handleMemoChange = (e) => {
        setContent(e.target.value);
    };

    const handleSaveMemo = () => {
        console.log("저장된 메모:", content);
    };


    return(
        <ChallengeRootWrapper>
            <ScrollContent>
                <ContentContainer>

                    <ChallengeHeaderWrapper>
                        <ChallengeDate>2025.02 ~ 2025.02.03</ChallengeDate>
                        <ChallengeHeaderContainer>
                            <Level>하</Level>
                            <Category>건강</Category>
                        </ChallengeHeaderContainer>
                        <MissionRectengle>
                            <MissionName>하루에 만보 걷기</MissionName>
                        </MissionRectengle>
                    </ChallengeHeaderWrapper>
                    
                    <ChallengeCheckbox>
                            <DayContainer>
                                {["1일 차", "2일 차", "3일 차"].map((day, index) => (
                                    <DayText key={index}>{day}</DayText>
                                ))}
                            </DayContainer>
                                    
                            <CheckboxRow>
                                {checkedStates.map((checked, index) => (
                                    <CheckboxWrapper key={index}>
                                        <CheckboxStyle
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            checked={checked}
                                            onChange={() => handleCompleteChange(index)}
                                        />
                                    </CheckboxWrapper>
                                ))}
                            </CheckboxRow>
                    </ChallengeCheckbox>
                    
                    <ChartWrapper>
                        <ProcessChart checkedStates={checkedStates} />
                    </ChartWrapper>

                    <MemoContainer>
                        <MemoDayText>MEMO</MemoDayText>
                        <DetailRectangle>
                            <ContentDayTextArea
                                value={content}
                                onChange={handleMemoChange}
                                placeholder="여기에 입력하세요..."
                            />
                        </DetailRectangle>
                        <SaveButtonWrapper>
                            <MemoSaveBtn onClick={handleSaveMemo}>저장</MemoSaveBtn>
                        </SaveButtonWrapper>
                    </MemoContainer>
                    
                    <CompleteBtnWrapper>
                        <ChallengeCompleteBtn onClick={() => navigate(`/`)}>
                            챌린지 완료하기
                        </ChallengeCompleteBtn>
                    </CompleteBtnWrapper>

                </ContentContainer>
            </ScrollContent>
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

const ScrollContent = styled.div`
    width: 95%;
    height: 85%;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 0px;
        height: 0px; 
    }
`

const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
`;

const ChallengeHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    margin-bottom: 40px;
    width: 98%;
`;

const ChallengeDate = styled.span`
    font-size: 17px;
    color: black;
    font-weight: bold;
`;

const ChallengeHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 5px;
    margin-bottom: 10px;
    margin-top: 18px;
    width: 90%;
`;

const Level = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: black;
    background-color: #FFF9D0;
    border-radius: 25px;
    border: none;
    width: 20px;
    height: 20px;
    padding: 1px;
`;

const Category = styled.span`
    font-size: 15px;
    font-weight: 500;
    color: black;
`;

const MissionRectengle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: none;
    border-radius: 8px;
    width: 100%;
    height: 45px;
    background-color: #A0DEFF;
    box-sizing: border-box;
    padding: 10px;
    flex-shrink: 0;
`;

const MissionName = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: black;
`;

const ChallengeCheckbox = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%
`;

const DayContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 40px;
    margin-bottom: 10px;
`;

const DayText = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

const CheckboxRow = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 55px;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 5px;
`;

const CheckboxStyle = styled.input`
    appearance: none;
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 3px;
    background-color: #D9D9D9;

    &:checked {
        border-color: transparent;
        background-image: url("/WhiteCheck.svg");
        background-size: 25px 25px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: #5AB2FF;
    }
`;

const MemoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 7px;
    width: 90%;
`;

const MemoDayText = styled.span`
    font-size: 25px;
    font-weight: bold;
    color: black;
    margin-left: 20px;
`;

const DetailRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border-radius: 20px;
    width: 100%;
    height: 136px;
    background-color: #FFF9D0;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 5px;
    margin-left: 10px;
    flex-shrink: 0;
`;

const ContentDayTextArea = styled.textarea`
	color: black;
	font-size: 19px;
	font-family: Inter, sans-serif;
	font-weight: 400;
    overflow-y: auto;
    background-color: transparent;
    width: 100%;
    height: 80%;
    border: none;
    resize: none; 
    outline: none; 

    &::placeholder {
        color: #A1A0A0;
        font-size: 15px;
    }
    &:focus {
        outline: none; 
    }

    &::-webkit-scrollbar {
		width: 10px; 
        height: 8px;
		right: 30px; 
	}
	
	&::-webkit-scrollbar-thumb {
		background-color: #FFEA63;
		border-radius: 15px;
		backdrop-filter: blur(50px);
		margin-right: 15px;
	}
`;

const SaveButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;

const MemoSaveBtn = styled.button`
    width: 59px;
    height: 30px;
    background-color: #FFF9D0;
    color: black;
    font-size: 15px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        color: #5AB2FF;
    }
`;

const CompleteBtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 95%;
    margin-top: 15px;
`;

const ChallengeCompleteBtn = styled.button`
    width: 170px;
    height: 50px;
    background-color: #5AB2FF;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
    border-radius: 22px;
    cursor: pointer;
    padding: 10px;

    &:hover {
        background-color: white;
        border: 3px solid #5AB2FF;
        color: #5AB2FF;
    }
`;

const ChartWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 70px;
`;