const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('fileElem');
const fileList = document.getElementById('file-list');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

// Highlight the drop area when the file is over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  fileInput.files = files; // Add files to input element
  showFiles(files);
}

// Display the file names
function showFiles(files) {
  fileList.innerHTML = "";
  for (let i = 0; i < files.length; i++) {
    let li = document.createElement('li');
    li.textContent = files[i].name;
    fileList.appendChild(li);
  }
}

// Handle the click on the label to open file selection dialog
document.querySelector('.upload-label').addEventListener('click', () => {
  fileInput.click();
});
function copyToClipboard(elementId) {
    var copyText = document.getElementById(elementId);
    navigator.clipboard.writeText(copyText.textContent)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }