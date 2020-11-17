import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

import { Grid, Container } from 'semantic-ui-react'

import EditorMenu from '../editor-menu'
import TitleInput from '../title-input'
import TagInput from '../tag-input'
import CellForm from '../cell-form'

import CellFormContext from '../../components/cell-form/context'

import { OK, requestUpdateQuiz } from '../../logics/api'

export default function Editor({ quiz }) {
    const router = useRouter()

    const autoSave = async () => {
        const body = { quiz: quiz }
        const res = await requestUpdateQuiz(quiz.uid, body)
        if (OK(res)) mutate(`/api/quizzes/${quiz.uid}`)
    }

    const saveBeforeLeavingPage = (event) => {
        autoSave()

        // disable because it feels like redundant to make confimation
        // every time leaving from the editor page
        // const confirmed = window.confirm("現在の内容を保存して戻りますか?")
        // if (confirmed) {
        //     autoSave()
        // }
    }

    useEffect(() => {
        // execute save every 1 sec
        const interval = quiz ? setInterval(autoSave, 1000) : null

        // call saveBeforeLeavingPage when chainging route in its child components
        router.events.on('routeChangeStart', saveBeforeLeavingPage)

        return () => {
            clearInterval(interval)
            router.events.off('routeChangeStart', saveBeforeLeavingPage)
        }
    }, [quiz])

    const question = (quiz.question || []).sort((a, b) => a.order - b.order)
    const answer = (quiz.answer || []).sort((a, b) => a.order - b.order)

    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <EditorMenu quiz={quiz} />
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Grid.Row>
                            <TitleInput quiz={quiz} />
                        </Grid.Row>
                        <Grid.Row>
                            <TagInput quiz={quiz} />
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>


                <Grid.Row columns={1}>
                    <Grid.Column textAlign='center'>

                        <CellFormContext.Provider value={{
                            formType: 'question',
                            cellsCount: question.length
                        }}>
                            <CellForm cells={question} />
                        </CellFormContext.Provider>

                        <CellFormContext.Provider value={{
                            formType: 'answer',
                            cellsCount: answer.length
                        }}>
                            <CellForm cells={answer} />
                        </CellFormContext.Provider>

                    </Grid.Column>
                </Grid.Row>

            </Grid >
        </Container >
    )
}