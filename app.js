var Xray = require("x-ray");
var xray = new Xray({
  filters: {
    trim: function(value) {
      return typeof value === 'string' ? value.trim() : value;
    }
  }
});

xray('http://finance.yahoo.com/q/op?s=FB+Options', {
  stockLast: xray('.time_rtq_ticker span'),
  expiration: xray('.Start-0 option'),
  calls: xray('#optionsCallsTable .quote-table-overflow tr', 
    [{
      strikeValue: xray('td:nth-child(1) a  | trim'),
      last: xray('td:nth-child(3) | trim'),
      bid: xray('td:nth-child(4) | trim'),
      ask: xray('td:nth-child(5) | trim'),
      change: xray('td:nth-child(6) | trim'),
      percentChange: xray('td:nth-child(7) | trim'),
      volume: xray('td:nth-child(8) | trim'),
      openInterest: xray('td:nth-child(9) | trim'),
      impliedVolatility: xray('td:nth-child(10) | trim')
    }]
  ),
  puts: xray('#optionsPutsTable .quote-table-overflow tr', 
    [{
      strikeValue: xray('td:nth-child(1) a | trim'),
      last: xray('td:nth-child(3) | trim'),
      bid: xray('td:nth-child(4) | trim'),
      ask: xray('td:nth-child(5) | trim'),
      change: xray('td:nth-child(6) | trim'),
      percentChange: xray('td:nth-child(7) | trim'),
      volume: xray('td:nth-child(8) | trim'),
      openInterest: xray('td:nth-child(9) | trim'),
      impliedVolatility: xray('td:nth-child(10) | trim')
    }]
  ),
})
.write('results.json');