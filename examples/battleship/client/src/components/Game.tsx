import React from 'react';

import { Board } from './Board';

interface IProps {
    id: string
}

interface IState {
    shipPlaced: boolean,
    opponentShipPlaced: boolean,
    playerState: Array<string>,
    opponentState: Array<string>
}

export class Game extends React.Component<IProps, IState> {
    constructor(props: IProps) {
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