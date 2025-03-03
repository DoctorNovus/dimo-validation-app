import { Application } from "@outwalk/firefly";
import { ExpressPlatform } from "@outwalk/firefly/express";
import { MongooseDatabase } from "@outwalk/firefly/mongoose";

import cors from "cors";

/* setup the platform and global middleware */
const platform = new ExpressPlatform();
platform.use(cors());

/* setup the database and global plugins */
// const database = new MongooseDatabase();

/* start the application */
new Application({ platform }).listen();
