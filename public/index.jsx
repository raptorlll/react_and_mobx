import React from 'react';
import {render} from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import RootContainer from "./components/core/RootContainer";

promiseFinally.shim();

window.onload = function () {
    console.log("Component have been initialized");

    const renderDom = Component => {
        render(<Component/>,
            document.getElementById('root')
        );
    };

    renderDom(RootContainer);
};
