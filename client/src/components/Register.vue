
<template>
  <v-layout column>
    <v-flex xs6 offset-xs>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
            <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
         <input
            type="email"
            name="email"
            v-model="email"
            placeholder="이메일"/>
          <br>
          <input
            type="password"
            name="password"
            v-model="password"
            placeholder="비밀번호"/>
          <br>
          <div class="error" v-html="error"/>
          <br>
          <v-btn class="cyan"
             @click="register">
             Register
          </v-btn>
        </div>
      </div>
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
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color:red;
}
</style>
