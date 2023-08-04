
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IKalaha.sol";

contract Kalaha is IKalaha {
    function state(
        uint256 _game
    )
        external view virtual override returns (
            address[2] players;
            uint8[14] board;
            uint8 nonce;
            address winner;
        )
    {
        return (
            games[_game].players,
            games[_game].board,
            games[_game].nonce,
            games[_game].winner
        );
    }
}
