
import {Request, Response} from "express";

export class Routes {
    //TODO: sacar todos esos news...
    constructor() {
    }
    
    public routes(app) :void {
        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send("my-backend");
        });
    }

}