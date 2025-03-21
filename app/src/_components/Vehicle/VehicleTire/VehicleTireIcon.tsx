import { getTheme } from "@/_hooks/settings"

export default function VehicleTireIcon({ error }: { error: boolean }) {
    const theme = getTheme();

    const fill = error ? "red" : (theme == "light" ? "black" : "white");

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill={fill} className="w-full h-full flex">

            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

            <g id="SVGRepo_iconCarrier">
                <path d="M21 12C21 17.5228 18.9277 22 16.3714 22H8.65714C9.5236 21.4385 10.3126 20.4506 10.8562 19.2763C11.73 17.3884 12.2571 14.8154 12.2571 12C12.2571 9.18462 11.73 6.61163 10.8562 4.72375C10.3126 3.54939 9.5236 2.56147 8.65714 2H16.3714C18.9277 2 21 6.47715 21 12Z" fill={fill} />
                <path fillRule="evenodd" clipRule="evenodd" d="M4.31038 5.13411C3.50898 6.86553 3 9.29254 3 12C3 14.7075 3.50898 17.1345 4.31038 18.8659C5.1335 20.6442 6.16457 21.5 7.11429 21.5C8.064 21.5 9.09507 20.6442 9.91819 18.8659C10.7196 17.1345 11.2286 14.7075 11.2286 12C11.2286 9.29254 10.7196 6.86553 9.91819 5.13411C9.09507 3.35577 8.064 2.5 7.11429 2.5C6.16457 2.5 5.1335 3.35577 4.31038 5.13411ZM5.57143 12C5.57143 15.3137 6.26219 18 7.11429 18C7.90107 18 8.5503 15.7097 8.64521 12.75H7.62857C7.20252 12.75 6.85714 12.4142 6.85714 12C6.85714 11.5858 7.20252 11.25 7.62857 11.25H8.64521C8.5503 8.29027 7.90107 6 7.11429 6C6.26219 6 5.57143 8.68629 5.57143 12Z" fill={fill} />
            </g>

        </svg>
    )
}