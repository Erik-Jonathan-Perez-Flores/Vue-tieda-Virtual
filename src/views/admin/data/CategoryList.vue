<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Lista de Categorias:</h1>
            </v-col>
            <v-col cols="12">
                <Search
                    :place="'Busca alguna categoría...'"
                    @search-text="textQuery"
                />
            </v-col>
            <v-col cols="12" v-if="category.length>0">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">
                                Nro
                            </th>
                            <th class="text-left">
                                Nombre
                            </th>
                            <th class="text-left">
                                Imagen
                            </th>
                            <th class="text-left">
                                Acción
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            v-for="(item,index) in category"
                            :key="index"
                        >
                            <td>{{index+1}}</td>
                            <td>{{ item.name }}</td>
                            <td >
                                <v-img :src="item.path" width="50" height="50"></v-img>
                            </td>
                            <td>
                                <v-btn text small @click="editProduct(item._id)">
                                    <v-icon color="accent">{{edit}}</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
            <v-col cols="12" class="d-flex justify-center" v-else>
                <v-icon size="200" color="accent">{{iconDatabase}}</v-icon>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { mdiPencilOutline,mdiTrashCanOutline,mdiDatabaseRefresh } from '@mdi/js';
import Search from '@/components/admin/Search';

export default {
    components:{
        Search
    },
    data() {
        return{
            category:[],
            edit:mdiPencilOutline,
            skip:0,
            limit:10,
            call:true,
            scrolledToBottom:true,
            message:'',
            iconDatabase:mdiDatabaseRefresh,

            search:'',
        }
    },
    mounted(){
        this.scroll();
    },
    methods:{
        editProduct(id){
            this.$router.push('/updatecategory/'+id);
        },
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
            if(!this.call)return;
            this.call=false;
            this.axios({
                method: 'GET',
                data:null,
                url:'/category?skip='+this.skip+'&limit='+this.limit+'&search='+this.search,
            }).then(response=>response.data)
            .then(resp=>{
                if(resp&&resp.length>0){
                    this.category=this.category.concat(resp);
                    this.skip+=10;
                    this.scrolledToBottom=true;
                    this.call = true;
                    return;
                }
                this.call = false;
            })
            .catch(err=>{
                console.log(err);
            });
        },
        textQuery(ob){
            this.search=ob.text;
            this.skip=0;
            this.callApi=true;
            this.category=[];
            this.init();
        }
    },
    created(){
        this.init();
    },
}
</script>