export default function(quote, lines) {
	var quoteRecord = JSON.parse(JSON.stringify(quote.record));
	for (var prop in quoteRecord) {
		if (prop.endsWith("__r")) {
			delete quoteRecord[prop]
		}
	}

	var lineDetails = [];

	for (var i = 0, count = lines.length; i < count; i++) {
		//deep clone the object - remove pointers to QLE data
		var iLineDetail = JSON.parse(JSON.stringify(lines[i].record));

		//clean up related objects that won't deserialize cleanly
		for (var prop in iLineDetail) {
			if (prop.endsWith("__r")) {
				delete iLineDetail[prop]
			}
		}
		lineDetails.push(iLineDetail);
	}
	return {
		quote: quoteRecord,
		lines: lineDetails
	}
}