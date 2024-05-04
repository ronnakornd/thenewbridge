import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AudioUpload(props) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [content , setContent] = useState(props.defaultValue);
    const [currentId, setCurrentId] = useState(props.currentVideoId);
    const [uploadSuccess, setUploadSuccess] = useState("");
    const [error, setError] = useState("");
    useEffect(()=>{
        setContent(props.defaultValue);
        setCurrentId(props.currentVideoId);
    },[props])
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("files", selectedFiles[0]);
        formData.append("ref", "api::module.module");
        formData.append("refId", props.module_id);
        formData.append("field", "audio");
        try {
          const response = await axios({
            method: "post",
            url: `${import.meta.env.VITE_DOMAIN}/api/upload`,
            data: formData,
            onUploadProgress: data => {
                setProgress(Math.round((100 * data.loaded) / data.total))
            },
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          });
          console.log("File uploaded successfully:", response);
          let data = response.data[0];
          setUploadSuccess("File uploaded successfully.");
          if(currentId){
            axios({
                method: "delete",
                url: `${import.meta.env.VITE_DOMAIN}/api/upload/files/${currentId}`,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              }).then((response) => {
                window.location.reload();
              });
          }else{
              window.location.reload();
          }
        } catch (error) {
          console.error("Error uploading file:", error.response.data);
          setError("Error uploading file.");
        }
      };
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex gap-3'>
                <input type="file" onChange={e => {
                    setSelectedFiles(e.target.files)
                }} className="file-input file-input-bordered max-w-xs" />
                <button className='btn btn-neutral' onClick={submitHandler} >Upload</button>
            </div>
            <progress className="progress progress-primary w-6/12" value={progress} max="100"></progress>
            <audio className="w-3/4" src={import.meta.env.VITE_DOMAIN+content} controls></audio>
        </div>
    )

}

export default AudioUpload