// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract IKalaha {
    struct Game {
        address[2] players;
        uint8[14] board;
        uint8 nonce;
        address winner;
    }
    uint256 public gameID;
    mapping (uint256 => Game) games;
    function state(
        uint256 _game
        )
        external view virtual returns (
            address[2] players;
            uint8[14] board;
            uint8 nonce;
            address winner;
        );
}