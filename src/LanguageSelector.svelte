<script>
    import { LANGS } from "./tools.js";

    export let name;
    export let value = "";
</script>

<select name={name} bind:value={value}>
    <option value="">Select {name}...</option>
    {#each LANGS as group}
        <optgroup label={group.name}>
            {#each group.langs as lang}
                <option value={lang.id}>
                    {lang.name}
                </option>
            {/each}
        </optgroup>
    {/each}
</select>