import { useState, useEffect } from "react";
import axios from "axios";

function TeacherList() {
  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DOMAIN}/api/teachers?populate=image`)
      .then((response) => {
        setTeacher(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold mb-2">คณะผู้สอน</h1>
      <div className="mt-2 grid grid-cols-4 gap-1 w-full">
        {teacher.map((item: any) => {
          return (
            <div className="card w-full min-h-96 bg-stone-300 p-3">
              <figure>
                <img
                  src={ `${import.meta.env.VITE_DOMAIN}`+item.attributes.image.data.attributes.url}
                  className="rounded-full w-32 h-32"
                  style={{
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </figure>
              <div className="card-body">
                <h1 className="card-title font-bold text-xl">
                  {item.attributes.name}
                </h1>
                <div>
                  <p>
                    {item.attributes.bachelor_degree} <br />
                    {item.attributes.bachelor_graduated}
                  </p>
                </div>
                <div>
                  <p className="font-bold">วิชาที่สอน</p>
                  <p>{item.attributes.subject}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TeacherList;
