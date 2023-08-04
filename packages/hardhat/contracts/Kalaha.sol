
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
}
