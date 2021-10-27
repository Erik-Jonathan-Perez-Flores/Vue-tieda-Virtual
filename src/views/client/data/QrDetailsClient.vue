<template>
    <Denied v-if="!session"/>
    <v-container v-else>
        <v-row>
            <v-col cols="12">
                <h1 class="accent--text">Qr de pago</h1>
            </v-col>
            <v-col cols="12" v-if="!state">
                <h4 class="accent--text text-center">Aún no se envió la imagen qr de pago</h4>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-center">
                <v-card elevation="15" class="pa-2" v-if="!state">
                    <h4 class="accent--text text-center">La imagen QR aparecerá aqui</h4>
                    <v-icon size="280" color="accent">{{icon}}</v-icon>
                </v-card>
                <v-card elevation="15" class="pa-2" v-else @click="dialog4=true">
                    <h4 class="accent--text text-center">QR actual</h4>
                    <v-img :src="pathQr" width="250" height="250" ></v-img>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-center">
                <v-card elevation="15" class="pa-2" v-if="!stateClient">
                    <h4 class="accent--text text-center">El recibo aparecerá aqui</h4>
                    <v-icon size="280" color="accent">{{icon}}</v-icon>
                </v-card>
                <v-card elevation="15" class="pa-2" v-else @click="dialog3=true">
                    <h4 class="accent--text text-center">Recibo actual</h4>
                    <v-img :src="imgReceipt" width="250" height="250" ></v-img>
                </v-card>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <h1 class="accent--text">Escanee el código con su banco</h1>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <v-btn
                    large 
                    color="secondary" 
                    class="text-capitalize"
                    @click="dialog=true"
                >
                    Abrir formulario para enviar recibo
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            max-width="500"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="pa-0">
                            <h4 class="accent--text text-center">Vuelva a enviar el recibo si desea editar su envio</h4>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center pa-1">
                            <Drag
                                @drop-item="img"
                            />
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-textarea
                                v-model="description"
                                :rules="descriptionRules"
                                label="Descripción del recibo"
                                required
                                outlined
                                dense
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="secondary" @click="dialog=false" class="text-capitalize">Cancelar</v-btn>
                    <v-divider></v-divider>
                    <v-btn color="secondary" class="text-capitalize" @click="sendReceipt">Enviar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog2"
            width="400"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h3 class="text--primary text-center">{{message}}</h3>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog2=false" color="primary">Okay</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog3"
            width="400"
        >
            <v-card>
                <img :src="imgReceipt" height="560"/>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog4"
            width="400"
        >
            <v-card>
                <img :src="pathQr" height="400"/>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import Drag from '@/components/client/DragImage';
import Denied from '@/components/DeniedClient';
import {mapState} from 'vuex';
import { mdiAlertCircleOutline } from '@mdi/js';

export default {
    props:['id'],
    components:{
        Drag,Denied
    },
    data() {
        return{
            pathQr:'',
            dialog:false,
            icon:mdiAlertCircleOutline,
            stateClient:false,
            state:false,
            imgReceipt:'',
            imgFile:null,

            dialog2:false,
            message:'',

            dialog3:false,
            dialog4:false,

            description: '',
            descriptionRules: [
                v => !!v || 'La descripción es requerida',
            ],
        }
    },
    computed:{
        ...mapState(['session']),
    },
    methods:{
        img(img){
            this.imgFile=img.image;
        },
        init(){
            this.axios({
                method: 'GET',
                data:null,
                url:'/qr/qr/'+this.id,
            }).then(response=>response.data)
            .then(resp=>{
                this.pathQr=resp.qrImage;
                this.imgReceipt=resp.receiptImage;
                this.stateClient=resp.clientState;
                this.state=resp.state;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        sendReceipt(){
            if(this.imgFile!=null){
                let formData=new FormData();
                formData.append('img',this.imgFile);
                formData.append('description',this.description);
                this.axios({
                    method: 'PATCH',
                    data:formData,
                    url:'/qr/imgReceipt/'+this.id,
                }).then(response=>response.data)
                .then(resp=>{
                    this.dialog=false;
                    this.dialog2=true;
                    this.message=resp.message;
                    this.imgReceipt=resp.path;
                    this.stateClient=true;
                })
                .catch(err=>{
                    this.dialog2=true;
                    this.message='Error en la respuesta';
                });
            }else{
                this.dialog2=true;
                this.message='Se requiere enviar la imagen del recibo';
            }
        }
    },
    created(){
        this.init();
    }
}
</script>