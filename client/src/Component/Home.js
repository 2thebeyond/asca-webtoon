import mainImg from "../images/main.jpg";
import meetImg from "../images/meet.jpg";
import cartoonImg from "../images/cartoon.jpg";
import exhibitionImg from "../images/exhibition.jpg";
import movieImg from "../images/movie.jpg";
import welcomeImg from "../images/welcome.jpg";
import mtImg from "../images/mt.jpg";

import "./../Style/Box.css";
import { Button } from 'react-bootstrap';

function Home() {

  return (
    <div>
        <div style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            position: "relative"
            }}>
            <img 
                src={mainImg}
                style={{
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                objectPosition: "center",
                filter: "blur(5px)"
                }}
            />

            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "2rem",
                fontWeight: "bold",
                textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                textAlign: "center",
                }}>
                    <div style={{fontSize:"5rem"}}>
                        ASCA
                    </div>
                    <div>
                        순수 만화 창작 동아리
                    </div>
            </div>
        </div>
    <div>
        <div>
            <div className="title">
                <b>소개</b>
            </div>
            <div className="text-box" style={{wordBreak: "break-all", overflowWrap: "break-word"}}>
                ASCA는 자유로운 분위기 속에서 그림을 좋아하는 사람들이 모여 친목을 쌓고 함께 성장하는 모임입니다.
                그림을 그리며 자연스럽게 실력을 키워나가고, 다양한 활동을 통해 작품을 뽐내며 즐거운 경험을 나눌 수 있습니다.
                서로의 열정을 공유하며 즐겁고 의미 있는 시간을 함께 만들어 갑니다.
            </div>
            <div class="container" className="container">
                <div class="box" className="box">
                    <div><b>창단일</b></div>
                    <div>1997년</div>
                </div>
                <div class="box" className="box">
                    <div><b>활동 기간</b></div>
                    <div>27년 이상</div>
                </div>
                <div class="box" className="box">
                    <div><b>누적 회원 수</b></div>
                    <div>100명 이상</div>
                </div>
            </div>
        </div>
        <div>
            <div className="title">
                <b>활동</b>
            </div>
            <div className="text-box">
                <div class="img-wrap">
                    <img src={meetImg} alt="sample" class="cover-img" />
                    <div class="overlay">그림모임</div>
                </div>
                <div className="text-box" style={{textAlign: "center"}}>주제에 맞는 그림을 그려보세요!</div>
                <div class="img-wrap">
                    <img src={cartoonImg} alt="sample" class="cover-img" />
                    <div class="overlay">회지</div>
                </div>
                <div className="text-box" style={{textAlign: "center"}}>연간 1회 창작 만화를 그려서 부원들과 공유해보세요!</div>
                <div class="img-wrap">
                    <img src={exhibitionImg} alt="sample" class="cover-img" />
                    <div class="overlay">전시회</div>
                </div>
                <div className="text-box" style={{textAlign: "center"}}>자신이 만든 작품을 전시해보세요!</div>
                <div class="img-wrap">
                    <img src={welcomeImg} alt="sample" class="cover-img" />
                    <div class="overlay">신입 부원 환영회</div>
                </div>
                <div className="text-box" style={{textAlign: "center"}}>신입 부원 환영회에서 부원들과 친목을 도모하세요!</div>
                <div class="img-wrap">
                    <img src={movieImg} alt="sample" class="cover-img" />
                    <div class="overlay">상영회</div>
                </div>
                <div className="text-box" style={{textAlign: "center"}}>상영관에서 인기 작품을 감상해보세요!</div>
                <div class="img-wrap">
                    <img src={mtImg} alt="sample" class="cover-img" />
                    <div class="overlay">MT</div>
                </div>
                <div className="text-box" style={{textAlign: "center"}}>MT에서 부원들과 친목을 도모하세요!</div>
            </div>
        </div>
        <div>
            <div className="title" style={{marginTop: '50px'}}>
                <b>지원</b>
            </div>
            <div className="text-box" style={{textAlign: "center"}}>
                2025년 8월 18일부터 2025년 9월 5일까지 모집합니다.
            </div>
            <Button style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '150px',
                height: '60px',
                margin: '0 auto',
                marginTop: '100px',
                marginBottom: '100px',
                fontSize: '1.5rem'
            }} href="https://open.kakao.com/o/sW2zfeNh">지원하기</Button>
        </div>
    </div>
    </div>
  );
}

export default Home;