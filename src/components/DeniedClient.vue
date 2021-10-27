<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-icon size="200" color="error">{{icon}}</v-icon>
            </v-col>
            <v-col cols="12" >
                <h1 class="text-center error--text">No tienes acceso a este sitio</h1>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">      
                <a href="/login" class="btn" id="link"> <b>Iniciar Sesión</b> </a>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { mdiCancel } from '@mdi/js';

export default {
    data() {
        return{
            icon:mdiCancel
        }
    },
    method:{
        toLogin(){
            this.$router.push('/login');
        }
    }
}
</script>