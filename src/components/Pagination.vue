<script setup>
import {endBefore, getDocs, limit, orderBy, query, startAfter} from 'firebase/firestore'

const props = defineProps({
  orderByField: {type: String, default: 'id'},
  queryRef: {type: String, required: true},
  limitNumber: {type: Number, default: 5}
})

const emit = defineEmits(['next', 'prev'])

let lastVisible = {}

async function nextPage() {
  const next = query(props.queryRef, orderBy(props.orderByField), startAfter(lastVisible), limit(props.limitNumber))

  const documentSnapshots = await getDocs(next)

  let items = []
  documentSnapshots.forEach((doc) => {
    items.push(doc.data())
  });

  emit('next', items)

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
}

async function prevPage() {
  const next = query(props.queryRef, orderBy(props.orderByField), endBefore(lastVisible), limit(props.limitNumber))

  const documentSnapshots = await getDocs(next)

  let items = []
  documentSnapshots.forEach((doc) => {
    items.push(doc.data())
  });

  emit('prev', items)

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
}
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>
</template>
