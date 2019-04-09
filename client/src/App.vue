<template>
  <div id="app">
    <v-app>
        <page-header/> <!-- page-header 적어줘야함 안적으면 Header안뜸-->
      <main>
          <v-container fluid>
            <!-- <img src="./assets/logo.png"> -->
            <router-view></router-view>
          </v-container>
        <!-- v-app, main, v-container fluid 추가하니깐 스크롤바 생김. -->
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn_content {
  color:white;
}

.v-toolbar__title {
  color:white;
}
</style>
