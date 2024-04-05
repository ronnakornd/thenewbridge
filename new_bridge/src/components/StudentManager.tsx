import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentManager(props) {
  const [student, setStudent] = useState([]);
  const [studentFilter, setStudentFilter] = useState("");
  const [courseStudent, setCourseStudent] = useState(
    props.course.attributes.enrolled_students.data
  );

  useEffect(() => {
    let course_id = props.course_id;
    axios
      .get(
        `${
          import.meta.env.VITE_DOMAIN
        }/api/users?filters[position][$eq]=student&populate=*`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((response) => {
        let data = response.data;
        setStudent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props]);

  const addStudent = (student_id) => {
    axios
      .put(
        `${import.meta.env.VITE_DOMAIN}/api/courses/${props.course.id}`,
        {
          data: {
            enrolled_students: {
              connect: [student_id],
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

  const removeStudent = (student_id) => {
    axios
      .put(
        `${import.meta.env.VITE_DOMAIN}/api/courses/${props.course.id}`,
        {
          data: {
            enrolled_students: {
              disconnect: [student_id],
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
        placeholder="เพิ่มผู้เรียน.."
        onChange={(e) => setStudentFilter(e.target.value)}
      />
      {studentFilter != "" && (
        <ul className="menu menu-dropdown rounded-b-lg bg-stone-200">
          {student.map((student) => {
            if (
              student.firstName
                .toLowerCase()
                .indexOf(studentFilter.toLocaleLowerCase()) > -1 &&
              courseStudent.findIndex(
                (item) => item.attributes.firstName == student.firstName
              ) == -1
            ) {
              return (
                <li>
                  <a onClick={() => addStudent(student.id)}>
                    <p>
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-stone-500">{`(${student.nickName})`}</p>
                  </a>
                </li>
              );
            }
          })}
        </ul>
      )}
      <ul className="w-full mt-2 max-h-48 flex flex-col gap-1 overflow-auto">
        {courseStudent.map((item) => {
          return (
            <li className="bg-slate-200  rounded-lg py-1 px-2">
              <div className="flex justify-between items-center">
                <div>
                <p className="text-sm">{item.attributes.firstName} {item.attributes.lastName}</p>
                <p className="text-xs text-stone-500">{item.attributes.nickName}</p>
                </div>
                <div
                  className="text-red-700 btn btn-sm btn-ghost"
                  onClick={() => removeStudent(item.id)}
                >
                  <svg  width="20" height="20" viewBox="0 0 21 21">
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

export default StudentManager;
