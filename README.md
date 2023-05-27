## Development Instructions:

### First Time Only:

1. Fork the repo
2. Clone the repo down to your local machine and `cd` into it.
3. Run `yarn` in the repository to install local `/node_module` dependencies.

To setup your own db and email sending (may not be necessary if just editing the frontend):

4. Duplicate & rename the file `TEMPLATE.env.local` into your own `.env.local`, which is already set to be ignored by git, for your dev API keys.
5. Create a new project at https://firebase.google.com. Once a project is created, go to Build > Firestore Cloud Database > Create Database. The default settings are fine. Then go to Project Settings > Service Accounts > Create New Private Key. That should download a credentials `.json` file. Copy values from that into the firebase section of your `.env.local` file.
6. Create a free account at https://sendgrid.com. Copy your API key into `.env.local`.

You're now set up for development 🎉

### Every time:

To start the dev server:

```bash
yarn dev
```

You should now be able to visit http://localhost:3000 to see the webapp on your local machine.
