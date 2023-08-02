import { createApp } from 'vue'
import App from './App.vue'
import { VueFire } from 'vuefire'
import { firebaseApp } from './firebase'

createApp(App)
  .use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
  })
  .mount('#app')
