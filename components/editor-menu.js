import { useContext } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

import { Button } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'

import { requestUpdateQuiz } from '../logics/api'

export default function EditorMenu() {
    const router = useRouter()
    const quiz = useContext(EditorContext)

    const saveHandler = async () => {
        const newQuiz = await requestUpdateQuiz(quiz)
        mutate(`/api/quizzes/${quiz.uid}`)
    }

    const homeHandler = async () => {
        router.push('/quizzes')
    }

    return (
        <div>
            <Button.Group>
                <Button icon='home' onClick={homeHandler} />
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