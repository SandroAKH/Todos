import React, { useState, useEffect, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Todos {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoContextProps {
    todos: Todos[];
    addTodo: (text: string) => void;
    toggleTodoCompletion: (id: string) => void;
    removeTodo: (id: string) => void;
    markAllCompleted: () => void;
    clearCompletedTodos: () => void;
    activeTasksCount: number;
    completedTasksCount: number;
    filter: string;
    setFilter: (filter: string) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
}

export const TodoContext = createContext<TodoContextProps>({});


const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState<Todos[]>(() => {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const addTodo = (text: string) => {
        if (text.trim() !== '') {
            const newTodo: Todos = {
                id: uuidv4(),
                text: text,
                completed: false,
            };

            setTodos([...todos, newTodo]);
        }
    };

    const toggleTodoCompletion = (id: string) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );

        setTodos(updatedTodos);
    };

    const removeTodo = (id: string) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const markAllCompleted = () => {
        const updatedTodos = todos.map((todo) => ({ ...todo, completed: true }));
        setTodos(updatedTodos);
    };

    const clearCompletedTodos = () => {
        const updatedTodos = todos.filter((todo) => !todo.completed);
        setTodos(updatedTodos);
    };

    const activeTasksCount = todos.filter((todo) => !todo.completed).length;
    const completedTasksCount = todos.filter((todo) => todo.completed).length;

    return (
        <TodoContext.Provider
            value={{
                todos,
                addTodo,
                toggleTodoCompletion,
                removeTodo,
                markAllCompleted,
                activeTasksCount,
                completedTasksCount,
                clearCompletedTodos,
                filter,
                setFilter,
                inputValue,
                setInputValue,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};


export default TodoProvider;