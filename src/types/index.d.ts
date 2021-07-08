import { Dispatch } from "react"

interface Todo {
    id:any,
    title:string,
    tags:{name:string}
}
interface Tag {
    id:any,
    name:string
}
type Context = {state:State, dispatch: Dispatch<Action>}
interface State {
    todos : Todo[],
    tags: Tag[],
    jwt:string,
    error:string | null
}

type Action = 
    | SetError
    | SetTodos
    | SetTags
    | SetJwt
    | FetchTodos
    | AddTodo
    | DeleteTodo
    | FetchTags
    | Register
    | Login
interface SetJwt{
    type:'SET_JWT',
    payload : string
}
interface SetError{
    type:'SET_ERROR',
    payload : string
}
interface SetTodos{
    type: 'SET_TODOS',
    payload : Todo[]
}
interface SetTags{
    type: 'SET_TAGS',
    payload : Tag[]
}

interface FetchTodos{
    type: 'FETCHTODOS',
    payload:any
}

interface AddTodo{
    type:'ADDTODO',
    payload:{}
}

interface DeleteTodo{
    type:'DELETETODO',
    payload:any
}

interface FetchTags{
    type: 'FETCHTAGS',
    payload:any
}

interface Register{
    type: 'REGISTER',
    payload:any
}

interface Login{
    type: 'LOGIN',
    payload:any
}
