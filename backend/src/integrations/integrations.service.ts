import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import { FRIENDLY_NAMES, VehicleService } from "@/vehicle/vehicle.service";

import { Inject, Injectable } from "@outwalk/firefly";

@Injectable()
export class IntegrationsService {

    @Inject() vehicleService: VehicleService;

    googleServiceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    dataSpreadsheet = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, this.googleServiceAccountAuth);

    async loadGoogleSpreadsheetInfo() {
        return await this.dataSpreadsheet.loadInfo();
    }

    async generateSheetData(id, email, body) {

        const vehicle = await this.vehicleService.getVehicleIdentityById(id);

        const data = {
            "Car ID": id,
            "Email": email,
            "User Submission Date": new Date().toLocaleDateString("en-us"),
            "Submission Timestamp": new Date().toLocaleString("en-us", { timeZone: "UTC" }),
            "Vehicle VIN": body["vin"],
            "Make": vehicle.make,
            "Model": vehicle.model,
            "Year": vehicle.year
        };

        for (const key of Object.keys(body)) {
            if (key.startsWith("old") || key == "id" || key == "vin")
                continue;

            const [signal, accuracy] = key.split("_");
            const oldData = body[`old_${key}`];
            const newData = body[key];

            if (oldData)
                data[FRIENDLY_NAMES[signal]] = `${accuracy} ; ${oldData} ; ${newData}`;
            else
                data[FRIENDLY_NAMES[signal]] = `${accuracy} ; ${newData}`;
        }

        return data;
    }

    async addSheetData(id, email, body) {
        const sheetData = await this.generateSheetData(id, email, body);

        const sheet = await this.dataSpreadsheet.sheetsByTitle["Data"];

        await sheet.addRow(sheetData);
    }
}