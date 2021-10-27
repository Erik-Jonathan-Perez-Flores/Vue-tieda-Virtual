<template @scroll="scrollhome">
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Lista de usuarios:</h1>
            </v-col>
            <v-col cols="12">
                <Search
                    :place="'Busca algún usuario...'"
                    @search-text="textQuery"
                />
            </v-col>
            <v-col cols="12" v-if="arrUsers.length>0">
                <v-simple-table v-if="usersList">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                Nro
                            </th>
                            <th class="text-left">
                                Nombre
                            </th>
                            <th class="text-left">
                                Correo
                            </th>
                            <th class="text-left">
                                Teléfono
                            </th>
                            <th class="text-left">
                                Compras
                            </th>
                            <th class="text-left">
                                Acción
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(item,index) in arrUsers"
                            :key="index"
                        >
                            <td>{{index+1}}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.buys }}</td>
                            <td>
                                <v-btn text small @click="deleteBtn(item._id,index)" v-if="userDelete">
                                    <v-icon color="accent">{{icon}}</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <Denied v-else />
            </v-col>
            <v-col cols="12" class="d-flex justify-center" v-else>
                <v-icon size="200" color="accent">{{iconDatabase}}</v-icon>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            width="300"
        >
            <v-card class="pa-5" color="accent">
                <v-card-text>
                    <h1 class="white--text text-center">¿Está seguro de eliminar el usuario?</h1>
                </v-card-text>
                <v-card-actions>
                    <v-btn small color="secondary" class="text-capitalize" @click="dialog=false">Cancelar</v-btn>
                    <v-divider></v-divider>
                    <v-btn small color="secondary" class="text-capitalize" @click="deleteUser">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Dialog
            :message="message"
            :dialog="dialogMessage"
            :redir="true"
            @ok-template="ok"
        />
    </v-container>
</template>

<script>

import { mdiDelete,mdiDatabaseRefresh } from '@mdi/js';
import {mapState} from 'vuex';
import Dialog from '@/components/DialogMessage';
import Denied from '@/components/DeniedOperation';
import Search from '@/components/admin/Search';

export default {
    components:{
        Dialog,Denied,Search
    },
    data() {
        return{
            users:[],
            headers:[],
            icon:mdiDelete,
            scrollBottom:false,
            dialog:false,
            dialogMessage:false,
            idDelete:'',
            nro:0,
            message:'',
            iconDatabase:mdiDatabaseRefresh,

            search:'',
            skip:0,
            limit:10,
            callApi:true,
        }
    }, 
    mounted () {
        this.scroll();
    },
    computed:{
        ...mapState(['session']),
        userDelete(){
            return this.session.admin.user;
        },
        usersList(){
            return this.session.admin.avaible;
        },
        arrUsers(){
            return this.users;
        }
    },
    methods:{
        scroll(){
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    this.scrollBottom=true;
                    this.init();
                }
            }
        },
        init(){
            if(!this.callApi)return;
            this.callApi=false;
            this.axios({
                method: 'GET',
                data:null,
                url:'/user/onlyusers?skip='+this.skip+'&limit='+this.limit+'&search='+this.search,
            }).then(response=>{
                if(response.data.length==0){
                    this.callApi=false;
                    return;
                }
                this.callApi=true;
                this.users=this.users.concat(response.data);
                this.skip+=this.limit;
            }).catch(err=>{
                console.log(err);
            });
        },
        deleteUser(){
            this.dialog=false;
            this.axios({
                method: 'DELETE',
                data:null,
                url:'/user/deleteuser/'+this.idDelete,
            }).then(response=>response.data)
            .then(resp=>{
                this.dialogMessage=true;
                this.message=resp.message;
                this.users.splice(this.nro,1);
            })
            .catch(err=>{
                this.dialogMessage=true;
                if (err.response) {
                    this.message=err.response.data.message;
                }else{
                    this.message='Error en la respuesta';
                }
            });
        },
        ok(){
            this.dialogMessage=false;
        },
        textQuery(ob){
            this.search=ob.text;
            this.skip=0;
            this.callApi=true;
            this.users=[];
            this.init();
        },
        deleteBtn(id,n){
            this.dialog=true;
            this.idDelete=id;
            this.nro=n;
        }
    },
    created(){
        this.init();
    }
}
</script>