# Node-API with TS

Setup & Config:

1.Init

```
yarn init
yarn add express
yarn add -D typescript @types/express @types/node
```

2. Config

- tsconfig.json

```json
{
 { "target": "ES2022" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "module": "NodeNext" /* Specify what module code is generated. */,
    "moduleResolution": "node" /* Specify how TypeScript looks up a file from a given module specifier. */,
    "sourceMap": true /* Create source map files for emitted JavaScript files. */,
    "baseUrl": "src" /* Specify the base directory to resolve non-relative module names. */,
    "outDir": "dist" /* Specify an output folder for all emitted files. */,
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": true /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
 },
  "include": ["src/**/*"]
}
```

- nodemon.json

```
yarn add -D nodemon prettier ts-node
```

```json
{
  "watch": ["src"],
  "ext": ".ts ,.js",
  "exec": "ts-node ./src/index.ts"
}
```

- .prettierrc, .prettierignore, .editorconfig

```json
{
  "watch": ["src"],
  "ext": ".ts ,.js",
  "exec": "tsc ./src/index.ts"
}
```

```
node_modules/
dist/
```

```
[*]
indent_size = 2
indent_style = space
```

- package.json

```json
"scripts": {
    "dev": "nodemon",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss|*.js)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss|*.js)\""
  }
```
