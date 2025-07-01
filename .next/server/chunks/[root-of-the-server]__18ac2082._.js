module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/formidable [external] (formidable, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("formidable");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}}),
"[externals]/child_process [external] (child_process, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}}),
"[project]/pages/api/upload/index.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
// pages/api/upload/index.ts
// this is the api endpoint for the upload page
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/formidable [external] (formidable, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
// file path of extractors for different file types
const EXTRACTORS = {
    mbl: "./ai/mbl.py",
    hbl: "./ai/hbl.py"
};
// The Python script that classifies a raw PDF and prints a JSON object
// containing `{ "filetype": "…" }` to stdout.
const CLASSIFIER_SCRIPT = "./ai/whichtype.py";
const config = {
    api: {
        bodyParser: false
    }
};
async function handler(req, res) {
    // GET request: fetch all documents for the landing page
    if (req.method === "GET") {
        console.log("GET request received for landing page");
        try {
            // ← simple fetch of only the MblDocument table
            const docs = await prisma.mbl_Document.findMany();
            return res.status(200).json({
                success: true,
                data: docs
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: "Error fetching documents"
            });
        }
    }
    // Only allow POST
    if (req.method !== "POST") {
        res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
        return;
    }
    // Create a new Formidable form parser
    const form = new __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__["IncomingForm"]({
        keepExtensions: true,
        maxFileSize: 20 * 1024 * 1024
    });
    // Parse the incoming request — note: make this callback async so we can use await inside
    form.parse(req, async (err, _fields, files)=>{
        if (err) {
            console.error("❌ Formidable parse error:", err);
            res.status(500).json({
                success: false,
                message: "Error parsing form data: " + err.message
            });
            return;
        }
        // Extract the uploaded file; files.file can be undefined, a single File, or an array of File[]
        const maybeFile = files.file;
        if (!maybeFile) {
            console.error("⚠️  No file found in request");
            res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
            return;
        }
        // If it's an array, take the first; otherwise use it directly
        const file = Array.isArray(maybeFile) ? maybeFile[0] : maybeFile;
        let destPath;
        // STEP 1: Move the temp file into public/uploads/
        let safeName;
        try {
            const uploadsDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "uploads");
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(uploadsDir)) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(uploadsDir, {
                    recursive: true
                });
            }
            const timestamp = Date.now();
            const originalName = file.originalFilename || "uploaded.pdf";
            //safe name is the timestamp and the original name
            safeName = `${timestamp}-${originalName}`;
            //dest path is the uploads directory and the safe name
            destPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(uploadsDir, safeName);
            console.log("destPath is", destPath);
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].renameSync(file.filepath, destPath);
        } catch (moveErr) {
            console.error("❌ Failed to move uploaded PDF:", moveErr);
            res.status(500).json({
                success: false,
                message: "Could not save file."
            });
            return;
        }
        // STEP 2: Classify the PDF → detect file type
        const classify = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawnSync"])("python3", [
            CLASSIFIER_SCRIPT,
            destPath
        ], {
            encoding: "utf-8"
        });
        if (classify.error || classify.status !== 0) {
            console.error(classify.stderr.toString());
            return res.status(500).json({
                success: false,
                message: "File‑type classification failed"
            });
        }
        //get the file type from the classifier
        let detectedType;
        try {
            console.log("classify.stdout", classify.stdout);
            detectedType = classify.stdout.trim().toLowerCase();
            console.log("detectedType is ", detectedType);
        } catch  {
            return res.status(500).json({
                success: false,
                message: "Classifier returned invalid JSON"
            });
        }
        console.log("pass step 2");
        // STEP 2.5: read json
        let aiResult;
        const extractorScript = EXTRACTORS[detectedType];
        const extract = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawnSync"])("python3", [
            extractorScript,
            destPath
        ], {
            encoding: "utf-8"
        });
        if (extract.error || extract.status !== 0) {
            console.error(extract.stderr.toString());
            return res.status(500).json({
                success: false,
                message: "JSON extraction failed"
            });
        }
        // Each extractor writes a JSON file under <type>_json/<filename>.json
        const jsonDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), `${detectedType}_json`);
        const jsonOutputPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(jsonDir, `${safeName}.json`);
        console.log("jsonOutputPath is", jsonOutputPath);
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(jsonOutputPath)) {
            return res.status(500).json({
                success: false,
                message: "Extractor did not produce JSON output"
            });
        }
        aiResult = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(jsonOutputPath, "utf-8"));
        console.log("pass step 2.5");
        // STEP 3: Save info to database
        let action;
        action = "skipped";
        let doc;
        const publicUrl = `/uploads/${safeName}`;
        let fileid = "";
        if (detectedType === "mbl") {
            fileid = aiResult.shipment.mbl_number;
            const existing = await prisma.mbl_Document.findUnique({
                where: {
                    file_id: fileid
                }
            });
            if (existing) {
                console.log("File already exists, updating");
                doc = await prisma.mbl_Document.update({
                    where: {
                        id: existing.id
                    },
                    data: {
                        file_name: safeName,
                        rawJson: aiResult,
                        file_Url: publicUrl,
                        file_id: fileid
                    }
                });
                action = "updated";
            } else {
                doc = await prisma.mbl_Document.create({
                    data: {
                        file_name: safeName,
                        rawJson: aiResult,
                        file_Url: publicUrl,
                        file_id: fileid
                    }
                });
                action = "created";
            }
        } else if (detectedType === "hbl") {
            fileid = aiResult.shipment.hbl_number;
            const existing = await prisma.hbl_Document.findUnique({
                where: {
                    file_id: fileid
                }
            });
            if (existing) {
                console.log("File already exists, updating");
                doc = await prisma.hbl_Document.update({
                    where: {
                        id: existing.id
                    },
                    data: {
                        file_name: safeName,
                        rawJson: aiResult,
                        file_Url: publicUrl,
                        file_id: fileid,
                        mbl_Number: aiResult.shipment.mbl_number
                    }
                });
                action = "updated";
            } else {
                doc = await prisma.hbl_Document.create({
                    data: {
                        file_name: safeName,
                        rawJson: aiResult,
                        file_Url: publicUrl,
                        file_id: fileid,
                        mbl_Number: aiResult.shipment.mbl_number
                    }
                });
                action = "created";
            }
        }
        if (fileid == "" || action == "skipped" || detectedType == "") {
            return res.status(500).json({
                success: false,
                message: "something went wrong in step 3"
            });
        }
        //final step: return the response
        res.status(200).json({
            success: true,
            documentId: doc.id,
            fileUrl: publicUrl,
            rawJson: aiResult,
            fileType: detectedType,
            fileId: doc.file_id,
            id: doc.id,
            action: action
        });
        return;
    /*
    try {
      let doc;
      const publicUrl = `/uploads/${safeName}`;


      const existing = await prisma.document.findUnique({
        where: { fileid: fileid as string },
      });

      if(existing){
        console.log("File already exists, updating");
        doc = await prisma.document.update({
          where: { id: existing.id },
          data: {
            filename: safeName,
            rawJson: aiResult,
            fileUrl: publicUrl,
            filetype: detectedType,
          },
        });
        action = "updated";
      } else {//Document
        doc = await prisma.document.create({
          data: {
            filename: safeName,
            rawJson: aiResult,
            fileUrl: publicUrl,
            filetype: detectedType, //mbl,hbl...
            fileid: fileid,
          },
        });
        action = "created";
      }





// insert more data into prisma here




        console.log("✅ All steps succeeded; sending success response")
        console.log("doc.id", doc.id);
        res.status(200).json({ success: true, documentId: doc.id , fileUrl:  publicUrl, rawJson: aiResult,fileType: doc.filetype, fileId: doc.fileid, id: doc.id, action: action});
        return;
      } catch (dbErr: any) {
        console.error("❌ Database save error:", dbErr);
        res
          .status(500)
          .json({ success: false, message: "Failed to save to database" });
        return;
      }
*/ });
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
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/upload/index.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$upload$2f$index$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/api/upload/index.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$upload$2f$index$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$upload$2f$index$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$upload$2f$index$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$upload$2f$index$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/upload/index",
        pathname: "/api/upload",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$upload$2f$index$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__18ac2082._.js.map