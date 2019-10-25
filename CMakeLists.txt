cmake_minimum_required(VERSION 3.9)
cmake_policy(SET CMP0042 NEW)
set (CMAKE_CXX_STANDARD 11)

project (libxlsxwriter4node)
include_directories(${CMAKE_JS_INC})
include_directories(third_party/libxlsxwriter/include)
include_directories(third_party/zlib/include)
link_directories(third_party/libxlsxwriter/lib/x64/Release)
link_directories(third_party/zlib/lib)

file(GLOB SOURCE_FILES "src/main.cc")
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
if (MSVC)
target_link_libraries(${PROJECT_NAME} zlib.lib )
target_link_libraries(${PROJECT_NAME} xlsxwriter.lib)
endif (MSVC)
if (UNIX)
        set_target_properties(${PROJECT_NAME} PROPERTIES LINKER_LANGUAGE CXX)
        target_link_libraries(${PROJECT_NAME} "${CMAKE_SOURCE_DIR}/third_party/zlib/lib/libz.so")
        target_link_libraries(${PROJECT_NAME} "${CMAKE_SOURCE_DIR}/third_party/libxlsxwriter/lib/libxlsxwriter.a")
endif (UNIX)
# Include N-API wrappers
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})


# define NPI_VERSION
add_definitions(-DNAPI_VERSION=3)