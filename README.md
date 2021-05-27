![calculator screenshot](https://github.com/brunochirelli/svelte-calculator-app/blob/main/screenshot.png?raw=true)

---

# Svelte-Calculator-App

## Goal

The goal of this project was to expand my frontend skills using another JavaScript framework (Svelte) to amplify my toolset.

This project was a challenge from Frontend Mentor. 

Here I try focus on the logic of the app and handle basic operations of a basic calculator.

- Handle components
- Folder structure
- Svelte stores
- Testing with Jest and Testing-Library


## Stack

This project use the default template for [Svelte](https://svelte.dev) apps. The framework lives at https://github.com/sveltejs/template.

- Svelte
- Javascript
- HTML5, CSS3
- Node
- Jest, Testing-Library
- Vercel (deploy).

## Commands

## Dev

```bash
yarn dev
```
Starts the site in development mode.

Navigate to [localhost:5000](http://localhost:5000). You should see your app running.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Deploy

This app was deployed at Vercel.
