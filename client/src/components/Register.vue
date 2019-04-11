
<template>
  <v-layout column>
    <v-flex xs2 align-self-center>
      <panel title="Register">
          <form
            name="tab-tracker-form"
            autocomplete="off">
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <br>
            <v-text-field
              label="password"
              type="password"
              v-model="password"
              autocomplete="new-password"
            ></v-text-field>
            </form>
          <br>
          <div class="error" v-html="error"/>
          <br>
          <v-btn class="cyan"
             @click="register">
             Register
          </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
// v-model : 자동완성기능
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () { // 위에 @click명이랑 연결됨
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        }) // services/AuthenticationService의 함수를 불러와서 실행시킴. 매개변수로 email, password가 들어감 => 들어간 데이터들은 services/Api에 연동된 Server단 URL과 연동되어 post방식으로 데이터가 넘어감. Server단으로 넘어온 데이터는 app.js의 post방식인 /register가 실행되어 json방식으로 데이터를 리턴해줌. app.post('/register)의 이름도 register로 맞춰줘야 인식되어 데이터를 리턴해줄 수 있다 이름이 다르면 404오류
        this.$store.dispatch('setToken', null) // ??? 생성된 token을 setToken이라는 이름으로 저장하는 것?
        this.$store.dispatch('setUser', null) // ??? 생성된 user을 setUser이라는 이름으로 저장하는 것?
        this.$router.push({ // part 6 router에 push해주면 해당 이름에 지정된 url로 넘어가게 된다.
          name: 'login'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
