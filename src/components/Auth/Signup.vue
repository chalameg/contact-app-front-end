<template>
  <v-content>
    <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xm12 sm8 md8>
        <v-form @submit.prevent='submitForm'>
          <v-card class='elevation-0'>
            <v-toolbar light class='elevation-1'>
              <v-toolbar-title>
                <v-icon>mdi-account</v-icon>
                Create Account
              </v-toolbar-title>
            </v-toolbar>
      
            <v-card-text>
              <p v-if="signupError">{{signupError}}</p>
              <div class="row">
                <div class="col-md-6">
                  <v-text-field
                    name='firstName'
                    label='First Name'
                    type='text'
                    v-model='firstName'
                    :rules = '[rules.required]'
                    outlined
                    shaped
                  > 
                  </v-text-field>
                  <v-text-field
                    name='lastName'
                    label='Last Name'
                    type='text'
                    :rules = '[rules.required]'
                    v-model='lastName'
                    outlined
                    shaped
                  >
    
                  </v-text-field>
                </div>
                <div class="col-md-6">
                  <v-text-field
                    name='email'
                    label='Email'
                    type='text'
                    :rules = '[rules.required]'
                    v-model='email'
                    outlined
                    shaped
                  > 
                  </v-text-field>

                  <v-text-field
                    name='password'
                    label='Password'
                    type='password'
                    :rules = '[rules.required]'
                    v-model='password'
                    outlined
                    shaped
                  >
                  </v-text-field>
                </div>
              </div>
              
            </v-card-text>

            <v-card-actions>
              <v-btn color="indigo" outlined type='submit'>
                Sign Up
              </v-btn>
              <v-spacer></v-spacer>
              <span>Already have account</span>
              <router-link to='/login' style="text-decoration: none;">
              <v-btn outlined color="primary">Sign in</v-btn>
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
import axios from 'axios';
import router from "../../router/router";

export default {
  data: () =>({
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    rules: {
      required: value => !!value || 'Required'
    },
    signupError: null,
  }),
  methods:{
    submitForm(){
      //console.log(this.firstName)
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }

      axios.post('http://localhost:3000/users',data)
      .then(response =>{
        //console.log(response)
      })
      .then(_ => {
          router.push('/signin')
        })
      .catch(error=>{
        //console.log(error.response.data.error)
        this.signupError = error.response.data.error.message
      })
    }
  }
}
</script>