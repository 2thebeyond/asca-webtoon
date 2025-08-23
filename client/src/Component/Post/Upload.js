import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js";
import ImageUpload from './ImageUpload.js';

import firebase from '../../firebase.js';
import axios from "axios";

function Upload(props) {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Tag, setTag] = useState("");
  const [Author, setAuthor] = useState("");
  const [Head, setHead] = useState("");
  const [CoverImage, setCoverImage] = useState();
  const [ContentImage, setContentImage] = useState();
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);


  // useEffect(() => {
  //   if (!user.accessToken){
  //     alert("로그인한 회원만 글을 작성할 수 있습니다.");
  //     navigate("/login");
  //   }  
  // }, []);

  const onSubmit = (e) => {
      e.preventDefault();
      
      if (Title === '' || Content === '' || Tag === '' || Author === '' || Head === ''){
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
        uid: user.uid,
      };

      firebase.auth().currentUser.getIdToken()
      .then((token) => {
        const headers = { Authorization: `Bearer ${token}` };
        //console.log("요청 헤더:", headers);
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post/submit`, body, { headers });
      })
      .then((response) => {
        if(response.data.success){
          alert("글 작성이 완료되었습니다.");
          navigate(-1);
        } else {
          alert("글 작성에 실패하였습니다.");
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
  
  useEffect(() => {
    console.log("Content가 바뀌었습니다!");
  }, [Content])

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
            onClick={(e) => {
            onSubmit(e); 
          }}>
          제출
          </button>
        </UploadButtonDiv>
      </UploadForm>  
    </UploadDiv>
  );
}

export default Upload;