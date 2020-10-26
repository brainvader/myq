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

const Cell = () => {
    return (
        <Segment style={cellStyle}>
            <AddBeforeButton />
            <CellInput />
            <CellMenu />
            <AddAfterButton />
        </Segment>
    )
}

const Cells = ({ cells }) => {
    return (cells || []).map((cell, i) => <Cell key={i} cell={cell} />)
}

export default function CellForm({ name }) {
    const { quiz } = useContext(EditorContext)

    const key = name.toLowerCase()
    const { [key]: cells } = quiz

    return (
        <Segment.Group>

            <Segment>
                <Label attached='top left'>{name}</Label>
            </Segment>

            <Cells cells={cells} />

        </Segment.Group>
    )
}