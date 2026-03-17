// src/renderer.js
let todos = []; // { id: string, text: string, done: boolean }

const $ = (sel) => document.querySelector(sel);

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));
}

async function load() {
  todos = await window.todoAPI.loadTodos();
  render();
}

async function persist() {
  await window.todoAPI.saveTodos(todos);
}

function render() {
  const list = $("#list");
  const count = $("#count");
  list.innerHTML = "";

  const remaining = todos.filter(t => !t.done).length;
  count.textContent = `${remaining} pendientes · ${todos.length} total`;

  for (const t of todos) {
    const li = document.createElement("li");
    li.className = "item";

    li.innerHTML = `
      <label class="check">
        <input type="checkbox" ${t.done ? "checked" : ""} data-id="${t.id}">
        <span class="text ${t.done ? "done" : ""}">${escapeHtml(t.text)}</span>
      </label>
      <button class="btn danger" data-del="${t.id}" title="Eliminar">🗑️</button>
    `;

    list.appendChild(li);
  }
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

document.addEventListener("click", async (e) => {
  const delId = e.target?.getAttribute?.("data-del");
  if (delId) {
    todos = todos.filter(t => t.id !== delId);
    await persist();
    render();
  }
});

document.addEventListener("change", async (e) => {
  const id = e.target?.getAttribute?.("data-id");
  if (id) {
    const t = todos.find(x => x.id === id);
    if (t) t.done = e.target.checked;
    await persist();
    render();
  }
});

$("#form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = $("#text");
  const text = input.value.trim();
  if (!text) return;

  todos.unshift({ id: uid(), text, done: false });
  input.value = "";
  await persist();
  render();
});

$("#clearDone").addEventListener("click", async () => {
  todos = todos.filter(t => !t.done);
  await persist();
  render();
});

load();
