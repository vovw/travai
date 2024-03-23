<script>
    import { goto } from "$app/navigation";
</script>

<main>
    <div class="com hero min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-8xl font-bold">TripAI</h1>
                <p class="py-10 text-4xl">
                    Spend less time planning and more on enjoying trips.
                </p>
                <button on:click={()=>goto('/explore')}>
                    <button class="btn btn-primary">Plan your next trip!</button
                    >
                </button>
            </div>
        </div>
    </div>
</main>
