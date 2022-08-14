"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEV_MODE = false;
exports.default = DEV_MODE ? {
    apiURI: "https://localhost:1023",
} : {
    apiURI: "https://api.gaiabridge.com",
};
//# sourceMappingURL=Config.js.map