import React from "react";

function Hero() {
  return (
    <div
      className="hero min-h-96  backdrop-blur-lg"
      style={{
        backgroundImage: "url('./assets/hero.jpg')",
        backgroundSize: "strech",
      }}
    >
      <div className="hero-overlay  bg-white bg-opacity-20 backdrop-blur"></div>
      <div className="hero-content  text-center text-neutral-content">
        <div className="max-w-xl backdrop-blur-sm backdrop-opacity-90 p-10">
          <h1 className="mb-5 text-5xl font-bold text-blue-600 drop-shadow-2xl">
            โรงเรียนกวดวิชาบริดจ์
          </h1>
          <p className="mb-5 text-slate-700 text-xl">
            โรงเรียนกวดวิชา คณิตศาสตร์ ภาษาอังกฤษ และ วิทยาศาสตร์
            สำหรับเตรียมตัวสอบเข้า ม.1 และ ม.4 และติวเพิ่มเกรดตั้งแต่ชั้น อนุบาล
            3 ถึง ชั้น ม.3
          </p>
          <button className="btn btn-primary text-white">ดูคอร์สที่สอน</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
