<script>
    let data = [
        {
            key: 0,
            que: "So where do you live?",
            ans: "",
        },
        {
            key: 1,
            que: "What is your destination??",
            ans: "",
        },
        {
            key: 2,
            que: "Enter the date of flight you want and the date of return flight",
            from: "",
            to: "",
        },
        {
            key: 3,
            que: "Enter the number of people you want to travel?",
            ans: "",
        },
        {
            key: 4,
            que: "Write the reason for visiting this destination?",
            ans: "",
        },
    ];
    let i = 0;
    let onClick = () => {
        i++;
        if (i == data.length) console.log(data);
    };
</script>

{#if i >= 0 && i <= 4}
    <div class="mt-48 flex flex-col items-center justify-center gap-8">
        <p class="text-6xl">{data[i].que}</p>
        <p class="text-2xl">Your response: {data[i].ans}</p>
    </div>
    <div class="absolute bottom-0 mb-96 w-full">
        {#if i == 0 || i == 1 || i == 4}
            <div class="flex flex-row items-center justify-center gap-2">
                <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-5/12"
                    bind:value={data[i].ans}
                />
                <button on:click={onClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                        ><path
                            fill="currentColor"
                            d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"
                        /></svg
                    >
                </button>
            </div>
        {/if}
        {#if i == 2}
            <div class="flex flex-row justify-center gap-8">
                <div class="flex flex-row gap-8">
                    <div class="flex flex-col gap-2">
                        <p>FROM</p>
                        <input
                            type="date"
                            name=""
                            id=""
                            bind:value={data[2].from}
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <p>TO</p>
                        <input
                            type="date"
                            name=""
                            id=""
                            bind:value={data[2].to}
                        />
                    </div>
                </div>
                <button on:click={onClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                        ><path
                            fill="currentColor"
                            d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"
                        /></svg
                    >
                </button>
            </div>
        {/if}
        {#if i == 3}
            <div class="flex flex-row items-center justify-center gap-2">
                <input
                    type="number"
                    placeholder="Type here"
                    class="input input-bordered w-5/12"
                    bind:value={data[3].ans}
                />
                <button on:click={onClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 24 24"
                        ><path
                            fill="currentColor"
                            d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"
                        /></svg
                    >
                </button>
            </div>
        {/if}
    </div>
{/if}
