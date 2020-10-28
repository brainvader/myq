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

const Cell = ({ formType, cell }) => {
    const { uid } = useContext(EditorContext)

    const insert = async (type, order) => {
        const body = {
            type: type,
            index: order
        }
        const res = await fetch(`/api/quizzes/${uid}/q-and-a`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        mutate(`/api/quizzes/${uid}`)
    }

    const addBefore = async (event, data) => {
        insert(formType, cell.order)
    }

    const addAfter = (evet, data) => {
        insert(formType, cell.order + 1)
    }

    return (
        <Segment style={cellStyle}>
            {cell.order === 0 ? <AddBeforeButton onClick={(e) => addBefore(e, cell.order)} /> : null}
            <CellInput cell={cell} />
            <CellMenu />
            <AddAfterButton onClick={(e) => addAfter(e, cell.order)} />
        </Segment>
    )
}

const Cells = ({ formType, cells }) => {
    const sorted = (cells || []).sort((a, b) => a.order - b.order)
    return sorted.map((cell, i) => <Cell key={i} formType={formType} cell={cell} />)
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