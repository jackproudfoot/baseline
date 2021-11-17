import { useState } from 'react'

import '../styles/board.css'

const SHIP_LENGTH = 3;
const BOARD_WIDTH = 5;

export const Board = ({squares, player = false} : {squares: Array<string>, player?: boolean}) => {
    const [hoverIndex, setHoverIndex] = useState(0)
    const [orientation, setOrientation] = useState(false)
    
    const updateHoverIndex = (index: number) => {
        if (!orientation && index % BOARD_WIDTH < SHIP_LENGTH) setHoverIndex(index) 
        else if (orientation && index < BOARD_WIDTH * SHIP_LENGTH) setHoverIndex(index)
    }

    const indexInRange = (index: number) => {
        if (!orientation) {
            return hoverIndex <= index && index < hoverIndex + SHIP_LENGTH
        }
        else {
            return index === hoverIndex 
            || index === hoverIndex + BOARD_WIDTH
            || index === hoverIndex + 2 * BOARD_WIDTH
        }
    }

    let boardSquares = squares.map((type, index) => {
        return (
            <div 
                className={player && indexInRange(index) ? 'ship' : type} 
                key={index}
                onMouseEnter={() => updateHoverIndex(index)}
            ></div>
        )
    })
    
    return (
        <div 
            className={player ? 'board player' : 'board opponent'}
            onContextMenu={(e) => {
                e.preventDefault()
                setOrientation(!orientation)
            }}
        >
            {boardSquares}
        </div>
    )
}