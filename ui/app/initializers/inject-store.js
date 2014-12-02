import Store from "ui/models/store";

export function initialize(container, app) {
    app.register('store:main', Store);
    app.inject('route', 'store', 'store:main');
    app.inject('controller', 'store', 'store:main');
}

export default {
    name: 'inject-store',
    initialize: initialize
};
