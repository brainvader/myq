import { useRouter } from 'next/router'

import { mutate } from 'swr'

import QuizList from '../../components/editor/quiz-list'

import { Grid, Header } from 'semantic-ui-react'
import { Button, Search, Icon } from 'semantic-ui-react'

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

export default function Dashboard() {

    const createHandler = async () => {
        const body = { createdAt: getTimeStamp() }
        const res = await fetch('/api/quizzes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        console.log(`create quiz with uid: ${data.uid}`)
        mutate('/api/quizzes', true)

        // router.push('/editor')
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
