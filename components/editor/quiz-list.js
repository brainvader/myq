import { useState } from 'react'
import { mutate } from 'swr'

import { Checkbox, Table } from 'semantic-ui-react'
import { Button, Pagination } from 'semantic-ui-react'

import { useQuizzes } from '../../lib/hooks'
import { usePage } from '../../components/editor/paginator'

const EditButton = () => <Button icon='edit' />
const RemoveButton = ({ handler }) => {
    return <Button icon='trash alternate outline' onClick={handler} />
}

const ItemControls = ({ quiz }) => {
    const { pageState, pageActions } = usePage()

    const removeHandler = async () => {
        const quizzes = [quiz]
        const body = { quizzes: quizzes }
        const res = await fetch('/api/quizzes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        mutate(`/api/quizzes?page=${pageState.activePage}`)
    }
    return (
        <Button.Group>
            <EditButton />
            <RemoveButton handler={removeHandler} />
        </Button.Group>
    )
}

const ListItem = ({ quiz }) => {
    const [checked, setState] = useState(false)

    const { pageState, pageActions } = usePage()

    const toggle = () => {
        setState(!checked)
        if (checked) pageActions.uncheck(quiz.uid)
        if (!checked) pageActions.check(quiz.uid)
    }

    return (
        <Table.Row>
            <Table.Cell width={1} textAlign='center'>
                <Checkbox
                    onChange={toggle}
                    checked={checked} />
            </Table.Cell>
            <Table.Cell width={2}>{quiz.title}</Table.Cell>
            <Table.Cell width={1}>{quiz.date}</Table.Cell>
            <Table.Cell width={4}>
                {quiz.tags.join(',')}
            </Table.Cell>
            <Table.Cell width={2} textAlign='center'>
                <ItemControls quiz={quiz} />
            </Table.Cell>
        </Table.Row>
    )
}

const Page = ({ quizzes }) => {
    return quizzes.map((quiz, index) => {
        return <ListItem key={index.toString()} quiz={quiz} />
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