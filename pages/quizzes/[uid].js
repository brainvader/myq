import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Editor from '../../components/editor/editor'
import EditorContext from '../../components/editor/context'

import { useQuiz } from '../../lib/hooks'

const Quiz = () => {
    const router = useRouter()
    const { uid } = router.query

    useEffect(() => {
        if (!uid) {
            router.push('/quizzes')
            // router.back()
        }
    }, [uid])

    if (!uid) return <div>Back to List...</div>

    const { data, mutate, isLoading, isError } = useQuiz(uid)
    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const value = {
        uid: uid,
        quiz: data
    }

    return (
        <EditorContext.Provider value={value} >
            <Editor />
        </EditorContext.Provider>
    )
}

export default Quiz
