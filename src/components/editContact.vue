<template>
  <v-content>
    <v-container>
    <v-layout justify-center >
      <v-flex xm12 sm10 md4>
        <v-form @submit.prevent="saveChanges">
          <v-card class='elevation-1'>
            <v-toolbar light>
              <v-toolbar-title>
                <v-icon>mdi-account-edit</v-icon>
                Edit Contact Info
              </v-toolbar-title>
            </v-toolbar>
  
            <v-card-text>
              <p v-if="addError">{{addError}}</p>
              <v-text-field
                name='firstName'
                label='First Name'
                type='text'
                v-model='firstName'
                value='firstName'
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
                value='lastName'
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
                value='phone'
                outlined
                shaped
                append-icon="mdi-phone"
              >
              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" outlined type="submit">
                Save Changes
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
    userId: 'chala',
    rules: {
      required: value => !!value || 'Required'
    },
    addError: null,
    contactId: '',
  }),
  methods:{
    //get contact to be edited
    getContact(){
      this.contactId = localStorage.getItem('contactId')

      axios.get('http://localhost:3000/contacts/'+this.contactId+'')
      .then(response=>{
        //console.log(response.data.firstName)
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        this.phone = response.data.phone
      })
      .then(error=>{

      })

    },
    //save edited contact
    saveChanges(){
      const data = {
        firstName: this.firstName, 
        lastName: this.lastName, 
        phone: this.phone, 
        image: this.image,
        userId: this.userId, 
      }

      axios.patch('http://localhost:3000/contacts/'+this.contactId+'',data)
      .then(response=>{
        //console.log(response)
      })
      .then(_ => {
          router.push('/contacts')
        })
      .then(error=>{
        this.addError = error.response.data.reeror.message
      })
      //remove contact id after contact is edited
      localStorage.removeItem('contactId')
    }
  }
  ,
  mounted() {
    this.getContact();
    },
}
</script>