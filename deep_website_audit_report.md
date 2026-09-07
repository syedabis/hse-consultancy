# Comprehensive Website Audit Report (HSE Advisory Rebrand)

**Audit Date:** September 7, 2026  
**Target Application:** Kazain Advisory Website (`18 - Gasco Website`)  
**Scope:** File paths, broken image references, internal routing, legacy terminology, SEO metadata, and UI consistency.

---

## 🔴 1. Critical Issues (Broken Images & Broken Media Links)

### Issue 1.1: Missing & Mismatched Gallery Image Paths (16 HTML Files Affected)
The photo marquees and project detail galleries across 16 HTML template files reference filenames that do not exist in `public/pictures/`.

* **Root Cause:** Inconsistent filenames vs. URL-encoded paths.
* **Affected Assets & Mismatches:**
  1. `Industrial Water Infrastructure - Water Piprline - pg 29.jpeg`  
     ➡️ Actual file in `public/pictures/`: `RDMC - Water Piprline - pg 29.jpeg`
  2. `ASME Modular Skid Project pg 31.jpeg`  
     ➡️ Actual file in `public/pictures/`: `HTDC Project pg 31.jpeg`
  3. `Gas Dehydration Facility - pg 37.jpg`  
     ➡️ Actual file in `public/pictures/`: `Nandipur - pg 37.jpg`
  4. `Modular Early Production Facility - pg 33.jpeg`  
     ➡️ Actual file in `public/pictures/`: `Dhok Sultan - pg 33.jpeg`
* **Impact:** 4 out of 10 gallery marquee images show broken image icons on project detail pages and service showcases.

---

## 🟠 2. High Severity (Routing & Trailing Slash Inconsistencies)

### Issue 2.1: Trailing Slash Discrepancies in `routes.json`
`routes.json` explicitly defines route paths with trailing slashes (e.g. `"/about-us/"`, `"/contact-us/"`). However, several buttons and navigation links across `home-04`, `services`, `projects`, and `our-team` point to `/about-us` or `/contact-us` (without trailing slashes).

* **Impact:** Can cause unexpected 404 page loads or fallback redirects in static web hosting environments.
* **Recommended Fix:** Standardize all internal link `href` attributes across all HTML files to include trailing slashes (e.g., `href="/contact-us/"`).

---

## 🟡 3. Medium Severity (Legacy Terminology & Branding Residuals)

### Issue 3.1: Residual EPC Terminology in `htdc-skids/body.html`
* **Location:** `content/htdc-skids/body.html` (Lines 520 & 552).
* **Issue:** Contains occurrences of `"fabrication yard"`.
* **Recommended Fix:** Replace with `"skid engineering & compliance facility"`.

### Issue 3.2: Legacy Service Route Naming (`integrated-epc-services`)
* **Location:** `routes.json` & `/services/integrated-epc-services/` directory.
* **Issue:** Legacy folder and route name `/services/integrated-epc-services/` still retains `"epc"`.
* **Recommended Fix:** Rebrand route/folder label to `/services/integrated-hse-advisory/` or `"Integrated HSE & Risk Advisory Services"`.

---

## 🟢 4. Low Severity & UX Polish

### Issue 4.1: Rotating Hero Badge Graphic (`/gasco/epc-badge.svg`)
* **Location:** Hero sections across all 8 case study detail pages.
* **Issue:** The image `alt` text was updated to `"HSE Risk Advisory"`, but the SVG graphics file in `public/gasco/epc-badge.svg` still reads `"Oil & Gas EPC Execution"` around the outer text ring.
* **Recommended Fix:** Update the SVG text path to read `"HSE Risk Advisory • Safety & Compliance"`.

### Issue 4.2: Page `<title>` Tags & Meta Description Standardization
* **Location:** `page.json` across subpages.
* **Issue:** Some subpages lack rich, HSE-specific meta descriptions for search engines.

---

## 📋 Recommended Action Plan

1. **Fix Image Mismatches:** Update HTML image `src` references or create duplicate symlinks/copies in `public/pictures/` so all marquee images load seamlessly.
2. **Fix Trailing Slashes:** Run a batch update to add trailing slashes to all internal links (`/contact-us/`, `/about-us/`, `/projects/`).
3. **Clean Up `htdc-skids/body.html`:** Remove remaining `"fabrication yard"` occurrences.
4. **Update `epc-badge.svg` Graphic:** Replace legacy text ring with HSE advisory wording.
