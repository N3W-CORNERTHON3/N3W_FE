import React from "react";
import styled from "styled-components"; 
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";

export function ExeptionModal({ isModalOpen, closeModal}) {
    const navigate = useNavigate();

    const MoveToAddMission = async() => {
        closeModal();
        
        navigate(`/`);
    }
    
    return (
        <>
            {isModalOpen && (
                <ModalOverlay>
                    <RootWrapper>
                        <ContentRectangle>
                            <ClosesIcon onClick={closeModal}/>
                            <ContentText>
                                선택하신 카테고리나 난이도에<br/> 
                                해당하는 미션이 없습니다.
                            </ContentText>    
                            <ButtonWrapper>
                                <MoveToAddMissionBtn onClick={MoveToAddMission}>미션 추가하러 가기</MoveToAddMissionBtn>
                            </ButtonWrapper>
                        </ContentRectangle>
                    </RootWrapper>
                </ModalOverlay>
            )}
        </>
    );
}

// PropTypes 추가
ExeptionModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 393px;
    height: 852px;
    background-color: rgba(217, 217, 217, 0.7); 
    z-index: 2; /* 다른 요소보다 위에 나타나도록 설정 */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    transform: translate(-50%, -59%);
`;

const RootWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    position: relative; 
    border-radius: 50px;
    z-index: 3;
`;

const ContentRectangle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: white;
    border-radius: 16px; 
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),0px 2px 3px 0px rgba(0, 0, 0, 0.03);
    width: 303px;
    height: 345px;
    border-radius: 20px;
`;

const ClosesIcon = styled(IoClose)`
    font-size: 27px;
    color: black; 
    margin-bottom: 60px;
    margin-right: 10px;
    align-self: end;
`;

const ContentText = styled.span`
	color: black;
	font-size: 21px;
	font-family: Inter, sans-serif;
	font-weight: 800;
	text-align: center;
	width: 537px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    width: 100%;
`;

const MoveToAddMissionBtn = styled.button`
    width: 65%;
    height: 55px;
    background-color: #5AB2FF;
    color: white;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 40px;
    margin-bottom: 55px;

    &:hover {
        background-color: white;
        border: 2px solid #5AB2FF;
        color: #5AB2FF;
    }
`;