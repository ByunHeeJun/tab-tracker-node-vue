<template>
<v-layout column>
    <v-flex xs6 offset-xs>
      <songs-search-panel />
      <songs-panel class="mt-3"/>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsService from '@/services/SongsService'

export default {
  components: {
    SongsPanel,
    SongsSearchPanel
  },
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    // do a requrest to the backend for all the songs : 모든 노래는 backend에서 요청을 처리합니다.
    this.songs = (await SongsService.index()).data // data 꼭 써줘야지만 songs객체에 있는 data들이 페이지에 나온다.
    console.log('songs', this.songs)
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 32px
}

.song-artist {
  font-size: 20px
}

.song-genre {
  font-size: 20px
}

.album-image {
  width: 25%;
  margin: 0 auto;
}
</style>
