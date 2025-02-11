import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';

export default {
  title: 'Components',
  parameters: {
    notes: readme,
    layout: 'centered',
    design: [
      {
        name: 'Figma',
        type: 'figma',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17409&t=rVXuTOgTmXPauyHd-1',
      },
      {
        name: 'Link',
        type: 'link',
        url: 'https://www.figma.com/file/d8bTgEx7h694MSesi2CTLF/Tegel-UI-Library?node-id=9266%3A17409&t=rVXuTOgTmXPauyHd-1',
      },
    ],
  },
  argTypes: {
    inputType: {
      name: 'Type',
      description: 'Sets the Chip type.',
      control: {
        type: 'radio',
      },
      options: ['Button', 'Radio', 'Checkbox'],
      table: {
        defaultValue: { summary: 'button' },
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the Chip size.',
      control: {
        type: 'radio',
      },
      options: ['Large', 'Small'],
      table: {
        defaultValue: { summary: 'Large' },
      },
    },
    label: {
      name: 'Label text',
      description: 'Sets the label of the component.',
      control: {
        type: 'text',
      },
    },
    icon: {
      name: 'Icon',
      description: 'Adds an icon to the component.',
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
      },
    },
    iconPosition: {
      name: 'Icon Position',
      description: 'Sets the icon position.',
      if: { arg: 'icon', eq: true },
      control: {
        type: 'radio',
      },
      options: ['Prefix', 'Suffix'],
      table: {
        defaultValue: { summary: 'Prefix' },
      },
    },
    disabled: {
      name: 'Disabled',
      description: 'Disables the checkbox.',
      control: {
        type: 'boolean',
      },
      table: {
        // TODO: Remove line below after we make design for disabled state, it hides control
        disable: true,
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    inputType: 'Button',
    size: 'Large',
    label: 'Label',
    icon: false,
    iconPosition: 'Prefix',
    disabled: false,
  },
};

const Template = ({ inputType, size, label, icon, iconPosition }) => {
  const sizeLookUp = {
    Large: 'lg',
    Small: 'sm',
  };

  return formatHtmlPreview(`
  ${
    inputType === 'Button'
      ? `<tds-chip type="button" size="${sizeLookUp[size]}">
            <span slot="label">
                ${
                  icon && iconPosition === 'Prefix'
                    ? '<tds-icon name="cross" size="16px"></tds-icon>'
                    : ''
                }
                ${label}
                ${
                  icon && iconPosition === 'Suffix'
                    ? '<tds-icon name="cross" size="16px"></tds-icon>'
                    : ''
                }
            </span>
        </tds-chip>

        <!-- Script tag for demo purposes -->
        <script>
          document.addEventListener('tdsClick', (event)=>{
          console.log(event)
          })
        </script>`
      : ''
  }
  ${
    inputType === 'Checkbox'
      ? ` <style>
      /* demo-wrapper and demo-styles is for demonstration purposes only */
      .demo-wrapper {
        display: flex;
        gap: 8px;
      }
    </style>

    <div class="demo-wrapper">
      <tds-chip type="checkbox" size="${sizeLookUp[size]}" checked value="checkbox-1-value">
        <span slot="label">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
          ${label} 1
          ${
            icon && iconPosition === 'Suffix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
        </span>
      </tds-chip>
      <tds-chip type="checkbox" size="${sizeLookUp[size]}" value="checkbox-2-value">
        <span slot="label">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
          ${label} 2
          ${
            icon && iconPosition === 'Suffix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
        </span>
      </tds-chip>
      <tds-chip type="checkbox" size="${sizeLookUp[size]}" value="checkbox-3-value">
        <span slot="label">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
          ${label} 3
          ${
            icon && iconPosition === 'Suffix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
        </span>
      </tds-chip>
    </div>

    <!-- Script tag for demo purposes -->
    <script>
      document.addEventListener('tdsChange', (event)=>{
          console.log(event)
      })
    </script>`
      : ''
  }
  ${
    inputType === 'Radio'
      ? ` <style>
      /* demo-wrapper and demo-styles is for demonstration purposes only */
      .demo-wrapper {
        display: flex;
        gap: 8px;
      }
    </style>

    <div class="demo-wrapper">
      <tds-chip name="test" type="radio" size="${sizeLookUp[size]}" value="radio-1-value">
        <span slot="label">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
          ${label} 1
          ${
            icon && iconPosition === 'Suffix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
        </span>
      </tds-chip>
      <tds-chip name="test" type="radio" size="${sizeLookUp[size]}" checked value="radio-2-value">
        <span slot="label">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
          ${label} 2
          ${
            icon && iconPosition === 'Suffix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
        </span>
      </tds-chip>
      <tds-chip name="test" type="radio" size="${sizeLookUp[size]}" value="radio-3-value">
        <span slot="label">
          ${
            icon && iconPosition === 'Prefix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
          ${label} 3
          ${
            icon && iconPosition === 'Suffix'
              ? '<tds-icon name="cross" size="16px"></tds-icon>'
              : ''
          }
        </span>
      </tds-chip>
    </div>

    <!-- Script tag for demo purposes -->
    <script>
      document.addEventListener('tdsChange', (event)=>{
          console.log(event)
      })
    </script>`
      : ''
  }


  `);
};

export const Chip = Template.bind({});
