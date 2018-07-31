"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    //TODO: sacar todos esos news...
    constructor() {
    }
    routes(app) {
        app.route("/").get((req, res) => {
            res.status(200).send("my-backend");
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map