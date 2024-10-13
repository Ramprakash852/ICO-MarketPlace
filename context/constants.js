// Woox: 0x8438b0571ef64efD57f13Df6b3975FAAF599409D
// ICOWoox: 0x16f03F2C46E19bd6fF2C2AF2D75f5F2a28F0B796
// ICOWoox: 0x2302A1b159d9522f28FD0F1CDa346Ca9367d6046



import { ethers, Signer } from "ethers";
import Web3Modal from "web3modal";

// Internal Import 

import factoryAbi from "./factoryAbi.json";
import ERC20ABI from "./abi.json";

import Woox from "./Woox.json";
import { ICOWoox } from "./ICOWoox.json";
import { Liquidity } from "./Liquidity.json";
import { ADDRESS_ZERO } from "@uniswap/v3-sdk";

//Token

export const Woox_ADDRESS = "0x8438b0571ef64efD57f13Df6b3975FAAF599409D";
export const Woox_ABI = Woox.abi;


//Token sale
export const ICOWoox_ADDRESS = "0x16f03F2C46E19bd6fF2C2AF2D75f5F2a28F0B796";
export const ICOWoox_ABI = ICOWoox.abi;

// Liquidity
export const Liqudity_ADDRESS = "0x2302A1b159d9522f28FD0F1CDa346Ca9367d6046";
export const Liqudity_ABI = Liquidity.abi;


export const FACTORY_ABI = factoryAbi;
export const FACTORY_ADDRRESS = "0x1F98431c8aD98523631AE4a59f26734ea31F984";

export const positionmanagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";


const fetchContract = (Signer,ABI,ADDRESS) => {
    new ethers.Contract(ADDRESS,ABI,Signer);
};

export const web3Provider = async () => {
    try {
        const web3modal  = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        return provider;
    } catch (error) {
        console.log(error);
    }
};

export const CONNECTING_CONTRACT = async (ADDRESS) => {
    try {
        const web3modal  = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const network = await provider.getNetwork();
        const signer = provider.getSigner();
        const contract = fetchContract(signer,ERC20ABI,ADDRESS);


        //USER Address
        const userAddress = signer.getAddress();
        const balance = await contract.balanceOf(userAddress);

        const name = await contract.name();
        const symbol = await contract.symbol();
        const supply = await contract.totalSupply();
        const decimals = await contract.decimals();
        const address = await contract.address;

        const token = {
            address:address,
            name:name,
            symbol:symbol,
            decimals:decimals,
            supply: ethers.utils.formatEther(supply.toString()),
            balance: ethers.utils.formatEther(balance.toString()),
            chainID: network.chainId,
        };
        return token;


    } catch (error) {
        console.log(error);
        
    }
};

export const internalWooxContract = async () => {
    try {
        const web3modal  = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider,Woox_ABI,Woox_ADDRESS);
        return contract;
        
    } catch (error) {
        console.log(error);
    }
};

export const internalICOWooxContract = async () => {
    try {
        const web3modal  = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider,ICOWoox_ABI,ICOWoox_ADDRESS);
        return contract;
        
    } catch (error) {
        console.log(error);
    }
};

export const internalAddLiquidity = async () => {
    try {
        const web3modal  = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const contract = fetchContract(provider,Liqudity_ABI,Liqudity_ADDRESS);
        return contract;
        
    } catch (error) {
        console.log(error);
    }
};

export const getBalance = async (params) => {
    try {
        const web3modal  = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        
        return await signer.getBalance();
        
    } catch (error) {
        console.log(error);
        
    }
}

