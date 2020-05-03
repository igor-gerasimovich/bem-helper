# Bem helper

> Simple class for automatically `block__element--modifier` generation

- [Installation](#installation)
- [Examples](#examples)
    - [Example native](#example-native)
    - [Example react](#example-react)
    
    
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

```html
<div class="button button--modifier1">
  <button class="button__native button__native--modifier2"></button>
</div>
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

##### element

Returns bem elements with modifiers.
Course, block classes will not be returned.

|param|required|type|examples|
|---|---|---|---|
|element|+|string|'el'|
| |+|string[]|['el1', 'el2']|
|modifier|-|string|'modifier'|
| |-|string[]|['mod1', 'mod2']|
