import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1A2351', // #E53935   -->#1565C0   #549B5B
                secondary: '#2C6A60', // #FFCDD2  -->#81C784                  
                accent: '#0A3461', // #3F51B5   -->#F4511E
                error: '#FF2727',
                white: '#fff',
                gray: '#BBBBBB',
                BOB: '#264B37',
                Desc: '#898787',
                Black:'#000',
                Env:'#0089E1',
            },
        },
    },
});
