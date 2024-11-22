import type { OrderStatus } from '@/enums/OrderStatus.enum'

export type Order = {
  /** ULID. */
  order_id: string

  /**
   * @example 'pending'
   */
  status: OrderStatus

  /** Creation date.
   * @example '2024-11-19 20:51:56'
   */
  created_at: string

  /** Updated date.
   * @example '2024-11-19 20:51:56'
   */
  updated_at: string

  /** Table code.
   * @example 'T5'
   */
  table: string
}
