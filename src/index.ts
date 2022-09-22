interface Todo {
    text: string,
    completed: boolean
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById('todo-input')! as HTMLInputElement
const form = document.querySelector('form')!
const list = document.getElementById('todo-list')!

const todos: Todo[] = readTodos()
todos.forEach(createTodo)


function readTodos(): Todo[] {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON === null) return []
    return JSON.parse(todosJSON)
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
}

const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const newTodo: Todo = {
        text: input.value,
        completed: false
    }
    todos.push(newTodo);
    createTodo(newTodo)

    saveTodos()
    input.value = ''
}

function createTodo(todo: Todo) {
    const newLI = document.createElement('li')
    const checkBox = document.createElement('input')
    checkBox.type = 'checkbox'
    checkBox.checked = todo.completed

    checkBox.addEventListener('change', () => {
        todo.completed = checkBox.checked;
        saveTodos()
    })

    newLI.append(todo.text, checkBox);
    list.append(newLI)
}


form.addEventListener('submit', handleSubmit)
