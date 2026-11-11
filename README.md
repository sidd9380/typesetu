# TypeSetu

Free typing practice for government exams — Delhi Police HCM, SSC CHSL, SSC CGL DEST and RRB NTPC.
A static site (GitHub Pages) with optional Firebase sign-in to sync progress.

## Structure

```
index.html                    App shell and markup
assets/css/app.css            All styles (design tokens at the top, light + dark)
assets/js/rate-limit.js       Client-side throttling for auth and cloud writes
assets/js/core.js             Passages, typing engine, storage, settings, Firebase sync
assets/js/views.js            View routing, login/sign-up pages, result card
assets/js/passages.js         Exam passage library (data only)
assets/js/exams.js            Exam specs, hubs and the exam test screen
assets/js/telemetry.js        Keystroke telemetry for result analysis
assets/js/forensics-revision.js  Result forensics and Revision mode
assets/js/revision-drills.js  Revision drill sessions
assets/js/fact-cards.js       Fact Cards game
assets/js/navigation.js       Browser history / back-button handling
*-typing-test/index.html      SEO landing page per exam
firestore.rules               Firestore security rules
```

Scripts are plain browser JS loaded in order — keep the order in `index.html`.

## Run locally

Any static server works, for example:

```
npx serve .
```

## Rate limiting

- **In the browser** (`assets/js/rate-limit.js`): log-in 5 per 5 min, sign-up 3 per hour, password reset 3 per 15 min,
  cloud writes 60 per 10 min, full cloud sync once per 30 s. Name and revision saves are debounced.
- **On the server** (`firestore.rules`): users can only read/write their own data, fields and sizes are validated,
  and a result can't be rewritten within 2 seconds. Deploy with:

```
firebase deploy --only firestore:rules
```

For stronger protection, enable **Firebase App Check** and set up **API key restrictions** (HTTP referrer = your domain)
in the Google Cloud console.
