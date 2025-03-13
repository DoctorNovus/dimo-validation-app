import Link from "next/link";

export default function LandingPage() {

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between w-full px-4 py-6 md:py-2 shadow items-center h-12">
                <h1 className="text-lg md:text-xl">
                    <b className="text-gray-700 uppercase">DIMO Validation App</b>
                </h1>

                <Link href="/dashboard">
                    <button className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded-md text-base md:text-lg">Dashboard</button>
                </Link>
            </div>

            <div className="flex flex-col p-4 gap-6">
                <section className="flex flex-row justify-between items-center">
                    <div className="flex flex-col w-full md:w-1/2 gap-3 items-center text-center md:items-start md:text-start">
                        <h2 className="text-3xl">Validating your DIMO data to ensure a seamless experience.</h2>
                        <p className="text-lg">The DIMO Validation App was built as a companion tool to help self-identity potential signal issues between your vehicle and the DIMO network.</p>

                        <Link href="/dashboard">
                            <button className="cursor-pointer w-fit px-2 py-1 bg-red-500 text-white rounded-md text-lg">Connect Your Car</button>
                        </Link>
                    </div>

                    <div className="hidden md:flex w-1/2 h-64 bg-gray-500">
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl my-2">Our Process</h2>

                    <p></p>
                </section>

                <section>
                    <h2 className="text-2xl my-2">Our Data Flow</h2>

                    <p></p>
                </section>

            </div>
        </div>
    );

}