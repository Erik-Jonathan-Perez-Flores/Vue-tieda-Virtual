<template>
  <v-app> 
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  async created(){
    this.$store.dispatch("getPermissions");
  }
};
</script>
