import AppHeader from './header/ui/AppHeader.vue'
import AppSidebar from './sidebar/ui/AppSidebar.vue'

export { AppHeader, AppSidebar }
export { useSidebarStore } from './sidebar/model/SidebareStore'

export {
	HeaderConfigTypes,
	type HeaderLinkConfig,
	type HeaderNavigationConfig
} from './types'