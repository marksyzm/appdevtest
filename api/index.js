var http = require('http'),
    fs = require('fs'),
    chance = new require('chance')(),
    send = require('send'),
    random = [];


for (var i = 0; i !== 1000000; i++) {
    random.push(chance.sentence({words:5}));
}

fs.writeFile('random.json',JSON.stringify({
    random: random
}),null, function(e) {
    http.createServer(function(req, res) {
        send(req, 'random.json')
            .on('headers', function(r) {
                r.setHeader('Content-Type', 'application/json');
                r.setHeader('Access-Control-Allow-Origin','*');
                r.setHeader('Access-Control-Allow-Methods','GET,OPTIONS');
                r.setHeader('Access-Control-Allow-Headers','Range,Accept,Origin');
                r.setHeader('Access-Control-Expose-Headers','Content-Range');
            })
            .pipe(res);
    }).listen(8900);
});
