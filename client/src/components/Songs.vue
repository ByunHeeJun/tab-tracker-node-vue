<template>
<v-layout column>
    <v-flex xs6 offset-xs>
      <!-- <panel>
          <div slot="hello">
            <h3>YO YO YO</h3>
            <p>
                Hello there I am a paragraph tag
            </p>
          </div>

          <div slot="bye">
            <h3>bye bye bye</h3>
            <p>
                BYE
            </p>
          </div>
      </panel> Example_1-->
      <panel title="Songs Hello">
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  components: {
    Panel // Panel.vue 페이지를 가져와서 다른 vue에 보여줄 수 있다. 공통적으로 필요한 vue페이지는 이런식으로 가져온다.
  }
}
</script>

<style scoped>

</style>
