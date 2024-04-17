import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QuillEditor from "../components/QuillEditor";
import VideoUpload from "../components/VideoUpload";
import QuizEditor from "../components/QuizEditor";
import FileUpload from "../components/FileUpload";
import AudioUpload from "../components/AudioUpload";
import type { CourseType, LessonType, ModuleType } from "../types/courses";
function ModuleEdit() {
  let { module_id } = useParams();
  let [course, setCourse] = useState<CourseType>({
    id: 0,
    attributes: {
      name: "",
      subject: "",
      description: "",
      lessons: { data: [] },
      editors: { data: [] },
    },
  });
  let [module, setModule] = useState<ModuleType>({
    id: 0,
    attributes: { name: "", type: "article", description: "", content: "" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [module_id]);

  const fetchData = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_DOMAIN
        }/api/modules/${module_id}?populate[0]=lesson&populate[1]=lesson.courses&populate[2]=lesson.courses.editors&populate[3]=lesson.courses.lessons&populate[4]=lesson.courses.lessons.modules&populate[5]=resource&populate[6]=video`
      )
      .then(function (response) {
        console.log(response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          let responseModule = response.data.data;
          let responseLesson = responseModule.attributes.lesson.data;
          let responseCourse = responseLesson.attributes.courses.data[0];
          setModule(responseModule);
          setCourse(responseCourse);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function descriptionChange(value) {
    let currentModule = module;
    currentModule.attributes.description = value;
    setModule({ ...currentModule });
  }

  function contentChange(value) {
    let currentModule = module;
    currentModule.attributes.content = value;
    setModule({ ...currentModule });
  }

  function fileChange(value) {
    let currentModule = module;
    currentModule.attributes.file = value;
    setModule({ ...currentModule });
  }

  function nameChange(event) {
    let currentModule = module;
    currentModule.attributes.name = event.target.value;
    setModule({ ...currentModule });
  }

  const saveModule = () => {
    let content = module.attributes.content;
    if (module.attributes.type == "quiz") {
      content = JSON.stringify(content);
    }
    axios
      .put(
        `${import.meta.env.VITE_DOMAIN}/api/modules/${module.id}`,
        {
          data: {
            name: module.attributes.name,
            description: module.attributes.description,
            content: content,
            type: module.attributes.type,
            file: module.attributes.file,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.error) {
          console.log(response.data.error);
          if (response.data.error_id == 1) {
            coursenameInput.current.style.border = "2px solid red";
            coursenameWarning.current.innerHTML = response.data.error;
          }
          navigate("/learn");
        } else {
          fetchData();
          window.save_modal.showModal();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-start p-1 md:p-5">
      <div className="grid md:grid-cols-8">
        <div className="w-12/12 md:col-span-2  h-full">
          <div>
            <h1 className="text-2xl font-noto-sans font-bold px-2">
              {course.attributes.name}
            </h1>
            <ul className="menu bg-base-200  w-full">
              <div className="join join-vertical w-full">
                {course.attributes.lessons.data.map((lesson, index) => {
                  return (
                    <div className="collapse collapse-arrow join-item border border-stone-400">
                      <input
                        type="radio"
                        name="my-accordion-4"
                        defaultChecked={index == 0}
                      />
                      <div className="collapse-title text-sm font-medium bg-base-300">
                        {lesson.attributes.name}
                      </div>
                      <div className="collapse-content p-1 bg-base-200">
                        {lesson.attributes.modules && (
                          <ul className="menu gap-1 p-1">
                            {lesson.attributes.modules.data.map(
                              (module: ModuleType, index: Number) => {
                                return (
                                  <li
                                    className="bg-stone-300  flex flex-row gap-1"
                                    onClick={() =>
                                      (window.location.href = `/module_edit/${module.id}`)
                                    }
                                  >
                                    <div className="w-full">
                                      {
                                        {
                                          article: (
                                            <div className="">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  fill="currentColor"
                                                  d="M21 5c-1.11-.35-2.33-.5-3.5-.5c-1.95 0-4.05.4-5.5 1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5c.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5c1.35-.85 3.8-1.5 5.5-1.5c1.65 0 3.35.3 4.75 1.05c.1.05.15.05.25.05c.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5c-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5c1.2 0 2.4.15 3.5.5v11.5z"
                                                />
                                                <path
                                                  fill="currentColor"
                                                  d="M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99zM13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99c.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24c-1.7 0-3.24.3-4.5.83zm4.5 1.84c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99c.88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24z"
                                                />
                                              </svg>
                                            </div>
                                          ),
                                          quiz: (
                                            <div>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  fill="currentColor"
                                                  d="M11.07 12.85c.77-1.39 2.25-2.21 3.11-3.44c.91-1.29.4-3.7-2.18-3.7c-1.69 0-2.52 1.28-2.87 2.34L6.54 6.96C7.25 4.83 9.18 3 11.99 3c2.35 0 3.96 1.07 4.78 2.41c.7 1.15 1.11 3.3.03 4.9c-1.2 1.77-2.35 2.31-2.97 3.45c-.25.46-.35.76-.35 2.24h-2.89c-.01-.78-.13-2.05.48-3.15zM14 20c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2z"
                                                />
                                              </svg>
                                            </div>
                                          ),
                                          video: (
                                            <div>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  fill="currentColor"
                                                  d="M21 3H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7z"
                                                />
                                              </svg>
                                            </div>
                                          ),
                                          audio: (
                                            <div>
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  fill="currentColor"
                                                  d="M10.75 19q.95 0 1.6-.65t.65-1.6V13h3v-2h-4v3.875q-.275-.2-.588-.288t-.662-.087q-.95 0-1.6.65t-.65 1.6q0 .95.65 1.6t1.6.65ZM6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v12q0 .825-.588 1.413T18 22H6Zm7-13h5l-5-5v5Z"
                                                ></path>
                                              </svg>
                                            </div>
                                          ),
                                        }[module.attributes.type]
                                      }
                                      <div className="text-xs">
                                        {module.attributes.name}
                                      </div>
                                    </div>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ul>
          </div>
        </div>
        <div className="w-12/12 md:col-span-6">
          <div className="grid grid-cols-1 gap-1 md:p-3">
            <div className="text-xl font-bold mb-2">แก้ไขModule</div>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 text-lg">
                ชื่อ Module
              </label>
              <input
                type="text"
                onChange={nameChange}
                value={module.attributes.name}
                className="input input-sm w-2/4 input-bordered"
                name=""
                id="name"
              />
            </div>
            <div className="flex flex-col w-3/4">
              <label htmlFor="name" className="mb-1 text-lg">
                คำอธิบาย
              </label>
              <QuillEditor
                contentChange={descriptionChange}
                defaultValue={module.attributes.description}
              />
            </div>
            <div className="flex flex-col w-3/4">
              <div className="text-lg">เนื้อหา</div>
              {
                {
                  article: (
                    <QuillEditor
                      contentChange={contentChange}
                      defaultValue={module.attributes.content}
                    />
                  ),
                  quiz: (
                    <QuizEditor
                      contentChange={contentChange}
                      defaultValue={module.attributes.content}
                    />
                  ),
                  video: (
                    <VideoUpload
                      contentChange={contentChange}
                      module_id={module.id}
                      defaultValue={() => {
                        if(module.attributes.video.data != null){
                          return module.attributes.video.data.attributes.url
                        }
                      }}
                    />
                  ),
                  audio: (
                    <AudioUpload
                      contentChange={contentChange}
                      defaultValue={module.attributes.content}
                    />
                  ),
                }[module.attributes.type]
              }
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className=" font-noto-sans mb-1">
                ไฟล์
              </label>
              <FileUpload
                contentChange={fileChange}
                defaultValue={
                  module.attributes.resource
                    ? module.attributes.resource.data
                    : []
                }
                module_id={module.id}
              />
            </div>
            <div className="flex flex-col justify-start items-start">
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/course_layout/${course_id}`)}
                  className="btn bg-slate-400"
                >
                  <svg
                    className="text-white text-3xl"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m12 16l1.4-1.4l-1.6-1.6H16v-2h-4.2l1.6-1.6L12 8l-4 4l4 4Zm0 6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                    ></path>
                  </svg>
                  previous
                </button>
                <button className="btn btn-neutral" onClick={saveModule}>
                  <svg
                    className="text-white text-3xl"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1V9.5A1.5 1.5 0 0 1 5.5 8h5A1.5 1.5 0 0 1 12 9.5V13a1 1 0 0 0 1-1V5.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 10.379 3H10v1.5A1.5 1.5 0 0 1 8.5 6h-2A1.5 1.5 0 0 1 5 4.5V3H4Zm2 0v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V3H6Zm5 10V9.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V13h6ZM2 4a2 2 0 0 1 2-2h6.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 14 5.621V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z"
                    ></path>
                  </svg>
                  save
                </button>
                <button
                  onClick={() => navigate(`/preview/${module_id}`)}
                  className="btn bg-slate-400"
                >
                  <svg
                    className="text-white text-3xl"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm.2-9l-.9.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l.9.9H9q-.425 0-.713.288T8 12q0 .425.288.713T9 13h3.2Z"
                    ></path>
                  </svg>
                  next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id="save_modal" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg">บันทึกการเปลี่ยนแปลง</h3>
          <p className="py-4">บันทึกสำเร็จ</p>
        </form>
      </dialog>
    </div>
  );
}

export default ModuleEdit;
