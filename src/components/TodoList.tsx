import React, { useContext, useEffect } from 'react';
import { storeContext } from '../Store';
import TodoItem from './TodoItems';
import TodoForm from './TodoForm';

const TodoList = () => {
    const { state, dispatch } = useContext(storeContext);

    useEffect(() => {
        dispatch({ type: 'FETCHTODOS' })
    }, [])

    return (
        <div className="flex flex-col">

            <h2 className="mt-6 text-center text-4xl text-Gray-800">Todo List</h2>
            <TodoForm />
            <div className="flex justify-center mt-8">
                <div className="bg-white shadow-xl rounded-lg w-1/2 max-w-2xl">
                    <ul data-testid="list-item" className="divide-y divide-gray-300">
                        {state.todos.map((value, index) => <TodoItem key={index} todo={value} />)}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoList;