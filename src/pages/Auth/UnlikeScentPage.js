import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import aldehydeC18 from '../../assets/images/Flavors/Aldehyde C18.jpg';
import amber from '../../assets/images/Flavors/amber.jpg';
import aqua from '../../assets/images/Flavors/aqua.jpg';
import bergamot from '../../assets/images/Flavors/bergamot.jpg';
import blackcherry from '../../assets/images/Flavors/blackcherry.jpg';
import blackcurrent from '../../assets/images/Flavors/blackcurrent.jpg';
import blackpepper from '../../assets/images/Flavors/blackpepper.jpg';
import cedarwood from '../../assets/images/Flavors/cedarwood.jpg';
import fig from '../../assets/images/Flavors/fig.jpg';
import Frankincense from '../../assets/images/Flavors/Frankincense.jpg';
import freesia from '../../assets/images/Flavors/freesia.jpg';
import grapefruit from '../../assets/images/Flavors/grapefruit.jpg';
import green from '../../assets/images/Flavors/green.jpg';
import hinoki from '../../assets/images/Flavors/hinoki.jpg';
import leather from '../../assets/images/Flavors/leather.jpg';
import lemon from '../../assets/images/Flavors/lemon.jpg';
import lilyofthevalley from '../../assets/images/Flavors/lily of the valley.jpg';
import magnolia from '../../assets/images/Flavors/magnolia.jpg';
import marineblue from '../../assets/images/Flavors/marine blue.jpg';
import mint from '../../assets/images/Flavors/mint.jpg';
import muguet from '../../assets/images/Flavors/muguet.jpg';
import ocean from '../../assets/images/Flavors/ocean.jpg';
import patchouli from '../../assets/images/Flavors/Patchouli.jpg';
import peach from '../../assets/images/Flavors/peach.jpg';
import rose from '../../assets/images/Flavors/rose.jpg';
import rosemary from '../../assets/images/Flavors/rosemary.jpg';
import sandalwood from '../../assets/images/Flavors/Sandalwood.jpg';
import thyme from '../../assets/images/Flavors/thyme.jpg';
import vanilla from '../../assets/images/Flavors/vanilla.jpg';
import whitemusk from '../../assets/images/Flavors/whitemusk.jpg';


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

const GridContainer = styled.div`
  width: 70%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 5px;  /* 열 사이의 간격을 5px로 줄였습니다 */
  row-gap: 20px;    /* 행 사이의 간격은 그대로 유지합니다 */
  margin-top: 40px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CircleImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${(props) => (props.selected ? "#00656D" : "#ccc")};
  cursor: pointer;

  &:hover {
    border-color: #00656D;
  }
`;

const Label = styled.span`
  margin-top: 10px;
  font-size: 14px;
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  color: #000000;
  opacity: ${(props) => (props.selected ? "100%" : "50%")};
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


const UnlikeScentPage = () => {

  const navigate = useNavigate();

  const handleUnlikeScent = () => {
    navigate('/UnlikeScent');
  }

  const images = [
    { src: aldehydeC18, label: "알데하이드 C18" },
    { src: amber, label: "엠버" },
    { src: aqua, label: "아쿠아" },
    { src: bergamot, label: "베르가못" },
    { src: blackcherry, label: "블랙 체리"},
    { src: blackcurrent, label: "블랙 커런트" },
    { src: blackpepper, label: "블랙페퍼" },
    { src: cedarwood, label: "시더우드" },
    { src: fig, label: "무화과" },
    { src: Frankincense, label: "프랑킨센스" },
    { src: freesia, label: "프리지아" },
    { src: grapefruit, label: "자몽" },
    { src: green, label: "그린" },
    { src: hinoki, label: "히노키" },
    { src: leather, label: "레더" },
    { src: lemon, label: "레몬" },
    { src: lilyofthevalley, label: "릴리 오브 더 밸리" },
    { src: magnolia, label: "매그놀리아" },
    { src: marineblue, label: "마린 블루" },
    { src: mint, label: "민트" },
    { src: muguet, label: "뮤게" },
    { src: ocean, label: "오션" },
    { src: patchouli, label: "패츌리" },
    { src: peach, label: "피치" },
    { src: rose, label: "로즈" },
    { src: rosemary, label: "로즈마리" },
    { src: sandalwood, label: "샌달우드" },
    { src: thyme, label: "타임" },
    { src: vanilla, label: "바닐라" },
    { src: whitemusk, label: "화이트 머스크" }
  ];

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = (label) => {
    if (selectedImages.includes(label)) {
      setSelectedImages(selectedImages.filter((item) => item !== label));
    } else if (selectedImages.length < 5) {
      setSelectedImages([...selectedImages, label]);
    }
  };

  return (
    <MainContainer>
      <HighlightTitle>싫어하는<br/></HighlightTitle>
      <Title>향을 선택해주세요!</Title>
      <Description>5개를 선택해주세요.</Description>
      <GridContainer>
        {images.map((image, index) => (
          <ImageContainer key={index}>
            <CircleImage
              src={image.src}
              alt={image.label}
              selected={selectedImages.includes(image.label)}
              onClick={() => handleImageClick(image.label)}
            />
            <Label selected={selectedImages.includes(image.label)}>
              {image.label}
            </Label>
          </ImageContainer>
        ))}
      </GridContainer>
      <NextButton onClick={handleUnlikeScent}>회원가입 완료하기</NextButton>
    </MainContainer>
  );
};

export default UnlikeScentPage;