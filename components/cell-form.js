import { useContext } from 'react'
import { mutate } from 'swr'

import { Segment, Label } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
import CellFormContext from '../components/cell-form/context'

import CellMenu from './cell-menu'
import CellInput from './cell-input'
import { InsertBeforeButton, InsertAfterButton } from './cell-button'

const cellStyle = {
    position: 'relative',
    paddingTop: '2em'
}

const insertCell = async (uid, nodeName, order) => {
    const body = {
        nodeName: nodeName,
        index: order
    }
    const res = await fetch(`/api/quizzes/${uid}/q-and-a`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    mutate(`/api/quizzes/${uid}`)
}

const Cell = ({ cell }) => {
    const { uid } = useContext(EditorContext)
    const { formType } = useContext(CellFormContext)

    const insertBefore = (event) => {
        insertCell(uid, formType, cell.order)
    }

    const insertAfter = (evet) => {
        insertCell(uid, formType, cell.order + 1)
    }

    return (
        <Segment style={cellStyle}>
            {cell.order === 0 ? <InsertBeforeButton onClick={(e) => insertBefore(e, cell.order)} /> : null}
            <CellInput cell={cell} />
            <CellMenu cell={cell} />
            <InsertAfterButton onClick={(e) => insertAfter(e, cell.order)} />
        </Segment>
    )
}

const Cells = ({ cells }) => cells.map((cell, i) => <Cell key={i} cell={cell} />)

export default function CellForm({ cells }) {
    const { formType } = useContext(CellFormContext)
    const label = formType
        .split('')
        .map((char, i) => i === 0 ? char.toUpperCase() : char)
        .join('')

    return (
        <Segment.Group>

            <Segment>
                <Label attached='top left'>{label}</Label>
            </Segment>

            <Cells cells={cells} />

        </Segment.Group >
    )
}