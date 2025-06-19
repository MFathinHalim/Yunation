"use client";
import { useState } from "react";

export default function RandomQuotes() {
    const [quote, setQuote] = useState(
        `"if you wanna live, breathe. If you wanna see, open your eyes. If you wanna talk, open your mouth. Life is easy, don't make it hard."`
    );

    const checkQuotes = async () => {
        const res = await fetch("https://api.kanye.rest");
        const data = await res.json();
        setQuote(`"${data.quote}"`);
    };

    return (
        <div className="flex items-center z-20 justify-center h-[90vh]">
            <article className="text-center z-10 bg-[#FFE8CD] px-3 py-6 rounded-3xl shadow-lg w-[90vw] h-[75%] flex flex-col justify-center items-center">
                <h1 className="py-3 text-4xl font-bold">
                    <strong>Quotes</strong>
                </h1>
                <div className="mb-6">
                    <h2>{quote}</h2>
                </div>
                <button className="bg-[#FFF2EB] px-6 py-3 border shadow-lg hover:bg-neutral-100" onClick={checkQuotes}>
                    Check Quotes
                </button>
            </article>
            <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
                <img src="/wave.svg" className="w-full h-90 object-cover" />
            </div>
        </div>
    );
}
