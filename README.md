# XlsxWriter for node (xslxwriter4node)

Libxlsxwriter: A Nodejs library for creating Excel XLSX files (Port from C [libxslxwriter](https://github.com/jmcnamara/libxlsxwriter)).


![demo image](http://xlsxwriter4node.github.io/assets/demo.png)


## The libxlsxwriter library

Libxlsxwriter is a C library that can be used to write text, numbers, formulas
and hyperlinks to multiple worksheets in an Excel 2007+ XLSX file.

It supports features such as:

- 100% compatible Excel XLSX files.
- Full Excel formatting.
- Merged cells.
- Defined names.
- Autofilters.
- Charts.
- Data validation and drop down lists.
- Worksheet PNG/JPEG images.
- Support for adding Macros.
- Memory optimization mode for writing large files.
- Source code available on [GitHub](https://github.com/jmcnamara/libxlsxwriter).
- FreeBSD license.
- ANSI C.
- Works with GCC, Clang, Xcode, MSVC 2015, ICC, TCC, MinGW, MingGW-w64/32.
- Works on Linux, FreeBSD, OpenBSD, OS X, iOS and Windows. Also works on MSYS/MSYS2 and Cygwin.
- Compiles for 32 and 64 bit.
- Compiles and works on big and little endian systems.
- The only dependency is on `zlib`.

Here is an example that was used to create the spreadsheet shown above:


```js
const xlsxwriter = require("xlsxwriter4node");

console.time("time")
console.log(xlsxwriter.hello())
console.timeEnd("time")
```



See the [full documentation](http://libxlsxwriter.github.io) for the getting
started guide, a tutorial, the main API documentation and examples.
