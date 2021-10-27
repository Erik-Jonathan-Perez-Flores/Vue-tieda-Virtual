<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="500" style="border-radius:1em" elevation="15">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12"  class="d-flex justify-center">
                                <v-avatar size="150" @click="dialog2=true" style="cursor:pointer">
                                    <v-img :src="getAvatar"></v-img>
                                </v-avatar>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3 class="accent--text">Nombre:</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3>{{name}}</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3 class="accent--text">Email:</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3>{{email}}</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3 class="accent--text">Teléfono:</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3>{{phone}}</h3>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-btn fab absolute top right small @click="dialog=true">
                        <v-icon color="accent">{{icon}}</v-icon>
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
            <v-card>
                <v-card-text>
                    <v-form v-model="valid" ref="form">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <h1 class="primary--text">Editar</h1>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-text-field
                                        v-model="name"
                                        :rules="nameRules"
                                        label="Nombre"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-text-field
                                        v-model="phone"
                                        :rules="phoneRules"
                                        label="Teléfono"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-text-field
                                        v-model="pass"
                                        :rules="passRules"
                                        label="Password anterior"
                                        type="password"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-text-field
                                        v-model="pass2"
                                        :rules="pass2Rules"
                                        label="Nuevo password"
                                        type="password"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="pa-0">
                                    <v-text-field
                                        v-model="pass3"
                                        :rules="pass3Rules"
                                        label="Repita su password"
                                        type="password"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="secondary" @click="dialog=false" large class="text-capitalize">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click="send" large class="text-capitalize">Enviar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog2"
            max-width="500px"
        >
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" class="mt-5">
                            <h2 class="text-center accent--text">Imagen de perfil</h2>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <DragImageAvatar
                                @drop-item="eventImg"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="secondary" @click="dialog2=false" large class="text-capitalize">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click="sendAvatar" large class="text-capitalize">Enviar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog3"
            width="400"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h3 class="text--primary text-center">{{message}}</h3>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog3=false" color="primary">Okay</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import Product from '@/components/client/Product';
import {mdiAccountEdit} from '@mdi/js';
import DragImageAvatar from '@/components/client/DragImageAvatar';
import {mapState,mapMutations} from 'vuex';
import qs from 'qs';

export default {
    components:{
        Product,DragImageAvatar
    },
    data() {
        return{
            avatar:'',
            icon:mdiAccountEdit,
            dialog:false,
            dialog2:false,
            dialog3:false,
            valid:false,
            name: 'name',
            nameRules: [
                v => !!v || 'El nombre es requerido',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail es requerido',
                v => /.+@.+/.test(v) || 'E-mail invalido',
            ],
            phone: '',
            phoneRules: [
                v => !!v || 'El teléfono es requerido',
            ],
            pass: '',
            passRules: [
                v => !!v || 'El password es requerido',
            ],
            pass2: '',
            pass2Rules: [
                v => !!v || 'El password es requerido',
            ],
            pass3: '',
            pass3Rules: [
                v => !!v || 'El password es requerido',
            ],
            message:'',
        }
    },
    computed:{
        ...mapState(['session']),
        getAvatar(){
            return this.session&&this.session.avatar!=''?this.session.avatar:require('@/assets/logo.jpeg');
        },
    },
    methods:{
        ...mapMutations(['pushSessionAvatar']),
        send(){
            if(this.$refs.form.validate()){
                let data={
                    name:this.name,
                    phone:this.phone,
                    email:this.email, 
                    pass:this.pass,
                    newPass:this.pass2
                }
                this.axios({
                    method: 'POST',
                    data:qs.stringify(data),
                    url:'/user/edit',
                }).then(response=>response.data)
                .then(resp=>{
                    console.log(resp);
                    this.dialog=false;
                    this.dialog3=true;
                    this.message=resp.message;
                })
                .catch(err=>{
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
        sendAvatar(){
            if(this.imgFile!=null){
                let formData=new FormData();
                formData.append('img',this.imgFile);
                this.axios({
                    method: 'POST',
                    data:formData,
                    url:'/user/avatar',
                }).then(response=>response.data)
                .then(resp=>{
                    this.dialog2=false;
                    this.dialog3=true;
                    this.message=resp.message;
                    this.pushSessionAvatar(resp.path);
                })
                .catch(err=>{
                    this.dialog2=false;
                    this.dialog3=true;
                    if (err.response) {
                        this.message=err.response.data.message;
                    }else{
                        this.message='Error en la respuesta';
                    }
                });
            }else{
                this.dialog3=true;
                this.message='Se requiere la imagen de perfil.';
            }
        },
        eventImg(img){
            this.imgFile=img.image;
        },
        init(){
            if(!this.session)return;
            this.axios({
                method: 'GET',
                data:null,
                url:'/user/auser',
            }).then(response=>response.data)
            .then(resp=>{
                this.name=resp.name;
                this.email=resp.email;
                this.phone=resp.phone;
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