const body = document.querySelector("body"),
	sidebar = body.querySelector(".sidebar"),
	toggle = body.querySelector(".toggle"),
	searchBtn = body.querySelector(".search-box"),
	modeSwitch = body.querySelector(".toggle-switch"),
	modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
	sidebar.classList.toggle("close");
});
// searchBtn.addEventListener("click", () => {
//   sidebar.classList.toggle("close");
// });

modeSwitch.addEventListener("click", () => {
	body.classList.toggle("dark");

	if (body.classList.contains("dark")) {
		modeText.innerText = "Light Mode";
	} else {
		modeText.innerText = "Dark Mode";
	}
});

// Upload Section
const form = document.querySelector("form");
const submitButton = document.getElementById("submitButton");
(fileInput = document.querySelector(".file-input")),
	(progressArea = document.querySelector(".progress-area")),
	(uploadedArea = document.querySelector(".uploaded-area"));
form.addEventListener("click", () => {
	fileInput.click();
	submitButton.addEventListener("click", () => {
		form.submit();
	});

	const button = document.querySelector(".button");
	button.addEventListener("click", (e) => {
		e.preventDefault;
		button.classList.add("animate");
		setTimeout(() => {
			button.classList.remove("animate");
		}, 600);
	});

	fileInput.onchange = ({ target }) => {
		let file = target.files[0];
		if (file) {
			let fileName = file.name;
			if (fileName.length >= 12) {
				let splitName = fileName.split(".");
				fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
			}
			uploadFile(fileName);
		}
	};
	function uploadFile(name) {
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "php/upload.php");
		xhr.upload.addEventListener("progress", ({ loaded, total }) => {
			let fileLoaded = Math.floor((loaded / total) * 100);
			let fileTotal = Math.floor(total / 1000);
			let fileSize;
			fileTotal < 1024
				? (fileSize = fileTotal + " KB")
				: (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
			let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
			uploadedArea.classList.add("onprogress");
			progressArea.innerHTML = progressHTML;
			if (loaded == total) {
				progressArea.innerHTML = "";
				let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
				uploadedArea.classList.remove("onprogress");
				uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
			}
		});
		let data = new FormData(form);
		xhr.send(data);
	}
});
