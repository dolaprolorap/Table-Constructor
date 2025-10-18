import type { SidebarNavItem } from '../model/types'
import type { RouteLocation } from 'vue-router'

const isActiveLink = (route: RouteLocation, link: string): boolean => {
  if (!link) {
    return false
  }

  return route.path === link
}

export const isActiveItem = (route: RouteLocation, item: SidebarNavItem): boolean => {
  if (!item.to) {
    return false
  }

  if (isActiveLink(route, item?.to)) {
    return true
  }

  return false
}