import { NavTabsType } from '@/utils/interface';
interface IState {
  navTabs: NavTabsType[];
}
export default {
  state: {
    navTabs: [
      {
        name: '首页',
        path: '/home',
        disabled: true,
      },
    ],
  } as IState,
  effects: {},
  reducers: {
    delNavTabKey<T extends { path: string }>(state: IState, params: T): IState {
      const { path } = params;
      state.navTabs = state.navTabs.filter(item => item.path !== path);
      state.navTabs = [...state.navTabs];
      return state;
    },
    addNavTabKey<T extends { path: string; name: string }>(
      state: IState,
      params: T,
    ): IState {
      const { path, name } = params;
      const index = state.navTabs.findIndex(item => item.path === path);
      if (index === -1) state.navTabs.push({ path, name, isMusEnter: false });
      return state;
    },
    clearNavTabKeys(state: IState): IState {
      state.navTabs = [
        {
          name: '首页',
          path: '/home',
          disabled: true,
        },
      ];
      return state;
    },
  },
};
