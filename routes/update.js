let express = require('express');
let router = express.Router();
let fs = require('fs');
let multer = require('multer');
let upload = multer({dest: 'uploads/'});
let md5 = require('md5');
let {ResUtils} = require('../utils/server/Utils');
router.post('/html', upload.single('file'), function (req, res, next) {
    let file = req.file;
    let target = file.originalname;
    if (require('../secret/keys.json').update_password === md5(req.body.password || '')) {
        fs.rename(file.path, `uploads/${target}`, function (err) {
            if (err) {
                console.error(err);
                ResUtils.error(res, err.message, -1);
            } else {
                let shell = require('shelljs');
                shell.exec(`cd uploads && tar -xvf ${target} && rm -rf ../src && mv src ../ && rm ${target} && cd .. && npm run fixAndMove`, function (code, stdout, stderr) {
                    if (stdout) {
                        console.group('stdout');
                        console.log(stdout);
                        console.groupEnd();
                        ResUtils.success(res, 'success', {file: target});
                    } else if (stderr) {
                        console.group('stderr');
                        console.log(stderr);
                        console.groupEnd();
                        ResUtils.error(res, stderr, -2);
                    }
                });
            }
        });
    } else {
        ResUtils.error(res, 'password 错误', -1);
    }
});
module.exports = router;
