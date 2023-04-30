<script setup>
import { Buffer } from 'buffer'
import { useRouter } from 'vue-router';
import { create, urlSource } from 'ipfs-http-client'
const projectId = "2LDvBN1c4nepjCmxjQs8xBBI6ZX"
const projectSecret = "a5994954fe63db448795c03ee163442c"
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const Ipfs = new create({
  host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    authorization: auth,
  },
});
const upload = async () => {
    document.getElementById('overl').style.visibility = "visible";
  const file = document.getElementById('ipfsfile')
   const rescue=await Ipfs.add(file.files[0])
   document.getElementById('cid').innerHTML =rescue.cid.toString()
   document.getElementById('path').href ="https://medilogg.infura-ipfs.io/ipfs/"+rescue.cid.toString()
   document.getElementById("path").innerHTML = "https://medilogg.infura-ipfs.io/ipfs/"+rescue.cid.toString();
document.getElementById('res').innerHTML = "Uploaded Successfully"
  document.getElementById('overl').style.visibility = "hidden";

}
</script>
<template>
    <div class="overlay" id="overl">
    <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
        <p id="overlay-para">Wait for few seconds to complete the Request </p>
    </div>
</div>
    <div class="mx-10 my-20  p-20">

        <label class="block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload file</label>
        <input type="file" class="text-sm text-grey-500 w-15
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700"  id="ipfsfile" >
<p class="mt-1 text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

    <button @click="upload"
            :class="[true ? 'bg-indigo-600 text-white ml-3' : 'text-black-300 hover:bg-black-700 hover:text-indigo-500', 'px-3 py-2 rounded-md text-sm font-medium']"
            :aria-current="true ? 'page' : undefined"> Submit </button>
            <p id="res"></p>
            <p id="cid"></p>
            <a id="path" target="_blank"></a>
  </div>
</template>
<style scoped>
.input {
  font-family: 'Poppins', sans-serif !important;
}
#overlay-para{
  font-family: 'Poppins', sans-serif !important;
  position: absolute;
    top: 59%;
    left: 39%;
}
.overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    visibility: hidden;
    backdrop-filter: blur(1px);
}

.overlay__inner {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
}

.overlay__content {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    width: 75px;
    height: 75px;
    display: inline-block;
    border-width: 3.2px;
    border-color: rgba(96, 72, 72, 0.05);
    border-top-color:#5a67d8;
    animation: spin 1s infinite linear;
    border-radius: 100%;
    border-style: solid;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}</style>