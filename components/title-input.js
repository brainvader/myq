import { useState } from 'react'
import { mutate } from 'swr'

import { Input } from 'semantic-ui-react'

const style = {
    width: '100%'
}

const updateTitle = async (uid, title) => {
    const body = { title: title }
    const res = await fetch(`/api/quizzes/${uid}/title`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    return res
}

export default function TitleInput({ quiz }) {
    const [title, setTitle] = useState(quiz.title)

    const inputHandler = (event, data) => {
        const newTitle = data.value
        setTitle(newTitle)
        // update cache quiz
        mutate(`/api/quizzes/${quiz.uid}`, async current => {
            const newQuiz = { ...quiz, title: newTitle }
            return newQuiz
        }, false)
    }

    const keyboardHandler = async (event) => {
        if (event.key === 'Enter') {
            const res = await updateTitle(quiz.uid, title)
            if (res.ok) mutate(`/api/quizzes/${quiz.uid}`)
        }
    }

    return (
        <Input
            style={style}
            icon="question"
            placeholder='Title'
            value={title}
            onKeyUp={keyboardHandler}
            onChange={inputHandler} />
    )
}