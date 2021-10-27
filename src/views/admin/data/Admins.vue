<template @scroll="scrollhome">
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Lista de Admins (permisos):</h1>
            </v-col>
            <v-col cols="12">
                <v-simple-table>
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
                                Eliminar usuarios
                            </th>
                            <th class="text-left">
                                Publicar
                            </th>
                            <th class="text-left">
                                Servicio técnico
                            </th>
                            <th class="text-left">
                                Reportes
                            </th>
                            <th class="text-left">
                                Cotizaciones
                            </th>
                            <th class="text-left">
                                Generar qr de pagos
                            </th>
                            <th class="text-left">
                                Acción
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(item,index) in admins"
                            :key="index"
                        >
                            <td>{{index+1}}</td>
                            <td>{{ item.name }}</td>
                            <td><v-checkbox v-model="item.user"></v-checkbox></td>
                            <td><v-checkbox v-model="item.publish"></v-checkbox></td>
                            <td><v-checkbox v-model="item.service"></v-checkbox></td>
                            <td><v-checkbox v-model="item.reports"></v-checkbox></td>
                            <td><v-checkbox v-model="item.cotization"></v-checkbox></td>
                            <td><v-checkbox v-model="item.qr"></v-checkbox></td>
                            <td>
                                <v-btn text small @click="updateUser(item)">
                                    <v-icon color="accent">{{update}}</v-icon>
                                </v-btn>
                                <v-btn text small @click="saveIdDelete(item._id,index)">
                                    <v-icon color="accent">{{icon}}</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialogAction"
            width="300"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h1 class="text-center">¿Está seguro de eliminar el usuario?</h1>
                </v-card-text>
                <v-card-actions>
                    <v-btn small color="secondary" class="text-capitalize" @click="dialogAction=false">Cancelar</v-btn>
                    <v-divider></v-divider>
                    <v-btn small color="secondary" class="text-capitalize" @click="deleteUser">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Dialog
            :message="message"
            :dialog="dialog"
            :redir="redir"
            @ok-template="ok"
        />
    </v-container>
</template>

<script>

import { mdiDeleteOutline,mdiUpdate } from '@mdi/js';
import qs from 'qs';
import Dialog from '@/components/DialogMessage';

export default {
    components:{
        Dialog
    },
    data() {
        return{
            admins:[],
            icon:mdiDeleteOutline,
            update:mdiUpdate,
            scrollBottom:false,
            dialogAction:false,
            idDelete:'',
            posDelete:0,

            skip:0,
            limit:10,
            callApi:true,

            message:'',
            dialog:false,
            redir:false,
        }
    },
    mounted () {
        this.scroll();
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
            this.axios({
                method: 'GET',
                data:null,
                url:'/admin/useradmins?skip='+this.skip+'&limit='+this.limit,
            }).then(response=>{
                if(response.data.length==0){
                    this.callApi=false;
                    return;
                }
                this.admins=this.admins.concat(response.data);
                this.skip+=this.limit;
            }).catch(err=>{
                console.log(err);
            });
        },
        updateUser(item){
            this.dialogAction=false;
            this.axios({
                method: 'PATCH',
                data:qs.stringify(item),
                url:'/admin/update/'+item._id,
            }).then(response=>response.data)
            .then(resp=>{
                this.dialog=true;
                this.message=resp.message;
                this.redir=true;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        ok(){
            this.dialog=false;
        },
        saveIdDelete(id,i){
            this.idDelete=id;
            this.posDelete=i;
            this.dialogAction=true;
        },
        deleteUser(){
            this.dialogAction=false;
            this.axios({
                method: 'DELETE',
                data:null,
                url:'/admin/delete/'+this.idDelete,
            }).then(response=>response.data)
            .then(resp=>{
                this.dialog=true;
                this.message=resp.message;
                this.redir=true;
                this.admins.splice(this.posDelete,1);
            })
            .catch(err=>{
                console.log(err);
            });
        }
    },
    created(){
        this.init();
    }
}
</script>