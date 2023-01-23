export enum WebSocketEvent {
	AUTH_APP_SCANNED = "auth-app-scanned",
	AUTH_APP_LINKED = "auth-app-linked",
	AUTH_APP_UNLINKED = "auth-app-unlinked",

	SUB_ACCOUNT_CREATED = "sub-account-created",

	NEW_PENDING_TRANSACTION = "new-pending-transaction",
	TRANSACTION_UPDATED = "transaction-updated",
	SUCCESSFUL_TRANSACTION = "successful-transaction",
	CHARGES_ON_TRANSACTION = "charges-on-transaction",

	ENROLMENT_ONGOING = "enrolment-ongoing",
	ENROLMENT_COMPLETED = "enrolment-completed",

	ACCOUNT_BALANCE_UPDATED = "account-balance-updated",

	MOBILE_APP_LINKED = "mobile-app-linked",
	MOBILE_APP_UNLINKED = "mobile-app-unlinked",

	UNLINK_APP = "unlink-app",

	NEW_CARD = "new-card",
	CARD_UPDATED = "card-updated",
	NEW_CREATE_CARD_REQUEST = "new-create-card-request",
	CREATE_CARD_REQUEST_UPDATED = "create-card-request-updated",
}
