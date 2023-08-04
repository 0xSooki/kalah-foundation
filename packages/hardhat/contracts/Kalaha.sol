
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IKalaha.sol";

contract Kalaha is IKalaha {

    function state(
        uint256 _game
    )
        external view virtual override returns (
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
    function newGame() external virtual override  {
        gameID++;
        games[gameID].players[0] = msg.sender;
        games[gameID].board = [4,4,4,4,4,4,0,4,4,4,4,4,4,0];
        games[gameID].nonce = 0;
    }
    function join(uint256 _game) external virtual override  {
        //modifier
        games[_game].players[1] = msg.sender;
        emit Join(_game,msg.sender);
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
            }
            else {
                uint8 t = board[14-x];
                board[14-x] = 0;
                for (uint i = 1; i < t+1; i++) {
                    board[(14-x+i)%14]++;
                }
            }

        }
}
