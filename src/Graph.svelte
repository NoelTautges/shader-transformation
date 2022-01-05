<script lang="ts">
    import cytoscape from "cytoscape";
    import avsdf from "cytoscape-avsdf";
    import { onMount } from "svelte";

    import { ELEMS } from "./tools.js";

    let container;

    cytoscape.use(avsdf);

    onMount(() => {
        cytoscape({
            container: container,
            elements: ELEMS,
            style: [
                {
                    selector: "node",
                    style: {
                        "label": "data(name)",
                    },
                },
                {
                    selector: "edge",
                    style: {
                        "curve-style": "bezier",
                        "target-arrow-shape": "triangle-backcurve",
                        "target-endpoint": "outside-to-node-or-label",
                    },
                },
                {
                    selector: "edge[tool]",
                    style: {
                        "label": "data(tool)",
                    },
                },
            ],
            layout: {
                name: "avsdf",
                nodeSeparation: 200,
            },
        });
    });
</script>

<style>
    #container {
        width: 100%;
        height: 80vh;
    }
</style>

<div id="container" bind:this={container}></div>
