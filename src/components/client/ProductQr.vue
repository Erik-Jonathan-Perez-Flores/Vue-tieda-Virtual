<template>
    <v-card color="gray" elevation="15" width="260" class="ma-3" style="border-radius:1em">
        <img :src="path" width="260" height="230"/>
        <v-card-text>
            <v-row>
                <v-col cols="12" class="pa-0">
                    <h4 class="text-center accent--text">{{name}} : Cantidad {{quantity}}</h4>
                </v-col>
                <v-col cols="12" class="pa-0">
                    <h4 class="text-center secondary--text">{{price}} BOB</h4>
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
        quantity:{
            type:Number
        }
    },
    methods:{
        toProduct(){
            
        }
    }
}
</script>