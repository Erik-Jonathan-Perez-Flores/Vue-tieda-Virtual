<template>
    <Denied v-if="!session"/>
    <v-container v-else>
        <v-row>
            <v-col cols="12">
                <h1 class="text-center accent--text">Servicio Técnico (Citas)</h1>
            </v-col>
            <v-col cols="12">
                <v-form v-model="valid" ref="form">
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" class="d-flex justify-center">
                                <ImageDrag
                                    @drop-item="img"
                                />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-flex d-flex class="fill-height">
                                    <v-row align-content="center">
                                        <v-textarea
                                            v-model="description"
                                            :rules="descriptionRules"
                                            label="Descripción de la falla"
                                            required
                                            outlined
                                            color="white"
                                        ></v-textarea>
                                    </v-row>
                                </v-flex>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="Seleccione la fecha"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        outlined
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    no-title
                                    scrollable
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                    >
                                        Cancelar
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(date)"
                                    >
                                        Okay
                                    </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-menu
                                    ref="menu2"
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="time"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="time"
                                        :rules="timeRules"
                                        label="Seleccione el horario"
                                        prepend-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        color="white"
                                        outlined
                                    ></v-text-field>
                                    </template>
                                    <v-time-picker
                                        v-if="menu2"
                                        v-model="time"
                                        full-width
                                        @click:minute="$refs.menu2.save(time)"
                                    ></v-time-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" class="d-flex justify-center">
                                <v-btn x-large color="secondary" class="text-capitalize" @click="send">
                                    Reservar
                                </v-btn>
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

import ImageDrag from '@/components/client/DragImage';
import Dialog from '@/components/DialogMessage';
import Denied from '@/components/DeniedClient';
import {mapState} from 'vuex';

export default {
    components:{
        ImageDrag,Dialog,Denied
    },
    data() {
        return{
            valid: false,
            image: null,
            description: '',
            descriptionRules: [
                v => !!v || 'La descripción es requerida',
            ],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            time: null,
            timeRules: [
                v => !!v || 'El horario es requerido',
            ],
            menu2: false,

            dialog: false,
            message: '',
            redir: false,
        }
    },
    methods:{
        send(){
            if(this.$refs.form.validate()&&this.image!=null){
                let formData=new FormData();
                formData.append('hour',this.time);
                formData.append('date',this.date);
                formData.append('description',this.description);
                formData.append('img',this.image);
                this.axios({
                    method: 'POST',
                    data: formData,
                    url:'/serv',
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
            }else if(this.image==null){
                this.dialog=true;
                this.message='Se requiere una imagen para soporte';
            }else{
                this.$refs.form.validate();
            }
        },
        img(ob){
            this.image=ob.image;
        },
        ok(){
            if(this.redir){
                this.$router.push('/');
            }
            this.dialog=false;
        }
    },
    computed:{
        ...mapState(['session']),
    },
}
</script>