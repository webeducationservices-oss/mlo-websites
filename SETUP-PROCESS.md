# Website Launch: Analytics, Search & Compliance Setup

**Site:** mlositeai.com
**Date:** 2026-03-26
**Admin Email:** webeducationservices@gmail.com

---

## 1. Google Tag Manager (GTM)

### Account & Container Creation
- Created GTM account and container for mlositeai.com
- **Account ID:** 6346406392
- **Container ID:** 247501869
- **GTM Container Code:** `GTM-W5VMPDK5`

### GTM Code Installation (All HTML Pages)
Added to every page in the site (10 pages total):

**In `<head>` (immediately after opening tag):**
1. Google Consent Mode v2 script (GDPR default)
2. GTM head snippet

**In `<body>` (immediately after opening tag):**
1. GTM noscript fallback iframe

### Built-In Variables Enabled
- All **Click** variables (Click Element, Click Classes, Click ID, Click Target, Click URL, Click Text)
- All **Form** variables (Form Element, Form Classes, Form ID, Form Target, Form URL, Form Text)

### Triggers Created
| Trigger Name | Type | Condition |
|---|---|---|
| Click to Call | Just Links | Click URL contains `tel:` |
| Email Click | Just Links | Click URL contains `mailto:` |
| Form Submission | Form Submission | All Forms |

### Tags Created
| Tag Name | Tag Type | Trigger | Details |
|---|---|---|---|
| GA4 Configuration | Google Tag | All Pages | Measurement ID: `G-DFSHR2KR09` |
| GA4 - Click to Call | GA4 Event | Click to Call | Event: `click_to_call` |
| GA4 - Email Click | GA4 Event | Email Click | Event: `email_click` |
| GA4 - Form Submission | GA4 Event | Form Submission | Event: `form_submission` |

### Publishing
- Published as **Version 2 - v1.0 - Initial Setup**

---

## 2. Google Analytics 4 (GA4)

### Property Details
- **Account:** Treasure Coast Home Loans (Account ID: 179438189)
- **Property:** mlositeai.com (Property ID: 530028923)
- **Measurement ID:** `G-DFSHR2KR09`
- **Timezone:** (GMT-04:00) New York Time
- **Currency:** US Dollar ($)
- **Industry:** Finance
- **Business Size:** Small - 1 to 10 employees
- **Business Objectives:** Generate leads, Understand web and/or app traffic

---

## 3. Google Search Console

### URL Prefix Property (Verified)
- **Property:** `https://mlositeai.com/`
- **Verification Method:** HTML file upload
- **Verification File:** `google11c7ce988bb7c62c.html`
- **Status:** Verified

### Domain Property (Verified)
- **Property:** `mlositeai.com` (covers all subdomains + http/https)
- **Verification Method:** DNS TXT record
- **TXT Record Value:** `google-site-verification=U68KqAEYXsfffRAP7SedS2ub3SUnK1rs87CVkkZd6OA`
- **DNS Provider:** Vercel (TXT record added to mlositeai.com DNS)
- **Status:** Verified

### Sitemap
- **Submitted:** `sitemap.xml` (10 pages discovered, Status: Success)

---

## 4. GDPR Compliance: Google Consent Mode v2

Consent defaults added to every page before the GTM snippet:

```
analytics_storage: granted
ad_storage: denied
ad_user_data: denied
ad_personalization: denied
```

This ensures analytics runs while ad-related tracking is blocked by default, meeting GDPR baseline requirements.

---

## 5. SEO Files

| File | Purpose |
|---|---|
| `sitemap.xml` | Lists all 10 pages with lastmod dates for search engine crawling |
| `robots.txt` | Allows all crawlers, references sitemap URL, crawl-delay of 1 |
| `llms.txt` | Business description, services, pricing, and all page URLs for LLM discovery |
| `google11c7ce988bb7c62c.html` | Search Console HTML verification file |

---

## 6. Standard Process Checklist

Use this checklist for every new site launch:

### Pre-Launch
- [ ] Create GTM account and container
- [ ] Add GTM + Consent Mode v2 code to all HTML pages (head + body noscript)
- [ ] Enable Click and Form built-in variables in GTM
- [ ] Create event triggers: Click to Call, Email Click, Form Submission
- [ ] Create GA4 Configuration tag + event tags for each trigger
- [ ] Publish GTM container

### Analytics
- [ ] Create GA4 property (set timezone to New York)
- [ ] Connect GA4 to GTM via Measurement ID
- [ ] Verify real-time data in GA4

### Search Console
- [ ] Add Domain property (DNS TXT record verification - preferred)
- [ ] Add DNS TXT record to Vercel (or domain DNS provider)
- [ ] Verify domain ownership
- [ ] Submit sitemap.xml

### SEO Files (deploy to site root)
- [ ] `sitemap.xml` - all pages with lastmod dates
- [ ] `robots.txt` - allow all, reference sitemap, crawl-delay 1
- [ ] `llms.txt` - business info and all page URLs

### GDPR
- [ ] Consent Mode v2 defaults on every page (before GTM snippet)
- [ ] `ad_storage`, `ad_user_data`, `ad_personalization` set to `denied`

---

## Notes

- **DNS TXT Record for Search Console:** Always use Domain property (DNS TXT record) for full domain coverage. Prompt for Vercel DNS access if needed.
- **Timezone:** Always set to New York (America/New_York) unless specified otherwise.
- **Consent Mode:** The current setup grants `analytics_storage` by default. If a cookie consent banner is added later, update to dynamically set consent based on user choice.
