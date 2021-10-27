<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Cotizaciones:</h1>
                <p class="text-justify">(El precio de los productos es el precio al momento de añadir al carrito del cliente)</p>
            </v-col>
            <v-col cols="12">
                <v-row justify="center">
                    <v-card 
                        width="250" 
                        elevation="15" 
                        class="ma-2" 
                        v-for="(item,index) in products" 
                        :key="index"
                        @click="toEdit(item._id)"
                    >
                        <img
                            :src="item.defaultImg"
                            height="150" width="250"
                        />
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" class="pa-1">
                                    <h4>Nombre: {{item.name}}</h4>
                                </v-col>
                                <v-col cols="12" class="pa-1">
                                    <h4 >Cantidad: {{item.quantity}}</h4>
                                </v-col>
                                <v-col cols="12" class="pa-1">
                                    <h4 >Precio: {{item.price}}</h4>
                                </v-col>
                                <v-col cols="12" class="pa-1">
                                    <h4 >Fecha: {{ now(item.date)}}</h4>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="400" elevation="15" class="pa-3">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h1 class="text-center">Detalles de la cotización</h1>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Total: {{mont}}</h4>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Cliente: {{user}}</h4>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Correo: {{email}}</h4>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Teléfono: {{phone}}</h4>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                
                <v-row>
                    <v-col cols="12">
                        <h1 class="text-center">Comentarios del Admin al correo del cliente</h1>
                        <p>Se recomienda solo enviar a lo mas 2 comentarios, para evitar confusiones tambien puede escribirle a su whatsapp {{phone}}</p>
                    </v-col>
                    <v-col cols="12">
                        <v-form ref="form">
                            <v-textarea
                                outlined
                                label="Envie una respuesta"
                                v-model="rexponseText"
                                :rules="rexponseTextRules"
                            >
                            </v-textarea>
                        </v-form>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-btn @click="sendComment" large color="secondary" class="text-capitalize">Enviar Comentario</v-btn>
                    </v-col>
                    <v-col cols="12">
                        <v-card class="ma-1" v-for="(item,j) in comments" :key="j" color="accent">
                            <v-card-text>
                                <p class="white--text">{{item.name}} : {{item.comment}}</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
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

import {mapState,mapMutations} from 'vuex';
import qs from 'qs';
import Dialog from '@/components/DialogMessage';

export default {
    components:{
        Dialog
    },
    props:['id'],
    data() {
        return{
            products:[],
            user:'',
            email:'',
            phone:'',
            rexponseText:'',
            rexponseTextRules: [
                v => !!v || 'El comentario es requerido',
            ],
            comments:[],

            message:'',
            dialog:false,
            redir:false,
        }
    },
    methods:{
        toEdit(id){
            this.$router.push('/producteditadm/'+id);
        },
        img(img){
            console.log(img);
        },
        sendComment(){
            if(this.$refs.form.validate()){
                this.axios({
                    method: 'POST',
                    data:qs.stringify({
                        message:this.rexponseText
                    }),
                    url:'/cotz/mail/'+this.id,
                }).then(response=>response.data)
                .then(resp=>{
                    this.dialog=true;
                    this.message=resp.message+'';
                    this.redir=true;
                    this.comments.push(resp.data);
                    this.rexponseText='';
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
                this.$refs.form.validate()
            }
        },
        init(){
            this.axios({
                method: 'GET',
                data:null,
                url:'/cotz/getAn/'+this.id,
            }).then(response=>response.data.data)
            .then(resp=>{
                this.products=resp.products;
                this.user=resp.name;
                this.email=resp.email;
                this.phone=resp.phone;
                this.comments=resp.comments;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        now(x){
            return this.$moment(x).fromNow();
        },
        ok(){
            this.dialog=false;
        }
    },
    computed:{
        mont(){
            return this.products.reduce((a,b)=>{return a+b.price*b.quantity},0);
        }
    },
    created(){
        this.init();
    }
}
</script>