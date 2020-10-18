import { useRouter } from 'next/router'

import Editor from '../../components/editor/editor'
import { useQuiz } from '../../lib/hooks'

const Quiz = () => {
    const router = useRouter()
    const { uid } = router.query

    const { data, mutate, isLoading, isError } = useQuiz(uid)

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const [quiz] = data.quiz

    return <Editor quiz={quiz} />
}

export default Quiz
