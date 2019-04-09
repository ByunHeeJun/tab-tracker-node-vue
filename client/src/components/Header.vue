<template>
    <v-toolbar fixed class="blue" dark>
        <v-toolbar-title class="mr-4">
            <span
            class="home"
            @click="navigateTo({name: 'root'})">
            TabTracker
            </span>
        </v-toolbar-title>

        <v-toolbar-items>
            <v-btn
              flat
              dark
              @click="navigateTo({name: 'songs'})">
              Browse
            </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer> <!-- v-spacer 밑으로 버튼을 생성하면 맨 오른쪽으로 이동하게된다. -->
        <v-toolbar-items>
            <!-- i<router-link to="register">
                <v-btn flat dark>
                    Sign Up
                </v-btn>
            </router-link>
            index.js의 router에도 같은이름으로 적어줘야한다. 이 코드는 CSS 깨짐. -->
                <v-btn
                    v-if="!$store.state.isUserLoggedIn"
                    flat
                    dark
                    @click="navigateTo({name: 'login'})">
                    Login
                </v-btn>
                <v-btn
                    v-if="!$store.state.isUserLoggedIn"
                    flat
                    dark
                    @click="navigateTo({name: 'register'})">
                    Sign Up
                </v-btn>
                <v-btn
                    v-if="$store.state.isUserLoggedIn"
                    flat
                    dark
                    @click="logout">
                    Log Out
                </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) { // index.js에 있는 경로와 연결됨
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null) // token과 user를 지운다
      this.$store.dispatch('setUser', null)
      // TODO: redirect to homepage
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.home {
    cursor: pointer;
}
.home:hover {
    color: #e9e;
}
</style>
