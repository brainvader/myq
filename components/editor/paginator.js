import { useReducer } from 'react'
import { createContext, useContext } from 'react'

const PageContext = createContext();

const CHANGE_PAGE = 'CHANGE_PAGE'

const initialState = {
    activePage: 1,
}

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                activePage: action.payload
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