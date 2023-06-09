import React, { useState, useEffect, createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoContextProps {
    todos: Todo[];
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

const TodoContext = createContext<any>({});


const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) => {
        if (text.trim() !== '') {
            const newTodo: Todo = {
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

const useTodoContext = (): TodoContextProps => {
    return useContext(TodoContext);
};

export { TodoProvider, useTodoContext };
export default TodoContext;