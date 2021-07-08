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
    tags: Tag[]
}

type Action = 
    | SetTodos
    | SetTags
    | FetchTodos
    | AddTodo
    | DeleteTodo
    | FetchTags

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