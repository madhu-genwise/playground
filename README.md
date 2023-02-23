# CareoClub UI Boilerplate

## Dependencies

-  Typescript
-  Redux Toolkit
-  Cypress
-  Commit lint
-  Axios
-  Sentry
-  Native Handshake
-  Husky

## Usage
```
yarn 
yarn start
```
or
```
npm i 
npm run start
```

## Build
```
yarn build
```
or
```
npm run build
```

## Analyze
```
yarn analyze
```
or
```
npm run analyze
```

## Testing

-   Start the project with `npm run cy:start`
-   To run all the test cases file execute  `npm run cy:run`.
-   To run single test case file execute  `npm run cy:open`.

## Highlights

-   Version Control
-   No Class Components. 
-   No `else` or nested `if` statement in the code.
-   No redux connect(mapToState/mapToDispatch), we perfer dispatch hook and state selectors.
-   Uses Store Slices to reduce code boilerplate https://redux-toolkit.js.org/api/createSlice
-   Custom [API hook](https://github.com/careo-git/careoclub-ui-boilerplate/blob/main/src/Hooks/useService.ts) to reduce code.
-   Cancelable APIs check above API hook.

## Contribution Guidelines

-   Clone the project on your local machine.
-   We prefer VS Code.
-   Use Extension `TypeScript Import Sorter` to sort and format the imports, with following rules.

```json
({
	"type": "importMember",
	"regex": "^$",
	"orderLevel": 5,
	"disableSort": true
},
{
	"regex": "react",
	"orderLevel": 8,
	"disableSort": true
},
{
	"regex": "^[^.@]",
	"orderLevel": 15
},
{
	"regex": "^[@]",
	"orderLevel": 10
},
{
	"regex": "^[.]",
	"orderLevel": 30
})
```

-   install dependencies via `npm install` with node version greater than 13.5.
-   use `npm start` for local development
-   Before commiting the code, please ensure that no test case are failing (`npm run cy:start` and `npm run cy:run`) and code style has been followed (`yarn lint`)
-   use proper commit message, we prefer with Prefix as feat(Scope):`message`, refactor(Scope):`message`, fix(Scope):`message`, breakingchange!:`message` with proper description.
