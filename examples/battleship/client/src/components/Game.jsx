import React from 'react';

import { Board } from './Board';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipPlaced: false,
            opponentShipPlaced: false,
            playerState: Array(25).fill('empty'),
            opponentState: Array(25).fill('empty')
        }
    }

    render() {
        return (
            <>
                Start game with id {this.props.id}
                <Board squares={this.state.playerState} player />
                <Board squares={this.state.opponentState} />
            </>
        )
    }
}