import { Grid, Container, Segment } from 'semantic-ui-react'
import { Button, Input, Label, Form, TextArea } from 'semantic-ui-react'

const textAreaRows = 3

const cellMargin = 2

const cell = {
    marginTop: `${cellMargin}em`,
    marginBottom: `${cellMargin}em`,
}

const cellMenu = {
    marginTop: `0.5em`,
    marginBottom: `1em`
}

const addCellButton = {
    position: 'absolute',
    zIndex: 1,
    transform: `translate(-50%, -50%)`
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

                            <Segment.Group style={cell}>
                                <Button
                                    style={addCellButton}
                                    size='mini'
                                    circular icon='plus' />

                                <Segment compact>
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
                                        </Button.Group>
                                    </div>
                                </Segment>
                                <Button
                                    style={addCellButton}
                                    size='mini'
                                    circular icon='plus' />
                            </Segment.Group>



                        </Segment.Group>

                        <Segment.Group>

                            <Segment>
                                <Label attached='top left'>Answer</Label>
                            </Segment>

                            <Segment.Group style={cell}>
                                <Button
                                    style={addCellButton}
                                    size='mini'
                                    circular icon='plus' />
                                <Segment compact>
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
                                        </Button.Group>
                                    </div>
                                </Segment>
                                <Button
                                    style={addCellButton}
                                    size='mini'
                                    circular icon='plus' />
                            </Segment.Group>

                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>

            </Grid >
        </Container >
    )
}