<script  setup>
import { onMounted, ref, onBeforeMount, reactive } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db } from '../main.js'
import { useRouter } from 'vue-router';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const auth = getAuth();

const router = useRouter();
const gett = async () => {
  /* const uid =auth.currentUser.uid;
  setDoc(doc(db, "user",uid ), {
name: "Los Angeles",
state: "CA",
country: "USA"
}); */

  /* const docRef = doc(db, "appointment");
  const docsSnap = await getDocs(docRef);
  docsSnap.forEach(doc => {
    console.log(doc.data());
  }) */
}



const name = ref("");
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    const imageURL = user.photoURL;
    document.getElementById("img").src = imageURL;

    name.value = user.displayName;
  } else {
    router.push('/')
  }

})

const homeMethods = [
  { name: 'Add Patient', href: '/newinput', current: true },
  { name: 'Upload Lab Tests', href: '/uploadtest', current: true },
  { name: '', href: '/home', current: false },

]
console.log(homeMethods[0].name);
const appointments = collection(db, "appointment");

const q = query(appointments, where("status", "==", false));
const j = query(appointments, where("status", "==", true));
let resultsArrayFalse = reactive([])
let resultsArrayTrue = reactive([])
async function callu() {
  const querySnapshot = await getDocs(q);
  const querySnapshots = await getDocs(j);
  querySnapshot.forEach((doc) => {
    resultsArrayFalse.push(doc.data());

  })
  querySnapshots.forEach((doc) => {
    resultsArrayTrue.push(doc.data());
  
  })
}
callu();

</script>

<template>
  <div class="space-y-1 px-2 pb-3 pt-4">
    <a v-for="item in homeMethods" :key="item.name" as="a" :href="item.href"
      :class="[item.current ? 'bg-indigo-600 text-white ml-3' : 'text-black-300 hover:bg-black-700 hover:text-indigo-500', 'px-3 py-2 rounded-md text-sm font-medium']"
      :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
  </div>
  <div class="p-6 max-w-3xl gap-6 mx-auto flex justify-center">
    <div class=" max-w-sm  bg-white rounded-xl shadow-lg space-y-2 flex " v-for="item in resultsArrayFalse">
      <img class="w-20 h-20 md:h-auto rounded-xl" id="profileImg" :src="item.profile" referrerpolicy="no-referrer">
      <div class="flex flex-col mx-2">
        <div class="px-2 mt-2 subpixel-antialiased font-medium">{{ item.Diagnosis }}</div>
        <div class=" mb-2 text-base subpixel-antialiased font-normal text-gray-500">{{ item.name.slice(0, 10) }}</div>

      </div>
    </div>
  </div>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <div class="card shadow">
            <div class="card-header py-3">
              <p class="text-primary m-0 fw-bold">Completed Appointments</p>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 text-nowrap">
                  <div id="dataTable_length" class="dataTables_length" aria-controls="dataTable"><label
                      class="form-label">Show&nbsp;<select class="d-inline-block form-select form-select-sm">
                        <option value="10" selected="">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>&nbsp;</label></div>
                </div>
                <div class="col-md-6">
                  <div class="text-md-end dataTables_filter" id="dataTable_filter"><label class="form-label"><input
                        type="search" class="form-control form-control-sm" aria-controls="dataTable"
                        placeholder="Search"></label></div>
                </div>
              </div>
              <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                <table class="table my-0" id="dataTable">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>specialist consulted</th>
                      <th><br>Prior Diagonsis<br></th>
                      <th>Age</th>
                      <th>date</th>
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody id="tbody1" v-for="item in resultsArrayTrue">
                    <tr>
                      <td>{{ item.name.slice(0, 20) }}</td>
                      <td>{{ item.specialist }}</td>
                      <td>{{ item.Diagnosis }}</td>
                      <td>{{ item.age }}</td>
                      <td>{{ item.date }}</td>
                      <td>completed</td>
                    </tr>


                  </tbody>
                  <tfoot>
                    <tr></tr>
                  </tfoot>
                </table>
              </div>
              <div class="row">
                <div class="col-md-6 align-self-center">
                  <p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Showing 1 to {{
                    resultsArrayFalse.length }}
                  </p>
                </div>
                <div class="col-md-6">
                  <nav class="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                    <ul class="pagination">
                      <li class="page-item disabled"><a class="page-link" href="#" aria-label="Previous"><span
                            aria-hidden="true">«</span></a></li>
                      <li class="page-item active"><a class="page-link" href="#">1</a></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span
                            aria-hidden="true">»</span></a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="bg-white sticky-footer">
        <div class="container my-auto">
          <div class="mt-5 mb-4 pt-5 pb-5 text-center my-auto copyright"><span>Copyright © medilog 2023</span></div>
        </div>
      </footer>
    </div><a class="border rounded d-inline scroll-to-top" href="#page-top"><i class="fas fa-angle-up"></i></a>
  </div>
</template>

<style scoped></style>
