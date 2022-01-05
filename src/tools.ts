import { cartesian } from "./utils";

const LANGS = [
    {
        id: "Languages",
        langs: [
            { id: "hlsl", name: "HLSL" },
            { id: "glsl", name: "GLSL" },
            { id: "glsl_es", name: "GLSL ES" },
            { id: "msl", name: "MSL" },
            { id: "wgsl", name: "WGSL" },
        ],
    },
    {
        id: "Bytecode",
        langs: [
            { id: "dxbc", name: "DXBC" },
            { id: "dxil", name: "DXIL" },
            { id: "spirv", name: "SPIR-V" },
        ],
    }
];

const TOOLS = [
    {
        id: "hlslcc",
        name: "HLSLcc",
        in: ["dxbc"],
        out: ["glsl", "glsl_es", "msl"],
        ast: false,
        links: ["https://github.com/Unity-Technologies/HLSLcc"],
    },
    {
        id: "dxbc2glsl",
        name: "DXBC2GLSL",
        in: ["dxbc"],
        out: ["glsl"],
        ast: false,
        links: ["https://github.com/gongminmin/KlayGE/tree/develop/DXBC2GLSL"],
    },
    {
        id: "glslang",
        name: "glslang",
        in: ["glsl", "hlsl"],
        out: ["spirv"],
        ast: true,
        links: [
            "https://github.com/KhronosGroup/glslang",
            "https://github.com/tomaka/glslang-rs",
            "https://github.com/TimNN/glslang-sys",
        ],
    },
    {
        id: "spirv_cross",
        name: "SPIRV-Cross",
        in: ["spirv"],
        out: ["glsl", "msl", "hlsl"],
        ast: true,
        links: [
            "https://github.com/KhronosGroup/SPIRV-Cross",
            "https://github.com/grovesNL/spirv_cross",
        ],
    },
    {
        id: "dilithium",
        name: "Dilithium",
        in: ["dxil", "spirv"],
        out: ["spirv", "dxil"],
        ast: false,
        links: ["https://github.com/gongminmin/Dilithium"],
    },
    {
        id: "vkd3d-shader",
        name: "vkd3d-shader",
        in: ["dxbc", "dxil"],
        out: ["spirv"],
        ast: false,
        links: [
            "https://github.com/HansKristian-Work/vkd3d-proton/tree/master/libs/vkd3d-shader",
            "https://github.com/HansKristian-Work/dxil-spirv",
        ],
    },
    {
        id: "naga",
        name: "Naga",
        in: ["spirv", "wgsl", "glsl"],
        out: ["spirv", "wgsl", "msl", "hlsl", "glsl"],
        ast: true,
        links: ["https://github.com/gfx-rs/naga"],
    },
    {
        id: "fxc",
        name: "Effects Compiler",
        in: ["hlsl"],
        out: ["dxbc"],
        ast: false,
        links: ["https://docs.microsoft.com/en-us/windows/win32/direct3dtools/fxc"],
    },
    {
        id: "dxc",
        name: "DirectX Shader Compiler",
        in: ["hlsl"],
        out: ["dxil", "spirv"],
        ast: false,
        links: ["https://github.com/microsoft/DirectXShaderCompiler"],
    },
    {
        id: "dxilconv",
        name: "dxilconv",
        in: ["dxbc"],
        out: ["dxil"],
        ast: false,
        links: ["https://github.com/microsoft/DirectXShaderCompiler/tree/master/projects/dxilconv"],
    },
];

let ELEMS = [];
for(const group of LANGS) {
    for(const lang of group.langs) {
        ELEMS.push({
            group: "nodes",
            data: {
                id: lang.id,
                name: `[${group.id[0]}] ` + lang.name,
            },
        });
    }
}
for(const tool of TOOLS) {
    if(tool.ast) {
        ELEMS.push({
            group: "nodes",
            data: {
                id: tool.id,
                name: "[AST] " + tool.name,
            },
        });
        for(const lang of tool.in) {
            ELEMS.push({
                group: "edges",
                data: {
                    id: lang + "-" + tool.id,
                    source: lang,
                    target: tool.id,
                },
            });
        }
        for(const lang of tool.out) {
            ELEMS.push({
                group: "edges",
                data: {
                    id: tool.id + "-" + lang,
                    source: tool.id,
                    target: lang,
                },
            });
        }
    } else {
        for(const inOut of cartesian(tool.in, tool.out)) {
            if(inOut[0] == inOut[1]) continue;
            ELEMS.push({
                group: "edges",
                data: {
                    id: inOut[0] + "-" + inOut[1],
                    source: inOut[0],
                    target: inOut[1],
                    tool: tool.name,
                },
            });
        }
    }
}


export { LANGS, TOOLS, ELEMS };
