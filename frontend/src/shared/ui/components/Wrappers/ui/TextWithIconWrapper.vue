<template>
  <div class="text__container">
    <CIcon
      :icon="icon"
      size="lg"
    />
    <span class="title_text">
      <slot name="text" />
    </span>
  </div>
</template>

<script setup lang=ts>
interface TextWithIconWrapperProps {
  icon: string[];
}

defineProps<TextWithIconWrapperProps>()
</script>

<style lang="css" scoped>
.title_text {
  margin-left: 10px;
}

.text__container {
 display: flex;
 align-items: center;
}
</style>