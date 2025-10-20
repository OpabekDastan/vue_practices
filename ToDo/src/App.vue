<script setup>
import { ref, computed } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'

const categories = ['Work', 'Personal', 'Shopping', 'Learning']
const priorities = ['High', 'Medium', 'Low']

// задачи в реактивном состоянии
const tasks = ref([
  { id: 1, text: 'Learn Vue 3', category: 'Learning', priority: 'High', completed: true },
  { id: 2, text: 'Plan the day', category: 'Personal', priority: 'Medium', completed: true },
])

// простые фильтры
const filterCategory = ref('All')
const filterPriority = ref('All')
const onlyIncomplete = ref(false)

// вычисляемые штуки: сколько незавершённых и итоговый список по фильтрам
const incompleteCount = computed(() => tasks.value.filter(t => !t.completed).length)
const filteredTasks = computed(() => {
  let out = [...tasks.value]
  if (filterCategory.value !== 'All') out = out.filter(t => t.category === filterCategory.value)
  if (filterPriority.value !== 'All') out = out.filter(t => t.priority === filterPriority.value)
  if (onlyIncomplete.value) out = out.filter(t => !t.completed)
  return out
})

// обработчики: добавить, переключить завершённость, удалить
const addTask = (payload) => {
  tasks.value.push({
    id: Date.now(),
    text: payload.text.trim(),
    category: payload.category,
    priority: payload.priority,
    completed: false,
  })
}
const toggleCompleted = (id) => {
  const t = tasks.value.find(x => x.id === id)
  if (t) t.completed = !t.completed
}
const deleteTask = (id) => {
  tasks.value = tasks.value.filter(x => x.id !== id)
}
</script>

<template>
  <div class="container">
    <h1>SPA</h1>
    <p>{{ new Date().toLocaleDateString() }}</p> <!-- просто тест для себя -->

    <div class="card">
      <TaskForm
        :categories="categories"
        :priorities="priorities"
        @add="addTask"
      />

      <hr />

      <!-- фильтры: категория, приоритет и чекбокс "только незавершённые" -->
      <div class="row">
        <select v-model="filterCategory">
          <option>All</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>

        <select v-model="filterPriority">
          <option>All</option>
          <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
        </select>

        <label style="display:flex;align-items:center;gap:8px;">
          <input type="checkbox" v-model="onlyIncomplete" />
          Only incomplete
        </label>
      </div>

      <!-- показатели и счетчики мэйби ) -->
      <div class="kpis">
        <div class="kpi">Total: {{ tasks.length }}</div>
        <div class="kpi">Incomplete: {{ incompleteCount }}</div>
      </div>

      <!-- если ничего нет под фильтры -->
      <p v-if="filteredTasks.length === 0" style="opacity:.8;margin-top:10px;">
        No tasks match your filters.
      </p>

      <!-- список задач -->
      <TaskList
        v-else
        :items="filteredTasks"
        @toggle="toggleCompleted"
        @remove="deleteTask"
      />
    </div>
  </div>
</template>
