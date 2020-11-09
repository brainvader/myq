import { useRouter } from 'next/router'

import { mutate } from 'swr'
import axios from 'axios'

import QuizList from '../../components/editor/quiz-list'
import { PageProvider, usePage } from '../../components/editor/paginator'

import { Grid, Header } from 'semantic-ui-react'
import { Button, Search } from 'semantic-ui-react'

import { getTimeStamp } from '../../lib/utils'

const CreateQuizButton = () => {
    const router = useRouter()
    const { pageState, _ } = usePage()

    const createHandler = async () => {
        const res = await axios.post('/api/quizzes', { createdAt: getTimeStamp() })
        const newQuiz = await res.data
        mutate(`/api/quizzes?page=${pageState.activePage}`)

        router.push({
            pathname: '/quizzes/[uid]',
            query: { uid: newQuiz.uid },
        })
    }
    return <Button className={"create-quiz-btn"} icon='plus' onClick={createHandler} />
}

const DeleteQuizButton = () => {
    const { pageState, pageActions } = usePage()

    const deleteCheckedHandler = async () => {
        // get checked quiz UIDs
        const uids = Array.from(pageState.checked)
        const body = { uids: uids }
        // delete all checked quizzes
        const res = await fetch('/api/quizzes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        // reset checked quizzes
        pageActions.uncheckAll()
        mutate(`/api/quizzes?page=${pageState.activePage}`)
    }

    return <Button icon='trash' onClick={deleteCheckedHandler} />
}

const ReloadQuizzesButton = ({ handler }) => {
    return <Button icon='sync' onClick={handler} />
}

function Content() {

    // TODO: how to relaod?
    const reloadHandler = () => mutate()

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