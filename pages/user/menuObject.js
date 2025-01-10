import { reactive } from 'vue';
import { v6 as uuidv6 } from 'uuid';
import { mdiChartBar, mdiMonitorDashboard, mdiMenu } from '@mdi/js';

function setActiveMenuItem(id) {
  menuObject.forEach(item => {
    item.settings.active = (item.id === id);
  });
}

export const menuObject = reactive([
  {
    type: 'labelGroup',
    id: uuidv6(),
    settings: {
      name: 'СТ Краснодаргорстрой',
      tooltip: 'Tooltip-1',
    },
  },
  {
    type: 'menuBtn',
    id: uuidv6(),
    settings: {
      active: false,
      name: '4 первомайская улица дом 20',
      icon: mdiMonitorDashboard,
      tooltip: 'Tooltip-2',
      functions: {
        setActiveMenuItem
      }
    },
  },
  {
    type: 'labelGroup',
    id: uuidv6(),
    settings: {
      name: 'СТ Невеликое озеро багета',
      tooltip: 'Tooltip-3'
    },
  },
  {
    type: 'menuBtn',
    id: uuidv6(),
    settings: {
      active: false,
      name: 'Центральный проезд Хорошёвского Серебряного Бора дом 20 корпус 1',
      icon: mdiChartBar,
      tooltip: 'Tooltip-4',
      functions: {
        setActiveMenuItem
      }
    },
  },
  {
    type: 'menuBtn',
    id: uuidv6(),
    settings: {
      active: false,
      name: 'Юридическое лицо',
      icon: mdiChartBar,
      tooltip: 'Tooltip-5',
      functions: {
        setActiveMenuItem
      }
    },
  },
  {
    type: 'treeNodeMenu',
    id: uuidv6(),
    settings: {
      arrayNode: [
        {
          id: uuidv6(),
          active: false,
          name: 'Menu levels',
          icon: mdiMenu,
          children: [
            {
              id: uuidv6(),
              active: false,
              name: 'Element 1',
              icon: null,
              tooltip: 'Элемент1',
              children: [
                {
                  id: uuidv6(),
                  active: false,
                  name: 'Element 1.1',
                  icon: null,
                  tooltip: '"Элемент 1.1"',
                  children: []
                }
              ]
            },
            {
              id: uuidv6(),
              active: false,
              name: 'Element 2',
              tooltip: 'Element2',
              icon: null,
              children: []
            },
          ]
        },
      ]
    },
  },
]);