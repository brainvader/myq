import { Grid, Container } from 'semantic-ui-react'

import TitleInput from '../components/title-input'
import TagInput from '../components/tag-input'
import CellForm from '../components/cell-form'

const cell = {
    position: 'relative',
    paddingTop: '2em'
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

                        <CellForm name='Question' cellStyle={cell} />
                        <CellForm name='Answer' cellStyle={cell} />

                    </Grid.Column>
                </Grid.Row>

            </Grid >
        </Container >
    )
}