import React from "react";

function Subjects() {
  return (
    <div className="flex flex-row justify-between gap-2 ">
      <div
        className="card w-4/12 h-20 bg-base-100 shadow-sm"
        style={{
          backgroundImage: "url('/assets/math.webp')",
          backgroundSize: "cover",
          backgroundPositionY: "-100px",
        }}
      >
        <div className="card-body ">
           <div className="flex justify-center items-center w-full h-full">
           <h1 className="text-3xl text-cyan-800 font-bold bg-white bg-opacity-90 p-1 rounded-lg">Math</h1>
           </div>
        </div>
      </div>
      <div
        className="card w-4/12 h-20 bg-base-100 shadow-sm"
        style={{
          backgroundImage: "url('/assets/science.webp')",
          backgroundSize: "cover",
          backgroundPositionY: "-100px",
        }}
      >
        <div className="card-body">
        <div className="flex justify-center items-center w-full h-full">
           <h1 className="text-3xl text-cyan-800 font-bold bg-white bg-opacity-90 p-1 rounded-lg">Science</h1>
           </div>
        </div>
      </div>
      <div
        className="card w-4/12 h-20 bg-base-100 shadow-sm"
        style={{
          backgroundImage: "url('/assets/english.webp')",
          backgroundSize: "cover",
          backgroundPositionY: "-100px",
        }}
      >
        <div className="card-body">
        <div className="flex justify-center items-center w-full h-full">
           <h1 className="text-3xl text-cyan-800 font-bold bg-white bg-opacity-90 p-1 rounded-lg">English</h1>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Subjects;
