<script lang="ts">
  import { onMount } from 'svelte';
  import { trpc } from '$lib/trpc/client';
  import type { Users } from '$lib/trpc/client';
  
    let users: Users = [];
    let error: string = "";

    onMount(async () => {
        try
        {
          users = await trpc.getUsers.query();
          error = '';
        }
        catch(e){
           error = e instanceof Error ? e.message : '';
        }
    });
</script>

<h1>Welcome to SvelteKIT</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if users}
<ul>
	{#each users as { id, name }, i}
		<li class=red>
				{id}: {name}
		</li>
	{/each}
</ul>
{/if}

{#if error}
  {error}
{/if}

<style>
    .red {
        color:red;
    }
</style>