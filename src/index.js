// const debug = process.env.NODE_ENV !== 'production'

import Auth from './authenticate';
function plugin(Vue, options) {

    if (plugin.installed) {
        return;
    }

    options = options || {};

    Vue.auth = new Auth(Vue, options)


    Object.defineProperties(Vue.prototype, {

        $auth: {
            get() {
                return Vue.auth;
            }
        }

    });

}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}


export default plugin
