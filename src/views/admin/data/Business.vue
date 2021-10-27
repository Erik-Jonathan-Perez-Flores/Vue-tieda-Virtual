<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-avatar size="300" color="accent">
                    <img :src="imageApi"/>
                </v-avatar>
            </v-col>
            <v-col cols="12" sm="6">
                <v-row>
                    <v-col cols="12">
                        <h1 class="text-center">Cambiar logo de la empresa</h1>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                        <Drag
                            :qr="true"
                            @drop-item="img"
                            @close-api="closeApi"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" sm="6">
                <v-row>
                    <v-col cols="12">
                        <h1 class="text-center">Datos de la empresa</h1>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4 class="accent--text">Nombre:</h4>
                    </v-col>
                    <v-col cols="12" sm="6">
                        {{name}}
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4 class="accent--text">Dirección:</h4>
                    </v-col>
                    <v-col cols="12" sm="6">
                        {{direction}}
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4 class="accent--text">Teléfono:</h4>
                    </v-col>
                    <v-col cols="12" sm="6">
                        {{phone}}
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4 class="accent--text">Celular:</h4>
                    </v-col>
                    <v-col cols="12" sm="6">
                        {{cel}}
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4 class="accent--text">Ciudad:</h4>
                    </v-col>
                    <v-col cols="12" sm="6">
                        {{city}}
                    </v-col>
                    <v-col cols="12" sm="6">
                        <h4 class="accent--text">Llave para crear nuevos admins:</h4>
                    </v-col>
                    <v-col cols="12" sm="6">
                        {{secretKey}}
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-btn large color="secondary" @click="dialogEdit=true">Editar</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialogEdit"
            width="450"
            persistent
        >
            <v-card>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <h1 class="primary--text">Editar</h1>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="name"
                                        :rules="nameRules"
                                        label="Nombre"
                                        dense
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="direction"
                                        :rules="directionRules"
                                        label="Dirección"
                                        required
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="phone"
                                        :rules="phoneRules"
                                        label="Teléfono"
                                        required
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="cel"
                                        :rules="celRules"
                                        label="Celular"
                                        required
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="city"
                                        :rules="cityRules"
                                        label="Ciudad"
                                        required
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="secretKey"
                                        :rules="secretKeyRules"
                                        label="Llave para registro de nuevos admins"
                                        required
                                        dense
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        text
                        class="text-capitalize"
                        color="primary"
                        @click="dialogEdit=false"
                    >
                        Cancelar
                    </v-btn>
                    <v-divider></v-divider>
                    <v-btn
                        text
                        class="text-capitalize"
                        color="primary"
                        @click="send"
                    >
                        Enviar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Dialog
            :message="message"
            :dialog="dialog"
            :redir="redir"
            @ok-template="ok"
        />
    </v-container>
</template>

<script>

import Drag from '@/components/admin/DragImageAdmin';
import Dialog from '@/components/DialogMessage';
import qs from 'qs';

export default {
    components:{
        Drag,Dialog
    },
    data() {
        return{
            valid:false,
            name:'name enterprise',
            nameRules: [
                v => !!v || 'El nombre es requerido',
            ],
            direction:'direccion del la emrpesa',
            directionRules: [
                v => !!v || 'La direccoón es requerida',
            ],
            phone:'12456',
            phoneRules: [
                v => !!v || 'El teléfono es requerido',
            ],
            cel:'123465',
            celRules: [
                v => !!v || 'El celular es requerido',
            ],
            city:'Potosi',
            cityRules: [
                v => !!v || 'La ciudad es requerida',
            ],
            dialogEdit:false,
            path:'',
            secretKey:'',
            secretKeyRules: [
                v => !!v || 'La llave es requerida',
            ],
            
            dialog:false,
            message:'',
            redir:false,
        }
    },
    computed:{
        imageApi(){
            return this.path;
        }
    },
    methods:{
        img(img){
            let formData=new FormData();
            formData.append('img',img.image);
            this.axios({
                method: 'POST',
                data:formData,
                url:'/super/logo',
            }).then(response=>{
                this.dialog=true;
                this.message=response.data.message+'';
                this.redir=response.data.status;
                this.path=response.data.path;
            }).catch(err=>{
                this.dialog=true;
                if (err.response) {
                    this.message=err.response.data.message;
                }else{
                    this.message='Error en la respuesta';
                }
            });
        },
        send(){
            if(this.$refs.form.validate()){
                this.axios({
                    method: 'PATCH',
                    data:qs.stringify({
                        name:this.name,
                        phone:this.phone,
                        movil:this.cel,
                        direction:this.direction,
                        city:this.city,
                        secretKeyToRegister:this.secretKey
                    }),
                    url:'/super',
                }).then(response=>{
                    this.dialog=true;
                    this.message=response.data.message+'';
                    this.redir=response.data.status;
                    this.dialogEdit=false;
                    let da=response.data.data;
                    this.name=da.name;
                    this.direction=da.direction;
                    this.phone=da.phone;
                    this.cel=da.movil;
                    this.city=da.city;
                    this.path=da.path;
                    this.secretKey=da.secretKeyToRegister;
                }).catch(err=>{
                    this.dialog=true;
                    this.dialogEdit=false;
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
            this.dialog=false;
        },
        closeApi(){
            this.axios({
                method: 'DELETE',
                data:null,
                url:'/super/logo',
            }).then(response=>{
                this.dialog=true;
                this.message=response.data.message+'';
                this.redir=response.data.status;
                this.path=response.data.path;
            }).catch(err=>{
                this.dialog=true;
                if (err.response) {
                    this.message=err.response.data.message;
                }else{
                    this.message='Error en la respuesta';
                }
            });
        },
        init(){
            this.axios({
                method: 'GET',
                data:null,
                url:'/super',
            }).then(response=>response.data.pop())
            .then(resp=>{
                this.name=resp.name;
                this.direction=resp.direction;
                this.phone=resp.phone;
                this.cel=resp.movil;
                this.city=resp.city;
                this.path=resp.path;
                this.secretKey=resp.secretKeyToRegister;
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