/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { error: 'No file uploaded' },
                { status: 400 }
            )
        }

        console.log('Starting upload for file:', file.name, 'size:', file.size, 'type:', file.type)

        const supabase = await createClient()

        // Convert File to ArrayBuffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Create a unique file path
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = fileName

        console.log('Uploading to bucket: product-images, path:', filePath)

        const { data, error: uploadError } = await supabase
            .storage
            .from('product-images')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            })

        if (uploadError) {
            console.error('Supabase Storage Error:', uploadError)

            // Specific handling for bucket not found
            if (uploadError.message.includes('bucket not found') || uploadError.message.includes('does not exist')) {
                return NextResponse.json(
                    { error: 'Storage bucket "product-images" not found. Please ensure you created it in Supabase.' },
                    { status: 500 }
                )
            }

            return NextResponse.json(
                { error: `Upload failed: ${uploadError.message}` },
                { status: 500 }
            )
        }

        if (!data) {
            console.error('Upload succeeded but no data returned')
            return NextResponse.json(
                { error: 'Upload failed: No data returned from storage' },
                { status: 500 }
            )
        }

        console.log('Upload successful:', data.path)

        const { data: { publicUrl } } = supabase
            .storage
            .from('product-images')
            .getPublicUrl(filePath)

        console.log('Public URL generated:', publicUrl)

        return NextResponse.json({ url: publicUrl })
    } catch (err: any) {
        console.error('Unexpected Upload Error:', err)
        return NextResponse.json(
            { error: `An unexpected error occurred: ${err.message}` },
            { status: 500 }
        )
    }
}
