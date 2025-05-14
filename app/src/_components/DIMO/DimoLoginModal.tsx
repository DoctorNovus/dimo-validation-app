import Link from "next/link"

export default function DimoLoginModal({ setOpen, loginUri, logoutUri }: { setOpen: CallableFunction, loginUri: string, logoutUri: string }) {

    return (
        <div className="flex flex-col w-40 gap-1.5 text-center py-4 absolute top-10 right-0 shadow-lg border border-white/25 bg-black rounded-md select-none">
            <Link href={loginUri} className="hover:underline">Manage Account</Link>
            <Link href={logoutUri} className="hover:underline">Logout</Link>
            <div onClick={() => setOpen(false)}>
                <button className="bg-red-500 px-4 py-0.5 rounded-md cursor-pointer">Close</button>
            </div>
        </div>
    )

}