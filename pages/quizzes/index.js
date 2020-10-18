import { useRouter } from 'next/router'

import { mutate } from 'swr'

import QuizList from '../../components/editor/quiz-list'
import { PageProvider, usePage } from '../../components/editor/paginator'

import { Grid, Header } from 'semantic-ui-react'
import { Button, Search } from 'semantic-ui-react'

import { getTimeStamp } from '../../lib/utils'

const CreateQuizButton = ({ handler }) => {
    return <Button icon='plus' onClick={handler} />
}

const DeleteQuizButton = () => {
    return <Button icon='delete' />
}

const ReloadQuizzesButton = ({ handler }) => {
    return <Button icon='sync' onClick={handler} />
}

function Content() {

    const router = useRouter()
    const { pageState, _ } = usePage()

    const createHandler = async () => {
        const body = { createdAt: getTimeStamp() }
        const res = await fetch('/api/quizzes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const newQuiz = await res.json()
        mutate(`/api/quizzes?page=${pageState.activePage}`)

        router.push({
            pathname: '/quizzes/[uid]',
            query: { uid: newQuiz.uid },
        })
    }

    const reloadHandler = () => mutate()

    return (
        <div>
            <Header as='h1' content='Quiz List' textAlign='center' />

            <Grid container >

                <Grid.Row columns={2}>

                    <Grid.Column textAlign='left'>
                        <Button.Group>
                            <CreateQuizButton handler={createHandler} />
                            <DeleteQuizButton />
                            <ReloadQuizzesButton handler={reloadHandler} />
                        </Button.Group>
                    </Grid.Column>

                    <Grid.Column textAlign='right'>
                        <Search />
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <QuizList />
                </Grid.Row>

            </Grid>
        </div >
    )
}

const Dashboad = () => {
    return (
        <PageProvider>
            <Content />
        </PageProvider>
    )
}

export default Dashboad