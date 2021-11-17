import React from 'react';

import { useStatefulInput } from '../utils/useStatefulInput';

import { Button } from 'reactstrap';

export const GameSetup = ({ startGame } : {startGame : any} ) => {
  
    const [gameCode, gameCodeInput] = useStatefulInput('gameCode', 'Game Code')

    return (
      <>
        <h2>Setup Workgroup</h2>
        <p>
          Hello NAME. Now that you're registered you can 
        </p>
  
        {gameCodeInput}
  
        <Button 
          onClick={  startGame }
          disabled={gameCode === ''}
        >
          Create
        </Button>
      </>
    );
};