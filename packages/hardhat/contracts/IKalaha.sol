// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract IKalaha {
    event NewGame(uint256 _game, address _by);
    event Join(uint256 _game, address _by);
    event Move(uint256 _game, uint8 x, address _by);
    event Win(uint256 _game, address _winner, address _by);
    event Start(uint256 _game, address _by);

    struct Game {
        address[2] players;
        uint8[14] board;
        uint8 nonce;
        address winner;
    }
    uint256 public gameID;
    mapping(uint256 => Game) games;

    function state(
        uint256 _game
    )
        external
        view
        virtual
        returns (
            address[2] memory players,
            uint8[14] memory board,
            uint8 nonce,
            address winner
        );

    function newGame() external virtual;

    function join(uint256 _game) external virtual;

    function move(uint256 _game, uint8 x) external virtual;
}
