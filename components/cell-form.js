import { useContext } from 'react'
import { mutate } from 'swr'

import { Segment, Label } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import EditorContext from '../components/editor/context'
import CellFormContext from '../components/cell-form/context'

import CellMenu from './cell-menu'
import CellInput from './cell-input'
import { InsertBeforeButton, InsertAfterButton } from './cell-button'

import { OK, requestCreateCell } from '../logics/api'

const cellsStyle = {
    listStyleType: "none",
    padding: "0"
}

const insertCell = async (uid, edgeName, order) => {
    const body = {
        edgeName: edgeName,
        index: order
    }
    const res = await requestCreateCell(uid, body)
    if (OK(res)) mutate(`/api/quizzes/${uid}`)
}

const Cell = ({ cell }) => {
    const { uid } = useContext(EditorContext)
    const { formType } = useContext(CellFormContext)

    // insert new cell at the poistion of the clicked cell and
    // the following cell's orders are incremented
    const insertBefore = (event) => {
        insertCell(uid, formType, cell.order)
    }

    const insertAfter = (evet) => {
        insertCell(uid, formType, cell.order + 1)
    }

    return (
        <Segment>
            {cell.order === 0 ? <InsertBeforeButton onClick={(e) => insertBefore(e, cell.order)} /> : null}
            <CellInput cell={cell} />
            <CellMenu cell={cell} />
            <InsertAfterButton onClick={(e) => insertAfter(e, cell.order)} />
        </Segment>
    )
}

const Cells = ({ cells }) => cells.map((cell, index) => {
    return (
        <Draggable key={cell.uid} draggableId={cell.uid} index={index}>
            {(provided) => (
                <li ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Cell key={cell.uid} cell={cell} />
                </li>
            )}
        </Draggable >
    )
})

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

            <DragDropContext>
                <Droppable droppableId="cells">
                    {(provided) => (
                        <ul className="cells"
                            style={cellsStyle}
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            <Cells cells={cells} />
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

        </Segment.Group >
    )
}