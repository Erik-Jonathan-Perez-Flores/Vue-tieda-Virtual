<template>
    <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        chips
        clearable
        hide-details
        hide-selected
        outlined
        item-text="name"
        item-value="symbol"
        label="Búsca tu producto por categoría..."
        solo
    >
        <template v-slot:no-data>
            <v-list-item>
            <v-list-item-title>
                Búsca tu producto por
                <strong>categoría</strong>
            </v-list-item-title>
            </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
                v-bind="attr"
                :input-value="selected"
                color="accent"
                class="white--text"
                v-on="on"
            >
                <v-icon left>
                    {{icon}}
                </v-icon>
                <span v-text="item.name"></span>
            </v-chip>
        </template>
        <template v-slot:item="{ item }">
            <v-list-item-avatar
                
            >
                <v-img :src="item.path" @error="require('@/assets/logo.jpeg')"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
                <v-icon>{{icon}}</v-icon>
            </v-list-item-action>
        </template>
    </v-autocomplete>
</template>

<script>

import { mdiShapeOutline } from '@mdi/js';

export default {
    data: () => ({
        isLoading: false,
        items: [],
        model: null,
        search: null,
        tab: null,
        icon:mdiShapeOutline
    }),
    watch: {
        model (val) {
            if (val != null){ 
                this.tab = 0;
                let index=this.items.findIndex(dat=>{return dat.name==this.model});
                this.$emit('change-text',{id:this.items[index]._id});
            }
            else {
                this.tab = null;
                this.$emit('change-text',{id:null});
            }
        },
        search (val) {
            // Items have already been loaded
            if (this.items.length > 0) return

            this.isLoading = true
            this.axios({
                method: 'GET',
                data:null,
                url:'/category',
            })
            .then(res => res.data)
            .then(response=>{
                this.items=response;
            }).catch(err=>{
                console.log(err)
            }).finally(() => (this.isLoading = false));
        },
    },
}
</script>