export const search = async (options = {}) => {
    const params = {
        ...options
    };

    if (options.nextCursor) {
        params.next_cursor = options.nextCursor;
        delete params.nextCursor
    }

    const paramString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image?${paramString}`,
        {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    process.env.CLOUDINARY_API_KEY +
                        ":" +
                        process.env.CLOUDINARY_API_SECRET
                ).toString("base64")}`,
            },
        }
    ).then((r) => r.json());

    return response;
};

export const mapImgResources = (resources) => {
    return resources.map(resource => {
        return {
            id: resource.asset_id,
            image: resource.secure_url,
            width: resource.width,
            height: resource.height
        }
    })
} 