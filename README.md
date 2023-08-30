# Getting Started with REACT WORDPRESS BLOG APP

React and WordPress are a powerful combination for creating a blog. React is a JavaScript library that can be used to create interactive front-end applications, while WordPress is a content management system (CMS) that makes it easy to create and manage a blog.
**[Demo](https://shahpranaf.github.io/react-blog)**
### Here are some of the benefits of creating a blog with React and WordPress:

**Flexibility**: React is a versatile library that can be used to create a wide variety of front-end applications. This gives you a lot of flexibility in terms of how you design and develop your blog.
**Scalability**: React is a scalable library that can be used to create large and complex applications. This means that your blog can grow and evolve as your needs change.
**Performance**: React is a performant library that can be used to create fast and responsive applications. This is important for a blog, as users want to be able to read your posts without having to wait for them to load.
**Security**: WordPress is a secure CMS that is regularly updated with security patches. This helps to protect your blog from hackers and other malicious attacks.

## Setup Steps
1. Clone the project or extract the zip file.
2. Open Terminal
3. RUN `npm install` It will install all the dependencies
4. Open the .env file and update `REACT_APP_BASE_URL` with your WordPress URL
5. RUN `npm start`
6. Open `http://localhost:3000/react-blog`
7. It will load the Blog posts from your WordPress

## Steps to run TEST
1. Open the .env file and update `REACT_APP_USER_NAME` and `REACT_APP_PASSWORD` with your WordPress Test Credentials.
2. Update `REACT_APP_WEB_URL` with `http://localhost:3000/react-blog` if running in local.
3. RUN `npm test` to run Playwright tests in headless mode
4. RUN `npm test --headed` to run Playwright tests in Browser

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/react-blog](http://localhost:3000/react-blog) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the Playwright test runner.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
