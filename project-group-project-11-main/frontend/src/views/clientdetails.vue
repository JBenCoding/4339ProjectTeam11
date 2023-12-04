<!-- This view allows a user to view/update a specific client's information. -->
<template>
  <main>
    <!--Header-->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Client Details
    </h1>
    <div v-if="client.profilePicture" class="text-center mt-5">
      <h2 class="text-2xl font-bold">Profile Picture</h2>
      <img :src="client.profilePicture" alt="Profile Picture" class="profile-picture-frame" />
    </div>
    <div v-if="client.profilePicture" class="text-center mt-5">
      <button @click="deleteProfilePicture" class="bg-red-700 disabled:opacity-50 text-white rounded" v-if="user.role === 'editor'">
        Delete Profile Picture
      </button>
      <!-- Reference needed for the confirmation popup-->
      <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
    </div>
    <div class="px-10 py-20">
      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Personal Details</h2>
        <!-- First Name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">First Name</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="client.firstName" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.firstName.$error" class="text-red-500">
            First Name is required
          </span>
        </div>

        <!-- Middle name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Middle Name</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="client.middleName" />
          </label>
        </div>

        <!-- Last Name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Last Name</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="client.lastName" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.lastName.$error" class="text-red-500">
            Last Name is required
          </span>
        </div>
        <div></div>
        <!-- Email input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Email</span>
            <input type="email"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.email" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.email.$error" class="text-red-500">
            Valid Email is required
          </span>
        </div>
        <!-- Phone number input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Phone Number</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              pattern="^[0-9]{3}[0-9]{3}[0-9]{4}$" v-model="client.phoneNumber.primary" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.phoneNumber.primary.$error" class="text-red-500">
            <span v-if="v$.client.phoneNumber.primary.required.$invalid">Phone Number is required</span>
            <span
              v-else-if="!v$.client.phoneNumber.primary.required.$invalid && v$.client.phoneNumber.primary.numeric.$invalid">
              Phone Number must contain only digits
            </span>
            <span
              v-else-if="!v$.client.phoneNumber.primary.required.$invalid && !v$.client.phoneNumber.primary.numeric.$invalid && (v$.client.phoneNumber.primary.minLength.$invalid || v$.client.phoneNumber.primary.maxLength.$invalid)">
              Phone Number must be exactly 10 digits
            </span>
          </span>
        </div>
        <!-- Alternative phone number input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Alternative Phone Number</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}" v-model="client.phoneNumber.alternate" />
          </label>
        </div>
      </div>

      <!-- grid container -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Address Details</h2>
        <!-- Address 1 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 1</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.line1" />
          </label>
        </div>
        <!-- Address 2 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 2</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.line2" />
          </label>
        </div>
        <!-- City input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">City</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.city" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.address.city.$error" class="text-red-500">
            City is required
          </span>
        </div>
        <div></div>
        <!-- County input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">County</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.county" />
          </label>
        </div>
        <!-- Zip code input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Zip Code</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.zip" />
          </label>
        </div>
        <div></div>
      </div>

      <!-- Picture Buttons grid container -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4" v-if="user.role === 'editor'">
        <h2 class="col-span-full text-2xl font-bold mb-4">Profile Picture Management</h2>
        <div class="mt-10 mr-20 flex space-x-2 items-center">
        <!-- Standard file input for selecting a file -->
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleProfilePictureUpload"
            class="col-span-1"
          />
          <!-- Button to clear the selected profile picture, if needed -->
          <button
            v-if="isFileSelected"
            @click="clearProfilePicture"
            class="border border-black bg-white text-black rounded py-2 px-4"
          >
            Reset Picture
          </button>
        </div>
          <!-- Image element for the selected profile picture -->
          <img
            v-if="isFileSelected && selectedImage"
            :src="selectedImage"
            alt="Profile Picture Preview"
            class="col-span-full sm:col-span-2 md:col-span-1 mx-auto max-w-xs h-auto rounded-lg shadow-lg"
            style="max-width: 150px; max-height: 150px;"
          />
      </div>


      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div class="flex justify-between mt-10 mr-20"></div>
        <!--Update Client submit button-->
        <div class="flex justify-between mt-10 mr-20">
          <button @click="submitUpdateClient" type="submit" class="bg-green-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'">
            Update Client
          </button>
          <!-- Reference needed for the confirmation popup-->
          <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
          <!-- Reference needed for the confirmation popup-->
          <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
        </div>
        <!--Delete Client button-->
        <div class="flex justify-between mt-10 mr-20">
          <button @click="submitDeleteClient" type="submit" class="bg-red-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'">
            Delete Client
          </button>
          <!-- Reference needed for the confirmation popup-->
          <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
            <!-- Reference needed for the confirmation popup-->
          <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
        </div>
        <!--Go back button-->
        <div class="flex justify-between mt-10 mr-20">
          <button type="reset" class="border border-red-700 bg-white text-red-700 rounded" @click=this.$router.back()>
            Go back
          </button>
        </div>
      </div>
    </div>

    <hr class="mt-10 mb-10" />

    <!-- Client Event Information -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mr-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Events for Client</h2>
        <h3 class="italic">Click table row to view event details</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Date</th>
              <th class="p-4"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr @click="$router.push({ name: 'eventdetails', params: { id: event._id } })" 
            v-for="event in clientEvents" :key="event._id" class="cursor-pointer" 
              :class="{ 'hoverRow': hoverId === event._id }" @mouseenter="hoverId = event._id" @mouseleave="hoverId = null">
              <td class="p-2 text-left">{{ event.name }}</td>
              <td class="p-2 text-left">{{ formatDate(event.date) }}</td>
              <td class="p-2 text-right">
                <span class="remove-btn-wrapper">
                  <span class="remove-btn text-gray-400 cursor-pointer"
                    @click.stop="removeClientFromEvent(client._id, event._id)" v-if="hoverId === event._id">X</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-col">
        <!--MultiSelect to add client to events-->
        <VueMultiselect
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer"
          v-model="eventsSelected" :options="eventsFiltered" :custom-label="nameWithDate" :multiple="true"
          :close-on-select="true" placeholder="Select Events to be added" label="date" track-by="name" />
        <div class="flex justify-between">
          <!--button to add client to events-->
          <button @click="addClientToEvent" type="submit" class="mt-5 bg-red-700 disabled:opacity-50 text-white rounded"
            :disabled="eventsSelected.length === 0 || user.role === 'viewer'">
            Add Client to Selected Events
          </button>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength, maxLength } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import { useLoggedInUserStore } from "../store/loggedInUser";
// imports all necessary calls used in the view
import { getAllClientInfo, getClientById, getClientEvents, getNonClientEvents, registerAttendee, deregisterAttendee, updateClient, deleteClientbyId, deleteProfilePicture } from '../api/api'
import { useToast } from 'vue-toastification'

// For use with the pop up box
import confirmDialogue from '../components/PopupDialogue.vue'

//Notifications
const toast = useToast()
export default {
  // register components
  components: {
    VueMultiselect,
    confirmDialogue
  },
  setup() {
    // register Vuelidate and loggedIn store
    const v$ = useVuelidate();
    const user = useLoggedInUserStore();
    return { v$, user };
  },
  data() {
    return {
      // events that the client is not registered in - to be shown in the multiselect
      eventsFiltered: [],
      // events that user selects from multiselect list
      eventsSelected: [],
      //variable to hold the events that the selected client is associated with
      clientEvents: [],
      //variable to hold client information  
      client: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        profilePicture: '', //included the new field from Clients Model
        phoneNumber: {
          primary: '',
          alternate: ''
        },
        address: {
          line1: '',
          line2: '',
          city: '',
          county: '',
          zip: ''
        }
      },
      isFileSelected : false,
      selectedFileName : '',
      selectedImage : null,
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null
    }
  },
  validations() {
    // validations
    return {
      client: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        phoneNumber: {
          primary: {
            required,
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(10),
          },
        },
        address: {
          city: { required },
        },
      },
    };
  },
  async mounted() {
    // when component is mounted, data is loaded
    // get client information, events the client is registered in, and events that client is not registered in
    try {
      const [clientResponse, clientEventsResponse, nonClientEventsResponse] = await Promise.all([
        getClientById(this.$route.params.id),
        getClientEvents(this.$route.params.id),
        getNonClientEvents(this.$route.params.id),
      ]);
      this.client = clientResponse;
      this.clientEvents = clientEventsResponse;
      this.eventsFiltered = nonClientEventsResponse;
    } catch (error) {
      toast.error('error loading data:', error)
    }
  },
  methods: {
    // method called to format the event date
    formatDate(date) {
      const isoDate = new Date(date);
      const year = isoDate.getUTCFullYear();
      const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(isoDate.getUTCDate()).padStart(2, '0');
      return `${month}/${day}/${year}`;
    },
    //custom label for multiselect
    nameWithDate({ name, date }) {
      return `${name} (${this.formatDate(date)})`
    },
    // method called to remove client from event
    async removeClientFromEvent(clientId, eventId) {
      // remove client ID from the "attendees" array for that event
      try {
        const response = await deregisterAttendee(eventId, clientId);
        toast.success(response)
      } catch (error) {
        toast.error(error);
      }
      // update events for which client is registered, and events for which client is not registered
      try {
        this.clientEvents = await getClientEvents(this.$route.params.id);
        this.eventsFiltered = await getNonClientEvents(this.$route.params.id);
      } catch (error) {
        toast.error(error);
      }
    },
    // method called to add client to an event
    async addClientToEvent() {
      try {
        const client = this.client._id;
        const events = this.eventsSelected.map((event) => event._id);
        const promises = [];
        for (const eventId of events) {
          promises.push(registerAttendee(eventId, client));
        }
        Promise.all(promises)
          .then(async () => {
            try {
              this.clientEvents = await getClientEvents(this.$route.params.id);
              this.eventsFiltered = await getNonClientEvents(this.$route.params.id);
              this.eventsSelected = [];
            } catch (error) {
              toast.error(error);
            }
          })
          .catch((error) => {
            toast.error(error);
          });
      } catch (error) {
        toast.error(error);
      }
    },
    // update client information
    async submitUpdateClient() {
      // Trigger validation
      this.v$.$validate();
      if (this.v$.$error) {
        // Form is invalid, do not proceed
        return;
      }

      const formData = new FormData();
      Object.keys(this.client).forEach(key => {
        if (key !== 'profilePicture') {
          if (typeof this.client[key] === 'object' && this.client[key] !== null) {
            // For nested objects
            Object.keys(this.client[key]).forEach(subkey => {
              formData.append(`${key}[${subkey}]`, this.client[key][subkey]);
            });
          } else {
            // For regular fields
            formData.append(key, this.client[key]);
          }
        }
      });

      // Check if a file is selected
      if (this.isFileSelected) {
        const fileInput = this.$refs.fileInput;
        if (fileInput.files.length > 0) {
          formData.append('profilePicture', fileInput.files[0]);
        }
      }

      // This is for the Irreversible Action box
      try {
      const ok = await this.$refs.confirmDialogue.show({
          confirmationTitle: 'Update Client',
          confirmationMessage: 'Are you sure you want to update this client? It cannot be undone.',
          confirmationButton: 'Update Client',
        })
        // If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
          alert('You have successfully updated this client.')
          const response = await updateClient(this.$route.params.id, formData);
          this.$router.push('/findclient')
        } else {}
      } catch (error) {
        toast.error(error)
        alert(error)
      }
    },
    triggerFileInput() { //click event trigger for "fileInput" ref from above
      this.$refs.fileInput.click();
    },
    handleProfilePictureUpload(event) {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        this.isFileSelected = true;
        this.selectedFileName = fileInput.files[0].name;

        // Read the selected image and set it as the "preview"
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImage = e.target.result;
          this.client.profilePicture = e.target.results;
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else {
        this.isFileSelected = false;
        this.selectedFileName = '';
        this.selectedImage = null; // Clear the selected image if no file is selected
        this.client.profilePicture = null; // Ensure profilePicture is set to null when no file is selected
      }
    },
    // Method to clear the selected image
    clearProfilePicture() {
    this.isFileSelected = false;
    this.selectedFileName = '';
    this.selectedImage = null;
    // Reset the file input
    this.$refs.fileInput.value = '';
    },
    async deleteProfilePicture() {
      try {
        // If try passes the first if statement the deletion confirmation will pop up
        const ok = await this.$refs.confirmDialogue.show({
          confirmationTitle: 'Delete Picture',
          confirmationMessage: 'Are you sure you want to delete this picture? It cannot be undone.',
          confirmationButton: 'Delete Picture',
        })
        // If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
          alert('You have successfully deleted the profile picture.')
          const response = await deleteProfilePicture(this.$route.params.id);
        } else {}
      } catch (error) {
        alert(error)
      }
    },
    // method called when user attempts to delete client
    async submitDeleteClient() {
      try {
        // If try passes the first if statement the deletion confirmation will pop up
        const ok = await this.$refs.confirmDialogue.show({
          confirmationTitle: 'Delete Client',
          confirmationMessage: 'Are you sure you want to delete this client? It cannot be undone.',
          confirmationButton: 'Delete Client',
        })
        // If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
          alert('You have successfully deleted this client.')
          const response = await deleteClientbyId(this.$route.params.id);
          this.$router.push('/findclient')
        } else {}
      } catch (error) {
        toast.error(error);
      }
    },
  }
}
</script>

<!--Style for multiselect-->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.remove-btn-wrapper {
  display: inline-block;
  position: relative;
}

.remove-btn:hover {
  color: black;
}
.profile-picture-frame {
  border: 2px solid #333;
  padding: auto;
  border-radius: 10px;
  display: inline-block;
  width: 150px;
  height: 150px;
  object-fit: cover;
}
</style>