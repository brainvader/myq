import { Grid, Container, Segment } from 'semantic-ui-react'
import { Button, Input, Label, Form, TextArea } from 'semantic-ui-react'

const textAreaRows = 3

const cell = {
    position: 'relative',
    paddingTop: '2em'
}

const cellMenu = {
    marginTop: `0.5em`,
    marginBottom: `1em`
}

const addCellBtn = {
    position: 'absolute',
    zIndex: 1,
}

const addBeforeBtn = {
    ...addCellBtn,
    transform: `translate(-50%, -50%)`
}

const addAfterBtn = {
    ...addCellBtn,
    transform: `translate(-50%, 0%)`
}


export default function Editor() {
    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <Grid.Column>
                        <Grid.Row>
                            <Input
                                style={{ width: '100%' }}
                                icon="question"
                                placeholder='Title' />
                        </Grid.Row>
                        <Grid.Row>
                            <Input
                                style={{ width: '100%' }}
                                icon='tags'
                                iconPosition='left'
                                label={{ tag: true, content: 'Add Tag' }}
                                labelPosition='right'
                                placeholder='Enter tags'
                            />
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row columns={1}>
                    <Grid.Column textAlign='center'>
                        <Segment.Group>

                            <Segment>
                                <Label attached='top left'>Question</Label>
                            </Segment>

                            <Segment style={cell} className='cell'>
                                <Button
                                    style={addBeforeBtn}
                                    size='mini'
                                    circular icon='plus' />

                                <Form>
                                    <TextArea rows={textAreaRows} />
                                </Form>
                                <div style={cellMenu}>
                                    <Button.Group>
                                        <Button icon='code' />
                                        <Button icon='dollar sign' />
                                    </Button.Group>
                                    {'    '}
                                    <Button.Group>
                                        <Button icon='minus' />
                                        <Button icon='caret up' />
                                        <Button icon='caret down' />
                                    </Button.Group>
                                </div>


                                <Button
                                    style={addAfterBtn}
                                    size='mini'
                                    circular icon='plus' />
                            </Segment>


                        </Segment.Group>

                        <Segment.Group>
                            <Segment>
                                <Label attached='top left'>Answer</Label>
                            </Segment>

                            <Segment style={cell}>
                                <Button
                                    style={addBeforeBtn}
                                    size='mini'
                                    circular icon='plus' />

                                <Form>
                                    <TextArea rows={textAreaRows} />
                                </Form>
                                <div style={cellMenu}>
                                    <Button.Group>
                                        <Button icon='code' />
                                        <Button icon='dollar sign' />
                                        <Button icon='linkify' />
                                    </Button.Group>
                                    {' '}
                                    <Button.Group>
                                        <Button icon='minus' />
                                        <Button icon='caret up' />
                                        <Button icon='caret down' />
                                    </Button.Group>
                                </div>
                                <Button
                                    style={addAfterBtn}
                                    size='mini'
                                    circular icon='plus' />
                            </Segment>

                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>

            </Grid >
        </Container >
    )
}