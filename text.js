/**
 * Created by qqy on 15/11/30.
 */
console.log('Current directory: ' + process.cwd());
var fs= require("fs");
//fs.writeFile(filename, data, callback)
//数据参数可以是string或者是Buffer,编码格式参数可选，默认为"utf8"，回调函数只有一个参数err。
fs.writeFile('test1.txt', 'Hello Node', function (err) {
    if (err) throw err;
    console.log('Saved successfully'); //文件被保存
});

fs.appendFile('test.txt', 'data to append', function (err) {
    if (err) throw err;

    //数据被添加到文件的尾部
    console.log('The "data to append" was appended to file!');
});

fs.exists('test0.txt', function (exists) {
    console.log(exists ? "yes" : "no");
});

fs.rename('旧文件','新文件',function (err){
    if (err) throw err;
    console.log('Successful modification,');
});

//移动文件也是我们经常会遇见的，可是fs没有专门移动文件的函数，但是我们可以通过rename函数来达到移动文件的目的
fs.rename(oldPath,newPath,function (err) {
    if (err) throw err;
    console.log('renamed complete');
});

//fs.readFile(文件,编码,回调函数);
fs.readFile('文件名', function (err, data) {
    if (err) throw err;
    console.log(data);
});

//fs.unlink(文件,回调函数(err));
fs.unlink('文件', function(err) {
    if (err) throw err;
    console.log('successfully deleted');
});

//参数
//路径：新创建的目录。
//权限：可选参数，只在linux下有效，表示目录的权限，默认为0777，
// 表示文件所有者、文件所有者所在的组的用户、所有用户，都有权限进行读、写、执行的操作。
//回调函数：当发生错误时，错误信息会传递给回调函数的err参数。
fs.mkdir('路径','权限',function(err){});

//删除目录也是必不可少的功能，rmdir函数可以删除指定的目录
//fs.rmdir(路径，回调函数(err));
fs.rmdir(path, function(err) {
    if (err) throw err;
    console.log('ok');
});

//读取目录下所有的文件
//回调函数 (callback) 接受两个参数 (err, files)
// 其中 files 是一个存储目录中所包含的文件名称的数组，数组中不包括 '.' 和 '..'。
fs.readdir('目录',function(err,files){});