import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface GaiaNFTBridgeInterface extends utils.Interface {
    functions: {
        "BATCH_TRANSFER_LIMIT()": FunctionFragment;
        "genesis()": FunctionFragment;
        "isNFTsReceived(address,uint256,uint256)": FunctionFragment;
        "owner()": FunctionFragment;
        "receiveNFTs(address,uint256,address,string,address,uint256[],uint256,bytes)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "sendNFTs(uint256,address,string,address,uint256[])": FunctionFragment;
        "sendingCounts(address,uint256)": FunctionFragment;
        "sentAt(address,uint256,uint256)": FunctionFragment;
        "setSigner(address)": FunctionFragment;
        "signer()": FunctionFragment;
        "stableDAO()": FunctionFragment;
        "supernova()": FunctionFragment;
        "token(bytes32)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "BATCH_TRANSFER_LIMIT" | "genesis" | "isNFTsReceived" | "owner" | "receiveNFTs" | "renounceOwnership" | "sendNFTs" | "sendingCounts" | "sentAt" | "setSigner" | "signer" | "stableDAO" | "supernova" | "token" | "transferOwnership"): FunctionFragment;
    encodeFunctionData(functionFragment: "BATCH_TRANSFER_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "genesis", values?: undefined): string;
    encodeFunctionData(functionFragment: "isNFTsReceived", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
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
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
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
    encodeFunctionData(functionFragment: "setSigner", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "signer", values?: undefined): string;
    encodeFunctionData(functionFragment: "stableDAO", values?: undefined): string;
    encodeFunctionData(functionFragment: "supernova", values?: undefined): string;
    encodeFunctionData(functionFragment: "token", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "BATCH_TRANSFER_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "genesis", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isNFTsReceived", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "receiveNFTs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendNFTs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sendingCounts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sentAt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSigner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "signer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "stableDAO", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supernova", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "OwnershipTransferred(address,address)": EventFragment;
        "ReceiveNFTs(address,uint256,address,string,address,uint256[],uint256)": EventFragment;
        "SendNFTs(address,uint256,address,string,address,uint256[],uint256)": EventFragment;
        "SetSigner(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ReceiveNFTs"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SendNFTs"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetSigner"): EventFragment;
}
export interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
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
export interface GaiaNFTBridge extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: GaiaNFTBridgeInterface;
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
        isNFTsReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[number] & {
            atBlock: number;
        }>;
        setSigner(newSigner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        signer(overrides?: CallOverrides): Promise<[string]>;
        stableDAO(overrides?: CallOverrides): Promise<[string]>;
        supernova(overrides?: CallOverrides): Promise<[string]>;
        token(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    BATCH_TRANSFER_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
    genesis(overrides?: CallOverrides): Promise<string>;
    isNFTsReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    owner(overrides?: CallOverrides): Promise<string>;
    receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
    setSigner(newSigner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    stableDAO(overrides?: CallOverrides): Promise<string>;
    supernova(overrides?: CallOverrides): Promise<string>;
    token(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        BATCH_TRANSFER_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        genesis(overrides?: CallOverrides): Promise<string>;
        isNFTsReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        owner(overrides?: CallOverrides): Promise<string>;
        receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<BigNumber>;
        sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<number>;
        setSigner(newSigner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        signer(overrides?: CallOverrides): Promise<string>;
        stableDAO(overrides?: CallOverrides): Promise<string>;
        supernova(overrides?: CallOverrides): Promise<string>;
        token(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
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
        isNFTsReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        setSigner(newSigner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        signer(overrides?: CallOverrides): Promise<BigNumber>;
        stableDAO(overrides?: CallOverrides): Promise<BigNumber>;
        supernova(overrides?: CallOverrides): Promise<BigNumber>;
        token(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        BATCH_TRANSFER_LIMIT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        genesis(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isNFTsReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, arg2: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        receiveNFTs(sender: PromiseOrValue<string>, fromChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], sendingId: PromiseOrValue<BigNumberish>, sig: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sendNFTs(toChainId: PromiseOrValue<BigNumberish>, receiver: PromiseOrValue<string>, nftName: PromiseOrValue<string>, nftAddress: PromiseOrValue<string>, ids: PromiseOrValue<BigNumberish>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        sendingCounts(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        sentAt(sender: PromiseOrValue<string>, toChainId: PromiseOrValue<BigNumberish>, sendingId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setSigner(newSigner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        signer(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        stableDAO(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        supernova(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        token(arg0: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=GaiaNFTBridge.d.ts.map