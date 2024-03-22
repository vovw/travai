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
    <div class="p-10">
        <div class="flex gap-8">
            {#each { length: 3 } as _, i}
                <div class="card bg-base-100 w-96 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</main>
