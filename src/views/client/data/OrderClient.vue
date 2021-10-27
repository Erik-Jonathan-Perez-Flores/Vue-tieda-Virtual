<template>
    <Denied v-if="!session"/>
    <v-container v-else>
        <v-row>
            <v-col cols="12">
                <h1 class="accent--text">Mis Pedidos Qr</h1>
            </v-col>
            <v-col cols="12" v-for="(item,index) in qrs" :key="index">
                <Qr
                    :_id="item._id"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import Qr from '@/components/client/ItemQr';
import Denied from '@/components/DeniedClient';
import {mapState} from 'vuex';

export default {
    components:{
        Qr,Denied
    },
    data() {
        return{
            qrs:[]
        }
    },
    computed:{
        ...mapState(['session']),
    },
    methods:{
        init(){
            if(!this.session)return;
            this.axios({
                method: 'GET',
                data:null,
                url:'/cart/getIdQr',
            }).then(response=>response.data)
            .then(resp=>{
                this.qrs=resp;
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