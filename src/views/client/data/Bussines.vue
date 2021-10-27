<template>
    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <v-card width="400" style="border-radius:2em" elevation="15" class="pa-5">
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
                                <h3 class="accent--text">Teléfono:</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3>{{phone}}</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3 class="accent--text">Móvil:</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3>{{movil}}</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3 class="accent--text">Dirección:</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3>{{direction}}</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3 class="accent--text">Ciudad:</h3>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <h3>{{city}}</h3>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            name:'',
            path:'',
            direction:'',
            phone:'',
            movil:'',
            city:''
        }
    },
    computed:{
        getAvatar(){
            return this.path!=''?this.path:require('@/assets/logo.jpeg');
        },
    },
    methods:{
        init(){
            this.axios({
                method: 'GET',
                data:null,
                url:'/user/business',
            }).then(response=>response.data[0])
            .then(resp=>{
                this.name=resp.name;
                this.path=resp.path;
                this.direction=resp.direction;
                this.phone=resp.phone;
                this.movil=resp.movil;
                this.city=resp.city;
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