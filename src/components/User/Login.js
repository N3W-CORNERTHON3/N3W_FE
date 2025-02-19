import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function LoginPage() {

    // 사용자 폼 저장
    const [formData, setFormData] = useState({
        id: "",
        password: "",
    });

    // 폼 입력 시 변경
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    // 로그인 버튼 
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post(
            "/api/member/login",
            formData,
        );

        console.log("Response Data:", response.data);

        if (response.data.success) {
            toast.success('로그인에 성공했습니다!', {
                autoClose: 3000,
                position: "top-center",
            });

        // 토큰 저장 
        localStorage.setItem("authToken", response.data.data.token);
        console.log("Your token", response.data.data);

        // 로그인 성공 후 미션 존재 여부 확인
        const token = localStorage.getItem("authToken");
        const missionResponse = await axios.get("/api/missions/exists", {
            headers: {
                Authorization: `Bearer ${token}`,  
            }
        });
        
        console.log(missionResponse);

        if (missionResponse.data.hasRegisteredMission === true) {
            // 미션이 있을 경우
            navigate("/mission");
        } else {
            // 미션이 없을 경우 (초기 사용자)
            navigate("/missioninitial");
        }

        } else {
            // console.log("로그인 실패");
            toast.error('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.', {
                autoClose: 3000,
                position: "top-center",
            });
        }

        } catch (error) {
            console.error("데이터 전송 중 오류 발생:", error);
            toast.error('로그인 중 오류가 발생했습니다.', {
                autoClose: 3000,
                position: "top-center",
            });
        }
    };
	
    return(
        <LoginRootWrapper>
            <IntroduceContainer>
                <LogoImg src="/MainLogo.png" />

                <HeaderText1>
                    안녕하세요.<br/>
                    <span className="highlight">"작심 3일"</span>
                    입니다.
                </HeaderText1>
                <HeaderText2>
                    작심 3일이 목표! <br/>
                    부담 없는 기간, 랜덤 미션과 성취를 기록해 <br/>
                    여러분만의 챌린지를 완료해 보세요! <br/>
                </HeaderText2>
            </IntroduceContainer>
            
            <ContentContainer>
                <IdInputBox
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    placeholder={"아이디(닉네임)"}
                />

                <PasswordInputBox
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={"비밀번호"}
                />

                <LoginButton
                    onClick={handleSubmit}
                    $disabled={!formData.id || !formData.password}
                >
                    로그인
                </LoginButton>

                <SigninButton onClick={() => navigate(`/signin`)}>
                회원가입
                </SigninButton>
            </ContentContainer>

        </LoginRootWrapper>
    )
}


const LoginRootWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 393px;
    height: 852px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    margin-top: 50px;
`;

const IntroduceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: start;
    margin-right: 30px;
    margin-top: 100px;
`;

const LogoImg = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-shadow: 7px 7px 15px rgba(0, 0, 0, 0.1); 
`;

const HeaderText1 = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: black;
    margin-left: 17px;
    margin-top: 22px;

    .highlight {
        font-size: 25px; 
        font-weight: bolder; 
    }
`;

const HeaderText2 = styled.p`
    font-size: 15px;
    font-weight: 500;
    color: black;
    line-height: 1.5;
    margin-top: 20px;
    margin-left: 17px;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-top: 30px;
`;

const IdInputBox = styled.input`
    width: 95%;
    height: 45px;
    border: none;
    border-bottom: 2px solid  #5AB2FF;
    font-size: 15px;
    margin-bottom: 10px;

    &:focus{
        outline: none;
    }
`;

const PasswordInputBox = styled.input`
    width: 95%;
    height: 45px;
    border: none;
    border-bottom: 2px solid  #5AB2FF;
    font-size: 15px;
    margin-bottom: 10px;
    margin-top: 15px;
    
    &:focus{
        outline: none;
    }
`;

const LoginButton = styled.button`
    width: 95%;
    height: 45px;
    background-color: ${(props) => props.$disabled ? '#d3d3d3' : '#5AB2FF'};
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 55px;

    &:hover {
    &:hover {
        background-color: ${(props) => props.$disabled ? '#d3d3d3' : 'white'};
        border: 3px solid ${(props) => props.$disabled ? '#d3d3d3' :' #5AB2FF'};
        color: ${(props) => props.$disabled ? 'white' : '#5AB2FF'};
    }
    }
`;

const SigninButton = styled.button`
    width: 95%;
    height: 45px;
    background: none;
    border: 2px solid #5AB2FF;
    color: #5AB2FF;
    font-size: 16px;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #e0ecff;
    }
`;