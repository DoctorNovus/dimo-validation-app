import { IntegrationsService } from "@/integrations/integrations.service";
import { Controller, Inject, Post } from "@outwalk/firefly";
import { NotFound } from "@outwalk/firefly/errors";

@Controller()
export class DataController {

    @Inject() integrationsService: IntegrationsService;

    @Post("/submit")
    async submitSignals({ body }) {
        try {
            const id = body["id"];

            await this.integrationsService.loadGoogleSpreadsheetInfo();
            await this.integrationsService.addSheetData(id, body);

            return { statusCode: 200 };
        } catch (error) {
            throw error;
        }

    }

}