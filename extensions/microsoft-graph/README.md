# Microsoft Graph

The Microsoft Extension enables the Cognigy.AI virtual agent to login a user to a specific **Microsoft Azure Directory Tenant**. With this login process in mind, the virtual agent is now able to use the **[Microsoft Graph API](https://developer.microsoft.com/en-us/graph/graph-explorer)** in order to execute multiple functions. In a chat conversation, the user now can be greeted with their real name, schedule new meeting in their calendar, send a message to a teams channel and more.

## New in v4.3.0
- Added support for PKCE (Proof Key for Code Exchange) authentication flow
- Enhanced security for single-page applications
- Option to choose between traditional OAuth flow and PKCE flow

## Table of Contents

1. [Login to Microsoft](./docs/authentication.md)
   - [Using PKCE Authentication](./docs/pkce-authentication.md)
2. [Use the Graph API](./docs/graph-api.md)