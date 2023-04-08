<script setup>
import { onMounted, ref, onBeforeMount } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from '../main.js'
import { useRouter } from 'vue-router';

const auth = getAuth();

const router = useRouter();

const hell = () => {

  router.push('/newinput')
}
const names = 'Nitheesh 10AM'


const gett = async () => {
  /* const uid =auth.currentUser.uid;
  setDoc(doc(db, "user",uid ), {
name: "Los Angeles",
state: "CA",
country: "USA"
}); */
  /*  const uid = auth.currentUser.uid;
   const docRef = doc(db, "user", uid);
   const docSnap = await getDoc(docRef);
   console.log(docSnap.data().level); */
  const docRef = doc(db, "appointment");
  const docsSnap = await getDocs(docRef);
  docsSnap.forEach(doc => {
    console.log(doc.data());
  })
}
const name = ref("");
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

    //console.log(user.uid);
    const imageURL = user.photoURL;
    document.getElementById("img").src = imageURL;

    name.value = user.displayName;
  } else {
    router.push('/')
  }

})

 
</script>

<template>
  <div class="p-6 max-w-3xl gap-6 mx-auto flex">

    <div class=" max-w-sm  bg-white rounded-xl shadow-lg space-y-2 flex ">
      <img class="w-20 h-20 md:h-auto rounded-xl" src="../assets/avater.png" alt="">
      <div class="flex flex-col">
        <div class="px-2 mt-2 subpixel-antialiased font-medium">Heart diagonsis</div>
        <div class=" mb-2 text-base subpixel-antialiased font-normal text-gray-500">siva Krishna</div>

      </div>
    </div>
    <div class=" max-w-sm  bg-white rounded-xl shadow-lg space-y-2 flex ">
      <img class="w-20 h-20 md:h-auto rounded-xl" src="../assets/avater.png" alt="">
      <div class="flex flex-col">
        <div class="px-2 mt-2 subpixel-antialiased font-medium">kidney infection
        </div>
        <div class=" mb-2 text-base subpixel-antialiased font-normal text-gray-500">Rudra 2PM</div>

      </div>
    </div>
    <div class=" max-w-sm  bg-white rounded-xl shadow-lg space-y-2 flex ">
      <img class="w-20 h-20 md:h-auto rounded-xl" src="../assets/avater.png" alt="">
      <div class="flex flex-col">
        <div class="px-2 mt-2 subpixel-antialiased font-medium">Brain tumor</div>
        <div class=" mb-2 text-base subpixel-antialiased font-normal text-gray-500">sree 3PM</div>

      </div>
    </div>

  </div>
  <div id="wrapper">
    <div class="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <div class="container-fluid">
          <div class="card shadow">
            <div class="card-header py-3">
              <p class="text-primary m-0 fw-bold">completed appointments</p>
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
                  <tbody id="tbody1">
                    <tr>
                      <td><img class="rounded-circle me-2" width="20" height="20" src="assets/img/avatars/avatar1.jpeg">
                      </td>
                      <td>Mohan chadra</td>
                      <td>cardiologist</td>
                      <td>heart pain</td>
                      <td>25</td>
                      <td>2008/11/28</td>
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
                  <p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27
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

<!-- <button @click="gett">push details</button> -->
  <button @click="hell">newinput</button>

</template>

<style scoped>
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}</style>
