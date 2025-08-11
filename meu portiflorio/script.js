const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// Salva no localStorage
function salvarTarefas() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Renderiza a lista
function renderizarTarefas() {
  taskList.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement('li');
    li.className = tarefa.completa ? 'completed' : '';
    li.innerHTML = `
      ${tarefa.texto}
      <div class="actions">
        <button onclick="completarTarefa(${index})">✅</button>
        <button onclick="removerTarefa(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Adiciona nova tarefa
taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const texto = taskInput.value.trim();
  if (texto !== '') {
    tarefas.push({ texto, completa: false });
    salvarTarefas();
    renderizarTarefas();
    taskInput.value = '';
  }
});

// Completa uma tarefa
function completarTarefa(index) {
  tarefas[index].completa = !tarefas[index].completa;
  salvarTarefas();
  renderizarTarefas();
}

// Remove uma tarefa
function removerTarefa(index) {
  tarefas.splice(index, 1);
  salvarTarefas();
  renderizarTarefas();
}

// Inicializa
renderizarTarefas();
