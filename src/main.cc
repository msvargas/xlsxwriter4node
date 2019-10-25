// Example https://github.com/nodejs/node-addon-examples/tree/master/build_with_cmake#building-n-api-addons-using-cmakejs
#include <napi.h>
#include "xlsxwriter.h"

int hello() {
    /* Create a new workbook and add a worksheet. */
    lxw_workbook  *workbook  = workbook_new("demo.xlsx");
    lxw_worksheet *worksheet = workbook_add_worksheet(workbook, NULL);
    /* Add a format. */
    lxw_format *format = workbook_add_format(workbook);
    /* Set the bold property for the format */
    format_set_bold(format);
    /* Change the column width for clarity. */
    worksheet_set_column(worksheet, 0, 0, 20, NULL);
    /* Write some simple text. */
    worksheet_write_string(worksheet, 0, 0, "Hello", NULL);
    /* Text with formatting. */
    worksheet_write_string(worksheet, 1, 0, "World", format);
    /* Write some numbers. */
    worksheet_write_number(worksheet, 2, 0, 123,     NULL);
    worksheet_write_number(worksheet, 3, 0, 123.456, NULL);
    /* Insert an image. */
    worksheet_insert_image(worksheet, 1, 2, "assets/logo.png");
    workbook_close(workbook);
    return 0;
}

static Napi::String Method(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  hello();
  return Napi::String::New(env, "Hello, world!");
}

static Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "hello"),
              Napi::Function::New(env, Method));
  return exports;
}

NODE_API_MODULE(hello, Init)
 