# Hackathon Starter Template

This template is designed to get a full-stack web app up and running with a React front-end and whatever backend language you desire. Included in this template are ESLint & Prettier configurations, as well as pre-configured VSCode settings. Please refer to the [documentation](https://dev-technology-hackathon-2023.gitbook.io/docs/) for more in-depth information about setting up your app.

## ⚒️ Install the Frontend

> This template requires Node.js installed. If you need to install Node, view instructions [here](https://nodejs.org/en/download)

First, clone the template using your favorite terminal

```bash
git clone https://github.com/Dev-Technology-Hackathon-2023/hackathon-react-starter.git
cd hackathon-react-starter/frontend
```

Next, install the required dependencies

```bash
npm install
```

Once dependencies have finished installing, you can now run the frontend app!

```bash
npm start
```

Open your browser and go to `http://localhost:3000` . You should see the greeting page

## ⚙️ Setup the Backend

We've created example templates for setting up the backend of your web app. View them [here](/backend/README.md)

> The frontend app takes any requests made to the /api route and proxies them to http://localhost:3000 . For example, if you make a request to http://localhost:5173/api/test, it will proxy to http://localhost:3000/test
