import React,{useState,useEffect, Children} from "react";
import { ethers,Contract } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";
import uniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";
import toast from "react-hot-toast";
import { Token } from "@uniswap/sdk-core";

import { Pool,Position,nearestUsableTick } from "@uniswap/v3-sdk";
import {abi as INonfungiblePositionManagerABI } from "@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json";
import ERC20ABI from "./abi.json";


//Internal import 
import {
    ERC20_ABI,
    TOKEN_ABI,
    V3_SWAP_ROUTER_ADDRESS,
    CONNECTING_CONTRACT,
    FACTORY_ABI,
    FACTORY_ADDRRESS,
    Web3Provider,
    positionmanagerAddress,
    internalWooxContract,
    internalICOWooxContract,
    internalAddLiquidity,
    getBalance,
    web3Provider
} from "./constants";
import parseErrormsg from "../Utils/index";
import { network } from "hardhat";

export const CONTEXT = React.createContext();

export const CONTEXT_Provider = ({Children}) => {
    const DAPP_NAME = "Liquidity App";
    const [loader,setLoader] =useState(false);
    const[address,setAddress] = useState("");
    const [chainID,setChainID] = useState();

    //Token
     const[balane,setbalance] = useState();
     const[nativeToken,setNativeToken] = useState();
     const[tokenHolders,setTokenHolders] = useState();
     const[tokenSale,setTokenSale] = useState();
     const [currentHolder,setCurrentHolder] = useState();

     //Notification 
     const notifyError = (msg) => toast.error(msg,{duration:4000});
     const notifySuccess = (msg) => toast.success(msg, {duration: 4000});

     //Connect Wallet
     const connect = async () => {
        try {
            if(!window.ethereum) return notifyError("Install MetaMask");
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if(accounts.length) {
                setAddress(accounts[0]);
            }
            else{
                notifyError("Sorry, ou have No account");
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            setChainID(network.chainId);
        } catch (error) {
            console.log(error);
            
        }
     };

     //Check if Wallet Connected
     const checkIFWalletConnected = async () => {
        const accounts = await window.ethereum.request({
        method: "eth_accounts",
        });
        
        return accounts[0];
     };

     const LOAD_TOKEN = async (token) => {
        try {
            const tokenDetail = await CONNECTING_CONTRACT(token);
            return tokenDetail;
        } catch (error) {
            console.log(error); 
        }
     };

     const GET_POOL_ADDRESS = async (token_1, token_2, fee) => {
        try {
            setLoader(true);
            const PROVIDER = await web3Provider();
            const factoryContract = new ethers.Contract(
                FACTORY_ABI,
                FACTORY_ADDRRESS,
                PROVIDER
            );
            const poolAddress = await factoryContract.functions.getPool(
                token_1.address,
                token_2.address,
                Number(fee)
            );

            const poolHistory = {
                token_A: token_1,
                token_B: token_2,
                fee: fee,
                network: token_1.chainId,
                poolAddress: poolAddress,
            };

            const zeroAdd = "0x0000000000000000000000000000000000000000";
            if(poolAddress==zeroAdd){
                notifySuccess("Sorry there is no pool");
            }
            else {
                let poolArray = [];
                const poolLists = localStorage.getItem("poolHistory");
                if(poolLists) {
                    poolArray =JSON.parse(localStorage.getItem("poolHistory"));
                    poolArray.push(poolHistory);
                    localStorage.setItem("poolHistory",JSON.stringify(poolArray));
                }
                else {
                    poolArray.push(poolHistory);
                    localStorage.setItem("poolHistory",JSON.stringify(poolArray));
                }
                setLoader(false);
                notifySuccess("Successfully Completed");
            }
            return poolAddress;
        } catch (error) {
            const errorMsg = parseErrormsg(error);
            setLoader(false);
            notifyError(errorMsg); 
        }
     };

     // Create Liqudity
     async function getPoolData(pooContract){
        //const [tickSpacing, fee,liquidity,slot]
     }
}