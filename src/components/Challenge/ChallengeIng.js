import styled from "styled-components"; 
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProcessChart from "./Chart";
import axios from 'axios'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ChallengeIngPage(){

    const navigate = useNavigate();
    const { missionId } = useParams();  
    // console.log("Mission ID", missionId);

    const [mission, setMission] = useState(null);
    const [checkedStates, setCheckedStates] = useState([false, false, false]);
    const [content, setContent] = useState("");
    
    const token = localStorage.getItem("authToken");

    // 상세 정보 요청
    const getMissionDetail = async () => {
        try {
            const response = await axios.get(`/api/missions/detail/${missionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                console.log("미션 상세 정보:", response.data);
                setMission(response.data);
            } 

        } catch (error) {
            console.error("상세 정보 요청 중 오류 발생:", error);
            return null;
        }
    };

    useEffect(() => {
        if (missionId) {
            getMissionDetail();
        }
    }, [missionId]);


    // 체크박스
    const handleCompleteChange =  async (index, missionId) => {
        const isChecked = !checkedStates[index];

        try {
            const endpoint = isChecked 
                ? `/api/missions/check/${missionId}`  // 체크 시
                : `/api/missions/uncheck/${missionId}`; // 체크 해제 시
    
            const response = await axios.put(
                endpoint,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 200) {
                setCheckedStates((prev) => {
                    const newState = [...prev];
                    newState[index] = isChecked; // 상태 업데이트
                    return newState;
                });
                console.log("체크 상태 변경:", response.data);
                toast.success(isChecked ? '오늘도 성공!' : '내일은 꼭..!', {
                    autoClose: 3000,
                    position: "top-center",
                });
            }
    
        } catch (error) {
            console.error("체크 상태 변경 중 오류 발생:", error);
        }
    };

    // 메모 저장
    const handleMemoChange = (e) => {
        setContent(e.target.value);
    };

    const handleSaveMemo = async () => {
        try {
            const response = await axios.put(
                `/api/missions/memo/${missionId}`, 
                { memo: content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.status === 200) {
                setContent(response.data.memo);
                console.log("메모 저장", response.data);
                toast.success('메모가 저장되었습니다.', {
                    autoClose: 3000,
                    position: "top-center",
                });
            } 

        } catch (error) {
            console.error("정보 처리 중 오류 발생:", error);
            return null;
        }
    };

    // 미션 상태 변경
    const changeMissionStatus = async () => {
        try {
            const response = await axios.put(`/api/missions/status/${missionId}/status`, 
                {},
                {
                    params: {
                        newStatus: "COMPLETE"
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                },
            );
    
            if (response.status === 200) {
                console.log("미션 상태 변경:", response.data);
                toast.success('미션을 완료했습니다!', {
                    autoClose: 3000,
                    position: "top-center",
                });
                navigate('/challengeComplete');
            } 

        } catch (error) {
            console.error("정보 처리 중 오류 발생:", error);
            return null;
        }
    };

    const levelMap = {
        'LOW': '하',
        'MEDIUM': '중',
        'HIGH': '상',
        'RANDOM': '랜'
    };
    
    const categoryMap = {
        'HEALTH': '건강',
        'STUDY': '학습',
        'SELF_IMPROVEMENT': '자기계발',
        'HOBBY': '취미',
        'ETC': '기타',
    };

    if (!mission) {
        return <div>로딩 중...</div>; 
    }


    return(
        <ChallengeRootWrapper>
            <ScrollContent>
                <ContentContainer>

                    <ChallengeHeaderWrapper>
                        <ChallengeDate>{mission.startDate} ~ {mission.endDate}</ChallengeDate>
                        <ChallengeHeaderContainer>
                            <Level>{levelMap[mission.level] || mission.level}</Level>
                            <Category>{categoryMap[mission.category] || mission.category}</Category>
                        </ChallengeHeaderContainer>
                        <MissionRectengle>
                            <MissionName>{mission.name}</MissionName>
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
                                            onChange={() => handleCompleteChange(index, mission.missionId)}
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
                        <ChallengeCompleteBtn 
                            onClick={changeMissionStatus}
                        >
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