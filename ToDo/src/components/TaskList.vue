<script setup>
import TaskItem from './TaskItem.vue'

const props = defineProps({
  items: { type: Array, required: true }
})
const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <div class="list">
    <!-- 7) уникальный клююч -->
    <TaskItem
      v-for="t in items"
      :key="t.id"                  
      :task="t"
      @toggle="emit('toggle', t.id)"
      @remove="emit('remove', t.id)"
    />
  </div>
</template>
