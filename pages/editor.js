import { Grid, Container, Segment } from 'semantic-ui-react'
import { Button, Input, Label, Form, TextArea } from 'semantic-ui-react'

import TitleInput from '../components/title-input'
import TagInput from '../components/tag-input'
import QuestionInput from '../components/question-input'
import AnswerInput from '../components/answer-input'

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
                            <TitleInput />
                        </Grid.Row>
                        <Grid.Row>
                            <TagInput />
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row columns={1}>
                    <Grid.Column textAlign='center'>

                        <QuestionInput cellStyle={cell} />
                        <AnswerInput cellStyle={cell} />

                    </Grid.Column>
                </Grid.Row>

            </Grid >
        </Container >
    )
}