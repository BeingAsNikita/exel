import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Header } from './components/header/Header';
import { Formula } from './components/formula/Formula';
import { Table } from './components/table/Table';
import { Toolbar } from './components/toolbar/Toolbar';
import { createStore } from './core/createStore';
import { rootReduser } from './store/rootReduser';
import { storage } from './core/utils';
import { initialState } from './store/initialState';

const store = createStore(rootReduser, initialState);

store.subscribe((state) => {
  storage('excel-state', state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store: store,
});


excel.render();
