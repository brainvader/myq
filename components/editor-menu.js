import { mutate } from 'swr'

import { Button } from 'semantic-ui-react'

import { requestUpdateQuiz } from '../logics/api'

export default function EditorMenu({ quiz }) {

    const saveHandler = async () => {
        const newQuiz = await requestUpdateQuiz(quiz)
        mutate(`/api/quizzes/${quiz.uid}`)
    }

    return (
        <div>
            <Button.Group>
                <Button icon='home' />
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