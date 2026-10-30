# Adding the UAE landing page to Website Leads

`Code.gs` is your existing Website Leads script, with the UAE added. Nothing changes for Finland, New Zealand, Poland, UK, Ireland or Singapore.

## What was added
- `setUAEToken()`: gives the UAE site its own token, kept separate from the other countries' tokens.
- `setupUAELeads()`: creates the **UAE Leads** tab, formatted like the others. The tab is also created by itself when the first UAE lead arrives.
- `testUAELead()`: writes one sample row to UAE Leads and emails it, so you can check the setup without the website.
- **UAE in `checkTokens()`**: it now lists the UAE alongside the other countries.

## Steps
1. Open your Website Leads Apps Script project and replace its code with this `Code.gs`. Click **Save**.
2. In `setUAEToken()`, paste a new long random token (30+ letters and numbers). Run it, then delete the value from the code again and save.
3. Optional: run `setupUAELeads()` to create the tab now, and `testUAELead()` to see a sample row and email. Delete the sample row afterwards.
4. Click **Deploy → Manage deployments**. Edit your web-app deployment, choose **New version**, then **Deploy**. The web-app URL stays the same.
5. On the UAE site in Netlify, go to **Environment variables** and add:
   - `APPS_SCRIPT_URL`: your existing web-app URL, the same one the other sites use.
   - `APPS_SCRIPT_TOKEN`: the UAE token from step 2.
6. Redeploy the UAE site and submit one test enquiry from the live page.

## What each UAE lead does
The UAE site's `/api/enquiry` function forwards the form to this script with `country: "UAE"`. The script then:
- adds a row to **UAE Leads**: Date, Time (IST), Full Name, Phone Number, Email, State, Shortlisted Universities, Course, Lead Source = "UAE Landing Page", and Preferred Call Time;
- emails business@tuteeconnect.com with the subject "New UAE Lead – <name>", with Reply-To set to the student.

When the script has sent that email, the site does not send its own copy, so you get one email per lead. If the script is not set up or does not answer, the site falls back to its own email, so no lead is lost.
