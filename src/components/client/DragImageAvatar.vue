<template>
  <v-card color="secondary" class="pa-1" height="300" width="300">
    <div class="drop" 
        :class="getClasses" 
        @dragover.prevent="dragOver" 
        @dragleave.prevent="dragLeave"
        @drop.prevent="drop($event)"
        style="position:relative"
    >
        <img :src="imageSource" v-if="imageSource" />
        
        <label for="uploadmyfile">
            <h1 v-if="wrongFile" class="primary--text text-center" style="cursor:pointer">Error en el formato de archivo</h1>
            <v-icon v-if="!imageSource && !isDragging && !wrongFile" size="200" color="accent" style="cursor:pointer">{{icon}}</v-icon>
        </label>
        <input type="file" id="uploadmyfile" :accept="'image/*'" multiple @change="requestUploadFile">
        <v-btn 
            color="secondary" 
            fab dark absolute 
            right 
            top 
            x-small
            @click="closeImg"
            v-if="imageSource"
        >
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </div>
  </v-card>
</template>


<script>

import { mdiAccount } from '@mdi/js';

export default {
    name: 'AImagePick',
    data(){
        return{
            isDragging:false,
            wrongFile:false,
            imageSource:null,
            icon:mdiAccount
        }
    },
    computed:{
        getClasses(){
            return {isDragging: this.isDragging};
        }
    },
    methods:{
        dragOver(){
            this.isDragging = true;
        },
        dragLeave(){
            this.isDragging = false;
        },
        drop(e){
            let files = e.dataTransfer.files;
            this.wrongFile = false;
            if (files.length === 1) {
                let file = files[0];
                if (file.type.indexOf('image/') >= 0) {

                    var reader = new FileReader();
                    reader.onload = f => {
                        this.imageSource = f.target.result;
                        this.$emit('drop-item',{image:file});
                        this.isDragging = false;
                    }
                    reader.readAsDataURL(file);
                }else{
                    this.wrongFile = true;
                    this.imageSource = null;
                    this.isDragging = false;
                }
            }
        },
        onRequestUploadFiles(){
        
        },
        requestUploadFile(){
            var src = this.$el.querySelector('#uploadmyfile')
            this.drop({dataTransfer:src})
        },
        closeImg(){
            this.wrongFile = false;
            this.imageSource = null;
            this.isDragging = false;
            this.$emit('drop-item',{image:null});
        }
    }
}
</script>


<style scoped>
.drop{
  width: 100%;
  height: 100%;
  background-color: #eee;
  border:10px solid #eee;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  transition: background-color .2s ease-in-out;

  font-family: sans-serif;
}

.isDragging{
  background-color: #999;
  border-color: #fff;
}

img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#uploadmyfile{
  display: none;
}
</style>