<template>
    <Denied v-if="!session"/>
    <v-container v-else>
        <v-row>
            <v-col cols="12">
                <h1 class="white--text text-center">Pago</h1>
            </v-col>
            <v-col cols="12" sm="6">
                <v-flex d-flex class="fill-height">
                    <v-row align="center">
                        <v-card color="accent" style="border-radius:1em" class="pa-5">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" class="pa-1">
                                        <h4 class="white--text text-center">El código qr con el monto se enviará a la sección de pedidos y a su número de whatsapp para completar el pedido.</h4>
                                    </v-col>
                                    <v-col cols="12" class="d-flex justify-center pa-1">
                                        <v-icon size="200" color="white" >{{qr}}</v-icon>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-row>
                </v-flex>
            </v-col>
            <v-col cols="12" sm="6">
                <v-form v-model="valid" ref="form">
                    <v-container>
                        <v-row>
                            <v-col cols="12" class="pa-0">
                                <h2 class="accent--text text-center">Envío</h2>
                            </v-col>
                            <v-col cols="12" class="pa-0">
                                <v-autocomplete
                                    v-model="city"
                                    :items="citys"
                                    :rules="cityRules"
                                    filled
                                    label="Ciudad"
                                    required
                                    outlined
                                    color="white"
                                    clearable
                                ></v-autocomplete>
                            </v-col>

                            <v-col cols="12" class="pa-0">
                                <v-text-field
                                    v-model="phone"
                                    :rules="phoneRules"
                                    label="Confirmenos su teléfono/whatsapp"
                                    required
                                    outlined
                                    color="white"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" class="pa-0">
                                <v-text-field
                                    v-model="direction"
                                    :rules="directionRules"
                                    label="Dirección"
                                    required
                                    outlined
                                    color="white"
                                ></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" class="d-flex justify-center">
                                <v-btn large color="secondary" class="text-capitalize" @click="pay">Enviar</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-col>
        </v-row>
        <Dialog
            :message="message"
            :dialog="dialog"
            :redir="redir"
            @ok-template="ok"
        />
    </v-container>
</template>


<script>

import { mdiQrcodeScan } from '@mdi/js';
import Denied from '@/components/DeniedClient';
import Dialog from '@/components/DialogMessage';
import {mapState,mapMutations} from 'vuex';
import qs from 'qs';

export default {
    components:{
        Denied,Dialog
    },
    data() {
        return{
            valid:false,
            city: '',
            citys:['La Paz', 'Potosí', 'Cochabamba','Pando','Beni','Santa Cruz','Oruro','Sucre','Tarija'],
            cityRules: [
                v => !!v || 'La ciudad es requerida',
            ],
            phone: '',
            phoneRules: [
                v => !!v || 'El teléfono es requerido',
            ],
            direction: '',
            directionRules: [
                v => !!v || 'La dirección es requerida',
            ],
            qr:mdiQrcodeScan,

            dialog:false,
            message:'',
            redir:false,
        }
    },
    computed:{
        ...mapState(['session','notification']),
    },
    methods:{
        ...mapMutations(['pushNotification']),
        pay(){
            if(this.$refs.form.validate()){
                this.axios({
                    method: 'POST',
                    data:qs.stringify({
                        city:this.city,
                        direction:this.direction,
                        phoneConfirm:this.phone,
                    }),
                    url:'/cart/ended',
                }).then(response=>{
                    this.dialog=true;
                    this.message=response.data.message+'';
                    this.redir=response.data.status;
                    this.pushNotification(this.notification-response.data.count);
                }).catch(err=>{
                    this.dialog=true;
                    if (err.response) {
                        this.message=err.response.data.message;
                    }else{
                        this.message='Error en la respuesta';
                    }
                });
            }else{
                this.$refs.form.validate();
            }
        },
        ok(){
            if(this.redir){
                this.$router.push('/');
            }
            this.dialog=false;
        }
    }
}
</script>