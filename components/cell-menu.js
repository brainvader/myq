import { useContext } from 'react'
import { mutate } from 'swr'

import { Button } from 'semantic-ui-react'

import EditorContext from '../components/editor/context'
import CellFormContext from '../components/cell-form/context'

import { requestDeleteCell, requestSwapCells, requestUpdateCellType, OK } from '../logics/api'

const cellMenu = {
    marginTop: `0.5em`,
    marginBottom: `1em`
}

export default function CellMenu({ cell }) {
    const { uid } = useContext(EditorContext)
    const { formType, cellsCount } = useContext(CellFormContext)

    const deleteCell = async (event, data) => {
        const body = {
            quizUid: uid,
            edgeName: formType
        }
        const res = await requestDeleteCell(cell.uid, body)
        if (OK(res)) mutate(`/api/quizzes/${uid}`)
    }

    const setType = async (event, data) => {
        const newCell = { ...cell, type: data }
        const body = { cell: newCell }
        const res = await requestUpdateCellType(newCell.uid, body)
        if (OK(res)) mutate(`/api/quizzes/${uid}`)
    }

    const moveUp = async (event, data) => {
        const newOrder = data.order - 1
        const body = {
            original: cell,
            newOrder: newOrder,
            edgeName: formType
        }
        const res = await requestSwapCells(body)
        if (OK(res)) mutate(`/api/quizzes/${uid}`)
    }

    const moveDown = async (event, data) => {
        const newOrder = data.order + 1
        const body = {
            original: cell,
            newOrder: newOrder,
            edgeName: formType
        }
        const res = await requestSwapCells(body)
        if (OK(res)) mutate(`/api/quizzes/${uid}`)
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
                {/* {!(cellsCount === 1 || cell.order === 0)
                    ? <Button
                        icon='caret up'
                        onClick={e => moveUp(e, cell)} />
                    : null}
                {!(cellsCount === 1 || cell.order === cellsCount - 1)
                    ? <Button
                        icon='caret down'
                        onClick={e => { moveDown(e, cell) }} />
                    : null} */}
            </Button.Group>
        </div>
    )
}