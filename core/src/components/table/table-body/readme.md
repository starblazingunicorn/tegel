# tds-table-body



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                        | Type      | Default     |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------- | --------- | ----------- |
| `bodyData`        | `body-data`         | Prop to pass JSON string which enables automatic rendering of Table rows and cells | `any`     | `undefined` |
| `enableDummyData` | `enable-dummy-data` | Prop for showcase of rendering JSON in body-data, just for presentation purposes   | `boolean` | `false`     |


## Dependencies

### Depends on

- [tds-table-body-row](../table-body-row)
- [tds-body-cell](../table-body-cell)

### Graph
```mermaid
graph TD;
  tds-table-body --> tds-table-body-row
  tds-table-body --> tds-body-cell
  tds-table-body-row --> tds-checkbox
  style tds-table-body fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
