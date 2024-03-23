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
        duration: 1,
        y: "",
    };

    function timetopx(time: any) {
        return time * 50;
    }
    $: heightofdiv = timetopx(card.duration);
</script>

<div
    class="card-body items-center rounded text-center {color==='top'?'bg-accent':''}"
    style="height: {heightofdiv}px; background-color: {color === 'base'
        ? '#282a36'
        : color === 'hide'
          ? '#337DFF'
          : ''}; "
>
    {#if showflighticon}
        <div class="font-bold text-black flex flex-row">{card.title}<img src={flight} alt="event" class="w-100" style="height: 34px;" /></div>
    {:else}
        <h2 class="overflow-wrap break-word word-wrap card-title text-accent {color!=='hide'?"font-bold":"font-thin text-black"}" style="{event.title.length>=20?'font-size: 1em;':''}">{event.title}</h2>
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
