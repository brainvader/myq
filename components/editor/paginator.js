import { useReducer } from 'react'
import { createContext, useContext } from 'react'

const PageContext = createContext();

const CHANGE_PAGE = 'CHANGE_PAGE'
const CHECK = 'CHECK'
const UNCHECK = 'UNCHECK'
const UNCHECK_ALL = 'UNCHECK_ALL'

const initialState = {
    activePage: 1,
    checked: new Set()
}

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                activePage: action.payload
            }
        case CHECK: {
            const uid = action.payload
            state.checked.add(uid)
            return {
                ...state,
            }
        }
        case UNCHECK: {
            const uid = action.payload
            const result = state.checked.delete(uid)
            console.log(`delete ${uid} is ${result}`)
            return {
                ...state
            }
        }
        case UNCHECK_ALL: {
            return {
                ...state,
                checked: new Set()
            }
        }
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}

const PageProvider = (props) => {
    const [pageState, dispatch] = useReducer(reducer, initialState);

    const actions = {
        changePage: (activePage) => {
            dispatch({ type: CHANGE_PAGE, payload: activePage })
        },
        check: (uid) => {
            console.log(`check ${uid}`)
            dispatch({ type: CHECK, payload: uid })
        },
        uncheck: (uid) => {
            dispatch({ type: UNCHECK, payload: uid })
        },
        uncheckAll: () => {
            dispatch({ type: UNCHECK_ALL })
        }
    };

    return (
        <PageContext.Provider
            value={{
                pageState: pageState,
                pageActions: actions,
            }}
        >
            {props.children}
        </PageContext.Provider>
    );
}

const usePage = () => useContext(PageContext)

export { PageProvider, usePage };