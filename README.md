# APD Services Bookkeeping — Version Notes

---

## v20 — 2026-07-31
- **Settings reorganized into Settings / Masters.** Same tab, now split into two internal segments: **Settings** (Google Drive sync, Device name, Backups, Bank transaction import, Manual sync file, App version, Danger zone) and **Masters** (Clients, Chart of Accounts, GIFI code mapping, Payroll rate settings) — no nav bar changes.
- **Refund handling redesigned.** Refunds are no longer anonymous floating entries. A transaction can now optionally link to the specific original purchase it's refunding — nests visually under it in the Transactions list (indented, "↳ Refund — ..."), inherits the original's category automatically, and the parent shows a "🔁 N refund(s) linked, -$X" indicator. Linking is optional — the generic "Refunds & Rebates Received" category still works as a fallback when the original purchase isn't in the app. Gracefully falls back to a normal row if the linked original gets filtered out or deleted.
- **Chart of Accounts is now editable.** Add your own categories freely from Settings → Masters. A protected set of 8 categories that Payroll, Invoicing, refund-linking, bank-import fallbacks, and CRA Prep rely on by exact name (Consulting Revenue, Product/Photography Revenue, Other Revenue, Other Expense, Refunds & Rebates Received, Meals & Entertainment (50%), Salary/Wages, Dividends) are locked from renaming/deletion (🔒 icon) — everything else, including new categories you add, is fully editable and deletable.

## v19 — 2026-07-27
- **New category: "Refunds & Rebates Received"** (Expense type) for money refunded on a prior expense — entered as a negative amount, correctly reduces that expense total instead of inflating revenue.
- **Negative amounts now allowed** in the transaction Amount/GST fields (previously positive-only).
- **Bank import refund auto-detection** — descriptions containing "refund," "return," "reversal," "credit adj," "chargeback," or "credit memo" are automatically classified as expense credits instead of income, flagged with a badge in the import preview.

## v18 — 2026-07-27
- **Fixed a real bug:** "Sync failed: Cannot read properties of undefined (reading 'transaction')," footer version missing, Google Drive connection state gone. Root cause: a database upgrade (from Payroll in v16) silently blocked forever if another tab/window of the app was open in the background. Database connections now auto-release when another tab needs to upgrade, a clear on-screen banner explains it if it ever happens again, and there's an 8-second safety timeout so it can't hang unexplained.

## v17 — 2026-07-27
- Local backups now save to a `Downloads/APD_Backups/` subfolder instead of loose in Downloads.
- New "This device's name" setting — labels local exports, Drive snapshots, and the backup browser so you can tell devices apart.
- Nav bar decluttered: 9 flat tabs → 6 (Dashboard, Transactions, Invoicing▾, Reports▾, Payroll, Settings).
- Fixed outdated footer text claiming "not synced to the cloud."

## v16 — 2026-07-26
- **Payroll module added** — manage people, generate payslips with auto-calculated CPP/EI/tax (verified 2026 rates, YTD-capped correctly), auto-books matching bookkeeping transactions, printable payslips, editable rate table.

## v15 — 2026-07-26
- Row redesign (checkboxes, bulk delete, tap-to-view detail) across Transactions/Invoices/AR.
- Bank CSV import: account tagging (Visa/Chequing) written into transaction notes.
- Real point-in-time backups: dated Drive snapshots on every sync, 7 recent + 4 weekly retention, restore browser, local-only 14-day nudge.

## v14 — 2026-07-26
- GIFI code mapping (editable) + new CRA Prep tab: Filing Prep report and Accountant Discussion Prep report, both printable.

## v13 — 2026-07-26
- Interval-based auto-sync: Google Drive syncs every 5 minutes while the app is open, with silent token refresh.

## v12 — 2026-07-26
- Bank CSV import: column mapping, auto-category guessing, transfer detection, duplicate detection.

## v11 — 2026-07-26
- Fixed unreliable receipt photo viewing on mobile — now uses Blob URLs instead of raw data URLs.

## v10 — 2026-07-26
- Fixed invoice PDF using the wrong (white, invisible) logo — now uses a dedicated navy version.

## v9 — 2026-07-26
- Added app version footer + "Check for updates." Fixed mobile invoice form layout. Fixed the delete-resurrection sync bug (tombstone tracking). Google Drive sync added.

---

## Earlier milestones (pre-versioning)
Initial bookkeeping PWA (Dashboard, Transactions, Monthly Summary, GST/HST Summary, IndexedDB, installable PWA) → receipt photo capture + OCR scanning + PDF support → full invoicing system (clients, invoices, AR, PDF/email, Mark Paid auto-transaction, service-line tagging) → branding (logo, divider) → manual JSON sync (export/import with merge).
