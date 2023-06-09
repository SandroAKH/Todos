import React, { useContext } from 'react';
import { TodoContextType, Todos } from '../@types/todo';
import { TodoContext } from './context.tsx';
const Todo = () => {
    const { todos,
        addTodo,
        removeTodo,
        toggleTodoCompletion,
        markAllCompleted,
        completedTasksCount,
        clearCompletedTodos,
        activeTasksCount,
        filter,
        setFilter,
        inputValue,
        setInputValue, } = useContext(TodoContext) as TodoContextType;


    const filteredTodos = filterTodos(todos, filter);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const handleAddTodo = (e) => {
        if (inputValue.trim() !== '') {
            addTodo(inputValue);
            setInputValue('');
        }
    };
    const handleToggleTodo = (id) => {
        toggleTodoCompletion(id);
    };
    return (
        <div className='todo'>
            <h1>todos</h1>
            <div className='todo-container'>


                <input
                    type="text"
                    value={inputValue}
                    placeholder='Whats need to be done?'
                    onChange={handleInputChange}
                    onKeyUp={(event) => {
                        if (event.key === "Enter") {
                            handleAddTodo(event);
                        }
                    }}
                />

                {todos.length > 0 ? (
                    <ul>
                        {filteredTodos.map((todo: Todos, index) => (
                            <li key={todo.id}>
                                <div >

                                    <span className={todo.completed ? 'completed-mark check' : 'completed-mark '}></span>
                                    <span

                                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                                        onClick={() => handleToggleTodo(todo.id)}
                                    >
                                        {todo.text}
                                    </span>
                                </div>
                                <button className='remove-btn' onClick={() => removeTodo(todo.id)}>x</button>
                            </li>
                        ))}
                    </ul>
                ) : (

                    <p className='empty'>No active todos . . .</p>
                )}
                <div className='completed-actions'>
                    <button onClick={markAllCompleted}>Mark All Completed</button>
                    <button onClick={clearCompletedTodos}>Clear Completed</button>

                </div>
                <div className='footer-container'>

                    <p>{activeTasksCount} Item left</p>
                    <div className='filter-actions'>
                        <button onClick={() => setFilter('all')}>All</button>
                        <button onClick={() => setFilter('active')}>Active</button>
                        <button onClick={() => setFilter('completed')}>Completed</button>
                    </div>

                    <p>Completed Tasks: {completedTasksCount}</p>
                </div>


            </div>
        </div >
    );
};
const filterTodos = (todos, filter) => {
    switch (filter) {
        case 'active':
            return todos.filter((todo) => !todo.completed);
        case 'completed':
            return todos.filter((todo) => todo.completed);
        default:
            return todos;
    }
};
export default Todo;