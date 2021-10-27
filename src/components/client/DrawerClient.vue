<template>
    <v-navigation-drawer
        v-model="drawerClient"
        app
        width="260"
    >   
        <v-row class="pa-10">
            <v-col cols="12" class="d-flex justify-center">
                <v-avatar size="80" @click="toDetail" style="cursor:pointer">
                    <v-img :src="profileAvatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <h4>{{profileName}}</h4>
            </v-col>
        </v-row>
        <v-list     
            color="transparent"
            nav
            dense
        >
            <template
                v-for="(item,index) in menuItems" class="ma-0 pa-0"
            >
                <v-divider :key="`chatDivider${index}`" class="my-0 ma-0 pa-0" v-if="item.status"/>
                <v-list-item
                    v-if="item.status"
                    :key="`parent${index}`"
                    link
                    :to="item.to"
                    color="primary"
                    class="mt-2"
                    @click="menuActionClick(item.action)"
                >
                    <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>

import { mdiHome,mdiCardAccountPhone,mdiQrcode,mdiLogin,mdiLogout,mdiGoogleMyBusiness } from '@mdi/js';
import {mapState,mapMutations} from 'vuex';

export default {
    data(){
        return{
            items: [],
        }
    },
    methods:{
        ...mapMutations(['pushSession']),
        async menuActionClick(option){
            if(option=='logout'){
                this.axios({
                    method: 'POST',
                    data:null,
                    url:'/user/logout',
                }).then(response=>{
                    this.pushSession(null);
                    if(this.$route.path!='/'){
                        this.$router.push('/');
                    }
                }).catch(err=>{
                    if (err.response) {
                        console.log(err.response.message);
                    }else{
                        console.log(err);
                    }
                });
            }
        },
        toDetail(){
            if(this.$route.path!='/detailsuser'){
                this.$router.push('/detailsuser');
            }
        }
    },
    computed:{
        ...mapState(['session']),
        drawerClient:{
            get(){       
                return this.$store.state.drawerClient;
            },
            set(val){
                this.$store.commit('pushDrawerClient',val);
            }
        },
        menuItems(){
            this.items=[{ title: 'Inicio', icon: mdiHome, to: '/', action:'solve' ,status:true},
                { title: 'Pedidos qr', icon: mdiQrcode, to: '/orders', action:'solve' ,status:this.session},
                { title: 'Servicio técnico', icon: mdiCardAccountPhone, to: '/contact', action:'solve' ,status:this.session},
                { title: 'A cerca de la tienda', icon: mdiGoogleMyBusiness, to: '/clientbusiness', action:'solve' ,status:true},
                { title: 'Iniciar sesión', icon: mdiLogin, to: '/login', action:'solve' ,status:!this.session},
                { title: 'Salir', icon: mdiLogout, action:'logout' ,status:this.session }];
            return this.items;
        },
        profileAvatar(){
            if(!this.session)return require('@/assets/logo.jpeg');
            return this.session.avatar==''?require('@/assets/logo.jpeg'):this.session.avatar;
        },
        profileName(){
            if(!this.session)return '';
            return this.session.name?this.session.name:'';
        },
    },
    watch:{

    },
    created(){
        
    }
}
</script>