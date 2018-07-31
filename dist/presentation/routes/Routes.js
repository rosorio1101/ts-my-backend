"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    constructor(albumController) {
        this.albumController = albumController;
    }
    routes(app) {
        app.route("/").get((req, res) => {
            res.status(200).send("my-backend");
        });
        app.route("/albums").get(this.albumController.searchAlbumsByName);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map