<template>
  <panel title="Search">
    <v-text-field
      label="Search by song title, artist, album, or gener"
      v-model="search"
    ></v-text-field>
  </panel>
</template>

<script>
// v-model의 search와 data안의 search변수와 watch안의 search함수의 이름이 같아야지만 된다.
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) { // router를 활용해서 이름을 get방식으로 보낼 예정
      const route = {
        name: 'songs'
      }
      // console.log('this.search', this.search) // this.search와 value도 같은 값, 검색하는 값.
      if (this.search !== '') { // 검색창이 비어있지 않으면
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': { // 직접 URL에 검색 단어를 치고 들어가면 v-text-field칸에 검색한 단어가 들어온다.
      immediate: true, // 즉시 반영함
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style scoped>
</style>
