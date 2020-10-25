import { useState } from 'react'
import useSWR, { mutate } from 'swr'

import { Search, Label, List } from 'semantic-ui-react'

const updateTags = (uid, tags) => {
    mutate(`/api/quizzes/${uid}`, async current => {
        console.log('curret', tags)
        const newQuiz = { ...current, tags: [...tags] }
        console.log(`update tags`, newQuiz.tags)
        return newQuiz
    }, false)
}

const tagsFetcher = async (url, searchTerm) => {
    const path = searchTerm ? `${url}?search=${searchTerm}` : url
    const res = await fetch(path)
    return res.json()
}

const useTags = (url, searchTerm) => {
    const { data, _, error } = useSWR([url, searchTerm], tagsFetcher)

    return {
        tags: data || [],
        isLoading: !error && !data,
        isError: error
    }
}

const addTag = async (uid, tag) => {
    console.log(tag)
    const body = { tag: tag }
    const res = await fetch(`/api/quizzes/${uid}/tags`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const newTag = await res.json()
    console.log('new tag', newTag)
    return newTag
}

const detachTag = async (uid, tag) => {
    const body = { tag: tag }
    const res = await fetch(`/api/quizzes/${uid}/tags`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    console.log(res)
    return res
}

export default function TagInput({ quiz }) {

    const [searchTerm, setSearchTerm] = useState("")
    const { tags, isLoading, isError } = useTags(`/api/tags`, searchTerm)

    if (isError) return <div>failed to load</div>

    const inputHandler = (event, data) => {
        const word = data.value
        setSearchTerm(word)
        // const newTags = data.value.split(',').filter(() => true)
        // updateTags(quiz.uid, newTags)
    }

    const selectHandler = (event, data) => {
        setSearchTerm('')
    }

    const detachHandler = async (event, data) => {
        console.log(`remove ${data.content} tag`)
        const tag_name = data.content
        const tagIndex = quiz.tags.findIndex(tag => tag.tag_name === tag_name)
        const tag = quiz.tags[tagIndex]
        const res = await detachTag(quiz.uid, tag)
        mutate(`/api/quizzes/${quiz.uid}`)
    }

    const keyboardHandler = async (event) => {
        if (event.key === 'Enter') {
            const isTag = tags.length === 0 ? false : true
            if (!isTag) {
                const newTag = {
                    uid: "_:newTag",
                    tag_name: searchTerm
                }
                console.log(`Add new tag`, newTag)
                const tagged = await addTag(quiz.uid, newTag)
                setSearchTerm('')
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