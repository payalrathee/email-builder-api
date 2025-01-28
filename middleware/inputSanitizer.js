exports.sanitizeData = (req, res, next) => {
    const data = req.body;
    const excludedKeys = ["link", "imageUrl"];

    const sanitizeObject = (obj) => {
        
        for (const key in obj) {
           
            if (typeof obj[key] === 'object') {
                sanitizeObject(obj[key]);
            } else if (typeof obj[key] === 'string') {
                
                obj[key] = obj[key].trim(); 
                
                if (key && !excludedKeys.includes(key)) {
                    obj[key] = sanitize(obj[key]);
                } else {
                    obj[key] = encodeURIComponent(obj[key]);
                }
                
            }
        }
    };

    sanitizeObject(data);

    next();
};

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
}