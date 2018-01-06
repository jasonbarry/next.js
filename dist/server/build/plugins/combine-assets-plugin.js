'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _webpackSources = require('webpack-sources');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This plugin combines a set of assets into a single asset
// This should be only used with text assets,
// otherwise the result is unpredictable.
var CombineAssetsPlugin = function () {
  function CombineAssetsPlugin(_ref) {
    var input = _ref.input,
        output = _ref.output;
    (0, _classCallCheck3.default)(this, CombineAssetsPlugin);

    this.input = input;
    this.output = output;
  }

  (0, _createClass3.default)(CombineAssetsPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('additional-chunk-assets', function (chunks) {
          var concat = new _webpackSources.ConcatSource();

          _this.input.forEach(function (name) {
            var asset = compilation.assets[name];
            if (!asset) return;

            concat.add(asset);

            // We keep existing assets since that helps when analyzing the bundle
          });

          compilation.additionalChunkAssets.push(_this.output);
          compilation.assets[_this.output] = concat;

          // Register the combined file as an output of the associated chunks
          chunks.filter(function (chunk) {
            return chunk.files.reduce(function (prev, file) {
              return prev || _this.input.includes(file);
            }, false);
          }).forEach(function (chunk) {
            return chunk.files.push(_this.output);
          });
        });
      });
    }
  }]);
  return CombineAssetsPlugin;
}();

exports.default = CombineAssetsPlugin;