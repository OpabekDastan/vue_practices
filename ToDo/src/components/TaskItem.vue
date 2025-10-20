<script setup>
const props = defineProps({
  task: { type: Object, required: true }
})
const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <div class="item">
    <div class="item-left">
      <!-- 8) Выполнено-->
      <input type="checkbox" :checked="task.completed" @change="emit('toggle')" />
      <!-- 5) стиль  -->
      <div>
        <div class="item-title" :class="{ done: task.completed }">{{ task.text }}</div>
        <div class="row" style="gap:6px;margin-top:6px;">
          <span class="badge">Category: {{ task.category }}</span>
          <span class="badge">Priority: {{ task.priority }}</span>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- 8) удалить -->
      <button class="ghost" @click="emit('remove')">Delete</button>
    </div>
  </div>
</template>
