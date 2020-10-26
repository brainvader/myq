import { useEffect } from 'react'

import { Grid, Container } from 'semantic-ui-react'

import EditorMenu from '../editor-menu'
import TitleInput from '../title-input'
import TagInput from '../tag-input'
import CellForm from '../cell-form'

import { useQuiz } from '../../lib/hooks'
import { requestUpdateQuiz } from '../../logics/api'

export default function Editor() {
    const { data, mutate, isLoading, isError } = useQuiz(uid)

    const autoSave = async () => {
        const newQuiz = await requestUpdateQuiz(data)
        mutate(newQuiz)
    }

    useEffect(() => {
        // const interval = data ? setInterval(async () => {
        //     console.log(`pre auto save`, data.tags)
        //     const newQuiz = await requestUpdateQuiz(data)
        //     console.log(`post auto save`, newQuiz.tags)
        //     mutate(newQuiz)
        // }, 1000) : null
        // return () => clearInterval(interval)
    }, [data])

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
                            <TitleInput />
                        </Grid.Row>
                        <Grid.Row>
                            <TagInput />
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row columns={1}>
                    <Grid.Column textAlign='center'>

                        <CellForm name='question' />
                        <CellForm name='answer' />
                            quiz={quiz} />
                        <CellForm
                            name='Answer'
                            quiz={quiz} />

                    </Grid.Column>
                </Grid.Row>

            </Grid >
        </Container >
    )
}