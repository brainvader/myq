import { mutate } from 'swr'

import { Checkbox, Table } from 'semantic-ui-react'
import { Button, Pagination } from 'semantic-ui-react'

const EditButton = () => <Button icon='edit' />
const RemoveButton = ({ handler }) => {
    return <Button icon='trash alternate outline' onClick={handler} />
}

const ItemControls = ({ quiz }) => {
    const removeHandler = async () => {
        const body = { quiz: quiz }
        const res = await fetch('/api/quizzes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        mutate('/api/quizzes')
    }
    return (
        <Button.Group>
            <EditButton />
            <RemoveButton handler={removeHandler} />
        </Button.Group>
    )
}

const ListItem = ({ quiz }) => {
    return (
        <Table.Row>
            <Table.Cell width={1} textAlign='center'>
                <Checkbox />
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

const List = ({ quizzes }) => {

    const listitems = quizzes.map((quiz, index) => {
        console.log(`index ${index}`)
        return <ListItem key={index.toString()} quiz={quiz} />
    })

    const totalPages = () => Math.floor(quizzes.length / 10) + 1

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
                {listitems}
            </Table.Body>

            <Table.Footer>
                <Table.Row textAlign='right'>
                    <Table.HeaderCell colSpan='5'>
                        <Pagination defaultActivePage={1} totalPages={totalPages()} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default List