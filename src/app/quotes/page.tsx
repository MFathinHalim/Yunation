"use client";
import { useState } from "react";

export default function RandomQuotes() {
    const [quote, setQuote] = useState(
        `"if you wanna live, breathe. If you wanna see, open your eyes. If you wanna talk, open your mouth. Life is easy, don't make it hard."`
    );
    const images = [
        "https://pbs.twimg.com/media/F9wUYD0aAAAHCbh.jpg",
        "https://preview.redd.it/kita-by-master-yunayu-v0-wr5wr9bx3bnb1.jpg?width=1080&crop=smart&auto=webp&s=b3a57dcbe0e88ecb14eaf5e33c71bf296defbd43",
        "https://preview.redd.it/you-wanted-it-yunayu-did-it-v0-aonaals86izb1.jpg?auto=webp&s=ada36e21141dbd1afaa7c9b9d4e322530d9ab704",
        "https://pbs.twimg.com/media/GCsJvjua0AAt0GE?format=jpg&name=4096x4096",
        "https://cdn.glitch.global/55de0177-2d52-43bf-a066-45796ec8e7c9/btr1.jpg?v=1713409658665",
        "https://preview.redd.it/bocchi-ryo-chita-by-v0-bc5zz1e5jgtb1.jpg?auto=webp&s=d52c4476f314f69ce5f9369092b5d2b7356b2897",
        "https://preview.redd.it/w-h-a-t-by-yunayu-v0-lxhycel1behe1.jpeg?width=640&crop=smart&auto=webp&s=589c4ae142c8564e3983547748f15454205f98ce",
        "https://pbs.twimg.com/media/GIr2NipaoAAAKdf.jpg",
        "https://pbs.twimg.com/media/F883Na2bAAAyhPt.jpg:large",
        "https://pbs.twimg.com/media/GC2JL-2aIAAhfwY.jpg:large",
        "https://pbs.twimg.com/media/GuoL_tsWoAA9Iqv.jpg",
        "https://pbs.twimg.com/media/Gu0xln0X0AEAwPv?format=jpg&name=4096x4096",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaM8KmUukfvAzHf3MdeBm3N_0KAApPlwZTr7Pz2rtuaBRedA6_P0CvqpKt16g7AiQZeOU&usqp=CAU",
        "https://pbs.twimg.com/media/Gu5ksNBWgAAYgL2?format=png&name=large",
        "https://pbs.twimg.com/media/Gu1AhiyXkAABYRi?format=png&name=large",
        "https://pbs.twimg.com/media/Guz57NkWEAAZeLK?format=jpg&name=large",
        "https://pbs.twimg.com/media/GuvRr0fawAAdPoA?format=jpg&name=large",
        "https://pbs.twimg.com/media/GusV5woWkAAZPyc?format=jpg&name=large",
        "https://pbs.twimg.com/media/Gufaa9ibsAAhr5j?format=jpg&name=large",
        "https://pbs.twimg.com/media/GglQ7IobIAAgbbu?format=jpg&name=large",
        "https://pbs.twimg.com/media/GuTHM62bsAAlgOi?format=jpg&name=large",
        "https://pbs.twimg.com/media/GuF_uI-W4AAEPkd?format=jpg&name=large"
    ];

    const checkQuotes = async () => {
        const gambling = Math.round(Math.random());

        if (gambling === 0) {
            const res = await fetch("https://api.kanye.rest");
            const data = await res.json();
            setQuote(`"${data.quote}"`);
        } else {
            const today = new Date();
            const currentMonth = today.getMonth();
            const currentDay = today.getDate();

            if (currentMonth === 11 && currentDay === 25) { //special <3
                open("https://www.youtube.com/watch?v=O9ZJCGNHU50&list=RDO9ZJCGNHU50&start_radio=1")
            } else {
                open("https://www.youtube.com/watch?v=Vbs-ft_YNKY")
            }
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center overflow-x-hidden">
            {/* Quotes Box */}
            <article className="text-center bg-[#FFE8CD] px-6 py-8 rounded-3xl shadow-xl w-[90vw] max-w-[800px] my-10 animate-fadeIn">
                <h1 className="text-4xl font-bold mb-4"><strong>Quotes</strong></h1>
                <p className="italic text-lg text-black/80 mb-6">{quote}</p>
                <button
                    onClick={checkQuotes}
                    className="bg-[#FFF2EB] border border-black/10 px-6 py-2 rounded-lg hover:bg-[#ffe1cf] hover:scale-105 transition-all font-semibold shadow-md"
                >
                    Check Quotes
                </button>
            </article>
            <div className="z-10">
                <h1 className="text-4xl font-bold mb-4 mt-10 text-center"><strong>Gallery</strong></h1>

                {/* Image Grid */}
                <section className="px-4 pb-24 w-full">
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {images.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`yunayu-${i}`}
                                onError={(e) => e.currentTarget.style.display = "none"}
                                className="w-full rounded-xl border border-black/20 shadow hover:scale-[1.02] transition-transform duration-300 break-inside-avoid"
                            />
                        ))}
                    </div>
                </section>
            </div>
            {/* Wave BG */}
            <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
                <img src="/wave.svg" className="w-full" alt="Wave background" />
            </div>
        </div>
    );
}
