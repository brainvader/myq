import { useReducer } from 'react'
import { createContext, useContext } from 'react'

const PageContext = createContext();

const CHANGE_PAGE = 'CHANGE_PAGE'
const CHECK = 'CHECK'
const UNCHECK = 'UNCHECK'

const initialState = {
    activePage: 1,
    checked: []
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
            return {
                ...state,
                checked: [...state.checked, uid]
            }
        }
        case UNCHECK: {
            const uid = action.payload
            const index = state.checked.indexOf(uid);
            state.checked.splice(index, 1);
            return {
                ...state,
                checked: state.checked
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
            console.log(`uncheck ${uid}`)

            dispatch({ type: UNCHECK, payload: uid })
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