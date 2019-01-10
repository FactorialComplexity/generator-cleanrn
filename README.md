# generator-cleanrn [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Code generators for Clean React Native architecture by Factorial Complexity.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cleanrn using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-cleanrn
```

## Usage

Generate a boilerplate project *in the current directory*:

```bash
yo cleanrn
```

Parameters:

 * **User-friendly name** - will be used as is for display purpose. Feel free to use spaces. This name will be used to generate more strict names for items like project name, some folders etc.
 * **Package identifier** - this is an identifier in a reverse domain notation (like `com.example.test`). It will be used as Android package name and iOS bundle identifier.


## Other Generators

This project provides additional generators to speed up writing common boilerplate. Sub-generators should normally be called inside the project root directory. However, if you scaffold the project with this generator, it will put `.yo-rc.json` file into the project, which will enable a proper calling sub-generators from any sub-folder.

### Domain Module

```bash
yo cleanrn:domain
```

A generic single-file module intended for domain logic will be created in `src/domain` directory. Parameters:

 * **Name** - name for the module in a camel-case (like `anotherCoolModule`).


### Presentation Flow Module

```bash
yo cleanrn:flow
```

Generate a presentation module with a separate navigator and a root screen. Parameters:

 * **Name** - name of the module in a camel-case. An informal convention is too add suffix `Flow` to the modules like this (e.g. `someFlow`).
 * **Add dependency on StoreManager?** - if *yes* the module will have a dependency on `StoreManager`. Regular presentation modules doesn't need it, however, there are certain case when it might be required. For example, if you want to connect your navigation to the Redux state.
 * **Navigator** - one of the navigator types provided by [react-navigation](https://reactnavigation.org/) to be used as a root navigator for the project.
 * **Navigator base name** - name to use for the navigator class. Suffix `Navigator` will be auto-appended.
 * **First screen base name** - name to use for the root screen classes. All suffices will be auto-appended.

### Screen

```bash
yo cleanrn:screen
```

According to Clean React native approach a code for a regular screen is typically shared between 3 files:

 * **View** - a "dumb" React component, which is not aware neither of the global state, nor of the navigation.
 * **Container** - normally a result of `connect()` call. It is tasked with mapping Redux state to View's props.
 * **Navigation** - component that wraps Container and encapsulates the navigation and other similar logic, which has to do with how the screen is integrated into the rest of the application.

This generator will create this three files in the specified presentation module, assuming the default file structure of the presentation module is preserved. Parameters:

 * **Presentation module** - pick a presentation module to add screen to.
 * **Screen base name** - screen base name without any suffices in Pascal-case (e.g. `FancyList`).


## License

Unlicense © [Vitaliy Ivanov](https://factorialcomplexity.com)


[npm-image]: https://badge.fury.io/js/generator-cleanrn.svg
[npm-url]: https://npmjs.org/package/generator-cleanrn
[daviddm-image]: https://david-dm.org/FactorialComplexity/generator-cleanrn.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/FactorialComplexity/generator-cleanrn
