const express = require('express'),
      app = express(),
      request = require('request');

app.get('/api/rates', (req, res) => {
    // url format
    // http://localhost:7070/api/rates?base=CZK&currency=EUR,GBP,USD
    let queryParams = req.query;

    if(queryParams && Object.keys(queryParams).length >= 1) {
        request(`https://api.exchangeratesapi.io/latest?base=${queryParams.base}&symbols=${queryParams.currency}`, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                let finalResponse = {};
                finalResponse["results"] = JSON.parse(body);
                return res.send(finalResponse);
            }else {
                // error message is there's problem with request
                return res.status(500).send(`${error}: It seems there's a problem with your request. Check your API request url again.`);
            }
        });
    }else {
        // error message if query parameters is not supplied
        return res.status(500).send('There are no query parameters in your request');
    }
}); 

let port = process.env.PORT || 7070;
app.listen(port, () => console.log(`Server started at http://localhost:${port}`));