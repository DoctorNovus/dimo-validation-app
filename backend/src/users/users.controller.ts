import { Controller, Get, Inject } from "@outwalk/firefly";
import { UsersService } from "./users.service";

@Controller()
export class UserController {

    @Inject() usersService: UsersService;

    @Get()
    getHelloWorld() {
        return "Hello World";
    }

    @Get("/:address/vehicles")
    async getUserVehicles({ params }) {
        const { address } = params;

        return await this.usersService.getVehicles(address);
    }
}