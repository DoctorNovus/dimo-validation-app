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

        return {
            vehicle: vehicleIdentity.data.vehicle,
            data: vehicleData.data.signalsLatest
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
              currentLocationApproximateLatitude {
                timestamp,
                value,
              },
              currentLocationApproximateLongitude {
                timestamp,
                value,
              },
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
              dimoAftermarketHDOP {
                timestamp,
                value,
              },
              dimoAftermarketNSAT {
                timestamp,
                value,
              },
              dimoAftermarketSSID {
                timestamp,
                value,
              },
              dimoAftermarketWPAState {
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