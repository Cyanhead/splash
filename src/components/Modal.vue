<template>
  <teleport to="body">
    <div ref="modalRef" class="modal-overlay" @click.self="closeModal">
      <div class="modal" tabindex="0">
        <button class="close-button icon-wrapper" @click="$emit('close')">
          <img class="icon close-icon" src="../assets/x.svg" alt="" />
          <span class="visually-hidden">Close Modal</span>
        </button>

        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

const modalRef = ref<HTMLElement | null>(null);
const firstFocusableElement = ref<HTMLElement | null>(null);
const lastFocusableElement = ref<HTMLElement | null>(null);
const previousActiveElement = ref<HTMLElement | null>(null);
const focusableElements = ref<NodeListOf<HTMLElement> | null>(null);

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

function trapFocus() {
  if (focusableElements.value && focusableElements.value.length > 0) {
    firstFocusableElement.value = focusableElements.value[0];
    lastFocusableElement.value =
      focusableElements.value[focusableElements.value.length - 1];
    firstFocusableElement.value?.focus();
  }
}

function handleEscKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function handleFocus(event: FocusEvent) {
  if (
    modalRef.value &&
    event.target instanceof Node &&
    !modalRef.value.contains(event.target)
  ) {
    event.stopPropagation();
    firstFocusableElement.value?.focus();
  }
}
function handleScrollLock(lock: boolean) {
  const body = document.querySelector('body');
  if (body) {
    body.style.overflow = lock ? 'hidden' : 'auto';
  }
}

function handleTabKey(event: KeyboardEvent) {
  if (event.key === 'Tab' && focusableElements.value) {
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement.value) {
        lastFocusableElement.value?.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableElement.value) {
        firstFocusableElement.value?.focus();
        event.preventDefault();
      }
    }
  }
}

onMounted(() => {
  if (modalRef.value) {
    previousActiveElement.value = document.activeElement as HTMLElement;

    handleScrollLock(true);

    focusableElements.value = modalRef.value?.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    trapFocus();

    document.addEventListener('focus', handleFocus, true);
    window.addEventListener('keydown', handleTabKey);
  } else {
    handleScrollLock(false);
    previousActiveElement.value?.focus();
    document.removeEventListener('focus', handleFocus, true);
    window.removeEventListener('keydown', handleTabKey);
  }
});

onMounted(() => {
  window.addEventListener('keydown', handleEscKey);
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscKey);
  });
});

onMounted(() => {
  window.addEventListener('focus', handleFocus, true);
  onUnmounted(() => {
    window.removeEventListener('focus', handleFocus, true);
  });
});

onMounted(() => {
  if (modalRef.value) {
    modalRef.value.focus();
  }
});

onUnmounted(() => {
  if (modalRef.value) {
    modalRef.value.blur();
  }
});
</script>

<style lang="scss" src="./styles.scss" scoped></style>
<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);

  padding: var(--wrapper-padding-sm);

  @media screen and (min-width: 768px) {
    padding: var(--wrapper-padding-md);
  }

  @media screen and (min-width: 1024px) {
    padding: var(--wrapper-padding-lg);
  }
}

.modal {
  position: relative;

  border-radius: 8px;

  outline: none;

  .close-button {
    position: absolute;
    top: 0px;
    right: 0px;

    border: none;
    background-color: rgba(0, 0, 0, 0.8);

    cursor: pointer;
    &:hover {
      background-color: #696969;
    }

    @media screen and (min-width: 1024px) {
      background-color: transparent;

      top: -70px;
      right: -70px;
    }
  }
}
</style>
