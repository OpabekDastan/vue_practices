<script setup>
import { ref } from 'vue'


const props = defineProps({
  categories: { type: Array, required: true },
  priorities: { type: Array, required: true },
})


const emit = defineEmits(['add'])


const text = ref('')
const category = ref(props.categories[0] ?? 'Work')
const priority = ref(props.priorities[1] ?? 'Medium')

const submit = () => {
  if (!text.value.trim()) return
  emit('add', { text: text.value, category: category.value, priority: priority.value })
  text.value = ''
}
</script>

<template>
  <div class="row">

    <input
      v-model="text"
      type="text"
      placeholder="New Task"
      :aria-label="'Task description input'"  
    />
    <select v-model="category">
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>
    <select v-model="priority">
      <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
    </select>
    <!-- 8)  добавить задачу -->
    <button class="primary" @click="submit">Add task</button>
  </div>
</template>
