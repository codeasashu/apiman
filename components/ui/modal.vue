<template>
  <transition name="modal" appear>
    <div class="modal-backdrop">
    <div class="ui modal active">
        <div class="header">
            <div class="ui grid">
                <div class="column">
                    <slot name="header"></slot>
                </div>
                <div class="column right floated">
                    <div class="ui icon buttons">
                        <button class="ui button">
                            <i class="icon close"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <slot name="body"></slot>
        </div>
        <slot name="actions" class="actions"></slot>
    </div>
    </div>
  </transition>
</template>
<style scoped>
.modal-backdrop {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
</style>