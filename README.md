# 🎂 Birthday Calendar Exporter (.ics) from Google Sheets

This Google Apps Script generates a valid `.ics` (iCalendar) file with recurring birthday events from a Google Sheet. The file can be imported into **Google Calendar**, **Outlook**, **Apple Calendar**, and other calendar applications.

---

## 📄 Google Sheet Format

Your Google Sheet must contain the following columns in **row 1**:

| Full Name         | Date of Birth |
|-------------------|---------------|
| John Doe          | 1989/01/07    |
| Jane Smith        | 1990/12/25    |

- The **name column** must be titled: `Full Name`
- The **birthdate column** must be titled: `Date of Birth`
- Dates should be formatted as `YYYY/MM/DD` or valid Google Sheets date values

---

## ⚙️ How to Use

1. Open your Google Sheet
2. Go to **Extensions > Apps Script**
3. Delete any existing code and paste the contents of [`generateICSFile.js`](generateICSFile.js)
4. Save the script (Ctrl+S or Cmd+S)
5. Click the **Run ▶️ `generateICSFile`** button
6. When prompted, review and authorize the script
7. After the script runs, go to **View > Logs**
8. Copy the URL shown to download your `.ics` file

---

## 📥 How to Import the `.ics` File into Google Calendar

1. Go to [Google Calendar](https://calendar.google.com)
2. Click the gear icon → **Settings**
3. Select **Import & export**
4. Click **Select file from your computer** and choose the `.ics` file
5. Choose which calendar to add the birthdays to
6. Click **Import**

---

## 🧠 What the Script Does

- Reads names and birthdates from your Google Sheet
- Creates recurring yearly birthday events
- Saves the file as `birthdays.ics` in your Google Drive
- Generates a download link in the Apps Script logs

---

## 📝 Customization

You can adjust:
- The starting year (`2025` by default)
- The format of event summaries or descriptions
- Filtering (e.g. skip future dates, validate missing fields)

---

## 📄 License

MIT License. Free to use, modify, and share.
