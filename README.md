v17 — 2026-07-27
Backups saved to a subfolder. Local exports (JSON backup + CSV) now download to Downloads/APD_Backups/ instead of loose in Downloads.
Device identification. New Settings → "This device's name" field. Shows up in local export filenames, Google Drive snapshot filenames, and the "View available backups" list — so you can tell which device a backup came from.
Nav bar decluttered. Reduced from 9 flat tabs to 6: Dashboard, Transactions, Invoicing ▾ (Invoices, Receivable), Reports ▾ (Monthly, GST/HST, CRA Prep), Payroll, Settings. Overdue-invoice badge now shows on the Invoicing group toggle.
Fixed footer text that still claimed "not synced to the cloud" — outdated since Drive sync was added.

v16 — 2026-07-26
Payroll module added (new Payroll tab):
Manage people (you, Rashmi, future hires) with pay frequency and an explicit EI-exempt toggle (defaulted off — nothing assumed automatically)
New payslip form: auto-calculates CPP (both tiers), EI, federal + Saskatchewan tax, and net pay using verified 2026 CRA/Saskatchewan rates
YTD-cumulative tracking so CPP/EI correctly stop at the annual maximum mid-year (tested against a full 12-month simulation — lands exactly on the legislated 2026 caps)
Saving a payslip auto-creates the matching bookkeeping transactions (net pay + employer-side CPP/EI cost), no double entry
Printable payslip (same branded PDF pattern as invoices) with a built-in "these are estimates — confirm with CRA's PDOC tool" notice
Editable payroll rate table in Settings, since CRA updates these every fall

v15 — 2026-07-26
Row redesign across Transactions, Invoices, and Accounts Receivable:
Checkboxes + "select all visible" (scoped to current filters) + a single "Delete selected (n)" bulk-delete toolbar with one grouped confirmation — replaces risky inline delete icons
Tapping a description/invoice number opens a read-only detail view with an Edit button, instead of a separate edit icon
Receipt viewing moved into the transaction detail view
Bank CSV import: account tagging. Account Type/Number columns now mappable during import, written into transaction Notes (e.g. "[Visa ...5420]")
Real backups, not just live sync:
Dated snapshot saved to Google Drive on every sync, separate from the live sync file (so a mistake that syncs doesn't erase your only backup)
Retention: 7 most recent kept, plus up to 4 more spread across older weeks
"View available backups" in Settings, with per-backup Restore
Local-only nudge banner (no Drive needed) if 14+ days since your last manual export
Removed an orphaned/broken settings control found during this pass (a sync-interval dropdown with no backing function)

v14 — 2026-07-26
GIFI code mapping added (Settings) — best-effort starting codes for T2 corporate filing, fully editable, clearly flagged as unverified starting estimates
New "CRA Prep" tab with two reports, both printable:
Filing Prep — revenue/expenses grouped by GIFI code, GST/HST cross-check, flagged items (meals & entertainment 50% split, transactions with no GST/HST recorded, unusually large transactions)
Accountant Discussion Prep — year-over-year trends, expense-as-%-of-revenue, salary vs. dividends shown plainly, auto-generated talking points (framed as questions to ask, never advice)

v13 — 2026-07-26
Interval-based auto-sync: Google Drive now syncs automatically every 5 minutes while the app is open (in addition to on open/close), with silent token refresh — no repeated login prompts
v12 — 2026-07-26
Bank CSV import added: column-mapping screen (auto-detects RBC's format), auto-category guessing by keyword, transfer detection (flags likely inter-account transfers so they don't inflate income/expenses), duplicate detection against existing transactions

v11 — 2026-07-26
Fixed unreliable receipt photo viewing on mobile browsers — now converts to a Blob URL before opening instead of navigating directly to a raw data URL, which several Android browsers rendered blank

v10 — 2026-07-26
Fixed invoice PDF/print template using the wrong (white, invisible-on-paper) logo — now uses a dedicated navy version

v9 — 2026-07-26
Added visible app version footer + Settings → "Check for updates" button
Fixed mobile invoice form layout (line items table now stacks into cards on narrow screens instead of overflowing)
Fixed the actual "delete keeps coming back after sync" bug: deletes are now tracked as tombstones so they propagate correctly through sync instead of being silently resurrected
Google Drive sync added: OAuth connect flow, drive.appdata-scoped private sync file, manual "Sync now," merge-by-newest-timestamp logic
Earlier milestones (pre-versioning)

Before formal version numbers were introduced at v9, the app went through several major builds:

Initial bookkeeping PWA: Dashboard, Transactions, Monthly Summary, GST/HST Summary, IndexedDB local storage, installable PWA (manifest + service worker)
Receipt photo capture (camera + upload) with automatic compression
Receipt scanning/auto-fill via OCR (Tesseract.js)
PDF/image receipt support (PDF.js for converting PDF pages to images before OCR)
Full invoicing system added: clients, invoices (line items or lump sum), Accounts Receivable, PDF generation, "email invoice" via mailto, Mark Paid → auto-creates income transaction, service-line tagging (Consulting/Photography/Other)
Branding: traced "ad" monogram logo integrated into header, app icons, and invoice template, with a divider between logo and wordmark
Manual sync (export/import JSON with merge-by-timestamp) as the original cross-device sync method, later supplemented by Google Drive sync in v9
