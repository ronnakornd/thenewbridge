import React, { useEffect, useState } from "react";
import axios from "axios";

function TeacherManager(props) {
  const [teacher, setTeacher] = useState([]);
  const [teacherFilter, setTeacherFilter] = useState("");
  const [courseTeacher, setCourseTeacher] = useState(
    props.course.attributes.editors.data
  );

  useEffect(() => {
    let course_id = props.course_id;
    let user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(
        `${
          import.meta.env.VITE_DOMAIN
        }/api/users?filters[position][$eq]=teacher&populate=*`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        let data = response.data;
        setTeacher(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);

  const addTeacher = (teacher_id) => {
    axios
      .put(
        `${import.meta.env.VITE_DOMAIN}/api/courses/${props.course.id}`,
        {
          data: {
            editors: {
              connect: [teacher_id],
            },
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeTeacher = (teacher_id) => {
    axios
      .put(
        `${import.meta.env.VITE_DOMAIN}/api/courses/${props.course.id}`,
        {
          data: {
            editors: {
              disconnect: [teacher_id],
            },
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="w-full">
      <input
        type="text"
        className="input input-sm input-bordered w-full"
        placeholder="เพิ่มผู้สอน.."
        onChange={(e) => setTeacherFilter(e.target.value)}
      />
      {teacherFilter != "" && (
        <ul className="menu menu-dropdown rounded-b-lg bg-stone-200">
          {teacher.map((teacher) => {
            if (
              teacher.firstName
                .toLowerCase()
                .indexOf(teacherFilter.toLocaleLowerCase()) > -1 &&
              courseTeacher.findIndex(
                (item) => item.attributes.firstName == teacher.firstName
              ) == -1
            ) {
              return (
                <li>
                  <a onClick={() => addTeacher(teacher.id)}>
                    {teacher.firstName} {teacher.lastName}
                  </a>
                </li>
              );
            }
          })}
        </ul>
      )}
      <ul className="w-full mt-2 max-h-48 flex flex-col gap-1 overflow-auto">
        {courseTeacher.map((item) => {
          return (
            <li className="bg-slate-200  rounded-lg py-1 px-2">
              <div className="flex justify-between items-center">
                <p className="text-sm">{item.attributes.firstName} {item.attributes.lastName}</p>
                <div className="text-red-700 btn btn-sm btn-ghost" onClick={() => removeTeacher(item.id)}>
                  <svg
u                    width="20"
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TeacherManager;
