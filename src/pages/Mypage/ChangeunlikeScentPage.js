import React from "react";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ScentImageGrid from '../Auth/ScentImageGrid';
import { images, labelToEnglishMap } from "../Auth/scentData";

import { ExtraInfoContext } from "../../contexts/ExtraInfoContext";
import { BsGenderMale } from "react-icons/bs";

const MainContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 60px;
`;

const HighlightTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #00656D;
  text-align: center;
  margin-bottom: 5px;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: normal;
  color: #000000;
  text-align: center;
`;

const NextButton = styled.button`
  width: 500px;
  height: 50px;
  margin-top: 100px;
  margin-bottom: 80px;
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

const ChangeunlikeScentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { originDislikedScents = [] } = location.state || {};

  const { extraInfo, setExtraInfo } = useContext(ExtraInfoContext);
  const [selectedImages, setSelectedImages] = useState(
    originDislikedScents.map(scent => scent.english)
  );

  const likedScents = JSON.parse(localStorage.getItem('likedScents')) || [];
  const englishNames = selectedImages.map(label => labelToEnglishMap[label]);

  const handleComplete = async () => {
    
    if (selectedImages.length !== 5) {
      alert("5개를 선택해주세요.");
      return; // 5개가 아닌 경우 함수 실행을 멈추고 경고 메시지를 표시합니다.
    }

    setExtraInfo((prevInfo) => ({
      ...prevInfo,
      dislikedScents: englishNames,
    }));

    const memberId = localStorage.getItem('memberId');
    const nickname = localStorage.getItem('tempNickname');
    const gender = localStorage.getItem('gender');
    const age = localStorage.getItem('age');
    const season = localStorage.getItem('season');

    console.log("좋아하는 향: ", likedScents);

    // 로그를 추가하여 선택한 값들을 확인
    console.log("닉네임:", localStorage.getItem('tempNickname'));
    console.log("성별:", localStorage.getItem('gender'));
    console.log("연령대:", localStorage.getItem('age'));
    console.log("선호하는 계절:", localStorage.getItem('season'));
    console.log("좋아하는 향:", likedScents);
    console.log("싫어하는 향:", englishNames);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_KEY}/api/mypage/${memberId}`,
        {
          nickname,
          gender,
          age,
          season,
          likedScents: likedScents,
          dislikedScents: englishNames
        }
      );

      const { code, message, result } = response.data;

      if (code === "0000") {
        alert('추가정보 수정이 완료되었습니다.');
        navigate('/mypage');
      } else {
        alert("추가정보 수정에 실패했습니다. 다시 시도해주세요.")
      }
    } catch (error) {
      console.error("추가정보 입력 중 오류 발생: ", error);
      alert('추가정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  }

  const handleImageClick = (label) => {
    if (selectedImages.includes(label)) {
      setSelectedImages(selectedImages.filter((item) => item !== label));
    } else if (selectedImages.length < 5) {
      setSelectedImages([...selectedImages, label]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);  // 페이지가 로드될 때 스크롤을 맨 위로 이동
  }, []);

  return (
    <MainContainer>
      <HighlightTitle>싫어하는<br/></HighlightTitle>
      <Title>향을 선택해주세요!</Title>
      <Description>5개를 선택해주세요.</Description>
      <ScentImageGrid
        images={images}
        selectedImages={selectedImages}
        onImageClick={handleImageClick}
      />
      <NextButton onClick={handleComplete}>추가정보 입력 완료하기</NextButton>
    </MainContainer>
  );

};

export default ChangeunlikeScentPage;