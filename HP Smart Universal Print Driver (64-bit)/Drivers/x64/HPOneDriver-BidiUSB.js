// Version 3.26

getSchemas = function (scriptContext, printerStream, schemaRequests, printerBidiSchemaResponses) {
    var pageCache = new PageCache(scriptContext, printerStream);
    var requestProcessor = new RequestProcessor(printerBidiSchemaResponses, pageCache, scriptContext);

    var i = 0;
    for (i = 0; i < schemaRequests.length; i++) {
        var args = schemaRequests[i].split(';');

        if (args.length >= 3) {
            var queryStr = args[0];
            var procFunc = args[1];
            var subFunc = args[2];
            var params = [];
            if (args.length >= 4) {
                params = args.slice(3);
            }

            if (requestProcessor.ValidGetFunctions.indexOf(procFunc) != -1) {
                requestProcessor[procFunc](queryStr, subFunc, params);
            }
        }
    }
    return 0;
};

setSchema = function (scriptContext, printerStream, printerBidiSchemaElement) {
    //debugger;
    var pageCache = new PageCache(scriptContext, printerStream);
    var value = printerBidiSchemaElement.value;
    try {
        if (printerBidiSchemaElement.type === "BIDI_STRING") {
            value = value.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }
        var response = pageCache.RawRequest(value);
        printerBidiSchemaElement.value = response;
    } catch (err) {
        pageCache.log = "setSchema exception caught: " + err;
    }
    return 0;
};

getStatus = function (scriptContext, printerStream, printerBidiSchemaResponses) {
    return 2;
};

requestStatus = function (scriptContext, printerStream, printerBidiSchemaResponses) {
    var retVal = 2;
    var pageCache = new PageCache(scriptContext, printerStream);
    var requestProcessor = new RequestProcessor(printerBidiSchemaResponses, pageCache, scriptContext);
    var statusMsg = requestProcessor.GetStatusString("\Printer.Status.Summary:StateReason", "GetSimplePrinterAttributes", "printer-state-reasons");

    if ((statusMsg != null) && (statusMsg != "")) {
        if (statusMsg.toUpperCase() == "door-open-error".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'door-open-error');
		else if (statusMsg.toUpperCase() == "door-open".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'door-open');
		else if (statusMsg.toUpperCase() == "media-needed".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'media-needed');
		else if (statusMsg.toUpperCase() == "toner-empty-warning".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-empty-warning');
		else if (statusMsg.toUpperCase() == "toner-low".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-low');
		else if (statusMsg.toUpperCase() == "marker-supply-low".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'marker-supply-low');
		else if (statusMsg.toUpperCase() == "marker-supply-low-warning".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'marker-supply-low-warning');
		else if (statusMsg.toUpperCase() == "marker-supply-low-report".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'marker-supply-low-report');
		else if (statusMsg.toUpperCase() == "toner-empty".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-empty');
		else if (statusMsg.toUpperCase() == "marker-supply-empty".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'marker-supply-empty');
		else if (statusMsg.toUpperCase() == "marker-supply-empty-error".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'marker-supply-empty-error');
		else if (statusMsg.toUpperCase() == "marker-supply-empty-warning".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'marker-supply-empty-warning');
        else if (statusMsg.toUpperCase() == "media-empty-error".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'media-empty-error');
		else if (statusMsg.toUpperCase() == "media-empty-report".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'media-empty-report');
		else if (statusMsg.toUpperCase() == "media-empty".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'media-empty');
		else if (statusMsg.toUpperCase() == "toner-empty-report".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-empty-report');
        else if (statusMsg.toUpperCase() == "toner-empty-error".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-empty-error');
        else if ((statusMsg.toUpperCase() == "media-jam-error".toUpperCase()))
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'media-jam-error');
		else if ((statusMsg.toUpperCase() == "media-jam".toUpperCase()))
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'media-jam');
        else if (statusMsg.toUpperCase() == "output-area-full-error".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'output-area-full-error');
		else if (statusMsg.toUpperCase() == "output-area-full".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'output-area-full');
		else if (statusMsg.toUpperCase() == "output-area-full-warning".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'output-area-full-warning');
        else if (statusMsg.toUpperCase() == "toner-empty-warning".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-empty-warning');
        else if (statusMsg.toUpperCase() == "toner-low-report".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'toner-low-report');
        else if (statusMsg.toUpperCase() == "paused".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'paused');
		else if (statusMsg.toUpperCase() == "other-error".toUpperCase())
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'other-error');
        else
            printerBidiSchemaResponses.AddString('\\Printer.Status.Summary:StateReason', 'None');
        retVal = 0;
    }


    return retVal;
};

RequestProcessor = function (printerBidiSchemaResponses, pageCache, scriptContext) {
    this.responses = printerBidiSchemaResponses;
    this.pageCache = pageCache;
    this.Context = scriptContext;
    this.ValidGetFunctions = "GetSimplePrinterAttributes,GetOctetStringValues2,GetOctetStringValues,GetTrayAttributes,GetAttributeString,GetAttributeValue,MultiStrCompBool,MultiStrCompString,StrCompBool,GetStatusString,SearchAccessoryBins;GetAttributeFromGroup;GetAttributeFromGroupBool;GetStringFromEnumerations;GetCollectionAttributes";
    this.ValidSetFunctions = "SetRequest";
};

PageCache = function (scriptContext, printerStream) {
    this.Context = scriptContext;
    this.printerStream = printerStream;
    this.requestID = [];
    this.ContentArray = [];
    this.readContentHeader = "";
    this.readContent = [];
    this.IsOutOfSync = false;
    //this.IsException = false;
    // lastHeader is used in error reporting when we fail a request.
    this.syncDone = false;
    this.lastHeader = null;
    this.attrs = [];            // IPP Attributes are parsed and stored in attrs.
    this.hvd_attrs = [];
    this.ishvd = false;
};

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

/* IPPDefinitions */

IPPUtils = function () {
    this.IPP_TAG_END = 0x03;
    this.IPP_TAG_UNSUPPORTED_VALUE = 0x10;
    this.IPP_SUCCESS = 0x00;
    this.IPP_ERROR = -1
    this.IPP_TAG_INTEGER = 0x21;
    this.IPP_TAG_ENUM = 0x23;
    this.IPP_TAG_BOOLEAN = 0x22;
    this.IPP_TAG_TEXT = 0x41;
    this.IPP_TAG_NAME = 0x42;
    this.IPP_TAG_KEYWORD = 0x44;
    this.IPP_TAG_STRING = 0x30;
    this.IPP_TAG_URI = 0x45;
    this.IPP_TAG_URISCHEME = 0x46;
    this.IPP_TAG_CHARSET = 0x47;
    this.IPP_TAG_LANGUAGE = 0x48;
    this.IPP_TAG_MIMETYPE = 0x49;
    this.IPP_TAG_DATE = 0x31;
    this.IPP_TAG_RESOLUTION = 0x32;
    this.IPP_TAG_RANGE = 0x33;
    this.IPP_TAG_TEXTLANG = 0x35;
    this.IPP_TAG_NAMELANG = 0x36;
    this.IPP_TAG_BEGIN_COLLECTION = 0x34;
    this.IPP_TAG_END_COLLECTION = 0x37;
    this.IPP_TAG_MEMBERNAME = 0x4A;
    this.contentReversed = false;
};

/* pop from array for faster element retrieval */

IPPUtils.prototype.GetElement = function (content) {
    if (!this.contentReversed) {
        content = content.reverse();
        this.contentReversed = true;
    }
    var element = null;
    if (content.length > 0) {
        element = content.pop();
    }
    if (content.length == 0) {
        this.contentReversed = false;
    }
    return (element);
}

IPPUtils.prototype.GetByte = function (content) {
    if ((content === undefined) || (content === null)) 
    {
	    return null;
    }
    var len = content.length;
    if (len === 0) return null;

    /* Don't use shift() */

    /*if (len === 1) return content.pop();
    return content.shift(); */

    /* shift() is costly. makes the array to re-arrange everytime when it gets called as it removes from the beginning
       ok for best/average case data set (array elements). worst case data set is CPU intensive.
       so handling the element retrieval through GetElement() instead of shift().
       The idea here is to use pop() in a reversed array. */

    return this.GetElement(content);
};

IPPUtils.prototype.GetInt16 = function (content) {
    return this.GetByte(content) << 8 | this.GetByte(content);
};

IPPUtils.prototype.GetInt32 = function (content) {
    return this.GetInt16(content) << 16 | this.GetInt16(content);
};
IPPUtils.prototype.GetBytes = function (content, length) {
    var result = [];
    if ((content === undefined) || (content === null)) 
		return result;
		
    if (content.length >= length) {
        for (var i = 0; i < length; i++) {
            result.push(this.GetByte(content));
        }
    }
    return result;
};

IPPUtils.prototype.GetString = function (content, length) {
    var result = [];
	if ((content === undefined) || (content === null)) 
		return result;
    if (content.length >= length) {
        for (var i = 0; i < length; i++) {
            result.push(String.fromCharCode(this.GetByte(content)));
        }
    }
    return result.join("");
};

IPPUtils.prototype.GetValue = function (content, length, tag) {
    var IPPTag = new IPPUtils();
	if ((content === undefined) || (content === null)) 
		return NULL;
		
    if (content.length >= length) {
        // Integer and Enum
        if ((tag === IPPTag.IPP_TAG_INTEGER) || (tag === IPPTag.IPP_TAG_ENUM)) return this.GetInt32(content);
        // Boolean
        if (tag === IPPTag.IPP_TAG_BOOLEAN) {
            if (this.GetByte(content))
                return true;
            else
                return false;
        }
        // String, Text, Keyword, Uri, Urischeme, charset,
        // language, memberName and Mimetype
        if ((tag === IPPTag.IPP_TAG_STRING) || (tag === IPPTag.IPP_TAG_TEXT) || (tag === IPPTag.IPP_TAG_NAME) || (tag === IPPTag.IPP_TAG_KEYWORD) || (tag === IPPTag.IPP_TAG_URI) || (tag === IPPTag.IPP_TAG_URISCHEME) || (tag === IPPTag.IPP_TAG_CHARSET) || (tag === IPPTag.IPP_TAG_LANGUAGE) || (tag === IPPTag.IPP_TAG_MEMBERNAME) || (tag === IPPTag.IPP_TAG_MIMETYPE)) {
            return this.GetString(content, length);
        }
        // Range
        if (tag === IPPTag.IPP_TAG_RANGE) {
            var lower = this.GetInt32(content);
            var upper = this.GetInt32(content);
            return lower + "-" + upper;
        }

        // Resolution
        if (tag === IPPTag.IPP_TAG_RESOLUTION) {
            var xres = this.GetInt32(content);
            var yres = this.GetInt32(content);
            var unit = this.GetByte(content);
            return xres + "x" + yres + " pixels";
        }
    }
};

var ippUtils = new IPPUtils();




PageCache.prototype.GetContent = function (targetAttrName) {
    var content = null;
    if ((content === undefined) || (content === null)) {
        content = this.FetchIPPContent(targetAttrName);
    }
    return content;
};



PageCache.prototype.VerifyChannel = function () {
    if (this.ChannelVerified === undefined) {
        //var pjlcommand = [0x40, 0x50, 0x4A, 0x4C, 0x20, 0x43, 0x4F, 0x4D, 0x4D, 0x45, 0x4E, 0x54, 0x20, 0x22, 0x22, 0x0D, 0x0A, 0x0D, 0x0A];
        var pjlcommand = [0x1B, 0x25, 0x2D, 0x31, 0x32, 0x33, 0x34, 0x35, 0x58, 0x40, 0x50, 0x4A, 0x4C, 0x20, 0x43, 0x4F, 0x4D, 0x4D, 0x45, 0x4E, 0x54, 0x20, 0x22, 0x22, 0x0D, 0x0A, 0x1B, 0x25, 0x2D, 0x31, 0x32, 0x33, 0x34, 0x35, 0x58];
        var writtenStrLen = this.printerStream.Write(pjlcommand);

        if (this.IsWebServerConnected(500)) {
            this.ChannelVerified = true;

        } else {
            this.ChannelVerified = false;
        }
    }
    return this.ChannelVerified;
};

// IPPRequest content is fixed except for ContentLength and AttributeName which is queried for.
// ContentLength value changes based on the length of the AttributeName queried.

PageCache.prototype.FetchIPPContent = function (targetAttrName) {    
	
	if (null != targetAttrName) {
		if (this.VerifyChannel()) 
		{
			var HTTPRequestHdr1 = [0x50, 0x4F, 0x53, 0x54, 0x20, 0x2F, 0x69, 0x70, 0x70, 0x2F, 0x70, 0x72, 0x69, 0x6E, 0x74, 0x65, 0x72, 0x20, 0x48, 0x54, 0x54, 0x50, 0x2F, 0x31, 0x2E, 0x31, 0x0D, 0x0A, 0x43, 0x6F, 0x6E, 0x74, 0x65, 0x6E, 0x74, 0x2D, 0x4C, 0x65, 0x6E, 0x67, 0x74, 0x68, 0x3A, 0x20];
			var HTTPRequestHdr2 = [0x0D, 0x0A, 0x43, 0x6F, 0x6E, 0x74, 0x65, 0x6E, 0x74, 0x2D, 0x54, 0x79, 0x70, 0x65, 0x3A, 0x20, 0x61, 0x70, 0x70, 0x6C, 0x69, 0x63, 0x61, 0x74, 0x69, 0x6F, 0x6E, 0x2F, 0x69, 0x70, 0x70, 0x0D, 0x0A, 0x48, 0x4F, 0x53, 0x54, 0x3A, 0x20, 0x6C, 0x6F, 0x63, 0x61, 0x6C, 0x68, 0x6F, 0x73, 0x74, 0x0D, 0x0A, 0x0D, 0x0A];
			/*IIP Header: 
dGattributes-charsetutf-8Hattributes-natural-languageenE
printer-uriipp://localhost:80/ipp/printDrequested-attributes
printer-nameD*/
			var ippRequest1 = [0x02, 0x00, 0x00, 0x0B, 0x00, 0x00, 0x00, 0x64, 0x01, 0x47, 0x00, 0x12, 0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x2D, 0x63, 0x68, 0x61, 0x72, 0x73, 0x65, 0x74, 0x00, 0x05, 0x75, 0x74, 0x66, 0x2D, 0x38, 0x48, 0x00, 0x1B, 0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x2D, 0x6E, 0x61, 0x74, 0x75, 0x72, 0x61, 0x6C, 0x2D, 0x6C, 0x61, 0x6E, 0x67, 0x75, 0x61, 0x67, 0x65, 0x00, 0x02, 0x65, 0x6E, 0x45, 0x00, 0x0B, 0x70, 0x72, 0x69, 0x6E, 0x74, 0x65, 0x72, 0x2D, 0x75, 0x72, 0x69, 0x00];
			var ippRequest2 = [0x44, 0x00, 0x14, 0x72, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x65, 0x64, 0x2D, 0x61, 0x74, 0x74, 0x72, 0x69, 0x62, 0x75, 0x74, 0x65, 0x73, 0x00, 0x0C, 0x70, 0x72, 0x69, 0x6E, 0x74, 0x65, 0x72, 0x2D, 0x6E, 0x61, 0x6D, 0x65, 0x44, 0x00, 0x00];
			var attrLen = targetAttrName.length;

			var randomID = this.getRandomInt(1000, 9999);
			var randomID_Str = this.BytesFromString(randomID.toString());

			ippRequest1[4] = randomID_Str[0];
			ippRequest1[5] = randomID_Str[1];
			ippRequest1[6] = randomID_Str[2];
			ippRequest1[7] = randomID_Str[3];
			this.requestID[0] = randomID_Str[0];
			this.requestID[1] = randomID_Str[1];
			this.requestID[2] = randomID_Str[2];
			this.requestID[3] = randomID_Str[3];



			var byteattrlen = new Array();
			byteattrlen[0] = attrLen >> 8;
			byteattrlen[1] = attrLen;
			var byteAttrName = this.BytesFromString(targetAttrName);
			var endTag = 0x03;
			
			/*Append Printer URI length followed by Absolute Printer URI*/
			var printerUriLen = 0x1C;
			var printerUriBytes = this.BytesFromString("ipp://localhost:80/ipp/print");	
			ippRequest = ippRequest1.concat(printerUriLen, printerUriBytes);
			ippRequest = ippRequest.concat(ippRequest2);
			ippRequest = ippRequest.concat(byteattrlen, byteAttrName);
			ippRequest = ippRequest.concat(endTag);
			var contentLength = ippRequest.length;
			var contentLengthBytes = this.BytesFromString(contentLength.toString());                                                  // Length of the IPP Request.
			var HTTPRequestHdr = HTTPRequestHdr1.concat(contentLengthBytes, HTTPRequestHdr2);
			var request = HTTPRequestHdr.concat(ippRequest);
			return this.RawRequest(request);
		}
	}
    return null;
};

PageCache.prototype.IsWebServerConnected = function (timeout) {

    var date = new Date();
    var curDate = null;
    var receivedData = false;
    var badRequest = new RegExp("HTTP", "gmi");

    do {
        curDate = new Date();
        var tempBytes = this.printerStream.Read(512);
        if ((tempBytes != undefined) && (tempBytes.length > 0) && (badRequest.test(this.StringFromBytes(tempBytes)))) 
        {
            receivedData = true;
        }
    } while ((receivedData == false) && (curDate - date < timeout));

    this.FlushChannel(100);
    return receivedData;
};

PageCache.prototype.FlushChannel = function (timeout) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
        var tempBytes = this.printerStream.Read(512);
    } while (((tempBytes != null) && (tempBytes.length > 0)) && (curDate - date < timeout));
    this.readContent = "";
};

PageCache.prototype.RawRequest = function (requestStr) {

    try {
        this.printerStream.Write(requestStr);
    }
    catch (err) {
        return;
    }
   // debugger;
    var response = this.GetHttpResponse();
    return response;
};

PageCache.prototype.GetHttpResponse = function () {
    var httpHeader;

    do {
        httpHeader = new HttpHeader(this);
        if (null != httpHeader) {
            var ippResponse = "";
            if (httpHeader.ContentLength > 0) {
                ippResponse = this.ReadResponse(httpHeader.ContentLength);
            } else if (httpHeader.IsChunked) {
                ippResponse = this.ReadChunkedResponse();
            }

            if (null != ippResponse)
                return ippResponse;
        }
    } while (this.IsOutOfSync);

    return null;
};


PageCache.prototype.StringFromBytes = function (bytes) {
    if ((bytes === undefined) || (bytes === null)) {
        return null;
    }
    var length = bytes.length;
    var result = "";
    for (var i = 0; i < length; i++) {
        if (bytes[i] != undefined) {
            result += String.fromCharCode(bytes[i]);
        }
    }
    return result;
};


PageCache.prototype.BytesFromString = function (content) {
    if ((content === undefined) || (content === null ) ) {
        return null;
    }
    var bytes = new Array(content.length);

    for (var i = 0; i < content.length; i++) {
        bytes[i] = content.charCodeAt(i);
    }
    return bytes;
};


PageCache.prototype.ReadBlock = function (requestLength) {
    var totalLength = 0;
    var zeroCount = 50;

    do {
        var reqLen = Math.min(requestLength, 1024);
        try {
            var tempBytes = this.printerStream.Read(1024);
        } catch (err) {
            return -1;
        }
        if (tempBytes.length > 0) {
            var actLen = tempBytes.length;
            this.readContent = this.readContent.concat(tempBytes);
            totalLength += actLen;
            requestLength -= actLen;
            zeroCount = 50;
        }
        else {
            sleep(100);
            zeroCount--;
        }
    } while ((requestLength > 0) && (zeroCount > 0));

    return totalLength;
};


// HeaderReadBlock() is used to read HTTP header content.

PageCache.prototype.HeaderReadBlock = function (requestLength) {

    var zeroCount = 50;
    var reqLen = Math.min(requestLength, 1024);
    do {
        
        try {
            var tempBytes = this.printerStream.Read(reqLen);
        } catch (err) {
            return -1;
        }

        if (tempBytes.length > 0) {
            this.readContentHeader = this.StringFromBytes(tempBytes);
            var i = this.readContentHeader.indexOf("\r\n\r\n");


            //Check if tempBytes contains only the Http header, or if there is some more
            //data, possibly the next chunk details.
            // i + 4 because index of returns the first position of \r\n\r\n;
            if ((i > 0) && (i + 4 < (tempBytes.length))) {
                var temp = this.readContentHeader.substr(i + 4);
                this.readContent = this.BytesFromString(temp);
            }
            else {
                //Nothing to do as readContentHeader contains the full HTTP header.
                //break out of loop as we have nothing to do.
                break;
            } //if ((i > 0) && (i + 4 < (tempBytes.length))) 

            zeroCount = 50;
        }
        else {
            	sleep(100);
		zeroCount--;
        }


    } while (zeroCount > 0 && tempBytes.length == 0);


    return tempBytes.length;
};

// ChunkLengthReadBlock() is used to read length of a chunk.

PageCache.prototype.ChunkLengthReadBlock = function (requestLength) {
    var zeroCount = 50;
    var flagLength = 0;
    var flagMatch = 0;
    var reqLen = Math.min(requestLength, 1024);
    do {
        try {
            var tempBytes = this.printerStream.Read(1024);
        } catch (err) {
            return -1;
        }
        if (tempBytes.length > 0) {
            var endChunk = [0x30, 0x0D, 0x0A, 0x0D, 0x0A];      // Whenever we encounter this pattern, it indicates end of chunked response & we should not expect any more chunks.
            if (endChunk.length == tempBytes.length) {
                flagLength = 1;
                for (var i in endChunk) {
                    if (endChunk[i] != tempBytes[i])
                        flagMatch = 1;
                }
            }

            if (flagLength == 1 && flagMatch == 0)
                return -2;                                  // return if endChunk pattern is seen

            this.readContentHeader = this.StringFromBytes(tempBytes);
            zeroCount = 50;
        }
        else {
            sleep(100);
            zeroCount--;
        }
    } while (zeroCount > 0 && tempBytes.length == 0);



    return tempBytes.length;
};


PageCache.prototype.ReadResponse = function (len) {
    var loopLimit = 2;
    if (len != NaN) {
        do {
            var remLen = len - this.readContent.length;
            var actLen = this.ReadBlock(remLen);
            if (len == this.readContent.length) {
                var temp = this.readContent;
                this.readContent = "";
                return temp;
            }
        } while (loopLimit-- > 0);
    }
    return null;
};


PageCache.prototype.ReadChunkedResponse = function () {
    var results = [];
    var temp = "";

    do {
        temp = this.ReadChunk();
        if (null != temp) {
            results = results.concat(temp);
            this.IsException = false;
        }
      //we should loop until we get 30 0D 0A 0D 0A . We will get null when we encounter this
    } while (temp != null);
   
    // We have done with sync test for this particular query. Set it back to false.
    this.syncDone = false;

    if(this.IsOutOfSync)
        return null;

    return results;
};


PageCache.prototype.ReadChunkHeader = function () {
    var i = this.readContentHeader.indexOf("\r\n");
    if (i > 0) {
        var len = parseInt(this.readContentHeader, 16);

        this.readContent = this.BytesFromString(this.readContentHeader.substr(i + 2));
        return len;
    }
    return -1;
};

PageCache.prototype.CompareRequestID = function () {

    // Need not compare the Request IDs for the multiple packets. Doing once would suffice

    if (this.syncDone == false) {
        var responseID = this.readContent.slice(4, 8);
        if ((responseID[0] == this.requestID[0]) && (responseID[1] == this.requestID[1]) && (responseID[2] == this.requestID[2]) && (responseID[3] == this.requestID[3])) {
            this.syncDone = true;
            return true;
        }
        else {
            return false;
        }
    }
    else
        return true;
};


PageCache.prototype.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


PageCache.prototype.ReadChunk = function () {


    //First look if any chunkdata is present in readContent
    //read from device only if it is absent.
    if (this.readContentHeader === "") {
        //This will contain the data for the chunk.
        var len = this.ChunkLengthReadBlock(10);
    }

    //Need to see if device responds with -2 as chunk data
    // Break if we get end of chunk (chunk size = 0)
    if (len == -2) {
        // this.IsOutOfSync = false;
        return null;
    }                            // end of chunked data..
    chunkLength = this.ReadChunkHeader();

    //removed do while loop since already ReadBlock has loop
    if (chunkLength > 0) {

        //Add length of the chunk specified +2 for /r/n
        var remLen = chunkLength - this.readContent.length + 2;

        var bytesRead = -1;

        if (remLen > 0) {
            bytesRead = this.ReadBlock(remLen);
        }
        //check the value of remLem as well to make sure that we are missing out the condition
        if ((bytesRead === -1) && (this.readContent.length === 0)) {
            this.IsOutOfSync = true;
            return null;
        }

       
            //Check if the packet is in sync.
        if (this.CompareRequestID() != true) {

            this.readContent = [];
            this.readContentHeader = "";
            this.IsOutOfSync = true;
        }
        else {
            this.IsOutOfSync = false;

            if (chunkLength <= this.readContent.length) {
                var temp = this.readContent.slice(0, chunkLength);
                var extraData = this.readContent.slice(chunkLength + 2);
                this.readContentHeader = this.StringFromBytes(extraData);
                return temp;
            }
        }
       
    }
    return null;
};


PageCache.prototype.FlushRead = function () {
    do {
		try
		{
			var tempBytes = this.printerStream.Read(1024);
		}
		catch(err)
		{
			break;//move out of the loop
		}		
    } while ((tempBytes != undefined) && (tempBytes.length > 0));
    
};

HttpHeader = function (pageCache) {
    this.StatusCode = 0;
    this.IsChunked = false;
    this.ContentLength = 0;
    this.Content = "";
    this.pageCache = pageCache;

    try {
        this.ReadHeader(pageCache);
        this.pageCache.lastHeader = this;
    } catch (err) {
    }
};


HttpHeader.prototype.ReadHeader = function () {

    var index = this.HeaderReadUntil("HTTP/1.1");
    if (index > 0) {
        this.pageCache.readContentHeader = this.pageCache.readContentHeader.substring(index);
    }

    if (index >= 0) {
        index = this.HeaderReadUntil("\r\n\r\n");
        if (index >= 0) {
            this.Content = this.pageCache.readContentHeader.substring(0, index + 4);
            this.pageCache.readContentHeader = this.pageCache.readContentHeader.substring(index + 4);

            this.StatusCode = parseInt(this.Content.substring(8));

            if (this.StatusCode === 200) {
                var ContentLengthPattern = /^Content-Length:/gm;
                var ChunkedPattern = /^Transfer-Encoding/gm;

                if (ContentLengthPattern.test(this.Content)) {
                    this.ContentLength = parseInt(this.Content.substring(ContentLengthPattern.lastIndex));
                }
                else if (ChunkedPattern.test(this.Content)) {
                    this.IsChunked = true;
                }
            }
            else {
                //What to do if the device returns a bad request.
                //the js will gracefully return a null. SO nothing to do here.
                //IsChunked will be false and ContentLength will be 0;
                // Reset the page cache

                this.pageCache.readContentHeader = "";
                this.pageCache.readContent = [];
                this.pageCache.IsOutOfSync = false;
                // this.pageCache.attrs = [];
            }
        }
    }
};


HttpHeader.prototype.ReadUntil = function (match) {
    var index = this.pageCache.readContent.indexOf(match);
    if (index >= 0) {
        return index;
    }
    do {
        if (this.pageCache.ReadBlock(1024) <= 0) return -1;
        index = this.pageCache.readContent.indexOf(match);
    } while (index < 0);

    return index;
};

HttpHeader.prototype.HeaderReadUntil = function (match) {
    var index = this.pageCache.readContentHeader.indexOf(match);
    if (index >= 0) {
        return index;
    }
    do {
        if (this.pageCache.HeaderReadBlock(1024) <= 0) return -1;
        index = this.pageCache.readContentHeader.indexOf(match);
    } while (index < 0);

    return index;
};

/* ConversionExists() is used to return custom values defined in BiDi extension xml for a specific response got from device firmware*/

RequestProcessor.prototype.ConversionExists = function (attrValue, queryArray) {

    if (attrValue == null) return null;
    for (var i in queryArray) {
        if (queryArray[i].indexOf('=') > -1) {
            var temp = queryArray[i].split('=');
            if (temp[0] == attrValue)
                return temp[1];
        }
    }
    return attrValue;
};



/*  GetAttributeString() is used to get values of attributes of STRING type.
    
Example usage:
bidiQueryStr : \Printer.Status.Summary:StateReason
func  : GetSimplePrinterAttributes
queryArray   : printer-state-reasons
    
*/

RequestProcessor.prototype.GetAttributeString = function (bidiQueryStr, func, queryArray) {
    var attrValue = "";
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (null != attr)
        attrValue = attr.Values[0];
    attrValue = this.ConversionExists(attrValue, queryArray);
    this.responses.AddString(bidiQueryStr, attrValue);
};

/*  GetAttributeValue() is used to get comma separted values of attributes of STRING type.
    
Example usage:
bidiQueryStr : \Printer.Status.Summary:StateReason
func  : GetSimplePrinterAttributes
queryArray   : printer-state-reasons
    
*/

RequestProcessor.prototype.GetAttributeValue = function (bidiQueryStr, func, queryArray) {
    //debugger;
    var attrValue = "";
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;

    if (null != attr) {
        if (attr.Values.length > 1)
            attrValue = attr.Values.join(",");
        else
            attrValue = attr.Values[0];
    }

    this.responses.AddString(bidiQueryStr, attrValue);
};

RequestProcessor.prototype.GetAttributeFromGroup = function (bidiQueryStr, func, queryArray) {
    var attrValue = "";
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (null != attr)
	{/* index specified in the query */
		var i = queryArray[1];
		if(attr.Values[i] != null)
			attrValue = attr.Values[i];
	/*Removing since attrValue is initalized to "" and trying to append null in AddString causes exception and breaks the script and inturn the bidi*/
	/* 	else
			attrValue = null; */
	}
    this.responses.AddString(bidiQueryStr, attrValue);
};

RequestProcessor.prototype.GetAttributeFromGroupBool = function (bidiQueryStr, func, queryArray) {
    var attrValue = "";
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (null != attr) {/* index specified in the query */
        var i = queryArray[1];
        if (attr.Values[i] != null) /* Check if index value exists */
            attrValue = true;
        else
            attrValue = false;
    }
    this.responses.AddString(bidiQueryStr, attrValue);
};

RequestProcessor.prototype.GetStatusString = function (bidiQueryStr, func, queryArray) {
    var attrValue = "";
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (null != attr)
        attrValue = attr.Values[0];
    return attrValue;

};


RequestProcessor.prototype.GetOctetStringValues2 = function (bidiQueryStr, func, queryArray) {
    var attrValue = "";
    var result = false;
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (null != attr) {
        for (var i in attr.Values) {
            var temp = attr.Values[i];
            if (temp.indexOf(queryArray[1]) > -1) {
                 result = true;
                 break;
            }
        }
    }
    this.responses.AddBool(bidiQueryStr, result);
}
/*  GetOctetStringValues() is used to get values of attributes of OCTET STRING type.
    
Example usage:
bidiQueryStr : \Printer.Layout.InputBins.Tray1:Capacity
func  : GetSimplePrinterAttributes
queryArray   : printer-input-tray;Tray 1;maxcapacity
    
*/
RequestProcessor.prototype.GetOctetStringValues = function (bidiQueryStr, func, queryArray) {
    var attrValue = "";
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (null != attr) {
        for (var i in attr.Values) {
            var temp = attr.Values[i];
            if (temp.indexOf(queryArray[1]) > -1) {
                var tempArray = temp.split(';');
                for (var i in tempArray) {

                    if (tempArray[i].indexOf(queryArray[2]) > -1) {
                        var result = tempArray[i].split('=');
                        attrValue = result[1];
                        attrValue = this.ConversionExists(attrValue, queryArray);
                        this.responses.AddString(bidiQueryStr, attrValue);
                        return;
                    }
                }
            }
        }
    }
    this.responses.AddString(bidiQueryStr, attrValue);
}

/* MultiStrCompBool() compares multiple values from the query for a match and returns true if match is found.

Example usage:
bidiQueryStr : \Printer.Configuration.DuplexUnit:Installed
func  : GetTrayAttributes
queryArray   : sides-supported;two-sided-long-edge;two-sided-short-edge
    
*/

RequestProcessor.prototype.MultiStrCompBool = function (bidiQueryStr, func, queryArray) {
    var result = false;
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (attr != null) {
        queryArray.shift();
        for (var innerIndex in attr.Values) {
            if (result == true) break;
            attrIndex = attr.Values[innerIndex];
            for (var outerIndex in queryArray) {
                queryArrayIndex = queryArray[outerIndex];
                if (attrIndex == queryArrayIndex) {
                    result = true;
                    break;
                }
            }
        }
    }
    this.responses.AddBool(bidiQueryStr, result);
};

/* MultiStrCompString() compares multiple values from the query for a match and converts the return value as per the Bidi xml.

Example usage:
bidiQueryStr : \Printer.Configuration.StorageMedia002:Installed
func  : GetSimplePrinterAttributes
queryArray   : multiple-document-handling-supported;separate-documents-collated-copies=true
    
*/
RequestProcessor.prototype.MultiStrCompString = function (bidiQueryStr, func, queryArray) {
    var result = false;
	var attrValue = "";
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (attr != null) {
        queryArray.shift();
        for (var innerIndex in attr.Values) {
            if (result == true) break;
            attrIndex = attr.Values[innerIndex];
            for (var outerIndex in queryArray) {
                queryArrayIndex = queryArray[outerIndex];
				var temp = queryArrayIndex.split('=');
                if (attrIndex == temp[0]) {
                    result = true;
					attrValue = temp[1];
                    break;
                }
            }
        }
    }
	this.responses.AddString(bidiQueryStr, attrValue);
};
/* SearchAccessoryBins() searches all the occurences in the queryArray and returns true if only all of them is found 

Example usage:

bidiQueryStr : \Printer.Finishing.ConvertMode
func : GetSimplePrinterAttributes
queryArray : Stacker;Mailbox;STK-2B-STP-210

*/

RequestProcessor.prototype.SearchAccessoryBins = function (bidiQueryStr, func, queryArray) {
    var result = false;

    /*
      Array to hold the list of patterns that needs a match
      Key - Bidi Value, Val - Strings needs to be matched
    */

    var accessoryBinParams = [

        { key: 'HP 3-Bin Stapler/Stacker Mailbox STK-2B-STP-210', val: 'Mailbox,STK-2B-STP-210' },
        { key: 'HP 3-Bin Stapler/Stacker Function Separator STK-2B-STP-210', val:'Function,Separator,STK-2B-STP-210' },
        { key: 'HP 3-Bin Stapler/Stacker STK-2B-STP-210', val: '3-Bin Stapler,STK-2B-STP-210' },

        { key: 'HP 3-Bin Stapler/Stacker Mailbox STK-2B-STP-200', val: 'Mailbox,STK-2B-STP-200' },
        { key: 'HP 3-Bin Stapler/Stacker Function Separator STK-2B-STP-200', val: 'Function,Separator,STK-2B-STP-200' },
        { key: 'HP 3-Bin Stapler/Stacker STK-2B-STP-200', val: '3-Bin Stapler,STK-2B-STP-200' },

        { key: 'HP LaserJet 5-Bin Stapler/Stacker Mailbox L0H20A', val: 'Mailbox,L0H20A' },
        { key: 'HP LaserJet 5-Bin Stapler/Stacker Job Separator L0H20A', val: 'Job,Separator,L0H20A' },
        { key: 'HP LaserJet 5-Bin Stapler/Stacker Collator L0H20A', val: 'Collator,L0H20A' },
        { key: 'HP LaserJet 5-Bin Stapler/Stacker L0H20A', val: '5-Bin Stapler,L0H20A' },

        { key: 'HP LaserJet Stapler Stacker Mailbox A2W80A', val: 'Stacker,Mailbox,A2W80A' },
        { key: 'HP LaserJet Stapler Stacker A2W80A', val: 'Stacker,A2W80A' },
        { key: 'HP LaserJet Stapler Stacker and 2/4 Hole Puncher Mailbox A2W82A', val: 'Stacker,Mailbox,A2W82A' },
        { key: 'HP LaserJet Stapler Stacker and 2/4 Hole Puncher A2W82A', val: 'Stacker,A2W82A' },
        { key: 'HP LaserJet Booklet Maker/Finisher Mailbox A2W83A', val: 'Mailbox,A2W83A' },
        { key: 'HP LaserJet Booklet Maker/Finisher Stacker A2W83A', val: 'Stacker,A2W83A' },
        { key: 'HP LaserJet Booklet Maker/Finisher and 2/3 Hole Puncher Mailbox A2W84A', val: 'Mailbox,A2W84A' },
        { key: 'HP LaserJet Booklet Maker/Finisher and 2/3 Hole Puncher Stacker A2W84A', val: 'Stacker,A2W84A' },
        { key: 'HP LaserJet Booklet Maker/Finisher and 2/4 Hole Puncher Mailbox CZ999A', val: 'Mailbox,CZ999A' },
        { key: 'HP LaserJet Booklet Maker/Finisher and 2/4 Hole Puncher Stacker CZ999A', val: 'Stacker,CZ999A' },
        { key: 'HP 500-Sheet Stapler/Stacker CE726A', val: 'CE726A' },
        { key: 'HP 3-Bin Stapler/Stacker Mailbox B3M76A', val: 'Mailbox,B3M76A' },
        { key: 'HP 3-Bin Stapler/Stacker Function Separator B3M76A', val: 'Separator,B3M76A' },
        { key: 'HP 3-Bin Stapler/Stacker B3M76A', val: 'Stacker,B3M76A' }

    ];
    
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (attr != null) {
        attrIndex = attr.Values[0];
        for (var outerIndex = 0; outerIndex < accessoryBinParams.length; outerIndex++) {
            var bidiStr = accessoryBinParams[outerIndex].key;
            var patternsToMatch = accessoryBinParams[outerIndex].val.split(',');
            // Check all the patterns - for all the cases
            for (var innerIndex = 0; innerIndex < patternsToMatch.length; innerIndex++) {
				var match = patternsToMatch[innerIndex];
                if (new RegExp(match, "gmi").test(attrIndex)) {
                    result = true;
                }
                else {
                    result = false;
                    break;
                }
            }
            if (result) {
                this.responses.AddString(bidiQueryStr, bidiStr);
                return;
            }
        }
    }
    this.responses.AddString(bidiQueryStr, '');
};

/* GetCollectionAttributes()
    
*/

RequestProcessor.prototype.GetCollectionAttributes = function (bidiQueryStr, func, queryArray) {
  
    var collection = null;
    var query = queryArray[0];
    var collectionKey = queryArray[1];
    var attributeName = queryArray[2];
    var convertParams = queryArray[3];
    var type = queryArray[4];
    var retval = "", indexQuery = "";
    var suppliedIndex = parseInt(collectionKey);
    var hvd_used = queryArray[5];

    // tell the req processor the vol is high for collection
    if(hvd_used == "hvd")
        this.pageCache.ishvd = true;

    // get indexed query
    if (isNaN(suppliedIndex) == false) {
        indexQuery = query.concat('[').concat(collectionKey).concat(']');

        // Retrieve either from the cache or from the device
        if (this.ValidGetFunctions.indexOf(func) != -1)
            collection = this[func](indexQuery);
        else collection = null;

        if (collection != null) {
            find_collection_using_index: {
                for (var cindex in collection.Values) {
                    var attribute = collection.Values[cindex];
                    if ((attribute.Name == attributeName) && (attribute.Values.length > 0)) {
                        retval = this.ApplyConversion(attribute.Values[0], convertParams);
                        // Got a match and converted successfully, break on
                        if (retval != "")
                            break find_collection_using_index;
                    }
                }
            }
        }
    }
    else {
        // get indexed query based on conditions
        if (collectionKey.length > 0) {
            // Assuming the max no sub collection it has is 500. Maximum being the result of db queries
            var maxOccurences = 500;
            find_collection_using_conditions:
            for (coindex = 1; coindex <= maxOccurences; ++coindex) {
                indexQuery = query.concat('[').concat(coindex).concat(']');

                // Retrieve either from the cache or from the device
                if (this.ValidGetFunctions.indexOf(func) != -1){
                    collection = this[func](indexQuery);
					if (coindex == 1 && collection == null) // Assuming that if first index is returned null then the device response doesn't contain the attribute value. Checking Subsequent 499 index is waste of time.
						break find_collection_using_conditions;
				}
                else collection = null;

                // Check the collection always
                if (collection != null) {
                    var conditions = collectionKey.split(",");
                    var condMatch = false;
                    var results = this.MakeCollectionAttributeList(collection.Values);

                    // Implement the search logic here,.. always go by AND 
                    var exprEvaluation = false;
                    condtions_search:
                    for (var nCondition = 0; nCondition < conditions.length; nCondition++) {
                        results_search:
                        // search all the entries, search would be done as such k=v pair format
                        for (var nattr = 0; nattr < results.length; nattr++) {
                            if (results[nattr] == conditions[nCondition]) {
                                exprEvaluation = true;
                                break results_search;
                            }
                        }
                        // AND, so don't have to check for the next condition
                        if (exprEvaluation == false)
                            break condtions_search;
                    }
                    if (exprEvaluation == true) {
                        for (var nattr = 0; nattr < results.length; nattr++) {
                            // Should pass in any one
                            if (new RegExp(attributeName, "gmi").test(results[nattr])) {
                                var rhs = results[nattr].substr((results[nattr].indexOf("=") + 1));
                                retval = this.ApplyConversion(rhs, convertParams);
                                break find_collection_using_conditions;
                            }
                        }
                    }
                }
            } 
        }
    }

    // Handle the types from the extension file
    handle_type_specification:
    switch (type) {
        case "boolean":
            this.responses.AddBool(bidiQueryStr, (retval == "true") ? true : false);
            break;
        case "string":
        default:
            this.responses.AddString(bidiQueryStr, retval);
    }
};


// ## Recursive
RequestProcessor.prototype.MakeCollectionAttributeList = function (collection) {
    var attrList = [];
    for (var nattr = 0; nattr < collection.length; nattr++) { // this is not a collection
        if (collection[nattr].Values.length == 1) {
            attrList.push(collection[nattr].Name + "=" + collection[nattr].Values[0]);
        }
        else {
            if (collection[nattr].Values.length > 1) {
                var _attrList = this.MakeCollectionAttributeList(collection[nattr].Values);
                for (attribute in _attrList) {
                    attrList.push(_attrList[attribute]); // push key and value together
                }
            }
        }
    }
    return attrList;
};

RequestProcessor.prototype.ApplyConversion = function (value, convertParams) {
    var retval = "";
    /* Commenting the check for "None" for OutputBins USB conversion case
    var pos = convertParams.indexOf("None");
    if (pos >= 0)
        retval = value; // Return value as such without any modification if no conversions are applicable
    else {*/
        // Apply conversion here.
        var convertTokens = convertParams.split(",");
        for (convIndex in convertTokens) {
            var convertable = convertTokens[convIndex].split("=");
            var lhs = convertable[0];
            var rhs = convertable[1];

            if (value == lhs) {
                retval = rhs;
                break;
            }
        }
   // }
    return (retval);
};

/*
    GetStringFromEnumerations()
    Usage : GetStringFromEnumerations;GetSimplePrinterAttributes;IPPQuery;[EnumVal][EnumString]
    Example : GetStringFromEnumerations;GetSimplePrinterAttributes;finishings-supported;30;StapleDualRight
*/

RequestProcessor.prototype.GetStringFromEnumerations = function (bidiQueryStr, func, queryArray) {
    var attrValue = "";
    var attr = null;
    
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray[0]);
    else
        attr = null;

    if (attr != null) {
        if (queryArray.length < 3) { // One to one match
            var matchtable = queryArray[1].split(",");
            for (var matchindex in matchtable) {
                var keyvalpair = matchtable[matchindex].split("=");
                var key = keyvalpair[0];
                var value = keyvalpair[1];
                if (key == attr.Values[0]) {
                    attrValue = value;
                    break;
                }
            }
        }
        else {                       // Many to one match
            var enumvals = attr.Values;
            for (var enumindex in enumvals) {
                if (enumvals[enumindex] == queryArray[1]) {
                    attrValue = queryArray[2];
                    break;
                }
            }
        } 
    }
    this.responses.AddString(bidiQueryStr, attrValue);
}

/* StrCompBool() compares a single value from the query for a match and returns true if match is found.

Example usage:
bidiQueryStr : \Printer.Layout.InputBins.Tray001:Installed
func  : GetTrayAttributes
queryArray   : media-col-ready;tray-1;media-source;tray-1
    
*/


RequestProcessor.prototype.StrCompBool = function (bidiQueryStr, func, queryArray) {

    var result = false;
    if (this.ValidGetFunctions.indexOf(func) != -1)
        attr = this[func](queryArray);
    else
        attr = null;
    if (attr != null) {
        searchKey = queryArray.pop();
        for (var i in attr.Values) {
            temp = attr.Values[i];
            if (searchKey == temp) {
                result = true;
                break;
            }
        }
    }
    this.responses.AddBool(bidiQueryStr, result);
};



/*  GetSimplePrinterAttributes() is used to get values of simple attribute types
    
Example usage:

queryArray   : printer-state-reasons
    
*/

RequestProcessor.prototype.GetSimplePrinterAttributes = function (queryArray) {
    targetAttrName = queryArray[0];
    if (targetAttrName == undefined)
        targetAttrName = queryArray;
    // Alter the target name in case of collections
    var indexApplied = false;
    var refinedIndexQuery = "";
    var index = targetAttrName.indexOf("[");
    if (index != -1) {
        indexApplied = true;
        refinedIndexQuery = targetAttrName.substr(0, index);
    }
    if ((this.pageCache.attrs != []) &&(this.pageCache.ishvd != true)) {                               // Check whether we already have the required attribute in cache..
        for (var i in this.pageCache.attrs) {
            temp = this.pageCache.attrs[i];
            if (temp != null) {
                if ((temp.Name == targetAttrName) || (new RegExp(temp.Name, "gmi").test(targetAttrName))) {
                    return this.GetAttribute(this.pageCache.attrs, targetAttrName);
                }
            }
        }
    }
    else if ((this.pageCache.hvd_attrs != []) && (this.pageCache.ishvd == true)) {                               // Check whether we already have the required attribute in hvd cache..
        for (var i in this.pageCache.hvd_attrs) {
            temp = this.pageCache.hvd_attrs[i];
            if (temp != null) {
                if ((temp.Name == targetAttrName) || (new RegExp(temp.Name, "gmi").test(targetAttrName))) {
                    return this.GetAttribute(this.pageCache.hvd_attrs, targetAttrName);
                }
            }
        }
    }

    var content = this.pageCache.GetContent((indexApplied) ? refinedIndexQuery : targetAttrName);
    
    if (this.pageCache.ishvd != true) {
        this.pageCache.attrs = this.pageCache.attrs.concat(this.ParseAttributes(content));
        return this.GetAttribute(this.pageCache.attrs, targetAttrName);
    }
    else {
        this.pageCache.hvd_attrs = this.pageCache.hvd_attrs.concat(this.ParseAttributes(content));
        return this.GetAttribute(this.pageCache.hvd_attrs, targetAttrName);
    }
};

/*  GetTrayAttributes() is used to get all Tray related information which is under a Collection.

    Example Usage:
    
    queryArray   : media-col-ready;tray-2;media-type
*/

RequestProcessor.prototype.GetTrayAttributes = function (queryArray) {
    var attr = null;
    targetAttrName = queryArray[0];
    if (this.pageCache.attrs != []) {                   // Check whether we already have the required attribute in cache..
        for (var i in this.pageCache.attrs) {
            temp = this.pageCache.attrs[i];
            if (temp != null) {
                if (temp.Name == targetAttrName) {
                    var attrsCollection = this.FindCollection(this.pageCache.attrs, queryArray[0], queryArray[1]);
                    if (attrsCollection != null) {
                        return this.GetAttribute(attrsCollection.Values, queryArray[2]);
                    }
                    return null;
                }
            }
        }
    }
    var content = this.pageCache.GetContent(targetAttrName);
    this.pageCache.attrs = this.pageCache.attrs.concat(this.ParseAttributes(content));
    var attrsCollection = this.FindCollection(this.pageCache.attrs, queryArray[0], queryArray[1]);
    if (attrsCollection != null) {
        return this.GetAttribute(attrsCollection.Values, queryArray[2]);
    }
    return attr;
};


IPPAttribute = function (content) {
    this.Tag = ippUtils.GetByte(content);
    this.Values = [];
    if (this.Tag >= 0x10) {
        this.NameLen = ippUtils.GetInt16(content);
        if (this.NameLen > 0) {
            this.Name = ippUtils.GetString(content, this.NameLen);
        }

        this.ValueLen = ippUtils.GetInt16(content);
        if (this.ValueLen > 0) {
            this.Values.push(ippUtils.GetValue(content, this.ValueLen, this.Tag));
        }
    }
};


//  ParseAttributes() parses an IPP content packet and stores the IPP attributes in object of type "IPPAttribute"

RequestProcessor.prototype.ParseAttributes = function (content) {
    if((content === undefined) || (content === null))
	return null;
    var attrs = [];
    var version = ippUtils.GetInt16(content);
    var statusCode = ippUtils.GetInt16(content);
    if (statusCode != 0)                        // Status code 0 means response in OK..
        return null;
    var reqID = ippUtils.GetInt32(content);
    do {
        var attr = new IPPAttribute(content);
        if (attr.Tag === ippUtils.IPP_TAG_END) 
        return attrs;
        if (attr.Tag < ippUtils.IPP_TAG_UNSUPPORTED_VALUE) continue;
        if (attr.Tag === ippUtils.IPP_TAG_BEGIN_COLLECTION) {
            if (attr.NameLen != 0)
                attrs.push(this.ParseCollection(attr, content));
            else {
                buffAttr = this.ParseCollection(attr, content);
                buffAttr.Name = attrs[attrs.length - 1].Name;
                buffAttr.NameLen = attrs[attrs.length - 1].NameLen;
                attrs.push(buffAttr);
            }
        }
        else {
            if (attr.NameLen > 0) {
                attrs.push(attr);
            }
            else {
                lastAttr = attrs.pop();
                lastAttr.Values.push(attr.Values[0]);
                attrs.push(lastAttr);
            }
        }
    } while (content.length);
    return null;
};

//  ParseCollection() is a recursive function to parse IPP Collections.

RequestProcessor.prototype.ParseCollection = function (attr, content) {
    var collection = attr;
    collection.Tag = ippUtils.IPP_TAG_BEGIN_COLLECTION;
    do {
        var attr = new IPPAttribute(content);
        if (attr.Tag == ippUtils.IPP_TAG_MEMBERNAME) {
            attr.NameLen = attr.ValueLen;
            attr.Name = attr.Values[0];
            attr.Values.pop();
            lastAttr = attr;
        }
        else if (attr.Tag == ippUtils.IPP_TAG_BEGIN_COLLECTION) {
            collection.Values.push(this.ParseCollection(lastAttr, content));
        }
        else if (attr.Tag == ippUtils.IPP_TAG_END_COLLECTION)
            return collection;
        else {
            attr.NameLen = lastAttr.NameLen;
            attr.Name = lastAttr.Name;
            collection.Values.push(attr);
        }
    } while (content.length);
    return null;
};


RequestProcessor.prototype.FindCollection = function (attrs, queryArray0, queryArray1) {
    if (attrs != null) {
        var attrArray = [];
        for (var index in attrs) {
            attr = attrs[index];
            if (attr == null) return null;
            if (attr.Name == queryArray0)
                attrArray.push(attr);
        }

        if (attrArray.length == 0) return null;

        for (var outerIndex in attrArray) {
            attr = attrArray[outerIndex];
            for (var innerIndex in attr.Values) {
                inattr = attr.Values[innerIndex];
                if (inattr.Values[0] == queryArray1)
                    return attr;
            }
        }
    }
    return null;
};

//  GetAttribute() parses through IPPAttribute object array and returns the object which is queried for.

RequestProcessor.prototype.GetAttribute = function (attrs, name) {

    if (attrs != null) {
        var lpos = name.indexOf("[");
        var rpos = name.indexOf("]");
        // Determine whether the name is for a collection or not
        if ((name.indexOf(".") === -1) && (lpos === -1)) {
            // For a simple value, search through for an exact name match
            for (var index in attrs) {
                attr = attrs[index];
                if (attr == null) return null;
                if (name === attr.Name) return attr;
            }
        }
        else if (lpos != -1) {

            // retreive the entry corresponding to the index from the collection
            var refinedIndexQuery = name.substr(0, lpos);
            var index = name.substr((lpos + 1), rpos -(lpos + 1));
            var hitcount = 0;
            for (var cindex in attrs) {
                attr = attrs[cindex];
                if (attr == null) return null;
                if (refinedIndexQuery == attr.Name) {
                    ++hitcount;
                }
                if (index == hitcount) return attr;
            }
            if (index > hitcount) return null;
        }
        else {
            // for a collection name, separate the name into tokens and 
            // look for a match with the first token
            var tokens = name.split(".");
            for (var indexToken in tokens) {
                token = tokens[indexToken];
                for (var index in attrs) {
                    attr = attrs[index];
                    if (token === attr.Name) {
                        // Return the attribute if this is a member Attribute
                        if (attr.Tag != ippUtils.IPP_TAG_BEGIN_COLLECTION) {
                            return attr;
                        }
                        else {
                            // Move down the line to the attributes in this collection
                            attrs = attr.Values;
                            break;
                        }
                    }
                }
            }

        }
    }
    return null;
};

/*
    Splice the array (Single value)
*/

function splice(array,spliceindex) {

    if(!array || spliceindex < 0)
        return null;
    
    for (var index = spliceindex + 1; index < array.length; index++) {
        array[index - 1] = array[index];
    }
    array.pop();
}