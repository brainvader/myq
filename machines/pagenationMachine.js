import { Machine, assign } from "xstate"


// onPageChange
// -> pageChange (command)
// -> PAGE_CHANGE (event)
// -> SET_PAGE (action type)
// -> setActivePage (action)

// state name
const DISPLAYING = 'displaying'

// event descriptor
const CHANGE_PAGE = 'CHANGE_PAGE'

// event creator
const changePage = (newPage) => ({ type: CHANGE_PAGE, activePage: newPage })

// action Type
const SET_PAGE = 'SET_PAGE'

// action
const setActivePage = (context, event) => event.activePage

const transitionTo = (state) => state

const config = {
    id: 'pagination',
    initial: DISPLAYING,
    context: {
        activePage: 1,
        totalPages: undefined
    },
    states: {
        [DISPLAYING]: {
            on: {
                [CHANGE_PAGE]: {
                    actions: SET_PAGE,
                    target: transitionTo(DISPLAYING) // => self-transition
                }
            }
        }
    },
}

const options = {
    actions: {
        SET_PAGE: assign({ activePage: setActivePage })
    }
}

const PaginationMachine = Machine(config, options)

export { PaginationMachine, changePage }