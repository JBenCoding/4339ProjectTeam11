<!-- Modal popup template sourced from https://stackabuse.com/how-to-create-a-confirmation-dialogue-in-vue-js/ and modified -->
<!-- This template is setup to fade in and out when the user selects on option -->
<template>
    <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="window">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    // This script is setting up the opening and closing of the modal popup so that it properly functions
    name: 'PopupModal',
    data: () => ({
        isVisible: false,
    }),
    methods: {
        open() {
            this.isVisible = true
        },
        close() {
            this.isVisible = false
        },
    },
}
</script>

<style scoped>
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

/* This CSS is for the darkened background that occurs when the popup is active */
.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1;
}

/* This is the CSS for the popup box itself */
.window {
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 680px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}
</style>