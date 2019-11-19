<h3 align="center" style="margin: 30px 0 35px;">Shell Spawn</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/shell-spawn"><img alt="npm" src="https://img.shields.io/npm/v/shell-spawn"></a>
  <a href="https://raw.githubusercontent.com/AngusYang9/shell-spawn/master/LICENSE"><img alt="NPM" src="https://img.shields.io/npm/l/shell-spawn"></a>
</p>

<p align="center">
  🇬🇧 <a href="./README.md">English Introduce</a>
</p>

---

**执行一些 Shell，返回一个 Promise。**

在内部，这个库使用 [`spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) ，当 `verbose` 设置为 `true` 时，你可以在命令行中看到命令实时输出，所以不必等到进程退出以后才知道发生了什么（对于慢进程或长时间运行的进程很有用）。

注意：这个库不会强迫您使用任何特定的 Promise 实现，因为它使用的是定义为全局的 `Promise `。这样，您就可以使用任何符合  ES6 标准 Promise 的库—当然，也可以使用本机ES6 Promises。

## 安装

```
npm install --save shell-spawn
```

## 快速使用

```js
var sp = require('shell-spawn');

sp("echo 'hello world'")
  .then(function(output) {
    console.log(output); // hello world\n
  });

// 执行多个命令
sp(["echo 'hello'", "echo 'world'"])
  .then(function(output) {
    console.log(output); // hello\n world\n
  });

// 执行shell文件， 将 { file:true } 作为第二个参数传入
sp(process.cwd() + "/myshell.sh", { file: true })
  .then(function(output) {
    console.log(output);
  });

// 为了方便调试，将 { verbose:true } 作为第二个参数传入
sp("echo 'hello world'", { verbose: true });
// shell-spawn: about to spawn echo 'hello world'
// shell-spawn: output: hello world

// 为了阻止 stderr 错误的输出，使用 `2>/dev/null` 重定向
// 注意: 这里的 echo 拼写有误
sp("ehco 'hello world'").catch(e => {
  console.log(e); // Error: sh: ehco: command not found
});
sp(["ehco 'hello world'", "2>/dev/null"]).catch(e => {
  console.log(e); // 
});
```

## 配置参数

- `cwd` : 运行脚本的工作目录 （默认 `process.cwd()`）
- `env` : 环境变量 （defaults to `process.env`）
- `verbose` : 常看命令日志

