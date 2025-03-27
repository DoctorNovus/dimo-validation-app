import Link from "next/link";

const LandingPage = () => {
    return (
        <main className="bg-[url('/images/login-background.png')] bg-cover flex flex-col justify-center h-screen">
            <div className="flex flex-col sm:w-1/2 items-center justify-center h-screen shadow-lg">
                <article className="flex flex-col w-full max-w-sm gap-4 px-4 py-4">
                    <section className="flex flex-col w-full items-center gap-4 pt-4">
                        <p className="text-3xl text-center leading-9 py-1">DIMO Data Validator</p>
                        <p className={'justify-center text-center'}>
                            The DIMO Data Accuracy tool is a self-service platform for users to validate and report incorrect signal data from their vehicles.
                        </p>
                    </section>

                    <div className={'flex justify-center mt-2 pb-2'}>
                        <Link href="/dashboard">
                            <button className="cursor-pointer text-white px-2 py-1 text-base md:text-md w-full align-middle border-zinc-800 bg-zinc-800 border h-10 rounded-3xl mx-4">Get Started</button>
                        </Link>
                    </div>

                    <div className={''}>
                        <Link href="/">
                            <button className="cursor-pointer text-gray-400 px-2 py-1 text-sm w-full align-middle mx-4">Having trouble?</button>
                        </Link>
                    </div>
                </article>
            </div>
        </main>
    );
}

export default LandingPage