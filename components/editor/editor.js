import { Grid, Container } from 'semantic-ui-react'

import EditorMenu from '../editor-menu'
import TitleInput from '../title-input'
import TagInput from '../tag-input'
import CellForm from '../cell-form'

import CellFormContext from '../../components/cell-form/context'

import { requestUpdateQuiz } from '../../logics/api'

export default function Editor({ quiz }) {
    const autoSave = async () => {
        const newQuiz = await requestUpdateQuiz(data)
        mutate(newQuiz)
    }

    // useEffect(() => {
    // const interval = data ? setInterval(async () => {
    //     console.log(`pre auto save`, data.tags)
    //     const newQuiz = await requestUpdateQuiz(data)
    //     console.log(`post auto save`, newQuiz.tags)
    //     mutate(newQuiz)
    // }, 1000) : null
    // return () => clearInterval(interval)
    // }, [data])

    const question = (quiz.question || []).sort((a, b) => a.order - b.order)
    const answer = (quiz.answer || []).sort((a, b) => a.order - b.order)

    return (
        <Container>
            <Grid centered>
                <Grid.Row>
                    <EditorMenu />
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