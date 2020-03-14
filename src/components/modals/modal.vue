<template>
  <div class="modal" v-bind:class="customClass" v-bind:style="{ display: show ? 'block' : 'none' }">
    <div class="overlay" @click="closeCallback()"></div>
    <div class="modal_content">
      <slot></slot>
      <button title="Close" class="close_modal text-gray-500 hover:text-gray-800" @click="close">
        <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    customClass: String,
    closeCallback: Function,
    show: Boolean
  },
  methods: {
    close () {
      this.show = false
      if (typeof closeCallback === 'function') {
        this.closeCallback()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
}

.modal .overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 995;
  background: rgba(0,0,0,0.85);
}

.modal .modal_content {
  z-index: 999;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90%;
  overflow: auto;
  background: #fff;
  padding: 20px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.7);
  text-align: center;
  border-radius: 4px;
  width: 520px; /* This just a default width */
}

.modal .modal_content > h2 {
  font-size: 28px;
  font-weight: 200;
  margin: 20px 0 40px;
  text-align: center;
}

.modal .modal_content .buttons_wrapper {
  padding: 20px;
}

.modal .close_modal {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 18px;
  opacity: 0.5;
  background: none;
  border: none;
  transition: opacity 0.2s ease;
}

.modal .close_modal:hover {
  opacity: 0.9;
}
</style>