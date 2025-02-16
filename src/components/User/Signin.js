import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export function SigninPage() {

    // 로그인 formData 상태변수 
	const [formData, setFormData] = useState({
        id: "",
        password: "",
    });

    // 폼에서 변경이벤트 처리
	const handleChange = (e) => {
        setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
    };

    const navigate = useNavigate();

    // 유효성 검사 
	const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const passwordRegEx = /^[A-Za-z0-9!@#$%^&*()]{8,20}$/;

    // 닉네임 중복 확인
    const checkIdAvailability = async () => {
        if (!formData.id.trim()) {
            toast.error("아이디를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.get(`/api/member/checkId`, 
                { params: { id: formData.id } }
            );
            if (response.data.data) {
                toast.success("사용 가능한 닉네임입니다.");
                setIsNicknameChecked(true);
            } else {
                toast.error("이미 사용 중인 닉네임입니다.");
                setIsNicknameChecked(false);
            }
        } catch (error) {
            console.error("아이디 중복 확인 중 오류 발생:", error);
            toast.error("중복 확인 중 오류가 발생했습니다.");
        }
    };

    // 전송 버튼 클릭 시 회원가입 진행
	const handleSubmit = async (e) => {
		e.preventDefault();

		// 유효성 검사
        if (!isNicknameChecked) {
            toast.error("닉네임 중복 확인을 해주세요.");
            return;
        }

        if (!formData.password.match(passwordRegEx)) {
            setPasswordError("비밀번호는 영어, 숫자, 특수문자 포함 8자 이상이어야 합니다.");
            return;
        } else {
            setPasswordError(""); 
        }
	
		try {
			const response = await axios.post(
				"/api/member/signup",
				formData
			);

			toast.success('회원가입에 성공했습니다!', {
				autoClose: 3000,
				position: "top-center",
			});
			
			// 페이지 이동 
			navigate("/");
			console.log(response.data); 

		} catch (error) {
			console.error("데이터 전송 중 오류 발생:", error);
			toast.error('회원가입에 실패했습니다.', {
				autoClose: 3000,
				position: "top-center",
			});
		}
	};
    
    return(
        <SigninRootWrapper>
            <ContentContainer>
                <IdText>아이디(닉네임)</IdText>
                <IdContainer>
                    <IdInputBox
                        type="text"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder={"아이디"}
                    />

                    <IdCheckButton onClick={checkIdAvailability}>중복 확인</IdCheckButton>
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
                {passwordError && <ErrorText>{passwordError}</ErrorText>}


                <InfoText>*가입 후 변경이 불가능합니다.</InfoText>
                <SigninButton 
					type="submit"
					onClick={handleSubmit}
					$disabled={!formData.id || !formData.password}
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

const InfoText = styled.p`
    font-size: 12px;
    font-weight: bold;
    color: red;
    line-height: 1.5;
    margin: 0;
    margin-top: 120px;
    margin-left: 105px;
`;

const SigninButton = styled.button`
    width: 95%;
    height: 45px;
    background-color: ${(props) => props.$disabled ? '#d3d3d3' : '#5AB2FF'};
    border: 2px solid;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 

    &:hover {
        background-color: ${(props) => props.$disabled ? '#d3d3d3' : 'white'};
        border: 3px solid ${(props) => props.$disabled ? '#d3d3d3' :' #5AB2FF'};
        color: ${(props) => props.$disabled ? 'white' : '#5AB2FF'};
    }
`;

const ErrorText = styled.p`
    font-size: 11px;
    font-weight: bold;
    color: #5AB2FF;
    line-height: 1.5;
    margin-top: 3px;
    margin-left: 30px;
`;