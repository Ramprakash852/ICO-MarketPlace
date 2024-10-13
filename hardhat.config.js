require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_POLYGON_MUMBAI_RPC =
  "https://rpc.ankr.com/polygon_amoy";
const NEXT_PUBLIC_PRIVATE_KEY = "189dcfe68a243a292aba83cf3a0ddee77122981521daac91e0eb83799646839f";
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: NEXT_PUBLIC_POLYGON_MUMBAI_RPC,
      accounts: [`0x${NEXT_PUBLIC_PRIVATE_KEY}`],
    },
  },
};


//npx hardhat run --network polygon_mumbai scripts/deploy.js