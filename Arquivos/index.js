import fs from "fs";

fs.writeFile("teste.txt", "bla bla bla", function (err) {
  if (err) {
    console.log(err);
  } else {
    // fs.appendFile("teste.txt", "")

    console.log("Sucesso Write!");
    fs.readFile("teste.txt", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  }
});
