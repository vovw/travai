<script>
    import axios from "axios"
    import { goto } from "$app/navigation"
    import Cookies from "js-cookie"
    let registerData={
        email:"",
        password:"",
        username:""
    }
    let error=false
    let handleRegister=async()=>{
        try{
            let response = await axios.post("http://localhost:4000/user/register/", registerData)
            console.log(response.data.name)
            if (!response?.data.error) {
                error = false
                goto('/')
                Cookies.set('user',response?.data.token)
                Cookies.set('name',response.data.name)
            }
            else error=true;
        }
        catch(e){
            console.log(e);
        }
    }
</script>

<div class="hero min-h-screen bg-base-600">
    <div class="hero-content flex-col">
        <h1 class="text-5xl font-bold">Register</h1>
        <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form class="card-body" on:submit|preventDefault={handleRegister}>
                {#if error}
                    <p>User already exist please login</p>
                {/if}
                <div class="form-control">
                    <label class="label" for="email">
                        <span class="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="email"
                        class="input input-bordered"
                        name="email"
                        required
                        bind:value={registerData.email}
                    />
                </div>
                <div class="form-control">
                    <label class="label" for="password">
                        <span class="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        class="input input-bordered"
                        name="password"
                        required
                        bind:value={registerData.password}
                    />
                </div>
                <div class="form-control">
                    <label class="label" for="email">
                        <span class="label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="username"
                        class="input input-bordered"
                        name="username"
                        required
                        bind:value={registerData.username}
                    />
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" type="submit">Register</button>
                </div>
            </form>
        </div>
    </div>
</div>
