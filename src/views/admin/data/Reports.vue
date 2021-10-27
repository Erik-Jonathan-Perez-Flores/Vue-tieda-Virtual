<template @scroll="scrollhome">
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Detalle de ventas:</h1>
            </v-col>
            <v-col cols="12">
                <Search
                    :lab="'Busca el reporte entre rango de fechas...'"
                    @date-range="dateRange"
                />
            </v-col>
            <v-col cols="12" v-if="reports.length==0" class="d-flex justify-center">
                <v-icon size="200" color="accent">{{iconDatabase}}</v-icon>
            </v-col>
            <v-col cols="12" v-else>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    Nro
                                </th>
                                <th class="text-left">
                                    Fecha
                                </th>
                                <th class="text-left">
                                    Admin (Generó el qr de pago)
                                </th>
                                <th class="text-left">
                                    Cliente
                                </th>
                                <th class="text-left">
                                    Producto
                                </th>
                                <th class="text-left">
                                    Precio
                                </th>
                                <th class="text-left">
                                    Cantidad
                                </th>
                                <th class="text-left">
                                    Total
                                </th>
                                <th class="text-left">
                                    Imagen
                                </th>
                                <th class="text-left">
                                    La garantía comenzó
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(item,index) in reports"
                            :key="index"
                        >
                            <td>{{index+1}}</td>
                            <td>{{ now2(item.date) }}</td>
                            <td>{{ item.adminName }}</td>
                            <td>{{ item.userName }}</td>
                            <td>{{ item.product.name }}</td>
                            <td>{{ item.product.price }}</td>
                            <td>{{ item.product.quantity }}</td>
                            <td>{{ item.product.price*item.product.quantity }}</td>
                            <td><v-img width="70" height="70" :src="item.product.defaultImg" @click="toImg(item.product.defaultImg)" style="cursor:pointer"></v-img></td>
                            <td>{{ now(item.product.date) }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            width="400"
        >
            <v-card>
                <v-img :src="imgA" height="400"></v-img>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import Search from '@/components/admin/SearchDate';
import { mdiDatabaseRefresh} from '@mdi/js';

export default {
    components:{
        Search
    },
    data() {
        return{
            reports:[],
            scrollBottom:false,
            iconDatabase:mdiDatabaseRefresh,

            skip:0,
            limit:10,
            callApi:true,

            date1:'',
            date2:'',
            message:'',
            imgA:'',
            dialog:false
        }
    },
    mounted () {
        this.scroll();
    },
    computed:{
        dateRangeText(){
            return this.dates[0]+' '+this.dates[1];
        }
    },
    methods:{
        now(x){
            return this.$moment(x).fromNow();
        },
        now2(x){
            let dated=new Date(x);
            return dated.getUTCFullYear()+'-'+(dated.getUTCMonth() + 1)+'-'+dated.getUTCDate();
        },
        scroll(){
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow&&this.callApi) {
                    this.scrollBottom=true;
                    this.init();
                }
            }
        },
        init(){
            if(!this.callApi)return;
            this.callApi=false;
            this.axios({
                method: 'GET',
                data:null,
                url:'/report?skip='+this.skip+'&limit='+this.limit+'&date1='+this.date1+'&date2='+this.date2,
            }).then(response=>response.data)
            .then(resp=>{
                this.reports=this.reports.concat(resp);
                this.callApi=true;
                if(resp.length==0)this.callApi=false;
                this.skip+=this.limit;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        toImg(x){
            this.dialog=true;
            this.imgA=x;
        },
        dateRange(ob){
            let arr=ob.date;
            let val1=new Date(arr[0]);
            let val2=new Date(arr[1]);
            if(!isNaN(val1.getTime())&&!isNaN(val2.getTime())){
                this.date1=arr[0];
                this.date2=arr[1];
                this.skip=0;
                this.callApi=true;
                this.reports=[];
                this.init();
            }
        }
    },
    created(){
        this.init();
    }
}
</script>