'use strict'

import gulp from 'gulp'
import * as migrate from './scripts/migrate'

const arg = (argList => {

    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {

            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;

        }
        else {

            // argument name
            curOpt = opt;
            arg[curOpt] = true;

        }

    }

    return arg;

})(process.argv);

gulp.task('default', function(cb) {
    migrate.push(arg.u)
        .then( (resp) => {
            cb(null);
        }, (err) => {
            cb(err)
        })
})

gulp.task('build', function(cb) {
    migrate.build()
        .then( (resp) => {
            cb(null);
        }, (err) => {
            cb(err)
        })
})

gulp.task('buildDev', function(cb) {
    migrate.buildDev()
        .then( (resp) => {
            cb(null);
        }, (err) => {
            cb(err)
        })
})

gulp.task('push', function(cb) {

    migrate.push(arg.u)
        .then( (resp) => {
            cb(null);
        }, (err) => {
            cb(err)
        })

})

gulp.task('deploy', gulp.series('build', 'push'))
gulp.task('deployDev', gulp.series('buildDev', 'push'))

