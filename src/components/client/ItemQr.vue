<template>
    <v-card 
        :color="state?'secondary':'accent'" 
        style="border-radius:2em; cursor:pointer"
        @click="toQr"
    >
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <h1 class="white--text text-center">Total productos : {{products.length}}</h1>
                </v-col>
                <v-col cols="12" sm="10">
                    <v-row >
                        <v-col v-for="(item,index) in products" :key="index">
                            <v-row justify="center">
                                <Product
                                    :path="item.defaultImg"
                                    :price="item.price"
                                    :name="item.name"
                                    :_id="item._id"
                                    :quantity="item.quantity"
                                />
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-container fill-height>
                        <v-row align-content="center">
                            <v-col cols="12">
                                <h3 class="white--text text-center">Pedido : {{date}}</h3>
                            </v-col>
                            <v-col cols="12" class="d-flex justify-center">
                                <v-row>
                                    <v-col cols="12" sm="6" class="d-flex justify-center align-center"><v-icon size="30" color="white">{{qr}}</v-icon></v-col>
                                    <v-col cols="12" sm="6" class="d-flex justify-center align-center"><v-icon size="30" color="white">{{click}}</v-icon></v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>

//this.$moment(new Date(2022, 11, 24, 10, 33)).fromNow()

import Product from './ProductQr.vue';
import { mdiQrcodeScan,mdiCursorDefaultClick } from '@mdi/js';

export default {
    components:{
        Product
    },
    data() {
        return{
            qr:mdiQrcodeScan,
            click:mdiCursorDefaultClick,
            products:[],
            date:null,
            state:null,
        }
    },
    props:{
        _id:{
            type:String
        }
    },
    mounted(){
        
    },
    methods:{
        toQr(){
            this.$router.push('/qr/'+this._id);
        },
        init(){
            this.axios({
                method: 'GET',
                data:null,
                url:'/cart/getAIdQr/'+this._id,
            }).then(response=>response.data.data)
            .then(resp=>{
                this.date=this.$moment(resp.date).fromNow();
                this.state=resp.state;
                this.products=resp.products;
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