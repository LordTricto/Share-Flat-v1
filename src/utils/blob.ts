export function downloadBlob(blob: Blob, filename: string): void {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - workaround for old IE browsers
	if (typeof window.navigator.msSaveBlob !== "undefined") {
		// IE workaround for "HTML7007: One or more blob URLs were
		// revoked by closing the blob for which they were created.
		// These URLs will no longer resolve as the data backing
		// the URL has been freed."
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - workaround for old IE browsers
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		window.navigator.msSaveBlob(blob, filename);
	} else {
		const blobURL = window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
		const tempLink = document.createElement("a");
		tempLink.style.display = "none";
		tempLink.href = blobURL;
		tempLink.setAttribute("download", filename);

		// Safari thinks _blank anchor are pop ups. We only want to set _blank
		// target if the browser does not support the HTML5 download attribute.
		// This allows you to download files in desktop safari if pop up blocking
		// is enabled.
		if (typeof tempLink.download === "undefined") {
			tempLink.setAttribute("target", "_blank");
		}

		document.body.appendChild(tempLink);
		tempLink.click();

		// Fixes "webkit blob resource error 1"
		setTimeout(() => {
			document.body.removeChild(tempLink);
			window.URL.revokeObjectURL(blobURL);
		}, 200);
	}
}
export function previewBlob(blob: Blob, filename: string): void {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - workaround for old IE browsers
	if (typeof window.navigator.msSaveBlob !== "undefined") {
		// IE workaround for "HTML7007: One or more blob URLs were
		// revoked by closing the blob for which they were created.
		// These URLs will no longer resolve as the data backing
		// the URL has been freed."
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - workaround for old IE browsers
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		window.navigator.msSaveBlob(blob, filename);
	} else {
		const blobURL = window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
		const tempLink = document.createElement("a");
		tempLink.style.display = "none";
		tempLink.href = blobURL;
		tempLink.setAttribute("download", filename);

		// Safari thinks _blank anchor are pop ups. We only want to set _blank
		// target if the browser does not support the HTML5 download attribute.
		// This allows you to download files in desktop safari if pop up blocking
		// is enabled.
		if (typeof tempLink.download === "undefined") {
			tempLink.setAttribute("target", "_blank");
		}

		document.body.appendChild(tempLink);
		tempLink.click();

		// Fixes "webkit blob resource error 1"
		setTimeout(() => {
			document.body.removeChild(tempLink);
			window.URL.revokeObjectURL(blobURL);
		}, 200);
	}
}
export function getBlobFromCanvas(canvas: HTMLCanvasElement): Blob {
	const dataURI = canvas.toDataURL("image/png");
	// convert base64/URLEncoded data component to raw binary data held in a string
	let byteString;
	if (dataURI.split(",")[0].indexOf("base64") >= 0) {
		byteString = atob(dataURI.split(",")[1]);
	} else {
		byteString = unescape(dataURI.split(",")[1]);
	}

	// write the bytes of the string to a typed array
	const ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ia], {type: "image/png"});
}

export function openBlobInNewTab(blob: Blob, title: string): boolean {
	const blobUrl = URL.createObjectURL(blob);
	const win = open("", "_blank");
	if (win) {
		const iframe = document.createElement("iframe");

		// title.appendChild(document.createTextNode('Nice title :)'));

		iframe.src = blobUrl;
		iframe.width = "100%";
		iframe.height = "100%";
		iframe.style.border = "none";

		// win.document.head.appendChild(title);
		win.document.body.appendChild(iframe);
		win.document.body.style.margin = String(0);

		win.document.title = title;

		return true;
	}

	return false;

	/*
    // ignoring IE
    var blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
    var tempForm = document.createElement('form');
    tempForm.style.display = 'none';
    tempForm.action = blobURL;
    tempForm.method = 'GET';
    tempForm.target = '_blank';

    document.body.appendChild(tempForm);
    tempForm.submit();

    // Fixes "webkit blob resource error 1"
    /*setTimeout(function() {
        document.body.removeChild(tempForm);
        window.URL.revokeObjectURL(blobURL);
    }, 200);**

    return true;
    */
}

export function guessExtension(mime: string): string | undefined {
	switch (mime) {
		case "application/pdf":
			return "pdf";
		case "image/jpeg":
			return "jpg";
		case "image/png":
			return "png";
		default:
			return undefined;
	}
}
