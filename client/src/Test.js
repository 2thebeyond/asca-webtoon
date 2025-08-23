import React, { useState } from 'react'

function Test() {
    const [Content, setContent] = useState("");
    const [ContentList, setContentlist] = useState([]);
    const onSubmit = () => {
        let tempArr = [...ContentList];
        tempArr.push(Content)
        setContentlist([...tempArr]);
        setContent("");
    }

  return (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
        }}
    >
        {ContentList.map((content, idx) => {
            return (<div key="idx">내용 : {content}</div>)
        })}
        <input type="text" value={Content} onChange={(event) => {
            setContent(event.currentTarget.value);
        }}></input>
        <button onClick={() => {
            onSubmit(); 
        }}style={{marginTop: "1rem"}}>제출</button>
    </div>
  )
}

export default Test