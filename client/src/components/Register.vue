/* eslint-disable */
<template>

<div>
  <form @submit.prevent="registerOnSubmit" method="post" v-if="!isSent">
    <h2>Register</h2>
    <label for="username">User name:</label><br>
    <input type="text" id="username" name="username" placeholder="example64" required v-model="regFields.username"><br>
    <label for="email">E-mail:</label><br>
    <input type="email" id="email" name="email" placeholder="youremail@provider.com" required v-model="regFields.email"><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password" placeholder="********" required v-model="regFields.password">
    <p v-if="errorLenPasswords.length != 0" style="color:red;"><i>{{ errorLenPasswords }}</i></p>

    <label for="passconf">Confirm password:</label><br>
    <input type="password" id="passconf" name="passconf" placeholder="********" required v-model="regFields.passconf">
    <p v-if="errorMatchPasswords.length != 0" style="color:red;"><i>{{ errorMatchPasswords }}</i></p>

    <input type="submit" value="Register">
  </form>

  <div v-else>
    <h3>Thank your for registering</h3>
    <p>We sent you a confirmation e-mail to activate your account.</p>
    <p>If you dont see the e-mail, check your spam folder.</p>
    <hr>
  </div>
</div>

</template>

<script>
export default {
  data: function()  {
    return {
      isSent: false,

      errorLenPasswords: "",
      errorMatchPasswords: "",

      regFields: {
        username: "",
        email: "",
        password:  "",
        passconf: "",
      }
    }
  },
  methods:{
    registerOnSubmit(){
      if (this.checkPasswords()){
        this.$store.dispatch('submit_registration', this.regFields)
        .then(resp => this.isSent=true)
      }

    },
    checkPasswords(){
      if(this.regFields.password.length < 8){
        this.errorLenPasswords = "Please, create a password with at least 8 characters.";
        return false
      }
      else{
        this.errorLenPasswords = ""
      }

      if(this.regFields.password != this.regFields.passconf){
        this.errorMatchPasswords = "Passwords dont match.";
        return false
      }
      else{
        this.errorMatchPasswords = "";
      }

      return true
    }

  }
}
</script>

<style>

</style>