import { useState } from 'react'
import { mutate } from 'swr'

import { Input } from 'semantic-ui-react'

import { requestUpdateTitle, OK } from '../logics/api'

const style = {
    width: '100%'
}

export default function TitleInput({ quiz }) {
    const [title, setTitle] = useState(quiz.title)

    const inputHandler = (event, data) => {
        const newTitle = data.value
        setTitle(newTitle)
        mutate(`/api/quizzes/${quiz.uid}`, async current => {
            const currentTitle = quiz.title
            const newQuiz = { ...current, title: newTitle }
            return newQuiz
        }, false)
    }

    const keyboardHandler = async (event) => {
        if (event.key === 'Enter') {
            const body = { title: title }
            const res = await requestUpdateTitle(quiz.uid, body)
            if (OK(res)) mutate(`/api/quizzes/${quiz.uid}`)
        }
    }

    return (
        <Input
            className={'title-input'}
            style={style}
            icon="question"
            placeholder='Title'
            value={title}
            onKeyUp={keyboardHandler}
            onChange={inputHandler} />
    )
}