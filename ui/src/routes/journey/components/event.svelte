<script lang="ts">
    export let color = "base";
    export let event = {
        title: "Panjim Food Festival",
    };
    import flight from "./flight.svg";
    export let showflighticon = false;
    export let height: string | number | undefined = "100";
    // $: console.log("height:", height, event);
</script>

<div
    class="card-body items-center text-center"
    style='height: {height}px; background-color: {color === "base" ? "#282a36" : "#282017"}; '
>
    {#if showflighticon}
        <img src={flight} alt="event" class="w-100" style="height: 50px;" />
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
