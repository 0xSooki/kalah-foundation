import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

const relativePath = "../artifacts/contracts/Lock.sol/";
const fileName = "Lock.json";

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
  const filePath = path.join(__dirname, relativePath, fileName);

  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(rawData);

    jsonData.contractAddress = lock.target;

    const updatedData = JSON.stringify(jsonData, null, 2);

    fs.writeFileSync(filePath, updatedData, "utf8");

    console.log(`Added contract address ${lock.target} to ${fileName}`);
  } catch (err) {
    console.error("Error occurred while adding contractAddress:", err);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
