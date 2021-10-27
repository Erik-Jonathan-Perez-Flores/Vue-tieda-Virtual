<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1 class="accent--text">Resultados de busqueda</h1>
            </v-col>
            <v-col cols="12">
                <v-row justify="center">
                    <Product
                        v-for="(item, j) in products" :key="j" class="pa-1"
                        :path="item.path"
                        :price="item.price"
                        :name="item.name"
                        :_id="item._id"
                    />
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import Product from '@/components/client/Product';

export default {
    components:{
        Product
    },
    data() {
        return{
            products:[]
        }
    },
    created(){
        for (let index = 0; index < 50; index++) {
            const element = {
                path:'https://cdn.vuetifyjs.com/images/cards/house.jpg',
                price:index*0.5,
                name:'nombre '+index,
                _id:''+index
            };
            this.products.push(element);
        }
    }
}
</script>