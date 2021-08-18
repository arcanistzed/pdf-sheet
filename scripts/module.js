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
		document.getElementById("pdf-upload").addEventListener("change", event => {
			var file = event.target.files[0];
			var reader = new FileReader();
			reader.onload = ev => this.onFileUpload(file.name, ev.target.result);
			reader.readAsArrayBuffer(file);
		});

		document.getElementById("pdf-download").addEventListener("click", event => {
			event.preventDefault();
			this.fillFields(currentBuffer);
		});
	};

	listInputs(buffer) {
		const inputForm = document.getElementById("fieldList");

		// Empty input form
		let child;
		while ((child = inputForm.lastChild)) {
			inputForm.removeChild(child);
		};

		const pdfFields = pdfform(minipdf).list_fields(buffer);

		const rawMap = [
			{ "pdf": "CharacterName", "foundry": "@name", "type": "string" },
			{ "pdf": "Check Box 11", "foundry": "@data.abilities.str.proficient", "type": "string" },
		];

		const actorData = this.actor.data;
		console.log(actorData)

		rawMap.forEach(entry => {
			// Does this entry contain a dynamic key
			if (entry.foundry.includes("@")) {
				let paramArray = entry.foundry.slice(1).split(".");

				let current = actorData;
				paramArray.forEach(param => current += `['${param}']`)

				console.log(current);
			} else {

			};
		});

		console.log("pdf fields:", pdfFields);

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

				if (field.type === "boolean") {

					input.setAttribute("type", "checkbox");

				} else if (field.type === "string") {

					//input.setAttribute('value',);

				} else if ((field.type === "select") && field.options) {

					field.options.forEach((value) => {

						let option = document.createElement("option");
						option.innerText = value;
						option.setAttribute("value", value);
						input.appendChild(option);
					});
				};
				row.appendChild(input);
			});
		};
	};

	fillFields(buffer) {
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

	onFileUpload(filename, buffer) {
		currentBuffer = buffer;
		this.listInputs(currentBuffer);

		document.getElementById("pdf-upload").setAttribute("style", "display: none");
		document.getElementById("pdf-download").removeAttribute("disabled");
	};
};
