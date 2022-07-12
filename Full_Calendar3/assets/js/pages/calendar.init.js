! function(v) {
    "use strict";

    function e() {}
    e.prototype.init = function() {
        const calendars = [];
        const submitEvent = document.querySelector('#btn-save-event');
        const deleteEvent = document.querySelector('#btn-delete-event');
        const token = document.cookie.split('=')[1];
        const saveData = (newEvent) => {
            fetch("http://localhost:3000/create-event", {
                    method: 'POST',
                    body: JSON.stringify(newEvent),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    $('#calendar').fullCalendar('renderEvent', {
                        '_id': response.data._id,
                        'title': response.title,
                        'start': response.start,
                        'end': response.end,
                        'user': response.data.user,
                        'phoneNumber': response.data.phoneNumber
                    });
                })
                .catch(error => console.error('Error:', error))
        }

        const updateEvent = async(event) => {
            await fetch("http://localhost:3000/update-event", {
                    method: 'POST',
                    body: JSON.stringify(event),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    location.reload()
                    return response.json()
                })
                .catch(err => console.error(err))
        }

        // AddEvent save date when click save 
        submitEvent.addEventListener("click", function(e) {
            const title = document.querySelector("#event-title").value;
            const phone = document.querySelector("#event-phone").value;
            const date = document.querySelector("#event-start").value;
            const session = document.querySelector('#event-time').value;
            const user = document.querySelector("#event-user").value;
            const room = document.querySelector("#event-room").value;
            // custom date 
            const dateMore = date.split('-');
            // const startMore = start.split(':');
            // const endMore = end.split(':');
            const newMonth = +dateMore[1] - 1;
            let customSession = +session;
            let start, end;
            if (customSession == 1) {
                start = 7, end = 11
            } else if (customSession == 2) {
                start = 13, end = 17
            } else if (customSession == 3) {
                start = 18, end = 21
            }
            const startDb = new Date(+dateMore[0], newMonth, +dateMore[2], start);
            const endDb = new Date(+dateMore[0], newMonth, +dateMore[2], end);

            const createNewEvent = {
                title: title,
                user: user,
                start: startDb,
                end: endDb,
                phoneNumber: phone,
                room: room,
                isOrder: 1,
            }
            console.log('room');
            console.log(room);
            console.log(createNewEvent)
            fetch("http://localhost:3000/admin/create-event", {
                    method: 'POST',
                    body: JSON.stringify(createNewEvent),
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                    }
                })
                .then(response => response.json())
                .then(response => {
                    if (response.error) {
                        alert(response.error); //
                        window.location.href = "http://localhost:3000/admin/login"
                    } else {
                        alert(response.message)
                        console.log("resoinsehear")
                        console.log(response)
                        c.addEvent({
                            '_id': response._id,
                            'title': response.title,
                            'start': response.start,
                            'end': response.end,
                            'user': response.user,
                            'phoneNumber': response.phoneNumber,
                            'room': response.room,
                        })
                        location.reload();
                    }
                })
                .catch(err => console.error(err))
        })

        //custom Admin 
        const saveAdmin = document.querySelectorAll('.btn-save-admin');
        const deleteAdmin = document.querySelectorAll('.btn-warning');
        const checkAdmin = document.querySelectorAll('.btn-info');
        saveAdmin.forEach(function(current, index) {
            console.log(current);
            const event = {
                id: current.value,
            }
            current.addEventListener('click', function() {
                fetch("http://localhost:3000/update-eventId", {
                        method: 'POST',
                        body: JSON.stringify(event),
                        headers: {
                            'Content-Type': 'application/json',
                            'token': token
                        }
                    })
                    .then(res => {
                        return res.json()
                    })
                    .then(res => {
                        console.log(res)
                        if (res.error) {
                            alert(res.error)
                            window.location.href = "http://localhost:3000/admin/login"
                        } else {
                            alert(res.message);
                            location.reload();
                        }
                    })
                    .catch(err => console.error(err))
            })
        })
        deleteAdmin.forEach(function(current, index) {
            const event = {
                id: current.value
            }
            current.addEventListener('click', function() {
                console.log(current.value);
                fetch("http://localhost:3000/delete-eventId", {
                        method: "DELETE",
                        body: JSON.stringify(event),
                        headers: {
                            'Content-Type': 'application/json',
                            'token': token
                        }
                    })
                    .then(res => {
                        return res.json()
                    })
                    .then(res => {
                        console.log(res)
                        if (res.error) {
                            alert(res.error)
                            window.location.href = "http://localhost:3000/admin/login"
                        } else {
                            alert(res.message);
                            location.reload();
                        }
                    })
                    .catch(err => console.error(err))
            })
        })
        var a = v("#event-modal"),
            t = v("#modal-title"),
            n = v("#form-event"),
            l = null,
            i = null,
            r = document.getElementsByClassName("needs-validation"),
            l = null,
            i = null,
            e = new Date,
            s = e.getDate(),
            d = e.getMonth(),
            e = e.getFullYear();
        new FullCalendarInteraction.Draggable(document.getElementById("external-events"), { itemSelector: ".external-event", eventData: function(e) { return { title: e.innerText, className: v(e).data("class") } } });
        e = [], document.getElementById("external-events"), d = document.getElementById("calendar");

        function o(e) { a.modal("show"), n.removeClass("was-validated"), n[0].reset(), v("#event-title").val(), v("#event-category").val(), t.text("Add Event"), i = e }
        var c = new FullCalendar.Calendar(d, {
            plugins: ["bootstrap", "interaction", "dayGrid", "timeGrid"],
            editable: false,
            selectable: false,
            droppable: false,
            selectable: false,
            defaultView: "timeGridWeek",
            themeSystem: "bootstrap",
            header: { left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth" },
            eventClick: function(e) {
                a.modal("show"), n[0].reset(), l = e.event, v("#event-title").val(l.title), v("#event-category").val(l.classNames[0]), i = null, t.text("Edit Event"), i = null
                console.log(l);
                v("#event-title").val(l.title)
                v("#event-user").val(l.extendedProps.user)
                v("#event-phone").val(l.extendedProps.phoneNumber)
                let getMonth = l._instance.range.start.getMonth() > 10 ? l._instance.range.start.getMonth() : "0" + l._instance.range.start.getMonth();
                let getYear = l._instance.range.start.getFullYear();
                let getDay = l._instance.range.start.getDate() > 10 ? l._instance.range.start.getDate() : "0" + l._instance.range.start.getDate();
                let setDate = getYear + "-" + getMonth + "-" + getDay;
                v("#event-start").val(setDate);
                let start = l.start.getHours();
                let end = l.end.getHours();
                let setSesstion = 1;
                if (+start >= 7 && +end <= 11) setSesstion = 1;
                else if (+start >= 12 && +end <= 17) setSesstion = 2;
                else setSesstion = 3;
                v("#event-time").val(setSesstion);
                v('#event-room').val(l.extendedProps.room)
                const deleteEvent = {
                    title: e.event.title,
                    start: e.event.start,
                    end: e.event.end,
                    user: e.event.extendedProps.user,
                    id: e.event.extendedProps._id,
                    room: e.event.extendedProps.room,
                };
                // console.log(document.cookie.split('=')[1])
                // console.log('check delete')
                // console.log(deleteEvent);
                v("#btn-delete-event").on("click", function(e) {
                    l && (l.remove(), l = null, a.modal("hide"))
                    fetch("http://localhost:3000/delete-event/" + `${deleteEvent.id}`, {
                            method: 'DELETE',
                            // body: JSON.stringify(deleteEvent.id),
                            headers: {
                                'Content-Type': 'application/json',
                                'token': token
                            }
                        })
                        .then(res => {
                            return res.json()
                        })
                        .then(res => {
                            if (res.error) {
                                alert(res.error)
                                window.location.href = "http://localhost:3000/admin/login"
                            } else {
                                alert(res.message);
                                location.reload();
                            }
                        })
                        .catch(err => console.error(err))
                })
            },
            dateClick: function(e) {
                o(e);
            },
            eventResize: function(e) {
                const eventResize = {
                    title: e.event.title,
                    start: e.event.start,
                    end: e.event.end,
                    display: e.event.extendedProps.display,
                    user: e.event.extendedProps.user,
                    _id: e.event.extendedProps._id
                };
                console.log("event resize");
                console.log(eventResize)
                    // updateEvent(eventResize);
            },
            eventDrop: function(info) {
                const eventDrop = {
                    title: info.event.title,
                    start: info.event.start,
                    end: info.event.end,
                    _id: info.event.extendedProps._id,
                    user: e.event.extendedProps.user,
                }
                console.log('event drop')
                console.log(eventDrop)
                    // updateEvent(eventDrop);
            },
            events: async() => {
                let demo = [];
                await fetch("http://localhost:3000/get-event", {
                        method: "GET",
                    })
                    .then(response => response.json())
                    .then(event => {

                        event.forEach(event => demo.push(event));
                    })
                    // console.log(calendars)
                return demo;
            },
            eventDidMount: function(info) {
                const tooltip = new Tooltip(info.el, {
                    title: info.event.extendedProps.user,
                    placement: 'top',
                    trigger: 'hover',
                    container: 'body'
                });
                console.log(tooltip);
            },
            businessHours: {
                // days of week. an array of zero-based day of week integers (0=Sunday)
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6, 7], // Monday - Thursday

                startTime: '07:00', // a start time (10am in this example)
                endTime: '23:00', // an end time (6pm in this example)
            }
        });

        c.render(), v(n).on("submit", function(e) {
            e.preventDefault();
            v("#form-event :input");
            var t = v("#event-title").val(),
                e = v("#event-category").val();
            !1 === r[0].checkValidity() ? (event.preventDefault(), event.stopPropagation(), r[0].classList.add("was-validated")) : (l ? (l.setProp("title", t), l.setProp("classNames", [e])) : (e = { title: t, start: i.date, allDay: i.allDay, className: e },
                c.addEvent(e)), a.modal("hide"))
        }), v("#btn-delete-event").on("click", function(e) {
            l && (l.remove(), l = null, a.modal("hide"))
        }), v("#btn-new-event").on("click", function(e) {
            o({ date: new Date, allDay: !0 })
        })
    }, v.CalendarPage = new e, v.CalendarPage.Constructor = e
}(window.jQuery),

function() {
    "use strict";
    window.jQuery.CalendarPage.init()
}();