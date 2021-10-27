<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Editar Categoría</h1>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="500" elevation="15">
                    <v-card-text>
                        <v-form
                            ref="form"
                            lazy-validation
                        >
                            <v-row>
                                <v-col cols="12">
                                    <h2 class="accent--text text-center">Inserte una imagen para reemplazar la actual</h2>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center">
                                    <Drag
                                        @drop-item="img"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <h3 class="accent--text text-center">Imagen actual</h3>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center">
                                    <img @click="openImg" width="70" height="70" :src="path" style="cursor:pointer"/>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="name"
                                        :rules="nameRules"
                                        label="Nombre de la categoría"
                                        required
                                        outlined
                                        dense
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center">
                                    <v-btn large color="secondary" @click="send">Enviar</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog2"
            width="400"
        >
            <v-card>
                <v-img :src="path" height="400"></v-img>
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
    props:['id'],
    components:{
        Drag,Dialog
    },
    data() {
        return{
            name:'',
            nameRules: [
                v => !!v || 'El nombre es requerido',
            ],
            myImg:null,
            message:'',
            dialog:false,
            redir:false,
            path:'',
            dialog2:false,
        }
    },
    methods:{
        img(file){
            this.myImg=file.image;
        },
        send(){
            if(this.$refs.form.validate()){
                if(this.myImg==null){
                    this.axios({
                        method: 'PATCH',
                        data:qs.stringify({
                            name:this.name,
                        }),
                        url:'/category/'+this.id,
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
                    let formData=new FormData();
                    formData.append('name',this.name);
                    formData.append('img',this.myImg);
                    this.axios({
                        method: 'PATCH',
                        data:formData,
                        url:'/category/'+this.id,
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
                }
            }else{
                this.$refs.form.validate();
            }
        },
        ok(){
            if(this.redir){
                this.$router.push('/categorylist');
            }
            this.dialog=false;
        },
        init(){
            this.axios({
                method: 'GET',
                data:null,
                url:'/category/'+this.id,
            }).then(response=>response.data)
            .then(resp=>{
                this.name=resp.name;
                this.path=resp.path;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        openImg(){
            this.dialog2=true;
        }
    },
    created(){
        this.init();
    }
}
</script>