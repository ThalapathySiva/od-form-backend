var multer = require('multer');

var storage = multer.diskStorage({
    destination: (_req: any, _file: any, cb: (arg0: any, arg1: string) => void) => {
        cb(null, 'uploads')
    },
    filename: (_req: any, file: { fieldname: string, originalname: string }, cb: (arg0: any, arg1: string) => void) => {
        cb(null, Date.now() + file.originalname.replace(" ", "_"));
    }
});

var upload = multer({ storage: storage });

export { upload };