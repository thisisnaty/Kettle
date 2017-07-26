export function parseJsonToIcs(json) {
  ics = "BEGIN:VCALENDAR\n" 
    + "PRODID:-//Oneweek//NONSGML Pic2Cal//EN\n" 
    + "BEGIN:VEVENT\n"
    + "UID:" + json.StartDate + "-" 
    + Math.random().toString(36).substr(2, 3) + "\n"
    + "DTSTART:" + json.StartDate + "\n"
    + "DTEND:" + json.EndDate + "\n"
    + "SUMMARY:" + json.Name + "\n"
    + "DESCRIPTION:" + json.Description + "\n"
    + "LOCATION:" + json.Location + "\n"
    + "END:VEVENT\n"
    + "END:VCALENDAR\n"
  return ics;
}
