import { useState } from 'react'
import { mutate } from 'swr'

import { Search, Label, List } from 'semantic-ui-react'

import { useTags } from '../lib/hooks'

const updateTags = (uid, tags) => {
    mutate(`/api/quizzes/${uid}`, async current => {
        const newQuiz = { ...current, tags: [...tags] }
        return newQuiz
    }, false)
}

const attachTag = async (uid, tag) => {
    const body = { tag: tag }
    const res = await fetch(`/api/quizzes/${uid}/tags`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const newTag = await res.json()
    return newTag
}

const detachTag = async (uid, tag) => {
    const body = { tag: tag }
    const res = await fetch(`/api/quizzes/${uid}/tags`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    return res
}

export default function TagInput({ quiz }) {
    const [searchTerm, setSearchTerm] = useState("")
    // get all tags defined
    const { tags, isLoading, isError } = useTags(searchTerm)

    if (isError) return <div>failed to load</div>

    // set input string to search term
    const inputHandler = (event, data) => {
        const word = data.value
        setSearchTerm(word)
    }

    // select tag from the candidates
    const selectHandler = async (event, data) => {
        const tag_name = data.result.title
        // avoid duplicate tags in the same quiz
        const hasTag = (quiz.tags || []).find(tag => tag.tag_name === tag_name)
        if (!hasTag) {
            const selectedTag = tags.find(tag => tag.tag_name === tag_name)
            const tagged = await attachTag(quiz.uid, selectedTag)
            mutate(`/api/quizzes/${quiz.uid}`)
            setSearchTerm('')
        }
    }

    // detach a tag from the quiz
    const detachHandler = async (event, data) => {
        const tag_name = data.content
        const tagIndex = quiz.tags.findIndex(tag => tag.tag_name === tag_name)
        const tag = quiz.tags[tagIndex]
        const res = await detachTag(quiz.uid, tag)
        mutate(`/api/quizzes/${quiz.uid}`)
    }

    const keyboardHandler = async (event) => {
        // never enter empty string
        if (searchTerm === '') return
        if (event.key === 'Enter') {
            const isTag = tags.length === 0 ? false : true
            // create a new tag node only when there are no once
            if (!isTag) {
                const newTag = {
                    uid: "_:newTag",
                    tag_name: searchTerm
                }
                const tagged = await attachTag(quiz.uid, newTag)
                setSearchTerm('')
                mutate(`/api/quizzes/${quiz.uid}`)
            }
        }
    }

    const tagged = (quiz.tags || []).map((tag, i) => {
        return (
            <List.Item key={`${i}`}>
                <Label
                    content={tag.tag_name}
                    removeIcon='delete'
                    onRemove={detachHandler} />
            </List.Item>
        )
    })

    return (
        <div>
            <List horizontal>
                {tagged}
            </List>

            <div>
                <Search
                    loading={isLoading}
                    results={tags.map(tag => ({ title: tag.tag_name }))}
                    value={searchTerm}
                    onKeyUp={keyboardHandler}
                    onSearchChange={inputHandler}
                    onResultSelect={selectHandler} />
            </div>
        </div>

    )
}