<script lang="ts">
    import Event from "./event.svelte";
    import flight from "./flight.svg";

    type Card = {
        id: number;
        title: string;
        starttime: {
            hours: string;
            minutes: string;
        };
        duration: {
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
            duration: {
                hours: "10",
                minutes: "30",
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
            duration: {
                hours: "10",
                minutes: "30",
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
            duration: {
                hours: "10",
                minutes: "30",
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
        duration: {
            hours: "10",
            minutes: "30",
        },
    }
    export let departureFlight = {
        startdate: "1 Jan",
        starttime: {
            hours: "2",
            minutes: "00",
        },
        duration: {
            hours: "10",
            minutes: "30",
        },
    }

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
            const yPos =
                event.clientY - event.target.getBoundingClientRect().top;
            // console.log(yPos);
            cards[droppedCardIndex].y = yPos;

            // Calculate hours and minutes based on yPos
            const totalMinutes = (yPos / 100) * 24 * 60; // Convert percentage to total minutes in a day
            const hours = Math.floor(totalMinutes / 60); // Extract hours
            const minutes = Math.floor(totalMinutes % 60); // Extract minutes

            // Update starttime properties as strings
            cards[droppedCardIndex].starttime.hours = String(hours);
            cards[droppedCardIndex].starttime.minutes = String(minutes);
        }
    }
    function timetopx(time: any) {
        let hours = parseInt(time.hours);
        let minutes = parseInt(time.minutes);
        let totalMinutes = hours * 60 + minutes;
        return (totalMinutes / (24 * 60)) * 100;
    }

    $: for (let i = 0; i < cards.length; i++) {
        const hours = parseInt(cards[i].starttime.hours, 10) || 0; // Parse hours as an integer
        const minutes = parseInt(cards[i].starttime.minutes, 10) || 0; // Parse minutes as an integer
        const totalMinutes = hours * 60 + minutes; // Calculate total minutes
        const percentageOfDay = (totalMinutes / (24 * 60)) * 100; // Calculate percentage of the day
        cards[i].y = String(percentageOfDay); // Convert percentage to string and assign to y property
    }

    // console.log(cards);

    // $: console.log(cards)
</script>

<div>
    <div style={`height: ${timetopx(arrivalFlight.starttime)}px; width: 100%;`} class='empty-place'></div>
    <Event event={{ title: "Arrival" }} showflighticon={true} color={"top"} height={timetopx(arrivalFlight.duration)}/>
    <div
        class="canvas h-96"
        on:dragover={handleDragOver}
        on:drop={handleDrop}
        role="region"
        aria-label="Draggable Cards Container"
        style={`height: ${height}px;margin-top: 10px;`}
    >
        {#each cards as card}
            <div
                class="card"
                draggable="true"
                on:dragstart={(e) => handleDragStart(e, card.id)}
                role="button"
                aria-grabbed="false"
                tabindex="0"
                style='top: {card.y}px; height: {timetopx(card.duration)}px;'
            >
                <Event event={{ title: card.title }} showflighticon={false} height={timetopx(card.duration)}/>
            </div>
        {/each}
    </div>
    <Event event={{ title: "Arrival" }} showflighticon={true} color={"top"} height={timetopx(departureFlight.duration)}/>
</div>

<style>
    .canvas {
        width: 300px;
        background-color: #8d8282;
        border: 2px solid #ccc;
        margin-bottom: 20px;
        position: relative;
        /* padding: 2px; */

    }

    .card {
        background-color: #fff;
        /* outline: 1px solid #ccc; */
        padding: 0px;
        margin-bottom: 10px;
        cursor: move;
        position: absolute;
        width: 100%;
        text-align: center;
    }

    .card {
        --color-top: #e9a017;
        --color-base: #d5d7e0;
        --color-top-fg: #282a36;
        --color-base-fg: #282a36;
    }
</style>
