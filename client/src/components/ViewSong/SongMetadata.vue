<template>
 <panel title="Song MetaData">
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
          @click="navigateTo({name: 'song-edit', params: {songId: song.id}})">
          Edit
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn"
          dark
          class="cyan"
          @click="setAsBookmark()">
          Bookmark
        </v-btn>

        <v-btn
          v-if="isUserLoggedIn"
          dark
          class="cyan"
          @click="unBookmark()">
          UnBookmark
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <img class="album-image" :src="song.albumImageUrl" />
        <br>
        <div class="song-album">
          {{song.album}}
        </div>
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarkService from '@/services/BookmarService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      isBookmarked: false
    }
  },
  computed: { // 이걸 사용하면서 v-if="$store.state.isUserLoggedIn를 그냥 isUserLoggedIn으로 쓸 수 있다
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    const bookmark = (await BookmarkService.post({
      songId: this.song.id,
      userId: this.$store.state.user.id
    })).data
    console.log('bookmark', bookmark)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    setAsBookmark () {
      console.log('bookmark Click')
    },
    unBookmark () {
      console.log('Unbookmark Click')
    }
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
.song-album {
  font-size: 28px
}

.album-image {
  width: 43%;
  margin: 0 auto;
}
</style>
