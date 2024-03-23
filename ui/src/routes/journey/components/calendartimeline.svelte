<script lang="ts">
    import { writable } from "svelte/store";
    import Event from "./event.svelte";
    import flight from "./flight.svg";
    import { onMount } from "svelte";

    let bgText = writable('');
    type Card = {
        id: number;
        title: string;
        starttime: {
            hours: string;
            minutes: string;
        };
        y: any | undefined;
    };

    export let cards: Card[] = [
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
            title: "Event 1",
            starttime: {
                hours: "22",
                minutes: "00",
            },
            y: "",
        },
        {
            id: 3,
            title: "Event 1",
            starttime: {
                hours: "22",
                minutes: "00",
            },
            y: "",
        },
    ];

    export let height = 800;
    export let arrivalFlight = {
        startdate: "1 Jan",
        starttime: {
            hours: "2",
            minutes: "00",
        },
        duration: 1,
        title: "Arrival",
    };
    export let departureFlight = {
        startdate: "1 Jan",
        starttime: {
            hours: "2",
            minutes: "00",
        },
        duration: 1,
    };

    function handleDragStart(event: any, cardId: any) {
        event.dataTransfer.setData("cardId", cardId.toString());
    }

    function handleDragOver(event: any) {
        event.preventDefault();
    }

    function handleDrop(event: any) {
        event.preventDefault();
        const cardId = parseInt(event.dataTransfer.getData("cardId"));
        const droppedCardIndex = cards.findIndex((card) => card.id === cardId);
        if (droppedCardIndex > -1) {
            const yPos = event.clientY - event.target.getBoundingClientRect().top;
            cards[droppedCardIndex].y = Math.floor(yPos / 50) * 50;
            const totalMinutes = (yPos / 200) * 24 * 60;
            const hours = Math.floor(Math.floor(totalMinutes / 60) / 6) * 6;
            const minutes = 0;

            cards[droppedCardIndex].starttime.hours = String(Math.floor(hours / 6) * 6);
            cards[droppedCardIndex].starttime.minutes = String("00");
            console.log(cards[droppedCardIndex]);
            cards = cards; // Are you sure you need this line?
        }
    }

    function timetopx(time: any) {
        let hours = parseInt(time.hours);
        let totalMinutes = Math.floor(hours / 6) * 6 * 60;
        return (totalMinutes / (24 * 60)) * 200;
    }
    let dateEvents:any[] = []
    let startDateEventsIndex = 4-Math.floor(parseInt(arrivalFlight.starttime.hours)/6)-1
    $: for(
        let i = parseInt(arrivalFlight.starttime.hours)<18?parseInt(arrivalFlight.startdate.split(" ")[0]):parseInt(arrivalFlight.startdate.split(" ")[0])+1;
        i <= parseInt(departureFlight.startdate.split(" ")[0]);
        i++
    )
    {
        dateEvents.push({
            title: `${i} ${arrivalFlight.startdate.split(" ")[1]}`,
            id: -1,
            duration: 1,
            starttime: {
                hours: String(startDateEventsIndex*6+24*(i-parseInt(arrivalFlight.startdate.split(" ")[0]))),
                minutes: "00",
            },
            y: String(Math.floor(startDateEventsIndex+4*(i-parseInt(arrivalFlight.startdate.split(" ")[0])))*50),
        })
        // console.log(dateEvents)
    }

    $: for (let i = 0; i < cards.length; i++) {
        const hours = parseInt(cards[i].starttime.hours, 10) || 0; // Parse hours as an integer
        const minutes = 0; // Parse minutes as an integer
        const totalMinutes = Math.floor(hours / 6) * 6 * 60 + minutes; // Calculate total minutes
        const percentageOfDay = (totalMinutes / (24 * 60)) * 200; // Calculate percentage of the day
        cards[i].y = String(percentageOfDay); // Convert percentage to string and assign to y property
    }

    $: cardtimes = cards.map((card) => {
        return timetopx("100");
    });

    $: emptyheight = Math.floor(parseInt(arrivalFlight.starttime.hours) / 6) * 50;
</script>

<div style="margin-left: 20px;">
    <div
        style={`height: ${emptyheight}px; width: 100%;`}
        class="empty-place"
    ></div>
    <Event
        event={{ title: "Arrival" }}
        showflighticon={true}
        color={"top"}
        card={{
            duration: arrivalFlight.duration,
            id: 0,
            y: "",
            starttime: arrivalFlight.starttime,
            title: arrivalFlight.title,
        }}
    />
    <div
        class="canvas h-96 bg-neutral"
        on:dragover={handleDragOver}
        on:drop={handleDrop}
        role="region"
        aria-label="Draggable Cards Container"
        style={`height: ${height}px;margin-top: 10px;`}
    >
        <style>
            .canvas::before,
            .canvas::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none; 
            }

            .canvas::before {
                background-image: repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent 49px,
                    #ccc 49px,
                    #ccc 50px,
                    #337DFF 50px
                );
            }

            .canvas::after {
                /* Example text styles */
                font-size: 12px;
                color: #337DFF;
                padding: 5px;
                line-height: 1.5;
            }
        </style>
        {#each cards as card}
            <div
                class="card"
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, card.id)}
                role="button"
                aria-grabbed="false"
                tabindex="0"
                style="top: {card.y}px; height: {cardtimes[
                    cards.indexOf(card)
                ]}px;"
            >
                <Event
                    event={{ title: card.title }}
                    showflighticon={false}
                    card={{ ...card, duration: 1 }}
                />
            </div>
        {/each}
    </div>
    <Event
        event={{ title: "Departure" }}
        showflighticon={true}
        color={"top"}
        card={{
            duration: departureFlight.duration,
            id: 0,
            y: "",
            starttime: departureFlight.starttime,
            title: "Departure",
        }}
    />
</div>


<style>
    .canvas {
        width: 300px;
        /* background-color: #337DFF; */
        border: 2px solid #ccc;
        margin-bottom: 20px;
        position: relative;
        /* padding: 2px; */
    }

    .card {
        /* background-color: #337DFF; */
        /* outline: 1px solid #ccc; */
        padding: 0px;
        margin-bottom: 10px;
        cursor: move;
        position: absolute;
        width: 100%;
        text-align: center;
        border-radius: 0%;
    }

    .card {
        --color-top: #e9a017;
        --color-base: #d5d7e0;
        --color-top-fg: #282a36;
        --color-base-fg: #282a36;
    }
</style>
