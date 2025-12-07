<script setup>
import { ref } from 'vue'

const result = ref(null)
const loading = ref(false)

async function callApi() {
  loading.value = true
  result.value = null

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`)
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

      <!-- Nếu result là object -->
      <div v-else-if="result && typeof result === 'object' && !Array.isArray(result)">
        <div
          v-for="(value, key) in result"
          :key="key"
          style="
            border: 1px solid #ccc;
            padding: 12px;
            margin-bottom: 8px;
            border-radius: 6px;
            background: #f9f9f9;
          "
        >
          <strong>{{ key }}:</strong> {{ value }}
        </div>
      </div>

      <!-- Nếu result là array -->
      <div v-else-if="Array.isArray(result)">
        <div
          v-for="(item, index) in result"
          :key="index"
          style="
            border: 1px solid #42b883;
            padding: 12px;
            margin-bottom: 8px;
            border-radius: 6px;
            background: #e0f7f1;
          "
        >
          {{ item }}
        </div>
      </div>

      <!-- Fallback -->
      <pre v-else>{{ result }}</pre>
    </div>
  </div>
</template>
