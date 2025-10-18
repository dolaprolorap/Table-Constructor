<template>
  <slot class="truncate" />
</template>
<style>
.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   }
</style>