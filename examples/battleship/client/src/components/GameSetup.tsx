import { useState } from 'react';

import { Button, FormGroup, Input, InputGroup, InputGroupText, Container, Row, Col } from 'reactstrap';

import { socket } from '../utils/socket'

import '../styles/gameSetup.css'

export const GameSetup = ({ orgName } : {orgName: string} ) => {
  
    const [gameCode, setGameCode] = useState('')
    const [workgroupId, setWorkgroupId] = useState('')

    const updateCodeValue = (value: string) => {
        let upper: string = value.toUpperCase()

        if (upper.length > gameCode.length) {

            let matches = upper.match(/([A-Z0-9])+/)

            if (matches?.length === 2 && matches[0].length <= 4) {
                setGameCode(matches[0])
            }
        }
        else {
            setGameCode(upper)
        }
    }

    const createWorkgroup = () => {
        socket.emit('workgroup:create')
    }

    const joinWorkgroup = () => {
        socket.emit('workgroup:join', gameCode)
    }

    socket.on('workgroup:id', (id) => {
        console.log('created workgroup with id', id)
        setWorkgroupId(id)
    })

    return (
      <>
        <h2>Setup Workgroup</h2>
        <p>
            Hello {orgName}. Now that you've registered an organization it's time to create or join a workgroup. (EXPAND EXPLANATION) 
        </p>

        { workgroupId !== '' ? 
            <h1>{workgroupId}</h1>
        :  
            <Container>
                <Row className='button-row'>
                    <Col>
                        <Button 
                            color='primary'
                            onClick={  createWorkgroup }
                            size='lg'
                        >
                            Create Workgroup
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className='or'>OR</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm='7'>
                        <FormGroup floating>
                            <InputGroup size='lg'>
                                <InputGroupText>#</InputGroupText>
                                <Input
                                    id='gameCode'
                                    name='gameCode'
                                    placeholder='0000'
                                    type='text'
                                    value={gameCode}
                                    onChange={e => updateCodeValue(e.target.value)}
                                    
                                />
                                <Button 
                                    color='primary'
                                    outline
                                    onClick={  joinWorkgroup } 
                                    disabled={gameCode.length !== 4}
                                >
                                    Join Workgroup
                                </Button>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>

            </Container>
        }
      </>
    );
};