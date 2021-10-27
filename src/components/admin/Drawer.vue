<template>
    <v-navigation-drawer
        v-model="drawer"
        app
        width="260"
    >   
        <v-row class="pa-5">
            <v-col cols="12" class="d-flex justify-center">
                <v-avatar size="80" @click="toDetail" style="cursor:pointer">
                    <v-img :src="profileAvatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <h4>{{session.name}}</h4>
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

import { 
        mdiHome,
        mdiLogout,
        mdiCloudUpload,
        mdiClipboardListOutline,
        mdiCogTransferOutline,
        mdiCommentQuote,
        mdiDomain,
        mdiFileChart,
        mdiBadminton,
        mdiShapeOutline
    } from '@mdi/js';

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
                    this.$router.push('/');
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
            this.$router.push('/detailsadmin');
        }
    },
    computed:{
        ...mapState(['session']),
        drawer:{
            get(){       
                return this.$store.state.drawer;
            },
            set(val){
                this.$store.commit('pushDrawer',val);
            }
        },
        menuItems(){
            this.items=[{ title: 'Inicio', icon: mdiHome, to: '/homeadm', action:'solve',status:this.avaible},
                { title: 'Subir producto', icon: mdiCloudUpload, to: '/uploadadm', action:'solve',status:this.publish},
                { title: 'Lista de productos', icon: mdiClipboardListOutline, to: '/productlistadm', action:'solve',status:this.publish},
                { title: 'Solicitudes servicio técnico', icon: mdiCogTransferOutline, to: '/techservice', action:'solve',status:this.service},
                { title: 'Datos de la empresa', icon: mdiDomain, to: '/business', action:'solve',status:this.super},
                { title: 'Reportes', icon: mdiFileChart, to: '/reports', action:'solve',status:this.reports},
                { title: 'Cotizaciones', icon: mdiCommentQuote, to: '/quot', action:'solve',status:this.cotization},
                { title: 'Insertar categoría', icon: mdiShapeOutline, to: '/uploadcategory', action:'solve',status:this.publish},
                { title: 'Lista de categorías', icon: mdiClipboardListOutline, to: '/categorylist', action:'solve',status:this.publish},
                { title: 'Administradores', icon: mdiBadminton, to: '/admins', action:'solve',status:this.super},
                { title: 'Salir', icon: mdiLogout, action:'logout',status:true }];
            return this.items;
        },
        profileAvatar(){
            return this.session.avatar==''?require('@/assets/logo.jpeg'):this.session.avatar;
        },
        avaible(){
            return this.session.admin.avaible;
        },
        cotization(){
            return this.session.admin.cotization;
        },
        publish(){
            return this.session.admin.publish;
        },
        reports(){
            return this.session.admin.reports;
        },
        service(){
            return this.session.admin.service;
        },
        super(){
            return this.session.admin.super;
        }
    },
    watch:{

    },
    created(){
    }
}
</script>