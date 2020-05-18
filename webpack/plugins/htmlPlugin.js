const path = require("path"),
  manifest = require("../manifest"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

const titles = {
  index: "index",
  notice: "Notice",
  calendar: "Calendar",
  validMember: "validMember",
  invalidMember: "invalidMember",
  readyMember: "readyMember",
  registMember: "registMember",
  coachmanager: "coachmanager",
  lessonManager: "lessonManager",
  lessonSchedule: "lessonSchedule",
  Setting: "Setting",
  CoachData: "CoachData",
};

module.exports = Object.keys(titles).map((title) => {
  return new HtmlWebpackPlugin({
    //template: path.join(manifest.paths.src, `${title}.html`),
    template: path.join(manifest.paths.src, `${title}.html`),
    path: manifest.paths.build,
    filename: `${title}.html`,
    inject: true,
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    },
  });
});
