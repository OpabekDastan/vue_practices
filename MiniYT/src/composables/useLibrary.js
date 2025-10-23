import { ref, computed, watch, onMounted } from 'vue'

export function useLibrary() {
  const themeMode = ref(
    localStorage.getItem('tm_theme')
    ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '')
  )
  watch(themeMode, (v) => {
    try { localStorage.setItem('tm_theme', v || ''); } catch {}
  })

  const isBusy = ref(true)
  const errorMsg = ref('')
  const clips = ref([])
  const query = ref('')
  const likedIds = ref([])

  const visibleClips = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return clips.value
    return clips.value.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.channel.toLowerCase().includes(q)
    )
  })
  const heartCount = computed(() => likedIds.value.length)

  watch(query, () => {  })

  function onLikedToggle(id) {
    if (likedIds.value.includes(id)) {
      likedIds.value = likedIds.value.filter(x => x !== id)
    } else {
      likedIds.value = [...likedIds.value, id]
    }
  }
  function orderByViews() {
    clips.value = [...clips.value].sort((a, b) => b.views - a.views)
  }

  onMounted(() => {
    isBusy.value = true
    errorMsg.value = ''
    setTimeout(() => {
      try {
        
        clips.value = [
          {
            id: 10,
            title: 'CLICK THIS FOR FUN',
            channel: 'DASTAN',
            views: 9999999999999,
            url: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
            thumb: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1280&auto=format&fit=crop'
          },
          {
            id: 11,
            title: '3 Ways to Build Better Vue Transitions',
            channel: 'LearnVue',
            views: 21_000,
            url: 'https://www.youtube.com/watch?v=wrRynSC8Zqc',
            thumb: 'https://img.youtube.com/vi/wrRynSC8Zqc/hqdefault.jpg'
          },
          {
            id: 12,
            title: '99,9% из вас сюда НЕ ПОПАДУТ. Мы в АНТАРКТИДЕ – ТОПЛЕС',
            channel: 'ТОПЛЕС',
            views: 6_500000,
            url: 'https://youtu.be/c6ulUgGHDJY?si=N4PDS65wg3E9ozph',
            thumb: 'https://i.ytimg.com/an_webp/c6ulUgGHDJY/mqdefault_6s.webp?du=3000&sqp=CNrb2ccG&rs=AOn4CLBxlKVEQwP_WEhR6YrAGe-8TlKbBw'
          },
          {
            id: 13,
            title: 'What I`ve Done (Official Music Video) [4K Upgrade] - Linkin Park',
            channel: 'LinkinPark',
            views: 24400_000,
            url: 'https://youtu.be/8sgycukafqQ?si=20jb0EfjMUmtf2Qq',
            thumb: 'https://i.ytimg.com/vi/8sgycukafqQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDbH3wvOM_gPoAwtpv5NrHzMNzgRw'
          },
          {
            id: 14,
            title: 'twenty one pilots: Stressed Out [OFFICIAL VIDEO]',
            channel: 'Fueled By Ramen and twenty one pilots',
            views: 3100000_000,
            url: 'https://www.youtube.com/watch?v=pXRviuL6vMY&list=RDpXRviuL6vMY&start_radio=1',
            thumb: 'https://img.youtube.com/vi/pXRviuL6vMY/hqdefault.jpg'
          },
          {
            id: 15,
            title: 'Queen – Another One Bites the Dust',
            channel: 'Queen Official',
            views: 680000_000,
            url: 'https://www.youtube.com/results?search_query=Vue+3+Crash+Course+Traversy+Media',
            thumb: 'https://img.youtube.com/vi/rY0WxgSXdEE/hqdefault.jpg'
          },
          {
            id: 16,
            title: 'Elon Musk Motivation',
            channel: 'MulliganBrothers',
            views: 1_600_000,
            url: 'https://www.youtube.com/watch?v=JGfygJXTwq4',
            thumb: 'https://img.youtube.com/vi/JGfygJXTwq4/hqdefault.jpg'
          },
          {
            id: 17,
            title: 'ПЕРЕНОЧЕВАЛ в доме ВЕДЬМЫ - Я ТУДА НЕ ВЕРНУСЬ!',
            channel: 'Дима Масленников',
            views: 17000_000,
            url: 'https://www.youtube.com/watch?v=BhiwL0494Tg',
            thumb: 'https://img.youtube.com/vi/BhiwL0494Tg/hqdefault.jpg'
          },
          {
            id: 18,
            title: 'Эх, Қарындас',
            channel: 'Kairat Nurtas',
            views: 4600_000,
            url: 'https://www.youtube.com/watch?v=AqeMrA8HS0Y',
            thumb: 'https://img.youtube.com/vi/AqeMrA8HS0Y/hqdefault.jpg'
          },
          {
            id: 19,
            title: 'I Cant Prove Meme',
            channel: 'mroon',
            views: 406_000,
            url: 'https://www.youtube.com/watch?v=iC9G3iumj2Q',
            thumb: 'https://img.youtube.com/vi/iC9G3iumj2Q/hqdefault.jpg'
          },
          {
            id: 20,
            title: 'Shrek – Somebody Once Told Me (scene)',
            channel: 'M0vie',
            views: 13000_000,
            url: 'https://www.youtube.com/watch?v=HLQ1cK9Edhc',
            thumb: 'https://img.youtube.com/vi/HLQ1cK9Edhc/hqdefault.jpg'
          },
        ]
      } catch (e) {
        errorMsg.value = 'Could not load videos.'
      } finally {
        isBusy.value = false
      }
    }, 500)
  })

  return {
    themeMode, isBusy, errorMsg, clips, query, likedIds,
    visibleClips, heartCount,
    onLikedToggle, orderByViews
  }
}
