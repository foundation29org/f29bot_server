# Introduction

> <a href="https://raito.care/" target="_blank">Raito</a> provides a Web API for accessing data. Anyone can develop an application to access and modify a Health29 user's data. <a href="https://oauth.net/2/" target="_blank">OAuth 2.0</a> (Implicit Grant) is used as an authorization protocol to give an API client limited access to user data.

### Quick Start
* Most requests to the API require an access token as authentication.
For this, go to  [Get access_token](#api-Access_token-signIn)
* Once we have the access token, we can make the calls to the api, passing the access token in the header.

### Notes
All Methods APIs that have the authorization field in the header use Bearer authentication to restrict access to protected resources, , and always be sent next to a token. The bearer token is a cryptic string, generated by the server in response to a [login request](#api-Access_token-signIn).
Example of the header: `Authorization: Bearer <token>`

These requests can return some errors, such as the token is invalid, or has expired:
 `{ status: 401, message: "Token expired"}` or `{ status: 401, message: "Invalid Token"}`