import React, { useState, useEffect } from 'react'
import axios from 'axios'


function ImageUpload(props) {
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
        <div className='flex flex-col'>
            <img className='bg-slate-300 object-cover' src={ `${import.meta.env.VITE_DOMAIN}/uploads/` + content} alt="image" width={200} height={200} />
            <div className='flex flex-col gap-1'>
                <input type="file" onChange={e => {
                    setSelectedFiles(e.target.files)
                }} className="text-sm" />
                <button className='bg-white p-1 hover:bg-slate-100 text-sm' onClick={submitHandler} >Upload</button>
            </div>
            <div className='p-5 bg-slate-200'>
            </div>
        </div>
    )
}

export default ImageUpload