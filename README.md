# Getting Started

You can use many of the features of this repo by going to the Topia.io marketplace and getting one of the SDK Examples scenes, then placing it in one of your worlds. Then go to https://sdk-examples.metaversecloud.com and select the relevant application.

- Clone this repository
- Run `yarn` in server
- `cd client`
- Run `yarn` in client
- `cd ..` back to server

## Add your .env environmental variables

### Where to find INTERACTIVE_KEY and INTERACTIVE_SECRET

### Where to find API_KEY

- While logged in to topia.io, click on your image (or gray circle) in the top left of the screen to open My Account
- In the side menu, select Integrations
- Click Generate New API Key and copy the API Key to be used in your .env and while using https://sdk-examples.metaversecloud.com

### Where to get GOOGLE_API_KEY

A Google API Key is necessary for the function of the YouTube integration within the Jukebox. Go to https://console.cloud.google.com/apis/api/youtube.googleapis.com/credentials. Click "+ Create Credentials" and select "API key". Enter this API key as GOOGLE_API_KEY in .env.

# Using the Jukebox

## Using the Jukebox from the https://sdk-examples.metaversecloud.com/jukebox interface

Test

## Adding a Jukebox to a world you own

### From Topia.io Scene

You can get the "SDK Example Jukebox" scene from the Topia.io marketplace for free. Once you have placed that in a world you own, go to https://sdk-examples.metaversecloud.com/jukebox and enter your API Key and world URL Slug (/jukebox-example), then Fetch Assets and select your jukebox.

### Adding a new jukebox asset in your world

We recommend using the Jukebox scene from the marketplace to get started as it will come pre-configured. If, however, you want to add your own image as the Jukebox, you can place any asset and configure it by following the instructions below.

**Get Started**

Place an asset in any world you own. While in edit mode, click to _edit_ the jukebox.

**Integrations**

- If you want visitors to be able to interact with your in-world jukebox controls and from within an iFrame, add your Developer Public Key and toggle 'on' Add Player Session Credentials to Asset Interactions.
- Click 'Add Webhook' and add Webhook Type "Media Play Finished". Add the webhook URL "https://sdk-examples.metaversecloud.com/webhooks/playlist". Add a title and description.

**Links**

- Select "Open a website, game, or tool"
- Enter "Jukebox" (or whatever you want) as Title and "https://sdk-examples.metaversecloud.com/jukebox" as the Link.

# Deploying to Heroku

- Go to https://heroku.com and create an account if you don't already have one.
- Create a new Heroku project.
- Add your .env parameters to a heroku project.
- Add both the `https://github.com/mars/create-react-app-buildpack.git` and `heroku/nodejs` buildpacks to your project.
- From your terminal, type `git remote add heroku <your heroku git URL>`.
- From your terminal, type `git push heroku master`.
