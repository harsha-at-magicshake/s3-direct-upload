const imageForm = document.querySelector("#imageForm");
const imageInput = document.querySelector("#imageInput");

imageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = imageInput.files[0];

  // get secure url from our server
  const response = await fetch(
    `http://localhost:3000/auth/api/tasks/attachment-presigned-url?path=${file.name}&mode=put`
  ).then((res) => res.json());
  console.log(response);
  const url = response.data;
  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  // const imageUrl = url.split("?")[0];
  // console.log(imageUrl);

  const getUrlresponse = await fetch(
    `http://localhost:3000/auth/api/tasks/attachment-presigned-url?path=${file.name}&mode=get`
  ).then((res) => res.json());
  console.log(getUrlresponse);
  const getUrl = getUrlresponse.data;

  // post requst to my server to store any extra data

  const img = document.createElement("img");
  img.src = getUrl;
  document.body.appendChild(img);
});
