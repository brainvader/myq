import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Editor from '../../components/editor/editor'

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

    return <Editor uid={uid} />
}

export default Quiz
