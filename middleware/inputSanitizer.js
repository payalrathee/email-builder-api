exports.sanitizeData = (req, res, next) => {
    const data = req.body;

    const sanitizeObject = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(item => (typeof item === "object" ? sanitizeObject(item) : sanitizeString(item)));
        } else if (typeof obj === "object" && obj !== null) {
            for (const key in obj) {
                if (typeof obj[key] === "object") {
                    obj[key] = sanitizeObject(obj[key]);
                } else if (typeof obj[key] === "string") {
                    obj[key] = obj[key].trim();

                    if ((obj.category === "image" || obj.category === "link") && key === "content") {
                        // obj[key] = encodeURIComponent(obj[key]);
                    } else {
                        obj[key] = sanitizeString(obj[key]);
                    }
                }
            }
        }
        return obj;
    };

    function sanitizeString(string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/g;
        return string.replace(reg, (match) => map[match]);
    }

    req.body = sanitizeObject(data);
    next();
};
