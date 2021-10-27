<template>
    <!--aqui cambias todo el degradado del contenido-->
    <v-container fill-height fluid style="background: linear-gradient(90deg, rgba(226,221,221,1) 0%, rgba(103,125,172,0.44441526610644255) 23%, rgba(60, 189, 121) 88%);">
        <AppBar/>
        <Drawer/> 
        <v-main>
            <router-view/>
        </v-main>
        <Footer/>
    </v-container>
</template>

<script>

import AppBar from '@/components/client/AppBarClient';
import Drawer from '@/components/client/DrawerClient';
import Footer from '@/components/client/FooterClient';

export default {
    components:{
        AppBar,Drawer,Footer
    },
    data() {
        return{}
    },
}
</script>