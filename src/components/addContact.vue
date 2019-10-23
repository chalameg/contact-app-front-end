<template>
  <v-content>
    <v-container>
    <v-layout justify-center >
      <v-flex xm12 sm10 md4>
        <v-form @submit.prevent="submit">
          <v-card class='elevation-10'>
            <v-toolbar dark>
              <v-toolbar-title>
                Add Contact
              </v-toolbar-title>
            </v-toolbar>
            
            <v-card-text>
              <v-alert
              v-bind:style='{display : displayNone}'
              :value='true'
              color='error'
              >
              <v-icon>mdi-warnig</v-icon>
              Account already exists with this email.
              </v-alert>
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
              >
              </v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" dark>
                Add
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
export default {
  data: () =>({
    firstName : '',
    lastName : '',
    phone : '',
    displayNone: 'none',
    rules: {
      required: value => !!value || 'Required'
    }
  })
}
</script>