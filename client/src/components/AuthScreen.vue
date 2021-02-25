/* eslint-disable */
<template>
<section id="main-section">

  <div id="main-content">
    <div class="wrapper">
      <img src="~@/assets/images/venner-logo-black.png">
      <hr>
      <login-form v-if="isLogin"></login-form>
      <register-form v-else></register-form>
      <p v-if="isLogin"><i> Dont have account? <a v-on:click="isLogin = false">register</a>.</i></p>
      <p v-else><i> Existing account? <a v-on:click="isLogin = true">login</a>.</i></p>
    </div>
  </div>

  <div class="filter"></div>

</section>
</template>

<script>
import LoginForm from './Login.vue'
import RegisterForm from './Register.vue'

export default {
  name: 'Auth',
      components: {
          LoginForm,
          RegisterForm
      },
  data: function()  {
    return {
      isLogin: true
    }
  }
}
</script>

<style>
#main-section{
  position: relative;
  height: 100vh;
  background-image: url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmarketingland.com%2Fwp-content%2Fml-loads%2F2016%2F10%2Flocal-location-targeting-geotargeting-pin-ss-1920.jpg&f=1&nofb=1");
  background-size: cover;
  overflow-x: hidden;
}


#main-content{
  position: absolute;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 2.5%;

  width: 25%;

  right: 0;
  bottom: 0;
  top: 0;
}

#main-content .wrapper{
  background-color: white;
  padding: 10%;
  width: 100%;

  border-radius: 10px;
}

#main-content .wrapper img{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

#main-content h2, h3{
  text-align: center;
}


#main-content p{
  font-size: 1em;
}

hr{
  margin: 1% 0;
}

input{
  font-size: 1.1em;
  background-color: rgb(245, 245, 245);
  border: none;

  border-bottom: 2px solid rgb(155, 155, 155);

  width: 100%;

  margin-bottom: 3%;
}

input[type=submit]{
  font-size: 1.1em;

  border: none;
  background-color: blue;

  border-radius: 20px;

  color: white;
  font-weight: bold;

  padding: 1.5% 0;
}

.filter{
  position: absolute;
  height: 100%;
  width: 100%;
  /*
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.5) 58%, rgba(0,0,0,0) 100%);*/
}


</style>
