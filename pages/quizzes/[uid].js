import { useRouter } from 'next/router'

import Editor from '../../components/editor/editor'

const Quiz = () => {
    const router = useRouter()
    const { uid } = router.query

    return <Editor uid={uid} />
}

export default Quiz
