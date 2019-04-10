<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song MetaData">
        <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title"
        ></v-text-field>

        <v-text-field
          label="Artist"
          required
          :rules="[required]"
          v-model="song.artist"
        ></v-text-field>

        <v-text-field
          label="Genre"
          required
          :rules="[required]"
          v-model="song.genre"
        ></v-text-field>

        <v-text-field
          label="Album"
          required
          :rules="[required]"
          v-model="song.album"
        ></v-text-field>

        <v-text-field
          label="Album Image Url"
          required
          :rules="[required]"
          v-model="song.albumImageUrl"
        ></v-text-field>
        <v-text-field
          label="YouTube Id"
          required
          :rules="[required]"
          v-model="song.youtubeId"
        ></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-4">
        <v-textarea
          label="Tab"
          required
          :rules="[required]"
          v-model="song.tab"
        ></v-textarea>

        <v-textarea
          label="Lyrics"
          required
          :rules="[required]"
          v-model="song.lyrics"
        ></v-textarea>
        <div class="danger-alert" v-if="error">
          {{error}}
        </div>
      </panel>
      <v-btn
        dark
        class="cyan"
        @click="save">
        Save Song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
export default {
  methods: {
    async save () {
      console.log('save Click')
      this.error = null
      console.log('Object', Object.keys(this.song))
      const areAllFiledsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFiledsFilledIn) {
        this.error = '필수항목을 모두 입력해 주세요.'
        return
      }
      const songId = this.$store.state.route.params.songId
      try {
        await SongsService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log('song err', err)
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
