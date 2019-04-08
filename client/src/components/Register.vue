
<template>
  <div>
      <h1>Register</h1>
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
      <button
       @click="register"
       >Register
       </button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
// v-model : 자동완성기능
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () { // 위에 @click명이랑 연결됨
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      }) // services/AuthenticationService의 함수를 불러와서 실행시킴. 매개변수로 email, password가 들어감 => 들어간 데이터들은 services/Api에 연동된 Server단 URL과 연동되어 post방식으로 데이터가 넘어감. Server단으로 넘어온 데이터는 app.js의 post방식인 /register가 실행되어 json방식으로 데이터를 리턴해줌. app.post('/register)의 이름도 register로 맞춰줘야 인식되어 데이터를 리턴해줄 수 있다 이름이 다르면 404오류
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
