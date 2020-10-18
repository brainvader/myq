import { useRouter } from 'next/router'

const Quiz = () => {
    const router = useRouter()
    const { uid } = router.query

    return <p>Quiz id: {uid}</p>
}

export default Quiz
