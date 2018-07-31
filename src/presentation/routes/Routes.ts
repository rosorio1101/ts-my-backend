
import {Request, Response} from "express";
import AlbumController from "../controller/AlbumController";

export class Routes {

    private albumController: AlbumController;

    constructor(albumController: AlbumController) {
        this.albumController = albumController;
    }
    
    public routes(app) :void {
        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send("my-backend");
        });

        app.route("/albums").get(this.albumController.searchAlbumsByName);

    }

}