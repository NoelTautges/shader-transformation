<script lang="ts">
    import Graph from "./Graph.svelte";
    import LanguageSelector from "./LanguageSelector.svelte";

    let source;
    let target;
</script>
<style>
    :global(*) {
        font-size: 1.1rem;
    }

    #centered {
        text-align: center;
        margin-bottom: 5vh;
    }
</style>

<div id="centered">
    <label for="source">Source</label>
    <LanguageSelector name="source" bind={source} />
    &nbsp; &nbsp; &nbsp;
    <label for="target">Target</label>
    <LanguageSelector name="target" bind={target} />
</div>

<Graph />
