import { Component } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const MainContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 60px;
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  margin-bottom: 50px;
`;

const Scentasy = styled.span`
  color: #F28482;
`;

const FormContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  width: 300px;
  font-size: 20px;
  white-space: nowrap;
  color: #000000;
  opacity: 76%;
  text-align: left;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  height: 50px;
  padding: 10px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 20px;
  box-sizing: border-box;
  margin-right: 10px; /* 버튼과의 간격을 위해 margin-right 설정 */
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 20px;
  box-sizing: border-box;

  option {
    color: #666666;
  }
`;

const AddInfoButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: #FFFFFF;
  border-radius: 8px;
  border: 2px solid #00656D;
  font-size: 20px;
  color: #00656D;
  white-space: nowrap;
  font-weight: regular;

  &:hover {
  background-color: #00656D;
  color: #FFFFFF;
  }
`;

const SeasonButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: ${(props) => (props.active ? "#00656D" : "#ffffff")};
  border-radius: 8px;
  border: 2px solid #00656D;
  font-size: 20px;
  color: ${(props) => (props.active ? "#ffffff" : "#00656D")};
  white-space: nowrap;
  font-weight: regular;
  box-sizing: border-box;
  margin-right: 10px;

  &:hover {
  background-color: #00656D;
  color: #FFFFFF;
  }
`;

const NextButton = styled.button`
  width: 500px;
  height: 50px;
  margin-top: 100px;
  margin-left: 50px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid #00656D;
  font-size: 20px;
  color: #00656D;
  white-space: nowrap;
  font-weight: regular;
  box-sizing: border-box;

  &:hover {
  background-color: #00656D;
  color: #FFFFFF;
  }
`;

const AddInfoPage = () => {

  const navigate = useNavigate();

  const handlelikeScent = () => {
    navigate('/likeScent');
  }

  const [clickedButton, setClickedButton] = useState(null);

  const handleSeasonClick = (season) => {
    setClickedButton(season);
  };

  return (
    <MainContainer>
      <Title><Scentasy>Scentazy</Scentasy>에 오신 것을 환영해요!</Title>
      <FormContainer>
        <Label>닉네임 *</Label>
        <InfoContainer>
          <Input type="text" placeholder="닉네임을 입력해주세요." />
          <AddInfoButton>중복 확인</AddInfoButton>
        </InfoContainer>
      </FormContainer>
      <FormContainer>
        <Label>선호하는 향수 성별 *</Label>
        <InfoContainer>
          <Select>
            <option value="" disabled selected></option>
            <option value="option1">남성</option>
            <option value="option2">여성</option>
            <option value="option3">중성</option>
          </Select>
        </InfoContainer>
      </FormContainer>
      <FormContainer>
        <Label>연령대 *</Label>
        <InfoContainer>
          <Select>
            <option value="" disabled selected></option>
            <option value="option1">10대</option>
            <option value="option2">20대</option>
            <option value="option3">30대</option>
            <option value="option4">40대</option>
            <option value="option5">50대</option>
            <option value="option6">60대</option>
            <option value="option7">60대 이상</option>
          </Select>
        </InfoContainer>
      </FormContainer>
      <FormContainer>
        <Label>선호하는 계절 *</Label>
        <InfoContainer>
        <SeasonButton
            active={clickedButton === "봄"}
            onClick={() => handleSeasonClick("봄")}
          >
            봄
          </SeasonButton>
          <SeasonButton
            active={clickedButton === "여름"}
            onClick={() => handleSeasonClick("여름")}
          >
            여름
          </SeasonButton>
          <SeasonButton
            active={clickedButton === "가을"}
            onClick={() => handleSeasonClick("가을")}
          >
            가을
          </SeasonButton>
          <SeasonButton
            active={clickedButton === "겨울"}
            onClick={() => handleSeasonClick("겨울")}
          >
            겨울
          </SeasonButton>
        </InfoContainer>
      </FormContainer>
      <NextButton onClick={handlelikeScent}>다음으로 이동하기</NextButton>
    </MainContainer>
  )
}

export default AddInfoPage;