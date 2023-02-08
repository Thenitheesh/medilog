<script setup >
import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'secure',
    description:
      'Blockchain is a secure network of blocks. Once a block is added to the blockchain, it will require the consensus of the majority of other nodes in the network to alter the data in the block.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Self correcting',
    description:
      'When the data in one of the blocks in the network is changed then other nodes in the network check their blocks, and cross-reference each other to root out the error.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Distributed',
    description:
      'Blockchain is a distributed ledger where independent computers record, share, and synchronize the transactions in their respective electronic ledgers.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Decentralized',
    description:
      'Blockchain is a decentralized network of nodes where no one has to trust or know anyone else in the network. Each member in the network has exact same copy of data as other nodes in the network.',
    icon: LockClosedIcon,
  }
]
/*import {ref} from 'vue';
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
/* const gett=()=>{
  let upfile=document.getElementById('hell')
  console.log(upfile.files[0])
}
 
 const uid =getAuth().currentUser.uid;
 const db = getFirestore(app);
 const gett=await setDoc(doc(db, "user",uid ), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
}); */
</script>


 <template>
  <div class="bg-rgb(245, 245, 245)  pb-24 sm:pb-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-lg font-semibold leading-8 tracking-tight text-indigo-600 writer-text">Major Inhouse 2023</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Diagnostic Data governance system using blockchain</p>
        <p class="mt-6 text-lg leading-7 text-gray-600">Blockchain is a distributed ledger system that records transactions in a database made up of blocks where blocks are chained together with the hash value to form a chain-like structure.</p>
      </div>
      <div class="mx-auto mt-4 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl class="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          <div v-for="feature in features" :key="feature.name" class="relative pl-16">
            <dt class="text-base text-left font-semibold leading-7 text-gray-900">
              <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-left text-base leading-7 text-gray-600">{{ feature.description }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
  <div class="mx-auto mt-4 mb-4 sm:mt-20 lg:mt-24 lg:max-w-4xl">
    <dl class="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-1 lg:gap-y-16">
    <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-white">
  <img class="w-24 h-24 md:w-48 md:h-auto rounded-xl  rounded-full mx-auto" src="../assets/nitheesh.png" alt="" width="384" height="384">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “we implemented this project on blockchain tech with various ipfs(interplanetary 
        file system),truffle framework.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Nitheesh gattamaneni
      </div>
      <div class="text-slate-700 dark:text-slate-500">
        vtu12770, 19-23
      </div>
    </figcaption>

  </div>
</figure>
</dl>
  </div>
 <!--  <div class="mx-auto mt-4 mb-4 sm:mt-20 lg:mt-24 lg:max-w-4xl">
    <dl class=" max-w-xl  lg:max-w-none ">
      <div class="mt-2 relative text-2xl font-bold  tracking-tight text-gray-900 sm:text-2xl">Technologies we used</div>
      <img class="left-20px " src="../assets/vue.svg" alt="">
    </dl>
  </div> -->
</template>


<style scoped>
   .writer {
        
        display: inline-block;
        }
        .writer-text {
            display: inline-block;
            overflow: hidden;
            color: #520164;
            letter-spacing: 2px;
            animation: typing 6s steps(30, end), blink .75s step-end infinite;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
            border-right: 4px solid orange;
            box-sizing: border-box;
        }

        @keyframes typing {
            from { 
                width: 0% 
            }
            to { 
                width: 100% 
            }
        }

        @keyframes blink {
            from, to { 
                border-color: transparent 
            }
            50% { 
                border-color: orange; 
            }
        }
</style>
