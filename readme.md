

Authorization boilerplate with express js, sqlite, JWT, sequelize, joi validator, nodemailer. 

### Routes:
- register
- login
- refresh token
- email confirmation
- change user password
- user/me
- delete user

Joi validator was choosen, because it returns decent errors almost by default. Example:
```
{
  "value": {},
  "errors": [
    {
      "message": ""email" is required"
    },
    {
      "message": ""password" is required"
    }
  ]
}
```

### Guide on how to test emails

You can either use something like [mailpit](https://github.com/axllent/mailpit) to recieve confirmation emails 
on your local machine, or you can run js script with nodemailer itself:

```
import nodemailer from 'nodemailer';
(async function () {
   const credentials = await nodemailer.createTestAccount();
   console.log(credentials);
})();
```
And it will log smtp data you can test emails with:
```
user: 'ght26sv2odp31423@ethereal.email',
pass: 'qeVCbED8twjrhgeg31dp',
smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
imap: { host: 'imap.ethereal.email', port: 993, secure: true },
pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
web: 'https://ethereal.email'
```
You can go on their website and login in the account, that you generated. All emails are being deleted after couple of hours. It's also easy solution for testing

