# React Starter Template

This template is designed to get a React frontend running integrated with whatever backend programming language you want to use. This template proxies requests on the frontend /api route to http://localhost:3000. Included in this template are ESLint & Prettier configurations, as well as pre-configured VSCode settings. Please refer to the [documentation](https://dev-technology-hackathon-2023.gitbook.io/docs/) for more in-depth information about setting up your app.

## ⚒️ Installation & usage

> This template requires Node.js installed. If you need to install Node, view instructions [here](https://nodejs.org/en/download)

First, clone the template using your favorite terminal

```bash
git clone https://github.com/Dev-Technology-Hackathon-2023/hackathon-react-starter.git
cd hackathon-react-starter
```

Next, install the required dependencies

```bash
npm install
```

Once dependencies have finished installing, you can now run the frontend app!

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000` . You should see the greeting page

### Configuring the backend

This template is designed to let you plug & play any local api running on port 3000. Go to [] for specific language examples.

> To run both the frontend & the backend at once, you can use two different terminal windows or use a library like [Concurrently](https://www.npmjs.com/package/concurrently) in the package.json file
