<template>
    <v-container>
        <v-card :color="confirm?'secondary':''" class="ma-1" style="border-radius:1em">
            <v-card-text style="position:relative">
                <v-row>
                    <v-col cols="12" sm="8">
                        <v-row>
                            <v-col cols="12" class="d-flex justify-center">
                                <img :src="path" width="250" height="250"/>
                            </v-col>
                            <v-col cols="12">
                                <h1 class="accent--text text-center">{{name}}</h1>
                            </v-col>
                            <v-col cols="12">
                                <h4 class="text-justify">{{description}}</h4>
                            </v-col>
                            <v-col cols="12">
                                <h2 class="accent--text text-center">Precio: {{price}}</h2>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <v-flex d-flex class="fill-height">
                            <v-row align="center" >
                                <v-col cols="12">
                                    <v-row>
                                        <v-col cols="12" class="">
                                            <h3 class="text-center">Cantidad</h3>
                                        </v-col>
                                        <v-col cols="12" class="">
                                            <h1 class="accent--text text-center">{{quantity}}</h1>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" class="pa-1">
                                    <v-row v-if="confirm">
                                        <v-col cols="12">
                                            <h3 class="text-center">Cancelar consulta</h3>
                                        </v-col>
                                        <v-col cols="12" class="d-flex justify-center align-center">
                                            <v-icon size="70" color="accent" @click="cancelCotz">{{close}}</v-icon>
                                        </v-col>
                                    </v-row>
                                    <v-row v-else>
                                        <v-col cols="12">
                                            <h3 class="text-center">Confirmar consulta</h3>
                                        </v-col>
                                        <v-col cols="12" class="d-flex justify-center align-center">
                                            <v-icon size="70" color="accent" @click="uploadCotz">{{upload}}</v-icon>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-flex>
                    </v-col>
                </v-row>
                <v-btn width="70" height="70" fab @click="dialog=true" absolute top right>
                    <v-icon size="50" color="accent">{{icon}}</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
        <v-dialog
            v-model="dialog"
            width="300"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h4 class="accent--text text-center">¿Desea eliminar la cotización de este producto?</h4>
                </v-card-text>
                <v-card-actions>
                    <v-btn small color="accent" @click="deleteCotz">Si</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small color="accent" @click="dialog=false">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import {mdiDelete,mdiCloudUploadOutline,mdiCloseOctagon} from '@mdi/js'

export default {
    data() {
        return{
            icon:mdiDelete,
            dialog:false,
            upload:mdiCloudUploadOutline,
            close:mdiCloseOctagon
        }
    },
    props:{
        path:{
            type:String
        },
        description:{
            type:String
        },
        _id:{
            type:String
        },
        price:{
            type:Number
        },
        name:{
            type:String
        },
        quantity:{
            type:Number
        },
        confirm:{
            type:Boolean
        }
    },
    methods:{
        deleteCotz(){
            this.dialog=false;
            this.$emit('delete-item-cotz',{id:this._id});
        },
        uploadCotz(){
            this.$emit('confirm-cotz',{id:this._id});
        },
        cancelCotz(){
            this.$emit('cancel-cotz',{id:this._id});
        }
    }
}
</script>