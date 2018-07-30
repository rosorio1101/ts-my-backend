"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestLoginAccessController {
    constructor(getSpotifyTokenUseCase) {
        this.getSpotifyTokenUseCase = getSpotifyTokenUseCase;
    }
    getAccessToken(request, response) {
        this.getSpotifyTokenUseCase.execute({
            needRefresh: false
        }).then((accessToken) => {
            response.json({
                "accessToken": accessToken
            });
        });
    }
}
exports.TestLoginAccessController = TestLoginAccessController;
//# sourceMappingURL=TestLoginAccessController.js.map