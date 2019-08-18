const fs = require('fs');

module.exports = function (name) {
    var demopath = './project';
    var targetpath = './' + name;
    var arr = [];
    fs.mkdir(targetpath, function () {
        pusharr(demopath);
        arr.forEach(function (item,index) {
            console.log(item);
            (function (item) {
                    if (item[0] == 'file') {
                        fs.readFile(item[1], function (err, data) {
                            fs.writeFile(targetpath + '/' + item[1].replace('./project', '.'), data, function () {});
                        })
                    } else {
                        fs.mkdir(targetpath + '/' + item[1].replace('./project', '.'), function () {})
                    }
                })(item)
        })

        function pusharr(path) {
            var files = fs.readdirSync(path);
            files.forEach(function (itme, index) {
                var nowpath = path + '/' + itme;
                var stat = fs.statSync(nowpath);
                if (stat.isDirectory()) {
                    pusharr(nowpath)
                    arr.push(['dir', nowpath])
                } else {
                    arr.push(['file', nowpath])
                }
            })
        }
    })
}