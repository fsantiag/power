---
status: accepted
date: 2025-05-17
---

# ADR 0001 — Form backend: Google Apps Script + Google Sheets

## Context

The landing page needs to collect leads (name, email, phone, message) with no backend infrastructure. Options considered: Netlify Forms, Formspree, Web3Forms, Google Apps Script.

## Decision

Use Google Apps Script Web App as the POST endpoint. Submissions are written to a Google Sheet and trigger an email notification to the owner.

## Reasons

- **Zero cost, no submission limits** — Netlify Forms has unclear limits on the new credits model; Formspree/Web3Forms cap free tiers at 50–250/month.
- **Owner controls the data** — leads land in a Google Sheet the owner already has access to, no third-party vendor lock-in.
- **No backend to maintain** — Apps Script runs serverlessly on Google's infrastructure.

## Trade-offs

- CORS blocks reading the POST response from a static page. Workaround: `mode: no-cors` fetch — data reaches the script, success is shown optimistically. Acceptable for a lead capture form.
- Slightly more setup than Netlify Forms (one-time ~20 min to deploy the Web App).
- If the Apps Script quota is exceeded (unlikely for a pre-launch page), submissions silently fail. Monitor the Sheet periodically.
