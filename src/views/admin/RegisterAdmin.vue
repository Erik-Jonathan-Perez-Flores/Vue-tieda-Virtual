<template>
    <v-container fluid fill-height style="background: linear-gradient(90deg, rgba(226,221,221,1) 0%, rgba(103,125,172,0.44441526610644255) 23%, rgba(60, 189, 121 ) 88%);">
        <v-row justify="center">
            <v-card elevation="15" width="400" style="border-radius:2em">
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <h1 class="primary--text">Registro (Admin)</h1>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="name"
                                        :rules="nameRules"
                                        label="Nombre"
                                        dense
                                        type="text"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        required
                                        type="text"
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="key"
                                        :rules="keyRules"
                                        label="Llave"
                                        required
                                        type="text"
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="phone"
                                        :rules="phoneRules"
                                        label="Teléfono"
                                        required
                                        type="number"
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="pass"
                                        :rules="passRules"
                                        label="Password"
                                        type="password"
                                        required
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="pass2"
                                        :rules="pass2Rules"
                                        label="Repita su Password"
                                        type="password"
                                        required
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center">
                                    <v-btn large color="secondary" class="text-capitalize" @click="register">Registrarme</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
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

import qs from 'qs';
import Dialog from '@/components/DialogMessage';
import {mapState} from 'vuex';

export default {
    components:{
        Dialog
    },
    data() {
        return{
            valid:true,
            name: '',
            nameRules: [
                v => !!v || 'El nombre es requerido',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail es requerido',
                v => /.+@.+/.test(v) || 'E-mail invalido',
            ],
            pass: '',
            passRules: [
                v => !!v || 'El password es requerido',
                v => /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(v) || 'La Contraseña es invalida debe incluir letras mayúsculas, minúsculas, números y caracteres especiales',
            ],
            key: '',
            keyRules: [
                v => !!v || 'Es necesaria la llave que se otorga para este registro',
            ],
            phone: '',
            phoneRules: [
                v => !!v || 'El teléfono es requerido',
            ],
            pass2: '',
            pass2Rules: [
                v => !!v || 'El password es requerido',
                v => v==this.pass || 'El password no es igual',
            ],
            message:'',
            dialog:false,
            redir:false
        }
    },
    computed:{
        ...mapState(['session']),
    },
    methods:{
        async register(){
            if(this.$refs.form.validate()){
                /*let resp=await fetch(this.$store.state.ip+'/csurf');
                let {token}=resp.json();*/
                let data={
                    name:this.name,
                    email:this.email,
                    phone:this.phone,
                    pass:this.pass,
                    key:this.key
                }
                this.axios({
                    method: 'POST',
                    data:qs.stringify(data),
                    url:'/user/register',
                }).then(response=>{
                    this.dialog=true;
                    this.message=response.data.message+'';
                    this.redir=response.data.status;
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
                this.$router.push('/admin');
            }
            this.dialog=false;
        }
    },
    created(){
        if(this.session){
            this.$router.push('/homeadm');
        }
    }
}
</script>