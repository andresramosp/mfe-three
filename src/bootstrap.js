import { createApp } from 'vue'
import App from './MfeThree-App.vue'

import "leaflet/dist/leaflet.css"

// const app = createApp(App)
// app.mount('#app')

const mount = (el) => {
    const app = createApp(App)
    app.mount(el)
    // createApp(App).mount(el);
};

export { mount }
