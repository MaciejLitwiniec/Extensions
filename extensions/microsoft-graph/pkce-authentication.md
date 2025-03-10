# Using PKCE Authentication

## What is PKCE?

PKCE (Proof Key for Code Exchange) is an extension to the OAuth 2.0 Authorization Code flow that provides enhanced security for public clients, such as single-page applications (SPAs). It protects against authorization code interception attacks by using a dynamically generated challenge for each authorization request.

## Benefits of PKCE

- **Enhanced Security**: Protects against code interception attacks
- **No Client Secret Required**: Eliminates the need to store client secrets in browser code
- **Better for SPAs**: Designed specifically for single-page applications
- **Improved Token Management**: Better support for token refresh in browser environments

## How to Enable PKCE

1. In the Cognigy Flow Designer, add the Microsoft "Display Sign In Button" node
2. Configure the node as usual with Client ID, Redirect URI, and Scope
3. Expand the "Security Settings" section
4. Toggle "Use PKCE" to ON

![PKCE Toggle](../docs/images/pkce-toggle.png)

## Technical Information

When PKCE is enabled:

1. The authentication flow uses `response_type=code` (Authorization Code Flow) instead of `response_type=token` (Implicit Flow)
2. A cryptographically random code verifier is generated and stored
3. A code challenge derived from the verifier is sent with the authorization request
4. After receiving the authorization code, the original code verifier is used to exchange it for tokens

## Azure Configuration

To use PKCE with your Azure application:

1. In the Azure Portal, navigate to your App Registration
2. Under Authentication, ensure your app has the "Single-page application" platform configured
3. Add your redirect URI under this platform type
4. Under API permissions, ensure your app has the necessary permissions
5. No client secret is required for PKCE flow

## Troubleshooting

- If you encounter "Invalid PKCE challenge" errors, ensure your callback URL exactly matches what's registered in Azure
- If token refresh fails, it may be because the refresh token has expired or is invalid
- PKCE support requires modern browsers with Web Crypto API support