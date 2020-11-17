import { useRouter } from 'next/router'
import { mutate } from 'swr'

import { Button } from 'semantic-ui-react'

import { requestUpdateQuiz, OK } from '../logics/api'

export default function EditorMenu({ quiz }) {
    const router = useRouter()

    // save the current state of quiz
    const saveHandler = async () => {
        const body = { quiz: quiz }
        const res = await requestUpdateQuiz(quiz.uid, body)
        if (OK(res)) mutate(`/api/quizzes/${quiz.uid}`)
    }

    // go back to the quiz list page
    const homeHandler = async () => {
        router.push(`/quizzes`)
    }

    return (
        <div>
            <Button.Group>
                <Button className={'home-btn'} icon='home' onClick={homeHandler} />
                <Button icon='save' onClick={saveHandler} />
            </Button.Group>
            { '　'}
            <Button.Group>
                <Button icon='play' />
                <Button icon='pause' />
            </Button.Group>
        </div>
    )
}