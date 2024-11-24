<script lang="ts" setup>
import { OrderStatus } from '@/enums/OrderStatus.enum'
import type { Order } from '@/types/Order.type'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{ order: Order; index: number }>()
const myOrder = ref(props.order)

/** Channel to subscribe. */
const channel = 'order.' + myOrder.value.order_id

const OrderStatusUpdatedEventName = '.order.status.updated'

/**
 * On component mounted: subscribe to status updates.
 * @todo add web browser push notification
 */
onMounted(() => {
  window.Echo.channel(channel).listen(OrderStatusUpdatedEventName, (e: { order: Order }) => {
    myOrder.value = e.order
    currentStep.value = getOrderStatusStepIndex(myOrder.value.status) + 1
  })
})
/** On component unmounted: unsubscribe. */
onUnmounted(() => {
  window.Echo.leaveChannel(channel)
})

/** Returns the step index corresponding to the current order status.  */
function getOrderStatusStepIndex(status: OrderStatus): number {
  return Object.values(OrderStatus).indexOf(status)
}

/** Steps */
const steps = [
  'En attente',
  'Sélection des ingrédients',
  'Shaking',
  'Ajout des glaçons',
  "C'est prêt !",
]

/** Current step number of the order. */
const currentStep = ref(getOrderStatusStepIndex(myOrder.value.status) + 1)
</script>

<style>
.v-card-title {
  font-size: 1.5rem;
}
.v-card .v-card-text {
  font-size: 1rem;
  margin-top: 1rem;
}
.v-card-content {
  margin-top: 2rem;
  gap: 2rem;
}
.v-card-text p:not(:last-of-type) {
  margin-bottom: 0.3rem;
}
</style>

<template>
  <div class="customer-order-status-list-item">
    <div class="mb-2">
      <h3>
        Commande n°{{ index + 1 }} passée il y a moins de 5 minutes.
        <small class="font-italic">fausse date</small>
      </h3>
      <p>
        Détails&nbsp;: 1 Martini - 1 Daiquiri - 2 Mojito
        <small class="font-italic">faux détails</small>
      </p>
    </div>
    <v-stepper alt-labels hide-actions v-model="currentStep" theme="dark">
      <v-stepper-header>
        <template v-for="(item, index) in steps" :key="`${index}-step`">
          <v-stepper-item
            :color="'#b9905b'"
            :title="item"
            :value="index + 1"
            :complete="index < currentStep - 1 || currentStep - 1 === steps.length - 1"
          ></v-stepper-item>

          <v-divider
            v-if="index !== steps.length - 1"
            :key="index"
            :color="index < currentStep - 1 ? '#b9905b' : ''"
            :opacity="index < currentStep - 1 ? '1' : '0.12'"
          ></v-divider>
        </template>
      </v-stepper-header>
      <v-stepper-window>
        <v-stepper-window-item :value="1">
          <v-card flat loading>
            <div class="v-card-content d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title>{{ steps[0] }}</v-card-title>
                <v-card-text>
                  <p>Le barman s'occupe actuellement d'une autre commande.</p>
                  <p>Dans quelques instants, il prendra en charge la vôtre.</p>
                  <p>Veuillez patienter...</p>
                </v-card-text>
              </div>
              <v-avatar class="ma-3" rounded="0" size="300">
                <v-img src="/images/cocktail.fr-44164.jpg" alt="barman prépare un cocktail"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-stepper-window-item>
        <v-stepper-window-item :value="2">
          <v-card flat loading>
            <div class="v-card-content d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title>{{ steps[1] }}</v-card-title>
                <v-card-text>
                  <p>Ça y est&nbsp;! Le barman s'occupe de votre commande.</p>
                  <p>Un bon cocktail, ce sont d'abord de bons ingrédients&nbsp;!</p>
                  <p>Le saviez-vous&nbsp;? Tous nos ingrédients sont bio. (hors alcool)</p>
                </v-card-text>
              </div>
              <v-avatar class="ma-3" rounded="0" size="300">
                <v-img
                  src="/images/man-cutting-lime-cocktail.jpg"
                  alt="homme qui coupe des rondelles de citron"
                ></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-stepper-window-item>
        <v-stepper-window-item :value="3">
          <v-card flat loading>
            <div class="v-card-content d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title>{{ steps[2] }}</v-card-title>
                <v-card-text>
                  <p>On secoue !</p>
                  <p>
                    Le shaker permet une double action. Il homogénéise et aère votre mélange
                    favorisant l'émulsion des ingrédients tout en les refroidissant.
                  </p>
                  <div style="display: flex; gap: 0.5rem; margin-top: 1rem; font-size: 0.8rem">
                    <v-icon icon="mdi-information"></v-icon>
                    <p>
                      Si votre cocktail ne contient que des ingrédients parfaitement translucides,
                      comme des spiritueux, des liqueurs, ou des sirops, il sera mélangé à la
                      cuillère et non au shaker.
                    </p>
                  </div>
                </v-card-text>
              </div>

              <v-avatar class="ma-3" rounded="0" size="300">
                <v-img
                  src="/images/ustensile-shaker-cocktails-AdobeStock_219090660.jpg"
                  alt="barman tient un shaker dans les mains"
                ></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-stepper-window-item>
        <v-stepper-window-item :value="4">
          <v-card flat loading image="./assets/man-cutting-lime-cocktail.jpg">
            <div class="v-card-content d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title>{{ steps[3] }}</v-card-title>
                <v-card-text>
                  <p>Quelques glaçons ! Patience, c'est bientôt prêt !</p>
                  <div style="display: flex; gap: 0.5rem; margin-top: 1rem; font-size: 0.8rem">
                    <v-icon icon="mdi-information"></v-icon>
                    <p>
                      Si votre cocktail ne contient pas de glaçons dans sa recette, il n'y en aura
                      pas.
                    </p>
                  </div>
                </v-card-text>
              </div>

              <v-avatar class="ma-3" rounded="0" size="300">
                <v-img
                  src="/images/front-view-bartender-preparing-drink.jpg"
                  alt="barman ajoute des glaçons dans un verre"
                ></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-stepper-window-item>
        <v-stepper-window-item :value="5">
          <v-card flat>
            <div class="v-card-content d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title>{{ steps[4] }}</v-card-title>
                <v-card-text>
                  <p>
                    Votre commande est prête.<br />Merci de vous rendre au bar pour la récupérer.
                  </p>
                  <p class="text-h6 mt-4">Bonne dégustation !</p>
                </v-card-text>
              </div>

              <v-avatar class="ma-3" rounded="0" size="300">
                <v-img
                  src="/images/father-son-drinking-cocktail.jpg"
                  alt="2 hommes trinquent avec un cocktail à la main"
                ></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </div>
</template>
