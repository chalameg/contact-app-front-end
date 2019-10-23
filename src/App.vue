<template>
  <v-app>
    <Navigation/>
    <router-view/>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Navigation,Footer
  },
  data: () => ({
    //
  }),
  
  methods: {
    ...mapActions([
      'fetchAccessToken'
    ]),
  },
  created() {
    this.fetchAccessToken();
  }

};
</script>
