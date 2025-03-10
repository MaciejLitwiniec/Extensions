import { createNodeDescriptor, INodeFunctionBaseParams } from "@cognigy/extension-tools";

export interface IStartAuthenticationParams extends INodeFunctionBaseParams {
	config: {
		connection: {
			clientId: string;
			clientSecret?: string; // Optional for backward compatibility
		};
		redirectUri: string;
		scope: string;
		tenant: string;
		usePKCE: boolean; // Flag to enable/disable PKCE
	};
}

export const startAuthenticationNode = createNodeDescriptor({
	type: "startAuthentication",
	defaultLabel: "Display Sign In Button",
	fields: [
		{
			key: "connection",
			label: "Azure Connection",
			type: "connection",
			params: {
				connectionType: "login", // Keep original type for compatibility
				required: true
			}
		},
		{
			key: "usePKCE",
			label: "Use PKCE",
			description: "Enable PKCE for enhanced security in single-page applications",
			type: "toggle",
			defaultValue: false
		},
		{
			key: "redirectUri",
			label: "Redirect URL",
			description: "The url which should be triggered after user is logged in with microsoft.",
			type: "cognigyText",
			defaultValue: "https://localhost:8080/auth-callback.html",
			params: {
				required: true,
			},
		},
		{
			key: "scope",
			label: "Scope",
			description: "For example user.read",
			type: "cognigyText",
			defaultValue: "user.read calendars.readWrite",
			params: {
				required: true,
			},
		},
		{
			key: "tenant",
			label: "Tenant (ID)",
			defaultValue: "common",
			type: "cognigyText"
		}
	],
	sections: [
		{
			key: "tenantSection",
			label: "Tenant",
			defaultCollapsed: true,
			fields: [
				"tenant",
			]
		},
		{
			key: "securitySection",
			label: "Security Settings",
			defaultCollapsed: false,
			fields: [
				"usePKCE"
			]
		}
	],
	form: [
		{ type: "field", key: "connection" },
		{ type: "field", key: "redirectUri" },
		{ type: "field", key: "scope" },
		{ type: "section", key: "tenantSection" },
		{ type: "section", key: "securitySection" }
	],
	function: async ({ cognigy, config }: IStartAuthenticationParams) => {
		const { api } = cognigy;
		const { redirectUri, scope, tenant, connection, usePKCE } = config;
		const { clientId } = connection;

		/* trigger the microsoft login webchat plugin */
		api.output('', {
			_plugin: {
				type: 'microsoft-auth',
				clientId,
				redirectUri,
				scope,
				tenant,
				usePKCE: usePKCE // Use the value from the toggle field
			}
		});
	}
});