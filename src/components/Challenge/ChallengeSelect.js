import styled from "styled-components"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ChallengeSelectPage(){
    
    // 객체로 관리
    const categories = {
        1: "건강",
        2: "취미",
        3: "학습",
        4: "자기계발",
        5: "기타",
    };

    const levels = {
        1: "상",
        2: "중",
        3: "하",
        4: "랜덤",
    };

    // 체크박스 상태관리
    const [completeChecked, setcompleteChecked] = useState(false);
    function handleCompleteChange(event) {
        setcompleteChecked(event.target.checked);
    }

    const navigate = useNavigate();

    return(
        <MissionRootWrapper>
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
                
                    <MissionDrawBtn onClick={() => navigate(`/missioninitialAdd`)}>
                        미션 뽑기
                    </MissionDrawBtn>
                </DrawContainer>
                
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
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: start;
    align-self: center;
    justify-content: center;
    text-align: start;
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
    margin-top: 80px;
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
    margin-bottom: 85px;
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
