# Cleaning up Registrations

In order to validate registrants, we needed to confirm who was actually a registered voter within the district.

To accomplish this, we were given a large Excel file of the 91k officially registered voters in the district.
We could then match the registrants name & mailing address against this file, before sending them their unique postal mailer to verify their address.

### Here are the steps we took — all data files were .gitignore'd for security:

1. Downloaded the registrants to local machine by visiting the http://localhost:3000//api/pull-db route (`pages/api/pull-db.ts`).
   - This file was an API route rather than a CLI script, because our API was already configured with Firebase credentials, and this `db/` folder was configured to run the node alternative `bun` (faster, built in Typescript support, built in SQLite), which wasn't quickly cooperating with Firebase.
2. We then split the list of registrants into 3 groups — `group-1.csv`, 2, and 3 — to divide the validation workload. This logic is in `./make-3-csvs.ts`.
3. I (David) then took my group (`group-1`), and adjusted it using `setup-reviewed-list.ts` to create a `reviewed-1.tsv` file to track progress so far, with new cols `dupe_of`, `found_VSN`, `notes`.
   1. VSN = Voter Serial Number, a unique number assigned to voters and used as an index in the voter list.
   2. This was converted to .tsv instead of .csv to avoid needing to parse out the commas within the mailing_addresses.
   3. After getting close to accidentally overwriting the initial work in it, I decided it would be great to have version control. But for privacy reasons it couldn't be checked into this public repository, so it lived in a separate fresh folder in `~/Desktop`, where it wouldn't need to be .gitignore'd. `import-reviewed.ts` handles easily grabbing this file.
4. We then initially checked over our `reviewed-1.tsv` to mark any registrations we already knew were invalid, by adding `was test` to their `notes` field.
5. We then wanted to identify the obvious duplicates — `mark-duplicates.ts` — which would be a waste of effort to match against the voter file.
6. Next, we began a first pass at querying the 91k list for each registrant. We wrote a script `search-voter-list.ts` that would try them one at a time to find a match. Whenever it got stuck, we added custom logic: e.g more adaptable regexes to parse their mailing address, or special handling if they did something weird. Slowly but surely this became more flexible, applying the rules it had learned from the first-of-that-type to later similar situations. Our first pass was able to find VSNs about 50% of the time with matching name and address.
7. We adapted this script to also run over group-2 and group-3, with only minimal new handling for edge cases needed. In both these cases it also found VSNs for approximately 50% of registrations. Since approx 25% had been eliminated as dupes, that means there's approximately 25% more room left for this script to still handle.
8. All the results of this process was then saved to the DB using the `api/save-vsns` route (like with step #1 above). The DB was then pulled down again, so all these results are now in our local `registrations.json`.
9. We then save a Lob address for everyone with a VSN, using the `lob/create-lob-address.ts` script, followed by `api/save-lob-addresses` to persist to the remote db, then another pull down with `api/pull-db`.
10. We assigned auth codes w/ `api/assign-auth-codes`. Refreshed down w/ `api/pull-db`. Then ran `db/check-auths-unique` to verify the auth codes were assigned properly and each unique.

### Making the Official Voter File easily query-able

As mentioned above, we were given a large (91k+ rows) .xlsx file of all the officially registered voters in the district.

We could load this file into JS using `node-xlsx`. But doing this led to slow parsing / startup times: an extra 12 seconds every time. So in order to speed up development, we first converted it json, using the `./xlsx-to-json.ts` script.

We then wanted to be able to directly query individual rows of the voter list, to search for specific name / address matches. In order to make this faster and easier, we set up a simple SQLite db of the 91k voters, using the `./load-d9-file-into-sql.ts` script. Running this took approximately 70 seconds to build the 91k `d9-voters` table. (We suspect it could have been sped up by combining the queries, but didn't care to optimize it since it is only needed once).

### Note on setting up dev environment for bun

We decided to use `bun` (a new alternative to `node`) because it is very fast, especially for running Typescript files, which enables a more rapid development cycle. This requires first installing `bun` to the machine: see https://bun.sh. Next, in order to make using it as easy as possible, we configured our VSCode Code Runner Extension to always execute .ts files with `bun`, by adding this setting to our workspace's `.vscode/settings.json`:

```
  "code-runner.executorMap": {
    "typescript": "bun $fullFileName"
  },
```

This makes running any individual script as easy as pressing `Cmd+I` (we had previously set Code Runner to this hotkey).

This is not necessary, but it makes things faster and easier 🙂
