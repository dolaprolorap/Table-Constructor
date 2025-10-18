<template>
  <ContestTableItem
    v-for="(contest, index) in contests"
    :key="index"
    :contest="contest"
  />
</template>
<script setup lang="ts">
import type { Contest } from '@/entities/contests'

import ContestTableItem from './ContestTableItem.vue'

interface ContestTabelContentProps {
  contests: Contest[];
}

defineProps<ContestTabelContentProps>()
</script>