<template>
    <!--aqui cambias todo el degradado del appbar del cliente-->
    <v-app-bar
        app  
        style="background: linear-gradient(90deg, rgba(226,221,221,1) 0%, rgba(103,125,172,0.44441526610644255) 23%, rgba(60, 189, 121) 88%);"
        height="80"
    >
        <v-app-bar-nav-icon @click="pushDrawerClient(!drawerClient)"></v-app-bar-nav-icon>
        <v-spacer/>
        <v-row>
            <v-col cols="12" class="d-flex justify-end" v-if="session">
                <v-btn width="50" icon dark large @click="toAdmin">
                    <v-icon size="40">{{admin}}</v-icon>
                </v-btn>
                <v-btn width="50" icon dark large @click="toShopping" v-if="notification>0">
                    <v-badge overlap color="accent" :content="notification" style="top:10px">
                        <v-icon size="40" class="mb-4">{{cart}}</v-icon>
                    </v-badge>
                </v-btn>
                <v-btn width="50" icon dark large @click="toShopping" v-else>
                    <v-icon size="40">{{cart}}</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12" class="d-flex justify-end" v-else>
                <v-btn width="50" icon dark large @click="toAdmin">
                    <v-icon size="40">{{admin}}</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script>

import {mdiCartVariant,mdiAccountBox} from '@mdi/js'
import {mapState,mapMutations} from 'vuex'

export default {
    data(){
        return{
            cart:mdiCartVariant,
            admin:mdiAccountBox
        }
    },
    computed:{
        ...mapState(['drawerClient','session','notification']),
    },
    methods:{
        ...mapMutations(['pushDrawerClient','pushNotification']),
        toShopping(){
            if(this.$route.path!='/shoppingcart'){
                if(this.session)
                    this.$router.push('/shoppingcart');
            }
        },
        init(){
            if(!this.session)return;
            this.axios({
                method: 'GET',
                data:null,
                url:'/cart/count',
            }).then(response=>response.data)
            .then(resp=>{
                this.pushNotification(resp.count);
            })
            .catch(err=>{
                
            });
        },
        toAdmin(){
            this.$router.push('/admin');
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