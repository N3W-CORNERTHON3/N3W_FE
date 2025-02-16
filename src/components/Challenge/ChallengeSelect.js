import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ExeptionModal } from "./ExceptionModal";
import axios from 'axios'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 객체로 관리
export const categories = {
    1: "건강",
    2: "취미",
    3: "학습",
    4: "자기계발",
    5: "기타",
};

export const levels = {
    1: "상",
    2: "중",
    3: "하",
    4: "랜덤",
};

export function ChallengeSelectPage(){
    const [category, setCategory] = useState("");  
    const [level, setLevel] = useState("");  
    const [completeChecked, setcompleteChecked] = useState(false);  
    const [missions, setMissions] = useState([]); 

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };

    // 체크박스 상태관리
    function handleCompleteChange(event) {
        setcompleteChecked(event.target.checked);
    }

    // 예외처리 모달
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();

    // 형식 변환 (서버 전송)
    const categoryToEnglish = (category) => {
        switch (category) {
            case "건강": return "HEALTH";
            case "자기계발": return "SELF_IMPROVEMENT";
            case "취미": return "HOBBY";
            case "학습": return "STUDY";
        }
    };
    
    const levelToEnglish = (level) => {
        switch (level) {
            case "하": return "LOW";
            case "중": return "MEDIUM";
            case "상": return "HIGH";
            case "랜덤" : return "RANDOM";
        }
    };

    const token = localStorage.getItem("authToken");
    // console.log("Your token", token);

    // 주제 뽑기 버튼
    const handleMissionDraw = async (e) => {
        if (!category || !level) {
            toast.error('카테고리와 난이도를 모두 선택해주세요.', {
                autoClose: 3000,
                position: "top-center",
            })
        };
        
        const categoryInEnglish = categoryToEnglish(category);
        const levelInEnglish = levelToEnglish(level);

        try {
            // API 요청 보내기
            const response = await axios.get(
                "/api/missions/random",
                {
                    params: {
                        category: categoryInEnglish,  
                        level: levelInEnglish,        
                        includeCompleted: completeChecked  
                    },
                    
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                },
            );

            console.log("Server response:", response.data);
            setMissions(response.data);  // 미션 상태에 저장
            navigate("/challengeResult", { state: { mission: response.data } }); 

        } catch (error) {
            console.error("API 요청 중 오류 발생:", error);
            // 404오류 (선택한 옵션에 미션 없음) 모달 표시
        if (error.response.status === 404) {
            openModal(); 
        } else {
            console.error("데이터 전송 중 오류 발생", error);
        }
        }
    };

    return(
        <ChallengeRootWrapper>
            <ContentContainer>

                <CategoryContainer>
                    <HeaderText1>
                        STEP 1 <br />
                        원하는 카테고리를 선택해 주세요.
                    </HeaderText1>
                    <CategoryRadioWrapper>
                        {Object.entries(categories).map(([key, value]) => (
                            <OriginRadioBox key={`category-${key}`}>
                                <InfoRadioBoxInput
                                    type="radio"
                                    id={`category-${key}`}
                                    name="category"
                                    value={value}
                                    onChange={handleCategoryChange}
                                />
                                <CustomRadioBtn htmlFor={`category-${key}`}>
                                    <InfoCheckBoxSpan>{value}</InfoCheckBoxSpan>
                                </CustomRadioBtn>
                            </OriginRadioBox>
                        ))}
                    </CategoryRadioWrapper>
                </CategoryContainer>

                <LevelContainer>
                    <HeaderText2>
                        STEP 2 <br />
                        원하는 난이도를 선택해 주세요.
                    </HeaderText2>
                    <LevelRadioWrapper>
                        {Object.entries(levels).map(([key, value]) => (
                            <OriginRadioBox key={`level-${key}`}>
                                <InfoRadioBoxInput
                                    type="radio"
                                    id={`level-${key}`}
                                    name="levels"
                                    value={value}
                                    onChange={handleLevelChange}
                                />
                                <CustomRadioBtn htmlFor={`level-${key}`}>
                                    <InfoCheckBoxSpan>{value}</InfoCheckBoxSpan>
                                </CustomRadioBtn>
                            </OriginRadioBox>
                        ))}
                    </LevelRadioWrapper>
                </LevelContainer>


                <DrawContainer>
                    <QuesText>어떤 미션이 나올까요?</QuesText>
                    
                    <CheckboxWrapper>
                        <CheckboxStyle
                            type="checkbox"
                            id="single-checkbox"
                            name="singleOption"
                            checked={completeChecked}
                            onChange={handleCompleteChange}
                        ></CheckboxStyle>
                        <StyledLabel htmlFor="single-checkbox">
                            <InfoCheckBoxSpan>완료된 미션 포함하기</InfoCheckBoxSpan>
                        </StyledLabel>
                    </CheckboxWrapper>
                
                    <MissionDrawBtn onClick={handleMissionDraw}>
                        미션 뽑기
                    </MissionDrawBtn>
                </DrawContainer>

                {isModalOpen && (
                    <ExeptionModal
                        isModalOpen={isModalOpen}
                        closeModal={closeModal}
                    />
                )}
                
            </ContentContainer>
            
        </ChallengeRootWrapper>
    )
}


const ChallengeRootWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 393px;
    height: 852px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    margin-top: 50px;
`;

const ContentContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: start;
    align-self: center;
    justify-content: center;
    text-align: start;
    margin-top: 110px;
`;

const HeaderText1 = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-left: 10px;
    margin-bottom: 25px;
`;

const HeaderText2 = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-left: 10px;
    margin-bottom: 25px;
`;

const DrawContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
`;

const QuesText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
`;

const MissionDrawBtn = styled.button`
    width: 55%;
    height: 48px;
    background-color: #5AB2FF;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 30px;

    &:hover {
        background-color: white;
        border: 2px solid #5AB2FF;
        color: #5AB2FF;
    }
`;

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin-bottom: 75px;
`;

const CategoryRadioWrapper = styled.div`
    display: flex;
    flex-wrap: wrap; // 자동 줄바꿈
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 86%;
    margin-left: 10px;
`;

const LevelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
`;

const LevelRadioWrapper = styled.div`
    display: flex;
    flex-wrap: wrap; // 자동 줄바꿈
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 7px;
    width: 85%;
    margin-left: 7px;
`;

const OriginRadioBox = styled.div`
    display: flex;
    align-items: center;
    width: calc(37.5% - 20px);
    margin-bottom: 0;
`;

const InfoRadioBoxInput = styled.input`
    appearance: none;
`;

const CustomRadioBtn = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    padding: 9px;
    background-color: #CAF4FF;
    border-radius: 20px;
    cursor: pointer;
    width: 90px;
    height: 18px;
    margin-bottom: 5px;

    &:hover {
        background-color: #5AB2FF;
        color: white;
    }

    input:checked + & {
        background-color: #5AB2FF;
        color: white;
        font-weight: bold;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4); 
    }
`;

const InfoCheckBoxSpan = styled.span`

`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const CheckboxStyle = styled.input`
    appearance: none;
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 3px;
    background-color: #D9D9D9;

    &:checked {
        border-color: transparent;
        background-image: url("/WhiteCheck.svg");
        background-size: 15px 15px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: #5AB2FF;
    }
`;

const StyledLabel = styled.div`
    color: black;
    font-size: 16px;
    font-weight: 500;
`;
