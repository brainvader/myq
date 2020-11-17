import { useContext } from 'react'
import { mutate } from 'swr'

import { Button } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
import CellFormContext from '../components/cell-form/context'

const cellMenu = {
    marginTop: `0.5em`,
    marginBottom: `1em`
}

const updateCell = async (cell) => {
    const body = { cell: cell }
    const res = await fetch(`/api/cells/${cell.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    return res
}

const swapCells = async (cell, newOrder, edgeName) => {
    const body = {
        original: cell,
        newOrder: newOrder,
        edgeName: edgeName
    }
    const res = await axios.put(`/api/cells/orders`, body)
    // const res = await fetch(`/api/cells/orders`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(body)
    // })
    return res
}

export default function CellMenu({ cell }) {
    const { uid } = useContext(EditorContext)
    const { formType, cellsCount } = useContext(CellFormContext)

    const deleteCell = async (event, data) => {
        const body = {
            quizUid: uid,
            edgeName: formType
        }
        const res = await fetch(`/api/cells/${cell.uid}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        if (res.ok) mutate(`/api/quizzes/${uid}`)
    }

    const setType = async (event, data) => {
        const newCell = { ...cell, type: data }
        const response = await updateCell(newCell)
        if (response.ok) mutate(`/api/quizzes/${uid}`)
    }

    const moveUp = async (event, data) => {
        const newOrder = data.order - 1
        const res = await swapCells(data, newOrder, formType)
        if (res.statusText === 'OK') mutate(`/api/quizzes/${uid}`)
    }

    const moveDown = async (event, data) => {
        const newOrder = data.order + 1
        const res = await swapCells(data, newOrder, formType)
        if (res.statusText === 'OK') mutate(`/api/quizzes/${uid}`)
    }

    return (
        <div style={cellMenu}>
            <Button.Group>
                <Button
                    icon='font'
                    active={cell.type === 'text' ? true : false}
                    onClick={(e) => setType(e, 'text')} />
                <Button
                    icon='code'
                    active={cell.type === 'code' ? true : false}
                    onClick={(e) => setType(e, 'code')} />
                <Button
                    icon='dollar sign'
                    active={cell.type === 'math' ? true : false}
                    onClick={(e) => setType(e, 'math')} />
                <Button
                    icon='linkify'
                    active={cell.type === 'ref' ? true : false}
                    onClick={(e) => setType(e, 'ref')} />
            </Button.Group>
            {'    '}
            <Button.Group>
                {cellsCount !== 1
                    ? <Button
                        icon='minus'
                        onClick={e => deleteCell(e, cell)} />
                    : null}
                {!(cellsCount === 1 || cell.order === 0)
                    ? <Button
                        icon='caret up'
                        onClick={e => moveUp(e, cell)} />
                    : null}
                {!(cellsCount === 1 || cell.order === cellsCount - 1)
                    ? <Button
                        icon='caret down'
                        onClick={e => { moveDown(e, cell) }} />
                    : null}
            </Button.Group>
        </div>
    )
}