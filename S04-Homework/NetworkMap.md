# Network Map: New Request Flow

## Step 1: Open "New Request" Form (Basic Information)
* `GET /api/v1/testing-flags/active` — `200 OK` *(loads active feature/testing flags)*

## Steps 2–4: Location Details, Contact Information & Additional Details
* *(No API calls made — form data and file attachments are stored locally in browser state until final submission)*

## Step 5: Review & Submit
* `POST /api/v1/requests` — `201 Created` *(creates the new service request and returns its generated request ID)*
* `POST /api/v1/requests/{id}/attachments` — `201 Created` *(uploads the attached photo/file to the newly created request)*

## Step 6: Redirect to "My Requests" Page
* `GET /api/v1/testing-flags/active` — `200 OK` *(checks active feature flags on the new page)*
* `GET /api/v1/auth/me` (or `/me`) — `200 OK` *(verifies the logged-in user's profile/session)*
* `GET /api/v1/requests?page=1&size=10&sort=id%3Adesc` — `200 OK` *(fetches the updated list of requests so your new request appears in the table)*



## Return 4xx
1. Open http://localhost:5173/profile/edit
2. Go to "Change Password" 
3. For Current Password add wrong one
4. Add new password and confirm it 
5. Press [Change Password] button

* `POST api/v1/auth/change-password` — `400 Bad Request` *(rejects the password update because the current password is incorrect)*

## Return 5xx
 

 