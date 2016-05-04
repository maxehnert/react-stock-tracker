var Xray = require("x-ray");
var xray = new Xray({
  filters: {
    trim: function(value) {
      return typeof value === 'string' ? value.trim() : value;
    }
  }
});

// const tickerScrape = (ticker, expiration) => {
const tickerScrape = (ticker) => {

  var expiration = '1464307200';
  console.log(expiration);

 return xray(`http://finance.yahoo.com/q/op?s=${ticker}+Options&date=${expiration}`, {
    stockLast: xray('.time_rtq_ticker span'),
    allExpiration: xray('.Start-0 option',
        [{
        unixEpoch: '@value',
        readableValue: ''
      }]),
    currentExpiration: [expiration],
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
  // .write('results.json');
  // .stream()
  ((err, data) => {
    console.log('exp', expiration); // this works
    if (data) {
      // console.log(data);
      return data;
    } else {
      return err;
      console.log(err);
    }
  }).stream()
};

const loopExp = (ticker) => {
  console.log('ticker', ticker);
  xray(`http://finance.yahoo.com/q/op?s=${ticker}+Options`, {
    allExpiration: xray('.Start-0 option',
      [{
        value: '@value'
      }])
  })
  ((err, obj) => {
    console.log(obj);
    return obj.allExpiration.map((res) => tickerScrape(ticker, res.value));
  })
};
// loopExp('FB');

module.exports = {
  loopExp: loopExp,
  tickerScrape: tickerScrape,
};
