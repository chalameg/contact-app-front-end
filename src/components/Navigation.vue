<template>
    <v-container>
        <v-app-bar
        app
        color="primary"
        dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <router-link to='/' class='white--text' style="text-decoration: none;">
                <v-toolbar-title>Contact App</v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <div class='hidden-sm-and-down' >
                <router-link to='/contacts' v-if="accessToken" style="text-decoration: none;" class="white--text pl-2">
                    Contacts
                </router-link>
                <router-link to='/contacts/create' v-if="accessToken" style="text-decoration: none;" class="white--text pl-2">
                    Add Contacts
                </router-link>
                
                <router-link to='/signin' v-if="!accessToken" style="text-decoration: none;" class="white--text pl-2">
                    Sign-in
                </router-link>
                <router-link to='/signup' v-if="!accessToken" style="text-decoration: none;" class="white--text pl-2">
                    Sign-up
                </router-link>
                
                <button v-if="accessToken" v-on:click=logout flat>Logout</button>
            </div>
        </v-app-bar>
        <v-navigation-drawer
        class='hidden-md-and-up'
        v-model="drawer"
        absolute
        temporary
        >
            <v-list dense>
                <v-list-item @click="home">
                <v-list-item-action>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Home</v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="accessToken" @click="contact">
                <v-list-item-action>
                    <v-icon>mdi-contacts</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Contacts</v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="!accessToken" @click="signin">
                <v-list-item-action>
                    <v-icon>mdi-login</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Sign-in</v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="!accessToken" @click="signup">
                <v-list-item-action>
                    <v-icon>mdi-account-plus</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Sign-up</v-list-item-title>
                </v-list-item-content>
                </v-list-item>

                <v-list-item v-if="accessToken" v-on:click=logout>
                <v-list-item-action>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>
    </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import router from '../router/router';

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    computed: {
        ...mapState([
        'loggingIn',
        'loginError',
        'accessToken'
        ])
    },
    methods: {
        ...mapActions([
            'logout'
        ]),
        home(){
            router.push('/')
        },
        contact(){
            router.push('/contacts')
        },
        signin(){
            router.push('/signin')
        },
        signup(){
            router.push('/signup')
        },
    },
    
  }
</script>

<style scoped>

</style>