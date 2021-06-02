// Copyright (c) 2021 Satvik Reddy

//
// Upload and Delete functions. Run on button clicks
//
function uploadImage() {
  const files = getFiles();
  if (files.length < 1) {
    return;
  }

  const form = createForm(files[0]);

  sendImage(form).then((data) => {
    setImageSrc(data.url);
    setLabel(data.url);
    clearFileInput();
  });
}

function deleteImage() {
  const url = getUrl();

  sendDelete(url).then(() => {
    setImageSrc("");
    setLabel("");
    clearInput();
  });
}

//
// Util functions
//
function getFiles() {
  const files = document.getElementById("imageInput").files;

  return files;
}

function createForm(file) {
  const form = new FormData();
  form.append("file", file);

  return form;
}

function clearFileInput() {
  const input = document.getElementById("imageInput");
  input.value = null;
}

async function sendImage(form) {
  const res = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  return data;
}

function setImageSrc(url) {
  const image = document.getElementById("imageView");
  image.src = url;
}

function setLabel(url) {
  const label = document.getElementById("imageLabel");
  label.innerText = url;
}

function getUrl() {
  const input = document.getElementById("urlInput");
  return input.value;
}

async function sendDelete(url) {
  const res = await fetch("http://localhost:8000/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  });

  const data = await res.json();
  return data;
}

function clearInput() {
  const input = document.getElementById("urlInput");
  input.value = "";
}
