import { formatHtmlPreview } from '../../utils/utils';
import readme from './readme.md';
import { ComponentsFolder } from '../../utils/constants';

export default {
  title: ComponentsFolder,
  parameters: {
    layout: 'centered',
    notes: readme,
  },
  argTypes: {
    canvasPosition: {
      name: 'Canvas position',
      description: 'Sets the position of the Popover Canvas.',
      control: {
        type: 'select',
      },
      options: [
        'Bottom',
        'Bottom start',
        'Bottom end',
        'Top',
        'Top start',
        'Top end',
        'Left',
        'Left-start',
        'Left end',
        'Right',
        'Right start',
        'Right end',
        'Auto',
      ],
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
  },
  args: {
    canvasPosition: 'Auto',
  },
};

const ComponentPopoverCanvas = ({ canvasPosition }) => {
  const canvasPosLookup = {
    'Bottom': 'bottom',
    'Bottom start': 'bottom-start',
    'Bottom end': 'bottom-end',
    'Top': 'top',
    'Top start': 'top-start',
    'Top end': 'top-end',
    'Left': 'left',
    'Left star': 'left-start',
    'Left end': 'left-end',
    'Right': 'right',
    'Right start': 'right-start',
    'Right end': 'right-end',
    'Auto': 'auto',
  };

  return formatHtmlPreview(
    `
      <style>
        /* demo-wrapper and demo-styles is for demonstration purposes only */
        .demo-wrapper {
          display: flex;
          flex-wrap; nowrap;
          align-items: center;
        }
      </style>

      <!-- The 'referenceEl' prop can be used instead of 'selector', 
      wich might be preferable in frameworks like React -->
      <tds-popover-canvas
        placement="${canvasPosLookup[canvasPosition]}"
        selector="#trigger"
        class="tds-u-p2">
        <h2>A Popover Canvas!</h2>
        <p>
          Where you can put anything you want!
        </p>
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://tegel.scania.com">Even links!</a>
        </p>
      </tds-popover-canvas>

      <!-- demo-wrapper code below is for demonstration purposes only -->
      <div class="demo-wrapper">
        <span class="tds-u-mr2">Click icon for Popover Canvas</span>
        
        <tds-button aria-label="menu" only-icon id="trigger" type="ghost" size="sm">
          <tds-icon slot="icon" size="16px" name="kebab"></tds-icon>
        </tds-button>
      </div>
    `,
  );
};
export const PopoverCanvas = ComponentPopoverCanvas.bind({});
