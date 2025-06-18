"use client";
import { useEffect, useRef, useState } from "react";
import Tooltip from '@mui/material/Tooltip';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ top: 30, left: 20 });
  const headerRef = useRef(null);

  useEffect(() => {
    const elmnt = headerRef.current;
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e: any) => {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e: any) => {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      setPosition((prev) => ({
        top: prev.top - pos2,
        left: prev.left - pos1,
      }));
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    if (elmnt) {
      //@ts-ignore
      elmnt.onmousedown = dragMouseDown;
    }

    return () => {
      //@ts-ignore
      if (elmnt) elmnt.onmousedown = null;
      document.onmouseup = null;
      document.onmousemove = null;
    };
  }, [showPopup]);

  return (
    <>
      {/* Main Content */}
      <div className="flex flex-col justify-center items-center min-h-screen relative z-10 py-7">
        <div className="flex justify-between items-center w-full px-7 lg:px-0 lg:w-[70vw] z-10 mb-3">
          <h1 className="text-4xl font-bold text-shadow-md font-dancing">Yunation</h1>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-[#FFF0F4] cursor-pointer border border-[#B7B1F2] text-center rounded-full font-bold py-2 px-7"
          >
            About Us
          </button>
        </div>

        {/* Konten utama */}
        <div className="bg-white shadow-lg lg:w-[70vw] lg:max-h-[70vh] mx-8 my-1 z-10 flex flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-2/3">
            <div className="flex h-1/2">
              <img
                className="w-1/2 h-full object-cover border"
                src="https://pbs.twimg.com/media/F9b-dY9aMAAac0P.jpg"
                alt="img1"
              />
              <img
                className="w-1/2 h-full object-cover border"
                src="https://pbs.twimg.com/media/F2vzXNlaMAAO6Gi.jpg"
                alt="img2"
              />
            </div>

            <iframe
              className="w-full h-50 lg:h-100 border"
              src="https://www.youtube.com/embed/M89C6vstdbw?si=Ujb2Q5qu8aboFJk7"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="hidden lg:block w-full lg:w-1/2 h-auto">
            <img
              className="w-full h-full object-cover border"
              src="https://pbs.twimg.com/media/GDMouUxaUAAUuSG.jpg:large"
              alt="big img"
            />
          </div>
        </div>

        <div className="flex gap-6 mt-3 z-10 flex-col lg:flex-row w-full lg:w-auto px-8 font-caveat font-semibold text-xl">
          <a className="bg-[#FFE8CD] hover:bg-[#FFE8CD]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer">Instagram</a>
          <a className="bg-[#FFF2EB] hover:bg-[#FFF2EB]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer">Discord</a>
          <a className="bg-[#FFDCDC] hover:bg-[#FFDEEE]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer">Youtube</a>
        </div>

        <Tooltip title={'Have a good x10000000 day for everyone!! :D'} arrow>
          <button className="cursor-pointer lg:fixed bottom-4 right-4 z-20">
            <img src="/chibiyuna.png" className="h-30" />
          </button>
        </Tooltip>

        <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
          <img src="/wave.svg" className="w-full" />
        </div>
      </div >

      {/* Popup About Window */}
      {
        showPopup && (
          <div
            className="fixed z-50 w-[90vw] lg:w-[68vw] h-[90vh] lg:h-[78vh] bg-white border shadow-lg rounded-lg overflow-hidden"
            style={{ top: position.top, left: position.left }}
          >
            {/* Header draggable */}
            <div
              ref={headerRef}
              className="cursor-move px-4 py-2 border-b flex justify-between items-center"
            >
              <h2 className="font-bold">About :3</h2>
              <button onClick={() => setShowPopup(false)} className="text-lg cursor-pointer">✖</button>
            </div>

            {/* Iframe */}
            <iframe
              src="/about"
              className="w-full h-full"
              title="About Us"
            ></iframe>
          </div>
        )
      }
    </>
  );
}
