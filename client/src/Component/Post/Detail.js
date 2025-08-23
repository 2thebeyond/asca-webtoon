import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { BtnDiv, SpinnerDiv } from '../../Style/PostDetailCSS';
import { Link, useNavigate } from "react-router-dom";
import { Chip } from '@mui/material';

import firebase from '../../firebase.js';

import moment from 'moment';
import "moment/locale/ko";

function Detail() {
    let params = useParams();
    let navigate = useNavigate();
    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);
    const words = PostInfo.tag ? PostInfo.tag.split(' ') : [];
    const user = useSelector((state) => state.user);
    const isAdmin = useSelector((state) => state.user.isAdmin);

    const SetTime = (a, b) => {
        if (a !== b){
            return moment(b).format("L a hh:mm") + "(수정됨)";
        } else {
            return moment(a).format("L a hh:mm");
        }
    }

    useEffect(() => {
        let body = {
            postNum : params.postNum,
            uid : user.uid,
        }
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/api/post/detail`, body)
            .then((response) => {
                if (response.data.success){
                    setPostInfo(response.data.post);
                    setFlag(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    //     console.log(PostInfo);
    // }, [PostInfo]);

    const DeleteHandler = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
                 
        let body = {
            postNum : params.postNum,
            uid : user.uid,
        }
        firebase.auth().currentUser.getIdToken()
            .then((token) => {
            const headers = { Authorization: `Bearer ${token}` };
            //console.log("요청 헤더:", headers);
            return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post/delete`, body, { headers });
            })
            .then((response) => {
                if (response.data.success){
                    console.log(response);
                    console.log(response.data);
                    alert("게시글이 삭제되었습니다.");
                    navigate(-1);
                }
            })
            .catch((err) => {
                alert("게시글 삭제에 실패하였습니다.");
            });
        }
    };

    return (
    <div>
        {Flag ? (
            <div>
                <img src={PostInfo.contentImage} style={{ width: window.innerWidth <= 756 ? '100%' : '756px', display: 'block', margin: '0 auto', boxSizing: 'border-box', }}></img>
                <div style={{margin: "20px"}}>
                {<p>작가: {PostInfo.author} / 담당자: {PostInfo.head}</p>}
                {PostInfo.content}
                </div>
                <div style={{margin: "20px"}}>
                {words.map((tag, index) => (
                  <Chip key={index} label={tag} style={{margin:"5px"}}/>
                ))}
                <p style={{marginTop: "10px"}}>작성일: {SetTime(PostInfo.createdAt, PostInfo.updatedAt)}</p>
                </div>
                {isAdmin && 
                    <BtnDiv>
                        <Link to={`/edit/${PostInfo.postNum}`}>
                            <button className="edit" style={{ marginRight: "5px" }}>수정</button>
                        </Link>
                        <button className="delete" onClick={() => DeleteHandler()} style={{ marginRight: "16px" }}>삭제</button>
                    </BtnDiv>
                }
                
            </div> 
        ) : (
        <SpinnerDiv>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </SpinnerDiv>
        )}
    </div>
    )
}

export default Detail;