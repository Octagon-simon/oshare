# Oshare

Oshare is a web app that allows you to upload a file, copy the link, and then share the link to the uploaded file instead.

![oshare new](https://user-images.githubusercontent.com/68190998/206370440-f0addbd1-f53c-4173-b998-e46fa75176e8.png)

## ✅ SOLUTION

Supposing you have a file that you wish to share with 50 people and you don't want to spend time sending this file to each of them individually, 
use **oshare** to upload the file, then **a link** and **QR code** will be generated and all you have to do is to send them this link instead and they will be able to download the file.

![image](https://user-images.githubusercontent.com/68190998/206370358-91d923a8-46a0-4697-b33a-8dd3975b1116.png)

> To ensure there is room for more, all uploaded files last for `24 hours` from when it was uploaded

![image](https://user-images.githubusercontent.com/68190998/206371600-20cfe799-a87f-41ce-8507-6d82a9e81b06.png)

## ✨ INSPIRATION 

I have always been a victim of unecessary burning of data when I want to share a file to a group of people. 
So I developed Oshare to help me save more data and to ensure that more people can get access to the file.

## 🐱‍👤 STACK

What technologies were used to build Oshare?

- ReactJS
- JavaScript
- PHP
- MySQL
- Cuttly (URL Shortening service)

## ✍ THINGS I LEARNT

Whenever I build a project, I learn new things and also update my exisiting knowledge.

Well, here are the new things that I learnt in this project

- You can't directly mutate a file input. 
 
    In as much as we mutate other fields by directly assigning a value to them using JavaScript, in a file input, you have to create a new instance of a `DataTransfer()` object, mutate the object and then reassign the files from this object to the file input.

- You can't remove a node after it has been rendered by `react`
- Figured out a better way to handle drag and drop in react using `React Dropzone`
- You can't use the `download` atttribute on an anchor tag to download a file that is not on the same server. So you must create an Object URL that will handle the download
- If you are running your react app on **strict mode**, it will force your components to be rendered twice.
   
    This was a problem for me because my `ajax` requests were being sent twice and thus performing multiple database operations.
- Some people using this app may not be on the same timezone as the server, So I have implemented a way to properly handle files uploaded based on the timezones of the users.
- Lastly, You can't figure it out all alone! Reach out to your mentors and tutors and they will guide you 💝

## 👩‍🏫 HOW TO INSTALL

> Make sure you have php, sql, apache, npm and node installed on your system.

### FRONTEND

Extract this repository into a folder on your local development environment.

Cd into the folder `/frontend` and run the commands below to install the necessary dependencies

```
$ npm i
```

### SERVER

Import the sql file `oshare.sql` into phpmyAdmin. This will create the necessary database and tables

Now head over to `/server/api/core/env_sample.php` and modify the constants below

- CUTTLY_API : This is your Cuttly API key. [Obtain one from Cuttly](https://cutt.ly/)
- ORIGIN: This is the web address that is allowed to make requests to the api
- DB_HOST, DB_USER, DB_PASS, AND DB_NAME: This is the database host, database user, database user password and database name
- DOWNLOAD_URL : This is a link to the live hosted Api folder.

Once you have modified the file, save it and rename it to `env.php`

Now copy the API folder in `./server/` to your `www` or `htdocs` folder. 

> Make sure that the `www` or `htdocs` folder serves PHP scripts properly.

> If you are confused, take a look at how to set up a local development server (LAMP, WAMP OR XAMPP)

Now head over to `./frontend/.env.php` and modify the BACKEND_URL to reflect the path to the API folder.

Once you are done, use the command below to fire up the server

```
$ npm run dev
```

## THANK YOU

Oshare was **once** developed with a *no-code* platform (wappler). 

But I was kicked out of their community because I had issues with their software and they discovered that I was not a paid member. 

Then they asked me rudely, to learn how to code and I did just that 😃

Oshare stands to be my last personal project for the year **2022**