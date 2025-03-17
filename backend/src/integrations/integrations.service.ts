import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

import { FRIENDLY_NAMES } from "@/vehicle/vehicle.service";

import { Injectable } from "@outwalk/firefly";

@Injectable()
export class IntegrationsService {

    googleServiceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    dataSpreadsheet = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, this.googleServiceAccountAuth);

    async loadGoogleSpreadsheetInfo() {
        return await this.dataSpreadsheet.loadInfo();
    }

    generateSheetData(id, body) {

        const data = {
            "Car ID": id,
            "User Submission Date": new Date().toLocaleDateString("en-us"),
        };

        for (const key of Object.keys(body)) {
            if (key.startsWith("old") || key == "id")
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

    async addSheetData(id, body) {
        const sheetData = this.generateSheetData(id, body);

        const sheet = await this.dataSpreadsheet.sheetsByTitle["Data"];

        await sheet.addRow(sheetData);
    }
}