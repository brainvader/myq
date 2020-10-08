import QuizList from '../../components/editor/quiz-list'

import { Grid, Header } from 'semantic-ui-react'
import { Button, Search } from 'semantic-ui-react'

import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
    const { data, error } = useSwr(`/api/quizzes`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <div>
            <Header as='h1' content='Quiz List' textAlign='center' />

            <Grid container >

                <Grid.Row columns={2}>

                    <Grid.Column textAlign='left'>
                        <Button.Group>
                            <Button icon='plus' />
                            <Button icon='delete' />
                            <Button icon='sync' />
                        </Button.Group>
                    </Grid.Column>

                    <Grid.Column textAlign='right'>
                        <Search />
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <QuizList quizzes={data} />
                </Grid.Row>

            </Grid>
        </div >
    )
}
