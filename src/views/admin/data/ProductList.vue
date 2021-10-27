<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Lista de Productos:</h1>
            </v-col>
            <v-col cols="12">
                <Search
                    :place="'Busca algún producto...'"
                    @search-text="textQuery"
                />
            </v-col>
            <v-col cols="12" v-if="products.length>0">
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
                                Activo/Inactivo (producto)
                            </th>
                            <th class="text-left">
                                Precio de venta
                            </th>
                            <th class="text-left">
                                Descuento
                            </th>
                            <th class="text-left">
                                Activo/Inactivo (descuento)
                            </th>
                            <th class="text-left">
                                Acción
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(item,index) in products"
                            :key="index"
                        >
                            <td>{{index+1}}</td>
                            <td>{{ item.name }}</td>
                            <td >
                                <v-switch
                                    v-model="item.status"
                                    color="secondary"
                                    @click="activeProduct(item)"
                                ></v-switch>
                            </td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.discount }}</td>
                            <td >
                                <v-switch
                                    v-model="item.stateDiscount"
                                    color="secondary"
                                    @click="as(item)"
                                ></v-switch>
                            </td>
                            <td>
                                <v-btn text small @click="editProduct(item._id)">
                                    <v-icon color="accent">{{edit}}</v-icon>
                                </v-btn>
                                <v-btn text small @click="deleteProduct(item._id,index)">
                                    <v-icon color="accent">{{elim}}</v-icon>
                                </v-btn>
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
        <v-dialog
            v-model="dialogElim"
            width="300"
        >
            <v-card class="pa-5" color="accent">
                <v-card-text>
                    <h1 class="white--text text-center">¿Está seguro de eliminar el producto?</h1>
                </v-card-text>
                <v-card-actions>
                    <v-btn small color="secondary" class="text-capitalize" @click="dialogElim=false">Cancelar</v-btn>
                    <v-divider></v-divider>
                    <v-btn small color="secondary" class="text-capitalize" @click="sendDeleteProduct()">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog2"
            width="300"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h1 class="text-center">{{message2}}</h1>
                </v-card-text>
                <v-card-actions>
                    <v-divider></v-divider>
                    <v-btn small color="secondary" class="text-capitalize" @click="dialog2=false">okay</v-btn>
                    <v-divider></v-divider>
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

import { mdiPencilOutline,mdiTrashCanOutline,mdiDatabaseRefresh } from '@mdi/js';
import qs from 'qs';
import Search from '@/components/admin/Search';

export default {
    components:{
        Search
    },
    data() {
        return{
            products:[],
            edit:mdiPencilOutline,
            elim:mdiTrashCanOutline,
            dialogElim:false,
            dialog:false,
            dialog2:false,
            skip:0,
            limit:10,
            call:true,
            scrolledToBottom:true,
            message:'',
            message2:'',
            redir:false,
            iconDatabase:mdiDatabaseRefresh,

            search:'',
            elimnId:'',
            pos:0,
        }
    },
    mounted(){
        this.scroll();
    },
    methods:{
        editProduct(id){
            this.$router.push('/producteditadm/'+id);
        },
        deleteProduct(id,i){
            this.dialogElim=true;
            this.elimnId=id;
            this.pos=i;
        },
        sendDeleteProduct(){
            this.axios({
                method: 'DELETE',
                data:null,
                url:'/product/'+this.elimnId,
            }).then(response=>{
                this.dialogElim=false;
                this.dialog=true;
                this.message=response.data.message+'';
                this.redir=response.data.status;
                if(response.data.status){
                    this.products.splice(this.pos,1);
                }
            }).catch(err=>{
                this.dialogElim=false;
                this.dialog=true;
                if (err.response) {
                    this.message=err.response.data.message;
                }else{
                    this.message='Error en la respuesta';
                }
            });
        },
        scroll () {
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    if(this.call&&this.scrolledToBottom){
                        this.scrolledToBottom=false;
                        this.init();   
                    }
                }
            }
        },
        init(){
            if(!this.call)return;
            this.call = false;
            this.axios({
                method: 'GET',
                data:null,
                url:'/product/listAdmin?skip='+this.skip+'&limit='+this.limit+'&search='+this.search,
            }).then(response=>response.data)
            .then(resp=>{
                if(resp&&resp.length>0){
                    this.products=this.products.concat(resp);
                    this.skip+=10;
                    this.scrolledToBottom=true;
                    this.call = true;
                    return;
                }
                this.call = false;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        ok(){
            this.dialog=false;
        },
        as(item){
            this.dialog2=true;
            this.axios({
                method: 'PATCH',
                data:qs.stringify({
                    stateDiscount:item.stateDiscount
                }),
                url:'/product/discount/'+item._id,
            }).then(response=>{
                this.message2=response.data.message+'';
            }).catch(err=>{
                if (err.response) {
                    this.message2=err.response.data.message;
                }else{
                    this.message2='Error en la respuesta';
                }
            });
        },
        activeProduct(item){
            this.dialog2=true;
            this.axios({
                method: 'PATCH',
                data:qs.stringify({
                    status:item.status
                }),
                url:'/product/status/'+item._id,
            }).then(response=>{
                this.message2=response.data.message+'';
            }).catch(err=>{
                if (err.response) {
                    this.message2=err.response.data.message;
                }else{
                    this.message2='Error en la respuesta';
                }
            });
        },
        textQuery(ob){
            this.search=ob.text;
            this.skip=0;
            this.callApi=true;
            this.products=[];
            this.init();
        }
    },
    created(){
        this.init();
    },
}
</script>