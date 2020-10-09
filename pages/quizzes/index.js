import QuizList from '../../components/editor/quiz-list'

import { Grid, Header } from 'semantic-ui-react'
import { Button, Search, Icon } from 'semantic-ui-react'

import { useQuizzes } from '../../lib/hooks'

const CreateQuizButton = () => {
    return <Button icon='plus' />
}

const DeleteQuizButton = () => {
    return <Button icon='delete' />
}

const ReloadQuizzesButton = ({ handler }) => {
    return <Button icon='sync' onClick={handler} />
}

export default function Home() {
    const { quizzes, reload, isLoading, isError } = useQuizzes()

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const reloadHandler = () => reload([...quizzes])

    return (
        <div>
            <Header as='h1' content='Quiz List' textAlign='center' />

            <Grid container >

                <Grid.Row columns={2}>

                    <Grid.Column textAlign='left'>
                        <Button.Group>
                            <CreateQuizButton />
                            <DeleteQuizButton />
                            <ReloadQuizzesButton handler={reloadHandler} />
                        </Button.Group>
                    </Grid.Column>

                    <Grid.Column textAlign='right'>
                        <Search />
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <QuizList quizzes={quizzes} />
                </Grid.Row>

            </Grid>
        </div >
    )
}
