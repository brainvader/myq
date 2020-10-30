import { mutate } from 'swr'

import { Input } from 'semantic-ui-react'

const style = {
    width: '100%'
}

const updateTitle = (uid, title) => {
    //TODO: PUT /api/quizzes/[uid] with  updated quiz
    mutate(`/api/quizzes/${uid}`, async current => {
        const newQuiz = { ...current, title: title }
        return newQuiz
    }, false)
}

export default function TitleInput({ quiz }) {
    const inputHandler = (event, data) => {
        updateTitle(quiz.uid, data.value)
    }

    return (
        <Input
            style={style}
            icon="question"
            placeholder='Title'
            value={quiz.title}
            onChange={inputHandler} />
    )
}