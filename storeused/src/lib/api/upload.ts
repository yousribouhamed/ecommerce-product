import { createClient } from "@/lib/supabase/client";

export async function uploadImage(file: File): Promise<string> {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase
        .storage
        .from('product-images')
        .upload(filePath, file);

    if (error) {
        console.error('Error uploading image:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(filePath);

    return publicUrl;
}
