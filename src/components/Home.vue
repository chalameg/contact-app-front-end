<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xm12 sm10 md6>
                    <h1>This is the system where you store your contact information</h1>
                    <h3 class="pt-4">Sign up here to use the system</h3>

                    <div class="pt-4">

                        <router-link to='/signup' style="text-decoration:none; color:white;">
                        <v-btn color='success' outlined light> SignUp</v-btn>
                        </router-link>
                       
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>