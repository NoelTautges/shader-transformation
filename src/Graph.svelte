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
                // Color palette thanks to Allie Ofisher at Café Pixo: https://medium.com/cafe-pixo/inclusive-color-palettes-for-the-web-bbfe8cf2410e
                {
                    selector: "node.languages",
                    style: {
                        "background-color": "#A997DF",
                    },
                },
                {
                    selector: "node.bytecode",
                    style: {
                        "background-color": "#E5323B",
                    },
                },
                {
                    selector: "node.ast",
                    style: {
                        "background-color": "#BDD9BF",
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
