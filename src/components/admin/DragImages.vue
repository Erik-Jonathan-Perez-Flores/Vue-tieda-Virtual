<template>
    <div class="drop" 
        :class="getClasses" 
        @dragover.prevent="dragOver" 
        @dragleave.prevent="dragLeave"
        @drop.prevent="drop($event)"
    >
        <v-row v-if="imagesDrag.length>0">
            <v-col cols="12">
                <v-responsive class="overflow-y-auto" height="300">
                    <v-row>
                        <v-col cols="12" sm="6" v-for="(img,n) in imagesDrag" :key="n" class="d-flex justify-center">
                            <v-card width="250" class="ma-7">
                                <v-card-text>
                                    <v-img :src="img" width="250" height="250"/>
                                </v-card-text>
                                <v-btn @click="removeImg(n)"  x-small fab absolute top right color="primary">
                                    <v-icon>{{closeImg}}</v-icon>
                                </v-btn>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-responsive>
            </v-col>
        </v-row>
        
        <label for="uploadmyfile" v-if="imageSources.length == 0 && !isDragging">
            <v-row style="cursor:pointer" class="d-flex fill-height align-center">
                <v-col cols="12" class="d-flex justify-center">
                    <v-icon size="50" color="accent">{{icon}}</v-icon>
                    <v-icon size="50" color="accent">{{click}}</v-icon>
                </v-col>
            </v-row>
        </label>

        <div class="manual">
            <v-btn fab>
                <label for="uploadmyfile">
                    <v-icon color="accent" size="30" style="cursor:pointer">{{plus}}</v-icon>
                </label>
            </v-btn>
            <input type="file" id="uploadmyfile" :accept="'image/*'" multiple @change="requestUploadFile">
        </div>

    </div>
</template>

<script>

import { mdiFileImage,mdiBookPlusMultipleOutline,mdiCloseOctagon,mdiCursorDefaultClickOutline } from '@mdi/js';

export default {
  name: 'DragImages',
  data(){
    return{
        isDragging:false,
        imageSources:[],
        icon:mdiFileImage,
        plus:mdiBookPlusMultipleOutline,
        closeImg:mdiCloseOctagon,
        click:mdiCursorDefaultClickOutline
    }
  },
  computed:{
    getClasses(){
        return {isDragging: this.isDragging}
    },
    imagesDrag(){
        return this.imageSources;
    }
  },
  methods:{
    close(){
      console.log('close');
      
    },
    dragOver(){
        this.isDragging = true
    },
    dragLeave(){
        this.isDragging = false
    },
    async drop(e){
        let files = [...e.dataTransfer.files]
        let images = files.filter(file => file.type.indexOf('image/') >= 0)
        //images
        this.$emit('drag-images',{data:images});
        let promises = []
        images.forEach(file => {
            promises.push(this.getBase64(file))
        })
        let sources = await Promise.all(promises)
        this.imageSources = this.imageSources.concat(sources)      
        this.isDragging = false
    },

    requestUploadFile(){
      var src = this.$el.querySelector('#uploadmyfile')
      this.drop({dataTransfer:src})
    },

    getBase64(file) {
        const reader = new FileReader()
        return new Promise(resolve => {
            reader.onload = ev => {
                resolve(ev.target.result)
            }
            reader.readAsDataURL(file)
        })
    },
    removeImg(n){
        let sources=[];
        this.imageSources.forEach((element, x) => {
            if(n!=x)
                sources.push(element);
        });
        this.imageSources=sources;
        this.$emit('remove-element',{pos:n});
    }
  }
}
</script>



<style scoped>
.drop{
  width: 100%;
  height: 300px;
  background-color: #eee;
  border:10px solid #eee;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  transition: background-color .2s ease-in-out;

  font-family: sans-serif;

  overflow: hidden;
  position: relative;
}

.isDragging{
  background-color: #999;
  border-color: #fff;
}

.img{
    padding:1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.manual{
  position: absolute;
  top:0;
  right:0;
  width:100%;
  font-size:.8rem;
  text-decoration: underline;
}
#uploadmyfile{
  display: none;
}
</style>