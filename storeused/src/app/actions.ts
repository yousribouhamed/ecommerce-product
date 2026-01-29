'use server'

import { createClient } from '@/lib/supabase/server'

export async function uploadProductImage(formData: FormData) {
    const file = formData.get('file') as File
    if (!file) {
        return { error: 'No file uploaded' }
    }

    const supabase = await createClient()

    // Create a unique file path
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase
        .storage
        .from('product-images')
        .upload(filePath, file)

    if (uploadError) {
        console.error('Upload Error:', uploadError)
        return { error: `Upload failed: ${uploadError.message}` }
    }

    const { data: { publicUrl } } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(filePath)

    return { url: publicUrl }
}
