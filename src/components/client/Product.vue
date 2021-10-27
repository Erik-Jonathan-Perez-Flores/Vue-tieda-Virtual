<template>
    <v-card color="gray" @click="toProduct" elevation="15" width="260" class="ma-3" style="border-radius:1em">
        <!--tamaño adaptable-->
        <v-img :src="path" width="260" height="230"></v-img>
        <v-card-text v-if="stateDiscount">
            <v-row align="end">
                <v-col cols="12" class="pa-1">
                    <h2 class="text-justify Black--text font-weight-black font-italic text-truncate">{{name}}</h2>
                </v-col>
                <v-col cols="12" class="pa-1">
                    <h4 class="text-center Desc--text font-weight-medium font-italic" style="text-decoration: line-through;">{{price}} BOB</h4>
                </v-col>
                <v-col cols="12" class="pa-1">
                    <h1 class="text-center BOB--text font-weight-regular">{{price-discount}} BOB</h1>     
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text v-else>
            <v-row align="end">
                <v-col cols="12" class="pa-1">
                    <h2 class="text-justify Black--text font-weight-black font-italic text-truncate">{{name}}</h2>
                    <span class="text-right Env--text font-weight-light font-italic"> Envio Gratis</span>
                </v-col>
                <v-col cols="12" class="pa-1">
                    <h1 class="text-center BOB--text font-weight-regular">{{price}} BOB</h1>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return{}
    },
    props:{
        path:{
            type:String
        },
        price:{
            type:Number
        },
        name:{
            type:String
        },
        _id:{
            type:String
        },
        discount:{
            type:Number
        },
        stateDiscount:{
            type:Boolean
        }
    },
    methods:{
        toProduct(){
            this.$router.push('/detailproduct/'+this._id);
        }
    }
}
</script>