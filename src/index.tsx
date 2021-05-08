import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Todo from './Todo';
import reportWebVitals from './reportWebVitals';
import store from "./redux/reduxStore";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <Todo />
    </Provider>,
  document.getElementById('root')
);


reportWebVitals();
