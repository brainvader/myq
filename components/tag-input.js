import { useState } from 'react'
import useSWR from 'swr'

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
    console.log(`searchTerm ${searchTerm}`)
    const { data, mutate, error } = useSWR([url, searchTerm], tagsFetcher)

    return {
        tags: data || [],
        mutate: mutate,
        isLoading: !error && !data,
        isError: error
    }
}

export default function TagInput({ quiz }) {

    const [searchTerm, setSearchTerm] = useState("")
    const { tags, mutate, isLoading, isError } = useTags(`/api/tags`, searchTerm)

    if (isError) return <div>failed to load</div>

    console.log(tags)

    const inputHandler = (event, data) => {
        const word = data.value
        setSearchTerm(word)
        // const newTags = data.value.split(',').filter(() => true)
        // updateTags(quiz.uid, newTags)
    }

    const selectHandler = (event, data) => {
        setSearchTerm(data.result.title)
    }

    const removeHandler = (event, data) => {
        console.log(`remove ${data.content} tag`)
        // TODO: DELETE /api/quizzes/{uid}/tags with tag uid
    }

    const keyboardHandler = (event) => {
        if (event.key === 'Enter') {
            const isTag = tags.length === 0 ? false : true
            const msg = isTag ? `Tag ${searchTerm} exist` : `${searchTerm} is new`
            console.log(msg)
        }
    }

    const tagged = (quiz.tags || []).map(tag => {
        return (
            <List.Item>
                <Label
                    content={tag.tag_name}
                    removeIcon='delete'
                    onRemove={removeHandler} />
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