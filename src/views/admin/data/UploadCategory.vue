<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Insertar Categoría</h1>
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
                                    <h2 class="accent--text text-center">Inserte una imagen</h2>
                                </v-col>
                                <v-col cols="12" class="d-flex justify-center">
                                    <Drag
                                        @drop-item="img"
                                    />
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

export default {
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
        }
    },
    methods:{
        img(file){
            this.myImg=file.image;
        },
        send(){
            if(this.$refs.form.validate()){
                if(this.myImg==null){
                    this.dialog=true;
                    this.message='Se requiere una imagen';
                }else{
                    let formData=new FormData();
                    formData.append('name',this.name);
                    formData.append('img',this.myImg);
                    this.axios({
                        method: 'POST',
                        data:formData,
                        url:'/category',
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
                this.$router.push('/homeadm');
            }
            this.dialog=false;
        }
    }
}
</script>