import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export interface IGaiaNFTBridgeInterface extends utils.Interface {
    functions: {
        "BATCH_TRANSFER_LIMIT()": FunctionFragment;
        "genesis()": FunctionFragment;
        "isNFTsReceived(address,uint256,uint256)": FunctionFragment;
        "receiveNFTs(address,uint256,address,string,address,uint256[],uint256,bytes)": FunctionFragment;
        "sendNFTs(uint256,address,string,address,uint256[])": FunctionFragment;
        "sendingCounts(address,uint256)": FunctionFragment;
        "sentAt(address,uint256,uint256)": FunctionFragment;
        "signer()": FunctionFragment;
        "stableDAO()": FunctionFragment;
        "supernova()": FunctionFragment;
        "token(bytes32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "BATCH_TRANSFER_LIMIT" | "genesis" | "isNFTsReceived" | "receiveNFTs" | "sendNFTs" | "sendingCounts" | "sentAt" | "signer" | "stableDAO" | "supernova" | "token"): FunctionFragment;
    encodeFunctionData(functionFragment: "BATCH_TRANSFER_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "genesis", values?: undefined): string;
    encodeFunctionData(functionFragment: "isNFTsReceived", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "receiveNFTs", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "sendNFTs", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[]
    ]): string;
    encodeFunctionData(functionFragment: "sendingCounts", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "sentAt", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "signer", values?: undefined): string;
    encodeFunctionData(functionFragment: "stableDAO", values?: undefined): string;
    encodeFunctionData(functionFragment: "supernova", values?: undefined): string;
    encodeFunctionData(functionFragment: "token", values: [PromiseOrValue<BytesLike>]): string;
    decodeFunctionResult(functionFragment: "BATCH_TRANSFER_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "genesis", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isNFTsReceived", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "receiveNFTs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendNFTs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendingCounts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sentAt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "signer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stableDAO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supernova", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
    events: {
        "ReceiveNFTs(address,uint256,address,string,address,uint256[],uint256)": EventFragment;
        "SendNFTs(address,uint256,address,string,address,uint256[],uint256)": EventFragment;
        "SetSigner(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ReceiveNFTs"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SendNFTs"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetSigner"): EventFragment;
}
export interface ReceiveNFTsEventObject {
    sender: string;
    fromChainId: BigNumber;
    receiver: string;
    nftName: string;
    nftAddress: string;
    ids: BigNumber[];
    sendingId: BigNumber;
}
export declare type ReceiveNFTsEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    string,
    string,
    BigNumber[],
    BigNumber
], ReceiveNFTsEventObject>;
export declare type ReceiveNFTsEventFilter = TypedEventFilter<ReceiveNFTsEvent>;
export interface SendNFTsEventObject {
    sender: string;
    toChainId: BigNumber;
    receiver: string;
    nftName: string;
    nftAddress: string;
    ids: BigNumber[];
    sendingId: BigNumber;
}
export declare type SendNFTsEvent = TypedEvent<[
    string,
    BigNumber,
    string,
    string,
    string,
    BigNumber[],
    BigNumber
], SendNFTsEventObject>;
export declare type SendNFTsEventFilter = TypedEventFilter<SendNFTsEvent>;
export interface SetSignerEventObject {
    newSigner: string;
}
export declare type SetSignerEvent = TypedEvent<[string], SetSignerEventObject>;
export declare type SetSignerEventFilter = TypedEventFilter<SetSignerEvent>;
export interface IGaiaNFTBridge extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IGaiaNFTBridgeInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        BATCH_TRANSFER_LIMIT(overrides?: CallOverrides): Promise<[BigNumber]>;
        genesis(overrides?: CallOverrides): Promise<[string]>;
        isNFTsReceived(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number] & {
            atBlock: number;
        }>;
        signer(overrides?: CallOverrides): Promise<[string]>;
        stableDAO(overrides?: CallOverrides): Promise<[string]>;
        supernova(overrides?: CallOverrides): Promise<[string]>;
        token(nameHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
    };
    BATCH_TRANSFER_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
    genesis(overrides?: CallOverrides): Promise<string>;
    isNFTsReceived(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
    stableDAO(overrides?: CallOverrides): Promise<string>;
    supernova(overrides?: CallOverrides): Promise<string>;
    token(nameHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        BATCH_TRANSFER_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        genesis(overrides?: CallOverrides): Promise<string>;
        isNFTsReceived(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        signer(overrides?: CallOverrides): Promise<string>;
        stableDAO(overrides?: CallOverrides): Promise<string>;
        supernova(overrides?: CallOverrides): Promise<string>;
        token(nameHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "ReceiveNFTs(address,uint256,address,string,address,uint256[],uint256)"(sender?: PromiseOrValue<string> | null, fromChainId?: PromiseOrValue<BigNumberish> | null, receiver?: PromiseOrValue<string> | null, nftName?: null, nftAddress?: null, ids?: null, sendingId?: null): ReceiveNFTsEventFilter;
        ReceiveNFTs(sender?: PromiseOrValue<string> | null, fromChainId?: PromiseOrValue<BigNumberish> | null, receiver?: PromiseOrValue<string> | null, nftName?: null, nftAddress?: null, ids?: null, sendingId?: null): ReceiveNFTsEventFilter;
        "SendNFTs(address,uint256,address,string,address,uint256[],uint256)"(sender?: PromiseOrValue<string> | null, toChainId?: PromiseOrValue<BigNumberish> | null, receiver?: PromiseOrValue<string> | null, nftName?: null, nftAddress?: null, ids?: null, sendingId?: null): SendNFTsEventFilter;
        SendNFTs(sender?: PromiseOrValue<string> | null, toChainId?: PromiseOrValue<BigNumberish> | null, receiver?: PromiseOrValue<string> | null, nftName?: null, nftAddress?: null, ids?: null, sendingId?: null): SendNFTsEventFilter;
        "SetSigner(address)"(newSigner?: null): SetSignerEventFilter;
        SetSigner(newSigner?: null): SetSignerEventFilter;
    };
    estimateGas: {
        BATCH_TRANSFER_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        genesis(overrides?: CallOverrides): Promise<BigNumber>;
        isNFTsReceived(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        signer(overrides?: CallOverrides): Promise<BigNumber>;
        stableDAO(overrides?: CallOverrides): Promise<BigNumber>;
        supernova(overrides?: CallOverrides): Promise<BigNumber>;
        token(nameHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        BATCH_TRANSFER_LIMIT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        genesis(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isNFTsReceived(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        signer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        stableDAO(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supernova(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        token(nameHash: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IGaiaNFTBridge.d.ts.map