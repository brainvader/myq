import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Grid, Container } from 'semantic-ui-react'

import EditorMenu from '../editor-menu'
import TitleInput from '../title-input'
import TagInput from '../tag-input'
import CellForm from '../cell-form'

import { useQuiz } from '../../lib/hooks'
import { requestUpdateQuiz } from '../../logics/api'

export default function Editor({ uid }) {
    const { data, mutate, isLoading, isError } = useQuiz(uid)

    const autoSave = async () => {
        console.log(data.title)
        const newQuiz = await requestUpdateQuiz(data)
        mutate({ ...newQuiz })
    }

    useEffect(() => {
        const interval = data ? setInterval(autoSave, 1000) : null
        return () => clearInterval(interval)
    }, [data])

    const { data, mutate, isLoading, isError } = useQuiz(uid)

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const quiz = data

    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <EditorMenu />
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Grid.Row>
                            <TitleInput title={quiz.title} />
                        </Grid.Row>
                        <Grid.Row>
                            <TagInput tags={quiz.tags} />
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