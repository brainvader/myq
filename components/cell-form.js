import { useContext } from 'react'
import { Segment, Label } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
import CellMenu from './cell-menu'
import CellInput from './cell-input'
import { AddBeforeButton, AddAfterButton } from './cell-button'

const cellStyle = {
    position: 'relative',
    paddingTop: '2em'
}

export default function CellForm({ name, quiz }) {
    return (
        <Segment.Group>

            <Segment>
                <Label attached='top left'>{name}</Label>
            </Segment>

            <Segment style={cellStyle}>
                <AddBeforeButton />
                <CellInput />
                <CellMenu />
                <AddAfterButton />
            </Segment>
export default function CellForm({ name }) {
    const { quiz } = useContext(EditorContext)

        </Segment.Group>
    )
}