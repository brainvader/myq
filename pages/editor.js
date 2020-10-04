import { Grid, Container } from 'semantic-ui-react'

import EditorMenu from '../components/editor-menu'
import TitleInput from '../components/title-input'
import TagInput from '../components/tag-input'
import CellForm from '../components/cell-form'

export default function Editor() {
    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <EditorMenu />
                </Grid.Row>

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

                        <CellForm name='Question' />
                        <CellForm name='Answer' />

                    </Grid.Column>
                </Grid.Row>

            </Grid >
        </Container >
    )
}