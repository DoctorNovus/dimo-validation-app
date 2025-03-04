import { Injectable } from "@outwalk/firefly";

@Injectable()
export class IntegrationsService {

    async exportToDiscordWebhook(discordWebhookData) {
        const res = await fetch(process.env.DISCORD_WEBHOOK_URI, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: discordWebhookData
        });
    }

    generateCSVDataFromAnswers(body) {
        let csvData = "Signal,Accurary,OldData,NewData\n";

        for (const key of Object.keys(body)) {
            if (key.startsWith("old") || key == "id")
                continue;

            const [signal, accuracy] = key.split("_");

            if (accuracy == "accurate")
                csvData += `${signal},${accuracy},,${body[key]}\n`;
            else if (accuracy == "inaccurate")
                csvData += `${signal},${accuracy},${body[`old_${key}`]},${body[key]}\n`;
            else if (accuracy == "outdated")
                csvData += `${signal},${accuracy},${body[`old_${key}`]},${body[key]}\n`;
            else if (accuracy == "skip")
                csvData += `${signal},${accuracy},,${body[key]}\n`;
        }

        return csvData;
    }

    async createDiscordPayloadFromAnswers(id, body) {
        const csvData = this.generateCSVDataFromAnswers(body);

        const blob = new Blob([csvData], { type: "text/csv" });
        const file = new File([blob], `car_data_${id}.csv`, { type: "text/csv" });

        const formData = new FormData();

        const payload = { content: `Validation Data for Car ID ${id}` };
        formData.append("payload_json", JSON.stringify(payload));
        formData.append("files[0]", file);

        const response = await fetch(process.env.DISCORD_WEBHOOK_URI, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data)
            console.log("Success:", data);
    }
}