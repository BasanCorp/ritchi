import { createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { configureLemonSqueezy, getVariantId, detectRegion } from '@/lib/lemonsqueezy'

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request
    const { tier, region } = await req.json()
    
    if (!tier || !['lib30', 'pro', 'elite'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // Configure LemonSqueezy
    configureLemonSqueezy()

    // Get the appropriate variant ID
    const detectedRegion = region || detectRegion(req.geo?.country)
    const variantId = getVariantId(tier, detectedRegion)

    if (!variantId) {
      return NextResponse.json(
        { error: 'Product variant not found' },
        { status: 404 }
      )
    }

    // Create checkout session
    const checkout = await createCheckout({
      storeId: process.env.LEMONSQUEEZY_STORE_ID!,
      variantId: variantId,
      checkoutOptions: {
        embed: false,
        media: true,
        logo: true,
        desc: true,
        discount: true,
        buttonColor: '#6366f1', // Indigo
      },
      checkoutData: {
        email: session.user.email!,
        name: session.user.name || '',
        custom: {
          user_id: session.user.id,
          tier: tier,
          region: detectedRegion,
        },
      },
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    })

    return NextResponse.json({
      checkoutUrl: checkout.data?.data.attributes.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout' },
      { status: 500 }
    )
  }
}
