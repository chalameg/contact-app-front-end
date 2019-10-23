<template>
    <v-content>
    <v-container fluid>
    <v-layout align-center justify-center>
    <v-flex xm12 sm10 md8>
      <h1>contacts</h1>

      <div class="row" v-for="contact in contacts" :key="contact.id">
        <div class="col-md-3">{{contact.firstName}}</div>
        <div class="col-md-3">{{contact.lastName}}</div>
        <div class="col-md-3">{{contact.phone}}</div>
        <div class="col-md-1">
          <button light>
            <v-icon color="dark">mdi-dots-vertical</v-icon>
          </button>
          
        </div>
      </div>

      <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="pink"
        @click='add'
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-flex>
    </v-layout>
    </v-container>
    </v-content>
</template>


<script>
  import axios from 'axios';
  import router from '../router/router';

  export default {
    name: 'contacts',
    components: {
    },
    data: () => {
      return {
        contacts: [],
        numberOfContacts:1,
        token: localStorage.getItem('accessToken')
      };
    },

  methods: {
    getContacts(){
        axios.get('http://localhost:3000/contacts').then(response =>{
          //console.log(response)

          this.contacts = response.data
        })
    },
    add(){
            return router.push('/contacts/create')
        }
  },
  mounted() {
    this.getContacts();
    },
  }
</script>