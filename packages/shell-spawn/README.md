<h3 align="center" style="margin: 30px 0 35px;">Shell Spawn</h3>

<p align="center">
  🇨🇳 <a href="./README.zh-CN.md">中文版介绍</a>
</p>

---

**Executes some shell by child_process.spawn, returns a promise.**

Internally this library uses [`spawn`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) so that when `verbose` is set to `true` you can see the live output from the command — you don't have to wait for the process to exit to know what has happened (useful for a slow process or a long-running process).

Warning: This micro-library doesn't force you to use any particular Promise implementation by using whatever `Promise` has been defined as globally. This is so that you may use any ES6 standard Promise compliant library - or, of course, native ES6 Promises.

## Installation

```
npm install --save shell-spawn
```

## Usage

```js
var shellSpawn = require('shell-spawn');

shellSpawn("echo 'hello world'")
	.then(function(output) {
		console.log(output); // hello world\n
	});

// Multiple commands
shellSpawn(["echo 'hello'", "echo 'world'"])
	.then(function(output) {
		console.log(output); // hello\n world\n
	});

// For advanced debug pass in `{ verbose: true }` as the second parameter
shellSpawn("echo 'hello world'", { verbose: true });
// shell-spawn: about to spawn echo 'hello world'
// shell-spawn: output: hello world
```

## Options

- `cwd` to change the current working directory that the command will run on (defaults to `process.cwd()`)
- `env` to set environment variables (defaults to `process.env`)
- `verbose` to see more output

