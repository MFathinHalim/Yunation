"use client";
import { useRef, useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [zCounter, setZCounter] = useState(100);
  const [zIndex1, setZIndex1] = useState(100);
  const [zIndex2, setZIndex2] = useState(99);

  const audioOpenRef = useRef(null);
  const audioOpen2Ref = useRef(null);
  const audioShineRef = useRef(null);
  const audioCloseRef = useRef(null);

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

      // Hitung posisi baru
      let newTop = position.current.top - pos2;
      let newLeft = position.current.left - pos1;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const popupRect = popup.getBoundingClientRect();
      const popupWidth = popupRect.width;
      const popupHeight = popupRect.height;

      newTop = Math.max(0, Math.min(screenHeight - popupHeight, newTop));
      newLeft = Math.max(0, Math.min(screenWidth - popupWidth, newLeft));

      // Simpan posisi (buat referensi)
      position.current.top = newTop;
      position.current.left = newLeft;

      // Gunakan requestAnimationFrame buat update style
      requestAnimationFrame(() => {
        popup.style.top = `${newTop}px`;
        popup.style.left = `${newLeft}px`;
      });
    };


    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    header.onmousedown = dragMouseDown;
  };

  useEffect(() => {
    if (showPopup) {
      startDrag(headerRef1, popupRef1, position1);
      //@ts-ignore
      audioOpen2Ref.current.currentTime = 0;
      //@ts-ignore
      audioOpen2Ref.current.play().catch((e: any) => {
        console.warn("Gagal play sound open:", e);
      });
    } else {
      //@ts-ignore
      audioCloseRef.current.currentTime = 0;
      //@ts-ignore
      audioCloseRef.current.play().catch((e: any) => {
        console.warn("Gagal play sound open:", e);
      });
    }
  }, [showPopup]);

  useEffect(() => {
    if (showPopup2) {
      startDrag(headerRef2, popupRef2, position2);
      //@ts-ignore
      audioShineRef.current.currentTime = 0;
      //@ts-ignore
      audioShineRef.current.play().catch((e: any) => {
        console.warn("Gagal play sound open:", e);
      });
    } else {
      //@ts-ignore
      audioCloseRef.current.currentTime = 0;
      //@ts-ignore
      audioCloseRef.current.play().catch((e: any) => {
        console.warn("Gagal play sound open:", e);
      });
    }
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
            className="bg-[#FFF0F4] border rounded-full cursor-pointer font-bold py-2 px-7
  transition-all duration-300 ease-in-out
  hover:bg-[#E8DFFC] hover:shadow-lg "
            style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
            }}
          >
            About Us
          </button>


        </div>

        <div className="bg-white shadow-lg lg:w-[70vw] lg:max-h-[70vh] mx-8 my-1 z-10 flex flex-col lg:flex-row">
          <div className="flex flex-col w-full lg:w-2/3">
            <div className="group flex flex-col h-full">
              {/* Gambar-gambar */}
              <div className="flex transition-all duration-300 ease-in-out h-1/2 group-hover:h-1/3">
                <img
                  className="w-1/2 h-full object-cover border-t-2 border-black/60 border-l-2 border-black/60 border-r-2 border-black/60"
                  src="https://pbs.twimg.com/media/F9b-dY9aMAAac0P.jpg"
                  alt="img1"
                />
                <img
                  className="w-1/2 h-full object-cover border-t-2 border-black/60 border-r-2 border-black/60"
                  src="https://pbs.twimg.com/media/F2vzXNlaMAAO6Gi.jpg"
                  alt="img2"
                />
              </div>

              {/* Video */}
              <iframe
                className="w-full transition-all duration-300 ease-in-out h-1/2 group-hover:h-2/3 border-2 border-black/60"
                src="https://www.youtube.com/embed/M89C6vstdbw?si=Ujb2Q5qu8aboFJk7"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

          </div>
          <div className="hidden lg:block w-full lg:w-1/2 h-auto">
            <img className="w-full h-full object-cover border-t-2 border-black/60 border-r-2 border-black/60 border-b-2 border-black/60" src="/bigimg.jpg" alt="big img" />
          </div>
        </div>

        <div className="flex gap-6 mt-3 mb-10 lg:mb-0 z-10 flex-col lg:flex-row w-full lg:w-auto px-8 font-caveat font-semibold text-xl">
          <a onMouseEnter={() => {
            //@ts-ignore
            audioOpenRef.current.currentTime = 0;
            //@ts-ignore
            audioOpenRef.current.play().catch((e: any) => {
              console.warn("Gagal play sound open:", e);
            });
          }} className="hover:-translate-y-1 active:translate-y-0.5 relative inline-block bg-[#FFE8CD] hover:bg-[#FFE8CD]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer transition-all duration-300
  before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-500 hover:before:w-full" href="https://www.instagram.com/yunayuispink">Instagram</a>
          <a onMouseEnter={() => {
            //@ts-ignore
            audioOpenRef.current.currentTime = 0;
            //@ts-ignore
            audioOpenRef.current.play().catch((e: any) => {
              console.warn("Gagal play sound open:", e);
            });
          }} className="hover:-translate-y-1 active:translate-y-0.5 relative inline-block bg-[#FFF2EB] hover:bg-[#FFF2EB]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer transition-all duration-300
  before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-500 hover:before:w-full" href="https://discord.gg/yunayuispink">Discord</a>
          <a onMouseEnter={() => {
            //@ts-ignore
            audioOpenRef.current.currentTime = 0;
            //@ts-ignore
            audioOpenRef.current.play().catch((e: any) => {
              console.warn("Gagal play sound open:", e);
            });
          }} className="hover:-translate-y-1 active:translate-y-0.5 relative inline-block bg-[#FFDCDC] hover:bg-[#FFDEEE]/70 px-7 py-2 border shadow text-center shadow-md cursor-pointer transition-all duration-300
  before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-500 hover:before:w-full" href="https://youtube.com/@yunayuispink">Youtube</a>
        </div>

        <Tooltip title={'Have a good x10000000 day for everyone!!'} componentsProps={{
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
          <button
            onMouseEnter={() => {
              //@ts-ignore
              audioShineRef.current.currentTime = 0;
              //@ts-ignore
              audioShineRef.current.play().catch((e: any) => {
                console.warn("Gagal play sound open:", e);
              });
            }}
            onClick={() => {
              setShowPopup2(true);
              bringToFront("popup2");
            }}
            className="cursor-pointer lg:fixed bottom-4 right-4 z-20
    transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
    hover:-translate-y-1 active:translate-y-0.5"
          >
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
      <audio ref={audioOpenRef} src="/open.mp3" preload="auto" />
      <audio ref={audioOpen2Ref} src="/open2.mp3" preload="auto" />
      <audio ref={audioCloseRef} src="/close.mp3" preload="auto" />
      <audio ref={audioShineRef} src="/shine.mp3" preload="auto" />
    </>
  );
}
