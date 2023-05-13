import { rmSync } from 'fs';
import { join } from 'path';

const deleteFileInDirStatic = (filename: string) => {
  return rmSync(join(__dirname, `../static/${filename}`));
};

export default deleteFileInDirStatic;