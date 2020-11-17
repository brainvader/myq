import { useRouter } from 'next/router'
import { mutate } from 'swr'

import { Checkbox, Table } from 'semantic-ui-react'
import { Button, Pagination } from 'semantic-ui-react'

import { useQuizzes } from '../../lib/hooks'
import { usePage } from '../../components/editor/paginator'

import { requestDeleteQuizzes } from '../../logics/api'

const EditButton = ({ quiz }) => {
    const router = useRouter()

    const editHandler = () => {
        router.push({
            pathname: '/quizzes/[uid]',
            query: { uid: quiz.uid },
        })
    }

    return <Button icon='edit' onClick={editHandler} />
}

const RemoveButton = ({ quiz }) => {
    const { pageState, _ } = usePage()

    // TODO: Get all quizzes

    const removeHandler = async () => {
        const uids = [quiz.uid]
        const body = { uids: uids }
        // delete all checked quizzes
        const res = await requestDeleteQuizzes(body)
        // const res = await axios.delete('/api/quizzes', { data: data })
        if (res.statusText === 'OK') mutate(`/api/quizzes?page=${pageState.activePage}`)
    }
    return <Button icon='trash' onClick={removeHandler} />
}

const ItemControls = ({ quiz }) => {
    return (
        <Button.Group>
            <EditButton quiz={quiz} />
            <RemoveButton quiz={quiz} />
        </Button.Group>
    )
}

const ListItem = ({ quiz }) => {
    const { pageState, pageActions } = usePage()

    const checked = pageState.checked.has(quiz.uid)

    const toggle = () => {
        if (checked) pageActions.uncheck(quiz.uid)
        if (!checked) pageActions.check(quiz.uid)
    }

    // convert tags array into CSV string literal
    const all_tags = (quiz.tags || []).map((tag) => tag.tag_name).join(',')

    return (
        <Table.Row>
            <Table.Cell width={1} textAlign='center'>
                <Checkbox
                    onChange={toggle}
                    checked={pageState.checked.has(quiz.uid)} />
            </Table.Cell>
            <Table.Cell width={2}>{quiz.title}</Table.Cell>
            <Table.Cell width={1}>{quiz.date}</Table.Cell>
            <Table.Cell width={4}>
                {all_tags}
            </Table.Cell>
            <Table.Cell width={2} textAlign='center'>
                <ItemControls quiz={quiz} />
            </Table.Cell>
        </Table.Row>
    )
}

const Page = ({ quizzes }) => {
    return quizzes.map((quiz, index) => {
        return (<ListItem
            key={index.toString()}
            quiz={quiz} />
        )
    })
}

const List = () => {

    const { pageState, pageActions } = usePage()

    const { data, mutate, isLoading, isError } = useQuizzes(pageState.activePage)

    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const handlePageChange = (event, { activePage }) => {
        pageActions.changePage(activePage)
    }

    return (
        <Table celled verticalAlign='middle'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Tags</Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Page quizzes={data.quizzes} />
            </Table.Body>

            <Table.Footer>
                <Table.Row textAlign='right'>
                    <Table.HeaderCell colSpan='5'>
                        <Pagination
                            activePage={pageState.activePage}
                            totalPages={data.totalPages}
                            onPageChange={handlePageChange} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default List