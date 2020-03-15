var exec = require('child_process').exec;

exec('npm run build', (error) => {
    if (!error) {
        console.log('npm run build is finished');
        exec('rm -rf /srv/cwstage && scp -r ./dist/* /srv/cwstage', (err) => {
            if (!err) {
                console.info('finished');
            } else {
                console.log(err);
            }
        })
    } else {
        console.log('npm run build is error');
        console.log(error);
    }
});

