import { useState } from 'react'
import { mutate } from 'swr'

import { Input } from 'semantic-ui-react'

const style = {
    width: '100%'
}

const label = {
    tag: true,
    content: 'Add Tag'
}

const updateTags = (uid, tags) => {
    mutate(`/api/quizzes/${uid}`, async current => {
        console.log('curret', tags)
        const newQuiz = { ...current, tags: [...tags] }
        console.log(`update tags`, newQuiz.tags)
        return newQuiz
    }, false)
}

export default function TagInput({ quiz }) {

    const inputHandler = (event, data) => {
        const newTags = data.value.split(',').filter(() => true)
        // updateTags(quiz.uid, newTags)
    }

    return (
        <Input
            style={style}
            icon='tags'
            iconPosition='left'
            label={label}
            labelPosition='right'
            placeholder='Enter tags'
            value={[].join(',')}
            onChange={inputHandler}
        />
    )
}