<script lang="ts">
    import cytoscape from "cytoscape";
    import cytoscapeAllPaths from "cytoscape-all-paths";
    import avsdf from "cytoscape-avsdf";
    import { onMount } from "svelte";

    import { ELEMS } from "./tools.js";

    export let source = "";
    export let target = "";

    let container;
    let cy;

    cytoscape.use(cytoscapeAllPaths);
    cytoscape.use(avsdf);

    onMount(() => {
        cy = cytoscape({
            container: container,
            elements: ELEMS,
            wheelSensitivity: 0.3,
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
                {
                    selector: "node.hidden",
                    style: {
                        "display": "none",
                    },
                },
            ],
            layout: {
                name: "avsdf",
                nodeSeparation: 200,
            },
        });
    });

    $: if(cy) {
        if(source && target) {
            let necessaryElems = new Set(
                cy
                    .elements()
                    .cytoscapeAllPaths({rootIds: [source]})
                    .map(path => path.map(e => e.data("id")))
                    .map(path => {
                        let i = path.indexOf(target);
                        return i != -1 ? path.slice(0, i + 1) : [];
                    })
                    .filter(path => path.length <= 7)
                    .flat()
            );
            cy.elements().forEach(e => {
                if(necessaryElems.has(e.data("id"))) {
                    if(e.hasClass("hidden")) {
                        e.removeClass("hidden");
                    }
                } else {
                    if(!e.hasClass("hidden")) {
                        e.addClass("hidden");
                    }
                }
            });
        } else {
            cy.elements().forEach(e => e.removeClass("hidden"));
        }
    }
</script>

<style>
    #container {
        width: 100%;
        height: 80vh;
    }
</style>

<div id="container" bind:this={container}></div>
