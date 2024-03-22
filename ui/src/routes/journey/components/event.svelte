<script lang="ts">
    export let color = "base";
    export let event = {
        title: "Panjim Food Festival",
    };
    import flight from "./flight.svg";
    export let showflighticon = false;
    // $: console.log("height:", height, event);
    export let card = {
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
    };

    function timetopx(time: any) {
        let hours = parseInt(time.hours);
        let minutes = parseInt(time.minutes);
        let totalMinutes = hours * 60 + minutes;
        return (totalMinutes / (24 * 60)) * 100;
    }
    $: heightofdiv = timetopx(card.duration);
</script>

<div
    class="card-body items-center text-center"
    style="height: {heightofdiv}px; background-color: {color === 'base'
        ? '#282a36'
        : '#282017'}; "
>
    {#if showflighticon}
        <img src={flight} alt="event" class="w-100" style="height: 34px;" />
    {:else}
        <h2 class="card-title font-bold">{event.title}</h2>
    {/if}
</div>

<style>
    .card-body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        border-radius: 10px;
    }

    .card-title {
        margin: 0;
        height: 100%;
    }
</style>
