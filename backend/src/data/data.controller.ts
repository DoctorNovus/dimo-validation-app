import { IntegrationsService } from "@/integrations/integrations.service";
import { Controller, Inject, Post } from "@outwalk/firefly";

@Controller()
export class DataController {

    @Inject() integrationsService: IntegrationsService;

    @Post("/submit")
    async submitSignals({ body }){
        const id = body["id"];

        const payload = await this.integrationsService.createDiscordPayloadFromAnswers(id, body);
        return await this.integrationsService.exportToDiscordWebhook(payload);
    }

}