<template>
    <v-container class="d-flex justify-center">
        <v-card elevation="15" width="700">
            <v-card-text>
                <v-form
                    ref="form"
                    lazy-validation
                >
                    <v-row>
                        <v-col cols="12" class="pa-1">
                            <h1 class="accent--text text-center">Inserte sus imágenes</h1>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <Images
                                @drag-images="myImages"
                                @remove-element="removeImg"
                            />
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-text-field
                                v-model="name"
                                :rules="nameRules"
                                label="Nombre"
                                dense
                                outlined
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pa-1">
                            <v-text-field
                                v-model="quantity"
                                :rules="quantityRules"
                                label="Cantidad"
                                type="number"
                                dense
                                outlined
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pa-1">
                            <Category
                                @charge-category="cat"
                            />
                        </v-col>
                        <v-col cols="12" sm="6" class="pa-1">
                            <v-text-field
                                v-model="price"
                                :rules="priceRules"
                                label="Precio venta (BOB)"
                                dense
                                outlined
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pa-1">
                            <v-text-field
                                v-model="discount"
                                :rules="discountRules"
                                label="Descuento (BOB)"
                                dense
                                outlined
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-1">
                            <v-textarea
                                v-model="description"
                                :rules="descriptionRules"
                                label="Descripción"
                                dense
                                outlined
                            >
                            </v-textarea>
                        </v-col>
                        
                        <v-col cols="12" class="d-flex justify-center">
                            <v-btn color="secondary" large @click="saveProduct">Guardar</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
        <Dialog
            :message="message"
            :dialog="dialog"
            :redir="redir"
            @ok-template="ok"
        />
    </v-container>
</template>


<script>

import Images from '@/components/admin/DragImages';
import Category from '@/components/admin/SearchCategory';
import {mapState,mapMutations} from 'vuex';
import Dialog from '@/components/DialogMessage';

export default {
    components:{
        Images,Category,Dialog
    },
    data() {
        return{
            name: '',
            nameRules: [
                v => !!v || 'El nombre es requerido',
            ],
            quantity: '',
            quantityRules: [
                v => !!v || 'La cantidad es reuqrida',
            ],
            price: '',
            priceRules: [
                v => !!v || 'El precio es requerido',
            ],
            discount: '',
            discountRules: [
                v => !!v || 'El descuento es requerido',
            ],
            description: '',
            descriptionRules: [
                v => !!v || 'La descripción es requerida',
            ],
            category:'',
            message:'',
            dialog:false,
            redir:false,
            filesImg:[]
        }
    },
    methods:{
        cat(data){
            this.category=data._id?data._id:'';
            console.log(this.category);
        },
        saveProduct(){
            if(this.$refs.form.validate()){
                if(this.filesImg.length==0){
                    this.dialog=true;
                    this.message='Se requiere al menos una imagen';
                }else if(this.category==''){
                    this.dialog=true;
                    this.message='Se requiere la categorìa a la que pertenece el producto';
                }else{
                    let formData=new FormData();
                    formData.append('name',this.name);
                    formData.append('price',this.price);
                    formData.append('discount',this.discount);
                    formData.append('quantity',this.quantity);
                    formData.append('description',this.description);
                    formData.append('category',this.category);
                    for (let x = 0; x < this.filesImg.length; x++) {
                        const element = this.filesImg[x];
                        formData.append('img',element);   
                    }
                    this.axios({
                        method: 'POST',
                        data:formData,
                        url:'/product',
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
                this.$router.push('/productlistadm');
            }
            this.dialog=false;
        },
        myImages(im){
            this.filesImg=this.filesImg.concat(im.data);
        },
        removeImg(obj){
            this.filesImg.splice(obj.pos,1);
        }
    }
}
</script>