const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const unList = document.getElementById('unordered-list')
const listText = document.getElementById('description')

// Tab buttons
const activeBtn = document.getElementById('active-btn')
const completedBtn = document.getElementById('completed-btn')
const historyBtn = document.getElementById('history-btn')
const clearBtn = document.getElementById('clear-btn')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let currentTab = 'active'

// Event listeners
inputBtn.addEventListener("click", addTask)
unList.addEventListener("click", handleTaskAction) // Event delegation
activeBtn.addEventListener("click", () => switchTab('active'))
completedBtn.addEventListener("click", () => switchTab('completed'))
historyBtn.addEventListener("click", () => switchTab('history'))
clearBtn.addEventListener("dblclick", clearAll)

// Add enter key support
inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask()
})



function addTask() {
    const taskName = inputEl.value
    const description = listText.value
    
    if (!taskName) {
        alert('Please enter a task name')
        return
    }
    
    const newTask = {
        id: Date.now(), // Simple ID generation
        name: taskName,
        description: description,
        completed: false,
        deleted: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
        deletedAt: null
    }
    
    tasks.push(newTask)
    saveToLocalStorage()
    renderTasks()
    
    // Clear inputs
    inputEl.value = ""
    listText.value = ""
}

function handleTaskAction(e) {
    const taskId = parseInt(e.target.dataset.taskId)
    
    if (e.target.classList.contains('done')) {
        toggleTask(taskId)
    } else if (e.target.classList.contains('delete')) {
        archiveTask(taskId)
    } else if (e.target.classList.contains('restore')) {
        restoreTask(taskId)
    }
}

function toggleTask(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            const newCompleted = !task.completed 
            return {
                ...task,
                completed: newCompleted,
                completedAt: newCompleted ? new Date().toISOString() : null
            }
        }
        return task
    })
    saveToLocalStorage()
    renderTasks()
}

// function deleteTask(taskId) {
//     if (confirm('Are you sure you want to delete this task?')) {
//         tasks = tasks.filter(task => task.id !== taskId)
//         saveToLocalStorage()
//         renderTasks()
//     }
// }
function archiveTask(taskId) {
    const task = tasks.find(task => task.id === taskId)
    const taskName = task ? task.name : 'this task'

    if (confirm(`Archive "${taskName}"? It will be moved to history where you can restore it later.`)) {
        tasks = tasks.map((task) => task.id === taskId ?
            { ...task, 
                deleted: true, 
                deletedAt: new Date().toISOString() 
             }
             : task
            )
        saveToLocalStorage()
        renderTasks()
    }
}

function restoreTask(taskId) {
    const foundTask = tasks.find(task => task.id === taskId)
    const taskName = foundTask ? foundTask.name : 'this task'

    if (confirm(`Restore "${taskName}" to active tasks?`)) {
        tasks = tasks.map((singleTask) => 
            singleTask.id === taskId 
           ? {
                ...singleTask, 
                completed: false,
                deleted: false,
                completedAt: null,
                deletedAt: null
            }
            : singleTask
        )}
        saveToLocalStorage()
        renderTasks()
}



function switchTab(tab) {
    currentTab = tab
    
    // Update active button
    document.querySelectorAll('.tab-btn').forEach(btn => 
        btn.classList.remove('active'))
    document.getElementById(`${tab}-btn`).classList.add('active')
    
    renderTasks()
}

function getFilteredTasks() {
    switch (currentTab) {
        case 'active':
            return tasks.filter(task => !task.completed && !task.deleted)
        case 'completed':
            return tasks.filter(task => task.completed && !task.deleted) 
        case 'history':
            // shows all tasks regardless of status
            return tasks 
        default:
            return tasks
    }
}
function getTaskStatus(task) {
    if (task.deleted) {
        return 'archived'
    } else if (task.completed) {
        return 'completed'
    } else {
        return 'active'
    }
}

function renderTasks() {
    const filteredTasks = getFilteredTasks()
    
    if (filteredTasks.length === 0) {
        unList.innerHTML = `<p class="no-tasks">No ${currentTab} tasks</p>`
        return
    }
    
    unList.innerHTML = filteredTasks.map(task => {
        const status = getTaskStatus(task)
        const isHistoryTab = currentTab === 'history'

        return `
        <div class="task-item ${status}">
            <div class="task-main">
                <div class="task-name ${task.completed || task.deleted ? 'done-text' : ''}">${task.name}</div>
                    <div class="task-actions">
                        ${renderTaskButtons(task, isHistoryTab)}
                    </div>
                </div>
            ${task.description ? `
                <div class="task-description">
                    <span class="description-text ${task.completed || task.deleted ? 'done-text' : ''}">${task.description}</span>
                </div>
            ` : ''}
            ${isHistoryTab ? `
                <div class="task-status">
                    <small class="status-badge ${status}">
                        ${status.toUpperCase()}
                        ${task.completedAt ? ` Completed: ${new Date(task.completedAt).toLocaleDateString()}` : ''}
                        ${task.deletedAt ? ` Archived: ${new Date(task.deletedAt).toLocaleString()}` : ''}
                    </small>
                </div>
                ` : ''}
        </div>
    `}).join('')
}

function renderTaskButtons(task, isHistoryTab) {
    if (task.deleted && isHistoryTab) {
        return `<button class="restore" data-task-id="${task.id}">Restore</button>`
    } else if (!task.deleted) {
        const doneText = task.completed ? 'Undo' : 'Done'
        const deleteText = isHistoryTab ? 'Archive' : (task.completed ? 'Archive' : 'Archive')

        return `
                <button class="done" data-task-id="${task.id}">${doneText}</button>
                <button class="delete" data-task-id="${task.id}">${deleteText}</button>
            `
    } 
    return ''
    

}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Initialize app
renderTasks()

function clearAll() {
    if(confirm('Are you sure you want to clear all? *This will permanently delete ALL tasks and local storage*')){ 
        localStorage.clear()
        location.reload()
    }
}

