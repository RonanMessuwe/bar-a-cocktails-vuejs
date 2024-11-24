<script lang="ts" setup>
import type { Order } from '@/types/Order.type'
import CustomerOrderStatusListItem from '@/components/CustomerOrderStatusListItem.vue'

defineProps<{ orders: Order[] }>()
</script>
<style>
.customer-order-status-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
}
</style>
<template>
  <ul class="customer-order-status-list">
    <li v-for="(order, index) in orders" :key="order.order_id">
      <CustomerOrderStatusListItem :order="order" :index="index" />
    </li>
  </ul>
</template>
