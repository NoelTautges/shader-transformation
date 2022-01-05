<script>
    import { LANGS } from "./tools.js";

    export let name;
    export let bind;
</script>
<select name={name} bind:value={bind}>
    <option>Select {name}...</option>
    {#each LANGS as group}
        <optgroup label={group.id}>
            {#each group.langs as lang}
                <option value={lang.id}>
                    {lang.name}
                </option>
            {/each}
        </optgroup>
    {/each}
</select>