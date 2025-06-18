import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen relative z-10">
        <div className="flex justify-between items-center w-[70vw] z-10">
          <h1 className="text-4xl font-bold">Yunation</h1>
          <a className="bg-[#FFF0F4] border border-[#B7B1F2] text-center rounded-full mb-1 font-bold py-2 px-7">About Us</a>
        </div>
        <div className="bg-white border shadow w-[70vw] max-h-[70vh] mx-8 my-1 z-10 flex flex-col lg:flex-row">
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

        <div className="flex gap-6 mt-3 z-10">
          <a className="bg-[#FFE8CD] hover:bg-[#FFE8CD]/70 px-7 py-2 border shadow">Instagram</a>
          <a className="bg-[#FFF2EB] hover:bg-[#FFF2EB]/70 px-7 py-2 border shadow">Discord</a>
          <a className="bg-[#FFDCDC] hover:bg-[#FFDEEE]/70 px-7 py-2 border shadow">Youtube</a>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
          <img src="/wave.svg" className="w-full" />
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-20">
        <img src="/chibiyuna.png" className="h-30" />
      </div>
    </>
  );
}
