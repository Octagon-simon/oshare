# Oshare

Oshare is a web app that allows you to upload a file, copy the link, and then share the link to the uploaded file instead.

![oshare new](https://user-images.githubusercontent.com/68190998/206370440-f0addbd1-f53c-4173-b998-e46fa75176e8.png)

## ✅ SOLUTION

Supposing you have a file that you wish to share with 50 people and you don't want to spend time sending this file to each of them individually, 
use **oshare** to upload the file, then **a link** and **QR code** will be generated and all you have to do is to send them this link instead and they will be able to download the file.

![image](https://user-images.githubusercontent.com/68190998/206370358-91d923a8-46a0-4697-b33a-8dd3975b1116.png)

A QR code is also generated and this will enable more people to get the download link of this File.

> To ensure there is room for more, all uploaded files last for `24 hours` from when it was uploaded

![image](https://user-images.githubusercontent.com/68190998/206371600-20cfe799-a87f-41ce-8507-6d82a9e81b06.png)

## ✨ INSPIRATION 

I have always been a victim of unecessary burning of data when I want to share a file to a group of people. 
So I developed Oshare to help me save more data and to ensure that more people can get access to this file.

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

- You can't remove a node when it has been rendered by `react`
  