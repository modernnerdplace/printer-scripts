//===============================================================================
//             Copyright(c) Hewlett - Packard Development Company L.P.	       
//                            All rights reserved.     		                  
//===============================================================================
// constraint.js for HP Smart Printing driver.
//
// Version: "1.01.1"
//
var pskPrefix = "psk";
var pskNs = "http://schemas.microsoft.com/windows/2003/08/printing/printschemakeywords";
var pskV11Ns = "http://schemas.microsoft.com/windows/2013/05/printing/printschemakeywordsv11";
var psfPrefix = "psf";
var psfNs = "http://schemas.microsoft.com/windows/2003/08/printing/printschemaframework";
var xsdPrefix = "xsd";
var xsdNs = "http://www.w3.org/2001/XMLSchema";
var xsiPrefix = "xsi";
var xsiNs = "http://www.w3.org/2001/XMLSchema-instance";
var vendorDefinedPrefix = "ns0000";
var venderDefinedNs = "http://schemas.hp.com/ptpc/2006/1";
var namespaces = {};
namespaces[psfPrefix] = psfNs;
namespaces[pskPrefix] = pskNs;
namespaces[xsdPrefix] = xsdNs;
namespaces[xsiPrefix] = xsiNs;
namespaces[vendorDefinedPrefix] = venderDefinedNs;
var prefixes = {};
prefixes[psfNs] = psfPrefix;
prefixes[pskNs] = pskPrefix;
prefixes[xsdNs] = xsdPrefix;
prefixes[xsiNs] = xsiPrefix;
prefixes[venderDefinedNs] = vendorDefinedPrefix;
var NODE_ELEMENT = 1;
var NODE_ATTRIBUTE = 2;
var PREFIX_CANONICAL = "canonical";
var PREFIX_REAL = "real";

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

var OutputBinType = {
    PC_NoOutputBin: 0,
    PC_StandardBin: 1,
    PC_EngineOptionalBin1: 2,
    PC_AlternateBinFaceUp: 4,
    PC_OutputBin1: 8,
    PC_OutputBin2: 16,
    PC_OutputBin3: 32,
    PC_OutputBin4: 64,
    PC_OutputBin5: 128,
    PC_OutputBin6: 256,
    PC_OutputBin7: 512,
    PC_OutputBin8: 1024,
    PC_STACKER: 2048,
    PC_SEPERATOR: 4096,
    PC_COLLATOR: 8192
};


var Product_type = {
    Product_PCL6: 0,
    Product_PCL3: 1,
    Product_PCLmS: 2,
    Product_PDF: 3,
    Product_PS: 4,
    Product_HyPCL6: 5
    
};

var ProductBy = {
    Unknown: 0,
    Model: 1,
    CID: 2
};

var Output_Direction = {
    FACEUP: 0,
    FACEDOWN: 1,
    BOTH: 2
};

function getPrintCaps() {
    var printCaps = {
        features: [{ inGPD: true, name: "psk:PageScaling", dispName: "IDS_SCALIING", options: [{ name: "psk:None", dispName: "IDS_ACTUAL_SIZE" }, { name: "ns0000:FitApplicationImageableSizeToPageImageableSize", dispName: "IDS_PRINT_DOC_ON" }, { name: "psk:CustomSquare", dispName: "IDS_SCALE_TO_FIT", scoredProps: [{ name: "psk:Scale", paramRef: "psk:PageScalingScale" }] }], subFeatures: [{ inGPD: false, name: "psk:ScaleOffsetAlignment", dispName: "IDS_WM_OFFSET_FROM", options: [{ name: "psk:BottomCenter", dispName: "IDS_BOTTOM" }, { name: "psk:BottomLeft", dispName: "IDS_BOTTOM_LEFT" }, { name: "psk:BottomRight", dispName: "IDS_BOTTOM_RIGHT" }, { name: "psk:Center", dispName: "IDS_CENTER" }, { name: "psk:RightCenter", dispName: "IDS_RIGHT" }, { name: "psk:LeftCenter", dispName: "IDS_LEFT" }, { name: "psk:TopCenter", dispName: "IDS_TOP" }, { name: "psk:TopLeft", dispName: "IDS_TOP_LEFT" }, { name: "psk:TopRight", dispName: "IDS_TOP_RIGHT" }] }, { inGPD: false, name: "ns0000:TargetMediaSize1", dispName: "IDS_SCALING_PAPERSIZE", options: [{ scoredProps: [{ name: "ns0000:PageScalingTargetMediaSizeName", paramRef: "ns0000:PageScalingTargetMediaSizeName" }, { name: "ns0000:PageScalingTargetMediaSizeWidth", paramRef: "ns0000:PageScalingTargetMediaSizeWidth" }, { name: "ns0000:PageScalingTargetMediaSizeHeight", paramRef: "ns0000:PageScalingTargetMediaSizeHeight" }] }] }] }, { inGPD: true, name: "ns0000:JobStoragePrivateSecure", dispName: "IDS_MAKE_JOB_PRIVATE_SECURE", subFeatures: [{ inGPD: false, name: "ns0000:JobStorageStore", dispName: "IDS_RETAIN_JOB_AFTER_PRINTING", options: [{ name: "ns0000:Off", dispName: "Off" }, { name: "ns0000:On", dispName: "On" }] }] }, { inGPD: true, name: "psk:PageWatermark", dispName: "IDS_WATERMARKS", options: [{ name: "psk:Text", dispName: "IDS_TEXT", scoredProps: [{ name: "psk:Text", paramRef: "psk:PageWatermarkTextText" }, { name: "ns0000:Font", paramRef: "ns0000:PageWatermarkTextFont" }, { name: "ns0000:Outline", paramRef: "ns0000:PageWatermarkTextOutline" }, { name: "ns0000:Bold", paramRef: "ns0000:PageWatermarkTextBold" }, { name: "ns0000:Italic", paramRef: "ns0000:PageWatermarkTextItalic" }, { name: "psk:FontSize", paramRef: "psk:PageWatermarkTextFontSize" }, { name: "psk:Angle", paramRef: "psk:PageWatermarkTextAngle" }, { name: "psk:FontColor", paramRef: "psk:PageWatermarkTextColor" }, { name: "psk:Transparency", paramRef: "psk:PageWatermarkTransparency" }, { name: "ns0000:RightToLeft", paramRef: "ns0000:PageWatermarkTextRightToLeft" }, { name: "ns0000:Shade", paramRef: "ns0000:PageWatermarkTextShade" }] }, { name: "ns0000:Image", dispName: "IDS_IMAGE", scoredProps: [{ name: "ns0000:File", paramRef: "ns0000:PageWatermarkImageFile" }, { name: "ns0000:ScaleWidth", paramRef: "ns0000:PageWatermarkImageScaleWidth" }, { name: "ns0000:ScaleHeight", paramRef: "ns0000:PageWatermarkImageScaleHeight" }, { name: "ns0000:Transparency", paramRef: "psk:PageWatermarkTransparency" }] }, { name: "ns0000:TemplateText", dispName: "IDS_TEMPLATE_TEXT", scoredProps: [{ name: "psk:Text", paramRef: "psk:PageWatermarkTextText" }, { name: "ns0000:Font", paramRef: "ns0000:PageWatermarkTextFont" }, { name: "ns0000:Outline", paramRef: "ns0000:PageWatermarkTextOutline" }, { name: "ns0000:Bold", paramRef: "ns0000:PageWatermarkTextBold" }, { name: "ns0000:Italic", paramRef: "ns0000:PageWatermarkTextItalic" }, { name: "psk:FontSize", paramRef: "psk:PageWatermarkTextFontSize" }, { name: "psk:Angle", paramRef: "psk:PageWatermarkTextAngle" }, { name: "psk:FontColor", paramRef: "psk:PageWatermarkTextColor" }, { name: "psk:Transparency", paramRef: "psk:PageWatermarkTransparency" }, { name: "ns0000:RightToLeft", paramRef: "ns0000:PageWatermarkTextRightToLeft" }, { name: "ns0000:Shade", paramRef: "ns0000:PageWatermarkTextShade" }] }], subFeatures: [{ inGPD: false, name: "ns0000:Placement", dispName: "IDS_WM_OFFSET_FROM", options: [{ name: "ns0000:Center", dispName: "IDS_CENTER_ON_PAGE", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }, { name: "ns0000:Top", dispName: "IDS_TOP", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }, { name: "ns0000:Right", dispName: "IDS_RIGHT_EDGE", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }, { name: "ns0000:TopRight", dispName: "IDS_TOP_RIGHT", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }, { name: "ns0000:BottomRight", dispName: "IDS_BOTTOM_RIGHT", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }, { name: "ns0000:Bottom", dispName: "IDS_BOTTOM", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }, { name: "ns0000:BottomLeft", dispName: "IDS_BOTTOM_LEFT", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }, { name: "ns0000:Left", dispName: "IDS_LEFT_EDGE", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }, { name: "ns0000:TopLeft", dispName: "IDS_TOP_LEFT", scoredProps: [{ name: "ns0000:OffsetWidth", paramRef: "ns0000:PageWatermarkPlacementOffsetWidth" }, { name: "ns0000:OffsetHeight", paramRef: "ns0000:PageWatermarkPlacementOffsetHeight" }] }] }, { inGPD: false, name: "psk:Layering", dispName: "IDS_WM_LAYERING", options: [{ name: "psk:Overlay", dispName: "IDS_WM_OVERLAY" }, { name: "psk:Underlay", dispName: "IDS_WM_UNDERLAY" }] }, { inGPD: false, name: "ns0000:Usage", dispName: "IDS_STYLE_USAGE", options: [{ name: "ns0000:AllPages", dispName: "IDS_ALL_PAGES" }, { name: "ns0000:FirstPageOnly", dispName: "IDS_FIRST_PAGE_ONLY" }, { name: "ns0000:AllExceptFirstPage", dispName: "IDS_ALL_EXCEPT_FIRST_PAGE" }] }] }, { inGPD: true, name: "psk:DocumentBinding", options: [{ name: "psk:None" }, { name: "psk:Booklet", scoredProps: [{ name: "psk:BindingGutter", paramRef: "psk:DocumentBindingGutter" }, { name: "ns0000:SignaturePages", paramRef: "ns0000:DocumentBookletSignaturePages" }] }, { name: "ns0000:JapaneseBooklet", scoredProps: [{ name: "psk:BindingGutter", paramRef: "psk:DocumentBindingGutter" }, { name: "ns0000:SignaturePages", paramRef: "ns0000:DocumentBookletSignaturePages" }] }] }, { inGPD: false, name: "ns0000:JobUserResolution", dispName: "IDS_PRINT_QUALITY", options: [{ name: "ns0000:Normal", dispName: "Normal", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:FineLines_MaxDPI", dispName: "FineLines", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:QuickView_Draft", dispName: "QuickView", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:Enhanced", dispName: "Enhanced", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:EconoMode", dispName: "EconoMode", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:GeneralOffice_Draft", dispName: "GeneralOffice", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:Professional", dispName: "Professional", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:Presentation", dispName: "Presentation", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:MaxDPI", dispName: "Maximumdpi", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:QuickDraft", dispName: "QuickDraft", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:HPStandard", dispName: "HPStandard", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:Standard", dispName: "Standard", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:Premium", dispName: "Premium", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:Detailed", dispName: "Detailed", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:HPHighSpeed", dispName: "HPHighSpeed", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:HPColorSave", dispName: "HPColorSave", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:HPTonerSave", dispName: "HPTonerSave", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:HighSpeed", dispName: "High Speed", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:Draft", dispName: "Draft", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:Best", dispName: "Best", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:ColorSave", dispName: "ColorSave", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }, { name: "ns0000:TonerSave", dispName: "TonerSave", scoredProps: [{ name: "ns0000:PrintQualityMode", paramRef: "ns0000:JobPrintQualityMode" }] }] }, { inGPD: true, name: "ns0000:JobFinishingFolding", dispName: "IDS_FOLD", options: [{ name: "ns0000:FoldOff", dispName: "IDS_NONE" }, { name: "ns0000:InwardCFoldLeftOrUpSet", dispName: "IDS_INWARD_CFOLD_LEFT_OR_TOP", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:InwardCFoldRightOrDownSet", dispName: "IDS_INWARD_CFOLD_RIGHT_OR_DOWN", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:OutwardCFoldLeftOrUpSet", dispName: "IDS_OUTWARD_CFOLD_LEFT_OR_TOP", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:OutwardCFoldRightOrDownSet", dispName: "IDS_OUTWARD_CFOLD_RIGHT_OR_DOWN", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:InwardVFoldSet", dispName: "IDS_INWARD_VFOLD", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:OutwardVFoldSet", dispName: "IDS_OUTWARD_VFOLD", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:InwardCFoldLeftOrUpMopy", dispName: "IDS_INWARD_CFOLD_LEFT_OR_TOP", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:InwardCFoldRightOrDownMopy", dispName: "IDS_INWARD_CFOLD_RIGHT_OR_DOWN", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:OutwardCFoldLeftOrUpMopy", dispName: "IDS_OUTWARD_CFOLD_LEFT_OR_TOP", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:OutwardCFoldRightOrDownMopy", dispName: "IDS_OUTWARD_CFOLD_RIGHT_OR_DOWN", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:InwardVFoldMopy", dispName: "IDS_INWARD_VFOLD", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }, { name: "ns0000:OutwardVFoldMopy", dispName: "IDS_OUTWARD_VFOLD", scoredProps: [{ name: "ns0000:FoldSheetsPerSet", paramRef: "ns0000:DocumentFoldSheetsPerSet" }] }] }, { inGPD: true, name: "psk:JobDuplexAllDocumentsContiguously", dispName: "IDS_TWO_SIDED_PRINTING", pickMany: false, options: [{ name: "psk:OneSided", dispName: "NONE_DISPLAY" }, { name: "psk:TwoSidedLongEdge", dispName: "IDS_LONG_EDGE_STANDARD" }, { name: "psk:TwoSidedShortEdge", dispName: "IDS_SHORT_EDGE" }], subFeatures: [{ inGPD: false, name: "ns0000:JobManualDuplexProperties", dispName: "JobManualDuplexProperties", pickMany: false, options: [{ name: "ns0000:None", dispName: "IDS_NONE" }, { name: "ns0000:ManualDuplexProperties", dispName: "ManualDuplexProperties" }] }] }, { inGPD: true, name: "ns0000:JobManualDuplex", dispName: "IDS_MANUAL_DUPLEX", pickMany: false, options: [{ name: "ns0000:ManualSimplex", dispName: "ManualSimplex", scoredProps: [{ name: "ns0000:ManualDuplexInstructionTextHeader", paramRef: "ns0000:JobManualDuplexInstructionTextHeader" }, { name: "ns0000:ManualDuplexInstructionText1", paramRef: "ns0000:JobManualDuplexInstructionText1" }, { name: "ns0000:ManualDuplexInstructionText2", paramRef: "ns0000:JobManualDuplexInstructionText2" }, { name: "ns0000:ManualDuplexInstructionText3", paramRef: "ns0000:JobManualDuplexInstructionText3" }, { name: "ns0000:ManualDuplexInstructionImage1", paramRef: "ns0000:JobManualDuplexInstructionImage1" }, { name: "ns0000:ManualDuplexInstructionImage2", paramRef: "ns0000:JobManualDuplexInstructionImage2" }, { name: "ns0000:ManualDuplexInstructionImage3", paramRef: "ns0000:JobManualDuplexInstructionImage3" }] }, { name: "ns0000:ManualLongEdge", dispName: "ManualLongEdge", scoredProps: [{ name: "ns0000:ManualDuplexInstructionTextHeader", paramRef: "ns0000:JobManualDuplexInstructionTextHeader" }, { name: "ns0000:ManualDuplexInstructionText1", paramRef: "ns0000:JobManualDuplexInstructionText1" }, { name: "ns0000:ManualDuplexInstructionText2", paramRef: "ns0000:JobManualDuplexInstructionText2" }, { name: "ns0000:ManualDuplexInstructionText3", paramRef: "ns0000:JobManualDuplexInstructionText3" }, { name: "ns0000:ManualDuplexInstructionImage1", paramRef: "ns0000:JobManualDuplexInstructionImage1" }, { name: "ns0000:ManualDuplexInstructionImage2", paramRef: "ns0000:JobManualDuplexInstructionImage2" }, { name: "ns0000:ManualDuplexInstructionImage3", paramRef: "ns0000:JobManualDuplexInstructionImage3" }] }, { name: "ns0000:ManualShortEdge", dispName: "ManualShortEdge", scoredProps: [{ name: "ns0000:ManualDuplexInstructionTextHeader", paramRef: "ns0000:JobManualDuplexInstructionTextHeader" }, { name: "ns0000:ManualDuplexInstructionText1", paramRef: "ns0000:JobManualDuplexInstructionText1" }, { name: "ns0000:ManualDuplexInstructionText2", paramRef: "ns0000:JobManualDuplexInstructionText2" }, { name: "ns0000:ManualDuplexInstructionText3", paramRef: "ns0000:JobManualDuplexInstructionText3" }, { name: "ns0000:ManualDuplexInstructionImage1", paramRef: "ns0000:JobManualDuplexInstructionImage1" }, { name: "ns0000:ManualDuplexInstructionImage2", paramRef: "ns0000:JobManualDuplexInstructionImage2" }, { name: "ns0000:ManualDuplexInstructionImage3", paramRef: "ns0000:JobManualDuplexInstructionImage3" }] }] }, { inGPD: true, name: "ns0000:JobTelemetryUserOption", dispName: "TelemetryUserOption", pickMany: false, options: [{ name: "ns0000:OptOut", dispName: "OptOut" }, { name: "ns0000:OptIn", dispName: "OptIn", scoredProps: [{ name: "ns0000:EventJobRepoPath", paramRef: "ns0000:DocumentEventJobRepoPath" }, { name: "ns0000:appDeployedUUID", paramRef: "ns0000:DocumentappDeployedUUID" }, { name: "ns0000:appDeployedID", paramRef: "ns0000:DocumentappDeployedID" }, { name: "ns0000:appStackType", paramRef: "ns0000:DocumentappStackType" }], props: [{ name: "ns0000:JobQueueType", value: "UPD_Queue", type: "xsd:string" }] }] }],
        paramDefs: [{ name: "ns0000:JobStoragePasswordMaxLength", props: [{ name: "psk:DisplayName", value: "JobStoragePasswordMaxLength", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "256", type: "xsd:integer" }, { name: "psf:MinValue", value: "4", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "32", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "numbers", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobStoragePasswordMinLength", props: [{ name: "psk:DisplayName", value: "JobStoragePasswordMinLength", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "256", type: "xsd:integer" }, { name: "psf:MinValue", value: "4", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "4", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "numbers", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobStoragePasswordIsAlphaNumeric", props: [{ name: "psk:DisplayName", value: "JobStoragePasswordIsAlphaNumeric", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "false", type: "xsd:string" }, { name: "psf:MinLength", value: "0", type: "xsd:integer" }, { name: "psf:MaxLength", value: "64", type: "xsd:integer" }, { name: "psf:UnitType", value: "boolean", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobExtPT", props: [{ name: "psk:DisplayName", value: "ExtPT", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "0", type: "xsd:integer" }, { name: "psf:MaxLength", value: "10240", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageScalingTargetMediaSizeName", props: [{ name: "psk:DisplayName", value: "PageScalingTargetMediaSizeName", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "ns0000:UsePageMediaSize", type: "xsd:string" }, { name: "psf:MinLength", value: "0", type: "xsd:integer" }, { name: "psf:MaxLength", value: "128", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageScalingTargetMediaSizeWidth", props: [{ name: "psk:DisplayName", value: "PageScalingTargetMediaSizeWidth", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "319997", type: "xsd:integer" }, { name: "psf:MinValue", value: "98001", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "98001", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "microns", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageScalingTargetMediaSizeHeight", props: [{ name: "psk:DisplayName", value: "PageScalingTargetMediaSizeHeight", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "457009", type: "xsd:integer" }, { name: "psf:MinValue", value: "139996", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "139996", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "microns", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "psk:PageScalingScale", props: [{ name: "psk:DisplayName", value: "IDS_WM_SCALE_RANGE", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "100", type: "xsd:integer" }, { name: "psf:MaxValue", value: "400", type: "xsd:integer" }, { name: "psf:MinValue", value: "25", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }, { name: "psf:UnitType", value: "percent", type: "xsd:string" }] }, { name: "ns0000:PageWatermarkName", props: [{ name: "psk:DisplayName", value: "IDS_WM_NAME", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "psk:PageWatermarkTextText", props: [{ name: "psk:DisplayName", value: "IDS_WM_TEXT", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "Confidential", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "63", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkTextFont", props: [{ name: "psk:DisplayName", value: "IDS_FONT", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "TimesNewRoman", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "31", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkTextOutline", props: [{ name: "psk:DisplayName", value: "OutlineOnly", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "1", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "boolean", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkTextBold", props: [{ name: "psk:DisplayName", value: "Bold", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "1", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "boolean", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkTextItalic", props: [{ name: "psk:DisplayName", value: "Italic", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "1", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "boolean", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "psk:PageWatermarkTextFontSize", props: [{ name: "psk:DisplayName", value: "IDS_WM_FONT_SIZE", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "300", type: "xsd:integer" }, { name: "psf:MinValue", value: "4", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "72", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "points", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "psk:PageWatermarkTextAngle", props: [{ name: "psk:DisplayName", value: "IDS_ANGLE", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "359", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "45", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "degrees", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "psk:PageWatermarkTextColor", props: [{ name: "psk:DisplayName", value: "IDS_FONT_COLOR", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "#FF000000", type: "xsd:string" }, { name: "psf:MinLength", value: "9", type: "xsd:integer" }, { name: "psf:MaxLength", value: "9", type: "xsd:integer" }, { name: "psf:UnitType", value: "sRGB", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "psk:PageWatermarkTransparency", props: [{ name: "psk:DisplayName", value: "IDS_WM_TRANSPARENCY", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "100", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "50", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "percent", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkTextRightToLeft", props: [{ name: "psk:DisplayName", value: "Angle", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "1", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "boolean", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkImageFile", props: [{ name: "psk:DisplayName", value: "IDS_WM_IMAGE", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "260", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkImageScaleWidth", props: [{ name: "psk:DisplayName", value: "IDS_WM_SCALE_RANGE", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "400", type: "xsd:integer" }, { name: "psf:MinValue", value: "25", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "100", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "percent", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkImageScaleHeight", props: [{ name: "psk:DisplayName", value: "ScaleHeight", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "400", type: "xsd:integer" }, { name: "psf:MinValue", value: "25", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "100", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "percent", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkPlacementOffsetWidth", props: [{ name: "psk:DisplayName", value: "IDS_WM_HORIZONTAL_OFFSET", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "500000", type: "xsd:integer" }, { name: "psf:MinValue", value: "-500000", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "microns", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkPlacementOffsetHeight", props: [{ name: "psk:DisplayName", value: "IDS_WM_VERTICAL_OFFSET", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "500000", type: "xsd:integer" }, { name: "psf:MinValue", value: "-500000", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "microns", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageWatermarkTextShade", props: [{ name: "psk:DisplayName", value: "IDS_WM_SHADE", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "255", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "128", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "level", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "psk:DocumentBindingGutter", props: [{ name: "psk:DisplayName", value: "ShiftFromBinding", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "250000", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "microns", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:DocumentBookletSignaturePages", props: [{ name: "psk:DisplayName", value: "SignaturePages", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "250000", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:Multiple", value: "4", type: "xsd:integer" }, { name: "psf:UnitType", value: "pages", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobStoragePIN", props: [{ name: "psk:DisplayName", value: "IDS_PIN", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "4", type: "xsd:integer" }, { name: "psf:MaxLength", value: "12", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobStoragePassword", props: [{ name: "psk:DisplayName", value: "IDS_PASSWORD", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "4", type: "xsd:integer" }, { name: "psf:MaxLength", value: "128", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageMediaSizeCustomSizeName", props: [{ name: "psk:DisplayName", value: "CustomName", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "0", type: "xsd:integer" }, { name: "psf:MaxLength", value: "128", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:DocumentFoldSheetsPerSet", props: [{ name: "psk:DisplayName", value: "DocumentFoldSheetsPerSet", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:MaxValue", value: "99999", type: "xsd:integer" }, { name: "psf:MinValue", value: "1", type: "xsd:integer" }, { name: "psf:DefaultValue", value: "1", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "pages", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobManualDuplexInstructionTextHeader", props: [{ name: "psk:DisplayName", value: "ManualDuplexInstructionTextHeader", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobManualDuplexInstructionText1", props: [{ name: "psk:DisplayName", value: "ManualDuplexInstructionText1", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobManualDuplexInstructionText2", props: [{ name: "psk:DisplayName", value: "ManualDuplexInstructionText2", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobManualDuplexInstructionText3", props: [{ name: "psk:DisplayName", value: "ManualDuplexInstructionText3", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobManualDuplexInstructionImage1", props: [{ name: "psk:DisplayName", value: "ManualDuplexInstructionImage1", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobManualDuplexInstructionImage2", props: [{ name: "psk:DisplayName", value: "ManualDuplexInstructionImage2", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobManualDuplexInstructionImage3", props: [{ name: "psk:DisplayName", value: "ManualDuplexInstructionImage3", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:DocumentEventJobRepoPath", props: [{ name: "psk:DisplayName", value: "EventJobRepoPath", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:DocumentappDeployedUUID", props: [{ name: "psk:DisplayName", value: "appDeployedUUID", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "128", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:DocumentappDeployedID", props: [{ name: "psk:DisplayName", value: "appDeployedID", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "128", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:DocumentappStackType", props: [{ name: "psk:DisplayName", value: "appStackType", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "Prod", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "32", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobOutputBinDirection", props: [{ name: "psk:DisplayName", value: "JobOutputBinDirection", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "FACEDOWN", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:DocumentNUpGutter", props: [{ name: "psk:DisplayName", value: "DocumentNUpGutter", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "0", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:MaxValue", value: "250000", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "microns", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobPrintQualityMode", props: [{ name: "psk:DisplayName", value: "JobPrintQualityMode", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:integer", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "1", type: "xsd:integer" }, { name: "psf:MinValue", value: "0", type: "xsd:integer" }, { name: "psf:MaxValue", value: "7", type: "xsd:integer" }, { name: "psf:Multiple", value: "1", type: "xsd:integer" }, { name: "psf:UnitType", value: "enum", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageMediaTypePrev", props: [{ name: "psk:DisplayName", value: "PageMediaTypePrev", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "psk:Plain", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageInputBinPrev", props: [{ name: "psk:DisplayName", value: "PageInputBinPrev", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "ns0000:UsePrinterSetting", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:JobUserResolutionPrev", props: [{ name: "psk:DisplayName", value: "JobUserResolutionPrev", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "ns0000:HPS_Normal", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }, { name: "ns0000:PageBorderlessPrev", props: [{ name: "psk:DisplayName", value: "PageBorderlessPrev", type: "xsd:string" }, { name: "psf:DataType", value: "xsd:string", type: "xsd:QName" }, { name: "psf:DefaultValue", value: "psk:None", type: "xsd:string" }, { name: "psf:MinLength", value: "1", type: "xsd:integer" }, { name: "psf:MaxLength", value: "256", type: "xsd:integer" }, { name: "psf:UnitType", value: "characters", type: "xsd:string" }, { name: "psf:Mandatory", value: "psk:Conditional", type: "xsd:QName" }] }]
    };
    return printCaps;
}

//Update ADMXJsonString property in driver property bag if anything changes here
function getADFeatures() {
    var ADFeatures = [{ "Name": "GrayscaleDefault", "QueuePropertyBag": { "DeviceSettingKey": "Config:CONFIG_ColorOrMonoPrinter", "Key": "Config:ColorOrMonoPrinter", "Value": "ColorPrinter" }, "Values": { "0": { "FeatureName": "psk:PageOutputColor", "OptionName": "psk:Color", "DriverDefault": true, "Locked": false, "ScoredProperties": [{ "Name": "psk:DeviceBitsPerPixel", "Value": 24, "Type": "xsd:integer" }, { "Name": "psk:DriverBitsPerPixel", "Value": 1, "Type": "xsd:integer" }] }, "1": { "FeatureName": "psk:PageOutputColor", "OptionName": "psk:Monochrome", "DriverDefault": false, "Locked": false, "ScoredProperties": [{ "Name": "psk:DeviceBitsPerPixel", "Value": 8, "Type": "xsd:integer" }, { "Name": "psk:DriverBitsPerPixel", "Value": 1, "Type": "xsd:integer" }] }, "101": { "FeatureName": "psk:PageOutputColor", "OptionName": "psk:Monochrome", "DriverDefault": false, "Locked": true, "ScoredProperties": [{ "Name": "psk:DeviceBitsPerPixel", "Value": 8, "Type": "xsd:integer" }, { "Name": "psk:DriverBitsPerPixel", "Value": 1, "Type": "xsd:integer" }] } } }, { "Name": "DuplexDefault", "QueuePropertyBag": { "DeviceSettingKey": "Config:CONFIG_DuplexMode", "Key": "Config:DuplexUnit", "Value": "Installed" }, "Values": { "0": { "QueuePropertyBag": { "Key": "Config:DuplexByDefault", "Values": { "disable": "psk:OneSided", "enable": "psk:TwoSidedLongEdge" } }, "FeatureName": "psk:JobDuplexAllDocumentsContiguously", "OptionName": "psk:OneSided", "DriverDefault": true, "Locked": false }, "1": { "FeatureName": "psk:JobDuplexAllDocumentsContiguously", "OptionName": "psk:TwoSidedLongEdge", "DriverDefault": false, "Locked": false }, "2": { "FeatureName": "psk:JobDuplexAllDocumentsContiguously", "OptionName": "psk:TwoSidedShortEdge", "DriverDefault": false, "Locked": false }, "101": { "FeatureName": "psk:JobDuplexAllDocumentsContiguously", "OptionName": "psk:TwoSidedLongEdge", "DriverDefault": false, "Locked": true }, "102": { "FeatureName": "psk:JobDuplexAllDocumentsContiguously", "OptionName": "psk:TwoSidedShortEdge", "DriverDefault": false, "Locked": true } } }, { "Name": "PrintQuality", "Values": { "1": { "FeatureName": "ns0000:JobUserResolution", "OptionName": "ns0000:PQEconomode,ns0000:EconoMode,ns0000:HPTonerSave,ns0000:TonerSave", "DriverDefault": false, "Locked": false }, "2": { "FeatureName": "ns0000:JobUserResolution", "OptionName": "ns0000:PQDraft,ns0000:PQDraftLaser,ns0000:PQDraftPageWide,ns0000:HPS_Draft,ns0000:QuickView_Draft,ns0000:GeneralOffice_Draft,ns0000:QuickDraft,ns0000:Draft", "DriverDefault": false, "Locked": false }, "3": { "FeatureName": "ns0000:JobUserResolution", "OptionName": "ns0000:PQNormal,ns0000:PQNormalLaser,ns0000:PQNormalPageWide,ns0000:HPS_Normal,ns0000:Normal,ns0000:Professional,ns0000:HPStandard,ns0000:Standard", "DriverDefault": false, "Locked": false }, "101": { "FeatureName": "ns0000:JobUserResolution", "OptionName": "ns0000:PQEconomode,ns0000:EconoMode,ns0000:HPTonerSave,ns0000:TonerSave", "DriverDefault": false, "Locked": true }, "102": { "FeatureName": "ns0000:JobUserResolution", "OptionName": "ns0000:PQDraft,ns0000:PQDraftLaser,ns0000:PQDraftPageWide,ns0000:HPS_Draft,ns0000:QuickView_Draft,ns0000:GeneralOffice_Draft,ns0000:QuickDraft,ns0000:Draft", "DriverDefault": false, "Locked": true }, "103": { "FeatureName": "ns0000:JobUserResolution", "OptionName": "ns0000:PQNormal,ns0000:PQNormalLaser,ns0000:PQNormalPageWide,ns0000:HPS_Normal,ns0000:Normal,ns0000:Professional,ns0000:HPStandard,ns0000:Standard", "DriverDefault": false, "Locked": true } } }, { "Name": "PrivatePrintDefault", "QueuePropertyBag": { "DeviceSettingKey": "Config:CONFIG_JobStorage", "Key": "Config:JobStorageControl", "Value": "Installed" }, "Values": { "0": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecureOff", "DriverDefault": true, "Locked": false, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:Off", "DriverDefault": true, "Locked": false }] }, "1": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecurePINtoPrint", "DriverDefault": false, "Locked": false, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:Off", "DriverDefault": false, "Locked": false }] }, "2": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecureEncryptJob", "DriverDefault": false, "QueuePropertyBag": { "DeviceSettingKey": "Config:CONFIG_JobStorageEncryptionControl", "Value": "Installed" }, "DevCaps": ["LJPDLV1"], "Locked": false, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:Off", "DriverDefault": false, "Locked": false }] }, "3": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecurePINtoPrint", "DriverDefault": false, "Locked": false, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:On", "DriverDefault": false, "Locked": false }] }, "4": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecureEncryptJob", "DriverDefault": false, "QueuePropertyBag": { "DeviceSettingKey": "Config:CONFIG_JobStorageEncryptionControl", "Value": "Installed" }, "DevCaps": ["LJPDLV1"], "Locked": false, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:On", "DriverDefault": false, "Locked": false }] }, "101": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecurePINtoPrint", "DriverDefault": false, "Locked": true, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:Off", "DriverDefault": false, "Locked": true }] }, "102": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecureEncryptJob", "DriverDefault": false, "QueuePropertyBag": { "DeviceSettingKey": "Config:CONFIG_JobStorageEncryptionControl", "Value": "Installed" }, "DevCaps": ["LJPDLV1"], "Locked": true, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:Off", "DriverDefault": false, "Locked": true }] }, "103": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecurePINtoPrint", "DriverDefault": false, "Locked": true, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:On", "DriverDefault": false, "Locked": true }] }, "104": { "FeatureName": "ns0000:JobStoragePrivateSecure", "OptionName": "ns0000:PrivateSecureEncryptJob", "DriverDefault": false, "QueuePropertyBag": { "DeviceSettingKey": "Config:CONFIG_JobStorageEncryptionControl", "Value": "Installed" }, "DevCaps": ["LJPDLV1"], "Locked": true, "SubFeatures": [{ "FeatureName": "ns0000:JobStorageStore", "OptionName": "ns0000:On", "DriverDefault": false, "Locked": true }] } } }, { "Name": "PrivatePrintPin", "QueuePropertyBag": { "DeviceSettingKey": "Config:CONFIG_JobStorage", "Key": "Config:JobStorageControl", "Value": "Installed" }, "ParamInitName": "ns0000:JobStoragePIN", "ParamInitType": "xsd:string" }, { "Name": "SEPMinimumPasswordLength", "ParamInitName": "ns0000:JobStoragePasswordMinLength", "ParamInitType": "xsd:integer" }];
    return ADFeatures;
}

function getProductInfo(printTicket, scriptContext, devModeProperties) {
    var productInfo = { cid: "", productType: Product_type.Product_PCL6, productBy: ProductBy.Unknown, dymargin: 0, outDirection: Output_Direction.FACEDOWN, rotateForLand: false, defaultSets: null, manualDuplexType: null, devCapCategory: null, supportSnapping: false };
    var cid_or_model_name = getCIDorModelname(scriptContext, devModeProperties);
    var productCapsXmlString = safeGetString(scriptContext.DriverProperties, "ProductCaps");
    var loadedProductCapsXml = loadXMLFromString(printTicket, productCapsXmlString);
    var selectedProductNode = null;
    var defaultSets, defaultSetNodes, defaultSet, defaultSetNode;
    var supportPdls;
    var productTypes;
    var selectedPdl;
    var userDefinedPDL;
    var manual_type_name;
    var selectedPdlNode;
    var dyMarginStr, outDirectionStr, rotateForLandStr, supportSnappingStr;
    var productDyMarginStr, productOutDirectionStr, productRotateForLandStr, productSupportSnappingStr;
    var productDefaultSets = [];
    if (loadedProductCapsXml) {
        // first check model name. model Based
        if (cid_or_model_name.model != "None") {
            selectedProductNode = loadedProductCapsXml.selectSingleNode("/Products/Models/Model[@name='" + cid_or_model_name.model + "']");
            if (selectedProductNode != null)
                productInfo.productBy = ProductBy.Model;
        }
        // check cid. cid based...
        if (selectedProductNode == null && cid_or_model_name.cid != "Product_Unknown") {
            selectedProductNode = loadedProductCapsXml.selectSingleNode("/Products/CIDs/CID[@name='" + cid_or_model_name.cid + "']");
            productInfo.cid = cid_or_model_name.cid;
            if (selectedProductNode != null)
                productInfo.productBy = ProductBy.CID;
        }
        // check if cid and model both are not set
        if (selectedProductNode == null && cid_or_model_name.cid == "Product_Unknown" && cid_or_model_name.model == "None") {
            selectedProductNode = loadedProductCapsXml.selectSingleNode("/Products/CIDs/CID[@name='Product_Unknown']");
            productInfo.cid = cid_or_model_name.cid;
            if (selectedProductNode != null)
                productInfo.productBy = ProductBy.CID;
        }
        if (selectedProductNode) {
             //get productTypes
            supportPdls = selectedProductNode.getAttribute("productTypes");
            if (supportPdls && supportPdls.length > 0) {
                productTypes = supportPdls.split(",");
                selectedPdl = productTypes[0];
                    //set PDL manually.
                userDefinedPDL = safeGetString(scriptContext.QueueProperties, "UserDefinedPDL");
                    if (userDefinedPDL && userDefinedPDL != "") {
                        selectedPdl = findInArray(productTypes, function (o) {
                            return o == userDefinedPDL;
                        });
                    }
                    //set manual duplex info
                manual_type_name = safeGetString(scriptContext.QueueProperties, "Config:Product_Model_FDNR");
                    if (manual_type_name == null || manual_type_name == "None") {
                        manual_type_name = selectedProductNode.getAttribute("manualType");
                    }
                    if (manual_type_name) {
                        productInfo.manualDuplexType = manual_type_name;
                    }
                    //set devCaps
                    productInfo.devCapCategory = selectedProductNode.getAttribute("devCap");
                if (selectedPdl == "Product_PCL3") {
                    productInfo.productType = Product_type.Product_PCL3;
                }
                else if (selectedPdl == "Product_PCLmS") {
                    productInfo.productType = Product_type.Product_PCLmS;
                }
                else if (selectedPdl == "Product_PDF") {
                    productInfo.productType = Product_type.Product_PDF;
                }
                else if (selectedPdl == "Product_PS") {
                    productInfo.productType = Product_type.Product_PS;
                }
                else if (selectedPdl == "Product_HyPCL6") {
                    productInfo.productType = Product_type.Product_HyPCL6;
                }
                else {
                    selectedPdl = "Product_PCL6";
                }
                //get common pdl features..
                selectedPdlNode = loadedProductCapsXml.selectSingleNode("/Products/ProductTypes/ProductType[@name='" + selectedPdl + "']");
                if (selectedPdlNode) {
                    dyMarginStr = selectedPdlNode.getAttribute("dyMargin");
                    outDirectionStr = selectedPdlNode.getAttribute("outDirection");
                    rotateForLandStr = selectedPdlNode.getAttribute("rotateForLand");
                    supportSnappingStr = selectedPdlNode.getAttribute("supportSnapping");
                    defaultSets = [];
                    productInfo.dymargin = dyMarginStr ? parseInt(dyMarginStr) : 0;
                    productInfo.outDirection = outDirectionStr == "FACEUP" ? Output_Direction.FACEUP:Output_Direction.FACEDOWN;
                    productInfo.rotateForLand = rotateForLandStr == "true" ? true: false;
                    productInfo.supportSnapping = supportSnappingStr == "true" ? true: false;
                    defaultSetNodes = selectedPdlNode.selectNodes("defaultSets/defaultSet");
                    for (var i = 0; i < defaultSetNodes.length; i++) {
                        defaultSet = { featurename: null, optionname: null, optionvalue: null };
                        defaultSetNode = defaultSetNodes.item(i);
                        defaultSet.featurename = defaultSetNode.getAttribute("featurename");
                        defaultSet.optionname = defaultSetNode.getAttribute("optionname");
                        defaultSet.optionvalue = defaultSetNode.getAttribute("optionvalue");
                        defaultSets.push(defaultSet);
                    }
                    productInfo.defaultSets = defaultSets.length > 0 ? defaultSets : null;
                }
            }
            // get model specific features
            productDyMarginStr = selectedProductNode.getAttribute("dyMargin");
            productOutDirectionStr = selectedProductNode.getAttribute("outDirection");
            productRotateForLandStr = selectedProductNode.getAttribute("rotateForLand");
            productSupportSnappingStr = selectedProductNode.getAttribute("supportSnapping");
            productDefaultSets = [];
            if (productDyMarginStr) {
                productInfo.dymargin = parseInt(productDyMarginStr);
            }
            if (productOutDirectionStr) {
                productInfo.outDirection = productOutDirectionStr == "FACEUP" ? Output_Direction.FACEUP : Output_Direction.FACEDOWN;
            }
            if (productRotateForLandStr) {
                productInfo.rotateForLand = productRotateForLandStr == "true" ? true : false;
            }
            if (productSupportSnappingStr) {
                productInfo.supportSnapping = productSupportSnappingStr == "true" ? true : false;
            }
            defaultSetNodes = selectedProductNode.selectNodes("defaultSets/defaultSet");
            for (var i = 0; i < defaultSetNodes.length; i++) {
                defaultSet = { featurename: null, optionname: null, optionvalue: null };
                defaultSetNode = defaultSetNodes.item(i);
                defaultSet.featurename = defaultSetNode.getAttribute("featurename");
                defaultSet.optionname = defaultSetNode.getAttribute("optionname");
                defaultSet.optionvalue = defaultSetNode.getAttribute("optionvalue");
                productDefaultSets.push(defaultSet);
            }
            if (productDefaultSets.length >0) {
                productInfo.defaultSets = productDefaultSets;
            }
        }
    }
    return productInfo;
}

function getCIDorModelname(scriptContext, devModeProperties) {
    var cid_or_model_name = { cid: "Product_Unknown", model: "None" };
    var cid_name;
        cid_name = safeGetString(scriptContext.QueueProperties, "Config:Product_CID");
        cid_or_model_name.model = safeGetString(scriptContext.QueueProperties, "Config:Product_Model");
        cid_or_model_name.cid = cid_name.replace("1284_CID_", ""); //trim 1284_CID_
             
    return cid_or_model_name;
}

function validatePrintTicket(printTicket, scriptContext) {
    var ret = 1; 
    //debugger;
        var retValForFunc;
        setSelectionNamespace(printTicket.XmlNode, psfPrefix, psfNs);
    var productInfo = getProductInfo(printTicket, scriptContext);
        // set Default ticket at first time (bidi set)
        retValForFunc = applyDefaultValueToTicket(printTicket, scriptContext, productInfo);
        if (retValForFunc == 2)
            ret = retValForFunc;
        // Validate BookOrderingDirection for Staple SaddleStitch
        retValForFunc = validateBookOrderingDirectionPt(printTicket, scriptContext);
        if (retValForFunc == 2)
            ret = retValForFunc;
        //  Validate job page ordering for manual duplex accordtion to outputbin face up /down.
        retValForFunc = validateManualDuplexPageOrderByFaceUpDownPt(printTicket, scriptContext);
        if (retValForFunc == 2)
            ret = retValForFunc;
        // Update printticket options based on PDL
        retValForFunc = updateTicketBasedonPDL(printTicket, scriptContext, productInfo);
        if (retValForFunc == 2)
            ret = retValForFunc;
		// For PCLms , apply rotateby180 if landscape selected.
        if (productInfo.rotateForLand == true) {
            retValForFunc = updateRotationForLandscape(printTicket);
            if (retValForFunc == 2)
                ret = retValForFunc;
        }
        if (ret == 2) {
            printTicket.NotifyXmlChanged();
        }
    return ret;
}

function completePrintCapabilities(printTicket, scriptContext, printCapabilities) {
    //debugger;
    setSelectionNamespace(printCapabilities.XmlNode, psfPrefix, psfNs);
    var printCaps = getPrintCaps();
    var productInfo = getProductInfo(printCapabilities, scriptContext);
    var featureNodesMap = getAllElementsMap(printCapabilities.XmlNode, psfPrefix + ":Feature");
    // add HP custom feature and parameter including MTI.
    addFeaturesAndParameters(printCapabilities, printCaps, featureNodesMap);
    // Add custom paper size from UserPropertyBag
    addCustomPaperSize(printCapabilities, scriptContext, featureNodesMap);
    // InputBin constraint None to DeviceSetting
    inputBinAutoSelectConstraintHandling(printCapabilities, productInfo, featureNodesMap);
        // Outputbin constraint Printticket to DeviceSetting
        outputbinConstraintHandling(printCapabilities, scriptContext, featureNodesMap);
        // Add constriants to HPS options in Print Quality for PCL6
        addConstraintToPQandInputBin(printCapabilities, scriptContext, productInfo, featureNodesMap);
        // Add constriants to PQ options if PC greater than 0.72
        addConstraintToPQOptions(printCapabilities, scriptContext, featureNodesMap);
        if (productInfo.productType == Product_type.Product_PCL3 || productInfo.productType == Product_type.Product_PS) {
            var rootElement = printCapabilities.XmlNode.documentElement;
            var pqNode = (featureNodesMap["ns0000:JobManualDuplex"]) ||
                (rootElement && getFeatureNode(rootElement, "ns0000:JobManualDuplex", PREFIX_CANONICAL));
            if (pqNode) {
                var optionNode;
                var optionNodes = pqNode.selectNodes(psfPrefix + ":Option");
                for (var i = 0; i < optionNodes.length; i++) {
                    optionNode = optionNodes.item(i);
                    optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "DeviceSettings"));
                }
            }
        }
        else {
            addManualDuplex(printCapabilities, featureNodesMap);
        }
}

function convertDevModeToPrintTicket(devModeProperties, scriptContext, printTicket) {
    if (!devModeProperties) {
        return;
    }
    if (printTicket) {
        setSelectionNamespace(printTicket.XmlNode, psfPrefix, psfNs);
    }
    else return;
    //debugger;
    var value = devModeProperties.GetString("AllValues");
    var values = parseNameValuePairsString(value);
    var printCaps = getPrintCaps();
    var productInfo = getProductInfo(printTicket, scriptContext, devModeProperties);
    var featureNodesMap = getAllElementsMap(printTicket.XmlNode, psfPrefix + ":Feature");
    addFeaturesAndParameters(printTicket, printCaps, featureNodesMap, values);
    
    // Set default value at first time after bidi set.
    applyDefaultValueToTicket(printTicket, scriptContext, productInfo, devModeProperties, featureNodesMap);
    duplexToPt(printTicket, scriptContext, productInfo, featureNodesMap);
    jobStoreToPt(printTicket, featureNodesMap);
    jobStorePasswordRangeToPt(printTicket, devModeProperties, scriptContext);
    jobDeviceToPt(printTicket, scriptContext, featureNodesMap);
    // put the bidi value to printticket.
    bidiVarsToPt(printTicket, devModeProperties);
    //Apply policy from queue property - DCU/AD
    applyPolicy(printTicket, scriptContext, devModeProperties, productInfo, values);
    //Configure Device Class
    applyJobDeviceLanguage(printTicket, productInfo, featureNodesMap);
    pJLToPt(printTicket, scriptContext, devModeProperties, featureNodesMap, values);
    //  Validate job page ordering accordtion to outputbin face up/down.
    addOutputBinTypeNodeInPT(printTicket, scriptContext, productInfo, featureNodesMap);

    //// add custom paper parameter name : ref ns0000:PageMediaSizeCustomSizeName
    addCustomPaperSize(printTicket, scriptContext, featureNodesMap);
    //device margin
    applyDynamicMargin(printTicket, productInfo, featureNodesMap);
    //Commenting telemetry for now as it is causign perfromance issues during print time which was not expected.
    // setting for telemetry data
    //telemetryDataSetToPt(printTicket, scriptContext, featureNodesMap);
    // Validate if snapping is supported and the manual touch by user is present so as to apply snapping for different media sizes.
    validateAndApplySnapping(printTicket, scriptContext, productInfo, featureNodesMap);

    //add printer attribute for CID management
    printerAttributeToPt(printTicket, productInfo);
    //add quue properties to PT
    queueAttributeToPt(printTicket, devModeProperties);
    //validate media size for unsupported paper sizes sent by apps like Word to switch to custom paper size
    validateMediaSize(printTicket, scriptContext);
    //validate NUP to add DocumentNUpGutter value in PT
    validateNUP(printTicket);
}

function convertPrintTicketToDevMode(printTicket, scriptContext, devModeProperties) {
    //debugger;
    if (printTicket) {
        setSelectionNamespace(printTicket.XmlNode, psfPrefix, psfNs);
    }
    else return;
    var prevValue = devModeProperties.GetString("AllValues");
    var values = {};
    var printCaps = getPrintCaps();
    if (printCaps.features) {
        extractFeatureValues(printTicket, printCaps.features, values);
    }
    if (printCaps.paramDefs) {
        extractParameterValues(printTicket, printCaps.paramDefs, values);
    }
        ptToJobVars(printTicket, devModeProperties, values);
        // save current bidi values to devmode to check whether model is changed
        setCurrentBidiToDevmode(scriptContext, devModeProperties);
        //save current policy id to devmode to check whether policy is changed.
        saveCurrentPolicyIdToDevmode(printTicket, devModeProperties);
        //save current queue id to devmode.
        saveCurrentQueueIdToDevmode(printTicket, devModeProperties);
    var newValue = makeNameValuePairsString(values);
    if (prevValue != newValue) {
        devModeProperties.SetString("AllValues", newValue);
    }

    applyDynamicMarginToDevmode(printTicket);
}

///////////////////////////////////////////////////////////////////////////////////////

//validate and defualt set.
function applyDefaultValueToTicket(printTicket, scriptContext, productInfo, devModeProperties, featureNodesMap) {
    var ret = 1;
    var retValForFunc = 0;
    var rootElement = printTicket.XmlNode.documentElement;
    var initVal;
    var isAutoConfigDone;
    var initializingDone;
    var bidiDone;
    var duplexDefault;
    var duplexUnit;
    var userDuplex;
    var easyColorDefault;
    var userEasyColor;
    var currentOutputbinBidi, oldOutputbinDevmode, currentColorBidi, oldColorDevmode;
    var printerInit = (featureNodesMap && featureNodesMap["ns0000:JobPrinterInitialization"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobPrinterInitialization", PREFIX_CANONICAL));
    if (printerInit) {
        initVal = getSelectedOptionNode(printerInit);
        // Initialization only onetime on installing.
        var IsRefreshButtonClicked = false;
        var JobJsonDeviceCaps = safeGetString(scriptContext.QueueProperties, "JobJsonDeviceCaps");
        if (JobJsonDeviceCaps != null && JobJsonDeviceCaps != "") {
            //Check if Refresh button was clicked.
            if (JobJsonDeviceCaps.indexOf("\"JobJsonDeviceCapsComplete\": \"true\"") != -1) {
                IsRefreshButtonClicked = true;
            }
        }
        isAutoConfigDone = safeGetString(scriptContext.QueueProperties, "Config:IsAutoconfigDone");
        initializingDone = initVal && (initVal.getAttribute("name") == "ns0000:DONE");
        bidiDone = isAutoConfigDone && (isAutoConfigDone != "NOTYET");

        // Not initialized - only when driver queue is installed.
        // Initialized and bidi completed.  - case : check if bidiDone because local port does not do bidi.
        if (!IsRefreshButtonClicked && !initializingDone && bidiDone) {
            removeChildElements(printerInit, psfPrefix + ":Option");
            addChildElement(printerInit, psfNs, "Option", "ns0000:DONE");

            //EPEAT : duplex set to long edge
            duplexDefault = safeGetString(scriptContext.QueueProperties, "Config:DuplexByDefault");
            duplexUnit = safeGetString(scriptContext.QueueProperties, "Config:DuplexUnit");
            userDuplex = (featureNodesMap && featureNodesMap["psk:JobDuplexAllDocumentsContiguously"]) ||
                (rootElement && getFeatureNode(rootElement, "psk:JobDuplexAllDocumentsContiguously", PREFIX_CANONICAL));
            if (duplexUnit && userDuplex && duplexDefault == "NotInstalled") {
                removeChildElements(userDuplex, psfPrefix + ":Option");
                addChildElement(userDuplex, psfNs, "Option", "psk:OneSided");
                ret = 2;
            }
            else if (duplexDefault && userDuplex && duplexDefault == "enable") {
                removeChildElements(userDuplex, psfPrefix + ":Option");
                addChildElement(userDuplex, psfNs, "Option", "psk:TwoSidedLongEdge");
                ret = 2;
            }
            //easycolor :set to default option
            easyColorDefault = safeGetString(scriptContext.QueueProperties, "Config:EasyColorDefault");
            userEasyColor = (featureNodesMap && featureNodesMap["ns0000:DocumentHPEasyColor"]) ||
                (rootElement && getFeatureNode(rootElement, "ns0000:DocumentHPEasyColor", PREFIX_CANONICAL));
            if (userEasyColor && easyColorDefault == "ECOff") {
                removeChildElements(userEasyColor, psfPrefix + ":Option");
                addChildElement(userEasyColor, psfNs, "Option", "ns0000:HPEasyColorOff");
                ret = 2;
            }
            else if (userEasyColor && easyColorDefault == "ECOn") {
                removeChildElements(userEasyColor, psfPrefix + ":Option");
                addChildElement(userEasyColor, psfNs, "Option", "ns0000:HPEasyColorOn");
                ret = 2;
            }
            else if (userEasyColor && easyColorDefault == "ECConservative") {
                removeChildElements(userEasyColor, psfPrefix + ":Option");
                addChildElement(userEasyColor, psfNs, "Option", "ns0000:HPEasyColorConservative");
                ret = 2;
            }
        }

    }
    /////////////////////////////////////////////////////////////////////////////////////////////
    // always checked - validate / convertdevmodeToticket.
    // change jobinputbin default value from AutoSelect to UserPrinterSetting
    retValForFunc = inputBinAutoSelectConstraintHandling(printTicket, productInfo);
    if (retValForFunc == 2)
        ret = retValForFunc;

    if (isPCGreaterThan070(scriptContext) && isPQStandardTypeBidiSuccessful(scriptContext)) {
        validatePCResolutionPt(printTicket, scriptContext, featureNodesMap);
    }
    else {
        // renew default value for resolution is incorrect when model change
        retValForFunc = validateResolutionPt(printTicket, scriptContext, productInfo, featureNodesMap);

        if (retValForFunc == 2)
            ret = retValForFunc;
    }
    retValForFunc = updatePageOutputQuality(rootElement, featureNodesMap)
    if (retValForFunc == 2)
        ret = retValForFunc;

    currentOutputbinBidi = getOutputBinBidi(scriptContext);
    oldOutputbinDevmode = currentOutputbinBidi;
    currentColorBidi = getCurrentDeviceColorBidi(scriptContext);
    oldColorDevmode = currentColorBidi;

    //convertDevToTicket.
    if (devModeProperties) {
        oldOutputbinDevmode = devModeProperties.GetInt32("OutputBinVariable");
        oldColorDevmode = devModeProperties.GetInt32("ColorDeviceVariable");
    }
    // validate ticket. - check vidiVars property
    else {
        var prop = getProperty(rootElement, venderDefinedNs, "BidiVars");
        if (prop) {
            oldOutputbinDevmode = parseInt(getPropertyValue(getProperty(prop, venderDefinedNs, "OutputBinVariable")));
            oldColorDevmode = parseInt(getPropertyValue(getProperty(prop, venderDefinedNs, "ColorDeviceVariable")));
        }
    }
    //renew outputbin feautres
    if (oldOutputbinDevmode != currentOutputbinBidi) {
        retValForFunc = validateOutputbinFeatures(currentOutputbinBidi, printTicket, featureNodesMap);
        if (retValForFunc == 2)
            ret = retValForFunc;
    }

    var adPolicyXml = getCurrentPolicyId(printTicket, devModeProperties, "AdPolicyId");
    // set defult color if the color bidi is changed.
    if (oldColorDevmode != currentColorBidi && (adPolicyXml == null || adPolicyXml == "")) {
        retValForFunc = validateDefaultPageOutputColorPt(currentColorBidi, printTicket, featureNodesMap);
        if (retValForFunc == 2)
            ret = retValForFunc;
    }

    return ret;
}
//validate booklet order
function validateBookOrderingDirectionPt(printTicket, scriptContext) {
    var ret = 0;
    var rootElement = printTicket.XmlNode.documentElement;
    var stapleOptionNode, stapleOptionName, bookletOrderOptionNode, bookletOrderOptionName, useValue, reverseOrderBidi;
    var stapleFeatureNode = rootElement && getFeatureNode(rootElement, "psk:JobStapleAllDocuments", PREFIX_CANONICAL);
    if (stapleFeatureNode) {
        var bookletOrderNode = rootElement && getFeatureNode(rootElement, "ns0000:JobBookOrderingDirection", PREFIX_CANONICAL);
        if (bookletOrderNode) {
            stapleOptionNode = getSelectedOptionNode(stapleFeatureNode);
            stapleOptionName = stapleOptionNode ? stapleOptionNode.getAttribute("name") : null;
            bookletOrderOptionNode = getSelectedOptionNode(bookletOrderNode);
            bookletOrderOptionName = bookletOrderOptionNode ? bookletOrderOptionNode.getAttribute("name") : null;
            useValue = bookletOrderOptionName;
            if (stapleOptionName && stapleOptionName == "psk:SaddleStitch") {
                reverseOrderBidi = safeGetString(scriptContext.QueueProperties, "Config:PC_FoldAndStitchForceReverseOrderSupport");
                if (reverseOrderBidi && reverseOrderBidi == "Supported") {
                    if (!bookletOrderOptionName || bookletOrderOptionName != "ns0000:FoldAndStitchForceReverseOrder") {
                        useValue = "ns0000:FoldAndStitchForceReverseOrder";
                    }
                }
                else {
                    useValue = "ns0000:FoldAndStitch";
                }
            }
            else {
                useValue = "ns0000:NoFoldAndStitch";
            }
            if (useValue != bookletOrderOptionName) {
                removeChildElements(bookletOrderNode, psfPrefix + ":Option");
                addChildElement(bookletOrderNode, psfNs, "Option", useValue);
                ret = 2;
            }
        }
    }
    return ret;
}
//validate manualduplex order
function validateManualDuplexPageOrderByFaceUpDownPt(printTicket, scriptContext) {
    var ret = 0;
    var rootElement = printTicket.XmlNode.documentElement;
    var manualDuplexOptionNode, manualDuplexOptionNodeName, jobOutputBinNodeFeature;
    var jobOutputBinOptionNode, jobOutputBinOptionNodeName, key, optionalOutputbin, outputbinDirection;
    var strOutputbinName, strOutputbinDirection, pageOrderOptionNode, pageOrderOptionNodeName;
    var pageOrderFeature;
    var manualDuplexFeature = rootElement && getFeatureNode(rootElement, "ns0000:JobManualDuplex", PREFIX_CANONICAL);
    if (manualDuplexFeature != null) {
        manualDuplexOptionNode = getSelectedOptionNode(manualDuplexFeature);
        if (manualDuplexOptionNode) {
            manualDuplexOptionNodeName = manualDuplexOptionNode.getAttribute("name");
            if (manualDuplexOptionNodeName && manualDuplexOptionNodeName != "ns0000:ManualSimplex") {
                jobOutputBinNodeFeature = rootElement && getFeatureNode(rootElement, "psk:JobOutputBin", PREFIX_CANONICAL);
                if (jobOutputBinNodeFeature) {
                    jobOutputBinOptionNode = getSelectedOptionNode(jobOutputBinNodeFeature);
                    jobOutputBinOptionNodeName = jobOutputBinOptionNode.getAttribute("name");
                    key = jobOutputBinOptionNodeName.substring(jobOutputBinOptionNodeName.indexOf(":") + 1);
                    //Get the Bidi options:
                    optionalOutputbin = "Config:PC_BIDIOptionalOutputbin";
                    outputbinDirection = "Config:PC_BIDIMediaOutputPageDelivery";
                    for (var idx = 1; idx < 13; idx++) {
                        strOutputbinName = safeGetString(scriptContext.QueueProperties, optionalOutputbin + idx.toString());
                        strOutputbinDirection = safeGetString(scriptContext.QueueProperties, outputbinDirection + idx.toString());
                        // Find the direction for current selected outputbin
                        // don't care automaticallSelect
                        if (strOutputbinName == key) {
                            pageOrderFeature = rootElement && getFeatureNode(rootElement, "psk:JobPageOrder", PREFIX_CANONICAL);
                            if (pageOrderFeature) {
                                pageOrderOptionNode = getSelectedOptionNode(pageOrderFeature);
                                if (pageOrderOptionNode) {
                                    pageOrderOptionNodeName = pageOrderOptionNode.getAttribute("name");
                                    // If ouputbin direction is faceup, page order should be reverse.
                                    if (strOutputbinDirection == "FACEUP") {
                                        if (pageOrderOptionNodeName && pageOrderOptionNodeName != "psk:Reverse") {
                                            removeChildElements(pageOrderFeature, psfPrefix + ":Option")
                                            addChildElement(pageOrderFeature, psfNs, "Option", "psk:Reverse");
                                            ret = 2;
                                        }
                                    }
                                    // If ouputbin direction is facedown or both, page order should be standard.
                                    else if (strOutputbinDirection == "FACEDOWN" || strOutputbinDirection == "BOTH") {
                                        if (pageOrderOptionNodeName && pageOrderOptionNodeName != "psk:Standard") {
                                            removeChildElements(pageOrderFeature, psfPrefix + ":Option")
                                            addChildElement(pageOrderFeature, psfNs, "Option", "psk:Standard");
                                            ret = 2;
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    return ret;
}

//validate NUP
function validateNUP(printTicket) {
    var rootElement = printTicket.XmlNode.documentElement;
    var NUPFeatureNode = rootElement && getFeatureNode(rootElement, "psk:DocumentNUp", PREFIX_CANONICAL);
    if (NUPFeatureNode) {
        var NUPOptionNode = getSelectedOptionNode(NUPFeatureNode);
        addScoredParameterString(printTicket, NUPOptionNode, "ns0000:Gutter", "ns0000:DocumentNUpGutter", 0, "xsd:integer");
    }
}

//validate media size
function validateMediaSize(printTicket, scriptContext, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    var mediaSizeOptionNode, mediaSizeOptionName, mediaSizeWidth, mediaSizeHeight;
    var updatedPCStr, updatedPCXml;
    var featureNode, optionNode, optionName;
    var mediaSizeFeatureNode = (featureNodesMap && featureNodesMap["psk:PageMediaSize"]) ||
        (rootElement && getFeatureNode(rootElement, "psk:PageMediaSize", PREFIX_CANONICAL));
    if (mediaSizeFeatureNode) {
        mediaSizeOptionNode = getSelectedOptionNode(mediaSizeFeatureNode);
        mediaSizeOptionName = mediaSizeOptionNode ? mediaSizeOptionNode.getAttribute("name") : null;
        mediaSizeWidth = getScoredPropertyValue(mediaSizeOptionNode, "psk:MediaSizeWidth");
        mediaSizeHeight = getScoredPropertyValue(mediaSizeOptionNode, "psk:MediaSizeHeight");

        //debugger;
        updatedPCStr = safeGetString(scriptContext.QueueProperties, "CapabilityXML");
        if (updatedPCStr) {
            updatedPCXml = loadXMLFromString(printTicket, updatedPCStr);
            if (updatedPCXml) {
                featureNode = getFeatureNode(updatedPCXml.documentElement, "psk:PageMediaSize", PREFIX_CANONICAL);
                optionNode = featureNode.selectSingleNode("descendant::" + psfPrefix + ":Option[@name='" + mediaSizeOptionName + "']")
                if (optionNode) {
                    optionName = getElementName(optionNode, PREFIX_REAL);
                    if (optionName == mediaSizeOptionName && optionNode.getAttribute("constrained") == "psk:DeviceSettings") {
                        removeChildElements(mediaSizeFeatureNode, psfPrefix + ":Option");
                        mediaSizeOptionNode = addChildElement(mediaSizeFeatureNode, psfNs, "Option", "psk:CustomMediaSize");
                        if (mediaSizeOptionNode) {
                            addScoredParameterString(printTicket, mediaSizeOptionNode, "psk:MediaSizeWidth", "psk:PageMediaSizeMediaSizeWidth", mediaSizeWidth, "xsd:integer");
                            addScoredParameterString(printTicket, mediaSizeOptionNode, "psk:MediaSizeHeight", "psk:PageMediaSizeMediaSizeHeight", mediaSizeHeight, "xsd:integer");
                        }
                    }
                }
            }
        }
    }
}

// validate PDL
function updateTicketBasedonPDL(printTicket, scriptContext, productInfo) {
    var ret = 1;
    var rootElement = printTicket.XmlNode.documentElement;
    var featureNode, optionName;
    var features = productInfo.defaultSets;
    if (features != null) {
        for (var i = 0; i < features.length; i++) {
            featureNode = (rootElement && getFeatureNode(rootElement, features[i].featurename, PREFIX_CANONICAL));
            if (featureNode) {
                 optionName = getSelectedOptionName(featureNode, PREFIX_CANONICAL);
                 if (optionName && optionName == features[i].optionname) {
                    removeChildElements(featureNode, psfPrefix + ":Option")
                    addChildElement(featureNode, psfNs, "Option", features[i].optionvalue);
                    ret = 2;
                }
            }
        }
    }
    return ret;
}

//quality and resolution
function updatePageOutputQuality(rootElement, featureNodesMap) {
    //debugger;
    var ret = 1;
    var pageOutputQuality, newQualityOption;
    var bIsPageOutputQualityUpdated = false;

    var userResolution = (featureNodesMap && featureNodesMap["ns0000:JobUserResolution"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobUserResolution", PREFIX_CANONICAL));

    if (userResolution) {
        userResNode = getSelectedOptionNode(userResolution);
        var curUserResVal = userResNode ? userResNode.getAttribute("name") : null;
        // check if PQ Mode is present in the PT, if present use that value to determine the PageOutputQuality
        if (userResNode) {
            var propertyNode = getScoredProperty(userResNode, venderDefinedNs, "PrintQualityMode");
            if (propertyNode) {
                var paramRefNode = findElementNode(propertyNode, psfPrefix + ":ParameterRef", "ns0000:JobPrintQualityMode", PREFIX_CANONICAL);
                if (paramRefNode) {
                    var paramInitNode = getParameterInitNode(rootElement, "ns0000:JobPrintQualityMode", PREFIX_CANONICAL);
                    if (paramInitNode) {
                        var value = getPropertyValue(paramInitNode);
                        if (value == 2) {
                            newQualityOption = "psk:Normal";
                        }
                        else if (value == 1 || value == 5 || value == 6 || value == 7) {
                            newQualityOption = "psk:Draft";
                        }
                        else {
                            newQualityOption = "psk:High";
                        }
                        bIsPageOutputQualityUpdated = true;
                    }
                }
            }
            // If PQ Mode is not present, use old PC PQ Options to determine the PageOutputQuality
            if (!bIsPageOutputQualityUpdated) {
                if (curUserResVal) {
                    newQualityOption = null;
                    if (curUserResVal == "ns0000:PQNormal" || curUserResVal == "ns0000:HPS_Normal" || curUserResVal == "ns0000:PQNormalLaser" || curUserResVal == "ns0000:PQNormalPageWide") {
                        newQualityOption = "psk:Normal";
                    }
                    else if (curUserResVal == "ns0000:HPS_Draft" || curUserResVal == "ns0000:HPS_Economode" || curUserResVal == "ns0000:PQDraftLaser" || curUserResVal == "ns0000:PQDraftPageWide" ||
                        curUserResVal == "ns0000:PQEconomode" || curUserResVal == "ns0000:PQDraft") {
                        newQualityOption = "psk:Draft";
                    }
                    else if (curUserResVal == "ns0000:PQBestLaser" || curUserResVal == "ns0000:PQMaxLaser" || curUserResVal == "ns0000:PQBestPageWide" || curUserResVal == "ns0000:PQMaxPageWide" ||
                             curUserResVal == "ns0000:PQBest" || curUserResVal == "ns0000:PQMax" || curUserResVal == "ns0000:HPS_Best") {
                        newQualityOption = "psk:High";
                    }
                    bIsPageOutputQualityUpdated = true;
                }
            }
            // if PQ Mode is not set and PQ Option does not match old PC options, the use JobHPPrintQualitySupportedType feature to determine the PageOutputQuality
            if (!bIsPageOutputQualityUpdated) {
                var PrintQualitySupportedTypeFeatureNode = (featureNodesMap && featureNodesMap["ns0000:JobHPPrintQualitySupportedType"]) ||
                    (rootElement && getFeatureNode(rootElement, "ns0000:JobHPPrintQualitySupportedType", PREFIX_CANONICAL));
                if (PrintQualitySupportedTypeFeatureNode) {
                    var PrintQualitySupportedTypeSelectedNode = getSelectedOptionNode(PrintQualitySupportedTypeFeatureNode);
                    if (PrintQualitySupportedTypeSelectedNode) {
                        PrintQualitySupportedTypeSelectedVal = PrintQualitySupportedTypeSelectedNode ? PrintQualitySupportedTypeSelectedNode.getAttribute("name") : null;
                        if (PrintQualitySupportedTypeSelectedVal == "ns0000:Draft" || PrintQualitySupportedTypeSelectedVal == "ns0000:Economode" ||
                            PrintQualitySupportedTypeSelectedVal == "ns0000:HighSpeed" || PrintQualitySupportedTypeSelectedVal == "ns0000:Depleted") {
                            newQualityOption = "psk:Draft";
                        }
                        else if (PrintQualitySupportedTypeSelectedVal == "ns0000:Normal" || PrintQualitySupportedTypeSelectedVal == "ns0000:None") {
                            newQualityOption = "psk:Normal";
                        }
                        else {
                            newQualityOption = "psk:High";
                        }
                        bIsPageOutputQualityUpdated = true;
                    }
                }
            }
            if (bIsPageOutputQualityUpdated) {
                pageOutputQuality = (featureNodesMap && featureNodesMap["psk:PageOutputQuality"]) ||
                    (rootElement && getFeatureNode(rootElement, "psk:PageOutputQuality", PREFIX_CANONICAL));
                if (pageOutputQuality) {
                    if (newQualityOption) {
                        removeChildElements(pageOutputQuality, psfPrefix + ":Option");
                        addChildElement(pageOutputQuality, psfNs, "Option", newQualityOption);
                        ret = 2;
                    }
                }
            }
        }
    }
    return ret;
}

function validatePCResolutionPt(printTicket, scriptContext, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    var pqModeToSet;
    var dpiToSet = "Res600Dpi";
    var userResValueChanged = false;
    var userResNode, jobHPPrintQualitySupportedTypeOptionNode, curUserResVal, jobHPPrintQualitySupportedTypeOptionValue;
    var PQStandardTypeDPIList, PQModeStandardType, PQDisplayTagStandardType, displayTagStandardTypevalue;
    //debugger;

    var userResolution = (featureNodesMap && featureNodesMap["ns0000:JobUserResolution"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobUserResolution", PREFIX_CANONICAL));

    var pageResolution = (featureNodesMap && featureNodesMap["psk:PageResolution"]) ||
        (rootElement && getFeatureNode(rootElement, "psk:PageResolution", PREFIX_CANONICAL));

    var jobHPPrintQualitySupportedType = (featureNodesMap && featureNodesMap["ns0000:JobHPPrintQualitySupportedType"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobHPPrintQualitySupportedType", PREFIX_CANONICAL));

    if (userResolution && jobHPPrintQualitySupportedType) {
        userResNode = getSelectedOptionNode(userResolution);
        curUserResVal = userResNode ? userResNode.getAttribute("name") : null;

        jobHPPrintQualitySupportedTypeOptionNode = getSelectedOptionNode(jobHPPrintQualitySupportedType);
        jobHPPrintQualitySupportedTypeOptionValue = jobHPPrintQualitySupportedTypeOptionNode ? jobHPPrintQualitySupportedTypeOptionNode.getAttribute("name") : null;

        if (jobHPPrintQualitySupportedTypeOptionValue != "ns0000:None") {
            propertyNode = getScoredProperty(userResNode, venderDefinedNs, "PrintQualityMode");
            if (propertyNode) {
                userResNode.removeChild(propertyNode);
            }
            removeParamInitNode(printTicket, "ns0000:JobPrintQualityMode");
        }
        else {
            if (curUserResVal) {
                PQStandardTypeDPIList = ["Config:PQDraftDPI", "Config:PQNormalDPI", "Config:PQBestDPI", "Config:PQMaxDPI", "Config:PQEconomodeDPI"];
                PQModeStandardType = "Config:PQModeStandardType";
                PQDisplayTagStandardType = "Config:PQDisplayTagStandardType";

                for (var i = 1; i <= PQStandardTypeDPIList.length; i++) {
                    displayTagStandardTypevalue = safeGetString(scriptContext.QueueProperties, PQDisplayTagStandardType + i.toString());
                    if (displayTagStandardTypevalue != "NotAvailable" && curUserResVal == "ns0000:" + displayTagStandardTypevalue) {
                        pqModeToSet = safeGetString(scriptContext.QueueProperties, PQModeStandardType + i.toString());
                        dpiToSet = safeGetString(scriptContext.QueueProperties, PQStandardTypeDPIList[i - 1]);
                        if (pqModeToSet != "NotAvailable" && pqModeToSet >= 1 && pqModeToSet <= 7) {
                            addScoredParameterString(printTicket, userResNode, "ns0000:PrintQualityMode", "ns0000:JobPrintQualityMode", pqModeToSet, "xsd:integer");
                        }
                        userResValueChanged = true;
                        break;
                    }
                }
            }
        }
    }

    if (pageResolution && userResValueChanged) {
        var pageResOptionToChange = null;
        var pageResValue = 600;

        if (dpiToSet == "Res600Dpi") {
            pageResOptionToChange = "ns0000:_600dpi";
            pageResValue = 600;
        }
        else if (dpiToSet == "Res1200Dpi") {
            pageResOptionToChange = "ns0000:_1200dpi";
            pageResValue = 1200;
        }
        else if (dpiToSet == "Res300Dpi") {
            pageResOptionToChange = "ns0000:_300dpi";
            pageResValue = 300;
        }

        if (pageResOptionToChange) {
            removeChildElements(pageResolution, psfPrefix + ":Option");
            optionNode = addChildElement(pageResolution, psfNs, "Option", pageResOptionToChange);
            if (optionNode) {
                propertyNodeX = addChildElement(optionNode, psfNs, "ScoredProperty", "psk:ResolutionX");
                propertyNodeY = addChildElement(optionNode, psfNs, "ScoredProperty", "psk:ResolutionY");
                if (propertyNodeX) {
                    addValue(propertyNodeX, pageResValue, "xsd:integer");
                }
                if (propertyNodeY) {
                    addValue(propertyNodeY, pageResValue, "xsd:integer");
                }
            }
        }
    }
}

function validateResolutionPt(printTicket, scriptContext, productInfo, featureNodesMap) {
    // JobUserResolution setting by Ink or laser
    // check Default value - normal by ink or laser.
    //debugger;
    var PQMapWithPQMode = [
        { PQName: "ns0000:HPS_Draft", PQMode: 1 },
        { PQName: "ns0000:PQDraftPageWide", PQMode: 1 },
        { PQName: "ns0000:Standard", PQMode: 2 },
        { PQName: "ns0000:HPS_Normal", PQMode: 2 },
        { PQName: "ns0000:Normal", PQMode: 2 },
        { PQName: "ns0000:PQNormalLaser", PQMode: 2 },
        { PQName: "ns0000:PQNormalPageWide", PQMode: 2 },
        { PQName: "ns0000:HPS_Best", PQMode: 4 },
        { PQName: "ns0000:PQBestPageWide", PQMode: 4 },
        { PQName: "ns0000:HPS_Economode", PQMode: 16 }
    ];
    var ret = 1;
    var rootElement = printTicket.XmlNode.documentElement;
    var userResValueChanged = false;
    var currentUserResMode = 0; // draft: 1, normal: 2, best: 4, max: 8, eco : 16, custom : -1(in the future)
    var propertyNodeX, propertyNodeY;
    var pageResValue;
    var optionNode;
    var userResNode, curUserResVal;
    var currentType, supportMode, supportType, useDefault, userResValToChange;
    var draftSupport, normalSupport, bestSupport, maxSupport, ecoSupport;
    var laserSupportCount, laserSupportMode, inkSupportCount, inkSupportMode;
    var userResolution = (featureNodesMap && featureNodesMap["ns0000:JobUserResolution"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobUserResolution", PREFIX_CANONICAL));

    var pageResolution = (featureNodesMap && featureNodesMap["psk:PageResolution"]) ||
        (rootElement && getFeatureNode(rootElement, "psk:PageResolution", PREFIX_CANONICAL));

    // Validate JobUserResolution value or Set default according to Printer Quality Bidi.
    if (userResolution) {
        userResNode = getSelectedOptionNode(userResolution);
        //Delete PrintQualityMode scored property for all old options
        var propertyNode = getScoredProperty(userResNode, venderDefinedNs, "PrintQualityMode");
        if (propertyNode) {
            userResNode.removeChild(propertyNode);
        }
        removeParamInitNode(printTicket, "ns0000:JobPrintQualityMode");
        curUserResVal = userResNode ? userResNode.getAttribute("name") : null;
        if (curUserResVal) {
            currentType = 0; // common : 0, ink: 1, laser: 2 
            supportMode = 0; // draft: 1, normal: 2, best: 4, max: 8, eco : 16
            supportType = 0; // common : 0, ink: 1, laser: 2
            useDefault = false;
            userResValToChange = curUserResVal;
            draftSupport = safeGetString(scriptContext.QueueProperties, "Config:PQDraftSupport");
            normalSupport = safeGetString(scriptContext.QueueProperties, "Config:PQNormalSupport");
            bestSupport = safeGetString(scriptContext.QueueProperties, "Config:PQBestSupport");
            maxSupport = safeGetString(scriptContext.QueueProperties, "Config:PQMaxSupport");
            ecoSupport = safeGetString(scriptContext.QueueProperties, "Config:PQEconomodeSupport");

            laserSupportCount = 0;
            laserSupportMode = 0;
            inkSupportCount = 0;
            inkSupportMode = 0;

            // base on normal support - decided laser or ink.
            if (draftSupport && draftSupport != "NotAvailable") {
                if (draftSupport == "Ink") { //ink
                    inkSupportMode = inkSupportMode | 1;
                    inkSupportCount++;
                }
                else { //laser
                    laserSupportMode = laserSupportMode | 1;
                    laserSupportCount++;
                }
            }

            if (normalSupport && normalSupport != "NotAvailable") {
                if (normalSupport == "Ink") { //ink
                    inkSupportMode = inkSupportMode | 2;
                    inkSupportCount++;
                }
                else {
                    laserSupportMode = laserSupportMode | 2;
                    laserSupportCount++;
                }
            }

            if (bestSupport && bestSupport != "NotAvailable") {
                if (bestSupport == "Ink") { //ink
                    inkSupportMode = inkSupportMode | 4;
                    inkSupportCount++;
                }
                else { //laser
                    laserSupportMode = laserSupportMode | 4;
                    laserSupportCount++;
                }
            }
            if (maxSupport && maxSupport != "NotAvailable") {
                if (maxSupport == "Ink") { //ink
                    inkSupportMode = inkSupportMode | 8;
                    inkSupportCount++;
                }
                else { //laser
                    laserSupportMode = laserSupportMode | 8;
                    laserSupportCount++;
                }
            }

            // correct current printer is laser or ink- related with model change...
            // support ink
            if (inkSupportCount > laserSupportCount) {
                supportMode = inkSupportMode;
                supportType = 1;
            }
            //laser support
            else if (inkSupportCount < laserSupportCount) {
                supportMode = laserSupportMode;
                supportType = 2;
            }

            if (ecoSupport && ecoSupport != "NotAvailable") {
                supportMode = supportMode | 16;
            }

            if (curUserResVal == "ns0000:PQDraftPageWide") {
                currentUserResMode = 1;
                currentType = 1;
            }
            else if (curUserResVal == "ns0000:HPS_Draft") {
                currentUserResMode = 1;
                currentType = 1;
            }
            else if (curUserResVal == "ns0000:PQDraftLaser") {
                currentUserResMode = 1;
                currentType = 2;
            }
            else if (curUserResVal == "ns0000:PQNormalPageWide") {
                currentUserResMode = 2;
                currentType = 1;
            }
            else if (curUserResVal == "ns0000:HPS_Normal") {
                currentUserResMode = 2;
                currentType = 1;
            }
            else if (curUserResVal == "ns0000:PQNormalLaser") {
                currentUserResMode = 2;
                currentType = 2;
            }
            else if (curUserResVal == "ns0000:PQBestPageWide") {
                currentUserResMode = 4;
                currentType = 1;
            }
            else if (curUserResVal == "ns0000:HPS_Best") {
                currentUserResMode = 4;
                currentType = 1;
            }
            else if (curUserResVal == "ns0000:PQBestLaser") {
                currentUserResMode = 4;
                currentType = 2;
            }
            else if (curUserResVal == "ns0000:PQMaxPageWide") {
                currentUserResMode = 8;
                currentType = 1;
            }
            else if (curUserResVal == "ns0000:PQMaxLaser") {
                currentUserResMode = 8;
                currentType = 2;
            }
            else if (curUserResVal == "ns0000:PQEconomode") {
                currentUserResMode = 16;
            }
            else if (curUserResVal == "ns0000:HPS_Economode") {
                currentUserResMode = 16;
            }
            else if (curUserResVal == "ns0000:PQDraft") {
                currentUserResMode = 1;
            }
            else if (curUserResVal == "ns0000:PQNormal") {
                currentUserResMode = 2;
            }
            else if (curUserResVal == "ns0000:PQBest") {
                currentUserResMode = 4;
            }
            else if (curUserResVal == "ns0000:PQMax") {
                currentUserResMode = 8;
            }

            if (currentUserResMode & supportMode) {

                if (supportType > 0 && supportType != currentType) {
                    if (currentUserResMode == 1) { // draft mode
                        userResValToChange = (supportType == 1) ? "ns0000:PQDraftPageWide" : "ns0000:PQDraftLaser";
                    }
                    else if (currentUserResMode == 2) {// normal mode
                        userResValToChange = (supportType == 1) ? "ns0000:PQNormalPageWide" : "ns0000:PQNormalLaser";
                    }
                    else if (currentUserResMode == 4) {// best mode
                        userResValToChange = (supportType == 1) ? "ns0000:PQBestPageWide" : "ns0000:PQBestLaser";
                    }
                    else if (currentUserResMode == 8) {// max mode
                        userResValToChange = (supportType == 1) ? "ns0000:PQMaxPageWide" : "ns0000:PQMaxLaser";
                    }
                    else if (currentUserResMode == 16) {// eco mode
                        userResValToChange = "ns0000:PQEconomode";
                    }
                    else {
                        useDefault = true;
                    }
                }
            }
            else if (supportMode == 0) {
                if (productInfo && productInfo.devCapCategory != null) {
                    var devCapsXmlString = safeGetString(scriptContext.DriverProperties, "DevCaps");
                    var loadedDevCapsXml = loadXMLFromString(printTicket, devCapsXmlString);
                    if (loadedDevCapsXml) {
                        devCapsNodes = loadedDevCapsXml.selectNodes("DeviceCaps/DeviceCap");
                        for (var i = 0; i < devCapsNodes.length; i++) {
                            var devCapNode = devCapsNodes.item(i);
                            var devCapName = devCapNode.getAttribute("name");
                            var devCapNames = devCapName.split(",");
                            if (includedInArray(devCapNames, productInfo.devCapCategory)) {
                                selectedDevCapNode = devCapNode;
                                break;
                            }
                        }
                        if (selectedDevCapNode) {
                            enabledOptions = [];
                            devCapFeatureoptionsNodes = selectedDevCapNode.selectNodes("Features/psf:Feature[@name='ns0000:JobUserResolution']/psf:Option");
                            useDefault = true;
                            for (var i = 0; i < devCapFeatureoptionsNodes.length; i++) {
                                devCapOptionNode = devCapFeatureoptionsNodes.item(i);
                                devCapOptionName = devCapOptionNode.getAttribute("name");
                                devCapOptionIsDefault = devCapOptionNode.getAttribute("IsDefault") == "true" ? true : false;
                                if (devCapOptionIsDefault) {
                                    useDefaultOption = devCapOptionName;
                                }
                                if (curUserResVal == devCapOptionName) {
                                    useDefault = false;
                                    for (var j = 0; j < PQMapWithPQMode.length; j++) {
                                        if (PQMapWithPQMode[j].PQName == curUserResVal) {
                                            currentUserResMode = PQMapWithPQMode[j].PQMode;
                                            break;
                                        }
                                     }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else if (currentUserResMode == 0 && supportMode > 0) {
                useDefault = true;
            }

            if (useDefault) { // set to default 
                if (supportMode & 2) {// normal mode  
                    userResValToChange = (supportType == 1) ? "ns0000:PQNormalPageWide" : "ns0000:PQNormalLaser";
                    currentUserResMode = 2;
                }
                else if (supportMode & 1) { // draft mode
                    userResValToChange = (supportType == 1) ? "ns0000:PQDraftPageWide" : "ns0000:PQDraftLaser";
                    currentUserResMode = 1;
                }
                else if (supportMode & 4) {// best mode
                    userResValToChange = (supportType == 1) ? "ns0000:PQBestPageWide" : "ns0000:PQBestLaser";
                    currentUserResMode = 4;
                }
                else if (supportMode & 8) {// max mode
                    userResValToChange = (supportType == 1) ? "ns0000:PQMaxPageWide" : "ns0000:PQMaxLaser";
                    currentUserResMode = 8;
                }
                else if (supportMode & 16) {// eco mode
                    userResValToChange = "ns0000:PQEconomode";
                    currentUserResMode = 16;
                }
                else if (supportMode == 0) {// all setting disable
                    userResValToChange = useDefaultOption;
                    for (var j = 0; j < PQMapWithPQMode.length; j++) {
                        if (PQMapWithPQMode[j].PQName == userResValToChange) {
                            currentUserResMode = PQMapWithPQMode[j].PQMode;
                            break;
                        }
                    }
                }
            }

            if (userResValToChange != curUserResVal) {  // change current value to valid value
                removeChildElements(userResolution, psfPrefix + ":Option");
                addChildElement(userResolution, psfNs, "Option", userResValToChange);
                userResValueChanged = true;
                ret = 2;
            }

        }
    } // end JobUserResolution setting

    // Validate PageResoltion value according to JobUserResolution value.
    if (pageResolution) {
        var pageResNode = getSelectedOptionNode(pageResolution);
        var curPageResVal = pageResNode ? pageResNode.getAttribute("name") : null;
        if (curPageResVal) {
            //check current job resolution value - draft / normal / best / max / eco
            var currentPageRes = 0;   //300dpi : 1, 600dpi : 2, 1200dpi : 4
            var availableResStrForJobUserResoltion;
            var availableResForJobUserResoltion = 0; //300dpi : 1, 600dpi : 2, 1200dpi : 4
            if (curPageResVal == "ns0000:_300dpi") {
                currentPageRes = 1;
            }
            else if (curPageResVal == "ns0000:_600dpi") {
                currentPageRes = 2;
            }
            else if (curPageResVal == "ns0000:_1200dpi") {
                currentPageRes = 4;
            }

            //check available dpi for current job resolution value - draft / normal / best / max / eco
            if (currentUserResMode == 1) {// Draft 
                availableResStrForJobUserResoltion = safeGetString(scriptContext.QueueProperties, "Config:PQDraftDPI");
            }
            else if (currentUserResMode == 2) {// Normal
                availableResStrForJobUserResoltion = safeGetString(scriptContext.QueueProperties, "Config:PQNormalDPI");
            }
            else if (currentUserResMode == 4) {// Best
                availableResStrForJobUserResoltion = safeGetString(scriptContext.QueueProperties, "Config:PQBestDPI");
            }
            else if (currentUserResMode == 8) {// Max
                availableResStrForJobUserResoltion = safeGetString(scriptContext.QueueProperties, "Config:PQMaxDPI");
            }
            else if (currentUserResMode == 16) {// econo
                availableResStrForJobUserResoltion = safeGetString(scriptContext.QueueProperties, "Config:PQEconomodeDPI");
            }

            if (availableResStrForJobUserResoltion == "Res300Dpi") {
                availableResForJobUserResoltion = 1;
            }
            else if (availableResStrForJobUserResoltion == "Res600Dpi") {
                availableResForJobUserResoltion = 2;
            }
            else if (availableResStrForJobUserResoltion == "Res1200Dpi") {
                availableResForJobUserResoltion = 4;
            }

            // If dpi is not matched, change the dpi of page resolution
            if (currentPageRes != availableResForJobUserResoltion) {
                var pageResOptionToChange = null;
                pageResValue = 300;
                if (availableResForJobUserResoltion == 1) { // 300 dpi
                    pageResOptionToChange = "ns0000:_300dpi";
                    pageResValue = 300;
                }
                else if (availableResForJobUserResoltion == 2) { // 600 dpi
                    pageResOptionToChange = "ns0000:_600dpi";
                    pageResValue = 600;
                }
                else if (availableResForJobUserResoltion == 4) { // 1200 dpi
                    pageResOptionToChange = "ns0000:_1200dpi";
                    pageResValue = 1200;
                }
                if (pageResOptionToChange) {
                    removeChildElements(pageResolution, psfPrefix + ":Option");
                    optionNode = addChildElement(pageResolution, psfNs, "Option", pageResOptionToChange);
                    if (optionNode) {
                        propertyNodeX = addChildElement(optionNode, psfNs, "ScoredProperty", "psk:ResolutionX");
                        propertyNodeY = addChildElement(optionNode, psfNs, "ScoredProperty", "psk:ResolutionY");
                        if (propertyNodeX) {
                            addValue(propertyNodeX, pageResValue, "xsd:integer");
                        }
                        if (propertyNodeY) {
                            addValue(propertyNodeY, pageResValue, "xsd:integer");
                        }
                    }
                    ret = 2;
                }
            }
        }
    }


    return ret;
}

function addConstraintToPQOptions(printCapabilities, scriptContext, featureNodesMap) {
    //debugger;
    var rootElement = printCapabilities.XmlNode.documentElement;

    if (isPCGreaterThan070(scriptContext) && isPQStandardTypeBidiSuccessful(scriptContext)) {
        featureNode = (featureNodesMap && featureNodesMap["ns0000:JobUserResolution"]) ||
            (rootElement && getFeatureNode(rootElement, "ns0000:JobUserResolution", PREFIX_CANONICAL));

        if (featureNode) {
            optionNodes = featureNode.selectNodes(psfPrefix + ":Option");

            var displayTagStandardTypevalues = [];
            for (var i = 1; i <= 5; i++) {
                var value = safeGetString(scriptContext.QueueProperties, "Config:PQDisplayTagStandardType" + i.toString());
                if (value != "NotAvailable") {
                    displayTagStandardTypevalues.push("ns0000:" + value);
                }
            }

            for (var i = 0; i < optionNodes.length; i++) {
                optionNode = optionNodes.item(i);
                optionName = getElementName(optionNode, PREFIX_CANONICAL);

                if (includedInArray(displayTagStandardTypevalues, optionName)) {
                    optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "None"));
                }
                else {
                    optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "DeviceSettings"));
                }
            }
        }
    }
}

// set constraint...
function addConstraintToPQandInputBin(printCapabilities, scriptContext, productInfo, featureNodesMap) {
    //debugger;
    var rootElement = printCapabilities.XmlNode.documentElement;
    var shouldUpdatePQCIDOptions = false;
    var isPQBidiSuccess = isPQBidiSuccessful(scriptContext);
    var isInputBinBidiSuccess = isInputBinBidiSuccessful(scriptContext);
    var selectedDevCapNode = null;
    var optionNodes, optionNode, optionName;
    var deviceSettingsValue;
    var devCapOption, devCapOptionNode, enabledOptions, devCapFeatureoptionsNodes, featureNode, found;
    if (productInfo && productInfo.devCapCategory != null) {
        var devCapsXmlString = safeGetString(scriptContext.DriverProperties, "DevCaps");
        var loadedDevCapsXml = loadXMLFromString(printCapabilities, devCapsXmlString);
        if (loadedDevCapsXml) {
            devCapsNodes = loadedDevCapsXml.selectNodes("DeviceCaps/DeviceCap");
            for (var i = 0; i < devCapsNodes.length; i++) {
                var devCapNode = devCapsNodes.item(i);
                var devCapName = devCapNode.getAttribute("name");
                var devCapNames = devCapName.split(",");

                if (includedInArray(devCapNames, productInfo.devCapCategory)) {
                    selectedDevCapNode = devCapNode;
                    break;
                }
            }
        }
    }
    if (selectedDevCapNode) {
        // default set jobUserResolution for not working bidi.
        if (isPQBidiSuccess == false) {
            enabledOptions = [];
            devCapFeatureoptionsNodes = selectedDevCapNode.selectNodes("Features/psf:Feature[@name='ns0000:JobUserResolution']/psf:Option");
            for (var i = 0; i < devCapFeatureoptionsNodes.length; i++) {
                devCapOption = { name: null, isDefault:false };
                devCapOptionNode = devCapFeatureoptionsNodes.item(i);
                devCapOption.name = devCapOptionNode.getAttribute("name");
                devCapOption.isDefault = devCapOptionNode.getAttribute("IsDefault") == "true" ? true:false;
                enabledOptions.push(devCapOption);
            }
            if (enabledOptions.length > 0) {
                shouldUpdatePQCIDOptions = true;
                featureNode = (featureNodesMap && featureNodesMap["ns0000:JobUserResolution"]) ||
                    (rootElement && getFeatureNode(rootElement, "ns0000:JobUserResolution", PREFIX_CANONICAL));
                if (featureNode) {
                    optionNodes = featureNode.selectNodes(psfPrefix + ":Option");
                    for (var i = 0; i < optionNodes.length; i++) {
                        optionNode = optionNodes.item(i);
                        optionName = getElementName(optionNode, PREFIX_CANONICAL);
                        found = findInArray(enabledOptions, function (o) {
                            if (o.name)
                                return o.name == optionName;
                            return false;
                        });
                        if (found != null) {
                            optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "None"));
                        }
                        else {
                            optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "DeviceSettings"));
                        }
                    }
                }
            }
        }
        // default set inputbin for not working bidi.
        if (isInputBinBidiSuccess == false) {
            var optionNameToDeviceSettingsFeatureMap = { "ns0000:Tray2": "Config:CONFIG_Tray2", "ns0000:Tray3": "Config:CONFIG_Tray3", "ns0000:Tray4": "Config:CONFIG_Tray4", "ns0000:Tray5": "Config:CONFIG_Tray5", "ns0000:Tray6": "Config:CONFIG_Tray6", "ns0000:Tray7": "Config:CONFIG_Tray7", "ns0000:Tray8": "Config:CONFIG_Tray8", "ns0000:Tray9": "Config:CONFIG_Tray9", "ns0000:Tray10": "Config:CONFIG_Tray10", "ns0000:envFeed": "Config:CONFIG_envfeed" };
            enabledOptions = [];
            devCapFeatureoptionsNodes = selectedDevCapNode.selectNodes("Features/psf:Feature[@name='psk:PageInputBin']/psf:Option");
            for (var i = 0; i < devCapFeatureoptionsNodes.length; i++) {
                devCapOption = { name: null, isDefault: false };
                devCapOptionNode = devCapFeatureoptionsNodes.item(i);
                devCapOption.name = devCapOptionNode.getAttribute("name");
                devCapOption.isDefault = devCapOptionNode.getAttribute("IsDefault") == "true" ? true : false;
                enabledOptions.push(devCapOption);
            }
            if (enabledOptions.length > 0) {
                featureNode = (featureNodesMap && featureNodesMap["psk:PageInputBin"]) ||
                    (rootElement && getFeatureNode(rootElement, "psk:PageInputBin", PREFIX_CANONICAL));
                if (featureNode) {
                    optionNodes = featureNode.selectNodes(psfPrefix + ":Option");
                    for (var i = 0; i < optionNodes.length; i++) {
                        optionNode = optionNodes.item(i);
                        optionName = getElementName(optionNode, PREFIX_CANONICAL);
                        deviceSettingsValue = safeGetString(scriptContext.QueueProperties, optionNameToDeviceSettingsFeatureMap[optionName]);
                        if (deviceSettingsValue == null || deviceSettingsValue == "AutoConfig") {
                            found = findInArray(enabledOptions, function (o) {
                                if (o.name)
                                    return o.name == optionName;
                                return false;
                            });
                            if (found != null) {
                                optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "None"));
                            }
                            else {
                                optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "DeviceSettings"));
                            }
                        }
                    }
                }
            }
        }
    }
    if (shouldUpdatePQCIDOptions == false && (productInfo.productType == Product_type.Product_PCL6 || productInfo.productType == Product_type.Product_PS)) {
        featureNode = (featureNodesMap && featureNodesMap["ns0000:JobUserResolution"]) ||
            (rootElement && getFeatureNode(rootElement, "ns0000:JobUserResolution", PREFIX_CANONICAL));
        if (featureNode) {
            optionNodes = featureNode.selectNodes(psfPrefix + ":Option");
            for (var i = 0; i < optionNodes.length; i++) {
                optionNode = optionNodes.item(i);
                optionName = getElementName(optionNode, PREFIX_CANONICAL);
                if (optionName == "ns0000:HPS_Normal" ||
                    optionName == "ns0000:HPS_Draft" ||
                    optionName == "ns0000:HPS_Best" ||
                    optionName == "ns0000:HPS_Economode") {
                    optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "DeviceSettings"));
                }
            }
        }
    }
    
}

function isPCGreaterThan070(scriptContext) {
    var isGreaterThan070 = false;

    var printContractVersionMajor = parseInt(safeGetString(scriptContext.QueueProperties, "Config:PrintContractVersionMajor"));
    var printContractVersionMinor = parseInt(safeGetString(scriptContext.QueueProperties, "Config:PrintContractVersionMinor"));

    if (printContractVersionMajor >= 0 && printContractVersionMinor >= 70) {
        isGreaterThan070 = true;
    }
    return isGreaterThan070;
}

function isPQStandardTypeBidiSuccessful(scriptContext) {
    var isBidiSuccessful = false;
    var PQDisplayTagStandardType = "Config:PQDisplayTagStandardType";
    var pqValue;
    for (var i = 1; i <= 5; i++) {
        pqValue = safeGetString(scriptContext.QueueProperties, PQDisplayTagStandardType + i.toString());
        if (pqValue != "NotAvailable") {
            isBidiSuccessful = true;
            break;
        }
    }
    return isBidiSuccessful;
}

function isPQBidiSuccessful(scriptContext) {
    var isBidiSuccessful = false;
    var PQFeaturesList = ["Config:PQNormalSupport", "Config:PQDraftSupport", "Config:PQBestSupport", "Config:PQMaxSupport", "Config:PQEconomodeSupport"];
    var pqValue;
    for (var i = 0; i < PQFeaturesList.length; i++) {
        pqValue = safeGetString(scriptContext.QueueProperties, PQFeaturesList[i]);
        if (pqValue != "NotAvailable") {
            isBidiSuccessful = true;
            break;
        }
    }
    return isBidiSuccessful;
}
function isInputBinBidiSuccessful(scriptContext) {
    var isBidiSuccessful = false;
    var inputBinFeaturesList = ["Config:PC_OptionalTray2", "Config:PC_OptionalTray3", "Config:PC_OptionalTray4", "Config:PC_OptionalTray5", "Config:PC_OptionalTray6", "Config:PC_OptionalTray7", "Config:PC_OptionalTray8", "Config:PC_OptionalTray9", "Config:PC_OptionalTray10", "Config:PC_OptionalEnvelopeFeeder"];
    var inputValue;
    for (var i = 0; i < inputBinFeaturesList.length; i++) {
        inputValue = safeGetString(scriptContext.QueueProperties, inputBinFeaturesList[i]);
        if (inputValue != "NotInstalled") {
            isBidiSuccessful = true;
            break;
        }
    }
    return isBidiSuccessful;
}

//inputbin
function inputBinAutoSelectConstraintHandling(printCapabilitiesOrTicket, productInfo, featureNodesMap) {
    var ret = 1;
    var rootElement = printCapabilitiesOrTicket.XmlNode.documentElement;
    var JobInputBinNode = (featureNodesMap && featureNodesMap["psk:PageInputBin"]) || (getFeatureNode(rootElement, "psk:PageInputBin", PREFIX_CANONICAL));
    var isPrintCapabilities = rootElement.baseName == "PrintCapabilities";
    var optionNode, optionName, optionNodes;
    if (JobInputBinNode) {
        // constraint to AutoSelect... in capabality.
        if (isPrintCapabilities) {
            optionNodes = JobInputBinNode.selectNodes(psfPrefix + ":Option");
            for (var i = 0; i < optionNodes.length; i++) {
                optionNode = optionNodes.item(i);
                optionName = getElementName(optionNode, PREFIX_CANONICAL);
                if (optionName && optionName.substring(optionName.indexOf(":") + 1) == "AutoSelect") {
                    optionNode.setAttribute("constrained", getNameWithNs(printCapabilitiesOrTicket.XmlNode, pskNs, "DeviceSettings"));
                    break;
                }
            }
        }
        // change option from AutoSelect to UsePrinterSetting... in ticket
        else {
            optionNodes = getSelectedOptionNode(JobInputBinNode);
            optionName = optionNodes ? optionNodes.getAttribute("name") : null;
            if (optionName && optionName == "psk:AutoSelect") {
                removeChildElements(JobInputBinNode, psfPrefix + ":Option");
                if (productInfo && productInfo.productType == Product_type.Product_PCLmS) {
                    addChildElement(JobInputBinNode, psfNs, "Option", "ns0000:Tray1");
                }
                else {
                    addChildElement(JobInputBinNode, psfNs, "Option", "ns0000:UsePrinterSetting");
                }

                ret = 2;
            }
        }

    }
    return ret;
}

//outputbin
function getOutputBinBidi(scriptContext) {
    var ret = 0;
    var strOutputbinQuery = "Config:PC_BIDIOptionalOutputbin";
    var propName, strOutputbinName;
    for (var idx = 1; idx < 13; idx++) {
        propName = strOutputbinQuery + idx.toString();
        strOutputbinName = safeGetString(scriptContext.QueueProperties, propName);

        if (strOutputbinName) {
            switch (strOutputbinName) {
                case "PC_StandardBin":
                    ret = ret + OutputBinType.PC_StandardBin;
                    break;
                case "PC_EngineOptionalBin1":
                    ret = ret + OutputBinType.PC_EngineOptionalBin1;
                    break;
                case "PC_AlternateBinFaceUp":
                    ret = ret + OutputBinType.PC_AlternateBinFaceUp;
                    break;
                case "PC_OutputBin1":
                    ret = ret + OutputBinType.PC_OutputBin1;
                    break;
                case "PC_OutputBin2":
                    ret = ret + OutputBinType.PC_OutputBin2;
                    break;
                case "PC_OutputBin3":
                    ret = ret + OutputBinType.PC_OutputBin3;
                    break;
                case "PC_OutputBin4":
                    ret = ret + OutputBinType.PC_OutputBin4;
                    break;
                case "PC_OutputBin5":
                    ret = ret + OutputBinType.PC_OutputBin5;
                    break;
                case "PC_OutputBin6":
                    ret = ret + OutputBinType.PC_OutputBin6;
                    break;
                case "PC_OutputBin7":
                    ret = ret + OutputBinType.PC_OutputBin7;
                    break;
                case "PC_OutputBin8":
                    ret = ret + OutputBinType.PC_OutputBin8;
                    break;
                case "PC_STACKER":
                    ret = ret + OutputBinType.PC_STACKER;
                    break;
                case "PC_SEPERATOR":
                    ret = ret + OutputBinType.PC_SEPERATOR;
                    break;
                case "PC_COLLATOR":
                    ret = ret + OutputBinType.PC_COLLATOR;
                    break;
                default:
                    ret = ret + OutputBinType.PC_NoOutputBin;
            }

        }
    }

    return ret;
}
function validateOutputbinFeatures(outputbinSets, printTicket, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    var outputbinChanged = false;
    var ret = 1;
    if (outputbinSets && outputbinSets > 0) {
        var binNode;
        var outputbinLists = [
            { bin: OutputBinType.PC_StandardBin, name: "ns0000:JobUIConfig_StandardBin" },
            { bin: OutputBinType.PC_EngineOptionalBin1, name: "ns0000:JobUIConfig_EngineOptionalBin1" },
            { bin: OutputBinType.PC_AlternateBinFaceUp, name: "ns0000:JobUIConfig_AlternateBinFaceUp" },
            { bin: OutputBinType.PC_OutputBin1, name: "ns0000:JobUIConfig_OutputBin1" },
            { bin: OutputBinType.PC_OutputBin2, name: "ns0000:JobUIConfig_OutputBin2" },
            { bin: OutputBinType.PC_OutputBin3, name: "ns0000:JobUIConfig_OutputBin3" },
            { bin: OutputBinType.PC_OutputBin4, name: "ns0000:JobUIConfig_OutputBin4" },
            { bin: OutputBinType.PC_OutputBin5, name: "ns0000:JobUIConfig_OutputBin5" },
            { bin: OutputBinType.PC_OutputBin6, name: "ns0000:JobUIConfig_OutputBin6" },
            { bin: OutputBinType.PC_OutputBin7, name: "ns0000:JobUIConfig_OutputBin7" },
            { bin: OutputBinType.PC_OutputBin8, name: "ns0000:JobUIConfig_OutputBin8" },
            { bin: OutputBinType.PC_STACKER, name: "ns0000:JobUIConfig_STACKER" },
            { bin: OutputBinType.PC_SEPERATOR, name: "ns0000:JobUIConfig_SEPERATOR" },
            { bin: OutputBinType.PC_COLLATOR, name: "ns0000:JobUIConfig_COLLATOR" }
        ];
        for (var i = 0; i < outputbinLists.length; i++) {
            if (outputbinSets & outputbinLists[i].bin) {
                binNode = (featureNodesMap && featureNodesMap[outputbinLists[i].name]) ||
                    (rootElement && getFeatureNode(rootElement, outputbinLists[i].name, PREFIX_CANONICAL));
                if (binNode) {
                    removeChildElements(binNode, psfPrefix + ":Option");
                    addChildElement(binNode, psfNs, "Option", "ns0000:Installed");
                    outputbinChanged = true;
                }
            }
            else {
                binNode = (featureNodesMap && featureNodesMap[outputbinLists[i].name]) ||
                    (rootElement && getFeatureNode(rootElement, outputbinLists[i].name, PREFIX_CANONICAL));
                if (binNode) {
                    removeChildElements(binNode, psfPrefix + ":Option");
                    addChildElement(binNode, psfNs, "Option", "ns0000:NotInstalled");
                    outputbinChanged = true;
                }
            }
        }
    }
    if (outputbinChanged) {
        ret = 2;
    }
    return ret;
}
function outputbinConstraintHandling(printCapabilities, scriptContext, featureNodesMap) {
    if ("AutoConfig" == safeGetString(scriptContext.QueueProperties, "Config:CONFIG_OutputBinMode")) {
        var rootElement = printCapabilities.XmlNode.documentElement;
        var jobOutputBinNode = (featureNodesMap && featureNodesMap["psk:JobOutputBin"]) ||
            (rootElement && getFeatureNode(rootElement, "psk:JobOutputBin", PREFIX_CANONICAL));
        var optionNodes, optionNode, optionName;
        if (jobOutputBinNode) {
            //Get the Bidi options:
            var installedOutputbinArray = [];
            var optionalOutputbin = "Config:PC_BIDIOptionalOutputbin";
            var outputbinFoldUnit = "Config:PC_BIDIMediaOutputFoldUnit";
            var outputbinModeUnit = "Config:PC_BIDIOutputModeUnit";
            var strOutputbinName, strOutputbinFold, strOutputbinMode, firstSupportedBin;
            var numSupportedBin = 0;
            for (var idx = 1; idx < 13; idx++) {
                strOutputbinName = safeGetString(scriptContext.QueueProperties, optionalOutputbin + idx.toString());
                strOutputbinFold = safeGetString(scriptContext.QueueProperties, outputbinFoldUnit + idx.toString());
                strOutputbinMode = safeGetString(scriptContext.QueueProperties, outputbinModeUnit + idx.toString());
                if ((strOutputbinName != "PC_NoOutputBin") && strOutputbinFold != "Installed" && strOutputbinMode != "FunctionSeparator") {
                    installedOutputbinArray[idx - 1] = strOutputbinName;
                    numSupportedBin += 1;
                    if (numSupportedBin == 1) {
                        firstSupportedBin = strOutputbinName;
                    }
                }
            }
            if (installedOutputbinArray.length == 0) {
                optionNodes = jobOutputBinNode.selectNodes(psfPrefix + ":Option");
                for (var i = 0; i < optionNodes.length; i++) {
                    optionNode = optionNodes.item(i);
                    optionName = getElementName(optionNode, PREFIX_CANONICAL);
                    if (optionName && optionName.substring(optionName.indexOf(":") + 1) != "AutomaticallySelect") {
                        optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "DeviceSettings"));
                    }
                }
            }
            else if (numSupportedBin == 1) {
                optionNodes = jobOutputBinNode.selectNodes(psfPrefix + ":Option");
                for (var j = 0; j < optionNodes.length; j++) {
                    optionNode = optionNodes.item(j);
                    optionName = getElementName(optionNode, PREFIX_CANONICAL);
                    if (firstSupportedBin != optionName.substring(optionName.indexOf(":") + 1)) {
                        optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "DeviceSettings"));
                    }
                }
            }
            else {
                optionNodes = jobOutputBinNode.selectNodes(psfPrefix + ":Option");
                var found;
                for (var j = 0; j < optionNodes.length; j++) {
                    optionNode = optionNodes.item(j);
                    optionName = getElementName(optionNode, PREFIX_CANONICAL);
                    if (optionName && optionName.substring(optionName.indexOf(":") + 1) != "AutomaticallySelect") {
                        found = false;
                        for (var k = 0; k < installedOutputbinArray.length; k++) {
                            if (optionName.substring(optionName.indexOf(":") + 1) == installedOutputbinArray[k]) {
                                found = true;
                                break;
                            }
                        }
                        if (found == false) {
                            optionNode.setAttribute("constrained", getNameWithNs(printCapabilities.XmlNode, pskNs, "DeviceSettings"));
                        }
                    }
                }
            }
        }
    }
}
function addOutputBinTypeNodeInPT(printTicket, scriptContext, productInfo, featureNodesMap) {
    //debugger;
    var rootElement = printTicket.XmlNode.documentElement;
    var jobOutputBinNodeFeature = (featureNodesMap && featureNodesMap["psk:JobOutputBin"]) ||
        (rootElement && getFeatureNode(rootElement, "psk:JobOutputBin", PREFIX_CANONICAL));
    if (jobOutputBinNodeFeature) {
        var jobOutputBinOptionNode = getSelectedOptionNode(jobOutputBinNodeFeature);
        var jobOutputBinOptionNodeName = jobOutputBinOptionNode.getAttribute("name");
        var key = jobOutputBinOptionNodeName.substring(jobOutputBinOptionNodeName.indexOf(":") + 1);
        //Get the Bidi options:
        var optionalOutputbin = "Config:PC_BIDIOptionalOutputbin";
        var outputbinDirection = "Config:PC_BIDIMediaOutputPageDelivery";
        var outputbinFoldUnit = "Config:PC_BIDIMediaOutputFoldUnit";
        var outputbinModeUnit = "Config:PC_BIDIOutputModeUnit";
        var countInstalledBins = 0;
        var IsAllBinDirectionSame = true;
        var strOutputbinDirectionprev = "";
        //Loop through all output bins to know if all have same orientation or set the JobOutputBinDirection node if the output bin matches selected option
        var strOutputbinNamecurr, strOutputbinDirectioncurr, strOutputbinFoldUnitcurr, strOutputbinModeUnitcurr, firstSupportedBin;
        var numSupportedBins = 0;
        //Validate output bin option in case of only 1 supported outputbin
        for (var idx = 1; idx < 13; idx++) {
            strOutputbinNamecurr = safeGetString(scriptContext.QueueProperties, optionalOutputbin + idx.toString());
            strOutputbinFoldUnitcurr = safeGetString(scriptContext.QueueProperties, outputbinFoldUnit + idx.toString());
            strOutputbinModeUnitcurr = safeGetString(scriptContext.QueueProperties, outputbinModeUnit + idx.toString());
            if ((strOutputbinNamecurr != "PC_NoOutputBin") && strOutputbinFoldUnitcurr != "Installed" && strOutputbinModeUnitcurr != "FunctionSeparator") {
                numSupportedBins += 1;
                if (numSupportedBins == 1) {
                    firstSupportedBin = strOutputbinNamecurr;
                }
            }
        }
        if (numSupportedBins == 1 && key != firstSupportedBin) {
            key = firstSupportedBin;
            removeChildElements(jobOutputBinNodeFeature, psfPrefix + ":Option");
            addChildElement(jobOutputBinNodeFeature, psfNs, "Option", "ns0000:" + firstSupportedBin);
        }
        for (var idx = 1; idx < 13; idx++) {
            strOutputbinNamecurr = safeGetString(scriptContext.QueueProperties, optionalOutputbin + idx.toString());
            strOutputbinDirectioncurr = safeGetString(scriptContext.QueueProperties, outputbinDirection + idx.toString());
            //Don't care if Bidi does not work
            if (strOutputbinNamecurr != "PC_NoOutputBin") {
                if (strOutputbinDirectionprev != strOutputbinDirectioncurr && countInstalledBins > 0)
                    IsAllBinDirectionSame = false;
                if (strOutputbinNamecurr == key) {
                    setParameterInitNode(printTicket.XmlNode, "ns0000:JobOutputBinDirection", PREFIX_CANONICAL, strOutputbinDirectioncurr, "xsd:string");
                    break;
                }
                strOutputbinDirectionprev = strOutputbinDirectioncurr;
                countInstalledBins++;
            }
        }
        if (key == "AutomaticallySelect") {
            //check if AutomaticallySelect option is present in PT for atleast one installed bin with all values same for each orientaion, in that case set orintation to that common value
            if (countInstalledBins > 0) {
                if (IsAllBinDirectionSame) {
                    setParameterInitNode(printTicket.XmlNode, "ns0000:JobOutputBinDirection", PREFIX_CANONICAL, strOutputbinDirectionprev, "xsd:string");
                }
                //check if auto select is the option for atleast one installed bin, in that case set orintation to that common value
                else {
                    setParameterInitNode(printTicket.XmlNode, "ns0000:JobOutputBinDirection", PREFIX_CANONICAL, "FACEDOWN", "xsd:string");
                }
            }
            //CID based approach if none of the bins is installed
            else if (productInfo) {
                if (productInfo.outDirection == Output_Direction.FACEUP) {
                    setParameterInitNode(printTicket.XmlNode, "ns0000:JobOutputBinDirection", PREFIX_CANONICAL, "FACEUP", "xsd:string");
                }
                else {
                    setParameterInitNode(printTicket.XmlNode, "ns0000:JobOutputBinDirection", PREFIX_CANONICAL, "FACEDOWN", "xsd:string");
                }
            }
        }
    }
}

//color mode
function getCurrentDeviceColorBidi(scriptContext) {

    var curColorDevmode = 0; // 0: not decided, 1 : mono, 2 : color
    var colorBidi = safeGetString(scriptContext.QueueProperties, "Config:ColorOrMonoPrinter");
    var colorUserConfig = safeGetString(scriptContext.QueueProperties, "Config:CONFIG_ColorOrMonoPrinter");

    if ((colorUserConfig == "AutoConfig" && colorBidi == "MonoPrinter") || colorUserConfig == "MonoPrinter") {
        curColorDevmode = 1;
    }
    else if ((colorUserConfig == "AutoConfig" && colorBidi == "ColorPrinter") || colorUserConfig == "ColorPrinter") {
        curColorDevmode = 2;
    }
    return curColorDevmode;
}
function validateDefaultPageOutputColorPt(currentColorDevmode, printTicket, featureNodesMap) {
    var ret = 1;
    var rootElement = printTicket.XmlNode.documentElement;
    // chage default color
    var supportColor = false;
    var setDefault = false;
    var colormodeNode, curColorMode, colorOptionNode, propertyNode1, propertyNode2;
    var defaultColor = "psk:Monochrome";
    var defaultDeviceBitsPerPixel = 8;
    if (currentColorDevmode && currentColorDevmode > 0) {
        var colormodePrinting = (featureNodesMap && featureNodesMap["psk:PageOutputColor"]) ||
            (rootElement && getFeatureNode(rootElement, "psk:PageOutputColor", PREFIX_CANONICAL));
        if (colormodePrinting) {
            colormodeNode = getSelectedOptionNode(colormodePrinting);
            curColorMode = colormodeNode ? colormodeNode.getAttribute("name") : null;
            if (curColorMode) {
                if (currentColorDevmode == 2) {
                    supportColor = true;
                }
                if (((curColorMode == "psk:Color" || curColorMode == "psk: Grayscale") && !supportColor) ||
                    (curColorMode == "psk:Monochrome" && supportColor)) {
                    setDefault = true;
                }
            }
            if (setDefault) {
                // set defualt to mono
                //colormodePrinting.appendChild(colormodePrinting.createComment("colormodeInitSetting bidi config:ColorOrMonoPrinter -" + colorDefault));
                removeChildElements(colormodePrinting, psfPrefix + ":Option");

                if (supportColor) {
                    defaultColor = "psk:Color";
                    defaultDeviceBitsPerPixel = 24;
                }
                colorOptionNode = addChildElement(colormodePrinting, psfNs, "Option", defaultColor);
                propertyNode1 = addChildElement(colorOptionNode, psfNs, "ScoredProperty", "psk:DeviceBitsPerPixel");
                if (propertyNode1) {
                    addValue(propertyNode1, defaultDeviceBitsPerPixel, "xsd:integer");
                }
                propertyNode2 = addChildElement(colorOptionNode, psfNs, "ScoredProperty", "psk:DriverBitsPerPixel");
                if (propertyNode2) {
                    addValue(propertyNode2, 1, "xsd:integer");
                }
                ret = 2;

            }
        }
    }
    return ret;
}

//update rotation
function updateRotationForLandscape(printTicket) {
    var ret = 1;
    var rootElement = printTicket.XmlNode.documentElement;
    var featureNode = (rootElement && getFeatureNode(rootElement, "psk:PageOrientation", PREFIX_CANONICAL));
    if (featureNode) {
        var optionName = getSelectedOptionName(featureNode, PREFIX_CANONICAL);
        var rotateNode = (rootElement && getFeatureNode(rootElement, "ns0000:PageRotate180", PREFIX_CANONICAL));
        if (rotateNode) {
            if (optionName && optionName == "psk:Landscape") {
                removeChildElements(rotateNode, psfPrefix + ":Option");
                addChildElement(rotateNode, psfNs, "Option", "ns0000:Rotate180");
                ret = 2;
            }
            else {
                removeChildElements(rotateNode, psfPrefix + ":Option");
                addChildElement(rotateNode, psfNs, "Option", "ns0000:NoRotation");
                ret = 2;
            }
        }
    }
    return ret;
}

//custom paper
function addCustomPaperSize(printCapabilitiesorTicket, scriptContext, featureNodesMap) {
    var rootElement = printCapabilitiesorTicket.XmlNode.documentElement;
    var isPrintCapabilities = rootElement.baseName == "PrintCapabilities";
    var paperNode = (featureNodesMap && featureNodesMap["psk:PageMediaSize"]) ||
        (getFeatureNode(rootElement, "psk:PageMediaSize", PREFIX_CANONICAL));
    if (paperNode == null) {
        return;
    }
    //add CustomPapersize Name
    if (isPrintCapabilities) {
        var customPaperString = null;
        // exception can be occured in filter because UserProperties can not be accessed in the filter.
        try {
            customPaperString = safeGetString(scriptContext.UserProperties, "CustomMediaSizes");
        }
        catch (e) {
            customPaperString = null;
        }
        if (customPaperString) {
            var customPapers = parseNameValuePairsString(customPaperString);
            var customPaperValue, customPaper, optionNode;
            for (var name in customPapers) {
                customPaperValue = customPapers[name];
                if (customPaperValue) {
                    customPaper = parseCustomPaperValueStringWithCommaDelimeter(customPaperValue);
                    if (customPaper) {
                        optionNode = getOptionNode(paperNode, name);
                        if (optionNode) {
                            removeElement(optionNode);
                        }
                        optionNode = addChildElement(paperNode, psfNs, "Option", name);
                        if (optionNode) {
                            setProperty(optionNode, false, "DisplayName", pskNs, customPaper.dispname, "string", xsdNs, true);
                            setProperty(optionNode, true, "MediaSizeWidth", pskNs, customPaper.width, "integer", xsdNs, true);
                            setProperty(optionNode, true, "MediaSizeHeight", pskNs, customPaper.height, "integer", xsdNs, true);
                        }
                    }
                }
            }
        }
    }
    else {
        var customPaperOptionNode = getOptionNode(paperNode, "psk:CustomMediaSize");
        var paramCustomSizeNameNode, value;
        if (customPaperOptionNode) {
             paramCustomSizeNameNode = getParameterInitNode(printCapabilitiesorTicket.XmlNode, "ns0000:PageMediaSizeCustomSizeName", PREFIX_CANONICAL);
            if (paramCustomSizeNameNode) {
                value = getPropertyValue(paramCustomSizeNameNode);
                setProperty(customPaperOptionNode, false, "DisplayName", pskNs, value, "string", xsdNs, true);
            }
        }
    }
}

//duplex
function duplexToPt(printTicket, scriptContext, productInfo, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    var DuplexerInstalled = "NotInstalled";
    var duplexFeature = (featureNodesMap && featureNodesMap["psk:JobDuplexAllDocumentsContiguously"]);
    var duplexOptionNode = getSelectedOptionNode(duplexFeature);
    var quepropBidiDuplex = safeGetString(scriptContext.QueueProperties, "Config:DuplexUnit"); 
    var quepropConfigDuplex = safeGetString(scriptContext.QueueProperties, "Config:CONFIG_DuplexMode");
    var manualDuplexFeature = null;
    if (quepropBidiDuplex && quepropConfigDuplex) {
        if ((quepropConfigDuplex == "NotInstalled") || ((quepropConfigDuplex == "AutoConfig") && (quepropBidiDuplex == "NotInstalled"))) {
            DuplexerInstalled = "NotInstalled"
        }
        else {
            DuplexerInstalled = "Installed";
        }
    }
    if (DuplexerInstalled == "NotInstalled") {
        var optionmanualDuplex;
        if (productInfo && (productInfo.productType == Product_type.Product_PCL3 || productInfo.productType == Product_type.Product_PS)) {
            // Update JobManualDuplex to Manual Simplex
            manualDuplexFeature = (featureNodesMap && featureNodesMap["ns0000:JobManualDuplex"]) ||
                (rootElement && getFeatureNode(rootElement, "ns0000:JobManualDuplex", PREFIX_CANONICAL));
            if (manualDuplexFeature) {
                optionmanualDuplex = getSelectedOptionNode(manualDuplexFeature);
                if (optionmanualDuplex && (optionmanualDuplex.getAttribute("name") != "ns0000:ManualSimplex")) {
                    removeChildElements(manualDuplexFeature, psfPrefix + ":Option")
                    addChildElement(manualDuplexFeature, psfNs, "Option", "ns0000:ManualSimplex");
                }
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionTextHeader", PREFIX_CANONICAL, "", "xsd:string");
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText1", PREFIX_CANONICAL, "", "xsd:string");
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText2", PREFIX_CANONICAL, "", "xsd:string");
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText3", PREFIX_CANONICAL, "", "xsd:string");
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage1", PREFIX_CANONICAL, "", "xsd:string");
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage2", PREFIX_CANONICAL, "", "xsd:string");
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage3", PREFIX_CANONICAL, "", "xsd:string");
            }
        }
        else {
            updateManualDuplexPT(printTicket, scriptContext, productInfo, featureNodesMap, duplexFeature)
        }
    }
    else {
        SetManualDuplexToNone(printTicket, scriptContext, productInfo, featureNodesMap, duplexFeature);

        setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionTextHeader", PREFIX_CANONICAL, "", "xsd:string");
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText1", PREFIX_CANONICAL, "", "xsd:string");
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText2", PREFIX_CANONICAL, "", "xsd:string");
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText3", PREFIX_CANONICAL, "", "xsd:string");
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage1", PREFIX_CANONICAL, "", "xsd:string");
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage2", PREFIX_CANONICAL, "", "xsd:string");
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage3", PREFIX_CANONICAL, "", "xsd:string");
        
        insertQNameScoredProperty(duplexOptionNode, "psk:DuplexMode", "psk:Automatic");
    }
}
function addManualDuplex(printCapabilities, featureNodesMap) {
    var rootElement = printCapabilities.XmlNode.documentElement;
    var duplexNode = (featureNodesMap && featureNodesMap["psk:JobDuplexAllDocumentsContiguously"]) ||
        (rootElement && getFeatureNode(rootElement, "psk:JobDuplexAllDocumentsContiguously", PREFIX_CANONICAL));
    if (duplexNode) {
        var jobManualDuplexPropertiesFeatureNode = getFeatureNode(duplexNode, "ns0000:JobManualDuplexProperties", PREFIX_CANONICAL);
        if (jobManualDuplexPropertiesFeatureNode) {
            var manualDuplexPropertiesOptionNode = getOptionNode(jobManualDuplexPropertiesFeatureNode, "ns0000:ManualDuplexProperties");
            if (manualDuplexPropertiesOptionNode) {
                setProperty(manualDuplexPropertiesOptionNode, false, "ManualBackSource", venderDefinedNs, "psk:Manual", "string", xsdNs, false);
                setProperty(manualDuplexPropertiesOptionNode, false, "BindingRotate", venderDefinedNs, "0", "integer", xsdNs, false);
                setProperty(manualDuplexPropertiesOptionNode, false, "BackReverseOrder", venderDefinedNs, "0", "integer", xsdNs, false);
                setProperty(manualDuplexPropertiesOptionNode, false, "FrontReverseOrder", venderDefinedNs, "0", "integer", xsdNs, false);
                setProperty(manualDuplexPropertiesOptionNode, false, "BackRotate", venderDefinedNs, "0", "integer", xsdNs, false);
                setProperty(manualDuplexPropertiesOptionNode, false, "EvensFirst", venderDefinedNs, "1", "integer", xsdNs, false);
                setProperty(manualDuplexPropertiesOptionNode, false, "DuplexFallback", venderDefinedNs, "1", "integer", xsdNs, false);
                setProperty(manualDuplexPropertiesOptionNode, false, "MergeCopies", venderDefinedNs, "1", "integer", xsdNs, false);
            }
        }
    }
}
function updateManualDuplexPT(printTicket, scriptContext, productInfo, featureNodesMap, duplexFeature) {
    var rootElement = printTicket.XmlNode.documentElement;
    var manualDuplexAttributes = null;
    var manualDuplexFeature, optionmanualDuplex, ManualDuplexPropertiesFeature, ManualDuplexPropertiesOption, optionPrintOnBothSidesManually, printonbothSideManuallyFeature;
    var propertyNode;
    var propertyName;
    var manualAttribute = { enhancedManDupAttribute: null, jobHPFeedType: null, textHeader: null, text1: null, text2: null, text3: null, image1: null, image2: null, image3: null };
    var _FeedType, _image1, _image2, _image3, _text1, _text2, _text3, _enhManDupAttr, _textHeader;
    var _ManualBackSource, _BindingRotate, _BackReverseOrder, _FrontReverseOrder, _BackRotate, _EvensFirst, _DuplexFallback, _MergeCopies;
    if (null == duplexFeature )
        return;
    var duplexOptionNode = getSelectedOptionNode(duplexFeature);
    if (productInfo && productInfo.manualDuplexType) {
        var selectedMaualDuplexNode = null;
        var manualDupXmlString = safeGetString(scriptContext.QueueProperties, "ManualDuplex");
        var loadedManualDupXml = loadXMLFromString(printTicket, manualDupXmlString);
        selectedMaualDuplexNode = loadedManualDupXml.selectSingleNode("/ManualDuplexAttributes/prn_grp[@name='" + productInfo.manualDuplexType.split('_')[0] + "']");
        if (selectedMaualDuplexNode) {
            var propertyNodes = selectedMaualDuplexNode.selectNodes("Property");
            for (var i = 0; i < propertyNodes.length; i++) {
                propertyNode = propertyNodes.item(i);
                propertyName = propertyNode.getAttribute("name");
                if (propertyName == "EnhancedManDupAttribute") {
                    manualAttribute.enhancedManDupAttribute = propertyNode.text;
                } else if (propertyName == "JobHPFeedType") {
                    manualAttribute.jobHPFeedType = propertyNode.text;
                } else if (propertyName == "TextHeader") {
                    manualAttribute.textHeader = propertyNode.text;
                } else if (propertyName == "Text1") {
                    manualAttribute.text1 = propertyNode.text;
                } else if (propertyName == "Text2") {
                    manualAttribute.text2 = propertyNode.text;
                } else if (propertyName == "Text3") {
                    manualAttribute.text3 = propertyNode.text;
                } else if (propertyName == "Image1") {
                    manualAttribute.image1 = propertyNode.text;
                } else if (propertyName == "Image2") {
                    manualAttribute.image2 = propertyNode.text;
                } else if (propertyName == "Image3") {
                    manualAttribute.image3 = propertyNode.text;
                }
            }
            manualDuplexAttributes = manualAttribute;
        }
    }
    if (manualDuplexAttributes) {
        _FeedType = manualDuplexAttributes.jobHPFeedType;
        _image1 = manualDuplexAttributes.image1;
        _image2 = manualDuplexAttributes.image2;
        _image3 = manualDuplexAttributes.image3;
        _textHeader = manualDuplexAttributes.textHeader;
        _text1 = manualDuplexAttributes.text1;
        _text2 = manualDuplexAttributes.text2;
        _text3 = manualDuplexAttributes.text3;
        _enhManDupAttr = manualDuplexAttributes.enhancedManDupAttribute;
        if (_enhManDupAttr) {
            var str = _enhManDupAttr.split("-");
            if (2 == str.length) {
                _ManualBackSource = str[0];
                if (str[1]) {
                    var attrPart2 = str[1].split("");
                    if (attrPart2.length == 7) {
                        _BindingRotate = attrPart2[0];
                        _BackReverseOrder = attrPart2[1];
                        _FrontReverseOrder = attrPart2[2];
                        _BackRotate = attrPart2[3];
                        _EvensFirst = attrPart2[4];
                        _DuplexFallback = attrPart2[5];
                        _MergeCopies = attrPart2[6];
                    }
                }
            }
        }
        manualDuplexFeature = (featureNodesMap && featureNodesMap["ns0000:JobManualDuplex"]) ||
            (rootElement && getFeatureNode(rootElement, "ns0000:JobManualDuplex", PREFIX_CANONICAL));
        if (manualDuplexFeature) {
            if (_textHeader != null) {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionTextHeader", PREFIX_CANONICAL, _textHeader, "xsd:string");
            }
            else {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionTextHeader", PREFIX_CANONICAL, "", "xsd:string");
            }
            if (_text1 != null) {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText1", PREFIX_CANONICAL, _text1, "xsd:string");
            }
            else {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText1", PREFIX_CANONICAL, "", "xsd:string");
            }
            if (_text2 != null) {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText2", PREFIX_CANONICAL, _text2, "xsd:string");
            }
            else {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText2", PREFIX_CANONICAL, "", "xsd:string");
            }
            if (_text3 != null) {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText3", PREFIX_CANONICAL, _text3, "xsd:string");
            }
            else {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText3", PREFIX_CANONICAL, "", "xsd:string");
            }
            if (_image1 != null) {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage1", PREFIX_CANONICAL, _image1, "xsd:string");
            }
            else {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage1", PREFIX_CANONICAL, "", "xsd:string");
            }
            if (_image2 != null) {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage2", PREFIX_CANONICAL, _image2, "xsd:string");
            }
            else {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage2", PREFIX_CANONICAL, "", "xsd:string");
            }
            if (_image3 != null) {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage3", PREFIX_CANONICAL, _image3, "xsd:string");
            }
            else {
                setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage3", PREFIX_CANONICAL, "", "xsd:string");
            }
        }
        var duplexOptionName = duplexOptionNode.getAttribute("name");
        if ((duplexOptionName == "psk:TwoSidedLongEdge" || duplexOptionName == "psk:TwoSidedShortEdge")) {
            // Update JobHPFeedType as per the model
            if (_FeedType) {
                var feedTypeFeature = (featureNodesMap && featureNodesMap["ns0000:JobHPFeedType"]) ||
                    (rootElement && getFeatureNode(rootElement, "ns0000:JobHPFeedType", PREFIX_CANONICAL));
                if (feedTypeFeature) {
                    var optionFeedType = getSelectedOptionNode(feedTypeFeature);
                    if (optionFeedType && (optionFeedType.getAttribute("name") != "ns0000:" + _FeedType)) {
                        removeChildElements(feedTypeFeature, psfPrefix + ":Option")
                        addChildElement(feedTypeFeature, psfNs, "Option", "ns0000:" + _FeedType);
                    }
                }
            }
            //Update JobManualDuplex to LongEdge/ShortEdge based on user selection
            manualDuplexFeature = (featureNodesMap && featureNodesMap["ns0000:JobManualDuplex"]) ||
                (rootElement && getFeatureNode(rootElement, "ns0000:JobManualDuplex", PREFIX_CANONICAL));
            if (manualDuplexFeature) {
                optionmanualDuplex = getSelectedOptionNode(manualDuplexFeature);
                if (duplexOptionName == "psk:TwoSidedLongEdge") {
                    if (optionmanualDuplex && (optionmanualDuplex.getAttribute("name") != "ns0000:ManualLongEdge")) {
                        removeChildElements(manualDuplexFeature, psfPrefix + ":Option")
                        addChildElement(manualDuplexFeature, psfNs, "Option", "ns0000:ManualLongEdge");
                    }
                }
                if (duplexOptionName == "psk:TwoSidedShortEdge") {
                    if (optionmanualDuplex && (optionmanualDuplex.getAttribute("name") != "ns0000:ManualShortEdge")) {
                        removeChildElements(manualDuplexFeature, psfPrefix + ":Option")
                        addChildElement(manualDuplexFeature, psfNs, "Option", "ns0000:ManualShortEdge");
                    }
                }
            }
            //Update subFeature JobManualDuplexProperties and its properties
            ManualDuplexPropertiesFeature = (duplexFeature && getFeatureNode(duplexFeature, "ns0000:JobManualDuplexProperties", PREFIX_CANONICAL));
            if (ManualDuplexPropertiesFeature) {
                ManualDuplexPropertiesOption = getSelectedOptionNode(ManualDuplexPropertiesFeature);
                if (ManualDuplexPropertiesOption) {
                    removeChildElements(ManualDuplexPropertiesFeature, psfPrefix + ":Option");
                }
            }
            else {
                ManualDuplexPropertiesFeature = addChildElement(duplexFeature, psfNs, "Feature", "ns0000:JobManualDuplexProperties");
            }

            ManualDuplexPropertiesOption = addChildElement(ManualDuplexPropertiesFeature, psfNs, "Option", "ns0000:ManualDuplexProperties");
            if (ManualDuplexPropertiesOption) {
                setProperty(ManualDuplexPropertiesOption, false, "ManualBackSource", venderDefinedNs, _ManualBackSource, "string", xsdNs, true);
                setProperty(ManualDuplexPropertiesOption, false, "BindingRotate", venderDefinedNs, _BindingRotate, "integer", xsdNs, false);
                setProperty(ManualDuplexPropertiesOption, false, "BackReverseOrder", venderDefinedNs, _BackReverseOrder, "integer", xsdNs, false);
                setProperty(ManualDuplexPropertiesOption, false, "FrontReverseOrder", venderDefinedNs, _FrontReverseOrder, "integer", xsdNs, false);
                setProperty(ManualDuplexPropertiesOption, false, "BackRotate", venderDefinedNs, _BackRotate, "integer", xsdNs, false);
                setProperty(ManualDuplexPropertiesOption, false, "EvensFirst", venderDefinedNs, _EvensFirst, "integer", xsdNs, false);
                setProperty(ManualDuplexPropertiesOption, false, "DuplexFallback", venderDefinedNs, _DuplexFallback, "integer", xsdNs, false);
                setProperty(ManualDuplexPropertiesOption, false, "MergeCopies", venderDefinedNs, _MergeCopies, "integer", xsdNs, false);
            }

        }
        else { // for One sided
            SetManualDuplexToNone(printTicket, scriptContext, productInfo, featureNodesMap, duplexFeature);
        }
        // Set JobHPPrintOnBothSidesManually to ON
        printonbothSideManuallyFeature = (featureNodesMap && featureNodesMap["ns0000:JobHPPrintOnBothSidesManually"]) ||
            (rootElement && getFeatureNode(rootElement, "ns0000:JobHPPrintOnBothSidesManually", PREFIX_CANONICAL));
        if (printonbothSideManuallyFeature) {
            optionPrintOnBothSidesManually = getSelectedOptionNode(printonbothSideManuallyFeature);
            if (optionPrintOnBothSidesManually && (optionPrintOnBothSidesManually.getAttribute("name") == "ns0000:OFF")) {
                removeChildElements(printonbothSideManuallyFeature, psfPrefix + ":Option")
                addChildElement(printonbothSideManuallyFeature, psfNs, "Option", "ns0000:ON");
            }
        }
        //Update scored property DuplexMode
        propertyNode = getScoredProperty(duplexOptionNode, pskPrefix, "DuplexMode");
        if (propertyNode) {
            duplexOptionNode.removeChild(propertyNode);
        }
        insertQNameScoredProperty(duplexOptionNode, "psk:DuplexMode", "psk:Manual");
        
    }
    else {
        SetManualDuplexToNone(printTicket, scriptContext, productInfo, featureNodesMap, duplexFeature);
            setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionTextHeader", PREFIX_CANONICAL, "", "xsd:string");
            setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText1", PREFIX_CANONICAL, "", "xsd:string");
            setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText2", PREFIX_CANONICAL, "", "xsd:string");
            setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionText3", PREFIX_CANONICAL, "", "xsd:string");
            setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage1", PREFIX_CANONICAL, "", "xsd:string");
            setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage2", PREFIX_CANONICAL, "", "xsd:string");
            setParameterInitNode(printTicket.XmlNode, "ns0000:JobManualDuplexInstructionImage3", PREFIX_CANONICAL, "", "xsd:string");
        //Update scored property DuplexMode
        propertyNode = getScoredProperty(duplexOptionNode, pskPrefix, "DuplexMode");
        if (propertyNode) {
            duplexOptionNode.removeChild(propertyNode);
        }
        insertQNameScoredProperty(duplexOptionNode, "psk:DuplexMode", "psk:Automatic");
        
    }
}

function SetManualDuplexToNone(printTicket, scriptContext, productInfo, featureNodesMap, duplexFeature) {
    // Update JobManualDuplex to Manual Simplex
    manualDuplexFeature = (featureNodesMap && featureNodesMap["ns0000:JobManualDuplex"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobManualDuplex", PREFIX_CANONICAL));
    if (manualDuplexFeature) {
        optionmanualDuplex = getSelectedOptionNode(manualDuplexFeature);
        if (optionmanualDuplex && (optionmanualDuplex.getAttribute("name") != "ns0000:ManualSimplex")) {
            removeChildElements(manualDuplexFeature, psfPrefix + ":Option")
            addChildElement(manualDuplexFeature, psfNs, "Option", "ns0000:ManualSimplex");
        }
    }

    //Update subFeature JobManualDuplexProperties to NONE
    ManualDuplexPropertiesFeature = (duplexFeature && getFeatureNode(duplexFeature, "ns0000:JobManualDuplexProperties", PREFIX_CANONICAL));
    if (ManualDuplexPropertiesFeature) {
        // ManualDuplexPropertiesOption = getSelectedOptionNode(ManualDuplexPropertiesFeature);
        if (optionmanualDuplex && (optionmanualDuplex.getAttribute("name") != "ns0000:None")) {
            removeChildElements(manualDuplexFeature, psfPrefix + ":Option")
            addChildElement(manualDuplexFeature, psfNs, "Option", "ns0000:None");
        }
    }

    // Set JobHPPrintOnBothSidesManually to OFF
    printonbothSideManuallyFeature = (featureNodesMap && featureNodesMap["ns0000:JobHPPrintOnBothSidesManually"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobHPPrintOnBothSidesManually", PREFIX_CANONICAL));
    if (printonbothSideManuallyFeature) {
        optionPrintOnBothSidesManually = getSelectedOptionNode(printonbothSideManuallyFeature);
        if (optionPrintOnBothSidesManually && (optionPrintOnBothSidesManually.getAttribute("name") == "ns0000:ON")) {
            removeChildElements(printonbothSideManuallyFeature, psfPrefix + ":Option")
            addChildElement(printonbothSideManuallyFeature, psfNs, "Option", "ns0000:OFF");
        }
    }
}

//store job
function jobStoreToPt(printTicket, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    // Print Mode - Normal print, PIN, Secure encrypted
    var printModeFeature = (featureNodesMap && featureNodesMap["ns0000:JobStoragePrivateSecure"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobStoragePrivateSecure", PREFIX_CANONICAL));
    if (printModeFeature != null) {
        var printModeOptionNode = getSelectedOptionNode(printModeFeature);
        var printModeOptionName = printModeOptionNode && printModeOptionNode.getAttribute("name");
        //JobStorage Mode - Off, Personal Job, Stored Job
        var jobStoreFeature = (featureNodesMap && featureNodesMap["ns0000:JobStorage"]) ||
            (rootElement && getFeatureNode(rootElement, "ns0000:JobStorage", PREFIX_CANONICAL));
        if (printModeOptionName == "ns0000:PrivateSecurePINtoPrint" || printModeOptionName == "ns0000:PrivateSecureEncryptJob") {
            //Store (switch) - Off, On
            var storecheckboxFeature = printModeFeature && getFeatureNode(printModeFeature, "ns0000:JobStorageStore", PREFIX_CANONICAL);
            if (storecheckboxFeature != null) {
                var storecheckboxOptionNode = getSelectedOptionNode(storecheckboxFeature);
                //The default value of JobStorage is changed in javascript following JobStorageStore status of the UI.
                if (storecheckboxOptionNode && (storecheckboxOptionNode.getAttribute("name") == "ns0000:On")) {
                    removeChildElements(jobStoreFeature, psfPrefix + ":Option")
                    addChildElement(jobStoreFeature, psfNs, "Option", "ns0000:JobStorageStoreJob");
                }
                else {
                    removeChildElements(jobStoreFeature, psfPrefix + ":Option")
                    addChildElement(jobStoreFeature, psfNs, "Option", "ns0000:JobStoragePersonalJob");
                }
            }
            else {
                removeChildElements(jobStoreFeature, psfPrefix + ":Option")
                addChildElement(jobStoreFeature, psfNs, "Option", "ns0000:JobStorageOff");
            }
        }
        else {
            removeChildElements(jobStoreFeature, psfPrefix + ":Option")
            addChildElement(jobStoreFeature, psfNs, "Option", "ns0000:JobStorageOff");
        }
    }
}

//store job
function jobStorePasswordRangeToPt(printTicket, devModeProperties, scriptContext)
{    
    var adPolicyXml = getCurrentPolicyId(printTicket, devModeProperties, "AdPolicyId");
    var SEPMaxPasswordLength = safeGetString(scriptContext.QueueProperties, "Config:JobStorageEncryptionPasswordMaxLength");
   
    //Secure encrypt password max length set from bidi to PT
    if (SEPMaxPasswordLength != null)
    {
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobStoragePasswordMaxLength", PREFIX_CANONICAL, SEPMaxPasswordLength, "xsd:integer");
    }

    var SEPAlphaNumericPassword = safeGetString(scriptContext.QueueProperties, "Config:JobStorageEncryptionPasswordType");
    //Secure encrypt alphanumeric set from bidi PT
    if (SEPAlphaNumericPassword == "enable")
    {
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobStoragePasswordIsAlphaNumeric", PREFIX_CANONICAL, "true", "xsd:string");
    }
    else
    {
        setParameterInitNode(printTicket.XmlNode, "ns0000:JobStoragePasswordIsAlphaNumeric", PREFIX_CANONICAL, "false", "xsd:string");
    }

    // set JobStoragePasswordMinLength only if AD policy not applied
    if (adPolicyXml == null || adPolicyXml == "")
    {
        var SEPMinPasswordLength = safeGetString(scriptContext.QueueProperties, "Config:JobStorageEncryptionPasswordMinLength");
        // Secure encrypt password min length set from bidi to PT
        if (SEPMinPasswordLength != null)
        {
            setParameterInitNode(printTicket.XmlNode, "ns0000:JobStoragePasswordMinLength", PREFIX_CANONICAL, SEPMinPasswordLength, "xsd:integer");
        }
    }
}

// device collation.
function jobDeviceToPt(printTicket, scriptContext, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    var propertyNode;
    var manual = "ns0000:ManualSimplex";
    var mopier = safeGetString(scriptContext.QueueProperties, "Config:CONFIG_DeviceCollationControl");
    if (mopier == "AutoConfig") {
        mopier = safeGetString(scriptContext.QueueProperties,"Config:DeviceCollationControl");
        if (mopier == null) {
            mopier = "enable";
        } else if (mopier == "auto") {
            mopier = "enable";
        }
    }
    else if (mopier == "Installed") {
        mopier = "enable";
    }
    var manualDuplexFeature = (featureNodesMap && featureNodesMap["ns0000:JobManualDuplex"]) ||
        (getFeatureNode(rootElement, "ns0000:JobManualDuplex", PREFIX_CANONICAL));
    if (manualDuplexFeature != null) {
        var manualDuplexOptionNode = getSelectedOptionNode(manualDuplexFeature);
        if (manualDuplexOptionNode != null) {
            manual = manualDuplexOptionNode.getAttribute("name");
        }
    }
    if ((mopier == "enable") && (manual == "ns0000:ManualSimplex")) {
        propertyNode = getProperty(rootElement, venderDefinedNs, "JobDeviceProperties");
        if (propertyNode != null) {
            rootElement.removeChild(propertyNode);
        }
        propertyNode = addProperty(rootElement, "ns0000:JobDeviceProperties");
        addProperty(propertyNode, "ns0000:DeviceCollation", "Installed", "xsd:string");
    }
    else {
        propertyNode = getProperty(rootElement, venderDefinedNs, "JobDeviceProperties");
        if (propertyNode != null) {
            rootElement.removeChild(propertyNode);
        }
        propertyNode = addProperty(rootElement, "ns0000:JobDeviceProperties");
        addProperty(propertyNode, "ns0000:DeviceCollation", "NotInstalled", "xsd:string");
    }
}

//bidi property
function bidiVarsToPt(printTicket, devModeProperties) {
    var rootElement = printTicket.XmlNode.documentElement;
    var prop = getProperty(rootElement, venderDefinedNs, "BidiVars");
    if (prop != null)
        rootElement.removeChild(prop);
    prop = addProperty(rootElement, "ns0000:BidiVars")
    addProperty(prop, "ns0000:DataType", "String", "xsd:string");
    //outbin bidi value.
    var oldOutputbinCount = devModeProperties.GetInt32("OutputBinVariable");
    addProperty(prop, "ns0000:OutputBinVariable", oldOutputbinCount, "xsd:integer");
    //color mode bidi value.
    var oldColorDevmode = devModeProperties.GetInt32("ColorDeviceVariable");
    addProperty(prop, "ns0000:ColorDeviceVariable", oldColorDevmode, "xsd:integer");
}
function setCurrentBidiToDevmode(scriptContext, devModeProperties) {

    // save outputbin value to devmode.
    devModeProperties.SetInt32("OutputBinVariable", getOutputBinBidi(scriptContext));

    // save color bidi value to devmode
    devModeProperties.SetInt32("ColorDeviceVariable", getCurrentDeviceColorBidi(scriptContext));

}

function getCurrentPolicyId(printTicket, devModeProperties, policyType) {
    var currentPolicyId;
    var prop = getProperty(printTicket.XmlNode.documentElement, venderDefinedNs, "AppliedPolicies");
    if (prop) {
        var prop2 = getProperty(prop, venderDefinedNs, policyType);
        if (prop2)
            currentPolicyId = prop2.firstChild.text;
    }
    if (currentPolicyId == null) {
        currentPolicyId = safeGetString(devModeProperties, policyType);
    }
    return currentPolicyId;
}

function getCurrentQueueId(printTicket, devModeProperties) {
    var currentQueueId;
    var prop = getProperty(printTicket.XmlNode.documentElement, venderDefinedNs, "QueueAttributes");
    if (prop) {
        var prop2 = getProperty(prop, venderDefinedNs, "QueueId");
        if (prop2)
            currentQueueId = prop2.firstChild.text;
    }
    if (currentQueueId == null) {
        currentQueueId = safeGetString(devModeProperties, "QueueId");
    }
    return currentQueueId;
}

function getOptionNameFromADMXMap(printTicket, scriptContext, productInfo, ptOptions, currADValue) {
    //debugger;
    var featureNode, optionNode, optionName;
    var possibleOptionsList = ptOptions.split(",");

    if (possibleOptionsList.length > 1) {
        // Currently only PQ options come here. may need to make it generic in case other features also fall in this category
        var capabilityXML = loadXMLFromString(printTicket, safeGetString(scriptContext.QueueProperties, "CapabilityXML"));
        if (capabilityXML) {
            featureNode = getFeatureNode(capabilityXML.documentElement, "ns0000:JobUserResolution", PREFIX_CANONICAL);
            for (var i = 0; i < possibleOptionsList.length; i++) {
                optionNode = featureNode.selectSingleNode("descendant::" + psfPrefix + ":Option[@name='" + possibleOptionsList[i] + "']")
                if (optionNode) {
                    if (optionNode.getAttribute("constrained") == "psk:None") {
                        optionName = getElementName(optionNode, PREFIX_REAL);
                        break;
                    }
                }
            }
        }
        // Fallback in case UI is not opened atleast once so can't use CapabilityXML
        else {
            var isDraft = currADValue == 2 || currADValue == 102;
            var isNormal = currADValue == 3 || currADValue == 103;
            var isEconomode = currADValue == 1 || currADValue == 101;

            if (isPCGreaterThan070(scriptContext) && isPQStandardTypeBidiSuccessful(scriptContext)) {
                if (isDraft) {
                    var displayTagStandardTypevalue = safeGetString(scriptContext.QueueProperties, "Config:PQDisplayTagStandardType1");
                    if (displayTagStandardTypevalue != "NotAvailable") {
                        optionName = "ns0000:" + displayTagStandardTypevalue;
                    }
                }
                else if (isNormal) {
                    var displayTagStandardTypevalue = safeGetString(scriptContext.QueueProperties, "Config:PQDisplayTagStandardType2");
                    if (displayTagStandardTypevalue != "NotAvailable") {
                        optionName =  "ns0000:" + displayTagStandardTypevalue;
                    }
                }
                else if (isEconomode) {
                    var displayTagStandardTypevalue = safeGetString(scriptContext.QueueProperties, "Config:PQDisplayTagStandardType5");
                    if (displayTagStandardTypevalue != "NotAvailable") {
                        optionName = "ns0000:" + displayTagStandardTypevalue;
                    }
                }
            }
            else if (isPQBidiSuccessful(scriptContext)) {
                if (isDraft) {
                    var draftSupport = safeGetString(scriptContext.QueueProperties, "Config:PQDraftSupport");
                    if (draftSupport == "Laser") {
                        optionName = "ns0000:PQDraftLaser";
                    }
                    else if (draftSupport == "Ink") {
                        optionName = "ns0000:HPS_Draft";
                    }
                }
                else if (isNormal) {
                    var normalSupport = safeGetString(scriptContext.QueueProperties, "Config:PQNormalSupport");
                    if (normalSupport == "Laser") {
                        optionName = "ns0000:PQNormalLaser";
                    }
                    else if (normalSupport == "Ink") {
                        optionName = "ns0000:HPS_Normal";
                    }
                }
                else if (isEconomode) {
                    var economodeSupport = safeGetString(scriptContext.QueueProperties, "Config:PQEconomodeSupport");
                    if (economodeSupport == "Available") {
                        optionName = "ns0000:PQEconomode";
                    }
                }
            }
            //No Bidi
            else {
                if (isDraft) {
                    if (productInfo && (productInfo.productType == Product_type.Product_PCLmS || productInfo.productType == Product_type.Product_PCL3)) {
                        optionName = "ns0000:HPS_Draft";
                    }
                    else {
                        optionName = "ns0000:PQDraftPageWide";
                    }
                }
                else if (isNormal) {
                    if (productInfo && (productInfo.productType == Product_type.Product_PCLmS || productInfo.productType == Product_type.Product_PCL3)) {
                        optionName = "ns0000:HPS_Normal";
                    }
                    else {
                        optionName = "ns0000:PQNormalPageWide";
                    }
                }
            }
        }
    }
    //For all other features just return the only option available
    else  {
        optionName = possibleOptionsList[0];
    }

    return optionName;
}

function IsPolicyXMLChanged(currADPolicy, newADPolicy) {
    //debugger;
    var currFeatureNodes;
    var currParamNodes;
    var newFeatureNodes;
    var newParamNodes;
    var currADPolicyFeatureCount = 0;
    var currADPolicyParamCount = 0;
    var newADPolicyFeatureCount = 0;
    var newADPolicyParamCount = 0;

    if (currADPolicy != null) {
        currFeatureNodes = currADPolicy.documentElement.selectNodes(psfPrefix + ":Feature");
        currParamNodes = currADPolicy.documentElement.selectNodes(psfPrefix + ":ParameterInit");
        currADPolicyFeatureCount = currFeatureNodes.length;
        currADPolicyParamCount = currParamNodes.length;
    }

    if (newADPolicy != null) {
        newFeatureNodes = newADPolicy.documentElement.selectNodes(psfPrefix + ":Feature");
        newParamNodes = newADPolicy.documentElement.selectNodes(psfPrefix + ":ParameterInit");
        newADPolicyFeatureCount = newFeatureNodes.length;
        newADPolicyParamCount = newParamNodes.length;
    }

    if (newADPolicyFeatureCount == 0 && newADPolicyParamCount == 0) {
        return false;
    }

    if ((newADPolicyFeatureCount != 0 && currADPolicyFeatureCount == 0) || (newADPolicyParamCount != 0 && currADPolicyParamCount == 0)) {
        return true;
    }

    if (newADPolicyFeatureCount != currADPolicyFeatureCount || newADPolicyParamCount != currADPolicyParamCount) {
        return true;
    }

    var currPolicyFeatureValues = makePolicyFeatureValueMap(currFeatureNodes);
    var newPolicyFeatureValues = makePolicyFeatureValueMap(newFeatureNodes);

    var currPolicyParamValues = makePolicyParamValueMap(currParamNodes);
    var newPolicyParamValues = makePolicyParamValueMap(newParamNodes);

    if (!object_equals(currPolicyFeatureValues, newPolicyFeatureValues) || !object_equals(currPolicyParamValues, newPolicyParamValues)) {
        return true;
    }

    return false;
}

function createADPolicy(printTicket, scriptContext, devModeProperties, productInfo) {
    //debugger;
    var policyId;
    var currADPolicyXmlNode;
    var ADMXToFeatures = getADFeatures();
    var currentQueueId = getCurrentQueueId(printTicket, devModeProperties);
    var newADpolicyXmlNode = printTicket.XmlNode.cloneNode(true);
    var newADPolicy = newADpolicyXmlNode.documentElement;

    //Clean Up first
    removeChildElements(newADPolicy, psfPrefix + ":Feature");
    removeChildElements(newADPolicy, psfPrefix + ":ParameterInit");
    removeChildElements(newADPolicy, psfPrefix + ":Property");

    forEach(ADMXToFeatures, function (feature) {
        var currADValue = safeGetUPBInt32(scriptContext, feature.Name);
        if (currADValue != null) {
            var isFeatureBidiValidationSuccess = true;
            if (feature.QueuePropertyBag) {
                isFeatureBidiValidationSuccess = false;
                var currDeviceSettingValue = safeGetString(scriptContext.QueueProperties, feature.QueuePropertyBag.DeviceSettingKey);
                if (currDeviceSettingValue != null) {
                    if (currDeviceSettingValue == "AutoConfig") {
                        var currBidiValue = safeGetString(scriptContext.QueueProperties, feature.QueuePropertyBag.Key);
                        if (currBidiValue && currBidiValue == feature.QueuePropertyBag.Value) {
                            isFeatureBidiValidationSuccess = true;
                        }
                    }
                    else if (currDeviceSettingValue == feature.QueuePropertyBag.Value) {
                        isFeatureBidiValidationSuccess = true;
                    }
                }
            }
            if (isFeatureBidiValidationSuccess) {
                if (feature.ParamInitName) {
                    if (currADValue == 0 && feature.ParamInitType == "xsd:string") {
                        setParameterInitNode(newADpolicyXmlNode, feature.ParamInitName, PREFIX_CANONICAL, "0000", feature.ParamInitType);
                    }
                    else {
                        setParameterInitNode(newADpolicyXmlNode, feature.ParamInitName, PREFIX_CANONICAL, currADValue, feature.ParamInitType);
                    }
                }
                else {
                    var printTicketFeature = feature.Values[currADValue.toString()];
                    if (printTicketFeature) {
                        var isOptionBidiValidationSuccess = true;
                        //For CID based secure encryption support check
                        if (printTicketFeature.DevCaps) {
                            isOptionBidiValidationSuccess = false;
                            var currDeviceSettingValue = safeGetString(scriptContext.QueueProperties, printTicketFeature.QueuePropertyBag.DeviceSettingKey);
                            if (currDeviceSettingValue != null) {
                                if (currDeviceSettingValue == "AutoConfig") {
                                    var JobJsonDeviceCaps = safeGetString(scriptContext.QueueProperties, "JobJsonDeviceCaps");
                                    if (JobJsonDeviceCaps != null && JobJsonDeviceCaps != "") {
                                        //Check if Job_Storage_Encryption supported, if yes then proceed.
                                        if (JobJsonDeviceCaps.indexOf("\"Job_Storage_Encryption\": \"Valid\"") != -1) {
                                            isOptionBidiValidationSuccess = true;
                                        }
                                    }
                                    else if (productInfo && productInfo.devCapCategory != null && includedInArray(printTicketFeature.DevCaps, productInfo.devCapCategory)) {
                                        isOptionBidiValidationSuccess = true;
                                    }
                                }
                                else if (currDeviceSettingValue == printTicketFeature.QueuePropertyBag.Value) {
                                    isOptionBidiValidationSuccess = true;
                                }
                            }
                        }
                        if (isOptionBidiValidationSuccess) {                    
                            var optionNameToSet;
                            // for default duplex exception handling
                            if (printTicketFeature.QueuePropertyBag && printTicketFeature.QueuePropertyBag.Key) {
                                var currQPBValue = safeGetString(scriptContext.QueueProperties, printTicketFeature.QueuePropertyBag.Key);
                                optionNameToSet = printTicketFeature.QueuePropertyBag.Values[currQPBValue];
                            }
                            else {
                                optionNameToSet = getOptionNameFromADMXMap(printTicket, scriptContext, productInfo, printTicketFeature.OptionName, currADValue);
                            }                          
                            if (optionNameToSet) {
                                var featureNode = createChildElement(newADPolicy, psfNs, "Feature", printTicketFeature.FeatureName);
                                if (featureNode) {
                                    featureNode.setAttribute("lock", printTicketFeature.Locked.toString());
                                    featureNode.setAttribute("default", printTicketFeature.DriverDefault.toString());

                                    var optionNode = addChildElement(featureNode, psfNs, "Option", optionNameToSet);
                                    if (printTicketFeature.ScoredProperties != null && optionNode) {
                                        forEach(printTicketFeature.ScoredProperties, function (scoredProperty) {
                                            //debugger;
                                            var propertyNode = addChildElement(optionNode, psfNs, "ScoredProperty", scoredProperty.Name);
                                            if (propertyNode) {
                                                addValue(propertyNode, scoredProperty.Value, scoredProperty.Type);
                                            }
                                        });
                                    }
                                    if (printTicketFeature.SubFeatures != null) {
                                        forEach(printTicketFeature.SubFeatures, function (subfeature) {
                                            //debugger;
                                            var subFeatureNode = createChildElement(featureNode, psfNs, "Feature", subfeature.FeatureName);
                                            if (subFeatureNode) {
                                                subFeatureNode.setAttribute("lock", subfeature.Locked.toString());
                                                subFeatureNode.setAttribute("default", subfeature.DriverDefault.toString());
                                                addChildElement(subFeatureNode, psfNs, "Option", subfeature.OptionName);
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (currentQueueId != null && currentQueueId != "") {
        currADPolicyXmlNode = loadXMLFromString(printTicket, safeGetUPBString(scriptContext, "AD_policy_" + currentQueueId));
        if (IsPolicyXMLChanged(currADPolicyXmlNode, newADpolicyXmlNode)) {
            policyId = CreateGuid();
            newADPolicy.setAttribute("policyid", policyId);
            safeSetUPBString(scriptContext, "AD_policy_" + currentQueueId, newADPolicy.xml);
            return newADpolicyXmlNode;
        }
        else if (currADPolicyXmlNode != null) {
            return currADPolicyXmlNode;
        }
    }

    return null;
}

// policy
function applyPolicy(printTicket, scriptContext, devModeProperties, productInfo, values) {
    //debugger;
    //Create AD policy xml using AD feature values set in UPB and save AD_Policy xml in UPB.
    var adPolicyXml = createADPolicy(printTicket, scriptContext, devModeProperties, productInfo);
    //Load an exisitng DCU policy set by tools
    var dcuPolicyXml = loadXMLFromString(printTicket, safeGetString(scriptContext.QueueProperties, "DCU_policy"));

    if (printTicket && (dcuPolicyXml || adPolicyXml)) {
        var featureNodesMap = getAllElementsMap(printTicket.XmlNode, "//" + psfPrefix + ":Feature");
        var parameterNodesMap = getAllElementsMap(printTicket.XmlNode, psfPrefix + ":ParameterInit");
        var currentDcuPolicyId = getCurrentPolicyId(printTicket, devModeProperties, "DcuPolicyId");
        var currentAdPolicyId = getCurrentPolicyId(printTicket, devModeProperties, "AdPolicyId");

        //DcuPolicy
        var newDcuPolicyId = applyTicketByPolicyXml(printTicket, dcuPolicyXml, featureNodesMap, parameterNodesMap, currentDcuPolicyId, values);
        //ADPolicy
        var newAdpolicyId = applyTicketByPolicyXml(printTicket, adPolicyXml, featureNodesMap, parameterNodesMap, currentAdPolicyId, values);
        if (newAdpolicyId || newDcuPolicyId) {
            policyIdToPt(printTicket, newAdpolicyId, newDcuPolicyId);
        }
    }
}
function applyTicketByPolicyXml(printTicket, policyXmlNode, featureNodesMap, parameterNodesMap, currentPolicyid, values) {
    var newPolicyId = null;
    var rootElement = printTicket.XmlNode.documentElement;
    if (policyXmlNode) {
        var bInitialApply = false;
        // match namespace/prefix
        setSelectionNamespace(policyXmlNode, vendorDefinedPrefix, venderDefinedNs);
        setSelectionNamespace(policyXmlNode, psfPrefix, psfNs);
        //check policy id.
        newPolicyId = policyXmlNode.documentElement.getAttribute("policyid");
        if (newPolicyId == null || newPolicyId == "") {
            newPolicyId = "UnknowId";
        }
        if (newPolicyId != currentPolicyid) {
            bInitialApply = true;
        }
        var policyFeatureNodes = policyXmlNode.documentElement.selectNodes(psfPrefix + ":Feature");
        var policyFeatureValues = makeFeatureValuesMap(policyFeatureNodes);
        // lock or set default to feature/option
        var policyFeatureNode, currentNode, subFeautreNodes, policySubFeatureValues, subFeatureNode;
        for (var i = 0; i < policyFeatureNodes.length; ++i) {
            policyFeatureNode = policyFeatureNodes.item(i);
            currentNode = applyFeatureByPolicy(rootElement, featureNodesMap, policyFeatureNode, policyFeatureValues, bInitialApply);
            //sub Feature;
            if (currentNode) {
                subFeautreNodes = policyFeatureNode.selectNodes(psfPrefix + ":Feature");
                policySubFeatureValues = makeFeatureValuesMap(subFeautreNodes);
                for (var j = 0; j < subFeautreNodes.length; ++j) {
                    subFeatureNode = subFeautreNodes.item(j);
                    applyFeatureByPolicy(currentNode, featureNodesMap, subFeatureNode, policySubFeatureValues, bInitialApply);
                }
            }
        }
        // lock or set default to parameter
        var policyParamNodes = policyXmlNode.documentElement.selectNodes(psfPrefix + ":ParameterInit");
        // feature/option
        var policyParamNode, policyParamName, policParamValue, lockedParamAttribute, currentParamNode;
        for (var i = 0; i < policyParamNodes.length; i++) {
            policyParamNode = policyParamNodes.item(i);
            policyParamName = getElementName(policyParamNode, PREFIX_CANONICAL);
            policParamValue = getPropertyValue(policyParamNode);
            lockedParamAttribute = policyParamNode.getAttribute("lock");
            if (!bInitialApply && (lockedParamAttribute == null || lockedParamAttribute != "true")) {
                continue;
            }
            // remove lock atturibute
            if (lockedParamAttribute != null ) {
                policyParamNode.removeAttribute("lock");
            }
            currentParamNode = parameterNodesMap && parameterNodesMap[policyParamName];
            // the feature to policy is existed, check current value and replace or not.
            if (currentParamNode) {
                var currentParamValue = getPropertyValue(currentParamNode);
                if (policParamValue != null && currentParamValue != policParamValue) {
                    setPropertyValue(currentParamNode, policParamValue);
                    values[policyParamName] = policParamValue;
                }
            }
            // parameter is not exist
            else {
                rootElement.appendChild(policyParamNode);
                values[policyParamName] = policParamValue;
            }
        }
    }
    return newPolicyId;
}
function applyFeatureByPolicy(currentFeatureParent, featureNodesMap, policyFeatureNode, policyFeatureValues, bInitialApply) {
    var policyFeatureName = getElementName(policyFeatureNode, PREFIX_CANONICAL);
    var lockedFeatureAttribute = policyFeatureNode.getAttribute("lock");
    var defaultFeatureAttribute = policyFeatureNode.getAttribute("default");
    var currentFeatureNode = featureNodesMap && featureNodesMap[policyFeatureName];
    // default value should be applied only onetime
    if (!bInitialApply && (lockedFeatureAttribute == null || lockedFeatureAttribute != "true")) {
        return currentFeatureNode;
    }
    // the feature to policy is existed, check current value and replace or not.
    if (currentFeatureNode) {
        var currentOptionNode = getSelectedOptionNode(currentFeatureNode);
        var currentOptionValues = currentOptionNode ? currentOptionNode.getAttribute("name") : "";
        var policyOptionValues = policyFeatureValues[policyFeatureName];

        // If option name mayt be existed, or option name may not be existed.
        if ((currentOptionValues != policyOptionValues) || (currentOptionValues == "" && policyOptionValues == "")) {
            removeChildElements(currentFeatureNode, psfPrefix + ":Option");
            var optionNodes = policyFeatureNode.selectNodes(psfPrefix + ":Option");
            var optionNode;
            for (var i = 0; i < optionNodes.length; ++i) {
                optionNode = optionNodes.item(i);
                currentFeatureNode.appendChild(optionNode);
            }
        }
    }
    // the feature to policy is not existed, add feature.
    else {
        if (currentFeatureParent) {
            // remove lock attribute.
            if (lockedFeatureAttribute != null) {
                policyFeatureNode.removeAttribute("lock");
            }
            if (defaultFeatureAttribute != null) {
                policyFeatureNode.removeAttribute("default");
            }
            currentFeatureNode = currentFeatureParent.appendChild(policyFeatureNode);
        }
    }
    return currentFeatureNode;
}
function policyIdToPt(printTicket, adPolicyId, dcuPolicyId) {
    var rootElement = printTicket.XmlNode.documentElement;
    var prop = getProperty(rootElement, venderDefinedNs, "AppliedPolicies");
    if (prop != null)
        rootElement.removeChild(prop);
    if (adPolicyId || dcuPolicyId) {
        prop = addProperty(rootElement, "ns0000:AppliedPolicies")
        addProperty(prop, "ns0000:DataType", "String", "xsd:string");
        //Adpolicy
        if (adPolicyId) {
            addProperty(prop, "ns0000:AdPolicyId", adPolicyId, "xsd:string");
        }
        //DcuPolicy
        if (dcuPolicyId) {
            addProperty(prop, "ns0000:DcuPolicyId", dcuPolicyId, "xsd:string");
        }
    }
}
function saveCurrentPolicyIdToDevmode(printTicket, devModeProperties) {
    var prop = getProperty(printTicket.XmlNode.documentElement, venderDefinedNs, "AppliedPolicies");
    if (prop) {
        var prop2 = getProperty(prop, venderDefinedNs, "AdPolicyId");
        if (prop2)
            devModeProperties.SetString("AdPolicyId", prop2.firstChild.text);

        prop2 = getProperty(prop, venderDefinedNs, "DcuPolicyId");
        if (prop2)
            devModeProperties.SetString("DcuPolicyId", prop2.firstChild.text);
    }
}
function saveCurrentQueueIdToDevmode(printTicket, devModeProperties) {
    var prop = getProperty(printTicket.XmlNode.documentElement, venderDefinedNs, "QueueAttributes");
    if (prop) {
        var prop2 = getProperty(prop, venderDefinedNs, "QueueId");
        if (prop2)
            devModeProperties.SetString("QueueId", prop2.firstChild.text);
    }
}
//job destination
function getPDLTicketName(productType) {
    var pdlTicketName = "ns0000:PCL6";
    if (productType) {
        if (productType == Product_type.Product_PCL6)
            pdlTicketName = "ns0000:PCL6";
        else if (productType == Product_type.Product_PCL3)
            pdlTicketName = "psk:PCL";
        else if (productType == Product_type.Product_PCLmS)
            pdlTicketName = "ns0000:PCLmS";
        else if (productType == Product_type.Product_PDF)
            pdlTicketName = "ns0000:PDF";
        else if (productType == Product_type.Product_PS)
            pdlTicketName = "ns0000:PS";
    }
    return pdlTicketName;
}
function applyJobDeviceLanguage(printTicket, productInfo, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    var pdlTickeName = getPDLTicketName(productInfo.productType)
    // Get JobDeviceLangauge
    var deviceLangFeatureNode = (featureNodesMap && featureNodesMap["psk:JobDeviceLanguage"]) ||
        (rootElement && getFeatureNode(rootElement, "psk:JobDeviceLanguage", PREFIX_CANONICAL));
    if (deviceLangFeatureNode != null) {
        var currentOptionName = getSelectedOptionName(deviceLangFeatureNode, PREFIX_CANONICAL);
        if (currentOptionName != pdlTickeName) {
            removeChildElements(deviceLangFeatureNode, psfPrefix + ":Option")
            addChildElement(deviceLangFeatureNode, psfNs, "Option", pdlTickeName);
        }
    }
}


















// vendor property
function pJLToPt(printTicket, scriptContext, devModeProperties, featureNodesMap, values) {
    var rootElement = printTicket.XmlNode.documentElement;
    var docStartPjlprop = getProperty(rootElement, venderDefinedNs, "DocumentStartPJL");
    var pjlIndex = 1;
    // Remove DocumentStartPJL for refresh
    if (docStartPjlprop != null) {
        rootElement.removeChild(docStartPjlprop);
        docStartPjlprop = null;
    }
    // set secure job property and PJL
    pjlIndex = jobVarsToPt(printTicket, scriptContext, devModeProperties, featureNodesMap, values, pjlIndex);
    //  MaxSheetPerSet for folding Option
    //  Reads a DocumentCFoldMaxSheetsPerSet and a DocumentVFoldMaxSheetsPerSet from Printer Ticket
    pjlIndex = foldingPJLToPt(printTicket, scriptContext, featureNodesMap, values, pjlIndex);
    return pjlIndex;
}
function jobVarsToPt(printTicket, scriptContext, devModeProperties, featureNodesMap, values, startPJLIndex) {
    var rootElement = printTicket.XmlNode.documentElement;
    var prop = getProperty(rootElement, venderDefinedNs, "JobVars");
    var prop2 = getProperty(rootElement, venderDefinedNs, "DocumentStartPJL");
    var jobStorageUserNameNode = (featureNodesMap && featureNodesMap["ns0000:JobStorageUserName"]) ||
        (getFeatureNode(rootElement, "ns0000:JobStorageUserName", PREFIX_CANONICAL));
    var jobStorageJobNameNode = (featureNodesMap && featureNodesMap["ns0000:JobStorageJobName"]) ||
        (getFeatureNode(rootElement, "ns0000:JobStorageJobName", PREFIX_CANONICAL));
    var jobStoragePrivatefeature = (featureNodesMap && featureNodesMap["ns0000:JobStoragePrivateSecure"]) ||
        (getFeatureNode(rootElement, "ns0000:JobStoragePrivateSecure", PREFIX_CANONICAL));
    var jobStoragePrivatefeatureOption = null;
    if (jobStoragePrivatefeature) {
        jobStoragePrivatefeatureOption = getSelectedOptionName(jobStoragePrivatefeature, PREFIX_CANONICAL);
    }
    var pjlIndex = startPJLIndex;
    if (prop != null)
        rootElement.removeChild(prop);
    prop = addProperty(rootElement, "ns0000:JobVars")
    addProperty(prop, "ns0000:DataType", "String", "xsd:string");
    // UserName
    if (devModeProperties.GetString("UserName").length > 0) {
        addProperty(prop, "ns0000:UserName", devModeProperties.GetString("UserName"), "xsd:string");
        if (jobStoragePrivatefeature && jobStorageUserNameNode) {
            var jobStorageUserNameOption = getSelectedOptionName(jobStorageUserNameNode, PREFIX_CANONICAL);
            if (jobStoragePrivatefeatureOption && jobStoragePrivatefeatureOption != "ns0000:PrivateSecureOff"
                && jobStorageUserNameOption && jobStorageUserNameOption != "ns0000:UserNameCurrent") {
                if (prop2 == null) {
                    prop2 = addProperty(rootElement, "ns0000:DocumentStartPJL")
                    addProperty(prop2, "ns0000:DataType", "String", "xsd:string");
                }
                addProperty(prop2, "ns0000:PJL" + pjlIndex.toString(), "@PJL SET USERNAME=" + '"' + devModeProperties.GetString("UserName") + '"', "xsd:string");
                pjlIndex = pjlIndex + 1;
            }
        }
    }
    // JobName
    if (devModeProperties.GetString("JobName").length > 0) {
        addProperty(prop, "ns0000:JobName", devModeProperties.GetString("JobName"), "xsd:string");
        if (jobStoragePrivatefeature && jobStorageJobNameNode) {
            var jobStorageJobNameOption = getSelectedOptionName(jobStorageJobNameNode, PREFIX_CANONICAL);
            if (jobStoragePrivatefeatureOption && jobStoragePrivatefeatureOption != "ns0000:PrivateSecureOff"
                && jobStorageJobNameOption && jobStorageJobNameOption != "ns0000:JobNameAuto") {
                if (prop2 == null) {
                    prop2 = addProperty(rootElement, "ns0000:DocumentStartPJL")
                    addProperty(prop2, "ns0000:DataType", "String", "xsd:string");
                }
                addProperty(prop2, "ns0000:PJL" + pjlIndex.toString(), "@PJL SET JOBNAME=" + '"' + devModeProperties.GetString("JobName") + '"', "xsd:string");
                pjlIndex = pjlIndex + 1;
            }
        }
    }

    var pin = values && values["ns0000:JobStoragePIN"];
    // PIN
    if (pin) {
        addProperty(prop, "ns0000:PIN", pin, "xsd:string");
        if (jobStoragePrivatefeature != null && jobStoragePrivatefeatureOption &&
            jobStoragePrivatefeatureOption == "ns0000:PrivateSecurePINtoPrint") {
            if (prop2 == null) {
                prop2 = addProperty(rootElement, "ns0000:DocumentStartPJL")
                addProperty(prop2, "ns0000:DataType", "String", "xsd:string");
            }
            addProperty(prop2, "ns0000:PJL" + pjlIndex.toString(), "@PJL SET HOLDKEY=" + '"' + pin + '"', "xsd:string");
            pjlIndex = pjlIndex + 1;
        }
    }
    else {
        addProperty(prop, "ns0000:PIN", "", "xsd:string");
    }
    //password
    var password = values && values["ns0000:JobStoragePassword"];
    if (password) {
        addProperty(prop, "ns0000:Password", password, "xsd:string");
    }
    else {
        addProperty(prop, "ns0000:Password", "", "xsd:string");
    }
    addProperty(prop, "ns0000:SelectedPreset", devModeProperties.GetString("SelectedPreset"), "xsd:string");
    return pjlIndex;
}
function foldingPJLToPt(printTicket, scriptContext, featureNodesMap, values, startPJLIndex) {
    var rootElement = printTicket.XmlNode.documentElement;
    var docStartPjlprop = getProperty(rootElement, venderDefinedNs, "DocumentStartPJL");
    var pjlIndex = startPJLIndex;
    var foldingOption, FoldMaxsheet;
    var FoldTypefeature = "Config:PC_CFoldMaxSheets";
    var FoldMode, deviceLangOptionName, deviceLangFeature;
    var foldingfeature = (featureNodesMap && featureNodesMap["ns0000:JobFinishingFolding"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobFinishingFolding", PREFIX_CANONICAL));
    if (foldingfeature) {
        foldingOption = getSelectedOptionName(foldingfeature, PREFIX_CANONICAL);
        if (foldingOption && foldingOption != "ns0000:FoldOff") {
            FoldMaxsheet = values && values["ns0000:DocumentFoldSheetsPerSet"];
            if (docStartPjlprop == null) {
                docStartPjlprop = addProperty(rootElement, "ns0000:DocumentStartPJL")
                addProperty(docStartPjlprop, "ns0000:DataType", "String", "xsd:string");
            }
            if (foldingOption == "ns0000:InwardVFoldSet" || foldingOption == "ns0000:OutwardVFoldSet" ||
                foldingOption == "ns0000:InwardVFoldMopy" || foldingOption == "ns0000:OutwardVFoldMopy") {
                FoldTypefeature = "Config:PC_VFoldMaxSheets";
            }
            FoldMode = safeGetString(scriptContext.QueueProperties, FoldTypefeature);
            deviceLangFeature = (featureNodesMap && featureNodesMap["psk:JobDeviceLanguage"]) ||
                (rootElement && getFeatureNode(rootElement, "psk:JobDeviceLanguage", PREFIX_CANONICAL));
            if (deviceLangFeature != null) {
                deviceLangOptionName = getSelectedOptionName(deviceLangFeature, PREFIX_CANONICAL);
            }
            if (FoldMaxsheet && FoldMaxsheet >= 1 && FoldMode && FoldMode == "SetMode" && deviceLangOptionName == "ns0000:PCL6") {
                addProperty(docStartPjlprop, "ns0000:PJL" + pjlIndex.toString(), "@PJL SET SHEETSPERSET=" + FoldMaxsheet, "xsd:string");
                pjlIndex = pjlIndex + 1;
            }
           /* else if (FoldMaxsheet && FoldMode && FoldMode == "DefaultMode") {
                FoldMaxsheet = 1;
            }*/
        }
    }
    return pjlIndex;











}
function telemetryDataSetToPt(printTicket, scriptContext, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    //get JobTelemetryUserOption feature
    var jobTelemetryUserOption = (featureNodesMap && featureNodesMap["ns0000:JobTelemetryUserOption"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobTelemetryUserOption", PREFIX_CANONICAL));
    if (jobTelemetryUserOption != null) {
        var jobTelemetryUserOptionNode = getSelectedOptionNode(jobTelemetryUserOption);
        var uPBtelemetryOpt;
        var currentTelemetryOpt;
        // get UserConcent from QPB
        var userConcentStr = safeGetString(scriptContext.QueueProperties, "UserConsent");
        if (userConcentStr != null) {
            if (userConcentStr == "True") {
                uPBtelemetryOpt = "ns0000:OptIn";
            }
            else {
                uPBtelemetryOpt = "ns0000:OptOut";
            }
        }
        else {
            return; // if userConcentStr is null, nothing just return.
        }
        // set telemerty option
        if (jobTelemetryUserOptionNode != null) {
            currentTelemetryOpt = jobTelemetryUserOptionNode.getAttribute("name");
            if (currentTelemetryOpt != null && uPBtelemetryOpt != currentTelemetryOpt) {
                removeChildElements(jobTelemetryUserOption, psfPrefix + ":Option")
                jobTelemetryUserOptionNode = addChildElement(jobTelemetryUserOption, psfNs, "Option", uPBtelemetryOpt);
                currentTelemetryOpt = uPBtelemetryOpt;
            }
        }
        else {
            jobTelemetryUserOptionNode = addChildElement(jobTelemetryUserOption, psfNs, "Option", uPBtelemetryOpt);
        }
        //set scored property -DocumentEventJobRepoPath, DocumentappDeployedUUID, and DocumentappDeployedID
        if (jobTelemetryUserOptionNode != null && currentTelemetryOpt == "ns0000:OptIn") {
            //for DocumentEventJobRepoPath
            var jobRepoPath = safeGetString(scriptContext.QueueProperties, "EventJsonRepoPath");
            addScoredParameterString(printTicket, jobTelemetryUserOptionNode, "ns0000:EventJobRepoPath", "ns0000:DocumentEventJobRepoPath", jobRepoPath, "xsd:string");
            //for DocumentappDeployedUUID
            var appDeployedUUID = safeGetString(scriptContext.QueueProperties, "appDeployedUUID");
            addScoredParameterString(printTicket, jobTelemetryUserOptionNode, "ns0000:appDeployedUUID", "ns0000:DocumentappDeployedUUID", appDeployedUUID, "xsd:string");
            //for DocumentappDeployedID
            var appDeployedID = safeGetString(scriptContext.QueueProperties, "appDeployedID");
            addScoredParameterString(printTicket, jobTelemetryUserOptionNode, "ns0000:appDeployedID", "ns0000:DocumentappDeployedID", appDeployedID, "xsd:string");
            //for DocumentappStackType
            var appStackType = safeGetString(scriptContext.QueueProperties, "appStackType");
            if (appStackType == null || appStackType == "") {
                appStackType = "Prod";
            }
            addScoredParameterString(printTicket, jobTelemetryUserOptionNode, "ns0000:appStackType", "ns0000:DocumentappStackType", appStackType);
            //addProp	
            addProperty(jobTelemetryUserOptionNode, "ns0000:JobQueueType", "UPD_Queue", "xsd:string");
        }
        else {
            removeParamInitNode(printTicket, "ns0000:DocumentEventJobRepoPath");
            removeParamInitNode(printTicket, "ns0000:DocumentappDeployedUUID");
            removeParamInitNode(printTicket, "ns0000:DocumentappDeployedID");
        }
    }
}
function ptToJobVars(printTicket, devModeProperties, values) {
    var prop = getProperty(printTicket.XmlNode.documentElement, venderDefinedNs, "JobVars");
    if (prop) {
        var prop2 = getProperty(prop, venderDefinedNs, "UserName");
        if (prop2)
            devModeProperties.SetString("UserName", prop2.firstChild.text);

        prop2 = getProperty(prop, venderDefinedNs, "JobName");
        if (prop2)
            devModeProperties.SetString("JobName", prop2.firstChild.text);

        prop2 = getProperty(prop, venderDefinedNs, "PIN");
        if (prop2 && values) {
            values["ns0000:JobStoragePIN"] = prop2.firstChild.text;
        }
        prop2 = getProperty(prop, venderDefinedNs, "Password");
        if (prop2 && values) {
            values["ns0000:JobStoragePassword"] = prop2.firstChild.text;
        }
        prop2 = getProperty(prop, venderDefinedNs, "SelectedPreset");
        if (prop2)
            devModeProperties.SetString("SelectedPreset", prop2.firstChild.text);
    }
}

//dynamic margin
function applyDynamicMargin(printTicket, productInfo, featureNodesMap) {
    var rootElement = printTicket.XmlNode.documentElement;
    var dynamicMarginFeature, dynamicMarginOptionNode, selectedOptionName;
    var jobDevLangFeature = (featureNodesMap && featureNodesMap["psk:JobDeviceLanguage"]) ||
        (rootElement && getFeatureNode(rootElement, "psk:JobDeviceLanguage", PREFIX_CANONICAL));
    var jobDestFeature = (featureNodesMap && featureNodesMap["ns0000:JobDestination"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobDestination", PREFIX_CANONICAL));
    var currentlang = "ns0000:None";
    var currentDest = "ns0000:Device";
    if (jobDevLangFeature != null) {
        var jobDevLangOptionNode = getSelectedOptionNode(jobDevLangFeature);
        if (jobDevLangOptionNode != null) {
            currentlang = jobDevLangOptionNode.getAttribute("name");
        }
    }
    if (jobDestFeature != null) {
        var jobDestOptionNode = getSelectedOptionNode(jobDestFeature);
        if (jobDestOptionNode != null) {
            currentDest = jobDestOptionNode.getAttribute("name");
        }
    }
    dynamicMarginFeature = (featureNodesMap && featureNodesMap["ns0000:JobDeviceMarigin"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobDeviceMarigin", PREFIX_CANONICAL));
    // Set device margin to 0 - PushToClient with PDF 
    if (currentlang == "ns0000:PDF" && currentDest == "ns0000:PushToClient") {
        if (dynamicMarginFeature != null) {
            dynamicMarginOptionNode = getSelectedOptionNode(dynamicMarginFeature);
            selectedOptionName = dynamicMarginOptionNode ? dynamicMarginOptionNode.getAttribute("name") : null;
            if (selectedOptionName != "ns0000:Margin0") {
                removeChildElements(dynamicMarginFeature, psfPrefix + ":Option")
                addChildElement(dynamicMarginFeature, psfNs, "Option", "ns0000:Margin0");
            }
        }
    }
    // set device marging by CID / borderless
    else if (dynamicMarginFeature && productInfo) {
        dynamicMarginOptionNode = getSelectedOptionNode(dynamicMarginFeature);
        selectedOptionName = dynamicMarginOptionNode ? dynamicMarginOptionNode.getAttribute("name") : null;
        var borderlessPrintingFeature = (featureNodesMap && featureNodesMap["psk:PageBorderless"]) ||
            (rootElement && getFeatureNode(rootElement, "psk:PageBorderless", PREFIX_CANONICAL));
        if (borderlessPrintingFeature) {
            var borderlessPrintingOptionNode = getSelectedOptionNode(borderlessPrintingFeature);
            var selectedborderlessPrintingOptionName = borderlessPrintingOptionNode ? borderlessPrintingOptionNode.getAttribute("name") : null;
            if (selectedborderlessPrintingOptionName == "psk:Borderless") {
                if (selectedOptionName != "ns0000:Margin0") {
                    removeChildElements(dynamicMarginFeature, psfPrefix + ":Option")
                    addChildElement(dynamicMarginFeature, psfNs, "Option", "ns0000:Margin0");
                }
                return;
            }
        }
        var edgeToEdgePrintingFeature = (featureNodesMap && featureNodesMap["ns0000:DocumentMargins"]) ||
            (rootElement && getFeatureNode(rootElement, "ns0000:DocumentMargins", PREFIX_CANONICAL));
        if (edgeToEdgePrintingFeature) {
            var edgeToEdgePrintingOptionNode = getSelectedOptionNode(edgeToEdgePrintingFeature);
            var selectedEdgeToEdgePrintingOptionName = edgeToEdgePrintingOptionNode ? edgeToEdgePrintingOptionNode.getAttribute("name") : null;
            if (selectedEdgeToEdgePrintingOptionName == "ns0000:Alternate") {
                if (selectedOptionName != "ns0000:MarginEdgeToEdge") {
                    removeChildElements(dynamicMarginFeature, psfPrefix + ":Option")
                    addChildElement(dynamicMarginFeature, psfNs, "Option", "ns0000:MarginEdgeToEdge");
                }
                return;
            }
        }
        if (productInfo.dymargin == 100 && selectedOptionName != "ns0000:Margin100") {
            removeChildElements(dynamicMarginFeature, psfPrefix + ":Option")
            addChildElement(dynamicMarginFeature, psfNs, "Option", "ns0000:Margin100");
        }
        else if (productInfo.dymargin == 70 && selectedOptionName != "ns0000:Margin70") {
            removeChildElements(dynamicMarginFeature, psfPrefix + ":Option")
            addChildElement(dynamicMarginFeature, psfNs, "Option", "ns0000:Margin70");
        }
        else if (productInfo.dymargin == 0 && selectedOptionName != "ns0000:Margin0") {
            removeChildElements(dynamicMarginFeature, psfPrefix + ":Option")
            addChildElement(dynamicMarginFeature, psfNs, "Option", "ns0000:Margin0");
        }
    }

}

function applyDynamicMarginToDevmode(printTicket) {
    var rootElement = printTicket.XmlNode.documentElement;
    var dynamicMarginFeature, dynamicMarginOptionNode, selectedOptionName;
    var borderlessPrintingFeature, borderlessPrintingOptionNode, selectedborderlessPrintingOptionName;
    dynamicMarginFeature = rootElement && getFeatureNode(rootElement, "ns0000:JobDeviceMarigin", PREFIX_CANONICAL);

    // set device marging by borderless
    if (dynamicMarginFeature) {
        dynamicMarginOptionNode = getSelectedOptionNode(dynamicMarginFeature);
        selectedOptionName = dynamicMarginOptionNode ? dynamicMarginOptionNode.getAttribute("name") : null;
        borderlessPrintingFeature = rootElement && getFeatureNode(rootElement, "psk:PageBorderless", PREFIX_CANONICAL);
        if (borderlessPrintingFeature) {
            borderlessPrintingOptionNode = getSelectedOptionNode(borderlessPrintingFeature);
            selectedborderlessPrintingOptionName = borderlessPrintingOptionNode ? borderlessPrintingOptionNode.getAttribute("name") : null;
            if (selectedborderlessPrintingOptionName == "psk:Borderless") {
                if (selectedOptionName != "ns0000:Margin0") {
                    removeChildElements(dynamicMarginFeature, psfPrefix + ":Option")
                    addChildElement(dynamicMarginFeature, psfNs, "Option", "ns0000:Margin0");
                }
                return;
            }
        }
    }

}

//snapping
function validateAndApplySnapping(printTicket, scriptContext, productInfo, featureNodesMap) {
    //debugger;
    if (productInfo && productInfo.supportSnapping == true) {
        var snappingsXmlString = safeGetString(scriptContext.DriverProperties, "Snappings");
        var loadedSnappingsXml = loadXMLFromString(printTicket, snappingsXmlString);
        if (loadedSnappingsXml && !checkTouchbyUser(printTicket, featureNodesMap)) {
            setSnapping(printTicket, featureNodesMap, loadedSnappingsXml);
        }
    }
}
function checkTouchbyUser(printTicket, featureNodesMap) {
    var touchByUser = false;
    var rootElement = printTicket.XmlNode.documentElement;
    var jobTouchByUserNodeFeature = (featureNodesMap && featureNodesMap["ns0000:JobTouchByUser"]) ||
        (rootElement && getFeatureNode(rootElement, "ns0000:JobTouchByUser", PREFIX_CANONICAL));
    if (jobTouchByUserNodeFeature) {
        var jobTouchByUserOptionNode = getSelectedOptionNode(jobTouchByUserNodeFeature);
        var jobTouchByUserOptionNodeName = jobTouchByUserOptionNode.getAttribute("name");
        if (jobTouchByUserOptionNodeName == "ns0000:On")
            touchByUser = true;
        if (jobTouchByUserOptionNodeName == "ns0000:Off")
            touchByUser = false;
    }
    if (!touchByUser && (enableTouchByUser(printTicket, featureNodesMap, "psk:PageMediaType", "ns0000:PageMediaTypePrev") ||
        enableTouchByUser(printTicket, featureNodesMap, "psk:PageInputBin", "ns0000:PageInputBinPrev") ||
        enableTouchByUser(printTicket, featureNodesMap, "psk:PageBorderless", "ns0000:PageBorderlessPrev") ||
        enableTouchByUser(printTicket, featureNodesMap, "ns0000:JobUserResolution", "ns0000:JobUserResolutionPrev"))) {
        touchByUser = true;
    }
    return touchByUser;
}
function enableTouchByUser(printTicket, featureNodesMap, nodeFeatureName, paramInitNodeFeaturePrevName) {
    var touchByUser = false;
    var rootElement = printTicket.XmlNode.documentElement;
    var nodeFeature = (featureNodesMap && featureNodesMap[nodeFeatureName]) ||
        (rootElement && getFeatureNode(rootElement, nodeFeatureName, PREFIX_CANONICAL));
    if (nodeFeature) {
        var nodeOption = getSelectedOptionNode(nodeFeature);
        var nodeOptionName = nodeOption.getAttribute("name");
        var paramInitNodeFeaturePrev = getParameterInitNode(printTicket.XmlNode, paramInitNodeFeaturePrevName, PREFIX_CANONICAL);
        if (paramInitNodeFeaturePrev) {
            var paramInitNodeFeaturePrevValue = getPropertyValue(paramInitNodeFeaturePrev);
            //if previous and current slection does not match
            if (paramInitNodeFeaturePrevValue != nodeOptionName) {
                //update new value
                setParameterInitNode(printTicket.XmlNode, paramInitNodeFeaturePrevName, PREFIX_CANONICAL, nodeOptionName, "xsd:string");
                //update touchByUSer feature to "On"
                var touchByUserNodeFeature = (featureNodesMap && featureNodesMap["ns0000:JobTouchByUser"]) ||
                    (rootElement && getFeatureNode(rootElement, "ns0000:JobTouchByUser", PREFIX_CANONICAL));
                if (touchByUserNodeFeature) {
                    var touchByUserNodeOption = getSelectedOptionNode(touchByUserNodeFeature);
                    var touchByUserNodeOptionName = touchByUserNodeOption.getAttribute("name");
                    if (touchByUserNodeOptionName && touchByUserNodeOptionName != "ns0000:On") {
                        removeChildElements(touchByUserNodeFeature, psfPrefix + ":Option")
                        addChildElement(touchByUserNodeFeature, psfNs, "Option", "ns0000:On");
                        touchByUser = true;
                    }
                }
            }
        }
    }
    return touchByUser;
}
function setSnapping(printTicket, featureNodesMap, snappingDataNode) {
    var rootElement = printTicket.XmlNode.documentElement;
    if (snappingDataNode) {
        var mediaSizeNodeFeature = (featureNodesMap && featureNodesMap["psk:PageMediaSize"]) ||
            (rootElement && getFeatureNode(rootElement, "psk:PageMediaSize", PREFIX_CANONICAL));
        var borderlessNodeFeature = (featureNodesMap && featureNodesMap["psk:PageBorderless"]) ||
            (rootElement && getFeatureNode(rootElement, "psk:PageBorderless", PREFIX_CANONICAL));
        if (mediaSizeNodeFeature && borderlessNodeFeature) {
            var mediaSizeOptionNodeName = getSelectedOptionNode(mediaSizeNodeFeature).getAttribute("name");
            var borderlessOptionNodeName = getSelectedOptionNode(borderlessNodeFeature).getAttribute("name");
            var snapItemsNode = null;
            if (borderlessOptionNodeName == "psk:Borderless") {
                snapItemsNode = snappingDataNode.selectSingleNode("/SnappingData/Snapping[@Option='" + mediaSizeOptionNodeName + "']/BorderlessOn");
            }
            else {
                snapItemsNode = snappingDataNode.selectSingleNode("/SnappingData/Snapping[@Option='" + mediaSizeOptionNodeName + "']/BorderlessOff");
            }
            if (snapItemsNode) {
                var featureName, featureNamePrev, optionName, nodeFeature, nodeCurrentOptionName;
                var snapItems = snapItemsNode.getElementsByTagName("SnapItem");
                for (var i = 0; i < snapItems.length; i++) {
                    featureName = snapItems[i].getAttribute("Feature");
                    featureNamePrev = "ns0000:" + featureName.substring(featureName.indexOf(":") + 1) + "Prev";
                    optionName = snapItems[i].getAttribute("Option");
                    nodeFeature = (featureNodesMap && featureNodesMap[featureName]) ||
                        (rootElement && getFeatureNode(rootElement, featureName, PREFIX_CANONICAL));
                    if (nodeFeature) {
                        nodeCurrentOptionName = getSelectedOptionNode(nodeFeature).getAttribute("name");
                        if (nodeCurrentOptionName && nodeCurrentOptionName != optionName) {
                            removeChildElements(nodeFeature, psfPrefix + ":Option");
                            addChildElement(nodeFeature, psfNs, "Option", optionName);
                        }
                        setParameterInitNode(printTicket.XmlNode, featureNamePrev, PREFIX_CANONICAL, optionName, "xsd:string");
                    }
                }
            }
        }
    }
}

function queueAttributeToPt(printTicket, devModeProperties) {
    //debugger;
    var rootElement = printTicket.XmlNode.documentElement;
    var currQueueId = getCurrentQueueId(printTicket, devModeProperties);
    var prop = getProperty(rootElement, venderDefinedNs, "QueueAttributes");
    if (prop != null)
        rootElement.removeChild(prop);

    // add Property for PrinterAttributes
    prop = addProperty(rootElement, "ns0000:QueueAttributes")
    addProperty(prop, "ns0000:DataType", "String", "xsd:string");
    //Add queueID
    if (currQueueId == null || currQueueId == "") {
        currQueueId = CreateGuid();
    }
    addProperty(prop, "ns0000:QueueId", currQueueId, "xsd:string");
}

function printerAttributeToPt(printTicket, productInfo) {
    // debugger;
    var rootElement = printTicket.XmlNode.documentElement;
    var prop = getProperty(rootElement, venderDefinedNs, "PrinterAttributes");
    if (prop != null)
        rootElement.removeChild(prop);

    // add Property for PrinterAttributes
    prop = addProperty(rootElement, "ns0000:PrinterAttributes")
    addProperty(prop, "ns0000:DataType", "String", "xsd:string");

    //devCap type
    if (productInfo.devCapCategory != null) {
        addProperty(prop, "ns0000:RefDevCap", productInfo.devCapCategory, "xsd:string");
    }
    //manual type
    if (productInfo.manualDuplexType != null) {
        addProperty(prop, "ns0000:RefManualType", productInfo.manualDuplexType, "xsd:string");
    }
    //dynamic maring
    addProperty(prop, "ns0000:DyMargin", productInfo.dymargin, "xsd:integer");
    //Output Driection
    addProperty(prop, "ns0000:OutDirection", productInfo.outDirection == Output_Direction.FACEUP ? "FACEUP" : "FACEDOWN", "xsd:string");
    //Rotate For land
    addProperty(prop, "ns0000:RotateForLand", productInfo.rotateForLand == true ? "True" : "False", "xsd:string");
    //support snapping
    addProperty(prop, "ns0000:SupportSnapping", productInfo.supportSnapping == true ? "True" : "False", "xsd:string");
    //Add CID
    addProperty(prop, "ns0000:CID", productInfo.cid, "xsd:string");
}

//printcaps function
function extractFeatureValues(printTicket, featureDefs, values) {
    // need to get feature including sub feature.
    var featureDef, featureNode, featureName, optionNodes, optionNode, value;
    var featureNodesMap = getChildElementsMap((printTicket.XmlNode ? printTicket.XmlNode : printTicket), psfPrefix + ":Feature");
    for (var i = 0; i < featureDefs.length; ++i) {
        featureDef = featureDefs[i];
        if (!featureDef)
            continue;
        featureNode = featureNodesMap[featureDef.name];
        if (featureNode) {
            if (featureDef.options || featureDef.source) {
                featureName = (featureDefs.parent ? featureDefs.parent + "+" : "") + featureDef.name;
                optionNodes = featureNode.selectNodes(psfPrefix + ":Option");
                for (var j = 0; j < optionNodes.length; ++j) {
                    optionNode = optionNodes.item(j);
                    value = getElementName(optionNode, PREFIX_CANONICAL);
                    if (value != null) {
                        if (featureDef.pickMany) {
                            values[featureName + "/" + j] = value;
                        }
                        else {
                            values[featureName] = value;
                        }
                    }
                    if (featureDefs.parent) {
                        featureDef.parent = featureDefs.parent;
                    }
                    extractScoredPropertyValues(featureDef, optionNode, j, featureDef.options, value, values)


                    if (!featureDef.pickMany)
                        break;
                }
            }
            if (featureDef.subFeatures) {
                featureDef.subFeatures.parent = featureDef.name;
                extractFeatureValues(featureNode, featureDef.subFeatures, values);
            }
        }
    }
}
function extractParameterValues(printTicket, paramDefs, values) {
    var paramNodesMap = getAllElementsMap(printTicket.XmlNode, psfPrefix + ":ParameterInit");
    var paramDef, paramInitNode, value;
    for (var i = 0; i < paramDefs.length; ++i) {
        paramDef = paramDefs[i];
        if (!paramDef)
            continue;
        paramInitNode = paramNodesMap[paramDef.name];
        if (paramInitNode) {
            value = getPropertyValue(paramInitNode);
            values[paramDef.name] = value;
        }
    }
}
function extractScoredPropertyValues(featureDef, optionNode, optionNumber, optionDefs, optionName, values) {
    var optionDef = findInArray(optionDefs, function (o) {
        var allMatch;
        if (o.name)
            return o.name == optionName;
        else if (o.scoredProps) {
            allMatch = true;
            forEach(o.scoredProps, function (scoredPropDef) {
                /*if (!scoredPropDef.paramRef)*/ { // FUI can generate ScoredProperty with Value even if it is with ParameterRef in PrintCapabilities.
                    var scoredPropValue = getScoredPropertyValue(optionNode, scoredPropDef.name);
                    if (scoredPropDef.value && scoredPropValue != scoredPropDef.value) {
                        allMatch = false;
                        return false; // break
                    }
                }
            });
            return allMatch;
        }
        else if (o.scoredPropsChanges) {
            allMatch = true;
            forEach(o.scoredPropsChanges, function (scoredPropDef) {
                /*if (!scoredPropDef.paramRef)*/ { // FUI can generate ScoredProperty with Value even if it is with ParameterRef in PrintCapabilities.
                    var scoredPropValue = getScoredPropertyValue(optionNode, scoredPropDef.to);
                    if (scoredPropDef.value && scoredPropValue != scoredPropDef.value) {
                        allMatch = false;
                        return false; // break
                    }
                }
            });
            return allMatch;
        }
        return false;
    });
    if (optionDef && optionDef.scoredProps) {
        forEach(optionDef.scoredProps, function (scoredPropDef) {
            /*if (!scoredPropDef.paramRef)*/ { // FUI can generate ScoredProperty with Value even if it is with ParameterRef in PrintCapabilities.
                var scoredPropValue = getScoredPropertyValue(optionNode, scoredPropDef.name);
                if (scoredPropValue != null) {
                    var scoredPropFullName = getScoredPropertyFullName(featureDef, scoredPropDef.name, optionNumber);
                    values[scoredPropFullName] = scoredPropValue;
                }
            }
        });
    }
    else if (optionDef && optionDef.scoredPropsChanges) {
        forEach(optionDef.scoredPropsChanges, function (scoredPropDef) {
            /*if (!scoredPropDef.paramRef)*/ { // FUI can generate ScoredProperty with Value even if it is with ParameterRef in PrintCapabilities.
                var scoredPropValue = getScoredPropertyValue(optionNode, scoredPropDef.to);
                if (scoredPropValue != null) {
                    var scoredPropFullName = getScoredPropertyFullName(featureDef, scoredPropDef.to, optionNumber);
                    values[scoredPropFullName] = scoredPropValue;
                }
            }
        });
    }
    else if (!optionDef) {
        // HACK: Support for options not defined in PrintCaps (like custom media size)
        var scoredPropNodes = optionNode.selectNodes(psfPrefix + ":ScoredProperty");
        var scoredPropNames = [];
        var paramRefNode, scoredPropNode, scoredPropName, scoredPropFullName, scoredPropValue, scoredPropType;
        for (var j = 0; j < scoredPropNodes.length; ++j) {
            scoredPropNode = scoredPropNodes.item(j);
            scoredPropName = getElementName(scoredPropNode, PREFIX_CANONICAL);
            scoredPropFullName = getScoredPropertyFullName(featureDef, scoredPropName, optionNumber);
            scoredPropValue = getPropertyValue(scoredPropNode);
            scoredPropType = getPropertyType(scoredPropNode);
            if (scoredPropValue != null) {
                values[scoredPropFullName] = scoredPropValue;
            }
            else {
                paramRefNode = scoredPropNode.selectSingleNode(psfPrefix + ":ParameterRef");
                if (paramRefNode != null) {
                    var paramRefName = getElementName(paramRefNode, PREFIX_CANONICAL);
                    values[getScoredPropRefName(scoredPropFullName)] = paramRefName;
                }
            }
            if (scoredPropType != null) {
                scoredPropNames.push(scoredPropName + "+" + scoredPropType);
            }
            else {
                scoredPropNames.push(scoredPropName);
            }


        }
        if (scoredPropNames.length > 0) {
            values[getScoredPropsArrayName(featureDef, optionNumber)] = scoredPropNames.join(",");
        }
    }
}
function addFeaturesAndParameters(printCapabilitiesOrPrintTicket, printCaps, featureNodesMap, values) {
    var paramDefsMap = {};
    forEach(printCaps.paramDefs, function (paramDef) {
        paramDefsMap[paramDef.name] = paramDef;
    });
    forEach(printCaps.features, function (featureDef) {
        addFeature(printCapabilitiesOrPrintTicket.XmlNode.documentElement, featureDef, values, featureNodesMap, paramDefsMap);
    });
    var isPrintCapabilities = printCapabilitiesOrPrintTicket.XmlNode.documentElement.baseName == "PrintCapabilities";
    var paramNodesMap = getAllElementsMap(printCapabilitiesOrPrintTicket.XmlNode,
        psfPrefix + (isPrintCapabilities ? ":ParameterDef" : ":ParameterInit"));
    forEach(printCaps.paramDefs, function (paramDef) {
        addParameter(printCapabilitiesOrPrintTicket.XmlNode.documentElement, paramDef, values, paramNodesMap);
    });
}
function addFeature(parentNode, featureDef, values, featureNodesMap, paramDefsMap) {
    var document = parentNode.ownerDocument;
    var isPrintCapabilities = document.documentElement.baseName == "PrintCapabilities";
    var featureNode = addFeatureContainer(parentNode, featureDef, featureNodesMap);
    var selectedOptionNode;
    var optionNumber, optionName, optionDef, optionNode, scoredPropNamesString, scoredPropNames, scoredPropDefs;
    var scoredPropValueType, scoredPropName, scoredPropDef, scoredPropFullName, scoredPropValue;
    if (featureNode) {
        if (featureDef.source && !isPrintCapabilities) {
            selectedOptionNode = getSelectedOptionNode(featureNode);
            if (selectedOptionNode) {
                removeElement(selectedOptionNode);
            }
            for (optionNumber = 0; ; ++optionNumber) {
                optionName = values[(featureDef.parent ? featureDef.parent + "+" : "") + featureDef.name + (featureDef.pickMany ? "/" + optionNumber : "")]; // may be undefined in case of unnamed Option
                if (!optionName)
                    break;
                optionDef = { name: optionName };
                // scoredProperty format : Name+DataType
                scoredPropNamesString = values[getScoredPropsArrayName(featureDef, optionNumber)];
                if (scoredPropNamesString) {
                    scoredPropNames = scoredPropNamesString.split(",");
                    scoredPropDefs = [];
                    forEach(scoredPropNames, function (scoredPropNameWithType) {
                        scoredPropValueType = scoredPropNameWithType.split("+");
                        scoredPropName = scoredPropValueType[0];
                        scoredPropDef = { name: scoredPropName };
                        scoredPropFullName = getScoredPropertyFullName(featureDef, scoredPropName, optionNumber);
                        scoredPropValue = values[scoredPropFullName];
                        if (scoredPropValue) {
                            scoredPropDef.value = scoredPropValue;
                            if (scoredPropValueType[1]) {
                                scoredPropDef.type = scoredPropValueType[1];
                            }
                        }
                        else {
                            var scoredPropRefName = values[getScoredPropRefName(scoredPropFullName)];
                            if (scoredPropRefName) {
                                scoredPropDef.paramRef = scoredPropRefName;
                            }
                        }
                        scoredPropDefs.push(scoredPropDef);
                    });
                    optionDef.scoredProps = scoredPropDefs;
                }
                optionNode = addOption(featureDef, featureNode, optionDef, optionNumber, values, paramDefsMap);
                if (!optionNode)
                    break;
                if (!featureDef.pickMany)
                    break;
            }
        }
        else if (featureDef.options) {
            if (isPrintCapabilities) {
                for (var i = 0; i < featureDef.options.length; ++i) {
                    optionDef = featureDef.options[i];
                    if (!optionDef)
                        continue;
                    addOption(featureDef, featureNode, optionDef);
                }
            }
            else {
                for (optionNumber = 0; ; ++optionNumber) {
                    optionName = values[(featureDef.parent ? featureDef.parent + "+" : "") + featureDef.name + (featureDef.pickMany ? "/" + optionNumber : "")]; // may be undefined in case of unnamed Option
                    // find matching option definition (all ScoredProperties with immediate Value should match)
                    // if there is no property with immediate Value defined, then first option definition is taken
                    optionDef = findInArray(featureDef.options, function (o) {
                        if (o.name)
                            return o.name == optionName;
                        else if (o.scoredProps) {
                            var allMatch = true;
                            forEach(o.scoredProps, function (scoredPropDef) {
                                if (!scoredPropDef.paramRef) {
                                    var scoredPropFullName = getScoredPropertyFullName(featureDef, scoredPropDef.name, optionNumber);
                                    var scoredPropValue = values[scoredPropFullName];
                                    if (!scoredPropValue || (scoredPropDef.value && scoredPropValue != scoredPropDef.value)) {
                                        allMatch = false;
                                        return false; // break
                                    }
                                }
                            });
                            return allMatch;
                        }
                        return false;
                    });
                    if (!optionDef && !optionName)
                        break;
                    // HACK: support for options which are not defined in PrintCaps
                    var isUnknownOption = !optionDef;
                    if (!optionDef) {
                        optionDef = { name: optionName };
                        // scoredProperty format : Name+DataType
                        scoredPropNamesString = values[getScoredPropsArrayName(featureDef, optionNumber)];
                        if (scoredPropNamesString) {
                            scoredPropNames = scoredPropNamesString.split(",");
                            scoredPropDefs = [];
                            forEach(scoredPropNames, function (scoredPropNameWithType) {
                                scoredPropValueType = scoredPropNameWithType.split("+");
                                scoredPropName = scoredPropValueType[0];
                                scoredPropDef = { name: scoredPropName };
                                scoredPropFullName = getScoredPropertyFullName(featureDef, scoredPropName, optionNumber);
                                scoredPropValue = values[scoredPropFullName];
                                if (scoredPropValue) {
                                    scoredPropDef.value = scoredPropValue;
                                    if (scoredPropValueType[1]) {
                                        scoredPropDef.type = scoredPropValueType[1];
                                    }
                                }
                                else {
                                    var scoredPropRefName = values[getScoredPropRefName(scoredPropFullName)];
                                    if (scoredPropRefName) {
                                        scoredPropDef.paramRef = scoredPropRefName;
                                    }
                                }
                                scoredPropDefs.push(scoredPropDef);
                            });
                            optionDef.scoredProps = scoredPropDefs;
                        }
                    }
                    if (!isUnknownOption || !findElementNode(featureNode, psfPrefix + ":Option", optionName, PREFIX_CANONICAL)) {
                        if (optionNumber == 0)
                            removeChildElements(featureNode, psfPrefix + ":Option");
                        optionNode = addOption(featureDef, featureNode, optionDef, optionNumber, values, paramDefsMap);
                        if (!optionNode)
                            break;
                    }
                    if (!featureDef.pickMany)
                        break;
                }
            }
        }
        if (featureDef.subFeatures) {
            var subFeature;
            for (var i = 0; i < featureDef.subFeatures.length; ++i) {
                subFeature = featureDef.subFeatures[i];
                if (!subFeature)
                    continue;
                subFeature.parent = featureDef.name;
                addFeature(featureNode, subFeature, values, featureNodesMap, paramDefsMap);
            }
        }
        if (featureDef.removes) {
            if (isPrintCapabilities) {
                for (var i = 0; i < featureDef.removes.length; ++i) {
                    optionDef = featureDef.removes[i];
                    if (!optionDef)
                        continue;
                    removeOption(featureDef, featureNode, optionDef);
                }
            }
        }
        if (featureDef.scoredPropsChanges) {
            if (isPrintCapabilities) {
                changeOptionsScoredProperties(featureDef, featureNode, featureDef.scoredPropsChanges);
            }
        }
    }
    if (!isPrintCapabilities) {
        selectedOptionNode = getSelectedOptionNode(featureNode);
        if (!selectedOptionNode) { // remove empty features
            removeElement(featureNode);
            featureNode = null;
        }
    }
    return featureNode;
}
function addFeatureContainer(parentNode, featureDef, featureNodesMap) {
    var document = parentNode.ownerDocument;
    var isPrintCapabilities = document.documentElement.baseName == "PrintCapabilities";
    var name = featureDef.name;
    var isExistingInGPD = featureDef.inGPD || (featureNodesMap != null && featureNodesMap[name] != null);
    var featureNode = null;
    // isExistion definition should be match with current GPD.
    // the feature is existed in current GPD, the isExisting def should be true.
    if (isExistingInGPD == true) {
        featureNode = (featureNodesMap && featureNodesMap[name]) ||
            (getFeatureNode(parentNode, name, PREFIX_CANONICAL));
        if (featureNode && featureNode.parentNode != parentNode) {
            removeElement(featureNode);
            parentNode.appendChild(featureNode);
        }
    }
    else {
        featureNode = (featureNodesMap && featureNodesMap[name]);
    }

    if (!featureNode) {
        featureNode = createChildElement(parentNode, psfNs, "Feature", name);
        if (isPrintCapabilities) {
            setProperty(featureNode, false, "DisplayName", pskNs, featureDef.dispName || featureDef.name + " Feature", "string", xsdNs, true);
            setProperty(featureNode, false, "SelectionType", psfNs, getNameWithNs(document, pskNs, featureDef.pickMany ? "PickMany" : "PickOne"), "QName", xsdNs, true);
        }
    }

    return featureNode;
}
function addOption(featureDef, featureNode, optionDef, optionNumber, values, paramDefsMap) {
    var name = optionDef.name;
    var document = featureNode.ownerDocument;
    var isPrintCapabilities = document.documentElement.baseName == "PrintCapabilities";
    var optionNode = addChildElement(featureNode, psfNs, "Option", name);

    if (isPrintCapabilities) {
        setProperty(optionNode, false, "DisplayName", pskNs, optionDef.dispName || optionDef.name + " Option", "string", xsdNs, true);
    }
    if (optionDef.scoredProps) {
        forEach(optionDef.scoredProps, function (scoredPropDef) {
            if (!isPrintCapabilities && !scoredPropDef.type && paramDefsMap) {
                // get type from referenced parameter definition
                if (scoredPropDef.paramRef) {
                    var paramDef = paramDefsMap[scoredPropDef.paramRef];
                    if (paramDef) {
                        var typeProp = findInArray(paramDef.props, function (prop) {
                            return prop.name == "psf:DataType";
                        });
                        if (typeProp) {
                            scoredPropDef.type = typeProp.value;
                        }
                    }
                }
            }
            addScoredProperty(featureDef, optionNode, optionNumber, scoredPropDef, values);
        });
    }
    if (optionDef.props) {
        forEach(optionDef.props, function (propDef) {
            addProperty(optionNode, propDef.name, propDef.value, propDef.type);
        });
    }
    if (!name && isElementEmpty(optionNode)) {
        removeElement(optionNode);
        optionNode = null;
    }
    return optionNode;
}
function addScoredProperty(featureDef, optionNode, optionNumber, scoredPropDef, values) {
    var document = optionNode.ownerDocument;
    var isPrintCapabilities = document.documentElement.baseName == "PrintCapabilities";

    var propertyNode = addChildElement(optionNode, psfNs, "ScoredProperty", scoredPropDef.name);

    if (isPrintCapabilities) {
        var paramRefName = scoredPropDef.paramRef;
        if (paramRefName) {
            removeChildElements(propertyNode);
            addChildElement(propertyNode, psfNs, "ParameterRef", paramRefName);
        }
        else if (scoredPropDef.value) {
            addValue(propertyNode, scoredPropDef.value, scoredPropDef.type);
        }
    }
    else {
        if (scoredPropDef.value) { // ScoredProperty value is fixed for current option
            addValue(propertyNode, scoredPropDef.value, scoredPropDef.type);
        }
        else if (scoredPropDef.paramRef) { // ScoredProperty value should be specified via parameter (only if not PickMany feature)
            var scoredPropFullName = getScoredPropertyFullName(featureDef, scoredPropDef.name, optionNumber);
            var value = values[scoredPropFullName]; // FUI can generate ScoredProperty with Value even if it is with ParameterRef in PrintCapabilities.
            //if (featureDef.pickMany && value) { // add as immediate Value only if feature is PickMany and ScoredProperty was generated with immediate Value by FUI
            if (value || value == "") {
                addValue(propertyNode, value, scoredPropDef.type);
            }
            else if (values[scoredPropDef.paramRef] || values[scoredPropDef.paramRef] == "") { // otherwise, if there is a value for this ScoredProperty (either ParameterRef or immediate), add as ParameterRef
                removeChildElements(propertyNode);
                addChildElement(propertyNode, psfNs, "ParameterRef", scoredPropDef.paramRef);
            }
        }
    }
    if (isElementEmpty(propertyNode)) {
        removeElement(propertyNode);
        propertyNode = null;
    }
    return propertyNode;
}
function addValue(parentNode, value, type) {
    var document = parentNode.ownerDocument;
    removeChildElements(parentNode);
    var valueNode = addChildElement(parentNode, psfNs, "Value");
    setAttributeWithNs(valueNode, xsiNs, "type", toRealNameWithNs(document, type || "xsd:string"));
    valueNode.text = value;
    return valueNode;
}
function removeOption(featureDef, featureNode, optionDef) {
    var name = optionDef.name;
    var optionNode = getOptionNode(featureNode, name);
    if (optionNode) {
        removeElement(optionNode);
    }
}
function changeOptionsScoredProperties(featureDef, featureNode, scoredPropDef) {
    var nextNode = featureNode.firstChild;
    var scoredPropDef, childnode;
    while (nextNode != null) {
        if (nextNode.baseName == "Option") {
            for (var i = 0; i < featureDef.scoredPropsChanges.length; ++i) {
                scoredPropDef = featureDef.scoredPropsChanges[i];
                if (!scoredPropDef)
                    continue;
                childnode = nextNode.firstChild;
                while (childnode != null) {
                    if (childnode.baseName == "ScoredProperty") {
                        if (childnode.getAttribute("name") == scoredPropDef.from)
                            childnode.setAttribute("name", scoredPropDef.to);
                    }
                    childnode = childnode.nextSibling;
                }
            }
        }
        nextNode = nextNode.nextSibling;
    }
}
function addParameter(parentNode, paramDef, values, paramNodesMap) {
    var document = parentNode.ownerDocument;
    var isPrintCapabilities = document.documentElement.baseName == "PrintCapabilities";
    var parameterNode = paramNodesMap && paramNodesMap[paramDef.name];

    if (isPrintCapabilities) {
        if (paramDef.props && paramDef.props.length > 0) {
            if (!parameterNode)
                parameterNode = createChildElement(parentNode, psfNs, "ParameterDef", paramDef.name);
            forEach(paramDef.props, function (propDef) {
                addProperty(parameterNode, propDef.name, propDef.value, propDef.type);
            });
        }
    }
    else {
        var value = values[paramDef.name];
        if (value || value == "") {
            if (!parameterNode)
                parameterNode = createChildElement(parentNode, psfNs, "ParameterInit", paramDef.name);
            var typeProp = findInArray(paramDef.props, function (p) {
                return p.name == "psf:DataType";
            });
            addValue(parameterNode, value, typeProp && typeProp.value);
        }
    }

    return parameterNode;
}
function addProperty(parentNode, name, value, type) {
    var propertyNode = addChildElement(parentNode, psfNs, "Property", name);
    if (value || value == "") {
        addValue(propertyNode, value, type);
    }
    return propertyNode;
}
function makeFeatureValuesMap(featureNodes) {
    var values = {};
    var featureNode, featureName, featureValues;
    var optionNodes, optionNode, value, featureValue;
    for (var i = 0; i < featureNodes.length; ++i) {
        featureNode = featureNodes.item(i);
        featureName = getElementName(featureNode, PREFIX_CANONICAL);
        featureValues = [];
        optionNodes = featureNode.selectNodes(psfPrefix + ":Option");
        for (var j = 0; j < optionNodes.length; ++j) {
            optionNode = optionNodes.item(j);
            value = getElementName(optionNode, PREFIX_CANONICAL);
            if (value != null)
                featureValues.push(value);
        }
        featureValue = featureValues.join(",");
        values[featureName] = featureValue;
    }
    return values;
}

function makePolicyFeatureValueMap(featureNodes) {
    var values = {};
    var featureNode, featureName, featureValue = "";

    for (var i = 0; i < featureNodes.length; ++i) {
        featureNode = featureNodes.item(i);
        featureName = getElementName(featureNode, PREFIX_CANONICAL);

        featureValue += getSelectedOptionName(featureNode, PREFIX_CANONICAL);
        featureValue += ",";
        featureValue += featureNode.getAttribute("lock");
        featureValue += ",";
        featureValue += featureNode.getAttribute("default");

        values[featureName] = featureValue;
    }
    return values;
}

function makePolicyParamValueMap(paramNodes) {
    var values = {};
    var paramNode, paramName, paramValue;
    for (var i = 0; i < paramNodes.length; ++i) {
        paramNode = paramNodes.item(i);
        paramName = getElementName(paramNode, PREFIX_CANONICAL);
        paramValue = getPropertyValue(paramNode);
        values[paramName] = paramValue;
    }
    return values;
}

// pt function
// for feature
function getFeatureNode(parentNode, name, prefixType) {
    return findElementNode(parentNode, psfPrefix + ":Feature", name, prefixType);
}

//for parameter
function getParameterInitNode(parentNode, name, prefixType) {
    return findElementNode(parentNode, psfPrefix + ":ParameterInit", name, prefixType);
}
function getParameterDefNode(parentNode, name, prefixType) {
    return findElementNode(parentNode, psfPrefix + ":ParameterDef", name, prefixType);
}
function getParameterInit(node, keywordNamespace, propertyName) {
    return searchByAttributeName(
        node,
        psfPrefix + ":ParameterInit",
        keywordNamespace,
        propertyName);
}
function setParameterInitNode(parentNode, name, prefixType, value, type) {
    var param = getParameterInitNode(parentNode, name, prefixType);
    if (!param) {
        param = createChildElement(parentNode.documentElement, psfNs, "ParameterInit", name);
    }
    if (param) {
        addValue(param, value, type);
    }
    return param;
}
function addScoredParameterString(printTicket, targetOptionNode, scoredPropertyName, paramName, paramValue, paramValueType) {
    if (targetOptionNode == null || scoredPropertyName == null || paramName == null)
        return;

    var propertyNode = addChildElement(targetOptionNode, psfNs, "ScoredProperty", scoredPropertyName);
    var paramInitNode = getParameterInitNode(printTicket.XmlNode, paramName, PREFIX_CANONICAL);
    addChildElement(propertyNode, psfNs, "ParameterRef", paramName);
    if (paramInitNode) {
        removeChildElements(paramInitNode, psfPrefix + ":Value");
        if (paramValueType == "xsd:string") {
            addValue(paramInitNode, paramValue ? paramValue : "", paramValueType);
        }
        else {
            addValue(paramInitNode, paramValue, paramValueType);
        }
    }
    else {
        paramInitNode = createChildElement(printTicket.XmlNode.documentElement, psfNs, "ParameterInit", paramName);
        if (paramValueType == "xsd:string") {
            addValue(paramInitNode, paramValue ? paramValue : "", paramValueType);
        }
        else {
            addValue(paramInitNode, paramValue, paramValueType);
        }
    }
}
function removeParamInitNode(printTicket, paramName) {
    var rootElement = printTicket.XmlNode.documentElement;
    if (paramName == null) {
        return;
    }
    var paramInitNode = getParameterInitNode(printTicket.XmlNode, paramName, PREFIX_CANONICAL);
    if (paramInitNode) {
        rootElement.removeChild(paramInitNode);
        paramInitNode = null;
    }
}

//for option
function getOptionNode(featureNode, optionName, prefixType) {
    var name = parseNameWithNs(featureNode, optionName, prefixType);
    if (!name.name || !name.ns)
        return null;
    var optionNode = searchByAttributeName(featureNode, psfPrefix + ":Option", name.ns, name.name);
    return optionNode;
}
function getSelectedOptionNode(featureNode) {
    var optionNode = featureNode.selectSingleNode(psfPrefix + ":Option");
    return optionNode;
}
function getSelectedOptionName(featureNode, prefixType) {
    var optionNode = featureNode.selectSingleNode(psfPrefix + ":Option");
    return optionNode ? getElementName(optionNode, prefixType) : null;
}

//for property
function getProperty(node, keywordNamespace, propertyName) {
    return searchByAttributeName(
        node,
        psfPrefix + ":Property",
        keywordNamespace,
        propertyName);
}
function getPropertyValue(propertyNode) {
    var valueNode = getPropertyFirstValueNode(propertyNode);
    if (valueNode) {
        var child = valueNode.firstChild;
        if (child) {
            return child.nodeValue;
        }
    }
    return null;
}
function getPropertyType(propertyNode) {
    if (!propertyNode) {
        return null;
    }
    var nodeName = propertyNode.nodeName;
    if ((nodeName.indexOf(":Property") < 0) &&
        (nodeName.indexOf(":ScoredProperty") < 0) &&
        (nodeName.indexOf(":ParameterInit") < 0)) {
        return null;
    }
    var valueNode = getPropertyFirstValueNode(propertyNode);
    if (valueNode) {
        var type = valueNode.getAttribute(xsiPrefix + ":type");
        return type;
    }
    return null;
}
function getPropertyFirstValueNode(propertyNode) {
    if (!propertyNode) {
        return null;
    }
    var nodeName = propertyNode.nodeName;
    if ((nodeName.indexOf(":Property") < 0) &&
        (nodeName.indexOf(":ScoredProperty") < 0) &&
        (nodeName.indexOf(":ParameterInit") < 0)) {
        return null;
    }
    var valueNode = propertyNode.selectSingleNode(psfPrefix + ":Value");
    return valueNode;
}
function setProperty(featureNode, scored, name, nameNs, value, type, typeNs, keepExisting) {
    var document = featureNode.ownerDocument;
    var propertyNode;
    if (scored && scored == true) {
        propertyNode = searchByAttributeName(featureNode, psfPrefix + ":ScoredProperty", nameNs, name);
    }
    else {
        propertyNode = searchByAttributeName(featureNode, psfPrefix + ":Property", nameNs, name);
    }
    if (propertyNode && keepExisting)
        return;
    if (!propertyNode) {
        if (scored && scored == true) {
            propertyNode = document.createNode(NODE_ELEMENT, getNameWithNs(document, psfNs, "ScoredProperty"), psfNs);
        }
        else {
            propertyNode = document.createNode(NODE_ELEMENT, getNameWithNs(document, psfNs, "Property"), psfNs);
        }
        propertyNode.setAttribute("name", getNameWithNs(document, nameNs, name));
        featureNode.appendChild(propertyNode);
    }
    var valueNode = propertyNode.selectSingleNode(psfPrefix + ":Value");
    if (!valueNode) {
        valueNode = document.createNode(NODE_ELEMENT, getNameWithNs(document, psfNs, "Value"), psfNs);
        propertyNode.appendChild(valueNode);
    }
    setAttributeWithNs(valueNode, xsiNs, "type", getNameWithNs(document, typeNs, type));
    valueNode.text = value;
}
function setPropertyValue(propertyNode, value) {
    var valueNode = getPropertyFirstValueNode(propertyNode);
    if (valueNode) {
        var child = valueNode.firstChild;
        if (child) {
            child.nodeValue = value;
            return child;
        }
    }
    return null;
}
function getScoredProperty(node, keywordNamespace, scoredPropertyName) {
    return searchByAttributeName(
        node,
        psfPrefix + ":ScoredProperty",
        keywordNamespace,
        scoredPropertyName);
}
function getScoredPropertyValue(optionNode, name) {
    var scoredPropertyNode = findElementNode(optionNode, psfPrefix + ":ScoredProperty", name, PREFIX_CANONICAL);
    if (!scoredPropertyNode)
        return null;
    var value = getPropertyValue(scoredPropertyNode);
    return value;
}
function getScoredPropertyFullName(featureDef, scoredPropName, optionNumber) {
    if (featureDef.pickMany)
        return (featureDef.parent ? featureDef.parent + "+" : "") + featureDef.name + "/" + optionNumber + "/" + scoredPropName;
    else
        return (featureDef.parent ? featureDef.parent + "+" : "") + featureDef.name + "/" + scoredPropName;
}
function getScoredPropsArrayName(featureDef, optionNumber) {
    return (featureDef.parent ? featureDef.parent + "+" : "") + featureDef.name + (featureDef.pickMany ? "/" + optionNumber : "") + "/sprops";
}
function getScoredPropRefName(scoredPropFullName) {
    return scoredPropFullName + "/ref";
}
function getScoredPropertyParamRefName(optionNode, name) {
    var scoredPropertyNode = findElementNode(optionNode, psfPrefix + ":ScoredProperty", name, PREFIX_CANONICAL);
    if (!scoredPropertyNode)
        return null;
    var paramRefNode = scoredPropertyNode.selectSingleNode(psfPrefix + ":ParameterRef");
    if (!paramRefNode)
        return null;
    var paramname = getElementName(paramRefNode, PREFIX_CANONICAL);;
    return paramname;
}
function insertQNameScoredProperty(optionNode, name, value) {
    var propertyNode = addChildElement(optionNode, psfNs, "ScoredProperty", name);
    addValue(propertyNode, value, "xsd:QName");
    return propertyNode;
}

//xml element function
function getChildElementsMap(parentNode, tagName) {
    var parentElement = parentNode.documentElement ? parentNode.documentElement : parentNode;
    var map = {};
    var node, name, prevNode, isNodeNested, isPrevNodeNested;
    var nodes = parentElement.selectNodes(tagName);
    for (var i = 0; i < nodes.length; ++i) {
        node = nodes.item(i);
        name = getElementName(node, PREFIX_REAL);
        prevNode = map[name];
        if (prevNode) { // duplicate feature detected
            isNodeNested = node.parentNode != parentElement;
            isPrevNodeNested = prevNode.parentNode != parentElement;
            if (!isNodeNested && isPrevNodeNested) // prefer nested feature
                node = prevNode;
        }
        map[name] = node;
    }
    return map;
}
function getAllElementsMap(parentNode, tagName) {
    var documentRoot = parentNode.ownerDocument ? parentNode.ownerDocument.documentElement : parentNode.documentElement;
    var map = {};
    var node, name, prevNode, isNodeNested, isPrevNodeNested;
    var nodes = documentRoot.selectNodes(tagName);
    for (var i = 0; i < nodes.length; ++i) {
        node = nodes.item(i);
        name = getElementName(node, PREFIX_CANONICAL);
        prevNode = map[name];
        if (prevNode) { // duplicate feature detected
            isNodeNested = node.parentNode != documentRoot;
            isPrevNodeNested = prevNode.parentNode != documentRoot;
            if (!isNodeNested && isPrevNodeNested) // prefer nested feature
                node = prevNode;
        }
        map[name] = node;
    }
    return map;
}
function findElementNode(parentNode, tag, elementName, prefixType) {
    var name = parseNameWithNs(parentNode, elementName, prefixType);
    if (!name.name || !name.ns)
        return null;
    var node = searchByAttributeName(parentNode, tag, name.ns, name.name);
    return node;
}
function getElementName(optionNode, prefixType) {
    var realName = optionNode.getAttribute("name");
    if (!realName)
        return null;
    if (prefixType == PREFIX_REAL)
        return realName;
    var name = parseNameWithNs(optionNode, realName, PREFIX_REAL);
    if (!name.name || !name.ns)
        return null;
    var optionName = getNameWithNs(optionNode, name.ns, name.name, prefixType);
    return optionName;
}
function addChildElement(parentNode, tagNs, tagName, nameCanonical) {
    var document = parentNode.ownerDocument;
    var child = nameCanonical ?
        findElementNode(parentNode, getNameWithNs(document, tagNs, tagName, PREFIX_CANONICAL), nameCanonical, PREFIX_CANONICAL) : null;
    if (!child) {
        child = createChildElement(parentNode, tagNs, tagName, nameCanonical);
    }
    return child;
}
function createChildElement(parentNode, tagNs, tagName, nameCanonical) {
    var document = parentNode.ownerDocument;
    var child = document.createNode(NODE_ELEMENT, getNameWithNs(document, tagNs, tagName), tagNs);
    if (nameCanonical) {
        child.setAttribute("name", toRealNameWithNs(document, nameCanonical));
    }
    parentNode.appendChild(child);
    return child;
}
function removeElement(elementNode) {
    if (elementNode.parentNode) {
        elementNode.parentNode.removeChild(elementNode);
    }
}
function removeChildElements(elementNode, name) {
    var child;
    var childElements = elementNode.selectNodes(name || "*");
    for (var i = 0; i < childElements.length; ++i) {
        child = childElements.item(i);
        elementNode.removeChild(child);
    }
}
function isElementEmpty(elementNode) {
    var childElements = elementNode.selectNodes("*");
    return childElements.length == 0;
}

// Xml node function
function setSelectionNamespace(xmlNode, prefix, namespace) {
    xmlNode.setProperty(
        "SelectionNamespaces",
        "xmlns:"
        + prefix
        + "='"
        + namespace
        + "'"
    );
}
function searchByAttributeName(node, tagName, keywordNamespace, nameAttribute) {
    if (!node ||
        !tagName ||
        !keywordNamespace ||
        !nameAttribute) {
        return null;
    }
    var xPathQuery = "descendant::"
        + tagName
        + "[substring-after(@name,':')='"
        + nameAttribute
        + "']"
        + "[name(namespace::*[.='"
        + keywordNamespace
        + "'])=substring-before(@name,':')]"
        ;
    return node.selectSingleNode(xPathQuery);
}
function getPrefixForNamespace(node, namespace) {
    if (!node) {
        return null;
    }
    // navigate to the root element of the document.
    var rootNode = node.documentElement;
    // Query to retrieve the list of attribute nodes for the current node
    // that matches the namespace in the 'namespace' variable.
    var xPathQuery = "namespace::node()[.='"
        + namespace
        + "']";
    var namespaceNode = rootNode.selectSingleNode(xPathQuery);
    if (!namespaceNode)
        return null;
    return namespaceNode.baseName;
}
function getNamespaceForPrefix(node, prefix) {
    if (!node) {
        return null;
    }
    // navigate to the root element of the document.
    var rootNode = node.ownerDocument ? node.ownerDocument.documentElement : node.documentElement;
    // Query to retrieve the list of attribute nodes for the current node
    // that matches the namespace in the 'namespace' variable.
    var xPathQuery = "namespace::node()[name(.)='"
        + prefix
        + "']";
    var namespaceNode = rootNode.selectSingleNode(xPathQuery);
    if (!namespaceNode)
        return null;
    return namespaceNode.value;
}

//xml namespace
function toRealNameWithNs(node, nameWithNs) {
    var parsedName = parseNameWithNs(null, nameWithNs, PREFIX_CANONICAL);
    var realNameWithNs = getNameWithNs(node, parsedName.ns, parsedName.name, PREFIX_REAL);
    return realNameWithNs;
}
function getNameWithNs(node, ns, name, prefixType) {
    var prefix = prefixType != PREFIX_CANONICAL ? getPrefixForNamespace(node, ns) :
        prefixes[ns];
    if (!prefix)
        return null;
    return prefix + ":" + name;
}
function parseNameWithNs(node, nameWithNs, prefixType) {
    var parts = nameWithNs.split(':', 2);
    var prefix = parts.length > 1 ? parts[0] : null;
    var localName = parts.length > 1 ? parts[1] : parts[0];
    var ns = prefix == null ? null :
        prefixType == PREFIX_REAL ? getNamespaceForPrefix(node, prefix) :
            namespaces[prefix];
    return { ns: ns, name: localName };
}
function setAttributeWithNs(element, attributeNs, attributeName, value) {
    var document = element.ownerDocument;
    var attributeNode = document.createNode(NODE_ATTRIBUTE, getNameWithNs(document, xsiNs, "type"), xsiNs);
    attributeNode.value = value;
    element.setAttributeNode(attributeNode);
}

//property bag function
function safeSetUPBString(scriptContext, key, value) {
    var retval = false;
    try {
        retval = safeSetString(scriptContext.UserProperties, key, value);
    }
    catch (e) {
        return false;
    }
    return retval;
}
function safeSetString(propertyBag, key, value) {
    try {
        propertyBag.SetString(key, value);
        return true;
    }
    catch (e) {
        return false;
    }
}
function safeGetString(propertyBag, name) {
    try {
        var str = propertyBag.GetString(name);
        return str;
    }
    catch (e) {
        return null;
    }
}
function safeGetInt32(propertyBag, name) {
    try {
        var val = propertyBag.GetInt32(name);
        return val;
    }
    catch (e) {
        return null;
    }
}
function safeGetByteArrays(propertyBag, name) {
    try {
        var bytearrays = propertyBag.GetBytes(name);
        return bytearrays;
    }
    catch (e) {
        return null;
    }
}
function loadXMLFromString(printTicket, str) {
    try {
        if (str != null) {
            var ticketXmlNode = printTicket.XmlNode;
            var strXML = ticketXmlNode.cloneNode(false);
            strXML.loadXML(str);
            if (strXML.documentElement != null) {
                return strXML;
            }
        }
        else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
    return null;
}
function safeGetUPBString(scriptContext, upbName) {
    var stringValue;
    try {
        stringValue = safeGetString(scriptContext.UserProperties, upbName);
    }
    catch (e) {
        stringValue = null;
    }
    return stringValue;
}
function safeGetUPBInt32(scriptContext, upbName) {
    var Value;
    try {
        Value = safeGetInt32(scriptContext.UserProperties, upbName);
    }
    catch (e) {
        Value = null;
    }
    return Value;
}
function getStringFromUPBorDevmode(scriptContext, devModeProperties, upbName, devmodeName) {
    var stringValue = "";

    if (upbName == null || upbName == "")
        return;

    // if it existed in user property bag, use it first.
    try {
        stringValue = safeGetString(scriptContext.UserProperties, upbName);
    }
    catch (e) {
        stringValue = null;
    }
    if (stringValue == null) {
        try {
            stringValue = devModeProperties.GetString(devmodeName ? devmodeName : upbName);
        }
        catch (e) {
            stringValue = "";
        }
    }
    return stringValue;
}
function getStringFromUPBorDevmodeBool(scriptContext, devModeProperties, upbName, devmodeName) {
    var stringValue = "";

    if (upbName == null || upbName == "")
        return;

    // if it existed in user property bag, use it first.
    try {
        stringValue = safeGetString(scriptContext.UserProperties, upbName);
    }
    catch (e) {
        stringValue = null;
    }
    if (stringValue == null || stringValue == "") {
        try {
            var stringBoolean = devModeProperties.GetBool(devmodeName ? devmodeName : upbName);
            if (stringBoolean == 1) {
                stringValue = "True";
            }
            else {
                stringValue = "False";
            }
        }
        catch (e) {
            stringValue = "False";
        }
    }
    return stringValue;
}
function getStringFromDevmode(devModeProperties, devmodeName) {
    var stringValue = "";

    if (devmodeName == null || devmodeName == "")
        return;

    try {
        stringValue = devModeProperties.GetString(devmodeName ? devmodeName : upbName);
    }
    catch (e) {
        stringValue = null;
    }

    return stringValue;
}

//utility function
function parseNameValuePairsString(nameValuePairsString) {
    var values = {};
    if (nameValuePairsString) {
        var pair, parts, name, value;
        var nameValuePairs = nameValuePairsString.split(";");
        for (var i = 0; i < nameValuePairs.length; ++i) {
            pair = nameValuePairs[i];
            parts = split2(pair, "=");
            name = parts[0].trim();
            if (!name)
                continue;
            value = parts.length > 1 ? parts[1] : null;
            if (value) {
                if (value == "%00") {
                    value = "";
                } else {
                    value = value.replace(/%3B/g, ";");
                    value = value.replace(/%25/g, "%");
                }
            }
            values[name] = value;
        }
    }
    return values;
}
function parseCustomPaperValueStringWithCommaDelimeter(valuesString) {
    var customPaper = {};
    if (valuesString) {
        var valueList = valuesString.split(",");
        if (valueList.length == 3) {
            var dispalyname = valueList[0];
            if (dispalyname) {
                dispalyname = dispalyname.replace(/%2C/g, ",");
                dispalyname = dispalyname.replace(/%25/g, "%");
            }
            customPaper.dispname = dispalyname;
            var widthStr = valueList[1];
            if (widthStr) {
                customPaper.width = parseInt(widthStr);
            }
            var heightStr = valueList[2];
            if (heightStr) {
                customPaper.height = parseInt(heightStr);
            }
        }
    }
    return customPaper;
}
function makeNameValuePairsString(values, separator) {
    separator = separator || ";\r\n";
    var valuePairs = [];
    var value;
    for (var name in values) {
        value = values[name];
        if (value) {
            value = value.replace(/%/g, "%25");
            value = value.replace(/;/g, "%3B");
        } else {
            value = "%00";  // specify NULL value.
        }

        valuePairs.push(name + "=" + value);
    }
    var str = valuePairs.join(separator);
    return str;
}
function findInArray(array, predicate) {
    if (!array) return;
    var item;
    for (var i = 0; i < array.length; ++i) {
        item = array[i];
        if (!item)
            continue;
        if (predicate(item))
            return item;
    }
}
function includedInArray(array, item) {
    if (!array) return false;
    for (var i = 0; i < array.length; ++i) {
        if (item == array[i]) {
            return true;
        }
    }
    return false;
}
function forEach(array, action) {
    if (!array) return;
    var item;
    for (var i = 0; i < array.length; ++i) {
        item = array[i];
        if (!item)
            continue;
        var result = action(item);
        if (result === false)
            break;
    }
}
function split2(str, separator) {
    var index = str.indexOf(separator);
    if (index >= 0) {
        return [str.substr(0, index), str.substr(index + 1)];
    }
    else {
        return [str];
    }
}
function CreateGuid() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}
function object_equals(x, y) {
    if (x === y) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (x.constructor !== y.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in x) {
        if (!x.hasOwnProperty(p)) continue;
        // other properties were tested using x.constructor === y.constructor

        if (!y.hasOwnProperty(p)) return false;
        // allows to compare x[ p ] and y[ p ] when set to undefined

        if (x[p] === y[p]) continue;
        // if they have the same strict value or identity then they are equal

        if (typeof (x[p]) !== "object") return false;
        // Numbers, Strings, Functions, Booleans must be strictly equal

        if (!object_equals(x[p], y[p])) return false;
        // Objects and Arrays must be tested recursively
    }

    for (p in y)
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
            return false;
    // allows x[ p ] to be set to undefined

    return true;
}