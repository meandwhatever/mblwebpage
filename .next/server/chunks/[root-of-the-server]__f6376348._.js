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
"[project]/components/build_shipment_json.tsx [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "build_shipment_json": (()=>build_shipment_json)
});
function build_shipment_json({ mbl_rawJson, hbl_rawJson, mode, shipmentId, user }) {
    console.log("build_shipment_json component is called");
    const now = new Date().toISOString();
    const template = `{
        "shipment_info": {
          "shipment_id": "",
          "created_at": "",
          "created_by": "",
          "updated_at": "",
          "updated_by": "",
          "updated_reason": "",
          "related_shipment_ids": []
        },
        "involved_party": {
          "shipper_name": "",
          "shipper_address": "",
          "shipper_city": "",
          "shipper_state": "",
          "shipper_country": "",
          "consignee_name": "",
          "consignee_address": "",
          "consignee_city": "",
          "consignee_state": "",
          "consignee_country": "",
          "consignee_postal_code": "",
          "orgin_agent_name": "",
          "orgin_agent_address": "",
          "orgin_agent_city": "",
          "orgin_agent_state": "",
          "orgin_agent_country": "",
          "orgin_agent_postal_code": "",
          "destination_agent_name": "",
          "destination_agent_address": "",
          "destination_agent_city": "",
          "destination_agent_state": "",
          "destination_agent_country": "",
          "destination_agent_postal_code": ""
        },
        "shipment": {
          "master_bill_of_lading_number": "",
          "house_bill_of_lading_number": "",
          "carrier_scac_code": "",
          "carrier_booking_number": "",
          "vessel_name": "",
          "voyage_number": "",
          "port_of_loading": "",
          "port_of_discharge": "",
          "place_of_receipt": "",
          "place_of_delivery": "",
          "estimated_time_of_departure": "",
          "estimated_time_of_arrival": "",
          "actual_time_of_departure": "",
          "actual_time_of_arrival": "",
          "date_of_release": "",
          "place_of_release": "",
          "shipped_on_board_date": "",
          "freight_mode": "",
          "freight_term": "",
          "freight_service": "",
          "total_number_of_containers": 0,
          "total_weight": 0,
          "total_volume": 0,
          "total_package": 0
        },
        "containers": [
          {
            "container_number": "",
            "seal_number": "",
            "container_type": "",
            "number_of_packages": 0,
            "package_uom": "",
            "weight": 0,
            "weight_uom": "",
            "volume": 0,
            "volume_uom": "",
            "product_item_description": "",
            "product_item_hscode": ""
          }
        ],
        "freight_charges": [
          {
            "charge_name": "",
            "rate": 0,
            "quantity": 0,
            "amount": 0,
            "prepaid_or_collect": ""
          }
        ],
        "customs": [
          {
            "product_id": "",
            "product_description": "",
            "product_origin": "",
            "hs_code": "",
            "Quantity": "",
            "Rate": 0,
            "total_amount": 0,
            "Currency": 0
          }
        ],
        "shipping_documents": [
          {
            "document_id": "",
            "document_type": "",
            "document_url": "",
            "processing_result_status_code": "",
            "processing_result_status_timestamp": ""
          }
        ],
        "validation_result": [
          {
            "field_name": "",
            "validation_status": "",
            "validation_type": "",
            "validated_value": "",
            "validation_data_source": [
              {
                "data_source": "",
                "value": ""
              }
            ]
          }
        ]
      }`;
    const shipment_json = JSON.parse(template);
    shipment_json.shipment_info.shipment_id = shipmentId;
    //shipment_json.shipment_info.created_at=now;
    //shipment_json.shipment_info.created_by=user;
    shipment_json.shipment_info.updated_at = now;
    shipment_json.shipment_info.updated_by = user;
    //shipment_json.shipment_info.updated_reason=mode;
    if (hbl_rawJson !== undefined) {
        console.log("hbl_rawJson is defined");
        shipment_json.involved_party.shipper_name = hbl_rawJson.shipment.shipper_name;
        shipment_json.involved_party.shipper_address = hbl_rawJson.shipment.shipper_address;
        shipment_json.involved_party.consignee_name = hbl_rawJson.shipment.consignee_name;
        shipment_json.involved_party.consignee_address = hbl_rawJson.shipment.consignee_address;
        shipment_json.shipment.master_bill_of_lading_number = hbl_rawJson.shipment.mbl_number;
        shipment_json.shipment.house_bill_of_lading_number = hbl_rawJson.shipment.hbl_number;
        shipment_json.shipment.carrier_scac_code = hbl_rawJson.shipment.carrier_scac_code;
        shipment_json.shipment.carrier_booking_number = hbl_rawJson.shipment.carrier_booking_number;
        shipment_json.shipment.vessel_name = hbl_rawJson.shipment.vessel_name;
        shipment_json.shipment.voyage_number = hbl_rawJson.shipment.voyage_number;
        shipment_json.shipment.port_of_loading = hbl_rawJson.shipment.port_of_loading;
        shipment_json.shipment.port_of_discharge = hbl_rawJson.shipment.port_of_discharge;
        shipment_json.shipment.place_of_receipt = hbl_rawJson.shipment.place_of_receipt;
        shipment_json.shipment.place_of_delivery = hbl_rawJson.shipment.place_of_delivery;
        //shipment_json.shipment.estimated_time_of_departure=hbl_rawJson.shipment.estimated_time_of_departure;
        //shipment_json.shipment.estimated_time_of_arrival=hbl_rawJson.shipment.estimated_time_of_arrival;
        //shipment_json.shipment.actual_time_of_departure=hbl_rawJson.shipment.actual_time_of_departure;
        //shipment_json.shipment.actual_time_of_arrival=hbl_rawJson.shipment.actual_time_of_arrival;
        //shipment_json.shipment.date_of_release=hbl_rawJson.shipment.date_of_release;
        shipment_json.shipment.freight_mode = hbl_rawJson.shipment.mode;
        shipment_json.shipment.freight_term = hbl_rawJson.shipment.freight_term;
        shipment_json.shipment.freight_service = hbl_rawJson.shipment.freight_service;
        shipment_json.shipment.total_number_of_containers = hbl_rawJson.shipment.total_number_of_containers;
        shipment_json.shipment.total_weight = hbl_rawJson.shipment.total_weight;
        shipment_json.shipment.total_volume = hbl_rawJson.shipment.total_volume;
        shipment_json.shipment.total_package = hbl_rawJson.shipment.total_package;
        shipment_json.containers = hbl_rawJson.containers;
        shipment_json.freight_charges = hbl_rawJson.freight_charges;
    //shipment_json.customs=hbl_rawJson.customs;
    //shipment_json.shipping_documents=hbl_rawJson.shipping_documents;
    //shipment_json.validation_result=hbl_rawJson.validation_result;
    }
    if (mbl_rawJson !== undefined) {
        console.log("mbl_rawJson is defined");
        shipment_json.shipment.freight_mode = mbl_rawJson.shipment.mode;
        shipment_json.shipment.freight_term = mbl_rawJson.shipment.freight_term;
        shipment_json.shipment.freight_service = mbl_rawJson.shipment.freight_service;
        shipment_json.shipment.master_bill_of_lading_number = mbl_rawJson.shipment.mbl_number;
        shipment_json.involved_party.orgin_agent_name = mbl_rawJson.shipment.shipper_name;
        shipment_json.involved_party.orgin_agent_address = mbl_rawJson.shipment.shipper_address;
        shipment_json.involved_party.destination_agent_name = mbl_rawJson.shipment.consignee_name;
        shipment_json.involved_party.destination_agent_address = mbl_rawJson.shipment.consignee_address;
    }
    return shipment_json;
}
}}),
"[project]/pages/api/shipment/shipment.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
// pages/api/shipment.ts
__turbopack_context__.s({
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/uuid [external] (uuid, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$build_shipment_json$2e$tsx__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/build_shipment_json.tsx [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }
    // Destructure and normalize names
    const { file_Id: fileId, file_Type: fileType, rawJson, mode, user } = req.body;
    if (fileType !== 'mbl' && fileType !== 'hbl') {
        return res.status(400).json({
            success: false,
            message: 'Invalid file_Type'
        });
    }
    // Helper to fetch the uploaded document URL
    async function getDocUrl(docType, id) {
        const model = docType === 'mbl' ? 'mbl_Document' : 'hbl_Document';
        // @ts-ignore
        const doc = await prisma[model].findUnique({
            where: {
                file_id: id
            },
            select: {
                file_Url: true
            }
        });
        return doc?.file_Url ?? null;
    }
    try {
        if (fileType === 'mbl') {
            // —— CREATE new shipment for MBL ——
            const mblNumber = rawJson.shipment.mbl_number;
            const mblUrl = await getDocUrl('mbl', fileId);
            // 1️⃣ Do we already have one-or-many shipments that reference this MBL?
            const existingShipments = await prisma.shipment.findMany({
                where: {
                    mbl_Number: mblNumber
                }
            });
            if (existingShipments.length > 0) {
                // —— UPDATE every matching shipment (one-to-many) ——
                const updates = existingShipments.map((s)=>{
                    const mergedPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$build_shipment_json$2e$tsx__$5b$api$5d$__$28$ecmascript$29$__["build_shipment_json"])({
                        mbl_rawJson: rawJson,
                        hbl_rawJson: s.rawJson,
                        shipmentId: s.shipmentId,
                        mode,
                        user
                    });
                    return prisma.shipment.update({
                        where: {
                            shipmentId: s.shipmentId
                        },
                        data: {
                            mbl_url: mblUrl,
                            rawJson: mergedPayload,
                            updated_by: user,
                            updated_reason: 'MBL re-upload'
                        }
                    });
                });
                await prisma.$transaction(updates); // atomic bulk update
                return res.status(200).json({
                    success: true,
                    message: `Updated ${updates.length} shipment(s) that share MBL ${mblNumber}.`
                });
            }
            // —— No shipment yet uses this MBL ⇒ create the first one ——
            const shipmentId = `ocn-${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])()}`;
            const shipmentPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$build_shipment_json$2e$tsx__$5b$api$5d$__$28$ecmascript$29$__["build_shipment_json"])({
                mbl_rawJson: rawJson,
                shipmentId,
                mode,
                user
            });
            await prisma.shipment.create({
                data: {
                    shipmentId,
                    mode,
                    mbl_Number: mblNumber,
                    mbl_url: mblUrl,
                    rawJson: shipmentPayload
                }
            });
            return res.status(201).json({
                success: true,
                message: `Shipment ${shipmentId} created with new MBL ${mblNumber}.`
            });
        } else if (fileType === 'hbl') {
            const hblNumber = rawJson.shipment.hbl_number; // always unique
            const mblNumber = rawJson.shipment.mbl_number; // may repeat
            const hblUrl = await getDocUrl('hbl', fileId); // URL of this HBL PDF
            /** 1️⃣  Do we already have a shipment row for this HBL?  */ const existing = await prisma.shipment.findUnique({
                where: {
                    hbl_Number: hblNumber
                }
            });
            /** 2️⃣  Try to locate the *document* for the related MBL (optional).   *
   *      Assumes mbl_Document.rawJson → { shipment: { mbl_number: … } } */ const mblDoc = await prisma.mbl_Document.findFirst({
                where: {
                    rawJson: {
                        path: [
                            'shipment',
                            'mbl_number'
                        ],
                        equals: mblNumber
                    }
                },
                select: {
                    file_Url: true,
                    rawJson: true
                }
            });
            const mblUrl = mblDoc?.file_Url ?? null;
            const mblRawJson = mblDoc?.rawJson;
            if (existing) {
                /* —— UPDATE the current row —— */ const mergedPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$build_shipment_json$2e$tsx__$5b$api$5d$__$28$ecmascript$29$__["build_shipment_json"])({
                    mbl_rawJson: mblRawJson ?? existing.rawJson,
                    hbl_rawJson: rawJson,
                    shipmentId: existing.shipmentId,
                    mode,
                    user
                });
                await prisma.shipment.update({
                    where: {
                        shipmentId: existing.shipmentId
                    },
                    data: {
                        mbl_Number: mblNumber,
                        mbl_url: mblUrl ?? existing.mbl_url,
                        hbl_url: hblUrl,
                        rawJson: mergedPayload,
                        updated_by: user,
                        updated_reason: 'HBL re-upload'
                    }
                });
                return res.status(200).json({
                    success: true,
                    message: `Shipment ${existing.shipmentId} updated (HBL ${hblNumber}).`
                });
            }
            /* —— CREATE a brand-new shipment row —— */ const shipmentId = `ocn-${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$uuid__$5b$external$5d$__$28$uuid$2c$__esm_import$29$__["v4"])()}`;
            const shipmentPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$build_shipment_json$2e$tsx__$5b$api$5d$__$28$ecmascript$29$__["build_shipment_json"])({
                mbl_rawJson: mblRawJson,
                hbl_rawJson: rawJson,
                shipmentId,
                mode,
                user
            });
            await prisma.shipment.create({
                data: {
                    shipmentId,
                    mode,
                    mbl_Number: mblNumber,
                    mbl_url: mblUrl,
                    hbl_Number: hblNumber,
                    hbl_url: hblUrl,
                    rawJson: shipmentPayload
                }
            });
            return res.status(201).json({
                success: true,
                message: `Shipment ${shipmentId} created with HBL ${hblNumber}.`
            });
        }
    /* ────────────────────────────────────────────────────────────────────────────── */ } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal error'
        });
    }
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

//# sourceMappingURL=%5Broot-of-the-server%5D__f6376348._.js.map