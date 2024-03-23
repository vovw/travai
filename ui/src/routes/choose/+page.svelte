<script lang="ts">
    import { onMount } from "svelte"
    import axios from "axios"
    import Cookies from "js-cookie"
    import { goto } from "$app/navigation";
    let res:any
    let loading:boolean
    let selectedData:any=[{},{},{}]
    let headers = {
            "Content-Type": "application/json",
            Authorization:Cookies.get('user') ,
        };
        let selectedDataLoading:boolean=false
    onMount(async () => {
        const dataString = localStorage.getItem("answers");
        if (!dataString) return;

        const data = JSON.parse(dataString);
        const requestBody = {
            date: data.date,
            outDate: data.outDate,
            placeFrom: data.placeFrom,
            placeTo: data.placeTo,
        };
        console.log(requestBody)
        try {
            loading=true
            let response = await axios.post("http://localhost:4000/scrape/get-results/",JSON.stringify(requestBody),{headers});
             res = await response.data;
            console.log(res);
        } catch (e) {
            console.log(e);
        }
        finally{
            loading=false;
        }
    });
    let sendSelectedOne=async()=>{
        try{
            selectedDataLoading=true
            await axios.post('http://localhost:4000/trip/make-trip/',selectedData,{headers})
            console.log(selectedData)
        }
        catch(e){
            console.log(e);
        }
        finally{
            selectedDataLoading=false
            goto('/journey')
        }
        
    }
</script>

<main>
    {#if loading==false}
    <div class="p-10 flex flex-col items-center gap-8">
        <p class="text-3xl">List of Hotels</p>
        <div class="flex flex-row justify-center gap-8">
            {#each res?.hotels as data}
                <div class="card bg-base-100 w-96 shadow-xl flex flex-col justify-center items-center p-6 gap-2">
                    <div class="flex flex-row gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 16 16"><path fill="currentColor" d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/></svg>
                        <div class="flex flex-col gap-2">
                            <p class="text-2xl">{data.hotelName}</p>
                            <p>{data.rating}</p>
                        </div>
                    </div>
                    <div class="flex flex-row gap-10 items-center">
                        <p>{data.location}</p>
                        <p class="text-2xl">{data.hotelPrice}</p>
                    </div>
                    <div class="flex flex-row gap-8">
                        <a href={`https://${data.link}`} target="_blank"><button class="btn btn-outline btn-primary">Link</button></a>
                        <button class="btn btn-outline btn-accent" on:click={()=>selectedData[0]=data}>Choose</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="p-10 flex flex-col items-center gap-8">
        <p class="text-3xl">Home to Destination Flights</p>
        <div class="flex flex-row justify-center gap-8">
            {#each res?.depFlights as data}
                <div class="card bg-base-100 w-96 shadow-xl flex flex-row justify-center p-6 gap-4">
                    <div class="flex flex-col gap-2 me-8">
                        <svg xmlns="http://www.w3.org/2000/svg"width="3.5em" height="3.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0"/></svg>
                        <p class="text-2xl">{data.flightName}</p>
                        <p>{data.flightDate}</p>
                        <a href={data.flightLink}><button class="btn btn-outline btn-primary">Visit</button></a>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p>{data.site}</p>
                        <p>{data.flightDuration}</p>
                        <p>{data.stopInfo}</p>
                        <p class="text-3xl">{data.flightPrice}</p>
                      <button class="btn btn-outline btn-accent" on:click={()=>selectedData[1]=data}>choose</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="p-10 flex flex-col items-center gap-8">
        <p class="text-3xl">Destination to Home Flights</p>
        <div class="flex flex-row justify-center gap-8">
            {#each res?.retFlights as data}
                <div class="card bg-base-100 w-96 shadow-xl flex flex-row justify-center p-6 gap-4">
                    <div class="flex flex-col gap-2 me-8">
                        <svg xmlns="http://www.w3.org/2000/svg"width="3.5em" height="3.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.56 3.91c.59.59.59 1.54 0 2.12l-3.89 3.89l2.12 9.19l-1.41 1.42l-3.88-7.43L9.6 17l.36 2.47l-1.07 1.06l-1.76-3.18l-3.19-1.77L5 14.5l2.5.37L11.37 11L3.94 7.09l1.42-1.41l9.19 2.12l3.89-3.89c.56-.58 1.56-.58 2.12 0"/></svg>
                        <p class="text-2xl">{data.flightName}</p>
                        <p>{data.flightDate}</p>
                        <a href={data.flightLink}><button class="btn btn-outline btn-primary">Visit</button></a>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p>{data.site}</p>
                        <p>{data.flightDuration}</p>
                        <p>{data.stopInfo}</p>
                        <p class="text-3xl">{data.flightPrice}</p>
                      <button class="btn btn-outline btn-accent" on:click={()=>selectedData[2]=data}>choose</button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex flex-row justify-center">
        {#if selectedDataLoading==false}
        <button class="btn btn-wide btn-outline btn-secondary" on:click={sendSelectedOne}>Confirm</button>
        {/if}
        {#if selectedData==true}
        <button class="btn">
            <span class="loading loading-spinner"></span>
            loading
          </button>
        {/if}
    </div>
    {/if}
    {#if loading==true}
    <p>loading........</p>
    {/if}
</main>
