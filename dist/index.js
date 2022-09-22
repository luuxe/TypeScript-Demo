"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById('todo-input');
const form = document.querySelector('form');
const list = document.getElementById('todo-list');
const todos = readTodos();
todos.forEach(createTodo);
function readTodos() {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false
    };
    todos.push(newTodo);
    createTodo(newTodo);
    saveTodos();
    input.value = '';
};
function createTodo(todo) {
    const newLI = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = todo.completed;
    checkBox.addEventListener('change', () => {
        todo.completed = checkBox.checked;
        saveTodos();
    });
    newLI.append(todo.text, checkBox);
    list.append(newLI);
}
form.addEventListener('submit', handleSubmit);
