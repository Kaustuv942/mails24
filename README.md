MAILS24

Team Name: Devs24

Team Members: 
Avik Ghatak
Ramyanil Raha
Kaustuv Kanchan Chattopadhyay
Ayush Pratap Singh


A full stack MERN based web app built to schedule mails through gmail. Our web application focuses on sending Recurring emails at an interval of 20s/30s along with the mails weekly, monthly and yearly on a particular time and date.














HOME

Home page shows the list of the upcoming scheduled mails
On clicking a particular item of the list, a modal shows the complete information of the mail including recipients, cc, subject and body.





                  







HISTORY

History page shows the list of the mails which are already sent.
Each list item would consist of the recipient name , subject and timestamp of it last delivery
On clicking a particular item of the list, a modal shows the complete information of the mail including recipients, cc, subject and body.








COMPOSE

Compose Page gives the user 4 options : Recurring, Weekly , Monthly , Yearly
If the user fills in all the details and clicks on the schedule button without choosing any of the options i.e Recurring / Weekly / Monthly / Yearly , then the mail would be treated like a normal mail.
Recurring : The page would give the user two extra options to select the time interval and the number of recurring mails.
Weekly : The page would give the user three extra options to select the day of the week, time and the number of recurring mails.
Monthly : The page would give the user three extra options to select the date of the month, time and the number of recurring mails.
Yearly :  The page would give the user four extra options to select the month , date of the month, time and the number of recurring mails.







AUTHENTICATION 

Users can sign in using OAuth(Google) or using the built-in authentication module of our app.
Users must sync their gmail , to use the features of home, history and compose pages.



Installation Guide


```
git clone https://github.com/Kaustuv942/mails24.git
cd frontend
npm install
npm start
```
Let’s get back using 
```
cd ..
```

```
cd backend
npm install 
npm install -g nodemon
nodemon index.js
```
Browse to http://localhost:3000 to see the app in action!
APIs Involved

1. API endpoint: /signup
```
Req: {   
    "email": "test@gmail.com",
    "password": "123456"
           }

Res: {
    "user": {
        "id": "60d8a4a7ee32881f504c10c9",
        "email": "test@gmail.com"
    }
          }
```
Registers the user and saves user data in mongodb database.


2. API endpoint: /login
```
Req: {
           "email": "test@gmail.com",
              "password": "123456"
         }
Res: {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDhhNGE3ZWUzMjg4MWY1MDRjMTBjOSIsImlhdCI6MTYyNDgxMDgzOSwiZXhwIjoxNjI0ODE0NDM5fQ.Cwwbl5VpJjPNKyhiU-Yx22zbKSFGFHS46o_xcSvQvXs",
    "user": {
        "id": "60d8a4a7ee32881f504c10c9",
        "email": "apss@gmail.com"
    }
         }
Logins the user and provide a toke

```



3. API endpoint: /gmailync
Req:
```
{
  "accessToken": "ya29.a0AfH6SMD5C-qjXJ2XOS63iZ6_nha5koKD5U7iUozZzKU-yBLnFpg5oL9DpKdnY3uLsasdmRj73XSDrDDR9SuGR2k_019KVs1ptwK3YzMJDyzDtbSSc1F1T6h4cFUMm5cQh0faOrD5gK-W9VhmSVDvk_IdomM8",
    "profileObj": {
        "googleId": "107696007155820138566",
        "imageUrl": "https://lh3.googleusercontent.com/a-/AOh14GjCMYj9hF9akr7WTZI6rYamoFLQ4BgOxzCQ_lNFuQ=s96-c",
        "email": "personal.kkc942@gmail.com",
        "name": "Kaustuv942@gmail.com",
        "givenName": "Kaustuv",
        "familyName": "Raha"
    }
}
```


	Achieves login via gmail account

4. API endpoint: /api/compose
```
Req:
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


5. API endpoint: /api/delete/:taskId
Deletes the task scheduling

6. API endpoint:/api/history/:author
History of sent mails

7. API endpoint: /api/schedule/:author
Schedule info of the next outgoing emails

8. API endpoint: /api/user/:email
User info 

