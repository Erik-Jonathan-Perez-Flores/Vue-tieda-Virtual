<template>
    <v-container fluid class="pa-0">
        <v-row>
            <v-col cols="12" class="pa-0 ma-0">
                <v-carousel 
                    :show-arrows="false"
                    cycle
                    height="400"
                    hide-delimiter-background
                >
                    <v-carousel-item
                        v-for="(item,i) in items"
                        :key="i"
                        :src="item.src"
                    ></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col cols="12" class="flex-grow-1 flex-shrink-0">
                <v-row>
                    <v-col cols="12" sm="6">
                        <h1 class="Black--text text-center font-weight-light font-condenced">LISTA DE PRODUCTOS</h1>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <SearchByCategory
                            @change-text="change"
                        />
                    </v-col>
                    <v-col cols="12" v-if="products.length>0">
                        <v-row justify="center">
                            <Product
                                v-for="(item, j) in products" :key="j" class="pa-1"
                                :path="item.defaultImg"
                                :price="item.price"
                                :discount="item.discount"
                                :stateDiscount="item.stateDiscount"
                                :name="item.name"
                                :_id="item._id"
                            />
                        </v-row>
                    </v-col>
                    <v-col cols="12" v-else>
                        <v-row justify="center">
                            <v-col cols="12">
                                <h1 class="text-center accent--text">No se encontraron resultados</h1>
                            </v-col>
                            <v-col cols="12" class="d-flex justify-center">
                                <v-icon size="300" color="accent">{{icon}}</v-icon>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import Product from '@/components/client/Product';
import SearchByCategory from '@/components/client/SearchByCategory';
import { mdiDatabaseAlert } from '@mdi/js';

export default {
    components:{
        Product,SearchByCategory
    },
    data() {
        return{
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: [
                'Bienvenido a Skynet p.c.',
                'message 2',
                'message 3',
                'message 4',
                'message 5',
            ],
            items: [
                {
                    src: require('@/assets/c1.jpeg'),
                },
                {
                    src: require('@/assets/c2.jpeg'),
                },
                {
                    src: require('@/assets/c3.jpeg'),
                },
                {
                    src: require('@/assets/c4.jpeg'),
                },
                {
                    src: require('@/assets/c5.jpeg'),
                },
            ],
            products:[],
            icon:mdiDatabaseAlert,

            scrolledToBottom:true,
            callApi:true,
            skip:0,
            limit:10,
            searchCategory:null
        }
    },
    mounted(){
        this.scroll();
    },
    methods: {
        scroll () {
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    if(this.callApi&&this.scrolledToBottom){
                        this.scrolledToBottom=false;
                        this.init();   
                    }
                }
            }
        },
        init(){
            this.axios({
                method: 'GET',
                data:null,
                url:'/product/get?skip='+this.skip+'&limit='+this.limit+'&categ='+this.searchCategory,
            }).then(response=>response.data)
            .then(resp=>{
                if(resp.length>0){
                    this.products=this.products.concat(resp);
                }else{
                    this.callApi=false;
                }
                this.skip+=this.limit;
                this.scrolledToBottom=true;

            })
            .catch(err=>{
                console.log(err);
            });
        },
        change(dat){
            this.searchCategory=dat.id;
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