
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
    async register () {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
