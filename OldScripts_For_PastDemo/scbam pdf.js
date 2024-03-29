const char_set =
  "abcdefghijlkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function max_random_number(max) {
  return Math.floor(Math.random() * max);
}

function getRandomID(length) {
  let random_string = "";
  for (let i = 0; i < length; i++) {
    random_string += char_set[max_random_number(char_set.length - 1)];
  }
  return random_string;
}

function extract(request, response) {
  //let $ = response.load(request);
  $ = response.body;

  //var url = decodeURI("https://www.jupiteram.com/ksys-document-library/services/documents/retrieveDocument/?token=4ff7aa78-fe0a-40d0-9396-2f7653735e89&amp;clientCode=922e8628d710355917e2e4fe54fe9d4c6d898ea9&amp;filename=Jupiter%20Asian%20Income%20Fund%20Jupiter%20Asian%20Income%20Fund%20Fund%20In%20Focus.pdf");
  var url = decodeURI(request.url);
  url = url.replaceAll("&amp;", "&").replace(".pdf", "");

  function getSearchParameters() {
    var prmstr = url.substring(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
  }

  function transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1];
    }
    return params;
  }

  var params = getSearchParameters(); //params.filename

  //var id = url.replaceAll(/[.:/&?=%]/g, "_").substring(0, 54);
  var title =  $("title").text() || $("h1").text() || params.filename;
  var description = $("body").text().substring(0, 7000);

  //if (title.length <= 4) {
  if (title == null) {
    title = "Marvin PDF Title";
  }

   //asset_type
      const assetClass = [
        "Alternatives",
        "Shares",
        "Bonds",
        "Multi-asset",
        "Multi-manager",
    ];
    const assetClassRandom = Math.floor(Math.random() * assetClass.length);

  return [
    {
      id: getRandomID(20), //id,
      file_type: "pdf",
      type: "PDF",
      name: title,
      description: description,
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3vXQh9jigZQrAlcaO-sVlEdJV1ADgDDKLCiA2pjwUvQ&s",
      body_text: "marvin body text",
      url: url,
      investor_type: "marvin investorType",
      body_text: "marvin body_text",
      asset_class: (assetClassRandom, assetClass[assetClassRandom]),
      product_type: "marvin product_type",
      document_type: "PDF",
    },
  ];
}
