"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGaiaNFTBridge__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "fromChainId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "nftName",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "nftAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "sendingId",
                type: "uint256",
            },
        ],
        name: "ReceiveNFTs",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "toChainId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "string",
                name: "nftName",
                type: "string",
            },
            {
                indexed: false,
                internalType: "address",
                name: "nftAddress",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "sendingId",
                type: "uint256",
            },
        ],
        name: "SendNFTs",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "newSigner",
                type: "address",
            },
        ],
        name: "SetSigner",
        type: "event",
    },
    {
        inputs: [],
        name: "BATCH_TRANSFER_LIMIT",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "genesis",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "fromChainId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "sendingId",
                type: "uint256",
            },
        ],
        name: "isNFTsReceived",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "fromChainId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                internalType: "string",
                name: "nftName",
                type: "string",
            },
            {
                internalType: "address",
                name: "nftAddress",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                internalType: "uint256",
                name: "sendingId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "sig",
                type: "bytes",
            },
        ],
        name: "receiveNFTs",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "toChainId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                internalType: "string",
                name: "nftName",
                type: "string",
            },
            {
                internalType: "address",
                name: "nftAddress",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "sendNFTs",
        outputs: [
            {
                internalType: "uint256",
                name: "sendingId",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "toChainId",
                type: "uint256",
            },
        ],
        name: "sendingCounts",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "toChainId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "sendingId",
                type: "uint256",
            },
        ],
        name: "sentAt",
        outputs: [
            {
                internalType: "uint32",
                name: "atBlock",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "signer",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "stableDAO",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "supernova",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "nameHash",
                type: "bytes32",
            },
        ],
        name: "token",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class IGaiaNFTBridge__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IGaiaNFTBridge__factory = IGaiaNFTBridge__factory;
IGaiaNFTBridge__factory.abi = _abi;
//# sourceMappingURL=IGaiaNFTBridge__factory.js.map