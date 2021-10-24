import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "My Bank API",
        description: "Description",
    },
    host: "localhost:3000",
    schemes: ["http"],
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

swaggerAutogen()(outputFile, endpointsFiles, doc);

// swaggerAutogen()(outputFile, endpointsFiles).then(async () => {
//     await import("./index.js");
// });
