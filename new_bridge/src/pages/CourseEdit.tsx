import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { CourseType, LessonType, ModuleType } from "../types/courses";
function CourseEdit() {
  const [course, setCourse] = useState({});
  const [subject, setSubject] = useState<String>();
  const { course_id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState<String>("");
  const [description, setDescription] = useState<String>("");
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [moduleType, setModuleType] = useState("article");
  const [moduleName, setModuleName] = useState("");

  const fetchCourse = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_DOMAIN
        }/api/courses/${course_id}?populate[0]=lessons&populate[1]=lessons.modules`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        let data: CourseType = response.data.data;
        console.log(data);
        setCourse(data);
        setName(data.attributes.name);
        setSubject(data.attributes.subject);
        setLessons(data.attributes.lessons.data);
        setDescription(data.attributes.description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (course_id) {
      fetchCourse();
    }
  }, [course_id]);

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_DOMAIN}/api/courses/${course_id}`,
        {
          data: {
            name: name,
            subject: subject,
            description: description,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        setAlertText("บันทึกสำเร็จ");
        setShowAlert(true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addModule = (lesson_id: Number) => {
    axios
      .post(
        `${import.meta.env.VITE_DOMAIN}/api/modules`,
        {
          data: {
            name: moduleName,
            type: moduleType,
            lesson: [lesson_id],
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        setAlertText("บันทึกสำเร็จ");
        setShowAlert(true);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const deleteModule = e => {
      e.stopPropagation();

  }
  const reorderUp = (
    lesson_id: Number,
    current_id: Number,
    neworder_id: Number
  ) => {
    axios
      .put(
        `${import.meta.env.VITE_DOMAIN}/api/lessons/${lesson_id}`,
        {
          data: {
            modules: {
              connect: [{ id: current_id, position: { before: neworder_id } }],
            },
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        setAlertText("บันทึกสำเร็จ");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
        fetchCourse();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reorderDown = (
    lesson_id: Number,
    current_id: Number,
    neworder_id: Number
  ) => {
    axios
      .put(
        `${import.meta.env.VITE_DOMAIN}/api/lessons/${lesson_id}`,
        {
          data: {
            modules: {
              connect: [{ id: current_id, position: { after: neworder_id } }],
            },
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        setAlertText("บันทึกสำเร็จ");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 1000);
        fetchCourse();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <div className="toast toast-top toast-end z-50">
        {showAlert && (
          <div className="alert bg-green-500">
            <span>{alertText}</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h1 className="text-xl font-bold">แก้ไขคอร์ส</h1>
      </div>
      <div className="p-5 w-3/4 self-center">
        <form className="form-control gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-lg">ชื่อคอร์ส</label>
            <input
              className="input input-sm input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="subject" className="text-lg">
              วิชา
            </label>
            <select
              name="subject"
              id=""
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="science" selected={subject == "science"}>
                วิทยาศาสตร์
              </option>
              <option value="math" selected={subject == "math"}>
                คณิตศาสตร์
              </option>
              <option value="thai" selected={subject == "thai"}>
                ภาษาไทย
              </option>
              <option value="english" selected={subject == "english"}>
                ภาษาอังกฤษ
              </option>
              <option value="social" selected={subject == "social"}>
                สังคมศาสตร์
              </option>
              <option value="preschool" selected={subject == "preschool"}>
                พื้นฐานอนุบาล
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">คำอธิบายคอร์ส</label>
            <textarea
              className="textarea textarea-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg">บทเรียน</label>
            <div className="join join-vertical w-full">
              {lessons.map((lesson, index) => {
                return (
                  <div className="collapse collapse-arrow join-item border border-2 border-stone-400">
                    <input
                      type="radio"
                      name="my-accordion-4"
                      defaultChecked={index == 0}
                    />
                    <div className="collapse-title text-sm font-medium bg-base-300">
                      {lesson.attributes.name}
                    </div>
                    <div className="collapse-content bg-base-200">
                      {lesson.attributes.modules && (
                        <ul className="menu gap-1 p-1">
                          {lesson.attributes.modules.data.map(
                            (module: ModuleType, index: Number) => {
                              let lessonLength =
                                lesson.attributes.modules.data.length;
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
                                    <div className="text-sm">
                                      {module.attributes.name}
                                    </div>
                                    <div>
                                      {index > 0 && (
                                        <div
                                          className="btn btn-xs bg-stone-200"
                                          onClick={(e: Event) => {
                                            e.stopPropagation();
                                            reorderUp(
                                              lesson.id,
                                              module.id,
                                              lesson.attributes.modules.data[
                                                index - 1
                                              ].id
                                            );
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 1024 1024"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M512 320L192 704h639.936z"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                      {index == 0 && (
                                        <div className="btn btn-ghost btn-xs bg-stone-400">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 1024 1024"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M512 320L192 704h639.936z"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                      {index < lessonLength - 1 && (
                                        <div
                                          className="btn btn-xs bg-stone-200"
                                          onClick={(e: Event) => {
                                            e.stopPropagation();
                                            reorderDown(
                                              lesson.id,
                                              module.id,
                                              lesson.attributes.modules.data[
                                                index + 1
                                              ].id
                                            );
                                          }}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 1024 1024"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="m192 384l320 384l320-384z"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                      {index >= lessonLength - 1 && (
                                        <div className="btn btn-ghost  btn-xs bg-stone-400">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 1024 1024"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="m192 384l320 384l320-384z"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                      <div
                                        className="text-red-700 btn btn-sm btn-ghost"
                                        onClick={(event) =>
                                          removeFile(event, item)
                                        }
                                      >
                                        <svg
                                          width="20"
                                          height="20"
                                          viewBox="0 0 21 21"
                                        >
                                          <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m15.5 15.5l-10-10zm0-10l-10 10"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            }
                          )}
                          <li className="w-full grid grid-cols-4 gap-1">
                            <input
                              className="col-span-2 input input-sm input-bordered"
                              type="text"
                              value={moduleName}
                              onChange={(e) => setModuleName(e.target.value)}
                            />
                            <select
                              name=""
                              id=""
                              onChange={(e) => setModuleType(e.target.value)}
                            >
                              <option
                                value="article"
                                selected={moduleType == "article"}
                              >
                                บทความ
                              </option>
                              <option
                                value="video"
                                selected={moduleType == "video"}
                              >
                                วีดีโอ
                              </option>
                              <option
                                value="audio"
                                selected={moduleType == "audio"}
                              >
                                เสียง
                              </option>
                              <option
                                value="quiz"
                                selected={moduleType == "quiz"}
                              >
                                แบบทดสอบ
                              </option>
                            </select>
                            <div
                              className="btn btn-neutral btn-sm"
                              onClick={() => addModule(lesson.id)}
                            >
                              เพิ่ม module
                            </div>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button type="submit" className="btn bg-slate-400 w-1/4 self-center">
            submit
          </button>
        </form>
      </div>
      <dialog id="delete_module_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            ยืนยันที่จะลบ moodule?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-warning" onClick={(event)=>deleteModule(event)}>ยืนยัน</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default CourseEdit;
