<template>
    <Denied v-if="!session"/>
    <v-container fill-height v-else>
        <v-row align="start">
            <v-col cols="12">
                <v-tabs
                    v-model="tab"
                    background-color="accent"
                    center-active
                    dark
                >
                    <v-tabs-slider color="secondary"></v-tabs-slider>

                    <v-tab
                        v-for="item in items"
                        :key="item"
                    >
                        {{ item }}
                    </v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12" v-if="tab==0">
                <v-row>
                    <v-col cols="12">
                        <h1 class="accent--text">Carrito de compras</h1>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-row v-if="shoppingcart.length==0" justify="center">
                            <v-col cols="12">
                                <h4 class="text-center accent-text">No se encontraron resultados</h4>
                            </v-col>
                            <v-col cols="12" class="d-flex justify-center">
                                <v-icon color="accent" size="200">{{emptyResponse}}</v-icon>
                            </v-col>
                        </v-row>
                        <v-row v-for="(item,index) in shoppingcart" :key="index" v-else>
                            <Cart
                                :path="item.defaultImg"
                                :description="item.description"
                                :_id="item._id"
                                :price="item.price"
                                :name="item.name"
                                :quantity="item.quantity"
                                @delete-item-cart="deleteCart"
                            />
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-row>
                            <v-col cols="12">
                                <v-card>
                                    <v-card-text>
                                        <h1 class="accent--text text-center">precio</h1>
                                        <hr class="mt-4 mb-4">
                                        <h4 v-for="(item,k) in shoppingcart" :key="k">{{item.price*item.quantity}} BOB</h4>
                                        <hr class="mt-4 mb-4">
                                        <h2 class="accent--text text-center">total: {{total}} BOB</h2>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="12" class="d-flex justify-center" v-if="shoppingcart.length>0">
                                <v-btn color="secondary" x-large class="text-capitalize" @click="pay">Ralizar Compra</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" v-else>
                <v-row>
                    <v-col cols="12">
                        <h1 class="accent--text">Cotizar productos</h1>
                    </v-col>
                    <v-col cols="12">
                        <h3 class="accent--text text-center">Nuestro equipo se pondrá en contacto con ud.</h3>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-row>
                            <v-col cols="12"><h4 class="text-center accent--text">Enviar consulta</h4></v-col>
                            <v-col cols="12" class="d-flex justify-center"><v-icon color="accent" size="50">{{upload}}</v-icon></v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-row>
                            <v-col cols="12"><h4 class="text-center accent--text">Cancelar consulta</h4></v-col>
                            <v-col cols="12" class="d-flex justify-center"><v-icon color="accent" size="50">{{cancel}}</v-icon></v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-row>
                            <v-col cols="12"><h4 class="text-center accent--text">Eliminar consulta</h4></v-col>
                            <v-col cols="12" class="d-flex justify-center"><v-icon color="accent" size="50">{{deleteCot}}</v-icon></v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-row>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12">
                                        <p class="accent--text">Nombre :</p>
                                    </v-col>
                                    <v-col cols="12">
                                        <p>{{name}}</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" class="accent--text">
                                        <p>Correo :</p>
                                    </v-col>
                                    <v-col cols="12">
                                        <p>{{email}}</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" class="accent--text">
                                        <p>Teléfono :</p>
                                    </v-col>
                                    <v-col cols="12">
                                        <p>{{phone}}</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="8">
                        <v-row v-if="cotization.length==0" justify="center">
                            <v-col cols="12">
                                <h4 class="text-center accent-text">No se encontraron resultados</h4>
                            </v-col>
                            <v-col cols="12" class="d-flex justify-center">
                                <v-icon color="accent" size="200">{{emptyResponse}}</v-icon>
                            </v-col>
                        </v-row>
                        <v-row v-for="(item,index) in cotization" :key="index" v-else>
                            <Cotz
                                :path="item.defaultImg"
                                :description="item.description"
                                :_id="item._id"
                                :price="item.price"
                                :confirm="item.confirm"
                                :name="item.name"
                                :quantity="item.quantity"
                                @delete-item-cotz="deleteCotz"
                                @confirm-cotz="confirmCotz"
                                @cancel-cotz="cancelCotz"
                            />
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            width="300"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h4 class="accent--text text-center">{{message}}</h4>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small color="accent" @click="dialog=false">Okay</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog2"
            width="300"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h4 class="accent--text text-center">{{message}}</h4>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small color="accent" @click="dialog2=false">Okay</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import Cart from '@/components/client/ItemShoppingCart';
import Cotz from '@/components/client/ItemCotization';
import Denied from '@/components/DeniedClient';
import {mapState,mapMutations} from 'vuex';
import qs from 'qs';
import {mdiDelete,mdiCloudUploadOutline,mdiCloseOctagon,mdiDatabaseSearchOutline} from '@mdi/js'

export default {
    components:{
        Cart,Cotz,Denied
    },
    data() {
        return{
            shoppingcart:[],
            cotization:[],
            tab: null,
            items: [
                'Carrito','Cotizaciones',
            ],
            valid:false,
            name:'',
            email:'',
            phone:'',

            dialog:false,
            dialog2:false,
            message:'',

            deleteCot:mdiDelete,
            upload:mdiCloudUploadOutline,
            cancel:mdiCloseOctagon,
            emptyResponse:mdiDatabaseSearchOutline
        }
    },
    methods:{
        ...mapMutations(['pushNotification']),
        SendRequ(){

        },
        pay(){
            this.$router.push('/payment');
        },
        init(){
            if(!this.session)return;
            this.axios({
                method: 'GET',
                data:null,
                url:'/cart/shoppingcart',
            }).then(response=>response.data)
            .then(resp=>{
                this.shoppingcart=resp.cart;
            })
            .catch(err=>{
                console.log(err);
            });

            this.axios({
                method: 'GET',
                data:null,
                url:'/cart/cotization',
            }).then(response=>response.data)
            .then(resp=>{
                this.cotization=resp.cotization.products;
                this.name=resp.cotization.name;
                this.email=resp.cotization.email;
                this.phone=resp.cotization.phone;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        deleteCotz(ob){
            let pos=this.cotization.findIndex(dat=>{return dat._id==ob.id});
            if(pos!=-1){
                this.axios({
                    method: 'DELETE',
                    data:null,
                    url:'/cart/cotization/'+ob.id,
                }).then(response=>response.data)
                .then(resp=>{
                    this.dialog=true;
                    this.message=resp.message;
                    this.cotization.splice(pos,1);
                    this.pushNotification(this.notification-1);
                })
                .catch(err=>{
                    this.dialog=true;
                    this.message='error';
                    console.log(err);
                });
            }
        },
        deleteCart(ob){
            let pos=this.shoppingcart.findIndex(dat=>{return dat._id==ob.id});
            if(pos!=-1){
                this.axios({
                    method: 'DELETE',
                    data:null,
                    url:'/cart/productcart/'+ob.id,
                }).then(response=>response.data)
                .then(resp=>{
                    this.dialog=true;
                    this.message=resp.message;
                    this.shoppingcart.splice(pos,1);
                    this.pushNotification(this.notification-1);
                })
                .catch(err=>{
                    this.dialog=true;
                    this.message='error';
                    console.log(err);
                });
            }
        },
        confirmCotz(ob){
            this.axios({
                method: 'PATCH',
                data:qs.stringify({t:true}),
                url:'/cotz/confirm/'+ob.id,
            }).then(response=>response.data)
            .then(resp=>{
                this.dialog=true;
                this.message=resp.message;
                let index=this.cotization.findIndex(dat=>{return dat._id==ob.id});
                this.cotization[index].confirm=true;
            })
            .catch(err=>{
                this.dialog=true;
                this.message='error';
                console.log(err);
            });
        },
        cancelCotz(ob){
            this.axios({
                method: 'PATCH',
                data:qs.stringify({t:false}),
                url:'/cotz/confirm/'+ob.id,
            }).then(response=>response.data)
            .then(resp=>{
                this.dialog=true;
                this.message=resp.message;
                let index=this.cotization.findIndex(dat=>{return dat._id==ob.id});
                this.cotization[index].confirm=false;
            })
            .catch(err=>{
                this.dialog=true;
                this.message='error';
                console.log(err);
            });
        }
    },
    computed:{
        ...mapState(['session','notification']),
        total(){
            return this.shoppingcart.reduce((a, b) => a + (b.price*b.quantity), 0);
        },
        
    },
    created(){
        this.init();
    }
}
</script>