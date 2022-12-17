import React, { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/fr";
import moment from "moment";
import "moment/locale/fr";
import { momentLocalizer } from "react-big-calendar";
import { GetAllMelee } from "../api/getAllMelee";
import { DeleteMelee } from "../api/deleteMelee";
import { ReserveMelee } from "../api/reserveMelee";

moment.locale("fr");
moment.updateLocale("fr", {
  week: {
    dow: 1,
    doy: 4,
  },
});
const localizer = momentLocalizer(moment);

const messages = {
  allDay: "Journée",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement", // Or anything you want
  showMore: (total: any) => `+ ${total} événement(s) supplémentaire(s)`,
};

export default function MyCalendar() {
  const [events, setEvents]: any = useState([]);
  const [isAdmin, setIsAdmin]: any = useState("");
  const [login, setLogin]: any = useState("");
  const [promo, setPromo]: any = useState("");

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem("isAdmin"));
    setLogin(sessionStorage.getItem("login"));
    setPromo(sessionStorage.getItem("promo"));
  }, []);

  const handleDelete = (id: any) => {
    DeleteMelee(id)
      .then(() => {
        alert("Mêlée supprimée");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReserve = (id: any) => {
    ReserveMelee(id, login);
    alert("Mêlée réservée");
    window.location.reload();
  };

  useEffect(() => {
    GetAllMelee()
      .then((res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          setEvents((events: any) => [
            ...events,
            {
              id: res.data[i]._id,
              title: `Mêlée ${res.data[i].user}`,
              start: new Date(res.data[i].startAt),
              end: new Date(res.data[i].endAt),
              promo: +res.data[i].promo,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        min={new Date(2022, 0, 9, 9, 0, 0)}
        max={new Date(2022, 0, 9, 18, 0, 0)}
        style={{ height: "800px", width: "1400px" }}
        culture="fr"
        defaultView="week"
        messages={messages}
        events={events
          .filter((event: any) => {
            if (isAdmin === "ADMIN") {
              return event;
            }
            if (isAdmin === "ÉLÈVE") {
              if (
                (+event.promo === +promo && event.title !== `Mêlée ${login}`) ||
                (+event.promo === +promo && event.title !== `Mêlée `)
              ) {
                console.log(event);
                return event;
              }
            }
          })
          .map((event: any) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))}
        onDoubleClickEvent={(event: any) => {
          if (isAdmin === "ADMIN") {
            handleDelete(event.id);
          } else {
            handleReserve(event.id);
          }
        }}
        onShowMore={(events: any, date: any) => {
          alert(
            `Vous avez ${events.length} événements le ${date.toLocaleDateString(
              "fr-FR"
            )}`
          );
        }}
      />
    </div>
  );
}
