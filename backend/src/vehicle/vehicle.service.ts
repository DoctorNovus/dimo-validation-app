import { DimoService } from "@/dimo/dimo.service";
import { Inject, Injectable } from "@outwalk/firefly";

interface VehicleData {
    data: {
        signalsLatest: {}
    }
}

interface VehicleIdentity {
    data: {
        vehicle: {}
    }
}

const FRIENDLY_NAMES = {
    lastSeen: "Last Seen",
    currentLocationApproximateLongitude: "Current Longitude",
    currentLocationApproximateLatitude: "Current Aprox. Latitude",
    angularVelocityYaw: "Angular Velocity Yaw",
    chassisAxleRow1WheelLeftSpeed: "Axle Wheel Driver Side Speed",
    chassisAxleRow1WheelLeftTirePressure: "Axle Wheel Driver Side Tire Pressure",
    chassisAxleRow1WheelRightSpeed: "Axle Wheel Passenger Side Speed",
    chassisAxleRow1WheelRightTirePressure: "Axle Wheel Passenger Side Tire Pressure",
    chassisAxleRow2WheelLeftTirePressure: "Axle Wheel Rear Driver Side Tire Pressure",
    chassisAxleRow2WheelRightTirePressure: "Axle Wheel Rear Passenger Side Tire Pressure",
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
    powertrainFuelSystemAbsoluteLevel: "Fuel System Absolute Level",
    powertrainFuelSystemRelativeLevel: "Fuel System Relative Level",
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
    powertrainTransmissionTravelledDistance: "Odemeter",
    powertrainType: "Powertrain Type",
    serviceDistanceToService: "Service Distance To Service",
    speed: "Speed",
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

    async getVehicleById(id: number) {

        const vehicleData: VehicleData = await this.getVehicleDataById(id);

        const vehicleIdentity: VehicleIdentity = await this.dimoService.dimo.identity.query({
            query: this.getVehicleQuery(id)
        }) as unknown as VehicleIdentity;

        let cleanData = {};

        for (const key of Object.keys(vehicleData.data.signalsLatest)) {
            cleanData[key] = {
                value: vehicleData.data.signalsLatest[key],
                name: FRIENDLY_NAMES[key] || key
            };
        }

        return {
            vehicle: vehicleIdentity.data.vehicle,
            signals: cleanData
        };
    }

    async getVehicleDataById(id: number) {

        const vehicleToken = await this.getVehicleToken(id);

        return await this.dimoService.dimo.telemetry.query({
            ...vehicleToken,
            query: this.getVehicleDataQuery(id)
        }) as unknown as VehicleData;
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

    getVehicleDataQuery(id: number) {
        return `
        query {
            signalsLatest(tokenId: ${id}) {
              lastSeen,
              angularVelocityYaw {
                timestamp,
                value,
              },
              chassisAxleRow1WheelLeftSpeed {
                timestamp,
                value,
              },
              chassisAxleRow1WheelLeftTirePressure {
                timestamp,
                value,
              },
              chassisAxleRow1WheelRightSpeed {
                timestamp,
                value,
              },
              chassisAxleRow1WheelRightTirePressure {
                timestamp,
                value,
              },
              chassisAxleRow2WheelLeftTirePressure {
                timestamp,
                value,
              },
              chassisAxleRow2WheelRightTirePressure {
                timestamp,
                value,
              },
              currentLocationAltitude {
                timestamp,
                value,
              },
              currentLocationHeading {
                timestamp,
                value,
              },
              currentLocationIsRedacted {
                timestamp,
                value,
              },
              currentLocationLatitude {
                timestamp,
                value,
              },
              currentLocationLongitude {
                timestamp,
                value,
              },
              exteriorAirTemperature {
                timestamp,
                value,
              },
              isIgnitionOn {
                timestamp,
                value,
              },
              lowVoltageBatteryCurrentVoltage {
                timestamp,
                value,
              },
              obdBarometricPressure {
                timestamp,
                value,
              },
              obdCommandedEGR {
                timestamp,
                value,
              },
              obdCommandedEVAP {
                timestamp,
                value,
              },
              obdDTCList {
                timestamp,
                value,
              },
              obdDistanceSinceDTCClear {
                timestamp,
                value,
              },
              obdDistanceWithMIL {
                timestamp,
                value,
              },
              obdEngineLoad {
                timestamp,
                value,
              },
              obdFuelPressure {
                timestamp,
                value,
              },
              obdIntakeTemp {
                timestamp,
                value,
              },
              obdLongTermFuelTrim1 {
                timestamp,
                value,
              },
              obdMAP {
                timestamp,
                value,
              },
              obdO2WRSensor1Voltage {
                timestamp,
                value,
              },
              obdO2WRSensor2Voltage {
                timestamp,
                value,
              },
              obdRunTime {
                timestamp,
                value,
              },
              obdShortTermFuelTrim1 {
                timestamp,
                value,
              },
              obdWarmupsSinceDTCClear {
                timestamp,
                value,
              },
              powertrainCombustionEngineDieselExhaustFluidCapacity {
                timestamp,
                value,
              },
              powertrainCombustionEngineDieselExhaustFluidLevel {
                timestamp,
                value,
              },
              powertrainCombustionEngineECT {
                timestamp,
                value,
              },
              powertrainCombustionEngineEOP {
                timestamp,
                value,
              },
              powertrainCombustionEngineEOT {
                timestamp,
                value,
              },
              powertrainCombustionEngineEngineOilLevel {
                timestamp,
                value,
              },
              powertrainCombustionEngineEngineOilRelativeLevel {
                timestamp,
                value,
              },
              powertrainCombustionEngineMAF {
                timestamp,
                value,
              },
              powertrainCombustionEngineSpeed {
                timestamp,
                value,
              },
              powertrainCombustionEngineTPS {
                timestamp,
                value,
              },
              powertrainCombustionEngineTorque {
                timestamp,
                value,
              },
              powertrainFuelSystemAbsoluteLevel {
                timestamp,
                value,
              },
              powertrainFuelSystemRelativeLevel {
                timestamp,
                value,
              },
              powertrainFuelSystemSupportedFuelTypes {
                timestamp,
                value,
              },
              powertrainRange {
                timestamp,
                value,
              },
              powertrainTractionBatteryChargingAddedEnergy {
                timestamp,
                value,
              },
              powertrainTractionBatteryChargingChargeLimit {
                timestamp,
                value,
              },
              powertrainTractionBatteryChargingIsCharging {
                timestamp,
                value,
              },
              powertrainTractionBatteryCurrentPower {
                timestamp,
                value,
              },
              powertrainTractionBatteryCurrentVoltage {
                timestamp,
                value,
              },
              powertrainTractionBatteryGrossCapacity {
                timestamp,
                value,
              },
              powertrainTractionBatteryRange {
                timestamp,
                value,
              },
              powertrainTractionBatteryStateOfChargeCurrent {
                timestamp,
                value,
              },
              powertrainTractionBatteryTemperatureAverage {
                timestamp,
                value,
              },
              powertrainTransmissionCurrentGear {
                timestamp,
                value,
              },
              powertrainTransmissionTemperature {
                timestamp,
                value,
              },
              powertrainTransmissionTravelledDistance {
                timestamp,
                value,
              },
              powertrainType {
                timestamp,
                value,
              },
              serviceDistanceToService {
                timestamp,
                value,
              },
              speed {
                timestamp,
                value,
              },
            }
          }
        `;
    }
}