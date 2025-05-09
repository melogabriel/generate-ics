function generateICSFile() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const nameIndex = headers.indexOf("Full Name"); // insert name of column with names
  const birthdateIndex = headers.indexOf("Date of Birth"); // insert name of column with birthdates

  if (nameIndex === -1 || birthdateIndex === -1) {
    throw new Error("Column headers not found. Check the headers.");
  }

  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];

  for (let i = 1; i < data.length; i++) {
    const name = data[i][nameIndex];
    const rawDate = data[i][birthdateIndex];

    if (!name || !rawDate) continue;

    const birthdate = (rawDate instanceof Date) ? rawDate : new Date(rawDate);
    if (isNaN(birthdate)) continue;

    const month = String(birthdate.getMonth() + 1).padStart(2, '0');
    const day = String(birthdate.getDate()).padStart(2, '0');
    const dateString = `2025${month}${day}`; // Use next calendar year
    const uid = Utilities.getUuid();

    // Escape commas and semicolons
    const safeName = name.replace(/,/g, "\\,").replace(/;/g, "\\;");

    icsContent.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTART;VALUE=DATE:${dateString}`,
      "DTEND;VALUE=DATE:" + getNextDay(dateString),
      `RRULE:FREQ=YEARLY`,
      `SUMMARY:${safeName}'s Birthday`,
      `DESCRIPTION:Aniversário de ${safeName}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "TRANSP:TRANSPARENT",
      "END:VEVENT"
    );
  }

  icsContent.push("END:VCALENDAR");

  const finalICS = icsContent.join("\r\n");
  const blob = Utilities.newBlob(finalICS, "text/calendar", "aniversarios.ics");
  const file = DriveApp.createFile(blob);

  Logger.log("Arquivo criado: " + file.getUrl());
}

function getNextDay(yyyymmdd) {
  const year = parseInt(yyyymmdd.slice(0, 4));
  const month = parseInt(yyyymmdd.slice(4, 6)) - 1;
  const day = parseInt(yyyymmdd.slice(6, 8));
  const date = new Date(year, month, day + 1);
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}${m}${d}`;
}
