# Website leads into the Google Sheet

Every submission of the free-counselling form on the UAE page does three things:

1. It sends an email to **business@tuteeconnect.com** with every field.
2. It adds a row to your Google Sheet: Date, Time, Full Name, Phone Number, Email, State, Shortlisted Universities, Course, Lead Source ("UAE Landing Page") and Preferred Call Time.
3. It saves the lead in Supabase, if Supabase is configured.

Date and Time are the moment the student submitted the form, in India time (IST).

Steps 1 and 3 already work. Step 2 needs this one-time setup, done while signed in as business@tuteeconnect.com.

## 1. Add the script to the sheet (2 minutes)

1. Open the leads Google Sheet. Its first row must hold the headers, in this order: Date, Time, Full Name, Phone Number, Email, State, Shortlisted Universities, Course, Lead Source, Preferred Call Time.
2. Go to **Extensions → Apps Script**.
3. Delete what is there and paste in all of `Code.gs`.
4. Change `TOKEN` to a long random secret of your own, for example 30 mixed letters and numbers. Keep it private.
5. If the leads should go to a tab other than the first one, put that tab's name in `SHEET_NAME`.
6. Click **Save**.

## 2. Publish it as a web app

1. Click **Deploy → New deployment**.
2. Choose the type **Web app**.
3. Set **Execute as** to *Me (business@tuteeconnect.com)*.
4. Set **Who has access** to *Anyone*. This is needed so the website can post to it; the TOKEN keeps others out.
5. Click **Deploy**, approve the permissions, and copy the **Web app URL**. It ends in `/exec`.

## 3. Tell the website (Netlify)

1. In Netlify, go to **Site configuration → Environment variables** and add two variables:
   - `GOOGLE_SHEET_WEBHOOK_URL`: the Web app URL from step 2.
   - `GOOGLE_SHEET_TOKEN`: the same secret you put in `TOKEN`.
2. Redeploy the site.

## Check it

Open `https://<your-site>/api/enquiry` in a browser. It should show `"google_sheet_configured": true`.

Then submit one test enquiry. Within a few seconds you should see:

- a new row in the sheet;
- an email at business@tuteeconnect.com.

You can delete the test row afterwards.

## Using the same sheet for other country pages

The function writes "Lead Source" as `<Country> Landing Page`, worked out from the page. The UAE page also sends it explicitly. Each country site on Netlify can use the same two variables, so every landing page fills the one sheet, and the Lead Source column tells you which page each lead came from.
