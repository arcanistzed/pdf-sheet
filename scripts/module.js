// Store mapping
Hooks.on("init", () => {
	game.settings.register(Pdfconfig.ID, "mapping", {
		name: game.i18n.localize("pdfsheet.settings.mapping.Name"),
		hint: game.i18n.localize("pdfsheet.settings.mapping.Hint"),
		scope: "world",
		config: true,
		type: String,
		default: "[]",
	});
});

// Inject editor into the settings menu
Hooks.on("renderSettingsConfig", () => {
	// Only if GM
	if (game.user.isGM) {
		// Create a new text box
		let newTextBox, editor;

		// Get the old text box
		const oldTextBox = document.querySelector("[name='pdf-sheet.mapping']");

		// If Ace Library is enabled use an Ace Editor
		if (game.modules.get("acelib")?.active) {
			// Create an editor
			newTextBox = document.createElement("div");
			editor = ace.edit(newTextBox);

			// Set to the default options
			editor.setOptions(ace.userSettings);

			// Set to JavaScript mode
			editor.session.setMode("ace/mode/javascript");

			// Copy the value from the old textbox into the Ace Editor
			editor.setValue(oldTextBox.value);

			// After a short wait (to make sure the editor is loaded), beautify the editor contents
			setTimeout(() => editor.execCommand("beautify"), 500);

			// Hide annotations
			editor.getSession().on("changeAnnotation", debounce(() => editor.getSession().setAnnotations(), 1));
		} else {
			// Otherwise create new textarea
			newTextBox = document.createElement("textarea");

			// Copy the value from the old textbox into the new one
			newTextBox.value = oldTextBox.value;
		};

		// Don't show the old textbox
		oldTextBox.style.display = "none";

		// Give the editor some height
		newTextBox.style.height = "20em";

		// Make the editor take up the full width
		oldTextBox.parentElement.style.flex = "100%";

		// Insert the new textbox right after the old one
		oldTextBox.after(newTextBox);

		if (game.modules.get("acelib")?.active) {
			// Update whenever the ace editor changes
			editor.on("change", () => {
				// Copy the value from the ace editor to the old textbox
				oldTextBox.value = editor.getValue();
			});
		} else {
			// Update whenever the new textbox changes
			newTextBox.addEventListener("change", () => {
				// Copy the value from the new textbox to the old one
				oldTextBox.value = newTextBox.value;
			});
		};

		// Create mapping select menu
		const mappingSelect = document.createElement("select");
		mappingSelect.style.margin = "10px 0";
		oldTextBox.parentNode.before(mappingSelect);

		// Browse and get list of included mapping files
		FilePicker.browse("data", "modules/pdf-sheet/mappings", { extensions: [".mapping"] })
			.then(results => {
				// Add the default option first
				results.files.unshift("");

				// Add options for each included mapping
				results.files.forEach(name => {
					// Create the option
					const option = document.createElement("option");
					mappingSelect.append(option);

					// Add just the name of the system as the text
					name = name.replace(".mapping", "").replace("modules/pdf-sheet/mappings/", "");
					option.innerHTML = name;
				});
			});

		// Add an event listener
		mappingSelect.addEventListener("change", async () => {
			// Fetch selected mapping if not empty
			const mapping = mappingSelect.value ?
				await fetch(`/modules/pdf-sheet/mappings/${mappingSelect.value}.mapping`)
					.then(response => response.text())
				: "";

			// Copy the mapping to the old text box
			oldTextBox.value = mapping;
			if (game.modules.get("acelib")?.active) {
				// Copy the mapping to the ace editor
				editor.setValue(mapping);
			} else {
				// Copy the mapping to the new textbox
				newTextBox.value = mapping;
			};
		});
	};
});

// Add button to Actor Sheet for opening app
Hooks.on("getActorSheetHeaderButtons", (sheet, buttons) => {
	// If this is not a player character sheet, return without adding the button
	if (!["character", "PC"].includes(sheet.actor.type)) return;

	buttons.unshift({
		label: "Export to PDF",
		class: "export-pdf",
		icon: "fas fa-file-export",
		onclick: () => {
			// Open Config window
			new Pdfconfig(sheet.actor).render(true)

			// Bring window to top
			Object.values(ui.windows).filter(window => window instanceof Pdfconfig)[0]?.bringToTop();
		}
	});
});

class Pdfconfig extends FormApplication {

	constructor(actor) {
		super();
		this.actor = actor;
		this.currentBuffer;
	};

	/** The module's ID */
	static ID = "pdf-sheet";

	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			template: "modules/pdf-sheet/templates/module.hbs",
			id: "pdf-sheet",
			height: window.innerHeight * 7 / 8,
			width: window.innerWidth > 1000 ? window.innerWidth * 1 / 4 : 400,
			resizable: true,
			title: "Export to PDF"
		});
	};

	/** @override */
	activateListeners() {
		document.getElementById("pdf-upload").addEventListener("change", event => {
			var file = event.target.files[0];
			var reader = new FileReader();
			reader.onload = ev => this.onFileUpload(ev.target.result);
			reader.readAsArrayBuffer(file);
		});

		document.getElementById("pdf-download").addEventListener("click", event => {
			event.preventDefault();
			this.download(this.currentBuffer);
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
		// Get Actor data
		const actor = this.actor;

		// Begin grouping logs
		console.group("PDF Sheet")
		// Log Actor Data
		console.log("Actor Data:", actor);
		// Log all PDF fields
		console.log("PDF fields:", pdfFields);

		// Get mapping from settings
		let mapping = game.settings.get(Pdfconfig.ID, "mapping")

		// Parse dynamic keys
		mapping = mapping.replaceAll("@", "actor.data.");

		// Log un-evaluated mapping
		console.log("Raw mapping:", mapping)

		// Try to deserialize mapping
		try {
			// Return as evaluated JavaScript with the actor as an argument
			mapping = Function(`"use strict"; return function(actor) { return ${mapping} };`)()(actor);
		} catch (err) {
			// End console group
			console.groupEnd();
			// Close the application
			this.close();

			// Alert if invalid
			ui.notifications.error(`PDF Sheet | Invalid mapping JavaScript Object. See the <a href="https://github.com/arcanistzed/pdf-sheet/blob/main/README.md">README</a> for more info.`);

			// Evaluate the JS again to throw the error
			Function(`"use strict"; return function(actor) { return ${mapping} };`)()(actor);
		};

		// Log parsed mapping
		console.log("Parsed mapping:", mapping);
		// Close log grouping
		console.groupEnd();

		// Loop through each key
		Object.keys(pdfFields).forEach(pdfFieldKey => {

			// Create row
			const row = document.createElement("li");

			// Create label
			const label = document.createElement("label");
			label.innerText = `${pdfFieldKey}: `;
			label.htmlFor = pdfFieldKey;

			// Insert label
			row.prepend(label);
			inputForm.appendChild(row);

			pdfFields[pdfFieldKey].forEach((field, i) => {
				if ((field.type === "radio") && field.options) {
					const fieldSet = document.createElement("fieldset");
					fieldSet.id = pdfFieldKey;

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

				// Create an input
				const input = document.createElement(
					field.type === "select" ? "select" :
						field.type === "string" ? "textarea" :
							"input"
				);
				input.setAttribute("data-idx", i);
				input.setAttribute("data-key", pdfFieldKey);
				input.id = pdfFieldKey;

				// Make a checkbox if the type is boolean
				if (field.type === "boolean") {
					input.setAttribute("type", "checkbox");

					// Make a drop down menu if the type is select and it has options
				} else if ((field.type === "select") && field.options) {

					field.options.forEach((value) => {

						const option = document.createElement("option");
						option.innerText = value;
						option.setAttribute("value", value);
						input.appendChild(option);
					});
				};
				row.appendChild(input); // Add to DOM

				// Add values from character sheet
				// Loop through all entries in the mapping
				mapping.forEach(entry => {
					// Check if the current field in the PDF matches an entry in the mapping
					if (pdfFieldKey.trim() == entry.pdf) {
						// Set the input to what is on the character sheet
						if (field.type === "boolean") { input.checked = entry.foundry } // If it's a checkbox
						else if (field.type === "string") { input.innerHTML = entry.foundry } // If it's a textarea
						else { input.setAttribute('value', entry.foundry) }; // If it's anything else
					};
				});
			});
		});
	};

	/** Get values and download PDF */
	download(buffer) {
		const fieldList = document.getElementById("fieldList");
		const fields = {};
		fieldList.querySelectorAll("input, textarea, select").forEach((input) => {
			if ((input.getAttribute("type") === "radio") && !input.checked) {
				return;
			};

			const key = input.getAttribute("data-key");
			if (!fields[key]) {
				fields[key] = [];
			};
			const index = parseInt(input.getAttribute("data-idx"), 10);

			const value = (
				input.type === "textarea" ? input.innerHTML :
					input.getAttribute("type") === "checkbox" ? input.checked :
						input.value
			);
			fields[key][index] = value;
		});

		const filled_pdf = pdfform(minipdf).transform(buffer, fields);

		const blob = new Blob([filled_pdf], { type: "application/pdf" });
		saveAs(blob, "character-sheet.pdf");
	};

	/** Manage new PDF upload */
	onFileUpload(buffer) {
		this.currentBuffer = buffer;
		this.createForm(this.currentBuffer);

		document.getElementById("pdf-header").setAttribute("style", "display: none");
		document.getElementById("pdf-download").style.display = "block";
	};

	async _updateObject(...args) {
		console.log(...args);
	};
};
