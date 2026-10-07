export function optimizeCloudinaryImage(url, width) {
    if (typeof url !== "string" || !url.includes("res.cloudinary.com/")) {
        return url;
    }

    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
