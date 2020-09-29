import { Grid, Container, Segment } from 'semantic-ui-react'
import { Button, Input, Label, Form, TextArea } from 'semantic-ui-react'

const textAreaRows = 3

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
                        {'　'}
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
                        <Segment.Group padded>

                            <Segment >
                                <Label attached='top left'>Question</Label>
                            </Segment>

                            <Button size='mini' circular icon='plus' />
                            <Segment.Group>
                                <Segment compact>
                                    <Form>
                                        <TextArea rows={textAreaRows} />
                                    </Form>
                                    <Button.Group>
                                        <Button icon='code' />
                                        <Button icon='dollar sign' />
                                    </Button.Group>
                                    {'    '}
                                    <Button.Group>
                                        <Button icon='minus' />
                                    </Button.Group>
                                </Segment>
                            </Segment.Group>

                            <Button size='mini' circular icon='plus' />

                        </Segment.Group>

                        <Segment.Group padded>

                            <Segment>
                                <Label attached='top left'>Answer</Label>
                            </Segment>

                            <Button size='mini' circular icon='plus' />
                            <Segment.Group>
                                <Segment compact>
                                    <Form>
                                        <TextArea rows={textAreaRows} />
                                    </Form>
                                    <Button.Group>
                                        <Button icon='code' />
                                        <Button icon='dollar sign' />
                                        <Button icon='linkify' />
                                    </Button.Group>
                                    {'    '}
                                    <Button.Group>
                                        <Button icon='minus' />
                                    </Button.Group>
                                </Segment>
                            </Segment.Group>

                            <Button size='mini' circular icon='plus' />

                        </Segment.Group>
                    </Grid.Column>
                </Grid.Row>

            </Grid >
        </Container >
    )
}