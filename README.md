# Bem helper

> Simple class for automatically `block__element--modifier` and `theme__block__element--modifier` generation

- [Installation](#installation)
- [Examples](#examples)
    - [Native](#example-native)
    - [Native themed](#example-themed-native)
    - [React](#example-react)
    - [React themed](#example-themed-react)
- [Info](#info)
    
    
#### Installation
```
npm i @igor-gerasimovich/bem-helper
```

#### Examples
##### Example native
```jsx
const bem = new Bem('button');

// "block block--modifier"
const blockName = bem.block('modifier');

// "block block--modifier1 block--modifier2"
const blockName = bem.block(['modifier1', 'modifier2']);

// "block__element block__element--modifier"
const elementName = bem.element('element', 'modifier');

// "block__element block__element--modifier1 block__element--modifier2"
const elementName = bem.element('element', ['modifier1', 'modifier2']);
```


##### Example react
```jsx
const bem = new Bem('button');

class Button extends React.Component {
  render() {
    return (
      <div className={bem.block('modifier1')}>
        <button className={bem.element('native', 'modifier2')}>
          {this.props.children}
        </button>
      </div>
    );
  }
}
```

```html
<div class="button button--modifier1">
  <button class="button__native button__native--modifier2"></button>
</div>
```

##### Example themed native
```jsx
const bem = new ThemedBem('button');
bem.useTheme('theme1');

// "button theme1__button button--mod theme1__button--mod"
bem.block('mod1');

// "button__el theme1__button__el button__el--mod theme1__button__el--mod"
bem.element('el', 'mod1');


bem.useTheme('theme2');

// "button theme2__button button--mod theme2__button--mod"
bem.block('mod1');

// "button__el theme2__button__el button__el--mod theme2__button__el--mod"
bem.element('el', 'mod1');
```


##### Example themed react
```jsx
const bem = new ThemedBem('button');

class Button extends React.Component {
  render() {
    bem.useTheme(this.props.theme);

    return (
      <div className={bem.block('modifier1')}>
        <button className={bem.element('native', 'modifier2')}>
          {this.props.children}
        </button>
      </div>
    );
  }
}
```

```html
<div class="button button--modifier1 theme__button theme__button--modifier1">
  <button class="button__native button__native--modifier2 theme__button__native theme__button__native--modifier2"></button>
</div>
```

#### Info

##### constructor
|param|required|default|type|examples|
|---|---|---|---|---|
|blockName|+|+|string| 'block' |
| |+|+|string[]| ['block1', 'block2'] |
|elementDivider|-|'__'|string| |
|modifierDivider|-|'--'|string| |

##### block

Returns bem blocks with modifiers

|param|required|type|examples|
|---|---|---|---|
|modifier|-|string|'modifier'|
| |-|string[]|['mod1', 'mod2']|


##### useTheme
> !! this function exists only on ThemedBem

Set current theme

|param|required|type|examples|
|---|---|---|---|
|theme|-|string, undefined|'theme1'|

##### element

Returns bem elements with modifiers.
Course, block classes will not be returned.

|param|required|type|examples|
|---|---|---|---|
|element|+|string|'el'|
| |+|string[]|['el1', 'el2']|
|modifier|-|string|'modifier'|
| |-|string[]|['mod1', 'mod2']|
