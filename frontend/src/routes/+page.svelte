<script lang="ts">
  import { onMount } from 'svelte';

  import { trpc } from '$lib/trpc/client';
  import type { Users } from '$lib/trpc/client';
	
    let usersP: Promise<Users>;
    let error: string = "";
    let btnCount = 0;

    const refreshData = ():void =>{
      usersP = trpc.getUsers.query();
    }

    onMount(async () => {
        refreshData();
    });
</script>

<center>
  <h1>Welcome to SvelteKITT</h1>
</center>

<button on:click={() => {btnCount++; refreshData();}}>Reload {btnCount ? btnCount : ''}</button>

{#await usersP}
	<p>Loading data...</p>
{:then users}
  {console.log(users)}
  {#if users}
  <ul>
      {#each users as { id, name }}
        <li class=red>
          {id}: {name}
        </li>
      {/each}
    </ul>
  {/if}
{:catch error}
	<p>Something went wrong: {error.message}</p>
{/await}


{#if error}
  {error}
{/if}

<style>
    .red {
        color:red;
    }
</style>