<script lang="ts">
    import { onMount } from 'svelte';

    onMount(async () => {
        const dataString = localStorage.getItem('answers');
        if (!dataString) return;

        const data = JSON.parse(dataString);

        const requestBody = {
            date: data.date,
            outDate: data.outDate,
            placeFrom: data.placeFrom,
            placeTo: data.placeTo,
        };

        const req = await fetch('http://localhost:4000/scrape/get-results', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const res = await req.json();
        console.log(res);
    });
</script>

<main>
    <div class="p-10 flex flex-col items-center gap-8">
        <p class="text-3xl">Home to Destination Flights</p>
        <div class="flex flex-row justify-center gap-8">
            {#each { length: 3 } as _, i}
                <div class="card bg-base-100 w-96 shadow-xl flex flex-row justify-center p-6 gap-4">
                   <div class="flex flex-col gap-2 me-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3.5em" height="3.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0" /></svg>
                    <p class="text-2xl">Flight name</p>
                    <p>Flight Date</p>
                    <button class="btn btn-outline btn-primary">Visit</button>
                   </div>
                   <div class="flex flex-col gap-2">
                    <p>site name</p>
                    <p>Flight Duration</p>
                    <p>Stop Info</p>
                    <p class="text-3xl">Flight Price</p>
                    <button class="btn btn-outline btn-accent">choose</button>
                   </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="p-10 flex flex-col items-center gap-8">
        <p class="text-3xl">Destination to Home Flights</p>
        <div class="flex flex-row justify-center gap-8">
            {#each { length: 3 } as _, i}
            <div class="card bg-base-100 w-96 shadow-xl flex flex-row justify-center p-6 gap-4">
                <div class="flex flex-col gap-2 me-8">
                 <svg xmlns="http://www.w3.org/2000/svg" width="3.5em" height="3.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0" /></svg>
                 <p class="text-2xl">Flight name</p>
                 <p>Flight Date</p>
                 <button class="btn btn-outline btn-primary">Visit</button>
                </div>
                <div class="flex flex-col gap-2">
                 <p>site name</p>
                 <p>Flight Duration</p>
                 <p>Stop Info</p>
                 <p class="text-3xl">Flight Price</p>
                 <button class="btn btn-outline btn-accent">choose</button>
                </div>
             </div>
            {/each}
        </div>
    </div>
    <div class="p-10 flex flex-col items-center gap-8">
        <p class="text-3xl">List of Hotels</p>
        <div class="flex flex-row justify-center gap-8">
            {#each { length: 3 } as _, i}
                <div class="card bg-base-100 w-96 shadow-xl flex flex-col justify-center items-center p-6 gap-2">
                    <div class="flex flex-row gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 16 16"><path fill="currentColor" d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" /></svg>
                        <div class="flex flex-col gap-2">
                            <p class="text-2xl">Hotel Name</p>
                            <p>Ratings</p>
                        </div>
                    </div>
                    <div class="flex flex-row gap-10 items-center">
                        <p>Location</p>
                        <p class="text-2xl">Price</p>
                    </div>
                    <div class="flex flex-row gap-8">
                        <button class="btn btn-outline btn-primary">Link</button>
                        <button class="btn btn-outline btn-accent">Choose</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>
