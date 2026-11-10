# ChorePop — Deploy to GitHub Pages (free hosting, permanent link)

Your permanent app URL will be:

  **https://anetwolmarans.github.io/chorepop/**

This file walks you through the one-time setup (about 5 minutes).
You need: the site files (the unzipped `site/` folder) and the Firebase console.

---

## Step 1 — Upload the site files to your repo

1. Go to **https://github.com/anetwolmarans/chorepop**
2. Click **"uploading an existing file"** (or Add file → Upload files)
3. Open the `site/` folder and drag **ALL files and folders inside it**
   (index.html, _next/, icons/, sw.js, manifest.webmanifest, 404.html,
   .nojekyll, robots.txt, logo.svg, and the .txt files) into the upload area.
   *Important: upload the CONTENTS, not the folder itself — index.html must
   sit at the very top of the repo.*
4. Message: `ChorePop site v1.1.0` → click **Commit changes**

## Step 2 — Turn on GitHub Pages

1. In the repo, go to **Settings → Pages**
2. Under **Build and deployment → Source**, pick **Deploy from a branch**
3. Branch: **main** , Folder: **/ (root)** → **Save**
4. Wait 1–3 minutes, refresh the page — a green banner shows your live URL.
5. Open **https://anetwolmarans.github.io/chorepop/** on your phone —
   you should see the ChorePop "Create a family" screen.

## Step 3 — Paste the Firestore rules

1. Firebase console → **https://console.firebase.google.com** → project **chorepop-cbca2**
2. **Firestore Database → Rules** tab
3. Delete whatever is there, paste the full contents of
   **FIRESTORE-RULES.txt**, click **Publish**

## Step 4 — First family

1. On your phone, open the app → **Create a family** → type your family name
2. The **Family tab** shows your 6-character code (e.g. `P3UYR9`)
3. On any other phone: install the app → **Join a family** → enter that code
   — everyone shares the same chores instantly.

---

## Going live with real payments (optional, later)

The app currently uses the demo checkout (test card, no real money).
To charge real money with Stripe:

1. Create a Stripe account → **Payment links → Create** (two links):
   - ChorePop Pro Monthly — $3.99 **recurring every month**
   - ChorePop Pro Yearly — $29.99 **recurring every year**
2. In each link's **After payment** settings, redirect to:
   `https://anetwolmarans.github.io/chorepop/?billing=success&period=monthly`
   (and `...&period=yearly` on the yearly link)
3. Send both link URLs to your developer (they get baked into the site and
   the checkout button will open real Stripe instead of the demo).

## Notes

- The site is static and free (GitHub Pages: 100 GB/month soft limit).
- The database is Firebase Firestore — free "Spark" plan covers a family app;
  check usage at Firebase console → Firestore → Usage.
- Anonymous sign-in is enabled already (done during setup).
