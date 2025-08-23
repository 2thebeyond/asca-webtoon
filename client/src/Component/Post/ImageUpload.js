import React from 'react';
import { Form } from "react-bootstrap";
import axios from 'axios';

function ImageUpload(props) {
  const url = process.env.REACT_APP_BACKEND_URL;
  const FileUpload = (e) => {
    var formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post/image/upload`, formData)
    .then((response) => {
      if (props.imageType === "cover") {
        props.setCoverImage(response.data.filePath);
      } else if (props.imageType === "content") {
        props.setContentImage(response.data.filePath);
      }
    });
  };

  return (
    <div>
        <Form.Control type="file" className="shadow-none" accept="image/*" onChange={(e) => FileUpload(e)}/>
    </div>
  )
}

export default ImageUpload;