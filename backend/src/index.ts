import { Application } from "@outwalk/firefly";
import { ExpressPlatform } from "@outwalk/firefly/express";
import { Database } from "@outwalk/firefly";

/* setup the platform and global middleware */
const platform = new ExpressPlatform();

/* implement a database using the firefly database interface */
class CustomDatabase extends Database {
    
    async connect(): Promise<CustomDatabase> {
        super.displayConnectionMessage();
        return this;
    }

    isConnected(): boolean {
        return false;
    }
}

const database = new CustomDatabase();

/* start the application */
new Application({ platform, database }).listen();
