import React, { ContextType, createContext, PropsWithChildren, useReducer } from "react";
import { useReducerAsync } from "use-reducer-async";
import { Context, State, Action } from "./types";
import { navigate } from "@reach/router";

const initialStoreContext: Context = {
    state: {
        todos: [],
        tags: [],
        jwt: '',
        error: null
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
        case 'SET_JWT':
            console.log('SET JWT');
            navigate('/todos')
            return { ...state, jwt: action.payload }
        case 'SET_ERROR':
            console.log('SETçERROR')
            return { ...state, error: action.payload }
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
            const response = await fetch(`${import.meta.env.VITE_API_URI}/tags`, fetchSetting);
            const tags = await response.json();
            console.table(tags)
            dispatch({ type: 'SET_TAGS', payload: tags });
        } catch (e) {
            console.log(e);
        }
    },
    FETCHTODOS: ({ dispatch }: { dispatch: ({ }: Action) => {} }) => async (action: Action) => {
        const fetchSetting = {
            method: 'GET',
            headers: baseHeaders
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URI}/todos?_expand=tags`, fetchSetting);
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
            const response = await fetch(`${import.meta.env.VITE_API_URI}/todos`, fetchSetting);
            console.log(response);
            if (!response.ok) {
                console.log('ERROR')
            } else {
                try {
                    const fetchSetting = {
                        method: 'GET',
                        headers: baseHeaders
                    }
                    const response = await fetch(`${import.meta.env.VITE_API_URI}/todos?_expand=tags`, fetchSetting);
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
            const response = await fetch(`${import.meta.env.VITE_API_URI}/todos/${action.payload.id}`, fetchSetting);
            console.log(response);
            if (!response.ok) {
                console.log('ERROR')
            } else {
                try {
                    const fetchSetting = {
                        method: 'GET',
                        headers: baseHeaders
                    }
                    const response = await fetch(`${import.meta.env.VITE_API_URI}/todos?_expand=tags`, fetchSetting);
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
    REGISTER: ({ dispatch }: { dispatch: ({ }: Action) => {} }) => async (action: Action) => {
        const fetchSetting = {
            method: 'POST',
            headers: baseHeaders,
            body: JSON.stringify(action.payload)
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URI}/signup`, fetchSetting);
            console.log(response);
            if (!response.ok) {
                console.log('ERROR')
            } else {
                navigate('/')
            }
        } catch (e) {
            console.log(e);
        }
    },
    LOGIN: ({ dispatch }: { dispatch: ({ }: Action) => {} }) => async (action: Action) => {
        const fetchSetting = {
            method: 'POST',
            headers: baseHeaders,
            body: JSON.stringify(action.payload)
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URI}/signin`, fetchSetting);
            console.log(response);
            if (!response.ok) {
                const errorMsg = await response.text();
                dispatch({ type: 'SET_ERROR', payload: errorMsg })
            } else {
                dispatch({ type: 'SET_JWT', payload: (await response.json()).accessToken })
            }
        } catch (e) {
            console.log(e);
        }
    },
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