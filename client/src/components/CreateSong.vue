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
        @click="create">
        Create Song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
export default {
  methods: {
    async create () {
      this.error = null
      console.log('Object', Object.keys(this.song))
      const areAllFiledsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFiledsFilledIn) {
        this.error = '필수항목을 모두 입력해 주세요.'
        return
      }
      // call Api
      try {
        await SongsService.post(this.song)
        this.$router.push({
          name: 'songs' // router.push name을 주면은 해당하는 URL로 바로 이동시켜준다 := redirect
        })
      } catch (err) {
        console.log('song err', err)
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
  components: {
    Panel
  }
}
</script>

<style scoped>
</style>
