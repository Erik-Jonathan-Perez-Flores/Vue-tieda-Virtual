<template>
    <v-container>
        <v-card color="gray" elevation="15" @click="toPaymentDetails" class="pa-5" style="position:relative; border-radius:1em">
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-flex d-flex class="fill-height">
                            <v-row align-content="center">
                                <v-col cols="12" class="d-flex justify-center">
                                    <v-icon size="150" color="accent">{{img}}</v-icon>
                                </v-col>
                                <v-col cols="12">
                                    <h4 class="text-center accent--text">Fecha del pedido</h4>
                                    <h3 class="text-center accent--text">{{now()}}</h3>
                                </v-col>
                            </v-row>
                        </v-flex>
                    </v-col>
                    <v-col cols="12" md="9">
                        <v-row>
                            <v-col cols="12" class="pa-1">
                                <v-row v-for="(item,index) in products" :key="index">
                                    <v-col cols="12" sm="6">
                                        <h3 class="accent--text">Producto:</h3>
                                    </v-col>
                                    <v-col cols="12" sm="6" >
                                        <h3>{{item.name}}</h3>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <h3 class="accent--text">Se agregó :</h3>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <h3>{{getDate(item.date)}}</h3>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-row cols="12" class="pos">
                <v-btn color="accent" fab large v-if="state">
                    <v-icon>{{qr}}</v-icon>
                </v-btn>
                <v-btn color="accent" fab large v-if="client">
                    <v-icon>{{clientIcon}}</v-icon>
                </v-btn>
                <v-btn color="accent" fab large v-if="send">
                    <v-icon>{{sendIcon}}</v-icon>
                </v-btn>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>

import { mdiQrcodeScan,mdiClipboardFlow,mdiCheckOutline, mdiAccountCheckOutline, mdiSendCircle } from '@mdi/js';

export default {
    data() {
        return{
            qr:mdiQrcodeScan,
            img:mdiClipboardFlow,
            check:mdiCheckOutline,
            clientIcon:mdiAccountCheckOutline,
            sendIcon:mdiSendCircle
        }
    },
    props:{
        products:{
            type:Array
        },
        date:{
            type:Date
        },
        _id:{
            type:String
        },
        state:{
            type:Boolean,
            default:false
        },
        client:{
            type:Boolean,
            default:false
        },
        send:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        toPaymentDetails(){
            this.$router.push('/payment/'+this._id);
        },
        getDate(x){
            return this.$moment(x).fromNow();
        },
        now(){
            return this.date.getUTCFullYear()+'-'+(this.date.getUTCMonth() + 1)+'-'+this.date.getUTCDate();
        }
    },
    
}
</script>

<style scoped>
.pos{
    position: absolute;
    top: -25px;
    right: 20px;
}
</style>