<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Productos pedidos:</h1>
                <p class="text-justify">(El precio de los productos es el precio al momento de añadir al carrito del cliente)</p>
            </v-col>
            <v-col cols="12">
                <v-row justify="center">
                    <v-card
                        color="gray"
                        width="250" 
                        elevation="15" 
                        class="ma-2" v-for="(item,index) in products" 
                        :key="index"
                        @click="toEdit(item.productId)"
                        style="border-radius:1em"
                    >
                        <v-img
                            :src="item.defaultImg"
                            height="200"
                        ></v-img>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" class="pa-1">
                                    <h3>Nombre: {{item.name}}</h3>
                                </v-col>
                                <v-col cols="12" class="pa-1">
                                    <h3>Cantidad: {{item.quantity}}</h3>
                                </v-col>
                                <v-col cols="12" class="pa-1">
                                    <h3 >Precio: {{item.price}}</h3>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <h1 class="accent--text text-center">{{mont}} BOB</h1>
                        <h3 class="text-center">Monto Total para generar el código qr:</h3>
                        <p class="text-center">Puede enviar otro qr para editar/eliminar el enviado</p>
                    </v-col>
                    <v-col cols="12" sm="6" class="d-flex justify-center">
                        <Drag
                            @drop-item="img"
                        />
                    </v-col>
                    <v-col cols="12" sm="6" class="d-flex justify-center">
                        <v-card style="border-radius:1em"  class="pa-2" elevation="15" v-if="qrReturn!=''">
                            <h4 class="text-center accent--text">Enviado a "{{user}}" por "{{nameAdmin}}"</h4>
                            <v-img :src="qrReturn" width="250" height="250" ></v-img>
                        </v-card>
                        <v-card style="border-radius:1em" width="300" height="300" class="pa-1" elevation="15" v-else>
                            <h4 class="text-center">Aún no se envió un qr</h4>
                            <v-row justify="center">
                                <v-icon size="280" color="accent">{{alertIcon}}</v-icon>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-btn large class="text-capitalize" color="secondary" @click="sending">Enviar qr</v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="400" elevation="15" color="primary" dark class="pa-3" style="border-radius:1em">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h1 class="text-center">Detalles del pedido</h1>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Tiempo: {{date}}</h4>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Total: {{mont}} BOB</h4>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Cliente: {{user}}</h4>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Ciudad: {{city}}</h4>
                            </v-col>
                            <v-col cols="12" class="pa-1">
                                <h4>Calle: {{street}}</h4>
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
                        <h1>Respuesta del cliente</h1>
                        <p>(La imagen aparecerá cuando el cliente envíe el recibo)</p>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                        <v-card style="border-radius:1em" elevation="15" class="pa-0" v-if="receiptImage!=''">
                            <v-img :src="receiptImage" width="500" height="600"></v-img>
                        </v-card>
                        <v-card style="border-radius:1em" elevation="15" class="pa-0" v-else>
                            <v-icon size="500" color="accent">{{alertIcon}}</v-icon>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <h3>{{user}}: {{receiptDescription}}</h3>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <h1>Comentarios del Admin al correo del cliente</h1>
                        <p>Se recomienda solo enviar a lo mas 2 comentarios, para evitar confusiones escribale a su whatsapp {{phone}}</p>
                    </v-col>
                    <v-col cols="12">
                        <v-form ref="form">
                            <v-textarea
                                outlined
                                label="Envie una respuesta"
                                v-model="rexponseText"
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
        <v-btn
            fab
            fixed
            icon
            bottom
            right
            class="pa-0"
            width="100"
            height="100"
            @click="dialog2=true"
            v-if="!sendState"
        >
            <v-icon size="100" color="secondary">{{icon}}</v-icon>
        </v-btn>
        <v-dialog
            v-model="dialog"
            width="400"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h3 class="text--primary text-center">{{message}}</h3>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialog=false" color="primary">Okay</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog2"
            width="400"
        >
            <v-card class="pa-5">
                <v-card-text>
                    <h3 class="text--primary text-center">Confirmar envio del pedido</h3>
                </v-card-text>
                <v-card-actions>
                    <v-btn small @click="dialog2=false" color="primary">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn small @click="confirm" color="primary">Si</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="dialog3"
            width="400"
        >
            <v-card class="pa-5" color="primary" dark style="border-radius:1em">
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-flex d-flex class="fill-height">
                                <v-row align-content="center">
                                    <v-col cols="12" class="pa-1">
                                        <h4 class="text-center" v-if="sendState">Se confirmó el envio de este pedido</h4>
                                        <h4 class="text-center" v-else>Pulse el ícono para confirmar el envío del pedido al cliente {{user}}</h4>
                                    </v-col>
                                    <v-col cols="12" class="pa-1 d-flex justify-center">
                                        <v-icon color="accent" size="50">{{icon}}</v-icon>
                                    </v-col>
                                </v-row>
                            </v-flex>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small @click="dialog3=false" color="accent">Okay</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import Drag from '@/components/admin/DragImageAdmin';
import { mdiAlertCircleOutline } from '@mdi/js';
import qs from 'qs';
import { mdiSendCircle } from '@mdi/js';
import {mapMutations,mapState} from 'vuex';

export default {
    props:['id'],
    components:{
        Drag
    },
    data() {
        return{
            dialog:false,
            dialog2:false,
            dialog3:true,
            products:[],
            date:null,
            user:'',
            city:'',
            street:'',
            phone:'',
            qrImage:'',
            imgFile:null,
            receiptImage:'',
            receiptDescription:'',
            rexponseText:'',
            comments:[],
            alertIcon:mdiAlertCircleOutline,
            message:'',
            sendState:false,
            icon:mdiSendCircle,
            nameAdmin:'',
        }
    },
    methods:{
        ...mapMutations(['pushNotification']),
        toEdit(id){
            this.$router.push('/producteditadm/'+id);
        },
        img(img){
            this.imgFile=img.image;
        },
        sendComment(){
            if(this.$refs.form.validate()){
                this.axios({
                    method: 'PATCH',
                    data:qs.stringify({
                        message:this.rexponseText
                    }),
                    url:'/qr/mail/'+this.id,
                }).then(response=>response.data)
                .then(resp=>{
                    this.dialog=true;
                    this.message=resp.message+'';
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
                url:'/qr/product/'+this.id,
            }).then(response=>response.data)
            .then(resp=>{
                this.products=resp.products;
                this.user=resp.nameUser;
                this.date=this.$moment(resp.date).fromNow();
                this.city=resp.city;
                this.street=resp.direction;
                this.phone=resp.phoneConfirm;
                this.qrImage=resp.qrImage;
                this.receiptImage=resp.receiptImage;
                this.receiptDescription=resp.receiptDescription;
                this.comments=resp.comments;
                this.sendState=resp.sendState;
                this.nameAdmin=resp.adminId.name;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        sending(){
            if(this.imgFile!=null){
                let formData=new FormData();
                formData.append('img',this.imgFile);
                this.axios({
                    method: 'PATCH',
                    data:formData,
                    url:'/qr/imgQr/'+this.id,
                }).then(response=>response.data)
                .then(resp=>{
                    this.dialog=true;
                    this.message=resp.message;
                    this.qrImage=resp.path;
                })
                .catch(err=>{
                    this.dialog=true;
                    this.message='Error en la respuesta';
                });
            }else{
                this.dialog=true;
                this.message='Se requiere enviar la imagen qr con el monto';
            }
        },
        confirm(){
            this.dialog2=false;
            this.axios({
                method: 'POST',
                data:qs.stringify({
                    id:this.id
                }),
                url:'/qr/confirm',
            }).then(response=>response.data)
            .then(resp=>{
                this.dialog=true;
                this.sendState=true;
                this.message=resp.message;
                this.pushNotification(this.notification-1);
            })
            .catch(err=>{
                this.dialog=true;
                this.message='Error en la respuesta';
            });
        }
    },
    computed:{
        ...mapState(['notification']),
        mont(){
            return this.products.reduce((a,b)=>{return a+b.price*b.quantity},0);
        },
        qrReturn(){
            return this.qrImage?this.qrImage:'';
        }

    },
    created(){
        this.init();
    }
}
</script>