import React, {useState} from "react";
import styled from "styled-components";

export function MissionInitial2page(){
    const categories = ["건강", "자기계발", "취미", "학습", "기타"];
    const levels = ["하", "중", "상"];

    // 상태 관리
    const [missions, setMissions] = useState([
        { category: "건강", level: "하", content: "만보걷기" }, 
        { category: "", level: "", content: "" },
        { category: "", level: "", content: "" }
    ]);
    // const [selectedCategory, setSelectedCategory] = useState("");
    // const [selectedLevel, setSelectedLevel] = useState("");
    // const [missionContent, setMissionContent] = useState("");

    // const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    // const handleLevelChange = (e) => setSelectedLevel(e.target.value);
    // const handleMissionChange = (e) => setMissionContent(e.target.value);

    const addMission = () => {
        setMissions([...missions, { category: "", level: "", content: "" }]);
    };
    
    const removeMission = (index) => {
        if (missions.length > 3) {
            setMissions(missions.filter((_, i) => i !== index));
        }
    };

    const updateMission = (index, key, value) => {
        const newMissions = missions.map((mission, i) =>
            i === index ? { ...mission, [key]: value } : mission
        );
        setMissions(newMissions);
    };

    // 미션 3개이상 입력 필수수
    const showInfoText = missions.filter(mission => mission.category === "" || mission.level === "" || mission.content === "").length > 0 || missions.length < 3;

    const complete =(e) =>{
        console.log("완료버튼");
    }

    return(
        <MissionRootWrapper>
            <ContentWrapper>
                <HeaderText>도전하고 싶은 미션을 입력하세요.</HeaderText>
                <HeaderText2>카테고리와 난이도를 직접 설정할 수 있습니다.</HeaderText2>

                
                <ScrollContent>
                    {missions.map((mission, index) => (
                        <ContentContainer key={index}>
                            {index >= 3 && (
                                    <RemoveBtn onClick={() => removeMission(index)}>ㅡ</RemoveBtn>
                                )}
                            <CategoryContainer>
                                {index === 0 && ( <CategoryText>카테고리</CategoryText>)}  
                                <CategorySelectDropdown 
                                    value={mission.category}
                                    onChange={(e) => updateMission(index, "category", e.target.value)}
                                >   
                                    <option value="">선택</option>
                                    {categories.map((category, i) => (
                                        <option key={i} value={category}>{category}</option>
                                    ))}
                                </CategorySelectDropdown>
                                
                            </CategoryContainer>
                            
                            <LevelContainer>
                                {index === 0 && (<LevelText>난이도</LevelText>)}
                                <LevelSelectDropdown 
                                    value={mission.level}
                                    onChange={(e) => updateMission(index, "level", e.target.value)}
                                >
                                    <option value="">선택</option>
                                    {levels.map((level, i) => (
                                        <option key={i} value={level}>{level}</option>
                                    ))}
                                </LevelSelectDropdown>
                            </LevelContainer>
                            
                            <MissionContentContainer>
                                {index === 0 && (<MissionText>미션 내용</MissionText>)}
                                <MissionInput
                                    type="text"
                                    value={mission.content}
                                    onChange={(e) => updateMission(index, "content", e.target.value)}
                                    placeholder={index === 0 ? "예: 국어 교과서 1단원 읽기" : "미션 내용을 입력하세요."}
                                />
                            </MissionContentContainer>

                            
                            
                        </ContentContainer>
                    ))}
                </ScrollContent>
                <PlusBtn
                    onClick={addMission}
                >
                    +
                </PlusBtn>

                {showInfoText && <InfoText>미션이 최소 3개 이상 필요해요! 모두 입력해주세요.</InfoText>}
                <MissionConfirmBtn onClick={complete}>
                    완료하기 
                </MissionConfirmBtn>
            </ContentWrapper>
            
            
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

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 87%;
    // transform: translateY(-20px);
`

const HeaderText = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin: 0;
    margin-bottom: 10px;
`;

const HeaderText2 = styled.p`
    font-size: 15px;
    font-weight: 600;
    color: #5AB2FF;
    margin: 0;
    margin-bottom: 10px;
`;

const ScrollContent = styled.div`
    width: 100%;
    height: 32vh;
    overflow-y: auto;
    padding: 10px;
    
    &::-webkit-scrollbar {
        width: 6px;
        height: 0px; 
    }

    &::-webkit-scrollbar-thumb {
        background-color: #5AB2FF;
        border-radius: 15px;
        backdrop-filter: blur(50px);
    }

    &::-webkit-scrollbar-track {  
        margin-top: 40px; 
`

const ContentContainer = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row;
    //justify-content: space-between;
    align-items: center;
    margin-right: 10px;
    margin-top: 20px;
    gap: 8px;
`;

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
`;

const CategoryText = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #333;
    margin-left: 3px;
`;

const LevelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 80%;
`;

const LevelText = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #333;
    margin-left: 3px;
`;

const CategorySelectDropdown = styled.select`
    width: 100%;
    font-size: 14px;
    border-radius: 20px;
    border: 2px solid black;
    padding: 10px;
    min-width: 110px; 
    cursor: pointer;
`;

const LevelSelectDropdown = styled.select`
    width: 67px;
    font-size: 14px;
    border-radius: 20px;
    border: 2px solid black;
    padding: 10px;
    min-width: 78px; 
    cursor: pointer;
    background-color: white;
`;

const MissionContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
`;

const MissionText = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: #333;
    margin-left: 3px;
`;

const MissionInput = styled.input`
    width: 120px;
    padding: 8px;
    font-size: 14px;
    border-radius: 8px;
    border: 2px solid black;
`;

const RemoveBtn = styled.button`
    color: black;
    background-color: transparent;
    border: none;
    font-size: 15px;
    font-weight: 900;
    cursor: pointer;
`;

const PlusBtn = styled.button`
    width: 90%;
    height: 45px;
    background-color: white;
    color: #5AB2FF;
    font-size: 35px;
    font-weight: bold;
    border: 2px solid #5AB2FF;
    border-radius: 20px;
    cursor: pointer;
    align-self: center;
    margin-top: 20px;
    margin-bottom: 50px;

    &:hover {
        background-color: #5AB2FF;
        color: white;
    }
`;

const InfoText = styled.p`
    font-size: 12px;
    font-weight: semi-bold;
    color: red;
    margin: 0;
`;

const MissionConfirmBtn = styled.button`
    width: 94%;
    height: 45px;
    background-color: #5AB2FF;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    align-self: center;

    &:hover {
        background-color: white;
        border: 2px solid #5AB2FF;
        color: #5AB2FF;
    }
`;