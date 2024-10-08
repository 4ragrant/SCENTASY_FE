import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import MyInfoTab from './MyInfoTab';
import CommunityTab from "./CommunityTab";
import ProfileImageModal from "./ProfileImageModal";

import default_profile_img from '../../assets/images/default_profile_image.png';
import PerfumeTab from "./PerfumeTab";
import { englishToLabelMap } from "../Auth/scentData";

const Page = styled.div`
  background-color: #FAF8F1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
`;

const SideBarContainer = styled.div`
  width: 400px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
`;

const MyProfileContainer = styled.div`
  width: 350px;
  height: 220px;
  background-color: #ffffff;
  border-radius: 8px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0px;
`;

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleBorder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    `conic-gradient(#00656D ${props.percentage}%, #DADEE6 ${props.percentage}% 100%)`}; 
`;

const NumberBadge = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25px;
  height: 25px;
  background-color: #00656D;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 10px;
  font-family: "Pretendard-Bold";
`;

const CircleImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 3px solid #fff;

  &:hover {
    border-color: #ffffff;
  }
`;

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;

const MyNickName = styled.p`
  font-size: 20px;
  font-family: "Pretendard-Regular";
  margin: 0px 0px 4px 0px;
`;

const MyEmail = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  color: #808080;
  margin: 0px;
`;

const MyPerfumeCount = styled.p`
    font-size: 12px;
    font-family: "Pretendard-Regular";
    color: #666666;
    margin: 7px 0px 0px 0px;
    cursor: pointer;
`;

const ProfileButtonContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ChangeButton = styled.div`
  width: 100px;
  border: 2px solid #00656D;
  border-radius: 8px;
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #00656D;
  background-color: #ffffff;
  cursor: pointer;
  text-align: center;
  padding: 10px 25px 10px 25px;

  &:hover {
    background-color: #00656D;
    color: #ffffff;
  }
`;

const TabContainer = styled.div`
  width: 800px;
  height: 90%;
  background-color: #ffffff;
  border-radius: 8px;
  padding-top: 40px;
  padding-right: 70px;
  padding-left: 70px;
  margin-right: 70px;
  justify-content: flex-start;
  align-items: center;
  opacity: 80%;
  position: relative;
`;

const TabButtonContainer = styled.div`
  position: absolute;
  top: 170px;
  right: 20px;
  display: flex;
  flex-direction: column;
`;

const TabButton = styled.button`
  width: 120px;
  height: 50px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.active ? "#00656D" : "#FFFFFF")};
  color: ${(props) => (props.active ? "#FFFFFF" : "#00656D")};
  border: 3px solid #00656D;
  border-radius: 0px;
  font-size: 16px;
  font-family: "Pretendard-Bold";
  cursor: pointer;
  z-index: 1; /* 버튼이 위에 보임 */

  &:hover {
    background-color: #00656D;
    color: #ffffff;
  }
`;

const Mypage = () => {
  const [activeTab, setActiveTab] = useState("MyInfo");
  const [isModalOpen, setModalOpen] = useState(false);
  const [perfumeCount, setPerfumeCount] = useState(0);
  const progressPercentage = (perfumeCount / 50) * 100;

  const [userProfile, setUserProfile] = useState({
    nickname: "",
    email: "",
    imageUrl: default_profile_img,
    age: "",
    gender: "",
    season: "",
    likedScents: [],
    dislikedScents: []
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const accessToken = localStorage.getItem('accessToken');

        if (!memberId || !accessToken) {
          console.error('로그인이 필요합니다.');
          // 토큰이 없을 경우 로그인 페이지로 리다이렉트하거나 다시 로그인 유도
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/mypage/${memberId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const data = await response.json();
        if (data.code === '0000') {
          setUserProfile({
            nickname: data.data.nickname,
            email: data.data.email,
            imageUrl: data.data.imageUrl,
            age: data.data.age,
            gender: data.data.gender,
            season: data.data.season,
            likedScents: data.data.likedScents.map(scent => ({
              english: scent,
              korean: englishToLabelMap[scent] || scent
            })),
            dislikedScents: data.data.dislikedScents.map(scent => ({
              english: scent,
              korean: englishToLabelMap[scent] || scent
            })),
          })
          localStorage.setItem('season', data.data.season);
          localStorage.setItem('likedScents', JSON.stringify(data.data.likedScents));
          localStorage.setItem('dislikedScents', JSON.stringify(data.data.dislikedScents));
        } else {
          console.error("사용자 정보 조회 실패", data.message);
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 오류", error)
      }
    };
    fetchUserProfile();
  }, []);
  

  // 전체 향수 개수 조회
  useEffect(() => {
    const fetchPerfumeCount = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const accessToken = localStorage.getItem('accessToken');
  
        if (!memberId || !accessToken) {
          console.error('로그인이 필요합니다.');
          // 토큰이 없을 경우 로그인 페이지로 리다이렉트하거나 다시 로그인 유도
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/perfume/count`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const data = await response.json();
        if (data.code === '0000') {
          setPerfumeCount(data.data);
        }
    } catch (error) {
      console.error("전체 향수 목록 오류:", error);
      }
    };
    
    fetchPerfumeCount();
  }, []);

  // 모달 열기
  const openModal = () => setModalOpen(true);

  // 모달 닫기
  const closeModal = () => setModalOpen(false);

  const handleProfileUpdate = (newImageUrl) => {
    setUserProfile((prev) => ({
      ...prev,
      imageUrl: newImageUrl,
    }));
  };

  // 탭 전환
  const renderTabContent = () => {
    switch (activeTab) {
      case "MyInfo":
        return <MyInfoTab
          nickname={userProfile.nickname}
          age={userProfile.age}
          gender={userProfile.gender}
          season={userProfile.season}
          likedScents={userProfile.likedScents}
          dislikedScents={userProfile.dislikedScents}
          />;
      case "Community":
        return <CommunityTab />
      case "Perfume" :
        return <PerfumeTab />
      default:
        return <MyInfoTab />;
    }

  }
  return(
    <Page>
      <SideBarContainer>
        <MyProfileContainer>
          <ProfileContainer>
            <CircleWrapper>
              <CircleBorder percentage={progressPercentage}>
                <CircleImage src={userProfile.imageUrl || default_profile_img}></CircleImage>
              </CircleBorder>
              <NumberBadge>{perfumeCount}</NumberBadge>
            </CircleWrapper>
            <MyInfoContainer>
              <MyNickName>{userProfile.nickname}님</MyNickName>
              <MyEmail>{userProfile.email}</MyEmail>
              <MyPerfumeCount>{userProfile.nickname}님의 향수 {perfumeCount}개</MyPerfumeCount>
            </MyInfoContainer>
          </ProfileContainer>
          <ProfileButtonContainer>
            <ChangeButton onClick={openModal}>프로필 사진 변경</ChangeButton>
            <ChangeButton>로그아웃</ChangeButton>
          </ProfileButtonContainer>
        </MyProfileContainer>
      </SideBarContainer>
      <TabContainer>
        {/* 탭에 따른 내용 표시 */}
        {renderTabContent()}
      </TabContainer>

      <TabButtonContainer>
        <TabButton active={activeTab === "MyInfo"} onClick={() => setActiveTab("MyInfo")}>My Info</TabButton>
        <TabButton active={activeTab === "Community"} onClick={() => setActiveTab("Community")}>Community</TabButton>
        <TabButton active={activeTab === "Perfume"} onClick={() => setActiveTab("Perfume")}>Perfume</TabButton>
      </TabButtonContainer>

      {/* 모달이 열렸을 때만 표시 */}
      {isModalOpen && <ProfileImageModal
        onClose={closeModal}
        onUpdate={handleProfileUpdate}
        initialImageUrl={userProfile.imageUrl} />}
    </Page>
  )
}

export default Mypage;