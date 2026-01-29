'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadProductImage(formData: FormData) {
    try {
        const file = formData.get('file') as File
        if (!file) {
            console.error('No file found in formData')
            return { error: 'No file uploaded' }
        }

        console.log('Starting upload for file:', file.name, 'size:', file.size, 'type:', file.type)

        const supabase = await createClient()

        // Convert File to ArrayBuffer for more reliable transfer in Server Actions
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
                return { error: 'Storage bucket "product-images" not found. Please ensure you created it in Supabase.' }
            }
            return { error: `Upload failed: ${uploadError.message}` }
        }

        if (!data) {
            console.error('Upload succeeded but no data returned')
            return { error: 'Upload failed: No data returned from storage' }
        }

        console.log('Upload successful:', data.path)

        const { data: { publicUrl } } = supabase
            .storage
            .from('product-images')
            .getPublicUrl(filePath)

        console.log('Public URL generated:', publicUrl)

        return { url: publicUrl }
    } catch (err: any) {
        console.error('Unexpected Upload Error:', err)
        return { error: `An unexpected error occurred: ${err.message}` }
    }
}
