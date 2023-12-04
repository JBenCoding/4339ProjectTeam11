<!-- Modal popup template sourced from https://stackabuse.com/how-to-create-a-confirmation-dialogue-in-vue-js/ and modified -->
<!-- Template takes data from the page and formats it into the pop-up box format -->
<template>
    <popup-modal ref="popup">
        <h2 class="popupTitle">{{ confirmationTitle }}</h2>
        <p style="text-align: center; padding: 0.5em">{{ confirmationMessage }}</p>
        <div class="buttonBox">
            <button class="cancelButton" @click="_cancel">{{ cancelButton }}</button>
            <span class="confirmButton" @click="_confirm">{{ confirmationButton }}</span>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from './IrreversiblePopup.vue'

export default {
    // Script name so that it can be imported by the page
    name: 'confirmDialogue',
    // Call to grab the modal popup code necessary for functionality
    components: { PopupModal },
    data: () => ({
        // Parameters that change depending on the type of dialogue
        confirmationTitle: undefined,
        confirmationMessage: undefined, // Main text content
        confirmationButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Go Back', // text for cancel button
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.confirmationTitle = opts.confirmationTitle
            this.confirmationMessage = opts.confirmationMessage
            this.confirmationButton = opts.confirmationButton
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },
        // If confirmed resolvePromise will run as true and vice versa
        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
            // Or you can throw an error
            // this.rejectPromise(new Error('User canceled the dialogue'))
        },
    },
}
</script>

<style scoped>
.popupTitle {
    margin-top: 0; 
    font-weight: bold; 
    font-size: 20px; 
    text-align: center;
}
.buttonBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.confirmButton {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #903535;
    border: 2px solid #903535;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.cancelButton {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #35907f;
    border: 2px solid #0ec5a4;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>