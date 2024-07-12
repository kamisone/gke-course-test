const http = require("node:http");
const {Storage} = require("@google-cloud/storage");

// const profiler = require('@google-cloud/profiler');

const port = 8080;

// process.on('SIGTERM', function () {
//   console.info('The SIGKILL signal will be sent after 30s, so do last cleaning !');
// });

const server = http
  .createServer((req, res) => {
    const { headers, method, url } = req;
    // res.setHeader("Content-Type", "text/html; charset=UTF-8");
    res.statusCode = 200;

    generateV4UploadSignedUrl()
    .then((data) => {
      const [url] = data;
      // console.log('ddddda: ', data);
      res.end(url);
    })


    
  })
  .listen(port, "0.0.0.0", undefined, () => {
    console.log("listening on: ", port);
  });

function formatHeaders(headers) {
  if (typeof headers === "undefined") return "empty";

  let headersContent = "<pre>";
  for (let key of Object.keys(headers)) {
    headersContent = headersContent.concat(`
            <p>${key}: ${headers[key]}</p>
        `);
  }
  headersContent = headersContent.concat("</pre>");
  return headersContent;
}

module.exports = server;

const storage = new Storage();

async function generateV4UploadSignedUrl() {
  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: application/octet-stream header.
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 60000, // 1 minutes
    // contentType: "application/octet-stream",
  };

  // Get a v4 signed URL for uploading file
  return storage
    .bucket("my-first-bucket-winw2")
    .file("sample-pdf.png")
    .getSignedUrl({ ...options });
}


// .then((data) => {
//     console.log('succeedddd: ',data);
// })
// .catch((err) => {
//     console.log('error: ', err);
// })

// ################### profiler ###################
// profiler.start({
//   projectId: 'iap-project-mine',
//   serviceContext: {
//     service: 'my-first-profiler-service',
//     version: '1.1'
//   }
// });

// function heap_func() {
//   let arr = Array(1e6).fill('some string here');
//   arr.reverse();
//   console.log('my test here');
// }

// (function ecf() {
//   setTimeout(heap_func, 1000);
// })()
