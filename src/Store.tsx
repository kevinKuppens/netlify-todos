import React, { ContextType, createContext, PropsWithChildren, useReducer } from "react";
import { useReducerAsync } from "use-reducer-async";
import { Context, State, Action } from "./types";

const initialStoreContext: Context = {
    state: {
        todos: [],
        tags: []
    },
    dispatch: (_a: any) => { }
}
//Reducer
const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return { ...state, todos: action.payload }
        case 'SET_TAGS':
            return { ...state, tags: action.payload }
        default: return state;
    }
}

const asyncActionHandler: any = {
    FETCHTAGS: ({ dispatch }: { dispatch: ({ }: Action) => {} }) => async (action: Action) => {
        const fetchSetting = {
            method: 'GET',
            headers: baseHeaders
        }
        try {
            const response = await fetch('http://localhost:8000/tags', fetchSetting);
            const tags = await response.json();
            console.table(tags)
            dispatch({ type: 'SET_TAGS', payload: tags });
        } catch (e) {
            console.log(e);
        }
    },
    FETCHTODOS: ({ dispatch }: { dispatch: ({ }: Action) => {} }) => async (action: Action) => {
        console.log('FETCHTODOS');
        const fetchSetting = {
            method: 'GET',
            headers: baseHeaders
        }
        try {
            const response = await fetch('http://localhost:8000/todos?_expand=tags', fetchSetting);
            const todos = await response.json();
            console.table(todos)
            dispatch({ type: 'SET_TODOS', payload: todos });
        } catch (e) {
            console.log(e);
        }
    },
    ADDTODO: ({ dispatch }: { dispatch: ({ }: Action) => {} }) => async (action: Action) => {
        console.log(action.payload.title);
        console.log('ADDTODO');
        const fetchSetting = {
            method: 'POST',
            headers: baseHeaders,
            body: JSON.stringify(action.payload.value)
        }
        try {
            const response = await fetch('http://localhost:8000/todos', fetchSetting);
            console.log(response);
            if (!response.ok) {
                console.log('ERROR')
            } else {
                try {
                    const fetchSetting = {
                        method: 'GET',
                        headers: baseHeaders
                    }
                    const response = await fetch('http://localhost:8000/todos?_expand=tags', fetchSetting);
                    const todos = await response.json();
                    console.table(todos)
                    dispatch({ type: 'SET_TODOS', payload: todos });
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
        }
    },
    DELETETODO: ({ dispatch }: { dispatch: ({ }: Action) => {} }) => async (action: Action) => {
        console.log(action.payload.id);
        console.log('ADDTODO');
        const fetchSetting = {
            method: 'DELETE',
            headers: baseHeaders,
        }
        try {
            const response = await fetch(`http://localhost:8000/todos/${action.payload.id}`, fetchSetting);
            console.log(response);
            if (!response.ok) {
                console.log('ERROR')
            } else {
                try {
                    const fetchSetting = {
                        method: 'GET',
                        headers: baseHeaders
                    }
                    const response = await fetch('http://localhost:8000/todos?_expand=tags', fetchSetting);
                    const todos = await response.json();
                    console.table(todos)
                    dispatch({ type: 'SET_TODOS', payload: todos });
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}
const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
}

//Context
const storeContext = createContext(initialStoreContext);
const { Provider } = storeContext;
const StateProvider = ({ children }: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducerAsync(reducer, initialStoreContext.state, asyncActionHandler);
    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { storeContext, StateProvider };