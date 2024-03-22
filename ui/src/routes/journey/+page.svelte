<script lang="ts">
    import CalendarTimeline from "./components/calendartimeline.svelte";
    import { onMount } from "svelte";
    import Cookies from "js-cookie";

    let eventname = "";
    let cards = [
        {
            id: 1,
            title: "Event 1",
            starttime: {
                hours: "22",
                minutes: "00",
            },
            duration: {
                hours: "70",
                minutes: "30",
            },
            y: "",
        },
        {
            id: 2,
            title: "Event 2",
            starttime: {
                hours: "2",
                minutes: "00",
            },
            duration: {
                hours: "10",
                minutes: "30",
            },
            y: "",
        },
        {
            id: 3,
            title: "Event 3",
            starttime: {
                hours: "100",
                minutes: "00",
            },
            duration: {
                hours: "14",
                minutes: "00",
            },
            y: "",
        },
    ];
    let dates: any[] = [];
    let arrivalFlight = {
        startdate: "10 Jan",
        starttime: {
            hours: "20",
            minutes: "00",
        },
        duration: {
            hours: "10",
            minutes: "00",
        },
    };
    let eventstartdate = arrivalFlight.startdate.split(" ")[0];
    let departureFlight = {
        startdate: "21 Jan",
        starttime: {
            hours: "20",
            minutes: "00",
        },
        duration: {
            hours: "20",
            minutes: "30",
        },
    };
    $: {
        dates = [];
        for (
            let i = parseInt(arrivalFlight.startdate);
            i <= parseInt(departureFlight.startdate);
            i++
        ) {
            dates.push(`${i} ${arrivalFlight.startdate.split(" ")[1]}`);
        }
    }
    // console.log(dates);
    function getcalendarheight() {
        let start =
            parseInt(arrivalFlight.starttime.hours) * 60 +
            parseInt(arrivalFlight.starttime.minutes) +
            parseInt(arrivalFlight.duration.hours) * 60 +
            parseInt(arrivalFlight.duration.minutes) +
            parseInt(arrivalFlight.startdate.split(" ")[0]) * 24 * 60;

        let end =
            parseInt(departureFlight.starttime.hours) * 60 +
            parseInt(departureFlight.starttime.minutes) +
            parseInt(departureFlight.startdate.split(" ")[0]) * 24 * 60;
        console.log(end, start);
        return ((end - start) * 100) / 24 / 60;
    }
    let calenderHeight = 0;
    $: {
        calenderHeight = getcalendarheight();
        console.log(calenderHeight);
    }
    let suggestions: any[] = [];
    onMount(async () => {
        const result = await fetch("http://localhost:4000/trip/get-results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: Cookies.get("user"),
            },
        });
        const data = await result.json();
        cards = [];
        console.log(data);
        data.places.forEach((element: any, index: any) => {
            cards.push({
                title: element.placeName,
                starttime: element.startTime,
                duration: element.duration,
                y: "",
                id: index + 1,
            });
        });
        arrivalFlight = {
            startdate:
                data.depFlight.flightDate.split("/")[0] +
                " " +
                numtoMonth(parseInt(data.depFlight.flightDate.split("/")[1])),
            starttime: {
                hours: data.depFlight.flightTime.split(":")[0],
                minutes: data.depFlight.flightTime.split(":")[1],
            },
            duration: data.depFlight.flightDuration.includes("h")
                ? {
                      hours: data.depFlight.flightDuration.split(" ")[0],
                      minutes: data.depFlight.flightDuration.split(" ")[2],
                  }
                : {
                      hours: "00",
                      minutes: data.depFlight.flightDuration.split(" ")[0],
                  },
        };
        departureFlight = {
            startdate:
                data.retFlight.flightDate.split("/")[0] +
                " " +
                numtoMonth(parseInt(data.retFlight.flightDate.split("/")[1])),
            starttime: {
                hours: data.retFlight.flightTime.split(":")[0],
                minutes: data.retFlight.flightTime.split(":")[1],
            },
            duration: data.retFlight.flightDuration.includes("h")
                ? {
                      hours: data.retFlight.flightDuration.split(" ")[0],
                      minutes: data.retFlight.flightDuration.split(" ")[2],
                  }
                : {
                      hours: "00",
                      minutes: data.retFlight.flightDuration.split(" ")[0],
                  },
        };

        calenderHeight = getcalendarheight();
        // const llmData = await fetch(
        //     "http://localhost:4000/llm/get-suggestions",
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: Cookies.get("user"),
        //         },
        //         body: JSON.stringify(data),
        //     },
        // );
        // const llm = await llmData.json();
        suggestions = {
            places: [
                {
                    placeName: "Sanjay Gandhi National Park",
                    startTime: {
                        hours: "10",
                        minutes: "00",
                    },
                    duration: {
                        hours: "3",
                        minutes: "00",
                    },
                },
                {
                    placeName: "Elephanta Caves",
                    startTime: {
                        hours: "13",
                        minutes: "00",
                    },
                    duration: {
                        hours: "2",
                        minutes: "30",
                    },
                },
                {
                    placeName: "Gateway of India",
                    startTime: {
                        hours: "16",
                        minutes: "00",
                    },
                    duration: {
                        hours: "1",
                        minutes: "30",
                    },
                },
            ],
        }.places;
    });
    function numtoMonth(num: any) {
        switch (num) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sep";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
        }
    }
    function addEvent(suggestion: any) {
        cards = cards.concat({
            title: suggestion.placeName,
            starttime: suggestion.startTime,
            duration: suggestion.duration,
            y: "",
            id: cards.length + 1,
        });
        suggestions = suggestions.filter(
            (s: any) => s.placeName !== suggestion.placeName,
        );
    }
</script>

<div class="journey-page px-199 flex flex-row">
    <div class="h-24 w-48 dates">
        {#each dates as date}
            <div class="card card-body items-center text-center date-div">
                <h2 class="card-title font-bold">{date}</h2>
            </div>
        {/each}
        <!-- <h2 class="card-title font-bold">date here</h2> -->
    </div>
    <CalendarTimeline
        {cards}
        height={calenderHeight}
        {arrivalFlight}
        {departureFlight}
    />
    <div class="mx-10 suggestions">
        {#each suggestions as suggestion}
            <button
                class="card card-body items-center text-center date-div accept-suggestion"
                on:click|preventDefault={() => addEvent(suggestion)}
            >
                <h2 class="card-title font-bold">{suggestion.placeName}</h2>
            </button>
        {/each}

        <div>
            <button class="btn btn-primary">Save</button>
        </div>
    </div>
</div>

<style>
    .journey-page {
        padding: 10px;
    }
    .dates {
        margin: 4px;
    }
    .inputs {
        margin-left: 100px;
        margin-top: 30px;
    }
    .btn {
        margin-top: 10px;
    }
    .accept-suggestion {
        background-color: #8d8282;
        margin-bottom: 5px;
    }
    .suggestions {
        margin-top: 10px;
    }
</style>
