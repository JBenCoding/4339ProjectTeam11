<template>
  <div>
    <input type="file" @change="onFileChange" ref="fileInput" style="display: none" />
    <button @click="triggerFileInput" class="select-button">Select Image</button>
    <button @click="deleteImage" v-if="uploadedImage" class="delete-button">Delete Image</button>
    <!-- Reference needed for the confirmation popup-->
    <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
    <img :src="uploadedImage" alt="Uploaded Image" v-if="uploadedImage" />
  </div>
</template>

<script>
// For use with the pop up box
import confirmDialogue from '../components/PopupDialogue.vue'

export default {
  // This component is necessary for the confirmation pop up
  components: { confirmDialogue },
  data() {
    return {
      uploadedImage: null,
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        // Assuming you want to display the image immediately after selecting
        this.uploadedImage = URL.createObjectURL(selectedFile);
      }
    },
    async deleteImage() {
      try {
        // Irreversible Action box will pop up unless an error is thrown
          const ok = await this.$refs.confirmDialogue.show({
            confirmationTitle: 'Delete Client Picture',
            confirmationMessage: 'Are you sure you want to delete this client picture? It cannot be undone.',
            confirmationButton: 'Delete Client Picture',
          })
          // If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
            alert('You have successfully delete this client picture.')
            // Delete the uploaded image here
            this.uploadedImage = null; // Clear the uploaded image
          } else {}
        } catch (error) {
        toast.error(error)
      }
    },
  },
};
</script>


<style scoped>
/* Style for the "Select Image" button */
.select-button {
  background-color: #3498db; /* Blue background color */
  color: white; /* White text color */
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px; /* Add some spacing between buttons */
}

.select-button:hover {
  background-color: #2980b9; /* Darker blue on hover */
}

/* Style for the "Delete Image" button */
.delete-button {
  background-color: #e74c3c; /* Red background color */
  color: white; /* White text color */
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-button:hover {
  background-color: #c0392b; /* Darker red on hover */
}
</style>
