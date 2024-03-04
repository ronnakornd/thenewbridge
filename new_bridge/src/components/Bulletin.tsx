function Bulletin() {
  return (
    <div className="flex gap-2 mt-2 mb-2">
      <div className="w-7/12">
        <video
          muted
          loop
          playsInline
          controls
          autoPlay
          className="w-4/4 bordered border-2 border-stone-400 rounded-lg"
          src="/videos/promote.mp4"
        ></video>
      </div>
      <div className="w-5/12">
              <div className=" bg-slate-200 w-full h-full rounded-lg">
                   <div className="card-body flex flex-col p-1">
                   <div className="card-title font-bold text-2xl">บทความ</div>
                   <div className="flex flex-col gap-1 items-center">
                       <div className="bg-stone-200 bordered border-2 border-stone-400 p-1 flex gap-2 justify-around w-full h-28 rounded-md">
                          <img src="/assets/logo.png" alt="" className="w-1/4" />
                          <div className="w-3/4 flex flex-col justify-start">
                               <h2 className="font-bold text-lg">Title</h2>
                               <p className="text-sm">description</p>
                               <p className="self-end text-xs px-2">date</p>
                          </div>
                       </div>
                   </div>
                   <div className="self-end">
                     <a className="link link-hover link-primary">เพิ่มเติม..</a>
                   </div>
                   </div>
              </div>
      </div>
    </div>
  );
}

export default Bulletin;
