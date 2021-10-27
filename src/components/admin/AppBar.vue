<template>
    <!--degradado del appbar del admin-->
    <v-app-bar 
        app 
        style="background: linear-gradient(90deg, rgba(226,221,221,1) 0%, rgba(103,125,172,0.44441526610644255) 23%, rgba(60, 189, 121) 88%);"
        height="80"
    >
        <v-app-bar-nav-icon @click="pushDrawer(!drawer)"></v-app-bar-nav-icon>
        <v-spacer/>
        <v-row>
            <v-col cols="12" class="d-flex justify-end" v-if="qr">
                <v-btn width="50" icon dark large @click="toQr" v-if="notification>0">
                    <v-badge overlap :content="notification" color="accent" style="top:10px">
                        <v-icon size="40" class="mb-4">{{icon}}</v-icon>
                    </v-badge>
                </v-btn>
                <v-btn width="50" icon dark large @click="toQr" v-else>
                    <v-icon size="40">{{icon}}</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>

import {mdiQrcodeScan} from '@mdi/js'
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return{
            icon:mdiQrcodeScan
        }
    },
    computed:{
        ...mapState(['drawer','session','notification']),
        qr(){
            if(this.session&&this.session.admin.qr) return true;
            return false;
        }
    },
    methods:{
        ...mapMutations(['pushDrawer','pushNotification']),
        toQr(){
            if(this.$route.path!='/reqqr'){
                this.$router.push('/reqqr');
            }
        },
        init(){
            if(!this.session||!this.session.admin.qr)return;
            this.axios({
                method: 'GET',
                data:null,
                url:'/qr/count',
            }).then(response=>response.data)
            .then(resp=>{
                this.pushNotification(resp.count);
            })
            .catch(err=>{
                
            });
        }
    },
    watch:{
        /*storeid:{
            handler: function(val, oldVal) {
                this.countBadge();
            },
            deep: true
        }*/
    },
    created(){
        this.init();
    }
}
</script>