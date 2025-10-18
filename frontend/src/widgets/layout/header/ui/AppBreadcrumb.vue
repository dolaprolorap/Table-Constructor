<template>
  <CBreadcrumb class="my-0">
    <CBreadcrumbItem
      v-for="item in breadcrumbs"
      :key="item"
      :href="item.active ? '' : item.path"
      :active="item.active"
    >
      <RouterLink
        v-if="!item.active"
        :to="item.active ? '' : item.path"
      >
        {{ item.name }}
      </RouterLink>
      <template
        v-else
      >
        {{ item.name }}
      </template>
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const breadcrumbs = ref()

const resolvePath = (routePath: string, params: { [key: string]: string | string[] }): string => {
	let resolvedPath = `${router.options.history.base}${routePath}`

	for (const [ paramKey, value ] of Object.entries(params)) {
		const paramValue = Array.isArray(value) ? value.join('/') : value

		resolvedPath = routePath.replace(`/:${paramKey}`, paramValue ? `/${paramValue}` : '')

	}

	const cleanedPath = resolvedPath.replace(/\/:\w+/g, '').replace(/\([^)]+\)\??/g, '')

	return cleanedPath
}

const getBreadcrumbs = (): void => {
	const currentRoute = router.currentRoute.value

	breadcrumbs.value = currentRoute.matched.map(route => {
		return {
			active: route.path === router.currentRoute.value.fullPath,
			name: route.name,
			path: resolvePath(route.path, currentRoute.params)
		}
	})
}

router.afterEach(getBreadcrumbs)

onMounted(getBreadcrumbs)
</script>