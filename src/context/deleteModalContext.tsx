import { createContext, useReducer, PropsWithChildren } from 'react';

type State = boolean

type ActionType =
    | { type: 'SHOW' }
    | { type: 'HIDE' }

const deleteModalReducer = (state: State, action: ActionType) => {
    switch (action.type) {
        case 'SHOW':
            return true
        case 'HIDE':
            return false
        default: return state
    }
}

type DeleteModalContextType = {
    deleteModal: State,
    deleteModalDispatch: React.Dispatch<ActionType>
}

const DeleteModalContext = createContext<DeleteModalContextType>({
    deleteModal: false,
    deleteModalDispatch: action => action
});

export const DeleteModalContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [deleteModal, deleteModalDispatch] = useReducer(deleteModalReducer, false)

    return (
        <DeleteModalContext.Provider value={{ deleteModal, deleteModalDispatch }}>
            {children}
        </DeleteModalContext.Provider>
    )
}

export default DeleteModalContext