import React, { useState, useEffect } from "react";
import axios from "axios";

function FileUpload(props) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState(props.defaultValue);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [error, setError] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", selectedFiles[0]);
    formData.append("ref", "api::module.module");
    formData.append("refId", props.module_id);
    formData.append("field", "resource");
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
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error.response.data);
      setError("Error uploading file.");
    }
  };

  const removeFile = (event, item) => {
    event.preventDefault();
    axios({
      method: "delete",
      url: `${import.meta.env.VITE_DOMAIN}/api/upload/files/${item.id}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((response) => {
      window.location.reload();
    });
  };

  useEffect(() => {
    setContent(props.defaultValue);
    console.log(props.defaultValue);
  }, [props.defaultValue]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <input
          type="file"
          onChange={(e) => {
            setSelectedFiles(e.target.files);
          }}
          className="file-input file-input-bordered max-w-xs"
        />
        <button className="btn btn-neutral" onClick={submitHandler}>
          Upload
        </button>
      </div>
      <progress
        className="progress progress-primary w-6/12"
        value={progress}
        max="100"
      ></progress>
      <div className="p-0 flex menu flex-col w-3/4">
        {content &&
          content.map((item) => {
            return (
              <a
                className="btn flex justify-between bg-stone-300"
                href={import.meta.env.VITE_DOMAIN+item.attributes.url}
                download=""
                target="_self"
              >
                <p>{item.attributes.name}</p>
                <div
                  className="text-red-700 btn btn-sm btn-ghost"
                  onClick={(event) => removeFile(event, item)}
                >
                  <svg width="20" height="20" viewBox="0 0 21 21">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m15.5 15.5l-10-10zm0-10l-10 10"
                    />
                  </svg>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default FileUpload;
