// Store mapping
Hooks.on("init", () => {
	game.settings.register(Pdfconfig.ID, "map", {
		name: game.i18n.localize("pdfsheet.settings.map.Name"),
		hint: game.i18n.localize("pdfsheet.settings.map.Hint"),
		scope: "world",
		config: true,
		type: String,
	});
});

// Add button to Actor Sheet for opening app
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

	/** @override */
	activateListeners(html) {
		document.getElementById("pdf-upload").addEventListener("change", event => {
			var file = event.target.files[0];
			var reader = new FileReader();
			reader.onload = ev => this.onFileUpload(file.name, ev.target.result);
			reader.readAsArrayBuffer(file);
		});

		document.getElementById("pdf-download").addEventListener("click", event => {
			event.preventDefault();
			this.download(currentBuffer);
		});
	};

	/** Create a form with inputs for each PDF field and fill them in with Actor data */
	createForm(buffer) {
		const inputForm = document.getElementById("fieldList");

		// Empty input form
		let child;
		while ((child = inputForm.lastChild)) {
			inputForm.removeChild(child);
		};

		// Get PDF fields
		const pdfFields = pdfform(minipdf).list_fields(buffer);

		// Get mapping
		const rawMap = game.settings.get(Pdfconfig.ID, "map");

		// Exit if map is invalid
		if (!rawMap?.length) { ui.notifications.error("PDF Sheet | Invalid Map JSON"); return };

		// Get Actor Data
		const actorData = this.actor.data;
		console.log("PDF Sheet | Actor Data:", actorData)

		// Parse values correctly
		rawMap.forEach((entry, i) => {
			// Does this entry contain a dynamic key
			if (entry.foundry.includes("@")) {
				rawMap[i].foundry = getProperty(actorData, entry.foundry.slice(1));
			}

			// Parse Booleans
			else if (entry.foundry === "true") { rawMap[i].foundry = true }
			else if (entry.foundry === "false") { rawMap[i].foundry = false }

			// Parse Numbers (floats)
			else if (parseFloat(entry.foundry) - parseFloat(entry.foundry) === 0) { rawMap[i].foundry = parseFloat(entry.foundry) }

			// Parse regular strings
			else {
				rawMap[i].foundry = entry.foundry;
			};
			console.log(rawMap[i].foundry);
		});

		console.log("PDF Sheet | PDF fields:", pdfFields);

		for (let pdfFieldKey in pdfFields) {

			let row = document.createElement("li");
			row.innerText = `${pdfFieldKey}: `;
			inputForm.appendChild(row);

			pdfFields[pdfFieldKey].forEach((field, i) => {
				if ((field.type === "radio") && field.options) {
					let fieldSet = document.createElement("fieldset");

					field.options.forEach((value) => {
						let radioLabel = document.createElement("label");
						let radio = document.createElement("input");

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

				let input = document.createElement((field.type === "select") ? "select" : "input");
				input.setAttribute("data-idx", i);
				input.setAttribute("data-key", pdfFieldKey);

				// Make a checkbox if the type is boolean
				if (field.type === "boolean") {
					input.setAttribute("type", "checkbox");

					// Make a drop down menu if the type is seelect and it has options
				} else if ((field.type === "select") && field.options) {

					field.options.forEach((value) => {

						let option = document.createElement("option");
						option.innerText = value;
						option.setAttribute("value", value);
						input.appendChild(option);
					});
				};
				row.appendChild(input); // Add to DOM

				// Add values from character sheet
				// Loop through all entries in map
				rawMap.forEach(entry => {
					// Check if the current field in the PDF matches an entry in the map
					if (pdfFieldKey.trim() == entry.pdf) {
						// Set the input to what is on the character sheet
						if (field.type === "boolean") { input.checked = entry.foundry } // If it's a checkbox
						else { input.setAttribute('value', entry.foundry) }; // If it's anything else
					};
				});
			});
		};
	};

	/** Get values and download PDF */
	download(buffer) {
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

		const filled_pdf = pdfform(minipdf).transform(buffer, fields);

		const blob = new Blob([filled_pdf], { type: "application/pdf" });
		saveAs(blob, "character-sheet.pdf");
	};

	/** Manage new PDF upload */
	onFileUpload(filename, buffer) {
		currentBuffer = buffer;
		this.createForm(currentBuffer);

		document.getElementById("pdf-upload").setAttribute("style", "display: none");
		document.getElementById("pdf-download").removeAttribute("disabled");
	};
};
