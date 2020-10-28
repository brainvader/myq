import { useContext } from 'react'
import { mutate } from 'swr'

import { Segment, Label } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
import CellMenu from './cell-menu'
import CellInput from './cell-input'
import { AddBeforeButton, AddAfterButton } from './cell-button'

const cellStyle = {
    position: 'relative',
    paddingTop: '2em'
}

const insertCell = async (uid, nodeType, order) => {
    const body = {
        nodeType: nodeType,
        index: order
    }
    const res = await fetch(`/api/quizzes/${uid}/q-and-a`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    mutate(`/api/quizzes/${uid}`)
}

const Cell = ({ nodeType, cell }) => {
    const { uid } = useContext(EditorContext)

    const insertBefore = (event, data) => {
        insertCell(uid, nodeType, cell.order)
    }

    const insertAfter = (evet, data) => {
        insertCell(uid, nodeType, cell.order + 1)
    }

    return (
        <Segment style={cellStyle}>
            {cell.order === 0 ? <AddBeforeButton onClick={(e) => insertBefore(e, cell.order)} /> : null}
            <CellInput cell={cell} />
            <CellMenu />
            <AddAfterButton onClick={(e) => insertAfter(e, cell.order)} />
        </Segment>
    )
}

const Cells = ({ nodeType }) => {
    const { quiz } = useContext(EditorContext)
    const cells = quiz[nodeType]
    const sorted = (cells || []).sort((a, b) => a.order - b.order)
    return sorted.map((cell, i) => <Cell key={i} nodeType={nodeType} cell={cell} />)
}

export default function CellForm({ formType }) {
    // question or answer
    const nodeType = formType.toLowerCase()

    return (
        <Segment.Group>

            <Segment>
                <Label attached='top left'>{formType}</Label>
            </Segment>

            <Cells nodeType={nodeType} />

        </Segment.Group>
    )
}