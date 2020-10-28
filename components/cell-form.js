import { useContext } from 'react'
import { mutate } from 'swr'

import { Segment, Label } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
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

const Cell = ({ nodeName, cell }) => {
    const { uid } = useContext(EditorContext)

    const insertBefore = (event) => {
        insertCell(uid, nodeName, cell.order)
    }

    const insertAfter = (evet) => {
        insertCell(uid, nodeName, cell.order + 1)
    }

    return (
        <Segment style={cellStyle}>
            {cell.order === 0 ? <InsertBeforeButton onClick={(e) => insertBefore(e, cell.order)} /> : null}
            <CellInput cell={cell} />
            <CellMenu />
            <InsertAfterButton onClick={(e) => insertAfter(e, cell.order)} />
        </Segment>
    )
}

const Cells = ({ nodeName }) => {
    const { quiz } = useContext(EditorContext)
    const cells = quiz[nodeName]
    const sorted = (cells || []).sort((a, b) => a.order - b.order)
    return sorted.map((cell, i) => <Cell key={i} nodeName={nodeName} cell={cell} />)
}

export default function CellForm({ label }) {
    // question or answer
    const nodeName = label.toLowerCase()

    return (
        <Segment.Group>

            <Segment>
                <Label attached='top left'>{label}</Label>
            </Segment>

            <Cells nodeName={nodeName} />

        </Segment.Group>
    )
}