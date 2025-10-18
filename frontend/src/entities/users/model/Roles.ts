export enum UserRoles {
	customer = 'customer',
	builder = 'builder',
	inspector = 'inspector'
}

export enum UserRolesRu {
	customer = 'заказчик',
	builder = 'подрядчик',
	inspector = 'инспектор'
}

export const apiToRolesMapper = {
	CONTRACTOR: UserRoles.builder,
	CUSTOMER: UserRoles.customer,
	INSPECTOR: UserRoles.inspector,
}

export const rolesToApiMapper = {
	[UserRoles.builder]: 'CONTRACTOR',
	[UserRoles.customer]: 'CUSTOMER',
	[UserRoles.inspector]: 'INSPECTOR',
}