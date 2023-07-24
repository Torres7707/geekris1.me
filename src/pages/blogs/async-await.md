---
title: async function implementation principle
description:
date: 2022-10-13 15:18:00
---

[[toc]]

# async function implementation principle
## Introduction
In modern development, `async` and `await` syntax are commonly used. The essence of `async` is a combination of `generator` functions and `co`, so we will first explain these two concepts.
## Generator

### Basic understanding of generator

`generator` is an asynchronous programming method provided by ES6. Compared with regular functions, you need to add an asterisk (`*`) between the `function` keyword and the function name.

```
function* generator(){}

```

You can use `yield` to define different internal states within the function.

```
function* generator() {
  let name = yield 'hello'
  let age = yield name
  yield age
  return 'over'
}

```

We can call it like a normal function using `()`, but calling it does not execute its content. Instead, it returns an iterator object that points to the internal state. We can use the `next` method of this object to point to the next state.

```
let iterator = generator();
console.log(iterator.next()) // { value: 'hello', done: false }
console.log(iterator.next('thez')) // { value: 'thez', done: false }
console.log(iterator.next(18)) // { value: 18, done: false }
console.log(iterator.next()) // { value: 'over', done: true }

```

Using the `next` method will start executing the code from the beginning or from the position where it stopped last time until it encounters a `yield` (or `return`) statement, and then it will stop. Therefore, we can break down the `generator` function above into the following steps:

```
yield 'hello'
let name = yield name
let age = yield age
return 100

```

The first call to `iterator.next()` executes the code at `yield 'hello'`, which returns `{ value: 'hello', done: false }`. `value` represents the content after `yield`, and `done` is `false`, indicating that there are still unexecuted statements after it. The second call to `iterator.next('thez')` executes the code at `let name = yield name`. The parameter `thez` is assigned to `name`. We can also understand this code like this:

```
next('thez')
function next(name){
  return {value:name,done:false}
}

```

### How to implement generator

First, we can open the Babel website and paste the above code into it.
<img  src='/babel-generator.jpg'/>
(Note that we need to set ELECTRON on the left to 1, as indicated by the red box in the figure)

```
function _regeneratorRuntime() {...} // The code is too long to show here
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(generator);
function generator() {
  var name, age;
  return _regeneratorRuntime().wrap(function generator$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return 'hello';
      case 2:
        name = _context.sent;
        _context.next = 5;
        return name;
      case 5:
        age = _context.sent;
        _context.next = 8;
        return age;
      case 8:
        return _context.abrupt("return", 'over');
      case 9:
      case "end":
        return _context.stop();
    }
  }, _marked);
}

```

The generated code as shown above, we will explain it in detail below.

First is the `_regeneratorRuntime` function. Because the code is too long, I omitted most of it. Many of the code inside can be omitted. Next are the `mark` and `wrap` functions, which are returned by the `_regeneratorRuntime` function.

`mark` is relatively simple. It modifies the `__proto__` of the passed-in function and adds `Symbol.toStringTag`, and then returns it. Here, we can simply return the passed-in function.

```
function _regeneratorRuntime(){
  function mark(gen){
    return gen
  }
  function wrap(){
    ...
  }
  return {mark,warp}
}

```

We found that `wrap` accepts a callback function and passes a `_context` parameter to it. `_context` has properties such as `prev`, `next`, `sent`, `abrupt`, and `stop`.

```
function _regeneratorRuntime(){
  function mark(gen){
    return gen
  }
  function wrap(innerFn,self){
    let _context = {
      next:0,
      prev:0,
      done:false,
      sent:null,
      abrupt:function(type,arg){
        let record ={}
        record.type = type;
        record.arg = arg;
        return this.complete(record)
      },
      complete:function(record){
        if(record.type ==='return'){
          this.returnValue = record.value;
          this.next= "end"
        }
        return record.arg
      },
      stop:function(){
        this.done =true;
        return this.returnValue
      }
    }
    return {
      next(v){
        _context.sent = v;
        let value =  innerFn(_context);
        return {value,done:_context.done}
      }
    }

  }
  return {mark,warp}
}

```

The `wrap` function creates a `context` to store the current state and value. It returns an object with a `next` method, which is the method we call. Each time the method is called, the passed-in parameter is recorded, and then the `generator` function is called, and the context value is passed out.

The `generator$` function splits the previous state, uses a `switch` statement to divide it, and uses `while(1)` as a state machine to indicate that the code inside will be executed multiple times. When `switch` returns, the loop is exited.

## Co

The example of using the `generator` function above is actually quite simple. Generally, we use it to process asynchronous functions. In this case, let's write a more complex example. We have two files, 1.txt and 2.txt. The content of 1.txt is `./2.txt`, and the content of 2.txt is `thez`. I hope to first get the content of 1.txt and then get the value corresponding to its corresponding path.

```
const fs = require('fs/promises')
function* getFileContent() {
  let txt1 = yield fs.readFile('./1.txt', 'utf-8')
  let txt2 = yield fs.readFile(txt1, 'utf-8')
  return txt2
}

```

If we want to get the value, we need to write it like this:

```
let iterator = getFileContent()
let { value } = iterator.next()
value.then(data => {
  let { value } = iterator.next(data)
  value.then(data => console.log(data))
})

```

If the nested files are more complex, it will be difficult to maintain. Therefore, we need a function that can help us handle this nesting, and we hope that we can directly call it to return the final result.

```
co(getFileContent()).then(data=>{console.log(data)})

```

Next, let's implement this function simply.

```
function co(gen){
  return new Promise( (resolve,reject)=>{
    function step(data){
      let {value,done} = gen.next(data)
      if(done){
        resolve(value)
      }else{
        Promise.resolve(value).then(data=>{
          step(data)
        }).catch(e=>reject(e))
      }
    }
    step()
  })
}

```

In this way, we have roughly completed the `co` function.

## Implementation of async

Let's rewrite the `getFileContent` function above using `async` and `await`.

```
const fs = require('fs/promises')
async function getFileContent() {
  let txt1 = await fs.readFile('./1.txt', 'utf-8')
  let txt2 = await fs.readFile(txt1, 'utf-8')
  return txt2
}
let data = await getFileContent()

```

At the same time, we put this code on Babel for compilation, and the generated code is as follows:

```
function _regeneratorRuntime() {...}
function asyncGeneratorStep(){...}
function _asyncToGenerator(fn) {...}
const fs = require('fs/promises');
function getFileContent() {
  return _getFileContent.apply(this, arguments);
}
function _getFileContent() {
  _getFileContent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var txt1, txt2;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fs.readFile('./1.txt', 'utf-8');
        case 2:
          txt1 = _context.sent;
          _context.next = 5;
          return fs.readFile(txt1, 'utf-8');
        case 5:
          txt2 = _context.sent;
          return _context.abrupt("return", txt2);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getFileContent.apply(this, arguments);
}
let data = await getFileContent();

```

Most of the code is similar to the compiled code of the `generator` function above, but two functions, `_asyncToGenerator` and `asyncGeneratorStep`, have been added. `_asyncToGenerator` corresponds to the `co` function we wrote above, and `asyncGeneratorStep` corresponds to the `step` method in the `co` function.

## Conclusion

In summary, the `async` and `await` syntax are based on the `generator` function and the `co` function. By understanding the principles behind them, we can better understand how to use them in coding.