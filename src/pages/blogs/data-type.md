---
title: 数据类型
description:
date: 2023-07-26 14:25:00
---

[[toc]]


# JavaScript 数据类型

JavaScript 是一种动态类型语言，它支持以下数据类型：

1. **数字(Number)**：整数或浮点数。
2. **字符串(String)**：一串字符，用单引号或双引号括起来。
3. **布尔(Boolean)**：表示真(true)或假(false)。
4. **空值(null)**：表示没有值。
5. **未定义(undefined)**：表示变量声明但未初始化时的值。
6. **对象(Object)**：表示复杂数据结构，可以包含多个属性和方法。
7. **数组(Array)**：表示一组有序的数据，可以通过下标访问。
8. **函数(Function)**：表示可执行的代码块，可以接受参数和返回值。
9. **符号(Symbol)**：表示唯一的、不可变的数据类型，通常用于对象的属性名。

JavaScript 的符号类型是 ECMAScript 6 新增的数据类型。符号类型的值是唯一的，可以用作对象属性的键值，保证不会发生命名冲突。符号类型的值可以通过 Symbol() 函数创建。

以上是 JavaScript 支持的所有数据类型。

可以用以下简单的方法来快速记忆 JavaScript 的数据类型：

- **Null** 和 **Undefined** 都表示没有值。
- **Boolean** 只有两个值：`true` 和 `false`。
- **Number** 包括整数和浮点数。
- **String** 是一串字符，可以用单引号或双引号括起来。
- **Object** 和 **Array** 都是复杂数据类型，但前者通常用于表示单个实体，后者表示一组实体。
- **Function** 是可执行的代码块，可以接受参数和返回值。
- **Symbol** 是唯一的、不可变的数据类型，通常用于对象的属性名。

### 为什么有的编程规范要求用 void 0 代替 undefined?

有的编程规范要求使用 `void 0` 代替 `undefined` 是为了避免被篡改。在 JavaScript 中，`undefined` 是一个变量，而并非是一个关键字，`undefined` 可以被重写为一个新的值，这可能导致一些不可预测的行为。而 `void 0` 始终返回 `undefined`，无法被篡改，因此更为安全。

### 字符串有最大长度吗?

在 JavaScript 中，字符串的最大长度是由内存限制决定的。具体而言，字符串的最大长度为    `2^53-1`，这是由 JavaScript 中 Number 类型的精度限制所决定的。当字符串长度超过这个限制时，JavaScript 引擎会抛出 RangeError 异常。

### 0.1+0.2 ≠ 0.3

在 JavaScript 中，由于二进制浮点数的精度问题，使用十进制小数进行运算时可能会存在精度误差。例如，`0.1 + 0.2` 的结果并不是精确的 `0.3`，而是一个非常接近 `0.3` 的数值。因此，比较 `0.1 + 0.2` 和 `0.3` 是否相等时，应该使用一种“容错”的方法，例如将两个数相减，然后判断差值的绝对值是否小于某个极小值，以确定它们是否“相等”。

以下是一种实现这个方法的 JavaScript 代码：

```
function isEqual(num1, num2) {
  return Math.abs(num1 - num2) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true

```

在上面的代码中，`Number.EPSILON` 是 JavaScript 中一个非常小的数值，可以用来表示两个数之间的最小差值。通过计算 `0.1 + 0.2` 和 `0.3` 的差值的绝对值，然后将其与 `Number.EPSILON` 进行比较，就可以判断它们是否“相等”。

### 为什么给对象添加的方法能用在基本类型上？

JavaScript 中的基本类型（如数字、字符串、布尔值等）在使用时会自动转换为相应的对象类型，这个过程称为“装箱（boxing）”。例如，当我们对一个数字使用 `.toFixed()` 方法时，JavaScript 会将这个数字装箱为一个 `Number` 对象，然后再调用 `.toFixed()` 方法。这样做的好处是，使得基本类型可以使用对象的方法和属性，从而增强了它们的功能。但是，由于自动装箱和拆箱的开销比较大，因此在一些性能敏感的场景中，最好不要频繁地使用基本类型的对象形式。

### 装箱转换和拆箱转换

在 JavaScript 中，基本类型和对象类型之间可以进行自动的类型转换，这一过程被称为“装箱（boxing）”和“拆箱（unboxing）”。当我们使用基本类型的值调用对象的方法或属性时，JavaScript 会将基本类型的值自动装箱为对应的对象类型，然后再调用方法或属性。例如，当我们对一个字符串使用 `.length` 属性时，JavaScript 会将这个字符串装箱为一个 `String` 对象，然后再调用 `.length` 属性。

相反地，当我们将一个对象类型的值赋给一个基本类型的变量时，JavaScript 会将这个对象类型的值自动拆箱为对应的基本类型的值。例如，当我们将一个 `Number` 对象赋给一个变量时，JavaScript 会将这个 `Number` 对象拆箱为一个数字。

对象到 String 和 Number 的转换都遵循“先拆箱再转换”的规则。通过拆箱转换，把对象 变成基本类型，再从基本类型转换为对应的 String 或者 Number。拆箱转换会尝试调用 valueOf 和 toString 来获得拆箱后的基本类型。如果 valueOf 和 toString 都不存在，或者没有返回基本类型，则会产生类型错误 TypeError。

以下是一些示例代码：

```
var obj1 = {
  valueOf: function() {
    return 123;
  }
};

var obj2 = {
  toString: function() {
    return "hello";
  }
};

var obj3 = {
  // 没有 valueOf 和 toString 方法
};

console.log(Number(obj1)); // 输出 123
console.log(String(obj2)); // 输出 "hello"
console.log(Number(obj3)); // 抛出 TypeError 异常

```

在上面的代码中，`obj1` 对象中定义了 `valueOf()` 方法，返回了基本类型的值 `123`。因此，当将 `obj1` 转换为数字类型时，会优先调用 `valueOf()` 方法，返回 `123`。

`obj2` 对象中没有 `valueOf()` 方法，但定义了 `toString()` 方法，返回了字符串 "hello"。因此，当将 `obj2` 转换为字符串类型时，会调用 `toString()` 方法，返回字符串 "hello"。

`obj3` 对象既没有 `valueOf()` 方法，也没有 `toString()` 方法。因此，当将 `obj3` 转换为数字类型时，会尝试调用 `valueOf()` 和 `toString()` 方法，但由于两个方法都不存在，因此会抛出 `TypeError` 异常。

需要注意的是，以上示例只是一些常见的情况，实际上在拆箱转换时，JavaScript 会根据具体情况来决定调用哪个方法。因此，在编写代码时应该尽量避免依赖于拆箱转换，以避免产生不确定的行为。

ES6 之后，允许对象通过显式指定 `@@toPrimitive` Symbol 来覆盖原有的行为。如果一个对象定义了 `@@toPrimitive` 方法，则在进行类型转换时，会优先调用该方法。`@@toPrimitive` 方法接受一个参数，表示希望将对象转换为哪种类型。该方法应该返回一个基本类型的值，表示对象转换后的结果。

以下是一个示例：

```
var obj = {
  [Symbol.toPrimitive]: function(hint) {
    if (hint === "number") {
      return 123;
    } else {
      return "hello";
    }
  }
};

console.log(Number(obj)); // 输出 123
console.log(String(obj)); // 输出 "hello"

```

在上面的代码中，`obj` 对象定义了 `@@toPrimitive` 方法，根据参数的不同返回了不同的值。当将 `obj` 转换为数字类型时，会优先调用 `@@toPrimitive("number")` 方法，返回 `123`。当将 `obj` 转换为字符串类型时，会调用 `@@toPrimitive("string")` 方法，返回字符串 "hello"。

除了自动装箱和拆箱，JavaScript 还支持显式的类型转换。在 JavaScript 中，显式的类型转换可以使用以下方式：

1. **Number()**：将一个值转换为数字类型。
2. **String()**：将一个值转换为字符串类型。
3. **Boolean()**：将一个值转换为布尔类型。
4. **parseInt()**：将一个字符串解析为整数。
5. **parseFloat()**：将一个字符串解析为浮点数。

下面是一些示例：

```
var num = Number("123"); // 将字符串 "123" 转换为数字类型
var str = String(123); // 将数字 123 转换为字符串类型
var bool = Boolean("true"); // 将字符串 "true" 转换为布尔类型
var int = parseInt("123"); // 将字符串 "123" 解析为整数
var float = parseFloat("3.14"); // 将字符串 "3.14" 解析为浮点数

```

需要注意的是，JavaScript 中的类型转换有时可能会出现一些意外的结果。例如，将空字符串转换为数字类型时，得到的结果是 0，而不是 NaN。这是因为 JavaScript 在进行类型转换时，会先将值转换为字符串类型，然后再根据需要转换为其他类型。在将空字符串转换为数字类型时，先将空字符串转换为 0，然后再将 0 转换为数字类型，因此最终的结果是 0。

另外，JavaScript 还支持使用三元运算符 `condition ? value1 : value2` 来进行简单的类型转换。例如，可以使用以下代码将一个字符串转换为数字类型：

```
var str = "123";
var num = isNaN(str) ? 0 : Number(str);

```

在上面的代码中，`isNaN()` 函数用于判断一个值是否为 NaN，如果是，就返回 true，否则返回 false。如果字符串不能转换为数字类型，`isNaN(str)` 就会返回 true，这时就将变量 `num` 的值设为 0；否则，将字符串转换为数字类型并赋给变量 `num`。

JavaScript 中的类型转换是一个比较复杂的话题，除了基本类型之间的转换，还包括对象类型之间的转换。在 JavaScript 中，对象类型之间的转换有两种方式：显式转换和隐式转换。

显式转换是指我们通过调用对象的方法或使用类型转换函数来将一个对象转换为另一个对象类型。例如，可以使用 `Object.keys()` 函数将一个对象转换为一个包含所有属性名的数组：

```
var obj = {a: 1, b: 2, c: 3};
var keys = Object.keys(obj); // 将 obj 转换为一个数组

```

在上面的代码中，`Object.keys()` 函数将对象 `obj` 转换为一个包含所有属性名的数组。

另一种方式是隐式转换，它是指 JavaScript 在需要将一个对象转换为另一个对象类型时，会自动进行的一种转换方式。例如，当我们将一个对象作为字符串拼接时，JavaScript 会将这个对象转换为字符串类型：

```
var obj = {a: 1, b: 2, c: 3};
var str = "Object: " + obj; // 将 obj 转换为字符串类型

```

在上面的代码中，将对象 `obj` 与字符串 `"Object: "` 拼接时，JavaScript 会将对象 `obj` 隐式地转换为字符串类型。

需要注意的是，隐式转换有时会导致一些意外的结果，因此在编写代码时应该尽量避免隐式转换。例如，在比较两个对象是否相等时，应该使用 `Object.is()` 函数而不是 `==` 运算符，因为 `==` 运算符会进行隐式转换，可能会导致一些不确定的结果。

总之，类型转换在 JavaScript 中是一个非常重要的概念，了解它对于编写高质量的代码非常有帮助。在进行类型转换时，应该尽量使用显式转换，避免使用隐式转换。同时，也要注意类型转换可能会带来的意外结果，避免出现不确定的行为。

非常感谢您提供的关于 JavaScript 类型转换的详细介绍。我对自动装箱和拆箱以及显式的类型转换有了更深入的了解。

### 在 JavaScript 中，如何判断两个变量的类型是否相同。

在 JavaScript 中，可以使用 `typeof` 运算符来判断一个变量的类型。例如，`typeof 123` 的值为 `"number"`，`typeof "hello"` 的值为 `"string"`。要判断两个变量的类型是否相同，可以将它们的类型字符串进行比较。例如：

```
function isSameType(a, b) {
  return typeof a === typeof b;
}

console.log(isSameType(123, "hello")); // false
console.log(isSameType(123, 456)); // true
console.log(isSameType("hello", "world")); // true
console.log(isSameType(true, false)); // true

```

在上面的代码中，`isSameType()` 函数接受两个参数 `a` 和 `b`，分别判断它们的类型是否相同。首先使用 `typeof` 运算符获取两个变量的类型字符串，然后将它们进行比较，如果相同就返回 `true`，否则返回 `false`。

除了使用 `typeof` 运算符，还可以使用 `instanceof` 运算符来判断一个变量是否属于某个对象类型。例如，`arr instanceof Array` 的值为 `true`，表示变量 `arr` 属于 `Array` 对象类型。

需要注意的是，`typeof` 运算符对于基本类型的值和 null 都能够正确判断，但对于对象类型的值却无法区分不同的对象类型。例如，`typeof []` 的值为 `"object"`，无法区分 `Array` 对象和普通对象。因此，在判断一个变量的类型时，应该先使用 `typeof` 运算符判断基本类型和 null，然后再使用 `instanceof` 运算符判断对象类型。

除了使用 `typeof` 运算符和 `instanceof` 运算符，还可以使用 `Object.prototype.toString()` 方法来获取一个变量的类型。这个方法返回一个字符串，表示对象的类型。例如：

```
var arr = [1, 2, 3];
var obj = {a: 1, b: 2, c: 3};

console.log(Object.prototype.toString.call(arr)); // 输出 "[object Array]"
console.log(Object.prototype.toString.call(obj)); // 输出 "[object Object]"

```

在上面的代码中，`Object.prototype.toString.call()` 方法返回一个字符串，表示变量 `arr` 和 `obj` 的类型。需要注意的是，由于 `Object.prototype.toString()` 方法返回的字符串格式为 `[object 类型]`，因此需要使用 `call()` 方法将其作用于要获取类型的对象。

总之，判断变量类型的方法有很多种，可以根据实际情况选择。在实际编程中，应该根据具体需求选择最合适的方法。同时，需要注意 `typeof` 运算符对于对象类型的值无法区分不同的对象类型，因此在判断一个变量的类型时，应该先使用 `typeof` 运算符判断基本类型和 null，然后再使用 `instanceof` 运算符或 `Object.prototype.toString()` 方法判断对象类型。

### 对象之间的转换

当我们需要将一个对象类型转换为另一个对象类型时，JavaScript 提供了一些方法来实现这一目的。下面是一些常见的方法：

1. **Object.assign()**：将一个或多个源对象的属性复制到目标对象中，返回目标对象。这个方法可以用来将一个对象转换为另一个对象类型。
    
    ```
    var obj1 = {a: 1};
    var obj2 = Object.assign({}, obj1); // 将 obj1 转换为一个新的对象 obj2
    
    ```
    
    在上面的代码中，`Object.assign()` 方法将对象 `obj1` 复制到一个新的空对象中，返回这个新的对象，从而实现了将 `obj1` 转换为一个新的对象类型。
    
2. **JSON.stringify()** 和 **JSON.parse()**：将一个 JavaScript 对象转换为一个 JSON 字符串，或将一个 JSON 字符串转换为一个 JavaScript 对象。
    
    ```
    var obj = {a: 1, b: 2, c: 3};
    var str = JSON.stringify(obj); // 将 obj 转换为 JSON 字符串
    var obj2 = JSON.parse(str); // 将 JSON 字符串转换为 JavaScript 对象
    
    ```
    
    在上面的代码中，`JSON.stringify()` 方法将对象 `obj` 转换为一个 JSON 字符串，`JSON.parse()` 方法将这个 JSON 字符串转换为一个 JavaScript 对象。
    
3. **构造函数**：使用一个对象类型的构造函数来创建一个新的对象。这个方法可以用来将一个对象类型转换为另一个对象类型。
    
    ```
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }
    
    var person = new Person("Tom", 18); // 将一个普通对象转换为一个 Person 对象
    
    ```
    
    在上面的代码中，使用 `Person` 构造函数创建了一个新的 `Person` 对象，将一个普通对象转换为了一个 `Person` 对象。
    

当然，这些方法只是将对象转换为另一个对象类型的一些常见的方法，实际上还有很多其他的方法可以实现这一目的，具体方法可以根据实际情况选择。

关于判断两个变量的类型是否相同，在 JavaScript 中可以使用 `typeof` 运算符或 `instanceof` 运算符来判断。`typeof` 运算符可以用来判断一个变量的基本类型，而 `instanceof` 运算符可以用来判断一个变量是否属于某个对象类型。

下面是一些示例：

```
var num = 123;
var str = "hello";
var obj = {a: 1};

console.log(typeof num); // 输出 "number"
console.log(typeof str); // 输出 "string"
console.log(typeof obj); // 输出 "object"

console.log(num instanceof Number); // 输出 false
console.log(str instanceof String); // 输出 false
console.log(obj instanceof Object); // 输出 true

```

需要注意的是，`typeof` 运算符对于基本类型的值和 null 都能够正确判断，但对于对象类型的值却无法区分不同的对象类型。例如，`typeof` 运算符对于 `Array` 对象和普通对象都会返回 "object"。因此，在判断一个变量的类型时，应该先使用 `typeof` 运算符判断基本类型和 null，然后再使用 `instanceof` 运算符判断对象类型。

### 如果我们不用原生的 Number 和 parseInt，用 JS 代码实现 String 到 Number 的转换，该怎么做呢?

可以使用下面这个函数将字符串转换为数字：

```
function stringToNumber(str) {
  var num = 0;
  var sign = 1;
  var i = 0;

  // 处理符号位
  if (str[i] === "+" || str[i] === "-") {
    if (str[i] === "-") {
      sign = -1;
    }
    i++;
  }

  // 处理整数部分
  while (i < str.length && str[i] >= "0" && str[i] <= "9") {
    num = num * 10 + (str[i] - "0");
    i++;
  }

  // 处理小数部分
  if (i < str.length && str[i] === ".") {
    i++;
    var frac = 0.1;
    while (i < str.length && str[i] >= "0" && str[i] <= "9") {
      num = num + (str[i] - "0") * frac;
      frac = frac / 10;
      i++;
    }
  }

  return num * sign;
}

```

这个函数的实现比较复杂，但是原理比较简单。首先，我们需要处理符号位，如果字符串的第一个字符是 "+" 或 "-"，则将其作为符号位，否则默认为正数。然后，我们需要处理整数部分，如果字符串中有数字字符，则将其转换为数字，并累加到 num 变量中。最后，如果字符串包含小数部分，则需要处理小数点后面的数字，并将其加到 num 变量中。

需要注意的是，这个函数并不完美，它只能处理一些简单的情况，例如整数和小数，不能处理科学计数法等复杂的情况。如果需要处理更多的情况，建议使用原生的 Number 或 parseInt 函数。