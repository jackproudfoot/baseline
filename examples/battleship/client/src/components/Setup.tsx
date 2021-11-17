import React, { useState } from 'react';

import { Row, Col } from 'reactstrap'
import { OrgCreation } from './OrgCreation';
import { GameSetup } from './GameSetup';

import '../styles/setup.css'

export const Setup = ({ startGame } : {startGame : any} ) => {
  const [setupState, setSetupState] = useState('orgCreation')

  const createOrg = (orgName: string) => {
    console.log('Register organization: ', orgName)

    setSetupState('gameSetup')
  }

  return (
    <main>
        <Row className="centerCard">
            <Col sm="12" md={{offset: 3, size: 6}}>
                { setupState === 'orgCreation' ? <OrgCreation createOrg={createOrg} /> : <GameSetup startGame={ startGame } /> }
            </Col>
        </Row>
    </main>
  );
};