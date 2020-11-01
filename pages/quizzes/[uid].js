import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Editor from '../../components/editor/editor'
import EditorContext from '../../components/editor/context'

import { useQuiz } from '../../lib/hooks'

const Quiz = () => {
    const router = useRouter()
    const { uid } = router.query
    const noQuery = Object.keys(router.query).length === 0
    const { data, mutate, isLoading, isError } = useQuiz(uid)

    if (noQuery) return <div> failed to routing</div>
    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const value = {
        uid: uid
    }

    return (
        <EditorContext.Provider value={value} >
            <Editor quiz={data} />
        </EditorContext.Provider>
    )
}

export default Quiz
