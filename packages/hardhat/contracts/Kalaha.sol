
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
            uint8[14] memory board = games[gameID].board;
            uint8 nonce = games[gameID].nonce;
            if (nonce % 2 == 0) {
                
            }
            else {
                
            }

        }
}
