Hooks.on("getActorSheetHeaderButtons", (sheet, buttons) => {
	if (sheet.actor.type !== "character") return;

	buttons.unshift({
		label: "Export to PDF",
		class: "export-pdf",
		icon: "fas fa-file-export",
		onclick: () => new Pdfconfig(sheet.actor).render(true)
	});
});

let currentBuffer;
class Pdfconfig extends FormApplication {

	constructor(actor) {
		super();
		this.actor = actor;
	};

	/** The module's ID */
	static ID = "pdf-sheet";

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "modules/pdf-sheet/templates/module.hbs",
			id: "pdf-sheet",
			height: 600,
			width: 400,
			resizable: true,
			title: "Export to PDF"
		});
	};

	/** @override */
	getData() {
		const context = super.getData();

		return context;
	};

	activateListeners(html) {
		console.log(this)

		this.load()

		document.getElementById("pdf-upload").addEventListener("change", function (e) {
			var file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = function (ev) {
				onFileUpload(file.name, ev.target.result);
			};
			reader.readAsArrayBuffer(file);
		});

		document.getElementById("pdf-download").addEventListener("click", event => {
			event.preventDefault();
			fillFields(currentBuffer);
		});
	};

	load() {
		const pdflib_radios = document.querySelectorAll("input[name='pdflib']");
		for (let i = 0;  i < pdflib_radios.length; i++) {
			let r = pdflib_radios[i];
			r.addEventListener("change", () => {
				if (currentBuffer) {
					listInputs(currentBuffer);
				};
			});
		};
	};
};


// Example of listing all fields
function listInputs(buffer) {
	const inputForm = document.getElementById("fieldList");
	emptyNode(inputForm);

	let count = 1;
	let pdfFields;
	try {
		pdfFields = pdfform(minipdf).list_fields(buffer);
	} catch (err) {
		notifyError(err);
		return;
	};

	for (let pdfFieldKey in pdfFields) {

		const row = document.createElement("li");
		row.innerText = `${pdfFieldKey}: `;
		inputForm.appendChild(row);

		console.log(pdfFields);

		pdfFields[pdfFieldKey].forEach((field, i) => {
			if ((field.type === "radio") && field.options) {
				const fieldSet = document.createElement("fieldset");

				field.options.forEach((value) => {
					const radioLabel = document.createElement("label");
					const radio = document.createElement("input");

					radio.setAttribute("type", "radio");
					radio.setAttribute("value", value);
					radio.setAttribute("name", pdfFieldKey + i);
					radio.setAttribute("data-idx", i);
					radio.setAttribute("data-key", pdfFieldKey);

					radioLabel.appendChild(radio);
					radioLabel.innerText = value;
					fieldSet.appendChild(radioLabel);
				});

				row.appendChild(fieldSet);
				return;
			};

			const input = document.createElement((field.type === "select") ? "select" : "input");
			input.setAttribute("data-idx", i);
			input.setAttribute("data-key", pdfFieldKey);
			if (field.type === "boolean") {
				input.setAttribute("type", "checkbox");
			} else if (field.type === "string") {

			} else if ((field.type === "select") && field.options) {
				field.options.forEach((value) => {
					const option = document.createElement("option");
					option.innerText = value;
					option.setAttribute("value", value);
					input.appendChild(option);
				});
			};
			row.appendChild(input);
		});
	};
};

// Example of filling out fields
function fillFields(buffer) {
	var fieldList = document.getElementById("fieldList");
	var fields = {};
	fieldList.querySelectorAll("input, select").forEach((input) => {
		if ((input.getAttribute("type") === "radio") && !input.checked) {
			return;
		};

		var key = input.getAttribute("data-key");
		if (!fields[key]) {
			fields[key] = [];
		};
		var index = parseInt(input.getAttribute("data-idx"), 10);
		var value = (input.getAttribute("type") === "checkbox") ? input.checked : input.value;
		fields[key][index] = value;
	});

	var filled_pdf; // Uint8Array
	try {
		filled_pdf = pdfform(minipdf).transform(buffer, fields);
	} catch (e) {
		return notifyError(e);
	};

	var blob = new Blob([filled_pdf], { type: "application/pdf" });
	saveAs(blob, "character-sheet.pdf");
};


function notifyError(e) {
	console.error(e, e.stack);
	ui.notifications.error(e.message);
};

function emptyNode(node) {
	let last;
	while ((last = node.lastChild)) {
		node.removeChild(last);
	};
};

function onFileUpload(filename, buffer) {
	currentBuffer = buffer;
	listInputs(currentBuffer);

	document.getElementById("pdf-upload").setAttribute("style", "display: none");
	document.getElementById("pdf-download").removeAttribute("disabled");
};
