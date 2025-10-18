<template>
  <a
    class="personal-info__container dropdown-toggle f-M px-2"
    href="#"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <RouterLink
      :to="profilePagePath"
      class="personal-info"
    >
      <UserIcon class="personal-info__icon" />

      <div
        class="personal-info__name hidden sm:flex"
        :title="nameWithInitials"
      >
        {{ nameWithInitials }}
      </div>
    </RouterLink>

  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { UserIcon } from '@/shared/ui/assets/icons'

import { useAuthenticatedUserStore } from '@/features/users/auth'

interface PersonalInfoProps {
	profilePagePath: string;
}

defineProps<PersonalInfoProps>()

const userStore = useAuthenticatedUserStore()

const nameWithInitials = computed(() => {
	if (!userStore.authenticatedUser) {
		return ''
	}

	const nameData = userStore.authenticatedUser.fullName.split(' ')

	return `${nameData[0]} ${nameData[1]?.[0] ? `${nameData[1]?.[0]}.` : ''} ${nameData[2]?.[0] ? `${nameData[2]?.[0]}.` : ''}`
})

</script>

<style scoped lang="scss">
  @use './AppHeader.scss' as *;

  .personal-info {
    @include app-header;

    display: flex;
    width: fit-content;
    align-items: center;
    float: right;

    color: var(--app-header-text-color);

    &:hover {

      color: var(--app-header-text-acent-color);

      .personal-info__icon {
        fill: var(--app-header-text-acent-color);
      }
    }

    .personal-info__icon {
      @extend .header-icon;
      fill: var(--app-header-text-color);
    }

    .personal-info__name {
      margin-right: 0.25rem;
      max-height: 1.75rem;
      font-weight: 600;

      flex-wrap: nowrap;
      width: fit-content;
    }
  }
</style>