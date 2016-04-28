var Xray = require("x-ray");
var xray = new Xray();

// xray('http://finance.yahoo.com/q/op?s=FB+Options', '.quote-table-overflow tr td a',
//   [{
//     option: '', //innerHTML
//     href: '@href',
//     prices : xray(
//       '.quote-table-overflow tr td .option-entry'
//     )
//   }]
// )
// .write('results.json');

xray('http://finance.yahoo.com/q/op?s=FB+Options', {
  stockLast: xray('.time_rtq_ticker span'),
  expiration: xray('.Start-0 option'),
  calls: xray('#optionsCallsTable .quote-table-overflow tr', 
    [{
      strikeValue: xray('td:nth-child(1) a'),
      last: xray('td:nth-child(3)'),
      bid: xray('td:nth-child(4)'),
      ask: xray('td:nth-child(5)'),
      change: xray('td:nth-child(6)'),
      percentChange: xray('td:nth-child(7)'),
      volume: xray('td:nth-child(8)'),
      openInterest: xray('td:nth-child(9)'),
      impliedVolatility: xray('td:nth-child(10)')
    }]
  ),
  puts: xray('#optionsPutsTable .quote-table-overflow tr', 
    [{
      strikeValue: xray('td:nth-child(1) a'),
      last: xray('td:nth-child(3)'),
      bid: xray('td:nth-child(4)'),
      ask: xray('td:nth-child(5)'),
      change: xray('td:nth-child(6)'),
      percentChange: xray('td:nth-child(7)'),
      volume: xray('td:nth-child(8)'),
      openInterest: xray('td:nth-child(9)'),
      impliedVolatility: xray('td:nth-child(10)')
    }]
  ),
})
.write('results.json');