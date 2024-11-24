<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { ref, toValue, useTemplateRef } from 'vue'
import CustomerOrderStatusList from '@/components/CustomerOrderStatusList.vue'
import type { Order } from '@/types/Order.type'

const apiOrdersUrl = new URL('https://serveur.ronanmessuwe.info:31415/api/orders')
const textfieldTable = ref<string>('')

/** True if at least one query has been made. */
const hasFetchedOnce = ref<boolean>(false)

/** If false, stop submit. */
const isFormValid = ref<boolean>(true)

/** Search input ref to blur the field when form is submitting. */
const searchInput = useTemplateRef<HTMLInputElement>('searchInput')

/** Request api has error. */
const hasError = ref<boolean>(false)

/** Orders to display. */
const orders = ref<Order[]>([])

/** Used to display the progress bar while fetching. */
const queryIsFetching = ref<boolean>(false)

/** Textfield rules. */
const rules = ref([
  (value: string) => !!value || 'Le code de votre table est requis.',
  (value: string) => {
    const tableCodePattern = /^T(\d){1,2}$/
    return tableCodePattern.test(value) || 'Le code de la table est invalide.'
  },
])

/** Used to display current table code above orders. */
const latestTableCode = ref<string>('')

/** Form submit handle. */
const formSubmitHandle = async () => {
  // reset error
  hasError.value = false

  // invalid form? stop
  if (!isFormValid.value) {
    return false
  }

  // blur input
  if (searchInput.value) searchInput.value.blur()

  latestTableCode.value = textfieldTable.value
  apiOrdersUrl.searchParams.set('table', textfieldTable.value)

  queryIsFetching.value = true
  const { data, statusCode, error } = await useFetch(apiOrdersUrl.toString()).get().json()
  queryIsFetching.value = false
  hasFetchedOnce.value = true

  if (statusCode.value === 200) {
    orders.value = data.value.data
  } else {
    /** @todo display an error message */
    console.error('Oups', error)
    hasError.value = true
  }
}
</script>

<style>
.customer-order-status {
  margin-top: 2rem;
}
.v-form {
  display: flex;
  justify-content: center;
}
.no-order-for-this-table {
  text-align: center;
  margin-top: 2rem;
}
h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.errors {
  text-align: center;
}
</style>

<template>
  <div class="customer-order-status">
    <v-form action="" @submit.prevent="formSubmitHandle" v-model="isFormValid">
      <v-text-field
        type="search"
        autocomplete="off"
        autocapitalize="characters"
        spellcheck="false"
        autocorrect="off"
        name="table"
        placeholder="T4"
        variant="outlined"
        append-inner-icon="mdi-magnify"
        label="Code de votre table"
        ref="searchInput"
        v-model="textfieldTable"
        :loading="queryIsFetching"
        :rules="rules"
        max-width="400"
        clearable
      ></v-text-field>
    </v-form>
  </div>
  <div v-if="!queryIsFetching && hasFetchedOnce && !hasError">
    <h2 class="mb-10">
      Commande{{ orders.length > 1 ? 's' : '' }} de la table&nbsp;: {{ latestTableCode }}
    </h2>
    <CustomerOrderStatusList v-if="orders.length > 0" :orders="toValue(orders)" />
    <div v-else>
      <p class="no-order-for-this-table">
        Aucune commande pour cette table.<br />Veuillez vous rendre au bar pour passer commande.
      </p>
    </div>
  </div>
  <div v-if="!queryIsFetching && hasError" class="errors">
    <v-icon icon="mdi-alert-circle-outline" color="error" />
    <p>Oups ! Une erreur s'est produite.</p>
    <p>Merci de réessayer plus tard.</p>
  </div>
</template>
