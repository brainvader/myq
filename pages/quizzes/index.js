import { Checkbox, Grid, Header, Table } from 'semantic-ui-react'
import { Button, Search, Pagination } from 'semantic-ui-react'

import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
    const { data, error } = useSwr(`/api/quizzes`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    console.log(data[0])
    const totalPages = data.length / 10

    const quiz1 = data[0]
    console.log(quiz1.date.split('T')[0])

    return (
        <div>
            <Header as='h1' content='Quiz List' textAlign='center' />

            <Grid container >

                <Grid.Row columns={2}>

                    <Grid.Column textAlign='left'>
                        <Button.Group>
                            <Button icon='plus' />
                            <Button icon='delete' />
                            <Button icon='sync' />
                        </Button.Group>
                    </Grid.Column>

                    <Grid.Column textAlign='right'>
                        <Search />
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row columns={10}>

                    <Table celled cllapsing verticalAlign='middle'>
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
                            <Table.Row>
                                <Table.Cell width={1} textAlign='center'>
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell width={2}>{quiz1.title}</Table.Cell>
                                <Table.Cell width={1}>{quiz1.date.split('T')[0]}</Table.Cell>
                                <Table.Cell width={4}>
                                    {quiz1.tags.toString()}
                                </Table.Cell>
                                <Table.Cell width={2} textAlign='center'>
                                    <Button.Group>
                                        <Button icon='edit' />
                                        <Button icon='trash alternate outline' />
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row textAlign='right'>
                                <Table.HeaderCell colSpan='5'>
                                    <Pagination defaultActivePage={1} totalPages={Math.floor(totalPages) + 1} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>

                </Grid.Row>

            </Grid>
        </div >
    )
}
