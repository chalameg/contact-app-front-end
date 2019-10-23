<template>
    <v-content>
      <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xm12 sm8 md4>
          <v-form @submit.prevent="login">
            <v-card class='elevation-2'>
              <v-toolbar light class='elevation-1'>
                <v-toolbar-title>
                  <v-icon>mdi-login</v-icon>
                  LOGIN
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                
                <div v-if="loggingIn" class="loading">
                  <img src="/loading.gif" alt="Loading Icon">
                </div>
                <p v-if="loginError" class='danger'>{{ loginError }}</p>
                
                <v-text-field
                  prepend-inner-icon="mdi-email"
                  name='email'
                  v-model='email'
                  label='Email'
                  type='text'
                  outlined
                  shaped
                >
                  
                </v-text-field>
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  name='password'
                  v-model='password'
                  label='password'
                  type='password'
                  outlined
                  shaped
                >

                </v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn class="p-2" outlined color="indigo" type="submit">
                  Sign in
                </v-btn>
                <v-spacer></v-spacer>
                <span>No account yet</span>
                <router-link to='signup' style="text-decoration: none;">
                  <v-btn class="ma-2" outlined color="primary">Sign Up</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
    </v-content>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'login',
  data() {
    return{
      email: null,
      password: null,
    }
  },
  computed: {
    ...mapState([
      'loggingIn',
      'loginError',
      'accessToken'
    ])
  },
  methods:{
    ...mapActions([
        'doLogin'
    ]),
    login(){
      this.doLogin({
          email: this.email,
          password: this.password
      })
    }
  }
}
</script>

<style scoped>
.loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,.3);
  }
   img {
        width: 2rem;
        height: 2rem;
      }
</style>