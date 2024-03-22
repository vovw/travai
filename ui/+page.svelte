<script lang="ts">
    import CalendarTimeline from "./components/calendartimeline.svelte";
    let eventname = '';
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
            hours: "10",
            minutes: "30",
        },
    };
    $: for (
        let i = parseInt(arrivalFlight.startdate);
        i <= parseInt(departureFlight.startdate);
        i++
    ) {
        dates.push(`${i} ${arrivalFlight.startdate.split(" ")[1]}`);
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
    console.log(getcalendarheight());
    function addEvent(){
        
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
        height={getcalendarheight()}
        {arrivalFlight}
        {departureFlight}
    />
    <div class='inputs'>
        <input type="text" placeholder="Event name" class="input input-bordered input-primary w-full max-w-xs" bind:value={eventname} />
        From: <input type="number" placeholder="Start date" class="input input-bordered input-primary w-full max-w-xs" bind:value={eventstartdate} />
        <input type="text" placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" bind:value={eventname} />
        <button class="btn btn-outline btn-success" on:click={addEvent}>Add</button>
    </div>
</div>

<style>
    .journey-page {
        padding: 10px;
    }
    .dates {
        margin: 4px;
    }
    .inputs{
        margin-left: 100px;
        margin-top: 30px;
    }
    .btn{
        margin-top: 10px;
    }
</style>
