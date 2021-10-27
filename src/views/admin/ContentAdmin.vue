<template>
    <v-container fill-height v-if="session&&session.admin">
        <AppBar/>
        <Drawer/>
        <v-main>
            <router-view/>
        </v-main>
        <Footer/>
    </v-container>
    <v-container fill-height v-else>
        <Denied/>
    </v-container>
</template>

<script>

import AppBar from '@/components/admin/AppBar';
import Drawer from '@/components/admin/Drawer';
import Footer from '@/components/admin/Footer';
import Denied from '@/components/Denied';

import {mapState} from 'vuex';

export default {
    components:{
        AppBar,Drawer,Footer,Denied
    },
    data() {
        return{}
    },
    computed:{
        ...mapState(['session'])
    },
    created(){
        if(!this.session){
            this.$router.push('/admin');
        }
    }
}
</script>