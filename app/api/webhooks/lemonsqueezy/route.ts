import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature
    const signature = req.headers.get('x-signature')
    const body = await req.text()

    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!
    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(body).digest('hex')

    if (signature !== digest) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse webhook event
    const event = JSON.parse(body)
    const eventName = event.meta.event_name
    const data = event.data

    console.log('LemonSqueezy webhook:', eventName)

    switch (eventName) {
      case 'order_created': {
        // New subscription created
        const userId = data.attributes.first_order_item.product_name.includes('custom')
          ? data.attributes.first_order_item.custom_data.user_id
          : null

        if (!userId) {
          console.error('No user_id in webhook data')
          break
        }

        const tier = getTierFromVariantId(data.attributes.first_order_item.variant_id)

        await db.subscription.upsert({
          where: { userId },
          create: {
            userId,
            tier,
            status: 'ACTIVE',
            lemonSqueezyCustomerId: data.attributes.customer_id.toString(),
            lemonSqueezyOrderId: data.id,
            lemonSqueezyVariantId: data.attributes.first_order_item.variant_id.toString(),
          },
          update: {
            tier,
            status: 'ACTIVE',
            lemonSqueezyOrderId: data.id,
            updatedAt: new Date(),
          },
        })

        // Send welcome email
        // TODO: Implement email service
        console.log(`New subscription for user ${userId}: ${tier}`)
        break
      }

      case 'subscription_updated': {
        // Subscription status changed
        const customerId = data.attributes.customer_id.toString()
        const status = data.attributes.status

        await db.subscription.updateMany({
          where: { lemonSqueezyCustomerId: customerId },
          data: {
            status: mapLemonSqueezyStatus(status),
            updatedAt: new Date(),
          },
        })
        break
      }

      case 'subscription_cancelled': {
        // Subscription cancelled
        const customerId = data.attributes.customer_id.toString()

        await db.subscription.updateMany({
          where: { lemonSqueezyCustomerId: customerId },
          data: {
            status: 'CANCELED',
            canceledAt: new Date(),
            updatedAt: new Date(),
          },
        })
        break
      }

      case 'subscription_expired': {
        // Subscription expired
        const customerId = data.attributes.customer_id.toString()

        await db.subscription.updateMany({
          where: { lemonSqueezyCustomerId: customerId },
          data: {
            status: 'EXPIRED',
            updatedAt: new Date(),
          },
        })
        break
      }

      default:
        console.log('Unhandled event:', eventName)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

function getTierFromVariantId(variantId: string): 'FREE' | 'LIB30' | 'PRO' | 'ELITE' {
  // Map variant IDs to tiers
  const lib30Variants = [
    process.env.NEXT_PUBLIC_LS_VARIANT_LIB30_SGD,
    process.env.NEXT_PUBLIC_LS_VARIANT_LIB30_AED,
    process.env.NEXT_PUBLIC_LS_VARIANT_LIB30_VND,
    process.env.NEXT_PUBLIC_LS_VARIANT_LIB30_USD,
  ]

  const proVariants = [
    process.env.NEXT_PUBLIC_LS_VARIANT_PRO_SGD,
    process.env.NEXT_PUBLIC_LS_VARIANT_PRO_AED,
    process.env.NEXT_PUBLIC_LS_VARIANT_PRO_VND,
    process.env.NEXT_PUBLIC_LS_VARIANT_PRO_USD,
  ]

  const eliteVariants = [
    process.env.NEXT_PUBLIC_LS_VARIANT_ELITE_SGD,
    process.env.NEXT_PUBLIC_LS_VARIANT_ELITE_AED,
    process.env.NEXT_PUBLIC_LS_VARIANT_ELITE_VND,
    process.env.NEXT_PUBLIC_LS_VARIANT_ELITE_USD,
  ]

  if (lib30Variants.includes(variantId)) return 'LIB30'
  if (proVariants.includes(variantId)) return 'PRO'
  if (eliteVariants.includes(variantId)) return 'ELITE'

  return 'FREE'
}

function mapLemonSqueezyStatus(
  status: string
): 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'TRIALING' | 'EXPIRED' {
  const statusMap: Record<string, any> = {
    active: 'ACTIVE',
    cancelled: 'CANCELED',
    past_due: 'PAST_DUE',
    on_trial: 'TRIALING',
    expired: 'EXPIRED',
    paused: 'CANCELED',
  }

  return statusMap[status] || 'EXPIRED'
}
