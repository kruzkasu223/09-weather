/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: false,
  proseWrap: "always",
  trailingComma: "es5",
  tabWidth: 2,
  endOfLine: "lf",
  useTabs: false,
}
