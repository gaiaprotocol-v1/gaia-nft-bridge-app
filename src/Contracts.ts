import EthereumGaiaGenesisContract from "./contract/EthereumGaiaGenesisContract";
import EthereumGaiaStableDAOContract from "./contract/EthereumGaiaStableDAOContract";
import EthereumGaiaSupernovaContract from "./contract/EthereumGaiaSupernovaContract";
import KlaytnGaiaGenesisContract from "./contract/KlaytnGaiaGenesisContract";
import KlaytnGaiaStableDAOContract from "./contract/KlaytnGaiaStableDAOContract";
import KlaytnGaiaSupernovaContract from "./contract/KlaytnGaiaSupernovaContract";
import PolygonGaiaGenesisContract from "./contract/PolygonGaiaGenesisContract";
import PolygonGaiaStableDAOContract from "./contract/PolygonGaiaStableDAOContract";
import PolygonGaiaSupernovaContract from "./contract/PolygonGaiaSupernovaContract";

export default {
    8217: {
        GENESIS: KlaytnGaiaGenesisContract,
        SUPERNOVA: KlaytnGaiaSupernovaContract,
        STABLEDAO: KlaytnGaiaStableDAOContract,
    },
    1: {
        GENESIS: EthereumGaiaGenesisContract,
        SUPERNOVA: EthereumGaiaSupernovaContract,
        STABLEDAO: EthereumGaiaStableDAOContract,
    },
    137: {
        GENESIS: PolygonGaiaGenesisContract,
        SUPERNOVA: PolygonGaiaSupernovaContract,
        STABLEDAO: PolygonGaiaStableDAOContract,
    },
} as any;