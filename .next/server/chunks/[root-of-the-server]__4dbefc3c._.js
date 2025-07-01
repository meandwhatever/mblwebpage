module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}}),
"[externals]/uuid [external] (uuid, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("uuid");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/pages/api/shipment/shipment.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
// pages/api/upload/shipment.ts
//this file is used to upload and update shipment to the database
//   npm install uuid
//   npm install -D @types/uuid
__turbopack_context__.s({
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/uuid [external] (uuid, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function shipmentCreationWorkflow(fileType, fileId, rawJson, mode) {
    console.log("passing shipmentCreationWorkflow");
    let doc;
    //const rawJson = doc.rawJson as any;
    const shipmentData = rawJson.shipment;
    // Extract arrays, fallback to empty arrays
    const containers = rawJson.containers ?? [];
    const freightCharges = rawJson.freight_charges ?? [];
    const shipmentId = `ocn-${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])()}`; //generate a unique shipment id
    //no mbl number in the shipment data, create a new shipment
    if (fileType === 'mbl') {
        console.log("passing mbl");
        //doc = await prisma.shipment.findUnique({ where: { shipmentId: shipmentId } });
        const mbl_prisma = await prisma.mbl_Document.findUnique({
            where: {
                file_id: fileId
            },
            select: {
                file_Url: true
            }
        });
        const createdShipment = await prisma.shipment.create({
            data: {
                shipmentId: shipmentId,
                mode: mode,
                mbl_Number: shipmentData.mbl_number ?? null,
                mbl_url: mbl_prisma?.file_Url ?? null,
                //hbl_Number: null,
                //hbl_url: null,
                containers: containers,
                freightCharges: freightCharges,
                rawJson: {
                    a: 1
                }
            }
        });
    } else if (fileType === 'hbl') {
        console.log("passing hbl");
        const mbl_Number = rawJson.shipment.mbl_number;
        const hbl_Number = rawJson.shipment.hbl_number;
        const hbl_prisma = await prisma.hbl_Document.findUnique({
            where: {
                file_id: fileId
            },
            select: {
                file_Url: true
            }
        });
        const hbl_url = hbl_prisma?.file_Url ?? null;
        //check if the mbl_Number is already in the shipment database if so find the mbl_url
        const mbl_prisma = await prisma.shipment.findFirst({
            where: {
                mbl_Number: mbl_Number
            },
            select: {
                mbl_Number: true,
                shipmentId: true
            }
        });
        //if the mbl_Number is already in the shipment database, update that shipment, if not create a new shipment
        if (mbl_prisma) {
            console.log("found existing shipment for mbl_Number: ", mbl_Number);
            await prisma.shipment.update({
                where: {
                    shipmentId: mbl_prisma.shipmentId
                },
                data: {
                    hbl_Number: {
                        push: hbl_Number
                    },
                    hbl_url: {
                        push: hbl_url ?? ''
                    },
                    rawJson: {
                        a: 1
                    },
                    updated_by: 'system',
                    updated_reason: "add new hbl document"
                }
            });
        } else {
            console.log("creating a new shipment");
            const createdShipment = await prisma.shipment.create({
                data: {
                    shipmentId: shipmentId,
                    mode: mode,
                    mbl_Number: shipmentData.mbl_number ?? null,
                    //mbl_url
                    hbl_Number: [
                        hbl_Number
                    ],
                    hbl_url: [
                        hbl_url ?? ''
                    ],
                    containers: containers,
                    freightCharges: freightCharges,
                    rawJson: {
                        a: 1
                    }
                }
            });
        }
    //doc = await prisma.shipment.findUnique({ where: { mbl_Number: mbl_Number } });
    } else {
        throw new Error(`Invalid file type: ${fileType}`);
    }
    return;
}
async function shipmentUpdateWorkflow(fileType, fileId, rawJson, mode, shipmentId) {
    let doc;
    console.log("passing shipmentUpdateWorkflow");
    //const rawJson = doc.rawJson as any;
    const shipmentData = rawJson.shipment;
    // Extract arrays, fallback to empty arrays
    const containers = rawJson.containers ?? [];
    const freightCharges = rawJson.freight_charges ?? [];
    if (fileType === 'mbl') {
        console.log("found existing mbl");
        // grab the URL that we stored when the PDF was uploaded
        const mblDoc = await prisma.mbl_Document.findUnique({
            where: {
                file_id: fileId
            },
            select: {
                file_Url: true
            }
        });
        const mblUrl = mblDoc?.file_Url ?? '';
        // overwrite MBL‐side fields
        await prisma.shipment.update({
            where: {
                shipmentId
            },
            data: {
                mbl_url: mblUrl,
                rawJson: {
                    a: 1
                },
                containers,
                freightCharges,
                updated_by: 'system',
                updated_reason: "update mbl document",
                mode: mode
            }
        });
    } else if (fileType === 'hbl') {
        //hbl number exist in one of the shipment, update the shipment
        console.log("found existing hbl , updating hbl");
        // 1) load the existing arrays
        const shipment = await prisma.shipment.findUnique({
            where: {
                shipmentId
            },
            select: {
                hbl_Number: true,
                hbl_url: true
            }
        });
        if (!shipment) {
            throw new Error(`No shipment found with ID ${shipmentId}`);
        }
        const { hbl_Number: numbers, hbl_url: urls } = shipment;
        // 2) pull in the new HBL number & URL
        const hblNumber = rawJson.shipment.hbl_number;
        if (!hblNumber) {
            throw new Error("Missing hbl_number in payload");
        }
        const hblDoc = await prisma.hbl_Document.findUnique({
            where: {
                file_id: fileId
            },
            select: {
                file_Url: true
            }
        });
        const newUrl = hblDoc?.file_Url ?? '';
        // 3) find where it lives
        const idx = numbers.findIndex((n)=>n === hblNumber);
        if (idx === -1) {
            // (optional) if want to treat a “new” HBL here, you could push both arrays…
            numbers.push(hblNumber);
            urls.push(newUrl);
        } else {
            // 4) replace only the URL at that slot
            urls[idx] = newUrl;
        }
        // 5) write the updated URL array (and JSON) back
        await prisma.shipment.update({
            where: {
                shipmentId
            },
            data: {
                // leave hbl_Number alone (numbers)
                hbl_url: urls,
                rawJson: {
                    a: 1
                },
                updated_by: 'system',
                updated_reason: "update hbl document"
            }
        });
    }
}
async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({
            success: false
        });
    }
    console.log("passing shipment");
    //file_id is mbl or hbl number, file_Type is mbl or hbl, rawJson is the json data, mode is the mode of the shipment
    const { file_Id, file_Type, rawJson, mode } = req.body;
    //check if the file_Name is mbl or hbl number
    if (file_Type !== 'mbl' && file_Type !== 'hbl') {
        return res.status(400).json({
            success: false,
            message: 'Invalid file type'
        });
    }
    //check if the file_Id is already in the shipment table
    const existingShipment = file_Type === 'mbl' ? await prisma.shipment.findFirst({
        where: {
            mbl_Number: file_Id
        }
    }) : await prisma.shipment.findFirst({
        where: {
            hbl_Number: {
                has: file_Id
            }
        }
    });
    let result;
    if (!existingShipment) {
        // 2a. Not found → create
        result = await shipmentCreationWorkflow(file_Type, file_Id, rawJson, mode);
        return res.status(201).json({
            success: true,
            message: `Shipment ${result} created.`
        });
    } else {
        // 2b. Found → update
        result = await shipmentUpdateWorkflow(file_Type, file_Id, rawJson, mode, existingShipment.shipmentId);
        return res.status(200).json({
            success: true,
            message: `Shipment ${result} updated.`
        });
    }
    "TURBOPACK unreachable";
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_context__.s({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/shipment/shipment.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "routeModule": (()=>routeModule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$shipment$2f$shipment$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/shipment/shipment.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$shipment$2f$shipment$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$shipment$2f$shipment$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$shipment$2f$shipment$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$shipment$2f$shipment$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/shipment/shipment",
        pathname: "/api/shipment/shipment",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$shipment$2f$shipment$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__4dbefc3c._.js.map