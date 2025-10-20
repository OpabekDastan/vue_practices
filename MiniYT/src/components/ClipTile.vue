<script setup>
const props = defineProps({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  channel: { type: String, required: true },
  views: { type: Number, required: true },
  thumb: { type: String, required: true },
  url: { type: String, required: true },   
  isLiked: { type: Boolean, default: false }
})

const emit = defineEmits(['liked'])

function handleClick() {
  emit('liked', props.id) // события лайкедс
}
</script>

<template>
  <article class="tile">
    <!-- клик зона картинка и заголовок-->
    <a class="tile-link" :href="url" target="_blank" rel="noopener">
      <img :src="thumb" :alt="title" class="thumb" />
      <div class="pad">
        <h3 class="h">{{ title }}</h3>
        <div class="meta">{{ channel }} • {{ views.toLocaleString() }} views</div>
      </div>
    </a>

    <!-- нижняя панель с лайками -->
    <div class="pad">
      <div class="row">
        <span class="tag">{{ isLiked ? 'Liked ❤️' : 'Tap to like ♡' }}</span>
        <button @click.stop="handleClick">
          {{ isLiked ? 'Undo Like' : 'Like ❤' }}
        </button>
      </div>
    </div>
  </article>
</template>
