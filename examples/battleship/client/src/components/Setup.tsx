import React from 'react';

import { Row, Col } from 'reactstrap'
import { OrgCreation } from './OrgCreation';
import { GameSetup } from './GameSetup';

import { socket } from '../utils/socket'

import '../styles/setup.css'

interface IProps {
  startGame: any
}

interface IState {
  setupState: string,
  orgName: string
}

export class Setup extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = { setupState: 'orgCreation', orgName: '' }
    // this.state = { setupState: 'workgroupSetup', orgName: 'test org' } --- skips to workgroup setup

    this.createOrg = this.createOrg.bind(this)
  }

  componentDidMount = () => {
    socket.on('game:init', (id) => {
      console.log('Initializing game with id ', id)

      this.props.startGame()
    })
  }

  createOrg = (orgName: string) => {
    console.log('Register organization: ', orgName)

    this.setState({ setupState: 'workgroupSetup', orgName: orgName})
  }

  render() {
    return <main>
        <Row className="centerCard">
            <Col sm="12" md={{offset: 3, size: 6}}>
                { 
                  this.state.setupState === 'orgCreation' ? 
                    <OrgCreation createOrg={this.createOrg} /> 
                  : 
                    <GameSetup orgName={ this.state.orgName } /> 
                }
            </Col>
        </Row>
    </main>
  }
};