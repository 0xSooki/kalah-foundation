// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IKalaha.sol";

contract Kalaha is IKalaha {
    modifier myTurn(uint256 _game) {
        address current = games[_game].nonce % 2 == 0
            ? games[_game].players[0]
            : games[_game].players[1];
        require(msg.sender == current, "Not your turn");
        _;
    }

    function state(
        uint256 _game
    )
        external
        view
        virtual
        override
        returns (
            address[2] memory players,
            uint8[14] memory board,
            uint8 nonce,
            address winner
        )
    {
        return (
            games[_game].players,
            games[_game].board,
            games[_game].nonce,
            games[_game].winner
        );
    }

    function newGame() external virtual override {
        gameID++;
        games[gameID].players[0] = msg.sender;
        games[gameID].board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
        games[gameID].nonce = 0;
    }

    function join(uint256 _game) external virtual override {
        //modifier
        games[_game].players[1] = msg.sender;
        emit Join(_game, msg.sender);
    }

    function move(
        uint256 _game,
        uint8 x
    ) external virtual override myTurn(_game) {
        require(x >= 0 && x < 6, "Invalid move, x out of range");
        uint8 tmp;
        uint8 nonce = games[_game].nonce;
        if (nonce % 2 == 1) tmp = 7;
        require(games[_game].board[x + tmp] != 0, "Invalid move, empty house");

        uint8[14] memory board = games[_game].board;
        uint8 t = board[x + tmp];
        board[x + tmp] = 0;

        for (uint i = 1; i < t + 1; i++) {
            board[(x + tmp + i) % 14]++;
        }

        bool b = true;
        for (uint i = tmp; i < 6 + tmp; i++) {
            b = b && board[i] == 0;
        }

        if ((x + t + tmp) % 14 != 6 + tmp || b) nonce++;
        games[_game].board = board;
        games[_game].nonce = nonce;
        emit Move(_game, x);

        if (games[_game].nonce % 2 == 1 && b) {
            emit Win(_game, games[_game].players[nonce % 2], msg.sender);
            games[_game].winner = games[_game].players[nonce % 2];
        }
    }
}
