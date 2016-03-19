var Xray = require("x-ray");
var xray = new Xray();

xray('http://finance.yahoo.com/q/op?s=FB+Options', '.quote-table-overflow tr td a',
  [{
    option: '', //innerHTML
    href: '@href',
    prices : xray(
      '.quote-table-overflow tr td .option-entry'
    )
  }]
)
.write('results.json');
