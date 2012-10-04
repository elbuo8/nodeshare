// Generated by CoffeeScript 1.3.3
(function() {
  var apikey, child, exec, fs, params, run, url;

  require('coffee-script');

  fs = require('fs');

  exec = (require('child_process')).exec;

  child = null;

  apikey = 'Arsf53GD8SbClNKJbB1cXz';

  url = 'https://www.filepicker.io/api/path/storage/';

  params = process.argv;

  params.shift();

  params.shift();

  if (params.length > 1) {
    run = 'tar cvzf tar.tgz ';
    params.forEach(function(val, index, array) {
      run += val + " ";
      return fs.stat(val, function(error, stats) {
        if (stats.isFile() === !true) {
          console.log("Incorrect params");
          return process.kill();
        }
      });
    });
    child = exec(run, function(error, stdout, stderr) {
      if (!error) {
        run = 'curl -F \"fileUpload=@tar.tgz\" -F \"apikey=' + apikey + '\" ' + url + 'files.tgz';
        return child = exec(run, function(error, stdout, stderr) {
          var parsed;
          parsed = JSON.parse(stdout);
          console.log("Sharing link is: " + parsed.data[0].url);
          run = 'rm tar.tgz';
          return child = exec(run, function(error, stdout, stderr) {});
        });
      }
    });
  } else if (params.length === 1) {
    fs.stat(params[0], function(error, stats) {
      if (stats.isFile() === true) {
        run = 'curl --progress-bar -F \"fileUpload=@' + params[0] + '\" -F \"apikey=' + apikey + '\" ' + url + params[0];
        return child = exec(run, function(error, stdout, stderr) {
          var parsed;
          parsed = JSON.parse(stdout);
          return console.log("Sharing link is: " + parsed.data[0].url);
        });
      } else if (stats.isDirectory() === true) {
        run = 'tar cvzf ' + params[0] + '.tgz ' + params[0];
        return child = exec(run, function(error, stdout, stderr) {
          if (!error) {
            run = 'curl --progress-bar -F \"fileUpload=@' + params[0] + '.tgz\" -F \"apikey=' + apikey + '\" ' + url + params[0];
            return child = exec(run, function(error, stdout, stderr) {
              var parsed;
              parsed = JSON.parse(stdout);
              return console.log("Sharing link is: " + parsed.data[0].url);
            });
          }
        });
      } else {
        return console.log("Invalid file || dir");
      }
    });
  } else {
    console.log("sharefile file || dir || file file");
  }

}).call(this);
