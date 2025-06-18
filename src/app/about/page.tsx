export default function About() {
    const gallery = [
        "https://cdn.glitch.global/55de0177-2d52-43bf-a066-45796ec8e7c9/bocchi-d-rock-v0-x3885hje9nsb1.webp?v=1715307128306",
        "https://preview.redd.it/you-wanted-it-yunayu-did-it-v0-aonaals86izb1.jpg?auto=webp&s=ada36e21141dbd1afaa7c9b9d4e322530d9ab704",
        "https://preview.redd.it/you-wanted-it-yunayu-did-it-v0-aonaals86izb1.jpg?auto=webp&s=ada36e21141dbd1afaa7c9b9d4e322530d9ab704",

    ];

    const contributors = [
        { username: "@cielgrin_", role: "Designer" },
        { username: "@tsukiakuri", role: "Bug and Suggestion" },
        { username: "@evandapro", role: "Grammar Finalisations" },
        { username: "@quangbui", role: "Suggestions" },
    ];

    return (
        <>
            <div className="lg:px-32 px-6 py-10 space-y-3 text-gray-800">
                {/* Intro */}
                <section className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">About Us</h1>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
                        This website is made to introduce the community to many people and to share many artworks from Yunayu and YUYUS!
                    </p>
                </section>

                {/* About Yunayu */}
                <section className="flex justify-between flex-col-reverse gap-3 text-justify md:flex-row md:gap-30 items-center w-full">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold mb-3">Yunayu</h2>
                        <p className="leading-relaxed">
                            Yunayu is a drawing hero! A very talented artist, coming to bless us with her amazing artworks.
                            She also takes a lot of inspiration from the anime <b>Bocchi the Rock!</b>
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li><b>Fun Fact:</b> Has been drawing for {new Date().getFullYear() - 2020} years (since 2020)</li>
                            <li><b>Future Dream:</b> Becoming a Manga Artist and making very awesome work!</li>
                            <li><b>Ambition:</b> Becoming a Manga Artist and making very awesome work!</li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-[280px]">
                        <img
                            src="https://cdn.glitch.global/55de0177-2d52-43bf-a066-45796ec8e7c9/BocchiYuna.webp?v=1713409649865"
                            alt="Yunayu Portrait"
                            className="rounded-xl h-64 object-contain"
                        />
                    </div>
                </section>

                {/* Yunation & Yuyu */}
                <section className="space-y-8 mb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Yunation</h2>
                        <p className="leading-relaxed">
                            Yunation is a community made by Yunayu! Yunation is not just an art community,
                            but also a friendly platform for many things like gaming, music, photography and even programming!
                        </p>
                    </div>
                </section>

                {/* About the Website */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-3xl font-bold">About This Website</h2>
                    <p className="leading-relaxed max-w-3xl">
                        This website is made by the "Programmer Hero" from Yunation! It was created to introduce the community
                        to many people and to share artworks from Yunayu and YUYUS.
                    </p>
                </section>

                {/* About the Coder */}
                <section className="flex flex-col md:flex-row items-start gap-6 mb-10">
                    <img
                        src="https://i.ebayimg.com/images/g/lfAAAOSwG45kDHZr/s-l1200.jpg"
                        alt="M.Fathin Halim"
                        className="h-32 object-cover rounded-lg border shadow"
                    />
                    <div className="space-y-3 flex-1">
                        <h2 className="text-2xl font-bold">About Coder: M.Fathin Halim</h2>
                        <p className="leading-relaxed">
                            M.Fathin Halim (or in Discord known as <b>Coder Hero</b>) is a middle school student who loves to code and wants to be a "Programmer Hero"! He already made several projects including the Yunation website, and others in his <a href="https://mfathinhalim.github.io/portfolio" className="underline text-blue-600">Portfolio</a>.
                        </p>
                    </div>
                </section>

                {/* Contributors */}
                <section className="space-y-4">
                    <h2 className="text-3xl font-bold">Other Contributors</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        {contributors.map((c, i) => (
                            <li key={i}>
                                <b>{c.username}</b> → <i>{c.role}</i>
                            </li>
                        ))}
                    </ul>
                </section>

            </div>
            <div className="w-full z-0 pointer-events-none">
                <img src="/wave.svg" className="w-full" />
            </div>
        </>
    );
}
