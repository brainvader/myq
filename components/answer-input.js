import { Segment, Label } from 'semantic-ui-react'
import { Form, TextArea } from 'semantic-ui-react'

import CellMenu from './cell-menu'
import CellInput from './cell-input'
import { AddBeforeButton, AddAfterButton } from './cell-button'

export default function AnswerInput({ cellStyle }) {
    return (
        <Segment.Group>

            <Segment>
                <Label attached='top left'>Answer</Label>
            </Segment>

            <Segment style={cellStyle}>
                <AddBeforeButton />
                <CellInput />
                <CellMenu />
                <AddAfterButton />
            </Segment>

        </Segment.Group>
    )
}