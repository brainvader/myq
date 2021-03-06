import { useState } from 'react'
import { mutate } from 'swr'

import { Search, Label, List } from 'semantic-ui-react'

import { useTags } from '../lib/hooks'
import { OK, requestAttachTag, requestDetachTag } from '../logics/api'

const attachTag = async (uid, tag) => {
    const body = { tag: tag }
    const res = await requestAttachTag(uid, body)
    return res
}

const detachTag = async (uid, tag) => {
    const body = { tag: tag }
    const res = await requestDetachTag(uid, body)
    return res
}

export default function TagInput({ quiz }) {
    const [searchTerm, setSearchTerm] = useState("")
    // get found tags as a result of search
    const { candidates, isLoading, isError } = useTags(searchTerm)

    if (isError) return <div>failed to load</div>

    // set input string to search term
    const inputHandler = (event, data) => {
        const word = data.value
        setSearchTerm(word)
    }

    // select tag from the candidates
    const selectHandler = async (event, data) => {
        // selected tag name from candidates
        const selectedTagName = data.result.title

        // check if quiz already has tag selected from candidates
        const noTag = (quiz.tags || [])
            .filter(tag => tag.tag_name === selectedTagName)
            .length === 0

        if (noTag) {
            // need to retrieve uid from tag name
            const selectedTag = candidates.find(tag => tag.tag_name === selectedTagName)
            const res = await attachTag(quiz.uid, selectedTag)
            if (OK(res)) mutate(`/api/quizzes/${quiz.uid}`)
            setSearchTerm('')
        }
    }

    // detach a tag from the quiz
    const detachHandler = async (event, data) => {
        const tag_name = data.content
        const tagIndex = quiz.tags.findIndex(tag => tag.tag_name === tag_name)
        const tag = quiz.tags[tagIndex]
        const res = await detachTag(quiz.uid, tag)
        if (OK(res)) mutate(`/api/quizzes/${quiz.uid}`)
    }

    const keyboardHandler = async (event) => {
        // never enter empty string
        if (searchTerm === '') return
        if (event.key === 'Enter') {
            // check if there is inputting tag in database
            const isTag = candidates.length === 0 ? false : true
            // create a new tag node only when there are no one in database
            if (!isTag) {
                const newTag = {
                    uid: "_:newTag",
                    tag_name: searchTerm
                }
                const res = await attachTag(quiz.uid, newTag)
                if (OK(res)) mutate(`/api/quizzes/${quiz.uid}`)
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
                    results={candidates.map(tag => ({ title: tag.tag_name }))}
                    value={searchTerm}
                    onKeyUp={keyboardHandler}
                    onSearchChange={inputHandler}
                    onResultSelect={selectHandler} />
            </div>
        </div>

    )
}