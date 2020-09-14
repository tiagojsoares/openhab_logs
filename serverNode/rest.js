var express = require("express");
var router = express.Router();
const http = require("http");

try {
  const options = {
    method: "GET",
    hostname: "192.168.1.9",
    port: "8080",
    path: "/static/ln_log_events.html",
    headers: {
      "user-agent": "vscode-restclient",
    },
  };
  var data = "";
  let dados = [];
  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      data = body.toString();
      let logs = (data = data.split("\n"));
      let arr_logs = [];
      let date_time_arr = [];


      for (let index = 0; index < logs.length; index++) {
        if (logs[index].includes("HL746")) {
          let temp = logs[index].split("HL746_");
          let time = logs[index].split(" ");
          let letTimeTemp = time[1].trim();

          let datetime = time[0] + " " + letTimeTemp;

          if (temp.length == 2) {
            temp[1] = temp[1].replace(
              "changed from UNDEF to ON",
              "mudou de UNDEF para ON"
            );
            temp[1] = temp[1].replace(
              "changed from NULL to UNDEF",
              "mudou de NULL para UNDEF"
            );
            temp[1] = temp[1].replace(
              "predicted to become ON",
              "previsto para se tornar ON"
            );
            temp[1] = temp[1].replace(
              "received command ON",
              "comando recebido ON"
            );
            temp[1] = temp[1].replace(
              "changed from NULL to UNDEF",
              "mudou de NULL para UNDEF"
            );
            temp[1] = temp[1].replace(
              "changed from NULL to UNDEF",
              "mudou de NULL para UNDEF"
            );
            temp[1] = temp[1].replace(
              "changed from UNDEF to OFF",
              "mudou de UNDEF para OFF"
            );
            temp[1] = temp[1].replace(
              "changed from OFF to ON",
              "mudou de OFF para ON"
            );
            temp[1] = temp[1].replace(
              "changed from ON to OFF",
              "mudou de ON para OFF"
            );

            let str = temp[1];

            str.split(",");

            if (logs[index].includes("STS")) {
              arr_logs.push(str);
              date_time_arr.push(datetime + " STS");
              dados.push(datetime + " #$ " + str);
            }

            if (logs[index].includes("CLD")) {
              arr_logs.push(str);
              date_time_arr.push(datetime + " CLD");
              dados.push(datetime + " #$ " + str);
            }
          }
        }
      }

      ////console.log(data.length);
    });
  });

  req.end();

  //gravando tarefas
  router.post("/", function (req, res) {
    console.log(res);
  });

  //Obtendo tarefas
  router.get("/", function (req, res) {
    let json =JSON.stringify(dados);
    json = JSON.parse(json);
    res.json(json);
    console.log(data.length);
  });

} catch (error) {

}



module.exports = router;
