import React from "react";

function Gallery() {
  const images = [
    { link: "https://picsum.photos/200" },
    { link: "https://picsum.photos/300" },
    { link: "https://picsum.photos/100" },
    { link: "https://picsum.photos/500" },
  ];
  return (
    <div className="w-full p-5">
      <h1 className="text-2xl mb-2 font-bold">ภาพบรรยากาศ</h1>
      <div className="flex gap-2">
        {images.map((image) => {
          return <img className="w-3/12" src={image.link}></img>;
        })}
      </div>
    </div>
  );
}

export default Gallery;
