import OfflineIcon from "./OfflineIcon"
import OnlineIcon from "./OnlineIcon"

export default function VehicleConnection({ mode = "online" }) {
    const Shell = ({ children }: { children: React.ReactElement }) => {
        return (
            <div className="flex w-5 h-5 mb-1 items-center justify-center">
                {children}
            </div>
        )
    }

    switch (mode) {
        case "partial":
            return (
                <Shell>
                    <OnlineIcon fill="yellow" />
                </Shell>
            )

        case "offline":
            return (
                <Shell>
                    <OfflineIcon />
                </Shell>
            )
    }

    return (
        <Shell>
            <OnlineIcon />
        </Shell>
    )
}