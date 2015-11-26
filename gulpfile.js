var gulp = require('gulp'),
    compass = require('gulp-compass'),
    nodemon = require('gulp-nodemon');
//, jshint = require('gulp-jshint')

//gulp.task('lint', function () {
//    gulp.src('./**/*.js')
//        .pipe(jshint())
//})

gulp.task('compass', function () {
    gulp.src('./public/sass/*.scss')
        .pipe(compass({
            config_file: './public/config.rb',
            css: './public/stylesheets',
            sass: './public/sass'
            //image: 'images'
            //javascript: 'javascript'
        }))
        .on('error', function (error) {
            // Would like to catch the error here
            console.log(error);
            this.emit('end');
        })
        //.pipe(minifyCSS())
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function () {
    gulp.watch('./public/sass/*.scss', ['compass']);
});

gulp.task('node', function () {
    nodemon({
        script: 'index.js'
        //, ext: 'html js'
        //, ignore: ['ignored.js']
        //, tasks: ['compass','watch']
    }).on('start', function () {
        console.log('restarted!')
    })
});

gulp.task('default', ['node', 'compass', 'watch']);
