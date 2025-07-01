(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/RawJsonForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>RawJsonForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function RawJsonForm({ data, docId, fileType }) {
    _s();
    const [jsonData, setJsonData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(data);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    //universal handle change function for all inputs that are not arrays
    const handleChange = (section, key)=>(e)=>{
            const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
            setJsonData((prev)=>({
                    ...prev,
                    [section]: {
                        ...prev[section],
                        [key]: value
                    }
                }));
        };
    //universal handle change function for all inputs that are arrays
    const handleArrayChange = (arrayKey, index, key)=>(e)=>{
            const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
            setJsonData((prev)=>{
                const updated = [
                    ...prev[arrayKey]
                ];
                updated[index] = {
                    ...updated[index],
                    [key]: value
                };
                return {
                    ...prev,
                    [arrayKey]: updated
                };
            });
        };
    const handleUpdate = (e)=>{
        e.preventDefault();
        console.log("Updated JSON:", jsonData);
    // Send jsonData to your API or parent component
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            //first update the mbl or hbl document
            const res = await fetch(`/api/upload/${docId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rawJson: jsonData,
                    fileType: fileType
                })
            });
            if (!res.ok) throw new Error(await res.text());
            //then update the shipment
            const blNumber = fileType === "mbl" ? jsonData.shipment.mbl_number : jsonData.shipment.hbl_number;
            const resShip = await fetch("/api/shipment/shipment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    file_Id: blNumber,
                    file_Type: fileType,
                    rawJson: jsonData,
                    mode: jsonData.shipment.mode
                })
            });
            if (!resShip.ok) {
                throw new Error(`Shipment hasdfse update failed in RawJsonForm when fetching: ${await resShip.text()}
        blNumber: ${blNumber}
        
        `);
            }
            alert("Document and shipment updated!");
        } catch (err) {
            console.error(err);
            alert("Update failed: " + err.message);
        } finally{
            setLoading(false);
        }
    };
    //for mbl and hbl
    const handleAddFreightCharge = ()=>{
        setJsonData((prev)=>({
                ...prev,
                freight_charges: Array.isArray(prev.freight_charges) ? [
                    ...prev.freight_charges,
                    {
                        charge_type: '',
                        amount: 0,
                        currency: ''
                    }
                ] : [
                    {
                        charge_type: '',
                        amount: 0,
                        currency: ''
                    }
                ]
            }));
    };
    const handleDeleteFreightCharge = (index)=>{
        setJsonData((prev)=>({
                ...prev,
                freight_charges: prev.freight_charges.filter((_, i)=>i !== index)
            }));
    };
    const handleAddContainer = ()=>{
        setJsonData((prev)=>({
                ...prev,
                containers: Array.isArray(prev.containers) ? [
                    ...prev.containers,
                    {
                        container_number: '',
                        seal_number: '',
                        container_type: '',
                        number_of_packages: 0,
                        package_uom: '',
                        weight: 0,
                        weight_uom: '',
                        volume: 0,
                        volume_uom: '',
                        product_item_description: '',
                        product_item_hscode: ''
                    }
                ] : [
                    {
                        container_number: '',
                        seal_number: '',
                        container_type: '',
                        number_of_packages: 0,
                        package_uom: '',
                        weight: 0,
                        weight_uom: '',
                        volume: 0,
                        volume_uom: '',
                        product_item_description: '',
                        product_item_hscode: ''
                    }
                ]
            }));
    };
    const handleDeleteContainer = (index)=>{
        setJsonData((prev)=>({
                ...prev,
                containers: prev.containers.filter((_, i)=>i !== index)
            }));
    };
    if (fileType === "mbl") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleUpdate,
            className: "space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "MBL"
                }, void 0, false, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Shipper Information"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                [
                                    "name",
                                    "Name"
                                ],
                                [
                                    "address",
                                    "Address"
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        label,
                                        ":",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: jsonData.shipper[key] || '',
                                            onChange: handleChange("shipper", key),
                                            className: "border rounded p-1 w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/RawJsonForm.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Consignee Information"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                [
                                    "name",
                                    "Name"
                                ],
                                [
                                    "address",
                                    "Address"
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        label,
                                        ":",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: jsonData.consignee[key] || '',
                                            onChange: handleChange("consignee", key),
                                            className: "border rounded p-1 w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 192,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/RawJsonForm.tsx",
                                    lineNumber: 190,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Notify Party Information"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                [
                                    "name",
                                    "Name"
                                ],
                                [
                                    "address",
                                    "Address"
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        label,
                                        ":",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: jsonData.notify_party[key] || '',
                                            onChange: handleChange("notify_party", key),
                                            className: "border rounded p-1 w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/RawJsonForm.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Shipment & Vessel Information"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                [
                                    [
                                        "mbl_number",
                                        "MBL Number dont change",
                                        "text"
                                    ],
                                    [
                                        "carrier_scac_code",
                                        "Carrier SCAC",
                                        "text"
                                    ],
                                    [
                                        "carrier_booking_number",
                                        "Booking Number",
                                        "text"
                                    ],
                                    [
                                        "vessel_name",
                                        "Vessel Name",
                                        "text"
                                    ],
                                    [
                                        "voyage_number",
                                        "Voyage Number",
                                        "text"
                                    ],
                                    [
                                        "port_of_loading",
                                        "Port of Loading",
                                        "text"
                                    ],
                                    [
                                        "port_of_discharge",
                                        "Port of Discharge",
                                        "text"
                                    ],
                                    [
                                        "place_of_receipt",
                                        "Place of Receipt",
                                        "text"
                                    ],
                                    [
                                        "place_of_delivery",
                                        "Place of Delivery",
                                        "text"
                                    ],
                                    [
                                        "place_of_release",
                                        "Place of Release",
                                        "text"
                                    ],
                                    [
                                        "date_of_release",
                                        "Date of Release",
                                        "date"
                                    ],
                                    [
                                        "shipped_on_board_date",
                                        "On Board Date",
                                        "date"
                                    ],
                                    [
                                        "mode",
                                        "Mode",
                                        "text"
                                    ],
                                    [
                                        "freight_term",
                                        "Freight Term",
                                        "text"
                                    ],
                                    [
                                        "freight_service",
                                        "Service",
                                        "text"
                                    ],
                                    [
                                        "total_number_of_containers",
                                        "# Containers",
                                        "number"
                                    ],
                                    [
                                        "total_weight",
                                        "Total Weight",
                                        "text"
                                    ],
                                    [
                                        "total_volume",
                                        "Total Volume",
                                        "text"
                                    ],
                                    [
                                        "total_package",
                                        "Total Packages",
                                        "text"
                                    ]
                                ].map(([key, label, type])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            label,
                                            ":",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: type,
                                                value: jsonData.shipment[key] || '',
                                                onChange: handleChange("shipment", key),
                                                className: "border rounded p-1 w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 253,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this)),
                                [
                                    [
                                        "date_of_release",
                                        "Date of Release"
                                    ],
                                    [
                                        "shipped_on_board_date",
                                        "On Board Date"
                                    ]
                                ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            label,
                                            ":",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: jsonData.shipment[key] || '',
                                                onChange: handleChange("shipment", key),
                                                className: "border rounded p-1 w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 267,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-2",
                            children: "Freight Charges"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 334,
                            columnNumber: 11
                        }, this),
                        Array.isArray(jsonData.freight_charges) && jsonData.freight_charges.map((charge, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-4 border rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: [
                                                    "Item ",
                                                    idx + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 341,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleDeleteFreightCharge(idx),
                                                className: "px-2 py-1 bg-red-600 text-white rounded",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 340,
                                        columnNumber: 17
                                    }, this),
                                    [
                                        [
                                            "charge_type",
                                            "Charge Type",
                                            "text"
                                        ],
                                        [
                                            "rate",
                                            "Rate",
                                            "number"
                                        ],
                                        [
                                            "quantity",
                                            "Quantity",
                                            "number"
                                        ],
                                        [
                                            "unit",
                                            "Unit (Currency)",
                                            "text"
                                        ],
                                        [
                                            "amount",
                                            "Amount",
                                            "number"
                                        ]
                                    ].map(([key, label, type])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block mb-2",
                                            children: [
                                                label,
                                                ":",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: type,
                                                    value: charge[key] ?? "",
                                                    onChange: handleArrayChange("freight_charges", idx, key),
                                                    className: "ml-2 border px-2 py-1 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/RawJsonForm.tsx",
                                                    lineNumber: 361,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 359,
                                            columnNumber: 19
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-medium mb-1",
                                                children: "Payment Terms"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 376,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "inline-flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: `prepaidOrCollect-${idx}`,
                                                                value: "prepaid",
                                                                checked: charge["prepaid or collect"] === "prepaid",
                                                                onChange: handleArrayChange("freight_charges", idx, "prepaid or collect"),
                                                                className: "form-radio h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                                lineNumber: 379,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2",
                                                                children: "Prepaid"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                                lineNumber: 391,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/RawJsonForm.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "inline-flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: `prepaidOrCollect-${idx}`,
                                                                value: "collect",
                                                                checked: charge["prepaid or collect"] === "collect",
                                                                onChange: handleArrayChange("freight_charges", idx, "prepaid or collect"),
                                                                className: "form-radio h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                                lineNumber: 395,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2",
                                                                children: "Collect"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                                lineNumber: 407,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/RawJsonForm.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 377,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 375,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/RawJsonForm.tsx",
                                lineNumber: 338,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleAddFreightCharge,
                            className: "mt-2 px-3 py-1 bg-green-600 text-white rounded",
                            children: "Add Freight Charge"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 415,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 333,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-2",
                            children: "Containers"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 426,
                            columnNumber: 9
                        }, this),
                        Array.isArray(jsonData.containers) && jsonData.containers.map((container, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-4 border rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: [
                                                    "Container ",
                                                    idx + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 431,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleDeleteContainer(idx),
                                                className: "px-2 py-1 bg-red-600 text-white rounded",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 430,
                                        columnNumber: 15
                                    }, this),
                                    [
                                        [
                                            "container_number",
                                            "Container Number",
                                            "text"
                                        ],
                                        [
                                            "seal_number",
                                            "Seal Number",
                                            "text"
                                        ],
                                        [
                                            "container_type",
                                            "Type",
                                            "text"
                                        ],
                                        [
                                            "number_of_packages",
                                            "# Packages",
                                            "number"
                                        ],
                                        [
                                            "package_uom",
                                            "UOM",
                                            "text"
                                        ],
                                        [
                                            "weight",
                                            "Weight",
                                            "number"
                                        ],
                                        [
                                            "weight_uom",
                                            "Weight UOM",
                                            "text"
                                        ],
                                        [
                                            "volume",
                                            "Volume",
                                            "number"
                                        ],
                                        [
                                            "volume_uom",
                                            "Volume UOM",
                                            "text"
                                        ],
                                        [
                                            "product_item_description",
                                            "Description",
                                            "text"
                                        ],
                                        [
                                            "product_item_hscode",
                                            "HS Code",
                                            "text"
                                        ]
                                    ].map(([key, label, type])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block mb-2",
                                            children: [
                                                label,
                                                ":",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: type,
                                                    value: container[key] ?? '',
                                                    onChange: handleArrayChange("containers", idx, key),
                                                    className: "ml-2 border px-2 py-1 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/RawJsonForm.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 453,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/RawJsonForm.tsx",
                                lineNumber: 429,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleAddContainer,
                            className: "mt-2 px-3 py-1 bg-green-600 text-white rounded",
                            children: "Add Container"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 465,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 425,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    onClick: handleSubmit,
                    disabled: loading,
                    className: "mt-4 bg-blue-600 text-white px-4 py-2 rounded",
                    children: loading ? "Updating…" : "Update"
                }, void 0, false, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 476,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/RawJsonForm.tsx",
            lineNumber: 157,
            columnNumber: 7
        }, this);
    }
    if (fileType === "hbl") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleUpdate,
            className: "space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "HBL"
                }, void 0, false, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 493,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Shipper Information"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 495,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                [
                                    "name",
                                    "Name"
                                ],
                                [
                                    "address",
                                    "Address"
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        label,
                                        ":",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: jsonData.shipper[key] || '',
                                            onChange: handleChange("shipper", key),
                                            className: "border rounded p-1 w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 504,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/RawJsonForm.tsx",
                                    lineNumber: 502,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 496,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 494,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Consignee Information"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 517,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                [
                                    "name",
                                    "Name"
                                ],
                                [
                                    "address",
                                    "Address"
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        label,
                                        ":",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: jsonData.consignee[key] || '',
                                            onChange: handleChange("consignee", key),
                                            className: "border rounded p-1 w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 526,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/RawJsonForm.tsx",
                                    lineNumber: 524,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 518,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 516,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Notify Party Information"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 539,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                [
                                    "name",
                                    "Name"
                                ],
                                [
                                    "address",
                                    "Address"
                                ]
                            ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        label,
                                        ":",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: jsonData.notify_party[key] || '',
                                            onChange: handleChange("notify_party", key),
                                            className: "border rounded p-1 w-full"
                                        }, void 0, false, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 548,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/RawJsonForm.tsx",
                                    lineNumber: 546,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 540,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 538,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold",
                            children: "Shipment & Vessel Information"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 561,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                            children: [
                                [
                                    [
                                        "hbl_number",
                                        "HBL Number dont change",
                                        "text"
                                    ],
                                    [
                                        "mbl_number",
                                        "MBL Number",
                                        "text"
                                    ],
                                    [
                                        "vessel_name",
                                        "Vessel Name",
                                        "text"
                                    ],
                                    [
                                        "voyage_number",
                                        "Voyage Number",
                                        "text"
                                    ],
                                    [
                                        "port_of_loading",
                                        "Port of Loading",
                                        "text"
                                    ],
                                    [
                                        "port_of_discharge",
                                        "Port of Discharge",
                                        "text"
                                    ],
                                    [
                                        "place_of_receipt",
                                        "Place of Receipt",
                                        "text"
                                    ],
                                    [
                                        "place_of_delivery",
                                        "Place of Delivery",
                                        "text"
                                    ],
                                    [
                                        "place_of_issue",
                                        "Place of Issue",
                                        "text"
                                    ],
                                    [
                                        "date_of_issue",
                                        "Date of Issue",
                                        "date"
                                    ],
                                    [
                                        "shipped_on_board_date",
                                        "On Board Date",
                                        "date"
                                    ],
                                    [
                                        "mode",
                                        "Mode",
                                        "text"
                                    ],
                                    [
                                        "freight_term",
                                        "Freight Term",
                                        "text"
                                    ],
                                    [
                                        "freight_service",
                                        "Service",
                                        "text"
                                    ],
                                    [
                                        "total_number_of_containers",
                                        "# Containers",
                                        "number"
                                    ],
                                    [
                                        "total_weight",
                                        "Total Weight",
                                        "text"
                                    ],
                                    [
                                        "total_volume",
                                        "Total Volume",
                                        "text"
                                    ],
                                    [
                                        "total_package",
                                        "Total Packages",
                                        "text"
                                    ]
                                ].map(([key, label, type])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            label,
                                            ":",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: type,
                                                value: jsonData.shipment[key] || '',
                                                onChange: handleChange("shipment", key),
                                                className: "border rounded p-1 w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 586,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 584,
                                        columnNumber: 15
                                    }, this)),
                                [
                                    [
                                        "date_of_release",
                                        "Date of Release"
                                    ],
                                    [
                                        "shipped_on_board_date",
                                        "On Board Date"
                                    ]
                                ].map(([key, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block",
                                        children: [
                                            label,
                                            ":",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: jsonData.shipment[key] || '',
                                                onChange: handleChange("shipment", key),
                                                className: "border rounded p-1 w-full"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 600,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 598,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 562,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 560,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-2",
                            children: "Freight Charges"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 667,
                            columnNumber: 11
                        }, this),
                        Array.isArray(jsonData.freight_charges) && jsonData.freight_charges.map((charge, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-4 border rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: [
                                                    "Item ",
                                                    idx + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 674,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleDeleteFreightCharge(idx),
                                                className: "px-2 py-1 bg-red-600 text-white rounded",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 675,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 673,
                                        columnNumber: 17
                                    }, this),
                                    [
                                        [
                                            "charge_type",
                                            "Charge Type",
                                            "text"
                                        ],
                                        [
                                            "rate",
                                            "Rate",
                                            "number"
                                        ],
                                        [
                                            "quantity",
                                            "Quantity",
                                            "number"
                                        ],
                                        [
                                            "unit",
                                            "Unit (Currency)",
                                            "text"
                                        ],
                                        [
                                            "amount",
                                            "Amount",
                                            "number"
                                        ]
                                    ].map(([key, label, type])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block mb-2",
                                            children: [
                                                label,
                                                ":",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: type,
                                                    value: charge[key] ?? "",
                                                    onChange: handleArrayChange("freight_charges", idx, key),
                                                    className: "ml-2 border px-2 py-1 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/RawJsonForm.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 692,
                                            columnNumber: 19
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-medium mb-1",
                                                children: "Payment Terms"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 709,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "inline-flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: `prepaidOrCollect-${idx}`,
                                                                value: "prepaid",
                                                                checked: charge["prepaid or collect"] === "prepaid",
                                                                onChange: handleArrayChange("freight_charges", idx, "prepaid or collect"),
                                                                className: "form-radio h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                                lineNumber: 712,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2",
                                                                children: "Prepaid"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                                lineNumber: 724,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/RawJsonForm.tsx",
                                                        lineNumber: 711,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "inline-flex items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: `prepaidOrCollect-${idx}`,
                                                                value: "collect",
                                                                checked: charge["prepaid or collect"] === "collect",
                                                                onChange: handleArrayChange("freight_charges", idx, "prepaid or collect"),
                                                                className: "form-radio h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                                lineNumber: 728,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2",
                                                                children: "Collect"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                                lineNumber: 740,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/RawJsonForm.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 710,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 708,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/RawJsonForm.tsx",
                                lineNumber: 671,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleAddFreightCharge,
                            className: "mt-2 px-3 py-1 bg-green-600 text-white rounded",
                            children: "Add Freight Charge"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 748,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 666,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold mb-2",
                            children: "Containers"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 759,
                            columnNumber: 9
                        }, this),
                        Array.isArray(jsonData.containers) && jsonData.containers.map((container, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-4 border rounded",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-medium",
                                                children: [
                                                    "Container ",
                                                    idx + 1
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 764,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>handleDeleteContainer(idx),
                                                className: "px-2 py-1 bg-red-600 text-white rounded",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/components/RawJsonForm.tsx",
                                                lineNumber: 765,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/RawJsonForm.tsx",
                                        lineNumber: 763,
                                        columnNumber: 15
                                    }, this),
                                    [
                                        [
                                            "container_number",
                                            "Container Number",
                                            "text"
                                        ],
                                        [
                                            "seal_number",
                                            "Seal Number",
                                            "text"
                                        ],
                                        [
                                            "container_type",
                                            "Type",
                                            "text"
                                        ],
                                        [
                                            "number_of_packages",
                                            "# Packages",
                                            "number"
                                        ],
                                        [
                                            "package_uom",
                                            "UOM",
                                            "text"
                                        ],
                                        [
                                            "weight",
                                            "Weight",
                                            "number"
                                        ],
                                        [
                                            "weight_uom",
                                            "Weight UOM",
                                            "text"
                                        ],
                                        [
                                            "volume",
                                            "Volume",
                                            "number"
                                        ],
                                        [
                                            "volume_uom",
                                            "Volume UOM",
                                            "text"
                                        ],
                                        [
                                            "product_item_description",
                                            "Description",
                                            "text"
                                        ],
                                        [
                                            "product_item_hscode",
                                            "HS Code",
                                            "text"
                                        ]
                                    ].map(([key, label, type])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block mb-2",
                                            children: [
                                                label,
                                                ":",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: type,
                                                    value: container[key] ?? '',
                                                    onChange: handleArrayChange("containers", idx, key),
                                                    className: "ml-2 border px-2 py-1 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/RawJsonForm.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/components/RawJsonForm.tsx",
                                            lineNumber: 786,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, idx, true, {
                                fileName: "[project]/components/RawJsonForm.tsx",
                                lineNumber: 762,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleAddContainer,
                            className: "mt-2 px-3 py-1 bg-green-600 text-white rounded",
                            children: "Add Container"
                        }, void 0, false, {
                            fileName: "[project]/components/RawJsonForm.tsx",
                            lineNumber: 798,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 758,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    onClick: handleSubmit,
                    disabled: loading,
                    className: "mt-4 bg-blue-600 text-white px-4 py-2 rounded",
                    children: loading ? "Updating…" : "Update"
                }, void 0, false, {
                    fileName: "[project]/components/RawJsonForm.tsx",
                    lineNumber: 809,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/RawJsonForm.tsx",
            lineNumber: 491,
            columnNumber: 7
        }, this);
    }
}
_s(RawJsonForm, "ttICC5IfjjdYke9in2JrBR2vgHA=");
_c = RawJsonForm;
var _c;
__turbopack_context__.k.register(_c, "RawJsonForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// pages/index.tsx
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RawJsonForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/RawJsonForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function HomePage() {
    _s();
    const [selectedFiles, setSelectedFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pdfResults, setPdfResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    //const [jsonMap, setJsonMap]             = useState<Map<number, any>>(new Map());
    //const [savingId, setSavingId]           = useState<number|null>(null); // id currently being saved
    const handleFileChange = (e)=>{
        setErrorMsg(null);
        const files = e.target.files ? Array.from(e.target.files) : [];
        // Reject any non‐PDF files
        const bad = files.find((f)=>f.type !== "application/pdf");
        if (bad) {
            setErrorMsg(`“${bad.name}” isn’t a PDF.`);
            setSelectedFiles([]);
            return;
        }
        setSelectedFiles(files);
    };
    // for uploading the files 
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (selectedFiles.length === 0) {
            setErrorMsg("No files selected.");
            return;
        }
        setStatus("uploading");
        setErrorMsg(null);
        try {
            const uploads = selectedFiles.map(async (file)=>{
                const fd = new FormData();
                fd.append("file", file); //key is "file", value is the file
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: fd
                });
                if (!res.ok) {
                    const txt = await res.text();
                    throw new Error(txt || `Upload failed for ${file.name}`);
                }
                const json = await res.json();
                if (!json.success) {
                    throw new Error(json.message || `Upload failed for ${file.name}`);
                }
                return {
                    name: file.name,
                    fileUrl: json.fileUrl,
                    rawJson: json.rawJson,
                    fileType: json.fileType,
                    fileId: json.fileId,
                    id: json.id
                };
            });
            const results = await Promise.all(uploads);
            setPdfResults(results);
            // build the Map<id, rawJson>
            //setJsonMap(new Map(results.map(r => [r.id, r.rawJson])));
            setStatus("success");
        } catch (err) {
            setStatus("error");
            setErrorMsg(err.message);
        }
    };
    /**
   * POST updated JSON back to the backend for a single document.
   

    const handleSave = async (id: number) => {
      const jsonToSave = jsonMap.get(id);
      if (!jsonToSave) return;
  
      setSavingId(id);
      try {
        const res = await fetch("/api/upload/updateprisma", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, rawJson: jsonToSave }),
        });
        if (!res.ok) throw new Error(await res.text());
        const { success, data, message } = await res.json();
        if (!success) throw new Error(message || "Unknown error");
  
        // Replace pdfResults entry so UI stays in sync with DB
        setPdfResults(prev => prev.map(r => r.id === id ? { ...r, rawJson: data.rawJson } as PDFResult : r));
      } catch (err: any) {
        alert(`Failed to save document ${id}: ${err.message}`);
      } finally {
        setSavingId(null);
      }
    };
*/ /**
   * When RawJsonForm mutates its copy, bubble the change up into jsonMap.
   
   const handleJsonChange = useCallback((id: number, updated: any) => {
    setJsonMap(prev => {
      const next = new Map(prev);
      next.set(id, updated);
      return next;
    });
  }, []);
*/ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6",
                children: "Upload & Edit MBL PDFs"
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "file",
                        accept: "application/pdf",
                        multiple: true,
                        onChange: handleFileChange,
                        className: "block mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-red-600 mb-4",
                        children: errorMsg
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: status === "uploading",
                        className: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50",
                        children: status === "uploading" ? "Uploading…" : "Upload"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            pdfResults.map((doc)=>{
                const editableJson = doc.rawJson;
                const fileType = doc.fileType;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-semibold mb-4",
                            children: [
                                "Document: ",
                                doc.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row gap-6 h-[70vh]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-1/2 bg-white shadow rounded overflow-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("embed", {
                                        src: doc.fileUrl,
                                        type: "application/pdf",
                                        className: "w-full h-full"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:w-1/2 bg-white shadow rounded p-4 overflow-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$RawJsonForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        data: editableJson,
                                        docId: doc.id,
                                        //onChange={(newJson: any) => handleJsonChange(doc.id, newJson)}
                                        fileType: fileType
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 166,
                            columnNumber: 13
                        }, this)
                    ]
                }, doc.id, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 164,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_s(HomePage, "eSXUx9oEdDiLZncllgf3nhitP0A=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_2868681a._.js.map