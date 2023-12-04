div<!-- This view allows a user to create client information. -->
<template>
  <main>
    <!--Header-->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Client Intake Form
    </h1>
    <div class="px-10 py-20">
      <!-- form field -->
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="submitForm">
        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Personal Details</h2>
          <!--First Name Input Field-->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">First Name</span>
              <span style="color: #ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.firstName" />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.firstName.$error" class="text-red-500">
              First Name is required
            </span>
          </div>

          <!--Middle Name Input Field-->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Middle Name</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder v-model="client.middleName" />
            </label>
          </div>

          <!--Last Name Input Field-->
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
          <!--Email Input Field-->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Email</span>
              <span style="color: #ff0000">*</span>
              <input type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.email" />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.email.$error" class="text-red-500">
              Valid Email is required
            </span>
          </div>
          <!-- Phone Number Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Phone Number</span>
              <span style="color: #ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}" v-model="client.phoneNumber.primary" />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.phoneNumber.primary.$error" class="text-red-500">
              <span v-if="v$.client.phoneNumber.primary.required.$invalid">
                Phone Number is required
              </span>
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

          <!-- Alternative Phone Number Input Field -->
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
          <!-- Address 1 Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.line1" />
            </label>
          </div>

          <!-- Address 2 Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 2</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.line2" />
            </label>
          </div>

          <!-- City Input Field -->
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

          <!-- County Input Field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.county" />
            </label>
          </div>

          <!-- Zip Code Input Field -->
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
        <!-- grid container -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Profile Picture</h2>
          <!-- Upload Picture Button --> <!--Used similar format as other input field-->
          <div class="flex flex-col items-center">
            <label class="block">
              <button
                type="button"
                class="bg-yellow-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
                @click="triggerFileInput"
              > <!--Line above is the click event handler
                    Line below is dynamic text shown if true or false-->
                {{ isFileSelected ? 'Change Picture' : 'Upload Profile Picture' }}
              </button>
              <!--I decided to get rid of default input indicators i.e "Choose File" button with "style= 'display: none'"
              This means that I need to figure out another way to let user know of file selection confirmation
              Below, I have added a reference to be able to access and manipulate the file input field-->
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleProfilePictureUpload"
                style="display: none"
              />
            </label>
            <!--In the line below, I am using conditional rendering to display name of chosen filed to user-->
            <span v-if="isFileSelected">File Selected: {{ selectedFileName }}</span>
          </div>
          <!-- Added <img> element for displaying the selected image so user can confirm if thats the photo they want to upload -->
          <div class="flex flex-col items-center">
            <img
              v-if="isFileSelected && selectedImage"
              :src="selectedImage"
              alt="Profile Picture Preview"
              class="max-w-xs h-auto rounded-lg"
              style="max-width: 150px; max-height: 150px;"
            />
             <!-- Added clear picture functionality in case editor does not want to upload a picture after selecting one -->
            <button
                v-if="isFileSelected"
                @click="clearProfilePicture"
                class="bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-2"
            >
              X
            </button>
          </div>
        </div>
        <!-- grid container -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <!-- Add Client Submit Button -->
          <div class="flex justify-center ml-auto">
            <button class="bg-red-700 text-white rounded" type="submit">
              Add Client
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
//import functionalities for validation
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength, maxLength } from '@vuelidate/validators'
import { createClient } from '../api/api'
import { useToast } from 'vue-toastification'


//Notifications
const toast = useToast()

export default {
  data() {
    return {
      //client variable to hold new client information
      client: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
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
        },
        profilePicture: null, //newly added variable for clients model
      },
      isFileSelected: false, //Added these 2 data properties for the conditional rendering
      selectedFileName: '',
      selectedImage: null //selected image property
    };
  },
  setup() {
    // Register Vuelidate
    const v$ = useVuelidate();
    return { v$ };
  },
  validations() {
    // validations for client
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
  methods: {
    // method called when user submits the form
    async submitForm() {
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

      try {
        const response = await createClient(formData);
        this.$router.push('/findclient');
        toast.success('Successfully added client');
      } catch (error) {
        toast.error('Unable to add client');
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
    }
  }
}
</script>
