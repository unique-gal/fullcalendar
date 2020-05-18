import { Calendar } from "@fullcalendar/core";
import koLocale from "@fullcalendar/core/locales/ko";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/bootstrap/main.min.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const RESOURCES = [
  {
    id: "b",
    title: "코치2",
  },
  {
    id: "c",
    title: "코치3",
  },
  {
    id: "d",
    title: "코치4",
  },
  {
    id: "e",
    title: "코치5",
  },
  {
    id: "f",
    title: "코치6",
  },
];

const FIREBASE_CONF = {
  apiKey: "AIzaSyAIwBwBG6jFDAjoMSwr2kHyomyRLxXBaaQ",
  authDomain: "golftemp-ce06c.firebaseapp.com",
  databaseURL: "https://golftemp-ce06c.firebaseio.com",
  projectId: "golftemp-ce06c",
  storageBucket: "golftemp-ce06c.appspot.com",
  messagingSenderId: "8808231331",
  appId: "1:8808231331:web:7b5351ba70a8a8ec282a16",
  measurementId: "G-QWFN9626S8"
};


window.calendar_data = [];

function getCoaches (calendar) {
  const databaseData = firebase.database().ref("CoachData/").orderByKey();
  return databaseData.once("value", function (snapshot) {
    snapshot.forEach((coach) => {
      const coachData = coach.val();
      calendar.addResource({
        id: String(coachData.ID),
        title: coachData.Name
      });
    })
  });
}

function addEvents (calendar) {
  const databaseData = firebase.database().ref("CustomerData/").orderByKey();

  databaseData.once("value", function (snapshot) {
    snapshot.forEach((customerItem) => {
      const data = customerItem.val();

      if (typeof data === 'object') {
        Object.keys(data.LessonList).forEach(function(key,index) {
          if (typeof data.LessonList[key] === 'object') {
            const CurrentLesson = data.LessonList[key];
            const LessonSeries = CurrentLesson.LessonSeries;
    
            LessonSeries.forEach((lessonSeriesItem) => {
              if (lessonSeriesItem.ReservationTime) {
                const date = new Date((lessonSeriesItem.ReservationTime + (new Date().getTimezoneOffset() * 600000000) - 621355968000000000) / 10000);
                const startDate = new Date(date.setTime(date.getTime() + 9 * 3600 * 1000));
                const endDate = new Date(startDate.getTime() + 1 * 3600 * 1000);

                calendar.addEvent(
                  {
                    resourceId: String(CurrentLesson.CurrentCoachID),
                    title: data.Name,
                    start: startDate.toISOString(),
                    end: endDate.toISOString(),
                    color: "#ffebee",
                    textColor: "#424242",
                  }
                );
              }
            });
          }
        });
      }
    });
  });
}

function initCalendar () {
  const calendarEl = document.getElementById("full-calendar");

  const calendar = new Calendar(calendarEl, {
    plugins: [resourceTimeGridPlugin, bootstrapPlugin],
    eventRender: function (info) {
      info.el.style.padding = "0";
      info.el.style.fontSize = "1em";
      info.el.style.textAlign = "center";
      info.el.style.fontWeight = "bold";
      info.el.style.verticalAlign = "middle";
    },
    resources: RESOURCES,
    defaultView: "resourceTimeGridWeek",
    timeZone: "UTC",
    header: {
      left: "prev,next",
      center: "title",
      right: "dayGridMonth,resourceTimeGridWeek,resourceTimeGridDay",
    },
    views: {
      resourceTimeGridWeek: {
        type: "resourceTimeGrid",
        buttonText: "주",
      },
    },
    datesAboveResources: true,
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    contentHeight: "auto",
    navLinks: true,
    firstDay: 1,
    allDaySlot: false,
    weekends: true,
    minTime: "09:00:00",
    maxTime: "23:00:00",
    locale: koLocale,
    themeSystem: "bootstrap",
    displayEventTime: false,
  });

  calendar.render();

  return calendar;
}

document.addEventListener("DOMContentLoaded", function () {
  firebase.initializeApp(FIREBASE_CONF);
  const calendar = initCalendar();
  getCoaches(calendar).then(() => {
    addEvents(calendar);
  });
});
