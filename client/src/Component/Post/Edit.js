import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { BtnDiv } from '../../Style/PostDetailCSS';
import { Link } from "react-router-dom";
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js";
import { useNavigate } from "react-router";
import ImageUpload from './ImageUpload.js';

import firebase from "../../firebase.js";

function Edit() {
    let params = useParams();
    let navigate = useNavigate();

    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const [Tag, setTag] = useState("");
    const [Author, setAuthor] = useState("");
    const [Head, setHead] = useState("");
    const [CoverImage, setCoverImage] = useState("");
    const [ContentImage, setContentImage] = useState("");
    const user = useSelector((state) => state.user);
    const url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        let body = {
            postNum : params.postNum,
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

    useEffect(() => {
      setTitle(PostInfo.title);
      setContent(PostInfo.content);
      setTag(PostInfo.tag);
      setAuthor(PostInfo.author);
      setHead(PostInfo.head);
      setCoverImage(PostInfo.coverImage);
      setContentImage(PostInfo.contentImage);
    }, [PostInfo]);

    const onSubmit = (e) => {
      e.preventDefault();
      
      if (Title === '' || Content === '' || Tag === '' || Author === '' || Head === '' || CoverImage === '' || ContentImage === ''){
        return alert("모든 항목을 채워주세요!");
      }
    
      let body = {
        title: Title,
        content: Content,
        tag: Tag,
        author: Author,
        head: Head,
        coverImage: CoverImage,
        contentImage: ContentImage,
        postNum : params.postNum,
        uid: user.uid,
      };
      
      firebase.auth().currentUser.getIdToken()
        .then((token) => {
          const headers = { Authorization: `Bearer ${token}` };
          //console.log("요청 헤더:", headers);
          return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post/edit`, body, { headers });
        })
        .then((response) => {
          if(response.data.success){
            alert("글 수정이 완료되었습니다.");
            navigate(`/post/${params.postNum}`);
          } else {
            alert("글 수정에 실패하였습니다.");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 403) {
          alert("관리자 권한이 없습니다.");
          navigate("/");
        }
          console.log(err);
        });
    };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="author">작가</label>
        <input
            id="author"
            type="text"
            value={Author}
            onChange={(e) => setAuthor(e.currentTarget.value)}
          />
        <label htmlFor="head">담당자</label>
        <input
            id="head"
            type="text"
            value={Head}
            onChange={(e) => setHead(e.currentTarget.value)}
          />
        <label htmlFor="title">제목</label>
        <input  id="title" 
                type="text" 
                value={Title} 
                onChange={(event) => {
          setTitle(event.currentTarget.value); }}>
        </input>
        <label htmlFor="content">표지 이미지</label>
        <ImageUpload imageType="cover" setCoverImage={setCoverImage}/>
        <label htmlFor="content">본문 이미지</label>
        <ImageUpload imageType="content" setContentImage={setContentImage}/>
        <label htmlFor="content">내용</label>
        <textarea id="content"
                  value={Content} 
                  onChange={(event) => {
          setContent(event.currentTarget.value); }}/>
        <label htmlFor="tag">태그</label>
        <textarea style={{minHeight: "50px"}}
                  id="tag"
                  value={Tag} 
                  onChange={(event) => {
          setTag(event.currentTarget.value); }}/>
        <UploadButtonDiv>
          <button
            className="cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
          }}>
          취소
          </button>
          <button
            onClick={(e) => {
            onSubmit(e); 
          }}>
          수정
          </button>
        </UploadButtonDiv>
      </UploadForm>  
    </UploadDiv>
  );
}

export default Edit;