"use client"
import { useEffect, useState } from "react";

export default function About() {
    const [about, setAbout] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("/content/about.json")
            .then((res) => res.json())
            .then((data) => {
                setAbout(data);
                setLoading(false);
            });
    }, []);

    if (loading || !about) return <p className="text-center py-10">Loading...</p>;
    //ts-ignore
    const contributors = about.contributors;
    const currentYear = new Date().getFullYear();
    const drawingSince = currentYear - 2020;

    return (
        <>
            <div className="lg:px-32 px-6 py-10 space-y-3 text-gray-800">
                {/* Intro */}
                <section className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">{about.intro.title}</h1>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{about.intro.description}</p>
                </section>

                {/* About Yunayu */}
                <section className="flex justify-between flex-col-reverse gap-3 text-justify md:flex-row md:gap-30 items-center w-full">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold mb-3">{about.yunayu.title}</h2>
                        <p className="leading-relaxed">{about.yunayu.description}</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><b>Fun Fact:</b> {about.yunayu.facts.funFact.replace("4", `${drawingSince}`)}</li>
                            <li><b>Future Dream:</b> {about.yunayu.facts.dream}</li>
                            <li><b>Ambition:</b> {about.yunayu.facts.ambition}</li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-[280px]">
                        <img
                            src={about.yunayu.image}
                            alt="Yunayu Portrait"
                            className="rounded-xl h-64 object-contain"
                        />
                    </div>
                </section>

                {/* Yunation */}
                <section className="space-y-8 mb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">{about.yunation.title}</h2>
                        <p className="leading-relaxed">{about.yunation.description}</p>
                    </div>
                </section>

                {/* About Website */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-3xl font-bold">{about.website.title}</h2>
                    <p className="leading-relaxed max-w-3xl">{about.website.description}</p>
                </section>
                <section className="flex flex-col gap-6 mb-10">
                    {about.coders.map((coder: any, index: number) => (
                        <div key={index} className="flex flex-col md:flex-row items-start gap-6">
                            {/* About Coder */}
                            <section className="flex flex-col md:flex-row items-start gap-6 mb-10">
                                <img
                                    src={coder.image}
                                    alt="M.Fathin Halim"
                                    className="h-32 object-cover rounded-lg border shadow"
                                />
                                <div className="space-y-3 flex-1">
                                    <h2 className="text-2xl font-bold">{coder.title}</h2>
                                    <p className="leading-relaxed">
                                        {coder.description.split("Portfolio")} <a href="${about.coder.portfolioLink}" className="font-bold hover:underline">Portfolio</a>
                                    </p>
                                </div>
                            </section>
                        </div>
                    ))}
                </section>

                {/* Contributors */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-bold">Other Contributors</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        {contributors.map((c: any, i: any) => (
                            <li key={i}>
                                <b>{c.username}</b> → <i>{c.role}</i>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Wave Footer */}
            < div className="w-full z-0 pointer-events-none" >
                <img src="/wave.svg" className="w-full" alt="wave" />
            </div>
        </>
    );
}
