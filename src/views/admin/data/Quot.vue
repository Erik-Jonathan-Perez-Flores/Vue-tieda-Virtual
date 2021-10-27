<template @scroll="scrollhome">
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Lista de cotizaciones:</h1>
            </v-col>
            <v-col cols="12">
                <Search/>
            </v-col>
            <v-col cols="12" v-if="quots.length==0" class="d-flex justify-center">
                <v-icon size="200" color="accent">{{iconDatabase}}</v-icon>
            </v-col>
            <v-col cols="12" v-else>
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
                                Correo
                            </th>
                            <th class="text-left">
                                Atendido NO/SI
                            </th>
                            <th class="text-left">
                                Responder
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(item,index) in quots"
                            :key="index"
                        >
                            <td>{{index+1}}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>
                                <v-switch
                                    v-model="item.state"
                                    color="secondary"
                                    @click="activeState(item)"
                                ></v-switch>
                            </td>
                            <td>
                                <v-btn text small @click="toQuot(item._id)">
                                    <v-icon color="accent">{{icon}}</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <Dialog
            :message="message"
            :dialog="dialog"
            :redir="redir"
            @ok-template="ok"
        />
    </v-container>
</template>

<script>

import { mdiCardAccountDetailsStarOutline, mdiDatabaseRefresh } from '@mdi/js';
import qs from 'qs';
import Dialog from '@/components/DialogMessage';
import Search from '@/components/admin/SearchCotization';


export default {
    components:{
        Dialog,Search
    },
    data() {
        return{
            quots:[],
            icon:mdiCardAccountDetailsStarOutline,
            scrollBottom:false,
            dialog:false,
            iconDatabase:mdiDatabaseRefresh,

            skip:0,
            limit:10,
            callApi:true,

            dialog:false,
            message:'',
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
        toQuot(id){
            this.$router.push('/detailsquot/'+id);
        },
        init(){
            if(!this.callApi)return;
            this.callApi=false;
            this.axios({
                method: 'GET',
                data:null,
                url:'/cotz?skip='+this.skip+'&limit='+this.limit,
            }).then(response=>response.data)
            .then(resp=>{
                this.quots=resp;
                this.callApi=true;
                if(resp.length==0)this.callApi=false;
                this.skip+=this.limit;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        activeState(item){
            this.axios({
                method: 'PUT',
                data:qs.stringify({
                    state:item.state
                }),
                url:'/cotz/'+item._id,
            }).then(response=>{
                this.dialog=true;
                this.message=response.data.message+'';
                this.redir=response.data.status;
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
        }
    },
    created(){
        this.init();
    }
}
</script>