<template>
  <v-content>
    <v-container>
    <v-layout justify-center >
      <v-flex xm12 sm10 md4>
        <v-form @submit.prevent="submitContact">
          <v-card class='elevation-1'>
            <v-toolbar light>
              <v-toolbar-title>
                <v-icon>mdi-phone-plus</v-icon>
                Add Contact
              </v-toolbar-title>
            </v-toolbar>
  
            <v-card-text>
              <p v-if="addError">{{addError}}</p>
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

              <v-text-field
                name='phone'
                label='Phone'
                type='text'
                :rules = '[rules.required]'
                v-model='phone'
                outlined
                shaped
                append-icon="mdi-phone"
              >
              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" outlined type="submit">
                Add Contact
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
  </v-content>
</template>

<script>

import axios from "axios";
import router from "../router/router"
export default {
  data: () =>({
    firstName : '',
    lastName : '',
    phone : '',
    image: '',
    userId: localStorage.getItem('userId'),
    rules: {
      required: value => !!value || 'Required'
    },
    addError: null,
  }),
  methods:{
    submitContact(){
      const data = {
        firstName: this.firstName, 
        lastName: this.lastName, 
        phone: this.phone, 
        image: this.image,
        userId: this.userId, 
      }

      axios.post('http://localhost:3000/users/'+this.userId+'/contact',data)
      .then(response=>{
        //console.log(response)
      })
      .then(_ => {
          router.push('/contacts')
        })
      .then(error=>{
        this.addError = error.response.data.message
      })

      

    }
  }
}
</script>