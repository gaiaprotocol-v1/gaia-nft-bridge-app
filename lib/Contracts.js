"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EthereumGaiaGenesisContract_1 = __importDefault(require("./contract/EthereumGaiaGenesisContract"));
const EthereumGaiaStableDAOContract_1 = __importDefault(require("./contract/EthereumGaiaStableDAOContract"));
const EthereumGaiaSupernovaContract_1 = __importDefault(require("./contract/EthereumGaiaSupernovaContract"));
const KlaytnGaiaGenesisContract_1 = __importDefault(require("./contract/KlaytnGaiaGenesisContract"));
const KlaytnGaiaStableDAOContract_1 = __importDefault(require("./contract/KlaytnGaiaStableDAOContract"));
const KlaytnGaiaSupernovaContract_1 = __importDefault(require("./contract/KlaytnGaiaSupernovaContract"));
const PolygonGaiaGenesisContract_1 = __importDefault(require("./contract/PolygonGaiaGenesisContract"));
const PolygonGaiaStableDAOContract_1 = __importDefault(require("./contract/PolygonGaiaStableDAOContract"));
const PolygonGaiaSupernovaContract_1 = __importDefault(require("./contract/PolygonGaiaSupernovaContract"));
exports.default = {
    8217: {
        GENESIS: KlaytnGaiaGenesisContract_1.default,
        SUPERNOVA: KlaytnGaiaSupernovaContract_1.default,
        STABLEDAO: KlaytnGaiaStableDAOContract_1.default,
    },
    1: {
        GENESIS: EthereumGaiaGenesisContract_1.default,
        SUPERNOVA: EthereumGaiaSupernovaContract_1.default,
        STABLEDAO: EthereumGaiaStableDAOContract_1.default,
    },
    137: {
        GENESIS: PolygonGaiaGenesisContract_1.default,
        SUPERNOVA: PolygonGaiaSupernovaContract_1.default,
        STABLEDAO: PolygonGaiaStableDAOContract_1.default,
    },
};
//# sourceMappingURL=Contracts.js.map