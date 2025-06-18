"use client";
import { useRef, useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [zCounter, setZCounter] = useState(100);
  const [zIndex1, setZIndex1] = useState(100);
  const [zIndex2, setZIndex2] = useState(99);

  const headerRef1 = useRef(null);
  const headerRef2 = useRef(null);
  const popupRef1 = useRef(null);
  const popupRef2 = useRef(null);
  const position1 = useRef({ top: 30, left: 20 });
  const position2 = useRef({ top: 30, left: 20 });

  const startDrag = (headerRef: any, popupRef: any, position: any) => {
    const header = headerRef.current;
    const popup = popupRef.current;
    if (!header || !popup) return;

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    const dragMouseDown = (e: any) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e: any) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      position.current.top -= pos2;
      position.current.left -= pos1;
      popup.style.top = position.current.top + "px";
      popup.style.left = position.current.left + "px";
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    header.onmousedown = dragMouseDown;
  };

  useEffect(() => {
    if (showPopup) startDrag(headerRef1, popupRef1, position1);
  }, [showPopup]);

  useEffect(() => {
    if (showPopup2) startDrag(headerRef2, popupRef2, position2);
  }, [showPopup2]);

  const bringToFront = (which: any) => {
    const nextZ = zCounter + 1;
    setZCounter(nextZ);
    if (which === "popup1") setZIndex1(nextZ);
    else setZIndex2(nextZ);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen relative z-10 py-7">
        <div className="flex justify-between items-center w-full px-7 lg:px-0 lg:w-[70vw] z-10 mb-3">
          <h1 className="text-4xl font-bold text-shadow-md font-dancing">Yunation</h1>
          <button
            onClick={() => {
              setShowPopup(true);
              bringToFront("popup1");
            }}
            className="bg-[#FFF0F4] border border-[#B7B1F2] rounded-full cursor-pointer font-bold py-2 px-7"
          >
            About Us
          </button>
        </div>

        <div className="bg-white shadow-lg lg:w-[70vw] lg:max-h-[70vh] mx-8 my-1 z-10 flex flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-2/3">
            <div className="flex h-1/2">
              <img className="w-1/2 h-full object-cover border" src="https://pbs.twimg.com/media/F9b-dY9aMAAac0P.jpg" alt="img1" />
              <img className="w-1/2 h-full object-cover border" src="https://pbs.twimg.com/media/F2vzXNlaMAAO6Gi.jpg" alt="img2" />
            </div>
            <iframe className="w-full h-50 lg:h-100 border" src="https://www.youtube.com/embed/M89C6vstdbw?si=Ujb2Q5qu8aboFJk7" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <div className="hidden lg:block w-full lg:w-1/2 h-auto">
            <img className="w-full h-full object-cover border" src="https://pbs.twimg.com/media/GDMouUxaUAAUuSG.jpg:large" alt="big img" />
          </div>
        </div>

        <div className="flex gap-6 mt-3 mb-10 lg:mb-0 z-10 flex-col lg:flex-row w-full lg:w-auto px-8 font-caveat font-semibold text-xl">
          <a className="bg-[#FFE8CD] hover:bg-[#FFE8CD]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer" href="https://www.instagram.com/yunayuispink">Instagram</a>
          <a className="bg-[#FFF2EB] hover:bg-[#FFF2EB]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer" href="https://discord.gg/yunayuispink">Discord</a>
          <a className="bg-[#FFDCDC] hover:bg-[#FFDEEE]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer" href="https://youtube.com/@yunayuispink">Youtube</a>
        </div>

        <Tooltip title={'Have a good x10000000 day for everyone!! :D'} componentsProps={{
          tooltip: {
            sx: {
              marginRight: "1rem",
              bgcolor: "#fffaf8",
              color: "#222",
              fontSize: "13px",
              paddingTop: 2,
              paddingBottom: 2,
              borderRadius: 2,
              boxShadow: 3,
              fontFamily: "Shadow In The Light, cursive",
              fontWeight: "bold",
              textAlign: "center",
            },
            className: "custom-tooltip",
          },
          arrow: {
            sx: {
              color: "#fffaf8",
            },
          },
        }} arrow>
          <button onClick={() => {
            setShowPopup2(true);
            bringToFront("popup2");
          }} className="cursor-pointer lg:fixed bottom-4 right-4 z-20">
            <img src="/chibiyuna.png" className="h-30" />
          </button>
        </Tooltip>

        <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
          <img src="/wave.svg" className="w-full" />
        </div>
      </div>

      {showPopup && (
        <div
          ref={popupRef1}
          className="fixed w-[90vw] lg:w-[68vw] h-[90vh] bg-white border shadow-lg rounded-lg overflow-hidden"
          style={{ top: position1.current.top, left: position1.current.left, zIndex: zIndex1 }}
        >
          <div ref={headerRef1} className="cursor-move px-4 py-2 border-b flex justify-between items-center" onMouseDown={() => bringToFront("popup1")}>
            <h2 className="font-bold">About :3</h2>
            <button onClick={() => setShowPopup(false)} className="text-lg cursor-pointer">✖</button>
          </div>
          <iframe src="/about" className="w-full h-full" title="About Us" />
        </div>
      )}

      {showPopup2 && (
        <div
          ref={popupRef2}
          className="fixed w-[90vw] h-[80vh] xl:h-[60vh] xl:w-[50vw] bg-white border shadow-lg rounded-lg overflow-hidden"
          style={{ top: position2.current.top, left: position2.current.left, zIndex: zIndex2 }}
        >
          <div ref={headerRef2} className="cursor-move px-4 py-2 border-b flex justify-between items-center" onMouseDown={() => bringToFront("popup2")}>
            <h2 className="font-bold">Fun Stuff :D</h2>
            <button onClick={() => setShowPopup2(false)} className="text-lg cursor-pointer">✖</button>
          </div>
          <iframe src="/quotes" className="w-full h-full" title="Quotes" />
        </div>
      )}
    </>
  );
}
