import { useContext, useState } from 'react'
import { mutate } from 'swr'

import { Segment, Label } from 'semantic-ui-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import EditorContext from '../components/editor/context'
import CellFormContext from '../components/cell-form/context'

import CellMenu from './cell-menu'
import CellInput from './cell-input'
import { InsertBeforeButton, InsertAfterButton } from './cell-button'

import { OK, requestCreateCell, requestUpdateCells } from '../logics/api'

const cellStyle = {
    margin: 'px 0',
}

const cellsStyle = {
    listStyleType: "none",
    padding: "1em 1em",
    overflow: 'auto'
}

const insertCell = async (uid, edgeName, order) => {
    const body = {
        edgeName: edgeName,
        index: order
    }
    const res = await requestCreateCell(uid, body)
    if (OK(res)) mutate(`/api/quizzes/${uid}`)
}

const updateCells = async (uid, cells) => {
    const body = {
        cells: cells
    }
    const res = await requestUpdateCells(uid, body)
    if (OK(res)) mutate(`/api/quizzes/${uid}`)
}

const Cell = ({ cell, index }) => {
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
        <Draggable
            key={cell.uid}
            draggableId={cell.uid}
            index={index}>
            {(provided) => (
                <li style={cellsStyle}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {cell.order === 0 ? <InsertBeforeButton onClick={(e) => insertBefore(e, cell.order)} /> : null}
                    <CellInput cell={cell} />
                    <CellMenu cell={cell}
                        style={{ display: 'none' }} />
                    <InsertAfterButton onClick={(e) => insertAfter(e, cell.order)} />
                </li>
            )}
        </Draggable >
    )
}

const Cells = ({ cells }) => cells.map((cell, index) => {
    return <Cell key={cell.uid} cell={cell} index={index} />
})

export default function CellForm({ cells }) {
    // const [cellItems, setCells] = useState(cells)
    const { formType } = useContext(CellFormContext)
    const { uid } = useContext(EditorContext)
    const label = formType
        .split('')
        .map((char, i) => i === 0 ? char.toUpperCase() : char)
        .join('')

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        // const items = Array.from(cellItems);
        // const [reorderedItem] = items.splice(result.source.index, 1);
        // items.splice(result.destination.index, 0, reorderedItem);
        // setCells(items)

        // update database
        if (result.source.index !== result.destination.index) {
            const source = cells[result.source.index]
            const destination = cells[result.destination.index]
            source.order = result.destination.index
            destination.order = result.source.index
            updateCells(uid, [source, destination])
        }
    }

    // see https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
    return (
        <Segment.Group>

            <Segment>
                <Label attached='top left'>{label}</Label>
            </Segment>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="cells">
                    {(provided) => (
                        <ul className="cells"
                            style={cellsStyle}
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            <Cells cells={cells} />
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

        </Segment.Group >
    )
}