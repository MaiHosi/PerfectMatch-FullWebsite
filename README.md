# Perfect Match Website
## Description
This project is a pet adoption Website with both front-end and back-end features. With this website, it allows users to look for their perfect furry companion or to give away their pets and to learn more about dog and cat care!

Express and Node.js were used to create the back-end of this website.

## Learn more about EJS (Embedded Javascript)
EJS stands for Embedded JavaScript and it is a simple tamplating language that allows you to generate HTML markup with plain Javascript. 
It's mainly used in Node.js applications to render dynamic content on web pages by embedding JavaScript code directly into the HTML. And if you know HTML and Javascript, EJS will be easy to learn. 

So let's dive into the utilization of EJS!

### Why use EJS?
1. Dynamic Content: EJS lets you easily create HTML with data from variables, loops, and conditions.
2. Code Reusability: You can create reusable components (partials) with EJS that can be included in multiple pages --> reduces redundancy
3. Server-Side Rendering (SSR): EJS supports server-side rendering, which is better for SEO as it allows search engines to index your content more effectively compared to client-side rendering.
4. Template and Layouts: EJS allows you to create base layouts and extend them in other templates, helping maintin a consistent design accross your website.

## Getting Started with Express.js
1. **Importint Express**
- To use Express.js, first, you need to install it and then import it into your projetc
- Install Express.js using npm:
```
$ npm install ejs
```
2. Import Express into your Node.js file:
```
const express = require('express');
const app = express();
```

3. Create EJS Template
- for example: `browse.ejs`
```
<!--browse.ejs-->
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1>Welcome to <%= title %></h1>
</body>
</html>
```

3. **Setting up routes:**
- Define routes to handle GET HTTP methods and URLs
- Use app.get(), app.post(), etc., to specify how the server should respond to 
each request
```
app.get('/browse', (req, res) => {
  res.render('browse', { title 'Browse for Pets'})
});

app.post('/submit', (req, res) => {
  const formData = req.body;
  const name = formData.name;
  res.send('Form data submitted successfully! ' + req.body.name);
});

```

  ## Website Usage
  - **Create an Account**: Creating an account, your username and pw will be recorded in a login.txt with the following format: username:pw `maihosi23:Laval4160`.
      - If you try to create an account with the same username --> will display an error message.
        
  - **Log in**: prompt user for username and pw, if it already exist --> send an error message.
      - After loggin in, it will bring you back to the home page and you will have access to the "have a pet to give away" page.
        
  - **Log Out**: will log you successfully and you won't have access to the "have a pet to give away" page anymore.
    
  - **Home Page**: features a header, side navigation bar and footer for easy website navigation
    
  - **Find a cat/dog**: features a form with specific questions about the type of furry companion you want. Upon submission, it will display a list of pets based on your selection.
      - Empty fields will generate an error message upon submission.
      - Your answers will be saved to a pets.txt file with your username that you logged in with.
        
  - **Cat/Dog Care**: Information page about how to take care of your pet

  - **Have a Pet to Give Away**: To access this page, you will need to log in to your account/create an account
 









