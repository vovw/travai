<script>
    import axios from "axios";
    import { goto } from "$app/navigation";
    import Cookies from "js-cookie";
    let loginData = {
        email: "",
        password: "",
    };
    let error = false;
    let handleLogin = async () => {
        try {
            let response = await axios.post(
                "http://localhost:4000/user/login/",
                loginData,
            );
            if (!response?.data.error) {
                error = false;
                goto("/");
                Cookies.set("user", response?.data.token);
                Cookies.set("name", response?.data.name);
            } else error = true;
        } catch (e) {
            console.log(e);
        }
    };
</script>

<div class="hero bg-base-600 min-h-screen">
    <div class="hero-content flex-col">
        <h1 class="text-5xl font-bold">Login</h1>
        <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form class="card-body" on:submit|preventDefault={handleLogin}>
                {#if error}
                    <p>Please login with proper credentials</p>
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
                        bind:value={loginData.email}
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
                        bind:value={loginData.password}
                    />
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>
</div>
