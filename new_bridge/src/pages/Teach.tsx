import axios from "axios";
import { useState, useEffect } from "react";
import TeacherManager from "../components/TeacherManager";
import StudentManager from "../components/StudentManager";
import StudentList from "../components/StudentList";
import { useParams, useNavigate } from "react-router-dom";
function Teach() {
  let [courseFilter, setCourseFilter] = useState("");
  let [subjectFilter, setSubjectFilter] = useState("");
  let [courses, setCourses] = useState([]);
  let [selectedCourse, setSelectedCourse] = useState();
  let [sort, setSort] = useState("old");
  let { course_id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(
        `${import.meta.env.VITE_DOMAIN}/api/courses?filters[editors][id][$eq]=${
          user.id
        }&populate[0]=editors&populate[1]=editors.profileImage&populate[2]=enrolled_students&populate[3]=enrolled_students.profileImage`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        let data = response.data.data;
        console.log(data);
        setCourses(data);
        if(course_id){
          setSelectedCourse(data.find(item=> item.id == course_id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [course_id]);

  const sortCourses = () => {
    if (sort === "old") {
      let newCourse = courses.sort(
        (a, b) =>
          new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
      );
      setCourses([...newCourse]);
    } else {
      let newCourse = courses.sort(
        (a, b) =>
          new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt)
      );
      setCourses([...newCourse]);
    }
  };

  return (
    <div className="w-full grid grid-flow-col grid-cols-3">
      <div className="min-h-screen bg-stone-300 p-5">
        <h1 className="text-xl font-bold mb-2">คอร์สของฉัน</h1>
        <div className="flex justify-start items-center gap-1">
          <input
            type="text"
            className="input input-sm w-full"
            placeholder="ค้นหา..."
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          />
          <div
            className="btn btn-ghost"
            onClick={() => document.getElementById("filter_modal").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 12 12"
            >
              <path
                fill="currentColor"
                d="M1 2.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m2 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
              />
            </svg>
          </div>
          <dialog id="filter_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">ตัวกรอง</h3>
              <div className="flex flex-col">
                <label htmlFor="subject">วิชา</label>
                <select
                  name="subject"
                  id=""
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  <option value="science" selected={subjectFilter == "science"}>
                    วิทยาศาสตร์
                  </option>
                  <option value="math" selected={subjectFilter == "math"}>
                    คณิตศาสตร์
                  </option>
                  <option value="thai" selected={subjectFilter == "thai"}>
                    ภาษาไทย
                  </option>
                  <option value="english" selected={subjectFilter == "english"}>
                    ภาษาอังกฤษ
                  </option>
                  <option value="social" selected={subjectFilter == "social"}>
                    สังคมศาสตร์
                  </option>
                  <option value="" selected={subjectFilter == ""}>
                    ทุกวิชา
                  </option>
                </select>
                <label htmlFor="subject">เรียงตาม</label>
                <select
                  name="sort"
                  id=""
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    sortCourses();
                  }}
                >
                  <option value="old" selected={sort == "old"}>
                    เก่าไปใหม่
                  </option>
                  <option value="new" selected={sort == "new"}>
                    ใหม่ไปเก่า
                  </option>
                </select>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <ul className="menu gap-1 mt-2 p-0">
          {courses.map((item) => {
            if (
              item.attributes.name
                .toLowerCase()
                .indexOf(courseFilter.toLocaleLowerCase()) > -1
            ) {
              if (subjectFilter != "") {
                if (item.attributes.subject == subjectFilter) {
                } else {
                  return;
                }
              }
              return (
                <li key={item.id} className="rounded-md bg-stone-400">
                  <a onClick={() => navigate(`/teach/${item.id}`)}>
                    {item.attributes.name}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className="bg-stone-200 col-span-2 p-5">
        {selectedCourse && (
          <div className="w-full flex flex-col gap-2 justify-center">
            <h1 className="text-2xl font-bold">{selectedCourse.attributes.name}</h1>
            <div className="flex items-center gap-2"><a className="btn btn-neutral btn-sm" href={`/course_edit/${selectedCourse.id}`}>แก้ไขคอร์ส</a>
            <div className="btn bg-red-400 btn-sm">ลบคอร์ส</div>
            </div>
            <h2 className="text-lg flex items-center gap-1">
              ผู้สอน{" "}
              <a onClick={()=>document.getElementById('editor_modal').showModal()} className="text-primary hover:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  />
                </svg>
              </a>
            </h2>
            <dialog id="editor_modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">จัดการผู้สอน</h3>
                <div className="w-full">
                <TeacherManager course={selectedCourse} />
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            {selectedCourse.attributes.editors.data.map((editor) => {
              return (
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 rounded-full border border-2 border-stone-600"
                    src={editor.attributes.profileImage.data?
                      import.meta.env.VITE_DOMAIN +
                      editor.attributes.profileImage.data.attributes.url:"/images/profile.jpg"
                    }
                  ></img>
                  <p>{`${editor.attributes.firstName} ${editor.attributes.lastName}`}</p>
                </div>
              );
            })}
            <h2 className="text-lg flex items-center gap-1">
              ผู้เรียน
              <a onClick={()=>document.getElementById('student_modal').showModal()} className="text-primary hover:text-blue-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  />
                </svg>
              </a>
            </h2>
            <dialog id="student_modal" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">จัดการผู้เรียน</h3>
                <div className="w-full">
                <StudentManager course={selectedCourse} />
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            <StudentList students={selectedCourse.attributes.enrolled_students.data} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Teach;
