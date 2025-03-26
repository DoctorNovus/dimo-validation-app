import { IntegrationsService } from "@/integrations/integrations.service";
import { Controller, Inject, Post } from "@outwalk/firefly";

@Controller()
export class DataController {

    @Inject() integrationsService: IntegrationsService;

    @Post("/submit")
    async submitSignals({ body }) {
        const id = body["id"];

        await this.integrationsService.loadGoogleSpreadsheetInfo();
        await this.integrationsService.addSheetData(id, body);

        return { statusCode: 200 };
    }

}