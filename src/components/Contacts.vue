<template>
    <v-content>
    <v-container fluid>
    <v-layout align-center justify-center>
    <v-flex xm12 sm10 md8>

      <v-data-table
        :headers="headers"
        :items="contacts"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">

            <v-toolbar-title>MY CONTACTS</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Contact</v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>

              </v-card>

            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-tooltip-edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        
      </v-data-table>

      <!-- <v-btn
        absolute
        dark
        fab
        bottom
        right
        color="pink"
        @click='add'
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn> -->
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
        token: localStorage.getItem('accessToken'),
        userId:localStorage.getItem('userId'),
  
        dialog: false,
        headers: [
          {
            text: 'First Name',
            align: 'left',
            value: 'firstName',
          },
          { text: 'Last Name', value: 'lastName' },
          { text: 'Phone', value: 'phone' },
          { text: 'Actions', value: 'action', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
          firstName: '',
          lastName: '',
          phone: '',
          id: '',
          userId: '',
        },
        search: '',
      };
    },
  

  methods: {

    //get contacts from the api 
    getContacts(){
        // axios.get('http://localhost:3000/users/'+this.userId+'/contacts').then(response =>{
        //   this.contacts = response.data
        // })

        axios.get('http://localhost:3000/contacts').then(response =>{
          this.contacts = response.data
        })
    },

    //go to add contact page
    add(){
        return router.push('/contacts/create')
    },
    
    editItem (item) {
      this.editedIndex = this.contacts.indexOf(item)
      //console.log(this.item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.contacts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      confirm('Are you sure you want to delete this contact?')
      //console.log(this.editedItem.id)
      axios.delete('http://localhost:3000/contacts/'+this.editedItem.id+'').then(response =>{
          //refresh page after contact removal
          window.location.reload()
      })
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        const data = {
          firstName: this.editedItem.firstName, 
          lastName: this.editedItem.lastName, 
          phone: this.editedItem.phone, 
          image: this.editedItem.image,
          userId: this.editedItem.userId, 
        }

        axios.patch('http://localhost:3000/contacts/'+this.editedItem.id+'',data)
        .then(response=>{
          //console.log('saved')
        })
        //refresh page after contact removal
        window.location.reload()

      }
      else {
          const data = {
          firstName: this.editedItem.firstName, 
          lastName: this.editedItem.lastName, 
          phone: this.editedItem.phone, 
          image: this.editedItem.image,
          userId: this.userId, 
        }

        axios.post('http://localhost:3000/users/'+this.userId+'/contact',data)
        .then(response=>{
          //console.log('saved')
        })
        //refresh page after contact removal
        window.location.reload()
      }
      this.close()
    },

  },

  //title of dialog
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Contact' : 'Edit Contact'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  mounted() {
    this.getContacts();
    },
  }
</script>