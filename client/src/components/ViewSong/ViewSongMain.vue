<template>
  <div>
  <v-layout>
    <v-flex xs6 class="ml-3 mt-3">
      <song-metadata :song="song"/>
    </v-flex>
      <v-flex xs6 class="ml-3 mt-3">
      <you-tube :youtubeId="song.youtubeId"/>
      </v-flex>
  </v-layout>
  <v-layout>
    <v-flex xs6 class="ml-3 mt-3">
      <tab :song="song"/>
    </v-flex>
    <v-flex xs6 class="ml-3 mt-3">
      <lyrics :song="song"/>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import SongMetadata from './SongMetadata'
import YouTube from './YouTube'
import SongsService from '@/services/SongsService'
import Lyrics from './Lyics'
import Tab from './Tab'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
    console.log('this.song List', this.song)
  },
  components: {
    Panel,
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>

<style scoped>

textarea {
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
