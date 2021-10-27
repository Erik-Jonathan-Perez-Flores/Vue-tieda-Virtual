<template>
    <v-text-field
        v-model="model"
        dense
        :placeholder="place"
        outlined
    >
    </v-text-field>
</template>

<script>
    export default {
        data: () => ({
            model: null,
        }),
        watch: {
            model (val) {
                if (val != null){
                    this.send(val);
                }
            },
        },
        methods:{
            send(x){
                this.$emit('search-text',{text:x})
            }
        },
        props:{
            place:{
                type:String
            }
        }
    }
</script>