<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="dateRangeText"
                :label="lab"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                dense
                outlined
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="dates"
            no-title
            range
            scrollable
        >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="menu = false"
            >
                Cancelar
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dates);$emit('date-range',{date:dates})"
            >
                Consultar
            </v-btn>
        </v-date-picker>
    </v-menu>    
</template>

<script>
export default {
    data(){
        return{
            dates: ['2021-10-10', '2021-10-20'],
            menu: false,
        }
    },
    props:{
        lab:{
            type:String
        }
    },
    computed:{
        dateRangeText(){
            return this.dates[0]+' '+this.dates[1];
        }
    },
}
</script>