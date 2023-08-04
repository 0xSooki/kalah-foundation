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

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.parseEther("0.001");

  const lock = await ethers.deployContract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  );

  await exportAddress("Lock", lock.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
