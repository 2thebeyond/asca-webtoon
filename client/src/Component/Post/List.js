import React, { useState, useEffect } from 'react'
import axios from "axios";
import { ListDiv, ListItem } from '../../Style/ListCSS.js';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
const url = process.env.REACT_APP_BACKEND_URL;

function List({type}) {
  const [PostList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 16;
  const [SearchTerm, setSearchTerm] = useState("");
  
  let filteredList;
  const filteredTypes = ["story", "comedy", "action", "romance", "fantasy", "life", "poster"];

  const getPostList = () => {
    let body = {
      searchTerm: SearchTerm,
    };
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post/list`, body)
      .then((response) => {
        console.log(response);
        if (response.data.success){
          setPostList([...response.data.postList]);
        }
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getPostList();
    }, []);
  
  if (type === "story") {
    filteredList = PostList.filter(post => post.tag?.includes("회지"));
  } else if (type === "comedy") {
    filteredList = PostList.filter(post => post.tag?.includes("코미디"));
  } else if (type === "action") {
    filteredList = PostList.filter(post => post.tag?.includes("액션"));
  } else if (type === "fantasy") {
    filteredList = PostList.filter(post => post.tag?.includes("판타지"));
  } else if (type === "romance") {
    filteredList = PostList.filter(post => post.tag?.includes("로맨스"));
  } else if (type === "life") {
    filteredList = PostList.filter(post => post.tag?.includes("일상"));
  } else if (type === "poster") {
    filteredList = PostList.filter(post => post.tag?.includes("자보"));
  }
 
  const npage = filteredTypes.includes(type)
  ? Math.ceil(filteredList.length / recordsPerPage)
  : Math.ceil(PostList.length / recordsPerPage);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredTypes.includes(type)
  ? filteredList.slice(firstIndex, lastIndex)
  : PostList.slice(firstIndex, lastIndex)

  const SearchHandler = () => {
    if (SearchTerm === "") {
      return;
    } 
    getPostList();
  }

  return (
    <div>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button onClick={SearchHandler} style={{padding: "3px 10px"}}>검색</Button>
        <input type="text" value={SearchTerm} style={{padding: "3px 20px"}} onChange={(e) => setSearchTerm(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) SearchHandler();
        }}></input>
      </div>
        <ListDiv>
        {(records
        ).map((post, idx) => {
            return (
              <ListItem key={idx}>
                <Link to={`/post/${post.postNum}`}>
                  <img src={`${post.coverImage}`} style={{ width: '100%', height: '120px', display: 'block', objectFit: 'cover'}}></img>
                  <p style={{fontSize: '10px'}} className="title">{post.title}</p>
                </Link>
              </ListItem>
          )
        })}
        </ListDiv>
        <nav>
        <div className="pagination-container" style={{ textAlign: "center", marginTop: "20px" }}>
          <Button 
            onClick={() => changeCPage(currentPage - 1)} 
            disabled={currentPage === 1}
            className="page-btn"
          >
            &lt;
          </Button>
          <span style={{ margin: "0 10px" }}>
            {currentPage} / {npage}
          </span>
          <Button 
            onClick={() => changeCPage(currentPage + 1)} 
           disabled={currentPage === npage}
           className="page-btn"
          >
            &gt;
          </Button>
        </div>
      </nav>
    </div>
  )

  function changeCPage(id){
    setCurrentPage(id);
  }
}

export default List;