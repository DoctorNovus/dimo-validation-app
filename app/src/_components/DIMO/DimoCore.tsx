import { useDimoAuthState } from "@dimo-network/login-with-dimo";
import VehicleInterface from "../Vehicle/VehicleInterface";
import DimoLogin from "./DimoLogin";

export default function DimoCore() {
    const { isAuthenticated } = useDimoAuthState();

    if (!isAuthenticated)
        return (
            <div>
                <DimoLogin />
            </div>
        )

    return (
        <div>
            <div>
                <VehicleInterface />
            </div>
        </div>
    )
}