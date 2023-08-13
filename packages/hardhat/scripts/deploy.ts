import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import { Addressable } from "ethers";

const exportAddress = async (
  contractName: string,
  address: string | Addressable
) => {
  try {
    const relativePath = `../artifacts/contracts/${contractName}.sol/`;
    const fileName = `${contractName}.json`;
    const filePath = path.join(__dirname, relativePath, fileName);
    const rawData = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(rawData);

    jsonData.contractAddress = address;

    const updatedData = JSON.stringify(jsonData, null, 2);

    fs.writeFileSync(filePath, updatedData, "utf8");

    console.log(`Added contract address ${address} to ${fileName}`);
  } catch (err) {
    console.error("Error occurred while adding contractAddress:", err);
  }
};

// async function main() {
//   const kalahFactory = await ethers.getContractFactory("Kalaha");
//   const kalaha = await kalahFactory.deploy();

//   await kalaha.waitForDeployment();
//   // await kalaha.connect(deployer).newGame();
//   // let state = await kalaha.state(1);

//   // console.log(state);

//   console.log(`Kalah deployed to ${kalaha.target}`);

//   await exportAddress("Kalaha", kalaha.target);
// }

async function main() {
  const kalahFactory = await ethers.getContractFactory("Kalaha");
  const kalahVerifierFactory = await ethers.getContractFactory("KalahVerifier");

  const kalahVerifier = await kalahVerifierFactory.deploy(
    "0x515f06B36E6D3b707eAecBdeD18d8B384944c87f",
    process.env.WLD_APP_ID as string,
    "user-verification"
  );

  await kalahVerifier.waitForDeployment();

  console.log(`KalahVerifier deployed to ${kalahVerifier.target}`);

  const kalaha = await kalahFactory.deploy(kalahVerifier.target);

  await kalaha.waitForDeployment();
  // await kalaha.connect(deployer).newGame();
  // let state = await kalaha.state(1);

  // console.log(state);

  console.log(`Kalah deployed to ${kalaha.target}`);

  await exportAddress("Kalaha", kalaha.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
