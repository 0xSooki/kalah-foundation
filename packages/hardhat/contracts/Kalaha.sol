// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IKalaha.sol";

contract Kalaha is IKalaha {
    modifier myTurn(uint256 _game) {
        require(
            games[_game].players[games[_game].nonce % 2] == msg.sender,
            "Not your turn"
        );
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
        ) external virtual override {
            //modifier
            uint8[14] memory board = games[_game].board;
            uint8 nonce = games[_game].nonce;
            if (nonce % 2 == 0) {
                uint8 t = board[6-x];
                board[6-x] = 0;
                for (uint i = 1; i < t+1; i++) {
                    board[(6-x+i)%14]++;
                }
                if ((6-x+t)%14 == 5) {
                    nonce += 2;
                }
                else {
                    nonce++;
                }
                games[_game].board = board;
                games[_game].nonce = nonce;
                emit Move(nonce, x);
                bool b = true;
                for (uint i = 7; i < 14; i++) {
                    b = b && board[i] == 0;
                }
                if (games[_game].nonce % 2 == 1 && b) {
                    emit Win(_game,games[_game].players[1], msg.sender);
                }
            }
            else {
                uint8 t = board[14-x];
                board[14-x] = 0;
                for (uint i = 1; i < t+1; i++) {
                    board[(i-x)%14]++;
                }
                if ((t-x)%14 == 13) {
                    games[_game].nonce += 2;
                }
                else {
                    games[_game].nonce++;
                }
                games[_game].board = board;
                games[_game].nonce = nonce;
                emit Move(nonce, x);
                bool b = true;
                for (uint i = 0; i < 6; i++) {
                    b = b && board[i] == 0;
                }
                if (games[_game].nonce % 2 == 0 && b) {
                    emit Win(_game, games[_game].players[0], msg.sender);
                }
            }
        }
}
