<script lang="ts">
    import { goto } from "$app/navigation";

    type Data = {
        key: number;
        que: string;
        ans: string;
    };
    type Data2 = {
        key: number;
        que: string;
        from: string;
        to: string;
    };
    let data: Data[] = [
        {
            key: 0,
            que: "So, where do you live?",
            ans: "",
        },
        {
            key: 1,
            que: "What is your destination??",
            ans: "",
        },
        {
            key: 2,
            que: "Enter your trip commencing date and your conclusion date",
            ans: "",
        },
        {
            key: 3,
            que: "Enter the number of people you want to travel with?",
            ans: "",
        },
        {
            key: 4,
            que: "Write the aim of visiting the destination?",
            ans: "",
        },
    ];
    const dateDate: Data2 = {
        key: 2,
        que: "Enter your trip commencing date and your conclusion date",
        from: "",
        to: "",
    };
    let i = 0;
    if (typeof window !== "undefined") {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                onClick();
            }
        });
    }
    let onClick = async () => {
        i++;
        if (i == data.length) {
            console.log(data, dateDate);
            const dataToSend = {
                date:
                    dateDate.from?.split("-")[2] +
                    " " +
                    numtoMonth(parseInt(dateDate.from?.split("-")[1])) +
                    " " +
                    dateDate.from?.split("-")[0],
                outDate:
                    dateDate.to?.split("-")[2] +
                    " " +
                    numtoMonth(parseInt(dateDate.to?.split("-")[1])) +
                    " " +
                    dateDate.to?.split("-")[0],
                placeFrom: data[0].ans,
                placeTo: data[1].ans,
            };
            console.log(dataToSend);
            localStorage.setItem("answers", JSON.stringify(dataToSend));
            localStorage.setItem("people", data[3].ans);
            localStorage.setItem("reason", data[4].ans);
            goto('/choose')
        }
    };
    function numtoMonth(number: any) {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return months[number - 1];
    }
</script>

<main class="com">
    {#if i >= 0 && i <= 4}
        <div class="mt-48 flex flex-col items-center justify-center gap-8">
            <p class="text-6xl">{data[i].que}</p>
            <!-- <p class="text-2xl">Your response: {data[i].ans}</p> -->
        </div>
        <div class="mb-96 mt-20 w-full">
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
                        <div class="flex scale-150 flex-col gap-2 p-5">
                            <p>FROM</p>
                            <input
                                type="date"
                                name=""
                                id=""
                                bind:value={dateDate.from}
                            />
                        </div>
                        <div class="flex scale-150 flex-col gap-2 p-5">
                            <p>TO</p>
                            <input
                                type="date"
                                name=""
                                id=""
                                bind:value={dateDate.to}
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
</main>
