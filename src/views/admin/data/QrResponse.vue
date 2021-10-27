<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Solicitudes de pago para envio:</h1>
            </v-col>
            <v-col cols="12">
                <v-row class="mb-10">
                    <v-col cols="12" sm="4">
                        <h4 class="text-center mb-2">QR enviado</h4>
                        <v-row justify="center">
                            <v-icon size="50" color="accent">{{qr}}</v-icon>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <h4 class="text-center mb-2">Respuesta del usuario</h4>
                        <v-row justify="center">
                            <v-icon size="50" color="accent">{{user}}</v-icon>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="4">
                        <h4 class="text-center mb-2">Producto enviado</h4>
                        <v-row justify="center">
                            <v-icon size="50" color="accent">{{send}}</v-icon>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <Search
                    :lab="'Busca alguna solicitud entre rango de fechas...'"
                    @date-range="dateRange"
                />
            </v-col>
            <v-col cols="12" v-if="qrs.length==0" class="d-flex justify-center">
                <v-icon size="200" color="accent">{{iconDatabase}}</v-icon>
            </v-col>
            <v-col cols="12"  v-for="(item,index) in qrs" :key="index" v-else>
                <QR
                    :_id="item._id"
                    :products="item.products"
                    :state="item.state"
                    :client="item.clientState"
                    :send="item.sendState"
                    :date="new Date(item.date)"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import QR from '@/components/admin/ItemQrResponse';
import Search from '@/components/admin/SearchDate';
import { mdiQrcode, mdiAccountCheckOutline, mdiSendCircle, mdiDatabaseRefresh} from '@mdi/js';

export default {
    components:{
       QR,Search
    },
    data() {
        return{
            qrs:[],
            skip:0,
            limit:10,
            callApi:true,
            scrolledToBottom:true,
            iconDatabase:mdiDatabaseRefresh,

            date1:'',
            date2:'',
            qr:mdiQrcode,
            user:mdiAccountCheckOutline,
            send:mdiSendCircle
        }
    },
    mounted(){
        this.scroll();
    },
    methods:{
        scroll () {
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    if(this.call&&this.scrolledToBottom){
                        this.scrolledToBottom=false;
                        this.init();   
                    }
                }
            }
        },
        init(){
            if(!this.callApi)return;
            this.callApi=false;
            this.axios({
                method: 'GET',
                data:null,
                url:'/qr?skip='+this.skip+'&limit='+this.limit+'&date1='+this.date1+'&date2='+this.date2,
            }).then(response=>response.data)
            .then(resp=>{
                this.qrs=this.qrs.concat(resp);
                this.callApi=true;
                if(resp.length==0)this.callApi=false;
                this.skip+=this.limit;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        dateRange(ob){
            let arr=ob.date;
            this.date1=arr[0];
            this.date2=arr[1];
            let val1=new Date(arr[0]);
            let val2=new Date(arr[1]);
            if(!isNaN(val1.getTime())&&!isNaN(val2.getTime())){
                this.skip=0;
                this.callApi=true;
                this.qrs=[];
                this.init();
            }
        }
    },
    created(){
        this.init();
    }
    
}
</script>