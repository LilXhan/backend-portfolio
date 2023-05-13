import multer from 'multer';
import path from 'path';

const extractExtension = (fullFilename: string) => {
  return fullFilename.split('.').pop();
};

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(__dirname, '../static/'));
  },
  filename(req, file, callback) {
    const extension = extractExtension(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, uniqueSuffix + '.' + extension);
  },
});

const upload = multer({storage: storage});

export default upload;
