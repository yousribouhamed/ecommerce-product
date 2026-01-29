import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        // Extract product data
        const name = formData.get('name') as string
        const description = formData.get('description') as string
        const price = parseFloat(formData.get('price') as string)
        const stock_quantity = parseInt(formData.get('stock') as string)
        const category = formData.get('category') as string
        const file = formData.get('image') as File | null

        console.log('Received product creation request:', { name, price, stock_quantity, category, hasFile: !!file })

        // Validate required fields
        if (!name || isNaN(price) || isNaN(stock_quantity)) {
            return NextResponse.json(
                { error: 'Missing required fields: name, price, and stock are required' },
                { status: 400 }
            )
        }

        const supabase = await createClient()
        let imageUrl = null

        // Handle image upload if file is provided
        if (file && file.size > 0) {
            try {
                console.log('Uploading image:', file.name, 'size:', file.size, 'type:', file.type)

                // Convert File to Buffer
                const bytes = await file.arrayBuffer()
                const buffer = Buffer.from(bytes)

                // Create unique filename
                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

                // Upload to Supabase Storage
                const { data: uploadData, error: uploadError } = await supabase
                    .storage
                    .from('product-images')
                    .upload(fileName, buffer, {
                        contentType: file.type,
                        upsert: false
                    })

                if (uploadError) {
                    console.error('Image upload error:', uploadError)
                    // Don't fail the entire request if image upload fails
                    // Just log the error and continue without image
                    console.warn('Continuing without image due to upload error')
                } else {
                    // Get public URL
                    const { data: { publicUrl } } = supabase
                        .storage
                        .from('product-images')
                        .getPublicUrl(fileName)

                    imageUrl = publicUrl
                    console.log('Image uploaded successfully:', imageUrl)
                }
            } catch (imageError: any) {
                console.error('Image upload exception:', imageError)
                // Continue without image
            }
        }

        // Create product in database
        const { data: product, error: dbError } = await supabase
            .from('products')
            .insert({
                name,
                description: description || null,
                price,
                stock_quantity,
                category: category || null,
                image_url: imageUrl,
                is_active: true,
                created_at: new Date().toISOString()
            })
            .select()
            .single()

        if (dbError) {
            console.error('Database error:', dbError)
            return NextResponse.json(
                { error: `Failed to create product: ${dbError.message}` },
                { status: 500 }
            )
        }

        console.log('Product created successfully:', product.id)

        return NextResponse.json({
            success: true,
            product
        })

    } catch (err: any) {
        console.error('Unexpected error:', err)
        return NextResponse.json(
            { error: `An unexpected error occurred: ${err.message}` },
            { status: 500 }
        )
    }
}
