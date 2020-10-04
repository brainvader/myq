import { Checkbox, Grid, Header, Table } from 'semantic-ui-react'
import { Button, Search, Pagination } from 'semantic-ui-react'

export default function Home() {
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
                <Table.Cell width={2}>Why Quiz?</Table.Cell>
                <Table.Cell width={1}>2020/10/4</Table.Cell>
                <Table.Cell width={4}>
                  JavaScript, Python, Rust, Elm, Learning, Science,
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
                  <Pagination defaultActivePage={1} totalPages={10} />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

        </Grid.Row>

      </Grid>
    </div >
  )
}
