// Element selection
const input = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const downloadBtn = document.getElementById("download-btn");
const clearBtn = document.getElementById("clear-btn");
const imgBox = document.getElementById("imgBox");
const qrImg = document.getElementById("qr-img");

// QR API (uses a lowercase x in size)
const makeQrUrl = (data, size = 300) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    data
  )}`;

// Generate QR
function generateQR() {
  const value = input.value.trim();

  if (!value) {
    // Shake the input briefly
    input.classList.add("error");
    setTimeout(() => input.classList.remove("error"), 1000);
    return;
  }

  // Disable while "loading"
  generateBtn.disabled = true;
  downloadBtn.disabled = true;

  const url = makeQrUrl(value, 300);
  qrImg.onload = () => {
    imgBox.classList.add("show-img");
    generateBtn.disabled = false;
    downloadBtn.disabled = false;
  };
  qrImg.onerror = () => {
    alert("Failed to generate QR. Please try again.");
    generateBtn.disabled = false;
  };

  qrImg.src = url;
}

// Download PNG
function downloadQR() {
  // Create a temporary link to download current QR image
  const link = document.createElement("a");
  link.href = qrImg.src;
  link.download = "qr-code.png";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

// Clear UI
function clearAll() {
  input.value = "";
  imgBox.classList.remove("show-img");
  qrImg.removeAttribute("src");
  downloadBtn.disabled = true;
  input.focus();
}

// Wire up events
generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);
clearBtn.addEventListener("click", clearAll);

// Enter key to generate
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") generateQR();
});

// Start with focus on input
window.addEventListener("load", () => input.focus());
