var Request = require('request');
var fs = require("fs");

var op = process.argv[2];
var input = '';
var logContent = '';

for (var i = 3; i < process.argv.length; i++) {
    input = input + process.argv[i] + ' ';
}

input = input.trim();

if (op === 'random') {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(",");
        op = dataArr[0];
        input = dataArr[1].replace(/"/g, '');
        inputArgs(op, input);
    });
}

inputArgs(op, input);

function inputArgs(op, input) {
    if (op === 'movie-this') {
        if (input === '') {
            input = 'snatch';
        }
        Request('http://www.omdbapi.com/?t=' + input, function(error, response, body) {
            var movie = JSON.parse(body);
            console.log("Title: " + movie.Title, '\n',
            "Year: " + movie.Year, '\n',
            "IMDB Rating: " + movie.imdbRating, '\n',
            "Country: " + movie.Country, '\n',
            "Language: " + movie.Language, '\n',
            "Plot: " + movie.Plot, '\n',
            "Actors: " + movie.Actors);

            input = input.replace(/ /g, '_');
            input = input.replace(/:/g, '');

            console.log("Rotten Tomatoes URL: " + 'https://www.rottentomatoes.com/m/' + input + '\n');

            logContent = "\nTitle: " + movie.Title + '\n' + "Year: " + movie.Year + '\n' + 
                         "IMDB Rating: " + movie.imdbRating + '\n' + "Country: " + movie.Country + '\n' +
                         "Country: " + movie.Country + '\n' + "Language: " + movie.Language + '\n' + 
                         "Plot: " + movie.Plot + '\n' + "Actors: " + movie.Actors + '\n' +
                         "Rotten Tomatoes URL: " + 'https://www.rottentomatoes.com/m/' + input + '\n';
            logData(logContent);
        });
    }    
}

function logData(logContent) {
    fs.appendFile('log.txt', logContent, function(err) {
        if (err) {console.log(err);}
    });
}