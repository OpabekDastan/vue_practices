<script setup>
import { computed, watchEffect } from 'vue'
import ClipTile from './components/ClipTile.vue'
import { useLibrary } from './composables/useLibrary'

const {
  themeMode, isBusy, errorMsg, query,
  visibleClips, heartCount, likedIds,
  onLikedToggle, orderByViews
} = useLibrary()

watchEffect(() => {
  const root = document.documentElement
  if (themeMode.value === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
})
const found = computed(() => visibleClips.value.length)
</script>

<template>
  <div>
    <div class="shell">
      <header class="topbar">
        <h1 class="brand">Tube Mini</h1>
        <div class="controls">
          <button
            @click="themeMode = themeMode === 'dark' ? '' : 'dark'"
            :aria-pressed="themeMode === 'dark'"
            aria-label="Toggle color theme"
          >
            Theme: {{ themeMode === 'dark' ? 'Dark' : 'Light' }}
          </button>
          <button @click="orderByViews">Sort by Views</button>
        </div>
      </header>

      <input
        class="search"
        type="text"
        v-model="query"
        placeholder="Search by title or channel…"
        aria-label="Search videos"
      />

      <div class="status">
        <span>Found: {{ found }}</span>
        <span>Total Likes: {{ heartCount }}</span>
      </div>

      <div v-if="isBusy">Loading videos…</div>
      <div v-else-if="errorMsg" class="err">{{ errorMsg }}</div>

      <template v-else>
        <div v-if="visibleClips.length === 0">No videos found.</div>

        <div v-else class="grid">
          <div class="" v-for="c in visibleClips" :key="c.id">
            <ClipTile
              :id="c.id"
              :title="c.title"
              :channel="c.channel"
              :views="c.views"
              :thumb="c.thumb"
              :url="c.url"             
              :isLiked="likedIds.includes(c.id)"
              @liked="onLikedToggle"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>