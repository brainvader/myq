import { Segment, Label } from 'semantic-ui-react'

import CellMenu from './cell-menu'
import CellInput from './cell-input'
import { AddBeforeButton, AddAfterButton } from './cell-button'

const cell = {
    position: 'relative',
    paddingTop: '2em'
}

export default function QuestionInput({ cellStyle }) {
    return (

        <Segment.Group>

            <Segment>
                <Label attached='top left'>Question</Label>
            </Segment>

            <Segment style={cellStyle} className='cell'>
                <AddBeforeButton />
                <CellInput />
                <CellMenu />
                <AddAfterButton />
            </Segment>


        </Segment.Group>
    )
}