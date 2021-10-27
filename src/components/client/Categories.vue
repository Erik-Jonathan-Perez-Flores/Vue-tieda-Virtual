<template>
    <v-card
        :color="act?'accent':'white'"
        :dark="act?true:false"
        @click="searchActive"
    >
        <v-card-text>
            <v-row>
                <v-col cols="3">
                    <v-img
                        :src="path"
                    ></v-img>
                </v-col>
                <v-col cols="9">
                    <h4>{{name}}</h4>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return{
            
        }
    },
    props:{
        path:{
            type:String
        },
        name:{
            type:String
        },
        active:{
            type:Boolean,
            default:false
        },
        _id:{
            type:String
        }
    },
    computed:{
        act(){
            return this.active;
        }
    },
    methods:{
        searchActive(){
            this.$emit('category-click',{_id:this._id});
        }
    }
}
</script>