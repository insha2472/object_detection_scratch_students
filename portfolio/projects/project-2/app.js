const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter');
const clearBtn = document.getElementById('clear-completed');
const itemCount = document.getElementById('item-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    todos.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    todoInput.value = '';
    saveTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
}

let currentFilter = 'all';

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        currentFilter = filter.dataset.filter;
        renderTodos();
    });
});

clearBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
});

function renderTodos() {
    todoList.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <i class="fas ${todo.completed ? 'fa-check-circle' : 'fa-circle'} check-btn" onclick="toggleTodo(${todo.id})"></i>
            <span>${todo.text}</span>
            <i class="fas fa-trash delete-btn" onclick="deleteTodo(${todo.id})"></i>
        `;

        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = activeCount;
}

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initial Render
renderTodos();

// Expose functions to window (since we're using inline onclick)
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
