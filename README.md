# MAILS24
Ever wanted to send and schedule mail/mails at some specific day, date, time of the year  with a click of a button? Here is a web app handcrafted make your life easier.

![alt text](https://github.com/Kaustuv942/mails24/blob/master/public/1.JPG?raw=true)

![alt text](https://github.com/Kaustuv942/mails24/blob/master/public/2.JPG?raw=true)

## Installation Guide

To start the frontend: 
```
git clone https://github.com/Kaustuv942/mails24.git
cd frontend
npm install
npm start
```
Firing up the frontend: 
```
cd ..
cd backend
npm install 
npm install -g nodemon
nodemon index.js
```
## HOME

Home page shows the list of the upcoming scheduled mails
On clicking a particular item of the list, a modal shows the complete information of the mail including recipients, cc, subject and body.

## HISTORY

History page shows the list of the mails which are already sent.
Each list item would consist of the recipient name , subject and timestamp of it last delivery
On clicking a particular item of the list, a modal shows the complete information of the mail including recipients, cc, subject and body.


## COMPOSE

Compose Page gives the user 4 options : Recurring, Weekly , Monthly , Yearly
If the user fills in all the details and clicks on the schedule button without choosing any of the options i.e Recurring / Weekly / Monthly / Yearly , then the mail would be treated like a normal mail.
Recurring : The page would give the user two extra options to select the time interval and the number of recurring mails.
Weekly : The page would give the user three extra options to select the day of the week, time and the number of recurring mails.
Monthly : The page would give the user three extra options to select the date of the month, time and the number of recurring mails.
Yearly :  The page would give the user four extra options to select the month , date of the month, time and the number of recurring mails.

## AUTHENTICATION 

Users can sign in using OAuth(Google) or using the built-in authentication module of our app.
Users must sync their gmail , to use the features of home, history and compose pages.
```
Browse to http://localhost:3000 to see the app in action!
```

# APIs Involved

- ### API endpoint: /auth/signup

Registers the users.
```
{   
    "email": "test@gmail.com",
    "password": "123456"
}
```
- ### API endpoint: /auth/login

Logs in the user
```
{
    "email": "test@gmail.com",
    "password": "123456"
}
```

- ### API endpoint: /auth/gsync

Syncs user's gmail
```
{
  "accessToken": "ya29.a0AfH6SMD5C-qjXJ2XOS63iZ6_nha5koKD5U7iUozZzKU-yBLnFpg5oL9DpKdnY3uLsasdmRj73XSDrDDR9SuGR2k_019KVs1ptwK3YzMJDyzDtbSSc1F1T6h4cFUMm5cQh0faOrD5gK-W9VhmSVDvk_IdomM8",
    "profileObj": {
        "googleId": "12696007155820138566",
        "imageUrl": "https://lh3.googleusercontent.com/a-/zCQ_lNFuQ=s96-c",
        "email": "exampleuser@gmail.com",
        "name": "Example User",
    }
}
```

- ### API endpoint: /mail/compose

Composes and sends the mail at the given schedule
```

{
	"mail": {
		"from": "personal.kkc942@gmail.com",
		"to": "kaustuv942@gmail.com, apsingh1843@gmail.com",
		"subject": "FliprHacks: Api endpoint check",
		"text": "This is to inform you to attend the conference channel at once"
	},
	"schedule":{
		"type": "Recurring",
        "time": "30",
        "max": "12"
	}
}
```

- ### API endpoint: /job/delete/:taskId

Deletes the schedules of the mail instance

- ### API endpoint: /job/scheduled/:author

Schedule of mails to be sent in the future.

- ### API endpoint: /mail/history/:author

History info of the sent mails

- ### API endpoint: /auth/userdata/:email

User info 
### Team Name: Devs24

### Team Members: 
- Avik Ghatak
- Ramyanil Raha
- Kaustuv Kanchan Chattopadhyay
- Ayush Pratap Singh

