/*
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
global.WebSocket = require('ws');

/**
 * eclairjs module.
 * @example
 * var eclairjs = require('eclairjs');
 * @module eclairjs
 */
function EclairJS() {
  // SparkContext handles our Toree connection, so it returns an array of [ToreeKernelPromise, SparkContextClass]
  var result = require('./SparkContext.js')();

  var kernelP = result[0];

  return {
    SparkContext: result[1],

    Accumulable: require('./Accumulable.js')(kernelP),
    AccumulableParam: require('./AccumulableParam.js')(kernelP),
    List: require('./List.js')(kernelP),
    Tuple: require('./Tuple.js')(kernelP),
    SparkConf: require('./SparkConf.js')(kernelP),

    ml: require('./ml/module.js')(kernelP),
    mllib: require('./mllib/module.js')(kernelP),
    rdd: require('./rdd/module.js')(kernelP),
    sql: require('./sql/module.js')(kernelP),
    storage: require('./storage/module.js')(kernelP),
    streaming: require('./streaming/module.js')(kernelP)
  }
}

module.exports = new EclairJS();