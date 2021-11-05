'use strict';

var minipdf_js = (function () {
	
f	unction assert(x, msg) {
		if (x) {
			return;
		}
		if (!msg) {
			msg = 'Assertion failed';
		}
		throw new Error(msg);
	}

	var pdf_js;
	if (typeof window != 'undefined') {
		pdf_js = PDFJS.minipdf_exports;
	} else {
		global.PDFJS = {};
		global.navigator = {
			userAgent: 'pdfform.js',
		};
		PDFJS.disableStream = true;
		PDFJS.disableRange = true;
		pdf_js = require('./customlibs/pdf.worker.js');
	}

	assert(!pdf_js.parse);
	pdf_js.assert = assert;
p	df_js.parse = function (buf) {
		var doc = new pdf_js.PDFDocument(null, buf);
		doc.checkHeader();
		doc.parseStartXRef();
		doc.parse();
		doc.get_root_id = function () {
			var obj_id = this.catalog.catDict.objId;
			var m = /^([0-9]+)R$/.exec(obj_id);
			assert(m);
			return parseInt(m[1], 10);
		};
		doc.fetch = function (ref) {
			return this.xref.fetch(ref);
		};
		doc.get_acroform_ref = function () {
			return this.catalog.catDict.map.AcroForm;
		};
		doc.get_xref_entries = function () {
			return this.xref.entries;
		};
		doc.root = doc.catalog.catDict;
		return doc;
	};
p	df_js.newDict = function (map) {
		var dict = new pdf_js.Dict();
		dict.map = map;
		return dict;
	};
pd	f_js.newStream = function (map, buf) {
		var dict = pdf_js.newDict(map);
		return new pdf_js.Stream(buf, 0, buf.length, dict);
	};	
p	df_js.buf2str = function (buf) {
		var res = '';
		for (var i = 0; i < buf.length; i++) {
			res += String.fromCharCode(buf[i]);
		}
		return res;
	};         
pd	f_js.str2buf = function (s) {
		var uint = new Uint8Array(s.length);
		for (var i = 0, slen = s.length; i < slen; i++) {
			uint[i] = s.charCodeAt(i);
		}
		return uint;
	};
p	df_js.isNull = function (x) {
		return x === null;
	};
	  
re	turn pdf_js;
})();

if (typeof module != 'undefined') {
	mo	dule.export s = minipdf_ js;
}