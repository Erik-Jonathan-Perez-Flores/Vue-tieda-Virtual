<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Pendientes para consultas:</h1>
            </v-col>
            <v-col cols="12">
                <Search
                    :place="'Busca alguna consulta...'"
                    @search-text="textQuery"
                />
            </v-col>
            <v-col cols="12" v-if="reports.length>0">
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
                                Teléfono
                            </th>
                            <th class="text-left">
                                Correo
                            </th>
                            <th class="text-left">
                                Descripción de la falla
                            </th>
                            <th class="text-left">
                                Fecha
                            </th>
                            <th class="text-left">
                                Hora de la cita
                            </th>
                            <th class="text-left">
                                Imagen
                            </th>
                            <th class="text-left">
                                Acción
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(item,index) in reports"
                            :key="index"
                        >
                            <td>{{index+1}}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ now(item.date) }}</td>
                            <td>{{ hour(item.date) }}</td>
                            <td><img :src="item.path" width="50" height="50" @click="openImg(item.path)" style="cursor:pointer"/></td>
                            <td>
                                <v-btn small @click="toModel(item,index)">{{item.state?'Abierto':'Cerrado'}}</v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col cols="12" class="d-flex justify-center" v-else>
                <v-icon size="200" color="accent">{{iconDatabase}}</v-icon>
            </v-col>
        </v-row>
        <Dialog
            :message="message"
            :dialog="dialog"
            :redir="redir"
            @ok-template="ok"
        />
        <v-dialog
            v-model="dialog2"
            width="400"
        >
            <v-card>
                <v-img :src="OpI" height="400"></v-img>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import Dialog from '@/components/DialogMessage';
import qs from 'qs';
import Search from '@/components/admin/Search';
import { mdiDatabaseRefresh } from '@mdi/js';

export default {
    components:{
        Dialog,Search
    },
    data() {
        return{
            reports:[],
            scrollBottom:false,
            dialog:false,
            dialog2:false,
            redir:false,
            message:'',
            active:false,
            scrollBottom:false,
            OpI:'',
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

    },
    methods:{
        now(x){
            return this.$moment(x).fromNow();
        },
        hour(x){
            let d=new Date(x);
            return (d.getHours()<10?'0'+d.getHours():d.getHours())+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes());
        },
        openImg(x){
            this.dialog2=true;
            this.OpI=x;
        },
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
                url:'/serv?skip='+this.skip+'&limit='+this.limit+'&search='+this.search,
            }).then(response=>{
                if(response.data.length==0){
                    this.callApi=false;
                    return;
                }
                this.callApi=true;
                this.reports=this.reports.concat(response.data);
                this.skip+=this.limit;
            }).catch(err=>{
                console.log(err);
            });
        },
        toModel(it){
            this.axios({
                method: 'PATCH',
                data:qs.stringify({state:!it.state}),
                url:'/serv/'+it._id,
            }).then(response=>{
                this.dialog=true;
                this.message=response.data.message+'';
                this.redir=response.data.status;
                it.state=!it.state;
            }).catch(err=>{
                this.dialog=true;
                if (err.response) {
                    this.message=err.response.data.message;
                }else{
                    this.message='Error en la respuesta';
                }
            });
        },
        ok(){
            this.dialog=false;
        },
        textQuery(ob){
            this.search=ob.text;
            this.skip=0;
            this.callApi=true;
            this.reports=[];
            this.init();
        }
    },
    created(){
        this.init();
    }
}
</script>