<template>
   <v-container fluid fill-height style="background: linear-gradient(90deg, rgba(226,221,221,1) 0%, rgba(103,125,172,0.44441526610644255) 23%, rgba(60, 189, 121 ) 88%);">
        <v-row justify="center">
            <v-card elevation="15" width="400" style="border-radius:2em">
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <h1 class="primary--text">Login (Admin)</h1>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="email"
                                        :rules="emailRules"
                                        label="E-mail"
                                        required
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
                                        @keyup.enter="sessionGo"
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="d-flex justify-center">
                                    <v-btn large color="secondary" class="text-capitalize" @click="sessionGo">Login</v-btn>
                                </v-col>
                                <v-col cols="12" sm="6" class="d-flex justify-center">
                                    <v-btn large color="secondary" class="text-capitalize" @click="register">Registro</v-btn>
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

import {mapState,mapMutations} from 'vuex';
import qs from 'qs';
import Dialog from '@/components/DialogMessage';

export default {
    components:{
        Dialog
    },
    data() {
        return{
            valid:false,
            email: '',
            emailRules: [
                v => !!v || 'E-mail es requerido',
                v => /.+@.+/.test(v) || 'E-mail invalido',
            ],
            pass: '',
            passRules: [
                v => !!v || 'El password es requerido',
            ],
            message:'',
            dialog:false,
            redir:false,
            permissions:null
        }
    },
    computed:{
        ...mapState(['session']),
    },
    methods:{
        ...mapMutations(['pushSession']),
        register(){
            this.$router.push('/registeradm');
        },
        sessionGo(){
            if(this.$refs.form.validate()){
                let data={
                    email:this.email, 
                    pass:this.pass,
                }
                this.axios({
                    method: 'POST',
                    data:qs.stringify(data),
                    url:'/user/loginadmin',
                }).then(response=>{
                    this.dialog=true;
                    this.message=response.data.message+'';
                    this.redir=response.data.status;
                    this.pushSession(response.data.data);
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
                this.$router.push('/homeadm');
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