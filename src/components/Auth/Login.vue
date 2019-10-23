<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xm12 sm10 md4>
        <v-form @submit.prevent="submit">
          <v-card class='elevation-10'>
            <v-toolbar dark>
              <v-toolbar-title>
                LOGIN
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
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
              <v-btn color="primary" dark type="submit">
                Sign in
              </v-btn>
              <v-spacer></v-spacer>
              <v-span>No account yet</v-span>
              <v-btn dark color="indigo" class="ml-2">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

  data() {
    return{
      email: null,
      password: null,
    }
  },
  methods:{
    submit(){
      //this.email = 
      alert(this.email + this.password)
    }
  }
}
</script>