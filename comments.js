// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    fs.readFile(filename, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

// Path: comments.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <form action="comment" method="POST">
        <input type="text" name="comment" placeholder="Enter your comment">
        <button type="submit">Submit</button>
    </form>
</body>
</html>

// Path: comment.js
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (q.pathname == '/comment') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var post = qs.parse(body);
            fs.appendFile('comments.txt', post.comment + '\n', function(err) {
                if (err) throw err;
                console.log('Comment saved!');
            });
        });
    }
    fs.readFile('comments.html', function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

// Path: comments.txt
// File is empty

// Run the server
// node comments.js
// Open browser and go to http://localhost:8080
// Enter comment and click submit
// Check comments.txt file, the comment should be saved

// Path: comments.txt
// Comment 1