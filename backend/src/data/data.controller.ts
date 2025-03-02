import { Controller, Post } from "@outwalk/firefly";

@Controller()
export class DataController {

    @Post("/update")
    updateSignals({ body }){
        console.log(body);
    }

}