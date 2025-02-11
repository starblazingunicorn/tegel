# tds-inline-tabs



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute                | Description                                                                            | Type                       | Default     |
| ---------------------- | ------------------------ | -------------------------------------------------------------------------------------- | -------------------------- | ----------- |
| `defaultSelectedIndex` | `default-selected-index` | Sets the default selected Tab.                                                         | `number`                   | `0`         |
| `modeVariant`          | `mode-variant`           | Variant of the Tabs, primary= on white, secondary= on grey50                           | `"primary" \| "secondary"` | `'primary'` |
| `selectedIndex`        | `selected-index`         | Sets the selected Tab. If this is set, all Tab changes need to be handled by the user. | `number`                   | `undefined` |


## Events

| Event       | Description | Type                                         |
| ----------- | ----------- | -------------------------------------------- |
| `tdsChange` |             | `CustomEvent<{ selectedTabIndex: number; }>` |


## Methods

### `selectTab(tabIndex: number) => Promise<{ selectedTabIndex: number; }>`

Selects a Tab based on tabindex, will not select a disabled Tab.

#### Returns

Type: `Promise<{ selectedTabIndex: number; }>`




## Dependencies

### Depends on

- [tds-icon](../../icon)

### Graph
```mermaid
graph TD;
  tds-inline-tabs --> tds-icon
  style tds-inline-tabs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
