<template>
    <v-dialog
        v-model="dialog"
        width="250"
        persistent
    >
        <v-card class="pa-5">
            <v-card-text>
                <h2 class="text-center">{{message}}</h2>
            </v-card-text>
            <v-card-actions>
                <v-divider></v-divider>
                <v-btn small color="primary" @click="ok" v-if="redir">Ok</v-btn>
                <v-btn small color="error" @click="ok" v-else>Ok</v-btn>
                <v-divider></v-divider>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return{}
    },
    props:{
        message:{
            type:String
        },
        dialog:{
            type:Boolean
        },
        redir:{
            type:Boolean,
            default:false
        },
    },
    methods:{
        ok(){
            this.$emit('ok-template',{});
        }
    }
}
</script>