import React, { ChangeEvent, FC, MouseEvent, useContext, useEffect, useState } from "react";
import { storeContext } from "../Store";
import { Tag } from "../types";
const TodoForm: FC = () => {
    const { state, dispatch } = useContext(storeContext);
    const [value, setValues] = useState<{ title: string, tagsId: number }>({
        title: '',
        tagsId: 1
    })

    const handleClick = (e: MouseEvent) => {
        dispatch({ type: 'ADDTODO', payload: { value } })
        setValues({ title: '', tagsId: 1 })
    }
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues(value => ({ ...value, title: e.target.value }));
    }
    const handleTagChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValues(value => ({ ...value, tagsId: parseInt(e.target.value) }));

    }
    useEffect(() => {
        dispatch({ type: 'FETCHTAGS', payload: {} })
        return () => { }
    }, [])
    return (
        <div className="flex justify-center items-center mt-8">
            <div className="flex items-end">
                <div>
                    <label htmlFor="todo" className="block text-center text-2xl font-medium text-gray-700">
                        Add a new Todo
                    </label>
                    <div className="mt-1">
                        <input value={value.title} onChange={handleTitleChange} type="text" name="todo" id="todo" placeholder="my best task" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>
                <button onClick={handleClick} type="button" className="ml-3 relative inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        aria-hidden="true">
                        <path fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd" />
                    </svg>
                </button>
                <div className="ml-16">
                    <label htmlFor="location" className="block text-2xl text-center font-medium text-gray-700">Category</label>
                    <select id="tag" name="tag" className="mt-1 block w-full pl-3 pr-32 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={value.tagsId} onChange={handleTagChange}>
                        {state.tags.map((tag: Tag) => (<option key={tag.id} value={tag.id}>{tag.name}</option>))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default TodoForm;