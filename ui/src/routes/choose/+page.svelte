<script>
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
