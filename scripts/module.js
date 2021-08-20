// Store mapping
Hooks.on("init", () => {
	game.settings.register(Pdfconfig.ID, "map", {
		name: game.i18n.localize("pdfsheet.settings.map.Name"),
		hint: game.i18n.localize("pdfsheet.settings.map.Hint"),
		scope: "world",
		config: true,
		type: String,
		default: "[]",
	});
});

Hooks.on("renderSettingsConfig", () => {

	// Create a new text box
	let newTextBox, oldValue, editor;

	// Get the old text box
	let oldTextBox = document.querySelector("[name='pdf-sheet.map']");

	// Try to parse and copy the value from the old textbox into the new one
	try {
		oldValue = JSON.stringify(JSON.parse(oldTextBox.value), null, 4);
	} catch (err) {
		// Let the user know if they have invalid JSON 
		ui.notifications.error("PDF Sheet | Value not loaded: Invalid JSON. " + err.message);
	};

	// If Ace Library is enabled use an Ace Editor
	if (game.modules.get("acelib")?.active) {

		// Create an editor
		newTextBox = document.createElement("div");
		editor = ace.edit(newTextBox);

		// Set to the default options
		editor.setOptions(ace.userSettings);

		// Set to JSON mode
		editor.session.setMode("ace/mode/json");

		// Use the oldValue
		editor.setValue(oldValue);
	} else {
		// Otherwise create new textarea
		newTextBox = document.createElement("textarea");

		// Use the oldValue
		newTextBox.value = oldValue;
	};

	// Don't show the old textbox
	oldTextBox.style.display = "none";

	// Give the editor some height
	newTextBox.style.height = "20em";

	// Make the editor take up the full width
	oldTextBox.parentElement.style.flex = "100%";

	// Insert the new textbox right after the old one
	oldTextBox.after(newTextBox);

	// Use a different event for the Ace Editor
	if (game.modules.get("acelib")?.active) {
		// Update whenever the ace editor changes
		editor.on("change", () => {
			// Try to parse and copy the value from the ace editor to the old textbox
			try {
				oldTextBox.value = JSON.stringify(JSON.parse(editor.getValue()), null, 4);
			} catch (err) {
				// Let the user know if they have invalid JSON 
				ui.notifications.error("Value not saved: Invalid JSON. " + err.message);
			};
		});
	} else {
		// Update whenever the new textbox changes
		newTextBox.addEventListener("change", () => {
			// Try to parse and copy the value from the new textbox to the old one
			try {
				oldTextBox.value = JSON.stringify(JSON.parse(newTextBox.value), null, 4);
			} catch (err) {
				// Let the user know if they have invalid JSON 
				ui.notifications.error("Value not saved: Invalid JSON. " + err.message);
			}
		});
	};
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

		// Try to get mapping
		let rawMap;
		try {
			rawMap = JSON.parse(game.settings.get(Pdfconfig.ID, "map"));
		} catch (err) {
			// Exit if map is invalid
			ui.notifications.error("PDF Sheet | Invalid JSON Map. " + err.message);
			return;
		};

		// Get Actor Data
		const actorData = this.actor.data;

		// Begin grouping logs
		console.group("PDF Sheet")

		// All Data
		console.log("All Data:", this.actor)

		// Log Actor Data
		console.log("Actor Data:", actorData)

		// Helper function to parse dynamic keys
		const parseDynamic = entry => {
			if (entry.includes("@")) return getProperty(actorData, entry.slice(1));
		};

		const parseArray = array => {
			let results = [];
			if (Array.isArray(array)) {
				array.forEach(item => {
					item = parseDynamic(item); // Parse dynamic keys
					results.push(item);
				});
			};
			// Flatten, filter out empty values, and join results together
			return results.deepFlatten().filter(String).join(", ");
		};

		// Parse values correctly
		rawMap.map(entry => {

			// Log current entry
			console.log("Current Mapping Entry", entry)

			// Does this entry contain a dynamic key
			if (parseDynamic(entry.foundry)) { entry = parseDynamic(entry.foundry) }

			// Parse Booleans
			else if (entry.foundry === "true") { entry.foundry = true }
			else if (entry.foundry === "false") { entry.foundry = false }

			// Parse Arrays
			else if (Array.isArray(entry.foundry)) entry.foundry = parseArray(entry.foundry);

			// Log filled in fields
			console.log(entry.foundry);
		});

		// Log all PDF fields
		console.log("PDF fields:", pdfFields);

		// Close console grouping
		console.groupEnd();

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

		document.getElementById("pdf-header").setAttribute("style", "display: none");
		document.getElementById("pdf-download").style.display = "block";
	};
};
