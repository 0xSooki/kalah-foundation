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
    modifier joinable(uint256 _game) {
        require(
            games[_game].players[0] != address(0) &&
                games[_game].players[0] != msg.sender &&
                games[_game].players[1] == address(0),
            "Invalid gameID"
        );
        _;
    }

    constructor(address _kalahVerifier) {
        kalahVerifier = KalahVerifier(_kalahVerifier);
    }

    function verify(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        bool b = kalahVerifier.verifyAndExecute(
            signal,
            root,
            nullifierHash,
            proof
        );
        if (b) {
            verifiedUsers[msg.sender] = true;
            emit Verified(msg.sender);
        } else {
            emit NotVerified(msg.sender);
        }
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

    function isVerified(address _user) external view returns (bool) {
        return verifiedUsers[_user];
    }

    function newGame(
        bool _verifiedOnly
    ) external virtual override returns (uint256) {
        gameID++;
        games[gameID].verifiedOnly = _verifiedOnly;
        games[gameID].players[0] = msg.sender;
        games[gameID].board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
        emit NewGame(gameID, msg.sender);
        return gameID;
    }

    function join(uint256 _game) external virtual override joinable(_game) {
        if (games[_game].verifiedOnly) {
            require(verifiedUsers[msg.sender], "Not verified");
        }
        games[_game].players[1] = msg.sender;
        emit Join(_game, msg.sender);
    }

    function move(
        uint256 _game,
        uint8 x
    ) external virtual override myTurn(_game) {
        Game storage game = games[_game];
        emit Move(
            _game,
            x,
            game.nonce % 2 == 0 ? game.players[0] : game.players[1]
        );
        require(game.winner == address(0), "Game over");
        require(x < 6, "Invalid move, x out of range");

        uint8 tmp = game.nonce % 2 == 1 ? 7 : 0;
        uint8 houseValue = game.board[x + tmp];
        require(houseValue != 0, "Invalid move, empty house");

        game.board[x + tmp] = 0;

        for (uint8 i = 1; i <= houseValue; i++) {
            uint8 index = (x + tmp + i) % 14;
            game.board[index]++;
        }

        bool b = true;
        bool c = true;
        for (uint8 i = 7 - tmp; i < 13 - tmp; i++) {
            b =
                b &&
                (
                    (game.nonce % 2) == 0
                        ? game.board[i - 7] == 0
                        : game.board[i + 7] == 0
                );
            c = c && game.board[i] == 0;
        }

        if ((x + houseValue + tmp) % 14 != 6 + tmp || b) {
            game.nonce++;
            if (c) {
                address winner = game.players[game.nonce % 2];
                game.winner = winner;
                emit Win(_game, winner, msg.sender);
            }
        }
    }
}
