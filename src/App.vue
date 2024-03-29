<script lang="ts" setup>
import {
  doc,
  increment,
  serverTimestamp,
  Timestamp,
  setDoc,
  updateDoc,
  DocumentData,
} from 'firebase/firestore'
import { computed } from 'vue'
import ErrorBox from './components/ErrorBox.vue'
import { useFirestore, useDocument } from 'vuefire'

const vuefireVersion = __VUEFIRE_VERSION__

const today = new Date().toISOString().slice(0, 10)

const db = useFirestore()
// this could just be `doc(db, 'count', props.today)` but that wouldn't react to changes
const todaysCountDoc = computed(() =>
  doc(db, 'count', today).withConverter<
    { when: Timestamp; n: number },
    DocumentData
  >({
    fromFirestore: (snapshot) => {
      // Here you could do validation with a library like zod
      return snapshot.data(
        // this avoids having `null` while the server timestamp is updating
        { serverTimestamps: 'estimate' }
      ) as { when: Timestamp; n: number }
    },
    toFirestore: (data) => data,
  })
)

function incrementCount() {
  if (count.value) {
    return updateDoc(todaysCountDoc.value, {
      // increment is a special value that enables increments
      n: increment(1),
      // serverTimestamp is a special value that sets the current time
      when: serverTimestamp(),
    })
  } else {
    return setDoc(todaysCountDoc.value, {
      n: 0,
      when: serverTimestamp(),
    })
  }
}

const { data: count, error } = useDocument(todaysCountDoc)
</script>

<template>
  <h1>VueFire</h1>

  <ErrorBox v-if="error" :error="error" />

  <main>
    <button type="button" @click="incrementCount">
      <template v-if="count">count is {{ count.n }}</template>
      <template v-else>click to create today's count!</template>
    </button>
  </main>

  <footer>
    <code>vuefire@{{ vuefireVersion }}</code>
  </footer>
</template>
