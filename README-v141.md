# v141: free counselling form, email and Google Sheet

## The form (student profile card)
- **Fields:** Full name, Phone, Email, State, Course (dropdown of 20 course areas), Shortlisted universities and Preferred call time.
- **State:** a dropdown of Indian states and union territories, plus "Outside India".
- **Shortlisted universities:** a searchable dropdown of the 90 licensed UAE universities, plus "Not decided yet", matching the other dropdowns.
- **Preferred call time:** Morning, Afternoon, Evening, Late evening (IST), or Any time.
- **Required fields:** name, phone and email stay required. The new fields are optional, so a student is never blocked from submitting.
- **Lead source:** every submission carries "UAE Landing Page".
- **Card layout:** taller on desktop with two columns; single column on phones.
- **Unchanged:** the original /api/enquiry fields (subject, from_name, destination, name, email, phone, page, botcheck). The new fields are added alongside them.

## Where each lead goes
`netlify/functions/enquiry.mjs`:
1. **Email to business@tuteeconnect.com**, as before. It now includes State, Course, Shortlisted Universities, Preferred Call Time and Lead Source.
2. **New: a row in the Google Sheet**, with Date and Time (IST, when the form was submitted), Full Name, Phone Number, Email, State, Shortlisted Universities, Course, Lead Source and Preferred Call Time.
3. **Supabase**, if configured, as before.

## One-time setup for the sheet
See `google-sheet/SETUP.md`. It covers pasting `Code.gs` into the sheet (Extensions → Apps Script), deploying it as a web app, and adding two Netlify environment variables: `GOOGLE_SHEET_WEBHOOK_URL` and `GOOGLE_SHEET_TOKEN`.

Until that is done, leads still arrive by email; only the sheet step is skipped.

## Update: the shared Website Leads script
The UAE now uses your existing Website Leads Apps Script, with UAE added. See `apps-script/UAE-SETUP.md`. Netlify settings: `APPS_SCRIPT_URL` and `APPS_SCRIPT_TOKEN`. The earlier `google-sheet/` files are no longer used.

## v141.1
- Added a version tag ("uae-v141.1") to the enquiry status check, so you can see which build is live.

## v141.2
- Fixed the form "Page not found": removed the function's custom path so the netlify.toml redirect (/api/enquiry → /.netlify/functions/enquiry) reaches it.
