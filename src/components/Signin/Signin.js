import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; 

export function SigninPage() {

    // 로그인 formData 상태변수 
	const [formData, setFormData] = useState({
        id: "",
        password: "",
    });

    // 유효성 검사 
	const [idError, setIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/

    const passwordCheck = (password) => {
        if(password.match(passwordRegEx)===null) { 
            console.log('비밀번호 형식을 확인 필요'); 
            return;
        }else{ 
            console.log('비밀번호 형식 일치치');
        }
        }

    // 폼에서 변경이벤트 처리
	const handleChange = (e) => {
        setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

        if (e.target.type == "password"){
            passwordCheck(e.target.value);
        }
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // e.preventDefault();

        // if (!formData.id) {
        //     setIdError("아이디를 입력해주세요.");
        //     return;
        // }
        // if (!formData.password) {
        //     setPasswordError("비밀번호를 입력해주세요.");
        //     return;
        // }
        // if (passwordError) {
        //     alert("비밀번호 형식을 확인해주세요.");
        //     return;
        // }

		console.log("회원가입 완료 버튼");
        navigate('/'); // 로그인 페이지 이동
	};
    
    return(
        <SigninRootWrapper>
            <ContentContainer>
                <IdText>아이디(닉네임)</IdText>
                <IdText2>*가입 후 변경이 불가능합니다.</IdText2>
                <IdContainer>
                    <IdInputBox
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder={"아이디"}
                    />

                    <IdCheckButton>중복 확인</IdCheckButton>
                </IdContainer>
                <ErrorText>아이디는 한글, 영문, 숫자만 입력할 수 있습니다.</ErrorText>
                

                <PasswordText>비밀번호</PasswordText>
                <PasswordInputBox
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={"비밀번호"}
                />
                <ErrorText>비밀번호는 영어, 숫자, 특수문자 포함 8글자 이상이어야 합니다.</ErrorText>

                <SigninButton 
                    type="submit"
                    onClick={handleSubmit}
                >
                    회원가입
                </SigninButton>
            </ContentContainer>
        </SigninRootWrapper>
    )

}

const SigninRootWrapper = styled.div`
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
    text-align: start;
    margin-right: 30px;
`;

const IdText = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin: 0; //기본 margin 제거
    margin-left: 30px;
`;

const IdText2 = styled.p`
    font-size: 11px;
    font-weight: 500;
    color: red;
    line-height: 1.5;
    margin: 0;
    margin-top: 5px;
    margin-left: 30px;
`;


const IdContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    text-align: start;
    margin-left: 20px;
    margin-top: 25px;
`;

const IdInputBox = styled.input`
    width: 215px;
    height: 50px;
    border: 1.5px solid  #A0DEFF;
    border-radius: 20px;
    font-size: 15px;
    margin-bottom: 10px;
    padding-left: 10px;

    &:focus{
        outline: none;
        padding-left: 10px;
    }
`;

const IdCheckButton = styled.button`
    width: 83px;
    height: 52px;
    background-color: #A0DEFF;
    color: white;
    font-size: 15px;
    font-weight: 400;
    border: none;
    border-radius: 17px;
    cursor: pointer;
    margin-left: 15px;

    &:hover {
        background-color: white;
        border: 2px solid #A0DEFF;
        color: #A0DEFF;
    }
`;


const PasswordText = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-left: 30px;
    margin-top: 40px;
    margin-bottom: 25px;
`;

const PasswordInputBox = styled.input`
    width: 315px;
    height: 50px;
    border: 1.5px solid  #A0DEFF;
    border-radius: 20px;
    font-size: 15px;
    margin-bottom: 10px;
    margin-left: 20px;
    padding-left: 10px;

    &:focus{
        outline: none;
        padding-left: 10px;
    }
`;

const SigninButton = styled.button`
    width: 95%;
    height: 45px;
    background: #5AB2FF;
    border: 2px solid #5AB2FF;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 120px;
    margin-left: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 

    &:hover {
        background-color: white;
        color: #5AB2FF;
    }
`;

const ErrorText = styled.p`
    font-size: 11px;
    font-weight: 500;
    color: #5AB2FF;
    line-height: 1.5;
    margin-top: 3px;
    margin-left: 30px;
`;