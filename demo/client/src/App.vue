<script setup>
import { ref } from 'vue'

const result = ref(null)
const loading = ref(false)

async function callApi() {
  loading.value = true
  result.value = null

  try {
    const res = await fetch('http://localhost:3000/api/users')
    const data = await res.json()
    result.value = data
  } catch (err) {
    result.value = { error: "Call API fail", detail: err.message }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div style="padding: 40px; font-size: 18px;">
    <button
      @click="callApi"
      style="
        background: #42b883;
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 8px;
        cursor: pointer;
      "
    >
      Gọi API server
    </button>

    <div style="margin-top: 20px;">
      <div v-if="loading">⏳ Đang tải dữ liệu...</div>
      <pre v-if="result">{{ result }}</pre>
    </div>
  </div>
</template>
