import React, { useState, useEffect } from 'react'
import axios from 'axios'


function FileUpload(props) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [content, setContent] = useState(props.defaultValue);

    const submitHandler = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("file", selectedFiles[0])
        axios.post(`${import.meta.env.VITE_DOMAIN}/upload`, formData, {
            onUploadProgress: data => {
                setProgress(Math.round((100 * data.loaded) / data.total))
            }
        }).then(function (response) {
            console.log(response);
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                setContent(response.data.filename);
                let contentChange = props.contentChange;
                contentChange(response.data.filename);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(()=>{
         setContent(props.defaultValue);
    },[props.defaultValue])
    return (
        <div className='flex flex-col gap-5'>
            <div className='flex gap-3'>
                <input type="file" onChange={e => {
                    setSelectedFiles(e.target.files)
                }} className="file-input file-input-bordered max-w-xs" />
                <button className='btn btn-neutral' onClick={submitHandler} >Upload</button>
            </div>
            <progress className="progress progress-primary w-6/12" value={progress} max="100"></progress>
            <div className='p-5 bg-slate-200'>
            <a className='link' href={ `${import.meta.env.VITE_DOMAIN}/uploads/` + content} download>{content}</a>
            </div>
        </div>
    )
}

export default FileUpload