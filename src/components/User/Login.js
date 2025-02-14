import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; 

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
                    // onClick={handleSubmit}
                    onClick={() => console.log('로그인 버튼')}
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
    justify-content: center;
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
`;

const LogoImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: 7px 7px 15px rgba(0, 0, 0, 0.1); 
`;

const HeaderText1 = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: black;
    margin-left: 17px;

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
    background-color: #5AB2FF;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 55px;

    &:hover {
        background-color: white;
        border: 2px solid #5AB2FF;
        color: #5AB2FF;
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