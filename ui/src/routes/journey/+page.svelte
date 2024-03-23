<script lang="ts">
    import CalendarTimeline from "./components/calendartimeline.svelte";
    import { onMount } from "svelte";
    import Cookies from "js-cookie";
    import { json } from "@sveltejs/kit";

    let eventname = "";
    let currval = "";
    let cards = [
        {
            id: 1,
            title: "Event 1",
            starttime: {
                hours: "22",
                minutes: "00",
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
            y: "",
        },
        {
            id: 3,
            title: "Event 3",
            starttime: {
                hours: "100",
                minutes: "00",
            },
            y: "",
        },
    ];

    let dates: string[] = [];
    let slots: any[] = [];
    let arrivalFlight = {
        startdate: "10 Jan",
        starttime: {
            hours: "18",
            minutes: "00",
        },
        duration: 1,
    };
    let eventstartdate = arrivalFlight.startdate.split(" ")[0];
    let departureFlight = {
        startdate: "21 Jan",
        starttime: {
            hours: "12",
            minutes: "00",
        },
        duration: 1,
    };
    let flight = arrivalFlight;
    $: {
        dates = [];
        for (
            let i = parseInt(arrivalFlight.startdate);
            i <= parseInt(departureFlight.startdate);
            i++
        ) {
            dates.push(`${i} ${flight.startdate.split(" ")[1]}`);
            if ("31 Mar" === `${i} ${flight.startdate.split(" ")[1]}`) {
                i = 1;
                flight = departureFlight;
            }
        }
    }
    // console.log(dates);
    function getcalendarheight() {
        let i = 0;
        dates.map((date) => {
            i++;
        });
        return (
            Number(i * 200) -
            Math.floor(parseInt(arrivalFlight.starttime.hours) / 6) * 50 -
            50 -
            (4 - Math.floor(parseInt(departureFlight.starttime.hours) / 6)) * 50
        );
    }
    let calenderHeight = 0;
    $: {
        calenderHeight = getcalendarheight();
        console.log("height:", calenderHeight);
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
        // const data = {
        //     places: [
        //         {
        //             placeName: "Goa",
        //             startTime: {
        //                 hours: "10",
        //                 minutes: "00",
        //             },
        //         },
        //     ],
        // };
        cards = [];
        console.log(data);
        data.places.forEach((element: any, index: any) => {
            cards.push({
                title: element.placeName,
                starttime: element.startTime,
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
            duration: 1,
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
            duration: 1,
        };

        calenderHeight = getcalendarheight();
        const llmData = await fetch("http://localhost:4000/llm/do-magic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: Cookies.get("user"),
            },
            body: JSON.stringify({
                jsonData: { ...data, reason: localStorage.getItem("reason") },
            }),
        });
        const llm = await llmData.json();
        suggestions = llm.places;
        // suggestions = {
        //     places: [
        //         {
        //             placeName: "Sanjay Gandhi National Park",
        //             startTime: {
        //                 hours: "10",
        //                 minutes: "00",
        //             },
        //             duration: {
        //                 hours: "3",
        //                 minutes: "00",
        //             },
        //         },
        //         {
        //             placeName: "Elephanta Caves",
        //             startTime: {
        //                 hours: "13",
        //                 minutes: "00",
        //             },
        //             duration: {
        //                 hours: "2",
        //                 minutes: "30",
        //             },
        //         },
        //         {
        //             placeName: "Gateway of India",
        //             startTime: {
        //                 hours: "16",
        //                 minutes: "00",
        //             },
        //             duration: {
        //                 hours: "1",
        //                 minutes: "30",
        //             },
        //         },
        //     ],
        // }.places;
        let temp = data.places.map((e: any) => {
            return e.placeName;
        });
        console.log(temp);
        let suggestion2: any[] = [];
        suggestions.forEach((suggestion: any, index: any) => {
            if (!temp.includes(suggestion.placeName)) {
                suggestion2.push(suggestion);
            } else {
                console.log(suggestion.placeName, "already present");
            }
            console.log(suggestion2);
        });
        suggestions = suggestion2;
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
    async function savetoBackend() {
        let toSend: any[] = [];
        cards.forEach((card) => {
            toSend.push({
                placeName: card.title,
                startTime: card.starttime,
            });
        });
        await fetch("http://localhost:4000/trip/add-places", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: Cookies.get("user"),
            },
            body: JSON.stringify({
                places: toSend,
            }),
        });
    }
    function addEvent(suggestion: any) {
        let startTime = {
            hours: "00",
            minutes: "00",
        };
        while (true) {
            let a = true;
            for (let i = 0; i < cards.length; i++) {
                if (
                    parseInt(cards[i].starttime.hours) ==
                    parseInt(startTime.hours)
                ) {
                    startTime = {
                        hours: String(parseInt(startTime.hours) + 6),
                        minutes: "00",
                    };
                    a = false;
                    break;
                }
            }
            if (a) break;
        }
        cards = cards.concat({
            title: suggestion.placeName,
            starttime: startTime,
            y: "",
            id: cards.length + 1,
        });
        console.log(cards);
        suggestions = suggestions.filter(
            (s: any) => s.placeName !== suggestion.placeName,
        );
    }
</script>

<div class="journey-page px-199 flex flex-row">
    <div class="grid grid-cols2 gap-4 dates mx-100">
        {#each dates as date}
            <div
                class="card card-body items-center text-center date-div bg-base-200 rounded"
                style="height: 196px;border:1px solid white;top:10px;"
            >
                <h2 class="card-title font-bold text-base-content">{date}</h2>
            </div>
        {/each}
    </div>

    <CalendarTimeline
        {cards}
        height={calenderHeight}
        arrivalFlight={{ ...arrivalFlight, title: "Arrival" }}
        {departureFlight}
    />
    <!-- <div class="flex items-center">
        <div class="h-full border-r border-gray-300 mx-4"></div>
    </div> -->
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
            <input
                type="text"
                placeholder="Add a new place to visit"
                class="input input-bordered w-full max-w-xs"
                bind:value={currval}
            />
            <button
                class="btn btn-success"
                on:click|preventDefault={() => {
                    addEvent({
                        placeName: currval,
                        startTime: {
                            hours: "00",
                            minutes: "00",
                        },
                    });
                    currval = "";
                }}>Add</button
            >
            <button
                class="btn btn-secondary"
                on:click|preventDefault={savetoBackend}>Save</button
            >
        </div>
    </div>
</div>

<style>
    .journey-page {
        padding: 10px;
    }
    .dates {
        margin: 4px;
        margin-top: 2px;
        margin-bottom: 2px;
    }
    .btn {
        margin-top: 10px;
    }
    .accept-suggestion {
        background-color: #337dff;
        margin-bottom: 5px;
    }
    .suggestions {
        margin-top: 10px;
    }
</style>
