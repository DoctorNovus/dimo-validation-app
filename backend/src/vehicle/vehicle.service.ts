import { DimoService } from "@/dimo/dimo.service";
import { Inject, Injectable } from "@outwalk/firefly";

interface VehicleData {
    data: {
        signals: []
    }
}

interface VehicleLiveData {
    data: {
        signalsLatest: []
    }
}

type VehicleIdentityData = { data: { vehicle: { definition: VehicleIdentity } } };

interface VehicleIdentity {
    make?: string;
    model?: string;
    year?: number;
    imageURI?: string;
    owner?: string;
}

export const FRIENDLY_NAMES = {
    lastSeen: "Last Seen",
    currentLocationApproximateLongitude: "Current Apox. Longitude",
    currentLocationApproximateLatitude: "Current Aprox. Latitude",
    angularVelocityYaw: "Angular Velocity Yaw",
    chassisAxleRow1WheelLeftSpeed: "Left Tire Speed",
    chassisAxleRow1WheelLeftTirePressure: "Left Tire Pressure",
    chassisAxleRow1WheelRightSpeed: "Right Tire Speed",
    chassisAxleRow1WheelRightTirePressure: "Right Tire Pressure",
    chassisAxleRow2WheelLeftTirePressure: "Left Rear Tire Pressure",
    chassisAxleRow2WheelRightTirePressure: "Right Rear Tire Pressure",
    currentLocationAltitude: "Car Altitude",
    currentLocationHeading: "Direction Facing",
    currentLocationIsRedacted: "Location Hidden",
    currentLocationLatitude: "Car Latitude",
    currentLocationLongitude: "Car Longitude",
    exteriorAirTemperature: "Exterior Air Temperature",
    isIgnitionOn: "Ignition On",
    lowVoltageBatteryCurrentVoltage: "Battery Voltage",
    obdBarometricPressure: "OBD Barometric Pressure",
    obdCommandedEGR: "OBD Commanded EGR",
    obdCommandedEVAP: "OBD Commanded EVAP",
    obdDTCList: "OBD DTC List",
    obdDistanceSinceDTCClear: "OBD Distance Since DTC Clear",
    obdDistanceWithMIL: "OBD Distance With MIL",
    obdEngineLoad: "OBD Engine Load",
    obdFuelPressure: "OBD Fuel Pressure",
    obdIntakeTemp: "OBD Intake Temperature",
    obdLongTermFuelTrim1: "OBD Long Term Fuel Trim 1",
    obdMAP: "OBD MAP",
    obdO2WRSensor1Voltage: "OBD O2 Sensor 1 Voltage",
    obdO2WRSensor2Voltage: "OBD O2 Sensor 2 Voltage",
    obdRunTime: "OBD Run Time",
    obdShortTermFuelTrim1: "OBD Short Term Fuel Trim 1",
    obdWarmupsSinceDTCClear: "OBD Warmups Since DTC Clear",
    powertrainCombustionEngineDieselExhaustFluidCapacity: "Diesel Exhaust Fluid Capacity",
    powertrainCombustionEngineDieselExhaustFluidLevel: "Diesel Exhaust Fluid Level",
    powertrainCombustionEngineECT: "Engine Coolant Temperature",
    powertrainCombustionEngineEOP: "Engine Oil Pressure",
    powertrainCombustionEngineEOT: "Engine Oil Temperature",
    powertrainCombustionEngineEngineOilLevel: "Engine Oil Level",
    powertrainCombustionEngineEngineOilRelativeLevel: "Engine Oil Relative Level",
    powertrainCombustionEngineMAF: "MAF Sensor",
    powertrainCombustionEngineSpeed: "Engine Speed",
    powertrainCombustionEngineTPS: "Throttle Position Sensor",
    powertrainCombustionEngineTorque: "Engine Torque",
    powertrainFuelSystemAbsoluteLevel: "Fuel Capacity",
    powertrainFuelSystemRelativeLevel: "Fuel In Tank",
    powertrainFuelSystemSupportedFuelTypes: "Fuel System Supported Fuel Types",
    powertrainRange: "Powertrain Range",
    powertrainTractionBatteryChargingAddedEnergy: "EV Charging Added Energy",
    powertrainTractionBatteryChargingChargeLimit: "EV Charging Charge Limit",
    powertrainTractionBatteryChargingIsCharging: "EV Charging Is Charging",
    powertrainTractionBatteryCurrentPower: "EV Current Power",
    powertrainTractionBatteryCurrentVoltage: "EV Current Voltage",
    powertrainTractionBatteryGrossCapacity: "EV Gross Capacity",
    powertrainTractionBatteryRange: "EV Range",
    powertrainTractionBatteryStateOfChargeCurrent: "EV Charge Level",
    powertrainTractionBatteryTemperatureAverage: "EV Temperature Average",
    powertrainTransmissionCurrentGear: "Transmission Current Gear",
    powertrainTransmissionTemperature: "Transmission Temperature",
    powertrainTransmissionTravelledDistance: "Odometer",
    powertrainType: "Powertrain Type",
    serviceDistanceToService: "Service Distance To Service",
    speed: "Speed",
};

export const QUERY_DATA = {
    "lastSeen": "lastSeen",
    "angularVelocityYaw": `angularVelocityYaw { timestamp, value }`,

    "chassisAxleRow1WheelLeftSpeed": `chassisAxleRow1WheelLeftSpeed { timestamp, value }`,
    "chassisAxleRow1WheelLeftTirePressure": `chassisAxleRow1WheelLeftTirePressure { timestamp, value }`,
    "chassisAxleRow1WheelRightSpeed": `chassisAxleRow1WheelRightSpeed { timestamp, value }`,
    "chassisAxleRow1WheelRightTirePressure": `chassisAxleRow1WheelRightTirePressure { timestamp, value }`,

    "chassisAxleRow2WheelLeftTirePressure": `chassisAxleRow2WheelLeftTirePressure { timestamp, value }`,
    "chassisAxleRow2WheelRightTirePressure": `chassisAxleRow2WheelRightTirePressure { timestamp, value }`,

    "currentLocationAltitude": `currentLocationAltitude { timestamp, value }`,
    "currentLocationHeading": `currentLocationHeading { timestamp, value }`,
    "currentLocationIsRedacted": `currentLocationIsRedacted { timestamp, value }`,
    "currentLocationLatitude": `currentLocationLatitude { timestamp, value }`,
    "currentLocationLongitude": `currentLocationLongitude { timestamp, value }`,

    "exteriorAirTemperature": `exteriorAirTemperature { timestamp, value }`,
    "isIgnitionOn": `isIgnitionOn { timestamp, value }`,
    "lowVoltageBatteryCurrentVoltage": `lowVoltageBatteryCurrentVoltage { timestamp, value }`,

    "obdBarometricPressure": `obdBarometricPressure { timestamp, value }`,
    "obdCommandedEGR": `obdCommandedEGR { timestamp, value }`,
    "obdCommandedEVAP": `obdCommandedEVAP { timestamp, value }`,
    "obdDTCList": `obdDTCList { timestamp, value }`,
    "obdDistanceSinceDTCClear": `obdDistanceSinceDTCClear { timestamp, value }`,
    "obdDistanceWithMIL": `obdDistanceWithMIL { timestamp, value }`,
    "obdEngineLoad": `obdEngineLoad { timestamp, value }`,
    "obdFuelPressure": `obdFuelPressure { timestamp, value }`,
    "obdIntakeTemp": `obdIntakeTemp { timestamp, value }`,
    "obdLongTermFuelTrim1": `obdLongTermFuelTrim1 { timestamp, value }`,
    "obdMAP": `obdMAP { timestamp, value }`,
    "obdO2WRSensor1Voltage": `obdO2WRSensor1Voltage { timestamp, value }`,
    "obdO2WRSensor2Voltage": `obdO2WRSensor2Voltage { timestamp, value }`,
    "obdRunTime": `obdRunTime { timestamp, value }`,
    "obdShortTermFuelTrim1": `obdShortTermFuelTrim1 { timestamp, value }`,
    "obdWarmupsSinceDTCClear": `obdWarmupsSinceDTCClear { timestamp, value }`,

    "powertrainCombustionEngineDieselExhaustFluidCapacity": `powertrainCombustionEngineDieselExhaustFluidCapacity { timestamp, value }`,
    "powertrainCombustionEngineDieselExhaustFluidLevel": `powertrainCombustionEngineDieselExhaustFluidLevel { timestamp, value }`,
    "powertrainCombustionEngineECT": `powertrainCombustionEngineECT { timestamp, value }`,
    "powertrainCombustionEngineEOP": `powertrainCombustionEngineEOP { timestamp, value }`,
    "powertrainCombustionEngineEOT": `powertrainCombustionEngineEOT { timestamp, value }`,
    "powertrainCombustionEngineEngineOilLevel": `powertrainCombustionEngineEngineOilLevel { timestamp, value }`,
    "powertrainCombustionEngineEngineOilRelativeLevel": `powertrainCombustionEngineEngineOilRelativeLevel { timestamp, value }`,
    "powertrainCombustionEngineMAF": `powertrainCombustionEngineMAF { timestamp, value }`,
    "powertrainCombustionEngineSpeed": `powertrainCombustionEngineSpeed { timestamp, value }`,
    "powertrainCombustionEngineTPS": `powertrainCombustionEngineTPS { timestamp, value }`,
    "powertrainCombustionEngineTorque": `powertrainCombustionEngineTorque { timestamp, value }`,

    "powertrainFuelSystemAbsoluteLevel": `powertrainFuelSystemAbsoluteLevel { timestamp, value }`,
    "powertrainFuelSystemRelativeLevel": `powertrainFuelSystemRelativeLevel { timestamp, value }`,
    "powertrainFuelSystemSupportedFuelTypes": `powertrainFuelSystemSupportedFuelTypes { timestamp, value }`,

    "powertrainRange": `powertrainRange { timestamp, value }`,

    "powertrainTractionBatteryChargingAddedEnergy": `powertrainTractionBatteryChargingAddedEnergy { timestamp, value }`,
    "powertrainTractionBatteryChargingChargeLimit": `powertrainTractionBatteryChargingChargeLimit { timestamp, value }`,
    "powertrainTractionBatteryChargingIsCharging": `powertrainTractionBatteryChargingIsCharging { timestamp, value }`,
    "powertrainTractionBatteryCurrentPower": `powertrainTractionBatteryCurrentPower { timestamp, value }`,
    "powertrainTractionBatteryCurrentVoltage": `powertrainTractionBatteryCurrentVoltage { timestamp, value }`,
    "powertrainTractionBatteryGrossCapacity": `powertrainTractionBatteryGrossCapacity { timestamp, value }`,
    "powertrainTractionBatteryRange": `powertrainTractionBatteryRange { timestamp, value }`,
    "powertrainTractionBatteryStateOfChargeCurrent": `powertrainTractionBatteryStateOfChargeCurrent { timestamp, value }`,
    "powertrainTractionBatteryTemperatureAverage": `powertrainTractionBatteryTemperatureAverage { timestamp, value }`,

    "powertrainTransmissionCurrentGear": `powertrainTransmissionCurrentGear { timestamp, value }`,
    "powertrainTransmissionTemperature": `powertrainTransmissionTemperature { timestamp, value }`,
    "powertrainTransmissionTravelledDistance": `powertrainTransmissionTravelledDistance { timestamp, value }`,

    "powertrainType": `powertrainType { timestamp, value }`,

    "serviceDistanceToService": `serviceDistanceToService { timestamp, value }`,

    "speed": `speed { timestamp, value }`,
};

export const UNITS = {
    lastSeen: "",
    currentLocationApproximateLongitude: "degrees",
    currentLocationApproximateLatitude: "degrees",
    angularVelocityYaw: "degrees/s",
    chassisAxleRow1WheelLeftSpeed: "km/h",
    chassisAxleRow1WheelLeftTirePressure: "kPa",
    chassisAxleRow1WheelRightSpeed: "km/h",
    chassisAxleRow1WheelRightTirePressure: "kPa",
    chassisAxleRow2WheelLeftTirePressure: "kPa",
    chassisAxleRow2WheelRightTirePressure: "kPa",
    currentLocationAltitude: "m",
    currentLocationHeading: "degrees",
    currentLocationIsRedacted: "",
    currentLocationLatitude: "degrees",
    currentLocationLongitude: "degrees",
    exteriorAirTemperature: "celsius",
    isIgnitionOn: "",
    lowVoltageBatteryCurrentVoltage: "V",
    obdBarometricPressure: "kPa",
    obdCommandedEGR: "percent",
    obdCommandedEVAP: "percent",
    obdDTCList: "",
    obdDistanceSinceDTCClear: "km",
    obdDistanceWithMIL: "km",
    obdEngineLoad: "percent",
    obdFuelPressure: "kPa",
    obdIntakeTemp: "celsius",
    obdLongTermFuelTrim1: "percent",
    obdMAP: "kPa",
    obdO2WRSensor1Voltage: "V",
    obdO2WRSensor2Voltage: "V",
    obdRunTime: "s",
    obdShortTermFuelTrim1: "percent",
    obdWarmupsSinceDTCClear: "",
    powertrainCombustionEngineDieselExhaustFluidCapacity: "l",
    powertrainCombustionEngineDieselExhaustFluidLevel: "percent",
    powertrainCombustionEngineECT: "celsius",
    powertrainCombustionEngineEOP: "kPa",
    powertrainCombustionEngineEOT: "celsius",
    powertrainCombustionEngineEngineOilLevel: "percent",
    powertrainCombustionEngineEngineOilRelativeLevel: "percent",
    powertrainCombustionEngineMAF: "g/s",
    powertrainCombustionEngineSpeed: "rpm",
    powertrainCombustionEngineTPS: "percent",
    powertrainCombustionEngineTorque: "Nm",
    powertrainFuelSystemAbsoluteLevel: "percent",
    powertrainFuelSystemRelativeLevel: "percent",
    powertrainFuelSystemSupportedFuelTypes: "percent",
    powertrainRange: "km",
    powertrainTractionBatteryChargingAddedEnergy: "kWh",
    powertrainTractionBatteryChargingChargeLimit: "percent",
    powertrainTractionBatteryChargingIsCharging: "",
    powertrainTractionBatteryCurrentPower: "W",
    powertrainTractionBatteryCurrentVoltage: "V",
    powertrainTractionBatteryGrossCapacity: "kWh",
    powertrainTractionBatteryRange: "m",
    powertrainTractionBatteryStateOfChargeCurrent: "percent",
    powertrainTractionBatteryTemperatureAverage: "celsius",
    powertrainTransmissionCurrentGear: "",
    powertrainTransmissionTemperature: "celsius",
    powertrainTransmissionTravelledDistance: "km",
    powertrainType: "",
    serviceDistanceToService: "km",
    speed: "km/h",
};

@Injectable()
export class VehicleService {

    @Inject() dimoService: DimoService;

    async getVehicleToken(id: number) {
        if (!id) return null;

        const authToken = await this.dimoService.getToken();

        return await this.dimoService.dimo.tokenexchange.exchange({
            ...authToken,
            privileges: [1, 2, 3, 4, 5, 6],
            tokenId: id
        });
    }

    getCleanLocalizedData(value, unit) {
        if (!value)
            return null;

        let val = typeof value == "object" ? value.value : value;

        switch (unit) {
            case "mi":
            case "mph":
                return (val / 1.609);

            case "°F":
                return (val * (9 / 5)) + 32;

            case "ft":
                return (val * 3.281);

            case "psi":
                return (val / 6.895);

            case "oz":
            case "oz/s":
                return (val / 28.35);

            case "gals":
                return (val / 3.785);

            default:
                return val;
        }
    }

    getCleanLocalizedUnit(unit, region) {
        const handleUS = () => {
            switch (unit) {
                case "degrees": return "°";
                case "degrees/s": return "°/s";
                case "km/h": return "mph";
                case "km": return "mi";
                case "celsius": return "°F";
                case "percent": return "%";
                case "m": return "ft";
                case "kPa": return "psi";
                case "V": return "v";
                case "g": return "oz";
                case "g/s": return "oz/s";
                case "l": return "gals";
                default: return unit;
            }
        };

        const handleCA = () => {
            switch (unit) {
                case "degrees": return "°";
                case "degrees/s": return "°/s";
                case "km/h": return "km/h";
                case "km": return "km";
                case "celsius": return "°C";
                case "percent": return "%";
                case "m": return "m";
                case "kPa": return "kPa";
                case "V": return "V";
                case "g": return "g";
                case "g/s": return "g/s";
                case "l": return "L";
                default: return unit;
            }
        };

        const handleUK = () => {
            switch (unit) {
                case "degrees": return "°";
                case "degrees/s": return "°/s";
                case "km/h": return "mph";
                case "km": return "mi";
                case "celsius": return "°C";
                case "percent": return "%";
                case "m": return "m";
                case "kPa": return "kPa";
                case "V": return "V";
                case "g": return "g";
                case "g/s": return "g/s";
                case "l": return "L";
                default: return unit;
            }
        };

        const handleEU = () => {
            switch (unit) {
                case "degrees": return "°";
                case "degrees/s": return "°/s";
                case "km/h": return "km/h";
                case "km": return "km";
                case "celsius": return "°C";
                case "percent": return "%";
                case "m": return "m";
                case "kPa": return "kPa";
                case "V": return "V";
                case "g": return "g";
                case "g/s": return "g/s";
                case "l": return "L";
                default: return unit;
            }
        };

        switch (region) {
            case "us": return handleUS();
            case "uk": return handleUK();
            case "can": return handleCA();
            case "eu": return handleEU();

            default: return handleEU();
        }

        // if (locale == "mi") {
        //     switch (unit) {
        //         case "degrees":
        //             return "°";

        //         case "degrees/s":
        //             return "°/s";

        //         case "km/h":
        //             return "mph";

        //         case "km":
        //             return "mi";

        //         case "celsius":
        //             return "°F";

        //         case "percent":
        //             return "%";

        //         case "m":
        //             return "ft";

        //         case "kPa":
        //             return "psi";

        //         case "V":
        //             return "v";

        //         case "g":
        //             return "oz";

        //         case "g/s":
        //             return "oz/s";

        //         case "l":
        //             return "gals";

        //         default:
        //             return unit;
        //     }
        // }

        // switch (unit) {
        //     case "degrees":
        //         return "°";

        //     case "degrees/s":
        //         return "°/s";

        //     case "celsius":
        //         return "°C";

        //     case "percent":
        //         return "%";

        //     case "V":
        //         return "v";

        //     case "l":
        //         return "liters";

        //     default:
        //         return unit;
        // }
    }

    async getVehicleById(id: number, region: string) {
        const vehicleData = await this.getVehicleDataById(id);

        const vehicleIdentity = await this.getVehicleIdentityById(id);

        let cleanData = {};

        for (const key of Object.keys(vehicleData)) {
            const cleanUnit = this.getCleanLocalizedUnit(UNITS[key], region);
            // if (key == "powertrainTractionBatteryStateOfChargeCurrent")
            // console.log(vehicleData["powertrainTractionBatteryStateOfChargeCurrent"]);

            let tempData = this.getCleanLocalizedData(vehicleData[key], cleanUnit);

            if (key == "0")
                continue;

            if (tempData) {
                switch (key) {
                    case "chassisAxleRow1WheelLeftSpeed":
                    case "chassisAxleRow1WheelRightSpeed":
                    case "chassisAxleRow1WheelLeftTirePressure":
                    case "chassisAxleRow1WheelRightTirePressure":
                    case "chassisAxleRow2WheelLeftTirePressure":
                    case "chassisAxleRow2WheelRightTirePressure":
                        tempData = Math.round(tempData);
                        break;

                    case "exteriorAirTemperature":
                        tempData = Math.round(tempData);
                        break;
                }
            }

            cleanData[key] = {
                value: tempData,
                name: FRIENDLY_NAMES[key] || key,
                unit: cleanUnit
            };
        }

        return {
            vehicle: vehicleIdentity,
            signals: cleanData
        };
    }

    async getVehicleIdentityById(id: number): Promise<VehicleIdentity> {
        const identity: VehicleIdentityData = await this.dimoService.dimo.identity.query({
            query: this.getVehicleQuery(id)
        }) as unknown as VehicleIdentityData;

        return identity.data.vehicle.definition;
    }

    async getVehicleDataById(id: number) {

        const vehicleToken = await this.getVehicleToken(id);

        let data = {};

        const signals = await this.getAvailableSignals(id);

        const allData = await this.dimoService.dimo.telemetry.query({
            ...vehicleToken,
            query: this.getVehicleDataQuery(id)
        }) as unknown as VehicleData;

        const liveData = await this.dimoService.dimo.telemetry.query({
            ...vehicleToken,
            query: this.getVehicleLiveDataQuery(id, signals)
        }) as unknown as VehicleLiveData;


        if (allData?.data && allData.data.signals) {
            for (let i = 0; i < allData.data.signals.length; i++) {
                data = Object.assign(data, allData.data.signals[i]);
            }
        }


        if (liveData.data.signalsLatest) data = Object.assign(data, liveData.data.signalsLatest);

        console.log(data);

        return data;

    }

    async getVehicleDefinitions(vehicle: VehicleIdentity) {
        const baseURI = "https://device-definitions-api.dimo.zone";

        interface DefinitionBase { deviceDefinitions: unknown };

        const res = await fetch(`${baseURI}/device-definitions/search ? query = ${vehicle.make} ${vehicle.model} ${vehicle.year} `);
        const definitionBase = await res.json() as DefinitionBase;
        return definitionBase.deviceDefinitions;
    }

    async getVehicleImage(id: number) {
        const vehicleIdentity = await this.getVehicleIdentityById(id);

        const tokenURI = vehicleIdentity.imageURI;

        if (!tokenURI)
            return null;

        return tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
    }

    async getVehicleOwner(id: number) {
        const vehicleIdentity: VehicleIdentity = await this.dimoService.dimo.identity.query({
            query: this.getVehicleOwnerQuery(id)
        }) as unknown as VehicleIdentity;

        return vehicleIdentity.owner;
    }

    getVehicleQuery(id: number) {
        return `
      	query {
    vehicle(tokenId: ${id}){
              definition {
            make
            model
            year
        }
    }
}
`;
    }

    getVehicleImageQuery(id: number) {
        return `
      	query {
    vehicle(tokenId: ${id}){
        imageURI
    }
}
`;
    }

    getVehicleOwnerQuery(id: number) {
        return `
      query {
    vehicle(tokenId: ${id}){
        owner
    }
}
`;
    }

    async getAvailableSignals(id: number) {
        const vehicleToken = await this.getVehicleToken(id);

        const query = `
        query {
            availableSignals(tokenId: ${id})
        }
        `;

        const signals = await this.dimoService.dimo.telemetry.query({
            ...vehicleToken,
            query: query
        }) as unknown;

        if (signals) return signals.data.availableSignals;
    }

    getVehicleDataQuery(id: number, interval: string = "12h", agg: string = "FIRST") {
        const to = new Date();
        const from = new Date();
        from.setHours(from.getHours() - 12);

        return `
      	query {
    signals(interval: "${interval}", from: "${from.toJSON()}", to: "${to.toJSON()}", tokenId: ${id}) {
        timestamp
        currentLocationApproximateLatitude(agg: ${agg})
        currentLocationApproximateLongitude(agg: ${agg})
        angularVelocityYaw(agg: ${agg})
        chassisAxleRow1WheelLeftSpeed(agg: ${agg})
        chassisAxleRow1WheelLeftTirePressure(agg: ${agg})
        chassisAxleRow1WheelRightSpeed(agg: ${agg})
        chassisAxleRow1WheelRightTirePressure(agg: ${agg})
        chassisAxleRow2WheelLeftTirePressure(agg: ${agg})
        chassisAxleRow2WheelRightTirePressure(agg: ${agg})
        currentLocationAltitude(agg: ${agg})
        currentLocationHeading(agg: ${agg})
        currentLocationIsRedacted(agg: ${agg})
        currentLocationLatitude(agg: ${agg})
        currentLocationLongitude(agg: ${agg})
        dimoAftermarketHDOP(agg: ${agg})
        dimoAftermarketNSAT(agg: ${agg})
        dimoAftermarketSSID(agg: ${agg})
        dimoAftermarketWPAState(agg: ${agg})
        exteriorAirTemperature(agg: ${agg})
        isIgnitionOn(agg: ${agg})
        lowVoltageBatteryCurrentVoltage(agg: ${agg})
        obdBarometricPressure(agg: ${agg})
        obdCommandedEGR(agg: ${agg})
        obdCommandedEVAP(agg: ${agg})
        obdDTCList(agg: ${agg})
        obdDistanceSinceDTCClear(agg: ${agg})
        obdDistanceWithMIL(agg: ${agg})
        obdEngineLoad(agg: ${agg})
        obdFuelPressure(agg: ${agg})
        obdIntakeTemp(agg: ${agg})
        obdLongTermFuelTrim1(agg: ${agg})
        obdMAP(agg: ${agg})
        obdO2WRSensor1Voltage(agg: ${agg})
        obdO2WRSensor2Voltage(agg: ${agg})
        obdRunTime(agg: ${agg})
        obdShortTermFuelTrim1(agg: ${agg})
        obdWarmupsSinceDTCClear(agg: ${agg})
        powertrainCombustionEngineDieselExhaustFluidCapacity(agg: ${agg})
        powertrainCombustionEngineDieselExhaustFluidLevel(agg: ${agg})
        powertrainCombustionEngineECT(agg: ${agg})
        powertrainCombustionEngineEOP(agg: ${agg})
        powertrainCombustionEngineEOT(agg: ${agg})
        powertrainCombustionEngineEngineOilLevel(agg: ${agg})
        powertrainCombustionEngineEngineOilRelativeLevel(agg: ${agg})
        powertrainCombustionEngineMAF(agg: ${agg})
        powertrainCombustionEngineSpeed(agg: ${agg})
        powertrainCombustionEngineTPS(agg: ${agg})
        powertrainCombustionEngineTorque(agg: ${agg})
        powertrainFuelSystemAbsoluteLevel(agg: ${agg})
        powertrainFuelSystemRelativeLevel(agg: ${agg})
        powertrainFuelSystemSupportedFuelTypes(agg: ${agg})
        powertrainRange(agg: ${agg})
        powertrainTractionBatteryChargingAddedEnergy(agg: ${agg})
        powertrainTractionBatteryChargingChargeLimit(agg: ${agg})
        powertrainTractionBatteryChargingIsCharging(agg: ${agg})
        powertrainTractionBatteryCurrentPower(agg: ${agg})
        powertrainTractionBatteryCurrentVoltage(agg: ${agg})
        powertrainTractionBatteryGrossCapacity(agg: ${agg})
        powertrainTractionBatteryRange(agg: ${agg})
        powertrainTractionBatteryStateOfChargeCurrent(agg: ${agg})
        powertrainTractionBatteryStateOfChargeCurrentEnergy(agg: ${agg})
        powertrainTractionBatteryTemperatureAverage(agg: ${agg})
        powertrainTransmissionCurrentGear(agg: ${agg})
        powertrainTransmissionTemperature(agg: ${agg})
        powertrainTransmissionTravelledDistance(agg: ${agg})
        powertrainType(agg: ${agg})
        serviceDistanceToService(agg: ${agg})
        speed(agg: ${agg})
    }
}
`;
    }

    getVehicleLiveDataQuery(id: number, signals) {
        let query = `query {\n  signalsLatest(tokenId: ${id}){\n`;

        for (let signal of signals) {
            if (signal.includes("Aftermarket")) continue;

            const data = QUERY_DATA[signal];
            if (data)
                query += `${data}\n`;
            else
                console.log("No Data", signal);
        }

        query += `  }\n}`;

        return query;
    }

    async getVehicleVIN(tokenId: number) {
        const vehicleToken = await this.getVehicleToken(tokenId);

        try {
            const response = await this.dimoService.dimo.telemetry.getVin({
                ...vehicleToken,
                tokenId: tokenId
            });

            return response;

        } catch (error) {
            console.log("Error: ", error.message);
        }

    }

    async isAuthenticated(id: number, walletAddress: string) {
        return await this.getVehicleOwner(id) == walletAddress;
    }
}