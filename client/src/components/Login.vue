/* eslint-disable */
<template>

<div>
  <form @submit.prevent="loginOnSubmit" method="post">
    <h2>Login</h2>
    <label for="email">E-mail:</label><br>
    <input type="email" id="email" name="email" placeholder="youremail@provider.com" required v-model="loginFields.email"><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" placeholder="********" required v-model="loginFields.password"><br>
    <input type="submit" value="Login">
  </form>
</div>

</template>

<script>
export default {
  data: function()  {
    return {
      isSent: false,

      loginFields: {
        email: "",
        password:  ""
      }
    }
  },
  methods:{
    loginOnSubmit(){
      this.$store.dispatch('submit_login', this.loginFields)
        .then(res => alert(res));

    }
  }
}
</script>

<style>

</style>
