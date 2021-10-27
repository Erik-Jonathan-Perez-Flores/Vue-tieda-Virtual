<template>
    <v-row>
        <v-col cols="12" sm="6" class="d-flex align-center">
            <v-carousel hide-delimiters style="border-radius:1em">
                <v-carousel-item
                    v-for="(item,i) in gallery"
                    :key="i"
                    :src="item.path"
                ></v-carousel-item>
            </v-carousel>
        </v-col>
        <v-col cols="12" sm="6">
            <v-flex d-flex class="fill-height">
                <v-row align-content="center" justify="center">
                    <v-col cols="12">
                        <h1 class="text-left white--text text-uppercase">{{name}}</h1>
                    </v-col>
                    <v-col cols="12">
                        <h4 class="text-justify white--text font-weight-medium font-italic">{{description}}</h4>
                    </v-col>
                    <v-col cols="12" v-if="stateDiscount" class="pa-1">
                        <v-row>
                            <v-col cols="12"><h4 class=" text-left white--text body-1" > Antes:<span class="error--text caption" style="text-decoration: line-through;"> {{price}} BOB </span></h4></v-col>
                            <v-col cols="12"><h2 class="text-center white--text">Ahora: <span class="Black--text font-weight-light">{{price-discount}} BOB</span></h2></v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" v-else>
                        <h1 class="text-center BOB--text"><span class="text-center primary--text">Precio: </span> {{price}} BOB</h1>
                    </v-col>
                    <v-col cols="2" v-if="session&&!cart&&!cotz">
                        <v-text-field
                            v-model="count"
                            color="primary"
                            background-color="white"
                            type="number"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" v-if="session&&!cart&&!cotz">
                        <v-row>
                            <v-col cols="6" class="d-flex justify-center">
                                <v-btn large class="text-capitalize" color="secondary" @click="addCart">Añadir al carrito</v-btn>
                            </v-col>
                            <v-col cols="6" class="d-flex justify-center">
                                <v-btn large class="text-capitalize" color="secondary" @click="addCotz">Añadir para cotizar</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-flex>
        </v-col>
         <Dialog
            :message="message"
            :dialog="dialog"
            :redir="redir"
            @ok-template="ok"
        />
    </v-row>
</template>

<script>

import {mapMutations, mapState} from 'vuex';
import qs from 'qs';
import Dialog from '@/components/DialogMessage';

export default {
    components:{
        Dialog
    },
    props:['id'],
    data() {
        return{
            name:'',
            price:0,
            discount:0,
            stateDiscount:false,
            gallery: [],
            description:'',
            count:1,

            cart:false,
            cotz:false,

            message:'',
            dialog:false,
            redir:false
        }
    },
    computed:{
        ...mapState(['session','notification']),
    },
    methods:{
        ...mapMutations(['pushNotification']),
        init(){
            
            this.axios({
                method: 'GET',
                data:null,
                url:'/product/get/'+this.id,
            }).then(response=>response.data.data)
            .then(resp=>{
                this.gallery=resp.gallery;
                this.name=resp.name;
                this.price=resp.price;
                this.description=resp.description;
                this.stateDiscount=resp.stateDiscount;
                this.discount=resp.discount;
            })
            .catch(err=>{
                console.log(err);
            });

            if(!this.session)return;

            this.axios({
                method: 'GET',
                data:null,
                url:'/cart/exist/'+this.id,
            }).then(response=>response.data)
            .then(resp=>{
                this.cart=resp.status;
                if(resp.status){
                    this.dialog=true;
                    this.message=resp.message;
                    this.redir=true;
                }
            })
            .catch(err=>{
                console.log(err);
            });

            this.axios({
                method: 'GET',
                data:null,
                url:'/cart/cotization/'+this.id,
            }).then(response=>response.data)
            .then(resp=>{
                this.cotz=resp.status;
                if(resp.status){
                    this.dialog=true;
                    this.message=resp.message;
                    this.redir=true;
                }
            })
            .catch(err=>{
                console.log(err);
            });
        },
        addCart(){
            if(this.count>0){
                this.axios({
                    method: 'POST',
                    data:qs.stringify({
                        product:this.id,
                        quantity:this.count
                    }),
                    url:'/cart/add',
                }).then(response=>response.data)
                .then(resp=>{
                    if(resp.status){
                        this.dialog=true;
                        this.message=resp.message;
                        this.redir=resp.status;
                        this.cart=true;
                        this.pushNotification(this.notification+1);
                    }else{
                        this.dialog=true;
                        this.message=resp.message;
                        this.redir=resp.status;
                    }
                })
                .catch(err=>{
                    console.log(err);
                });
            }else{
                this.dialog=true;
                this.message='La cantidad tiene que ser mayor o igual a 1 para añadir al carrito';
            }
        },
        addCotz(){
            if(this.count>0){
                this.axios({
                    method: 'POST',
                    data:qs.stringify({
                        product:this.id,
                        quantity:this.count
                    }),
                    url:'/cart/cotization',
                }).then(response=>response.data)
                .then(resp=>{
                    this.dialog=true;
                    this.message=resp.message;
                    this.redir=resp.status;
                    this.cotz=true;
                    this.pushNotification(this.notification+1);
                })
                .catch(err=>{
                    console.log(err);
                });
            }else{
                this.dialog=true;
                this.message='La cantidad tiene que ser mayor o igual a 1 para añadir a la cotización';
            }
        },
        ok(){
            if(this.redir){
                this.$router.push('/shoppingcart');
            }
            this.dialog=false;
        }
    },
    created(){
        this.init();
    }
}
</script>