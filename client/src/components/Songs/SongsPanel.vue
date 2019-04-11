<template>
  <panel title="Songs">
        <v-btn
          slot="action"
          @click="navigateTo({name: 'songs-create'})"
          class="cyan accent-2"
          light
          small
          absolute
          right
          middle
          fab>
          <v-icon>add</v-icon>
        </v-btn>
      <!-- for문을 쓸때에는 key라는 고유 식별자가 존재해야만 한다? -->
      <div v-for="song in songs"
          class="song"
          :key="song.id">

          <v-layout>
            <v-flex xs6>
              <div class="song-title">
                {{song.title}}
              </div>

              <div class="song-artist">
                {{song.artist}}
              </div>

              <div class="song-genre">
                {{song.genre}}
              </div>

              <v-btn
                dark
                class="cyan"
                @click="navigateTo({name: 'song', params: {songId: song.id}})">
                View
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <img class="album-image" :src="song.albumImageUrl" />
            </v-flex>
          </v-layout>
      </div>
  </panel>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
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
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) { // value는 $route.query.search가 되는 거 같음 (예상)
        this.songs = (await SongsService.index(value)).data
      }
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
