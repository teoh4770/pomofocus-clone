import { useState } from 'react';
import { useTodos } from '../../hooks';

import { TodoForm, TodoList } from '.';
import { Button } from '../ui';

interface TodosProps {
    timerCallback: () => void;
}

const Todos = ({ timerCallback }: TodosProps) => {
    const { todos, selectedTodoId, todoActions } = useTodos();
    const [openAddTaskForm, setOpenAddTaskForm] = useState(false);
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);
    const selectedTodo = todoActions.find(selectedTodoId);

    /*
     TODO: refactor these functions as toggle functions
    */
    function showAddTaskForm() {
        setOpenAddTaskForm(true);
    }

    function hideAddTaskForm() {
        setOpenAddTaskForm(false);
    }

    function showCompletedTodos() {
        setShowCompletedTasks(true);
    }

    function hideCompletedTodos() {
        setShowCompletedTasks(false);
    }

    return (
        <section id="tasks" className="tasks-section mx-auto max-w-[30rem]">
            <div className="mt-4">
                <div className="current-todo-message visible py-4 text-center">
                    {selectedTodo ? (
                        <>
                            <p className="text-slate-300">
                                Currently focusing on:
                                <br />
                                <b className="text-lg text-white">
                                    {selectedTodo.title}
                                </b>
                            </p>
                        </>
                    ) : (
                        <p className="text-lg text-slate-300">
                            {todos.length > 0
                                ? "You didn't select any tasks 🥱"
                                : "You don't have any todos 🥱"}
                        </p>
                    )}
                </div>
            </div>

            {/* header of todo list */}
            <header className="flex justify-between border-b-2 py-4">
                <h2 className="text-lg font-bold text-white">Tasks</h2>
            </header>

            <TodoList
                todos={
                    showCompletedTasks
                        ? todos.filter((todo) => todo.completed)
                        : todos
                }
                todoActions={todoActions}
                timerCallback={timerCallback}
            />

            {/* Add task button */}
            {openAddTaskForm ? (
                <TodoForm
                    mode="addTodo"
                    onSave={todoActions.add}
                    onCancel={hideAddTaskForm}
                    onClose={hideAddTaskForm}
                />
            ) : (
                <Button
                    intent="secondary"
                    size="medium"
                    type="button"
                    className="w-full border-2 border-dashed bg-black/10 py-4 font-bold text-white/80 hover:text-white"
                    aria-label="Add task button"
                    onClick={showAddTaskForm}
                >
                    <span className="mx-auto">⭐ Add Task</span>
                </Button>
            )}

            {/* action buttons for todo list */}
            {todos.length > 0 && (
                <div className="mt-4 flex justify-between">
                    <Button
                        intent="secondary"
                        size="small"
                        type="button"
                        aria-label="Clear all tasks button"
                        onClick={() => todoActions.clearAll()}
                    >
                        Clear All Tasks
                    </Button>

                    <Button
                        intent="secondary"
                        size="small"
                        type="button"
                        aria-label="Clear all completed tasks button"
                        onClick={() => todoActions.clearCompleted()}
                    >
                        Clear Finished Tasks
                    </Button>

                    <Button
                        intent="secondary"
                        size="small"
                        type="button"
                        aria-label="Show/Hide all completed tasks button"
                        onClick={
                            showCompletedTasks
                                ? hideCompletedTodos
                                : showCompletedTodos
                        }
                    >
                        {showCompletedTasks ? 'Hide' : 'Show'} Finished Tasks
                    </Button>
                </div>
            )}
        </section>
    );
};

export { Todos };
