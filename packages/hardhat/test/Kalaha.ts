import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Kalaha } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { board0x0, board0x00, board0x25 } from "./BoardStates";

async function deployKakahFixture() {
  const [player1, player2] = await ethers.getSigners();

  const Kalah = await ethers.getContractFactory("Kalaha");
  const kalah = await Kalah.deploy();

  return { kalah, player1, player2 };
}

describe("Kalaha", function () {
  let kalah: Kalaha, player1: HardhatEthersSigner, player2: HardhatEthersSigner;

  beforeEach(async function () {
    ({ kalah, player1, player2 } = await deployKakahFixture());
  });

  it("should allow player 1 to make a valid move", async function () {
    const gameID = 1;

    await kalah.connect(player1).newGame();
    await kalah.connect(player2).join(gameID);

    // Assuming it's player1's turn
    await kalah.connect(player1).move(gameID, 0);

    const newBoard = await kalah.state(gameID);
    // Assert the board has changed as expected
    expect(newBoard.board).to.be.deep.equal(board0x0);
  });

  it("should allow player 2 to make a valid move", async function () {
    const gameID = 1;

    await kalah.connect(player1).newGame();
    await kalah.connect(player2).join(gameID);

    // Assuming it's player1's turn
    await kalah.connect(player1).move(gameID, 0);

    // Assuming it's player2's turn
    await kalah.connect(player2).move(gameID, 0);

    const newBoard = await kalah.state(gameID);
    // Assert the board has changed as expected
    expect(newBoard.board).to.be.deep.equal(board0x00);
  });

  it("check double move", async function () {
    const gameID = 1;

    await kalah.connect(player1).newGame();
    await kalah.connect(player2).join(gameID);

    // Set up a game where player 1 wins
    await kalah.connect(player1).move(gameID, 2);
    await kalah.connect(player1).move(gameID, 5);

    const state = await kalah.state(gameID);
    expect(state.board).to.be.deep.equal(board0x25);
  });

  it("check double move revert", async function () {
    const gameID = 1;

    await kalah.connect(player1).newGame();
    await kalah.connect(player2).join(gameID);

    // Player 1's move
    await kalah.connect(player1).move(gameID, 2);

    // Try to make another move for player 2 immediately, which should fail
    await expect(kalah.connect(player2).move(gameID, 0)).to.be.revertedWith(
      "Not your turn"
    );
  });
});