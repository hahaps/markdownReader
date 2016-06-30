var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var async = require('async');
var app = express();

var port = 8080;

var args = process.argv;
var dist = '/dist';

if(args.length >= 3) {
  port = args[2];
}

var dist_dir = path.join(__dirname, dist);
var dist_len = dist_dir.length;
var BASE_DOC = "/README.md";
var BASE_DIR = "/doc";

app.set('view engine', 'html');
app.use(express.static(dist_dir));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

function _check_directory(directory, callback) {
  fs.stat(directory, function(err, stats) {
    // Check if error defined and the error code is "not exists"
    if (err && err.errno === 34) {
      // Create the directory, call the callback.
      console.log("Directory %s not exist, create it", directory);
      fs.mkdir(directory, callback);
    } else if (err) {
      // Just in case there was a different error:
      console.log("Faied to locate directory %s", directory);
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

function _stat_file(file, callback) {
  fs.stat(file, function (err, stat) {
    if(err) {
      callback(err, null);
    } else if(stat.isFile()) {
      callback(null, {type: 1, file: file});
    } else if(stat.isDirectory()) {
      callback(null, {type: 0, file: file});
    } else {
      callback("error", null);
    }
  });
}

function _format_files(files, callback) {
  var all_files = [];
  var all_folders = [];

  async.map(files, _stat_file, function(err, stats) {
    if(err) {
      console.log("Failed to stat files as:", err);
      callback([], [])
      return false;
    }
    stats.forEach(function(stat) {
      if(stat.type) {
        all_files.push(stat.file);
      } else {
        all_folders.push(stat.file);
      }
    });
    callback(all_files, all_folders);
  });
}

function _record_files(files) {
  var menu = [];
  files = files || [];
  files.forEach(function(file) {
    var ext = path.extname(file);
    var name = path.basename(file, ext);
    menu.push({
      label: name,
      link: file.substring(dist_len) || BASE_DOC
    });
  });
  return menu;
}

function _record_folder(folder) {
  var name = path.basename(folder);
  return {
    label: name,
    folder: true,
    link: folder.substring(dist_len) || BASE_DIR
  }
}

function _get_menu(dir, callback) {
  var menu = [];
  fs.readdir(dir, function (err, files) {
    if(err) {
      console.log("Failed to read dir %s", dir);
      callback(err, null);
      return false;
    }
    files.forEach(function(file, index) {
      files[index] = path.join(dir, file);
    });
    _format_files(files, function(mds, dirs) {

      if(!dirs || !dirs.length) {
        menu = menu.concat(_record_files(mds));
        callback(null, {
          dir: dir,
          menu: menu
        });
        return true;
      }
      async.map(dirs, _get_menu, function(err, menus) {
        if(err) {
          menu = menu.concat(_record_files(mds));
          callback(null, {
            dir: dir,
            menu: menu
          });
          return false;
        }
        menus.forEach(function(m) {
          var folder = _record_folder(m.dir);
          folder.children = m.menu;
          menu.push(folder);
        });
        menu = menu.concat(_record_files(mds));
        callback(null, {
          dir: dir,
          menu: menu
        });
      });
    });
  });
}

function get_menu(dir, callback) {
  // First, check whether directory is exist.
  _check_directory(dir, function (err, exists) {
    if(err)
      throw (err);
    // Second, build and get menu.
    _get_menu(dir, callback);
  });
}


function _valid_name(name) {
  if((!name || name.indexOf(BASE_DIR) != 0) &&
     name != BASE_DOC) {
          return false;
  }
  return true;
}

function mkfolder(body, callback) {
  var dir = body.dir;
  if(!_valid_name(dir)) {
    callback("Bad dir " + dir);
    return false;
  }
  fs.mkdir(path.join(dist_dir, dir), callback);
}

function delfolder(body, callback) {
  var dir = body.dir;
  if(!_valid_name(dir)) {
    callback("Bad dir " + dir);
    return false;
  }
  fs.rmdir(path.join(dist_dir, dir), callback);
}

function update_folder_name(body, callback) {
  var dir = body.dir;
  var older_dir = body.old;
  if(!_valid_name(dir) || !_valid_name(older_dir)) {
    callback("Bad file path " + dir);
    return false;
  }
  dir = path.join(dist_dir, dir);
  older_dir = path.join(dist_dir, older_dir);
  fs.rename(older_dir, dir, callback);
}

function create_file(body, callback) {
  var file = body.file;
  var content = body.content || "";
  if(!_valid_name(file)) {
    callback("Bad file path " + file);
    return false;
  }
  file = path.join(dist_dir, file);
  fs.writeFile(file, content, {
    mode: 396
  }, callback);
}

function del_file(body, callback) {
  var file = body.file;
  if(!_valid_name(file)) {
    callback("Bad file path " + file);
    return false;
  }
  file = path.join(dist_dir, file);
  fs.unlink(file, callback);
}

function update_file(body, callback) {
  create_file(body, callback);
}

function update_file_name(body, callback) {
  var file = body.file;
  var older_file = body.old;
  if(!_valid_name(file) || !_valid_name(older_file)) {
    callback("Bad file path " + file);
    return false;
  }
  file = path.join(dist_dir, file);
  older_file = path.join(dist_dir, older_file);
  fs.rename(older_file, file, callback);
}

// All routes ==============================================
app.get('/', function (req, res) {
  res.send('index.html');
});

app.get('/menu', function (req, res) {
  get_menu(path.join(dist_dir, BASE_DIR), function(err, m) {
    if(err) {
      res.send({error: err}, 500);
    } else {
      console.log("Menu detail is:", m.menu);
      res.send(m.menu);
    }
  });
});

app.post('/folder', function (req, res) {
  mkfolder(req.body, function(err) {
    if(err) {
      console.log("Failed to create folder as:", err);
      res.send({err: err}, 500);
    } else {
      res.send({success: req.body});
    }
  });
});


app.post('/folder/update/name', function (req, res) {
  update_folder_name(req.body, function(err) {
    if(err) {
      console.log("Failed to update folder name as:", err);
      res.send({err: err}, 500);
    } else {
      res.send({success: req.body});
    }
  });
});

app.post('/folder/del', function (req, res) {
  delfolder(req.body, function(err) {
    if(err) {
      console.log("Failed to delete folder as:", err);
      res.send({err: err}, 500);
    } else {
      res.send({success: req.body});
    }
  });
});

app.post('/file', function (req, res) {
  create_file(req.body, function(err) {
    if(err) {
      console.log("Failed to create file as:", err);
      res.send({err: err}, 500);
    } else {
      res.send({success: req.body});
    }
  });
});

app.post('/file/del', function (req, res) {
  del_file(req.body, function(err) {
    if(err) {
      console.log("Failed to create file as:", err);
      res.send({err: err}, 500);
    } else {
      res.send({success: req.body});
    }
  });
});

app.post('/file/update', function (req, res) {
  update_file(req.body, function(err) {
    if(err) {
      console.log("Failed to update file as:", err);
      res.send({err: err}, 500);
    } else {
      res.send({success: req.body});
    }
  });
});

app.post('/file/update/name', function (req, res) {
  update_file_name(req.body, function(err) {
    if(err) {
      console.log("Failed to update file name as:", err);
      res.send({err: err}, 500);
    } else {
      res.send({success: req.body});
    }
  });
});

fs.rename


console.log("Start server with port port %s ...", port);
app.listen(port);
